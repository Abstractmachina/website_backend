import type {
    GenerateURL,
    HandleDelete,
    StaticHandler,
    Adapter,
    GeneratedAdapter,
    HandleUpload,
    TypeWithPrefix,
  } from "@payloadcms/plugin-cloud-storage/dist/types";
  import { ofetch } from "ofetch";
  import { docHasTimestamps } from "payload/types";
  import type { FieldBase } from "payload/dist/fields/config/types";
  import type { TypeWithID } from "payload/dist/collections/config/types";
  import type { FileData } from "payload/dist/uploads/types";
  
  const docHasStream = (doc: unknown): doc is StreamDoc => {
    return typeof doc === "object" && "video" in doc;
  };
  
  type StreamDoc = TypeWithID &
    FileData &
    TypeWithPrefix & {
      video: {
        id: string;
        libraryId: number;
        collectionId: string;
        filename: string;
        provider: "bunny";
        hls: string;
        url: string;
      };
    };
  
  export class BunnyStreamAdapter implements GeneratedAdapter {
    constructor(
      private readonly config: BunnyAdapterConfig,
      private readonly adapterArgs: Parameters<Adapter>[0]
    ) {
      this.adapterArgs = adapterArgs;
      const { collection } = adapterArgs;
      const videoFieldExists = collection.fields.some(
        (f) => (f as FieldBase).name === "video"
      );
  
      if (!videoFieldExists) {
        collection.fields.push({
          name: "video",
          type: "json",
          admin: {
            hidden: true,
          },
        });
      }
    }
  
    handleUpload: HandleUpload = async ({ data, file, collection }) => {
      const video = await createVideo({
        accessKey: this.config.accessKey,
        libraryId: this.config.libraryId,
        title: data.filename,
        collectionId: this.config.collectionId,
      });
  
      // Put video object
      const key = video.guid;
  
      if (!key) throw new Error("No guid returned from BunnyCDN");
  
      const res = await fetch(
        `https://video.bunnycdn.com/library/${video.videoLibraryId}/videos/${key}`,
        {
          method: "PUT",
          headers: {
            AccessKey: this.config.accessKey,
            "Content-Type": "application/octet-stream",
          },
          body: file.buffer,
        }
      );
  
      if (!res.ok) throw new Error("Failed to upload video");
  
      const response: UploadVideoResponse = await res.json();
  
      if (!response.success) throw new Error(response.message);
  
      data.video = {
        provider: "bunny",
        id: video.guid,
        libraryId: video.videoLibraryId || this.config.libraryId,
        collectionId: video.collectionId,
        filename: file.filename,
        hls: `https://${this.config.zone}.b-cdn.net/${video.guid}/playlist.m3u8`,
        url: `https://${this.config.zone}.b-cdn.net/${video.guid}`,
      };
  
      return data;
    };
  
    handleDelete: HandleDelete = async ({ doc }) => {
      const { video } = doc as StreamDoc;
  
      if (!video) return;
  
      const response = await fetcher<DeleteVideoResponse>(
        `/library/${video.libraryId || this.config.libraryId}/videos/${video.id}`,
        {
          method: "DELETE",
          headers: {
            AccessKey: this.config.accessKey,
          },
        }
      );
  
      // TODO - Remove when confirmed to work
      console.log(response);
  
      if (!response.success) throw new Error(response.message);
  
      return;
    };
  
    generateURL: GenerateURL = (...args) => {
      // Todo - Implement some hacky way to get the pull zone url
      const { filename } = args[0];
      return `${filename}`;
    };

    
  
    staticHandler: StaticHandler = (req, res, next) => {
      // TODO - Implement
      return next();
    };
  
    static getThumbnail = ({ doc }: { doc: any }) => {
      if (!docHasStream(doc)) {
        console.warn("Doc is not a stream doc", doc);
        return "";
      }
  
      const hasTime = docHasTimestamps(doc);
  
      const url = new URL(doc.video.hls);
      url.pathname = `${doc.video.id}/thumbnail.jpg`;
  
      if (hasTime) {
        url.searchParams.set("v", `${new Date(doc.updatedAt).getTime()}`);
      }
  
      return url.toString();
    };
  }
  
  export interface BunnyAdapterConfig {
    /**
     * The BunnyCDN Access Key for the storage zone.
     * This is found under as "password" https://dash.bunny.net/storage and FTP & API Access tab. It is not the same as the BunnyCDN API Key.
     */
    accessKey: string;
  
    /**
     * The libraryId to use
     */
    libraryId: number;
  
    collectionId?: string;
  
    zone: string;
  }
  
  async function createVideo({
    accessKey,
    libraryId,
    title,
    collectionId,
  }: {
    libraryId: number;
    title: string;
    collectionId?: string;
    accessKey: string;
  }) {
    // await fetch(`https://video.bunnycdn.com/library/${libraryId}/videos`, {
    //   method: "POST",
    // });
  
    return await fetcher<CreateVideoResponse>(`/library/${libraryId}/videos`, {
      method: "POST",
      headers: {
        AccessKey: accessKey,
      },
      body: {
        title,
        collectionId,
      },
    });
  }
  
  type CreateVideoResponse = {
    videoLibraryId: number;
    guid: string;
    collectionId: string;
  };
  
  type UploadVideoResponse = {
    success: boolean;
    message: string;
    statusCode: number;
  };
  
  type DeleteVideoResponse = {
    success: boolean;
    message: string;
    statusCode: number;
  };
  
  const fetcher = ofetch.create({
    baseURL: "https://video.bunnycdn.com",
  });
  
  const bunnyStream = (config: BunnyAdapterConfig): Adapter => {
    return ({ collection, prefix }) => {
      return new BunnyStreamAdapter(config, { collection, prefix });
    };
  };
  
  export { bunnyStream };