import type {
	GenerateURL,
	HandleDelete,
	StaticHandler,
	Adapter,
	GeneratedAdapter,
	HandleUpload,
} from "@payloadcms/plugin-cloud-storage/dist/types";
import { getFilePrefix } from "@payloadcms/plugin-cloud-storage/dist/utilities/getFilePrefix";
import path from "path";

/**
 * The BunnyStorageAdapter is a custom adapter for BunnyCDN. Prefer using the bunnyStorage function to create an instance of this class.
 * @internal
 */
export class BunnyStorageAdapter implements GeneratedAdapter {
	constructor(
		private readonly config: BunnyAdapterConfig,
		private readonly adapterArgs: Parameters<Adapter>[0],
	) {
		this.regionPrefix = this.config.region
			? this.config.region === "default"
				? ""
				: `${this.config.region}.`
			: "";
	}

	private regionPrefix: string;

	handleUpload: HandleUpload = async ({ data, file, collection }) => {
		const key = this.getKey(data.filename);
		const url = `https://${this.regionPrefix}storage.bunnycdn.com/${this.config.zone}/${collection.slug}/${key}`;
		const response = await fetch(url, {
			method: "PUT",
			headers: {
				AccessKey: this.config.accessKey,
				"Content-Type": "application/octet-stream",
			},
			body: file.buffer,
		});

		if (!response.ok) {
			throw new Error(`Error uploading file: ${response.statusText}`);
		}

		return data;
	};

	handleDelete: HandleDelete = async ({ filename, doc: { prefix = "" } }) => {
		const key = this.getKey(path.posix.join(prefix, filename));
		const url = `https://${this.regionPrefix}storage.bunnycdn.com/${this.config.zone}/${key}`;

		const response = await fetch(url, {
			method: "DELETE",
			headers: {
				AccessKey: this.config.accessKey,
			},
		});

		const txt = await response.text();

		if (!response.ok) {
			throw new Error(`Error deleting file: ${response.statusText}`);
		}
	};

	generateURL: GenerateURL = ({ filename, prefix = "", collection }) => {
		const { pullZone, zone, useZoneInUrl } = this.config;

		const url =
			pullZone instanceof URL
				? new URL(pullZone)
				: new URL(
						pullZone.startsWith("http") // Assume it's a full URL to BunnyCDN
							? pullZone
							: `https://${pullZone}.b-cdn.net/${collection.slug}`,
				  );

		url.pathname = path.posix.join(
			url.pathname,
			useZoneInUrl ? zone : "",
			prefix,
			filename,
		);
		console.log("generateURL");
		console.log(url);
		console.log(url.href);
		return `https://taos-pullzone.b-cdn.net/${collection.slug}/${filename}`;
	};

	staticHandler: StaticHandler = async (req, res, next) => {
		try {
			const prefix = await getFilePrefix({
				req,
				collection: this.adapterArgs.collection,
			});

			const url = `https://${this.regionPrefix}storage.bunnycdn.com/${
				this.config.zone
			}/${path.posix.join(prefix, req.params.filename)}`;

			const response = await fetch(url, {
				method: "GET",
				headers: {
					accept: "*/*",
					AccessKey: this.config.accessKey,
				},
			});

			response.headers.forEach((header, key) => {
				res.setHeader(key, header);
			});

			res.status(response.status);

			res.send(await response.blob());
		} catch (error) {
			console.error((error as any).message);
			return next();
		}
	};

	private getKey = (filename: string, prefix?: string): string => {
		const _prefix = prefix || this.adapterArgs.prefix || "";
		return path.posix.join(_prefix, filename);
	};
}

export interface BunnyAdapterConfig {
	/**
	 * The name of the storage zone
	 * @example "myzone" - resolves to https://${this.regionPrefix}storage.bunnycdn.com/myzone
	 */
	zone: string;
	/**
	 * The name of the pull zone, or a full URL to the pull zone
	 * This is only used for generating URLs when payload access control is disabled.
	 * @example "myzone" - resolves to https://myzone.b-cdn.net
	 * @example "https://myzone.b-cdn.net" - resolves to https://myzone.b-cdn.net
	 * @example new URL("https://myzone.b-cdn.net") - resolves to https://myzone.b-cdn.net
	 */
	pullZone: string | URL;
	/**
	 * Whether or not to include the storage zone in the URL when generating URLs.
	 * If a string is provided, it will be used as a prefix to the URL.
	 * @default false
	 * @example true - resolves to https://myzone.b-cdn.net/myzone/myfile.jpg
	 * @example "cdn" - resolves to https://myzone.b-cdn.net/cdn/myfile.jpg
	 * @example false - resolves to https://myzone.b-cdn.net/myfile.jpg
	 */
	useZoneInUrl?: boolean | string;
	/**
	 * The BunnyCDN Access Key for the storage zone.
	 * This is found under as "password" https://dash.bunny.net/storage and FTP & API Access tab. It is not the same as the BunnyCDN API Key.
	 */
	accessKey: string;

	/**
	 * Storage URL
	 */
	region?: "default" | "de" | "ny" | "sg" | "la" | "jh" | "br" | "se";
}

const bunnyStorage = ({
	zone,
	accessKey,
	pullZone,
	useZoneInUrl = false,
	region,
}: BunnyAdapterConfig): Adapter => {
	return ({ collection, prefix }) => {
		return new BunnyStorageAdapter(
			{ zone, accessKey, pullZone, useZoneInUrl, region },
			{ collection, prefix },
		);
	};
};

export { bunnyStorage };