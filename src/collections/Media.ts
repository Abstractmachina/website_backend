import { CollectionAfterReadHook, CollectionConfig } from "payload/types";
import { generateBunnyCdnToken } from "../util/authentication";

const generateThumbnailUrl = (filename: any) => {
  console.log(filename);
  if (!filename || filename === null) return "";
  const path = `/media/${filename}`;
  console.log(path);
  // https://taos-pullzone.b-cdn.net/media/frontfacade_web.jpg
  return generateBunnyCdnToken(path, 86400);
};

/**
 * Description
 * @param {doc} doc full document
 * @param {any} req full express request
 * @param {any} query full express request query
 * @param {any} findMany boolean to denote if this hook is running against finding one, or finding many
 * @returns {any}
 */
const generateBunnyUrl: CollectionAfterReadHook = async ({
  doc,
  req,
  query,
  findMany,
}) => {
  const filename = doc.filename;
  const path = `media/${filename}`;
  const url = generateBunnyCdnToken(path);

  doc.url = url;
  return doc;
};

const Media: CollectionConfig = {
  slug: "media",
  labels: {
    singular: "Media",
    plural: "Media",
  },
  access: {
    read: () => true,
  },
  upload: {
    staticURL: "https://taos-pullzone.b-cdn.net/media",
    staticDir: "media",
    disableLocalStorage: true,
  },
  fields: [
    {
      name: "alt",
      label: "Alt",
      type: "text",
      required: true,
    },
  ],
  hooks: {
    afterRead: [(args) => generateBunnyUrl(args)],
  },
};

export default Media;
