import path from 'path'
import type { Storage } from '@google-cloud/storage'
import type { CollectionConfig } from 'payload/types'
import type { HandleUpload } from '../../types'

interface Args {
  collection: CollectionConfig
  bucket: string
  acl?: 'Private' | 'Public'
  prefix?: string
  getStorageClient: () => Storage
}

export const getHandleUpload = ({
  getStorageClient,
  bucket,
  acl,
  prefix = '',
  collection
}: Args): HandleUpload => {
  const key = this.getKey(data.filename);
		const url = `https://${this.regionPrefix}storage.bunnycdn.com/${this.config.zone}/media/${key}`;
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
  // return async ({ data, file }) => {
  //   const fileKey = path.posix.join(data.prefix || prefix, file.filename)

  //   const gcsFile = getStorageClient().bucket(bucket).file(fileKey)
  //   await gcsFile.save(file.buffer, {
  //     metadata: {
  //       contentType: file.mimeType,
  //     },
  //   })

  //   if (acl) {
  //     await gcsFile[`make${acl}`]()
  //   }

  //   return data
  // }
}
