import path from "path";

import "../tailwind.css";

import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { buildConfig } from "payload/config";

import Users from "./collections/Users";
import Media from "./collections/Media";
import Pages from "./collections/Pages";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import BlogPosts from "./collections/BlogPosts";
import Header from "./globals/Header";
import Footer from "./globals/Footer";
import Projects from "./collections/Projects";
import ProjectTags from "./collections/ProjectTags";
import { cloudStorage } from "@payloadcms/plugin-cloud-storage";
import { bunnyStorage } from "./adapters/BunnyStorageAdapter";
import Videos from "./collections/Videos";
import { bunnyStream } from "./adapters/BunnyStreamAdapter";
import Dashboard from "./views/Dashboard";
import Expenses from "./collections/Expenses";
import ExpenseTags from "./collections/ExpenseTags";
import Test from "@/components/Test";

export default buildConfig({
  admin: {
    user: Users.slug,
    css: path.resolve(__dirname, "../tailwind.css"),
    bundler: webpackBundler(),
    webpack: (config) => {
      return {
        ...config,
        module: {
          ...config.module,
          rules: [
            ...config.module.rules,
            {
              test: /\tailwind.css$/i,
              use: ["css-loader", "postcss-loader"],
            },
          ],
        },
        resolve: {
          ...config.resolve,
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
          alias: {
            ...config.resolve.alias,
            '@': path.resolve(__dirname),
          },
        },
      };
    },
    components: {
      views: {
        BeforeDashboard: Test,
        Dashboard: Dashboard,
      },
    },
  },
  editor: lexicalEditor({}),
  collections: [
    Users,
    Pages,
    Media,
    BlogPosts,
    Projects,
    ProjectTags,
    Videos,
    Expenses,
    ExpenseTags,
  ],
  globals: [Header, Footer],
  typescript: {
    declare: false,
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [
    cloudStorage({
      enabled: true,
      collections: {
        media: {
          adapter: bunnyStorage({
            zone: "taos-storage",
            region: "default",
            accessKey: process.env.BUNNY_STORAGE_PASSWORD,
            pullZone: new URL("https://taos-pullzone.b-cdn.net"),
          }),
          // disablePayloadAccessControl: true, // see docs for the adapter you want to use
        },
        // videos: {
        //   adapter: bunnyStream({
        // 		zone: 'taos-storage',
        //     accessKey: process.env.BUNNY_STREAM_KEY,
        //     libraryId: Number(process.env.BUNNY_STREAM_LIBRARY_ID),
        //     zone: 'vz-9b20006b-401.b-cdn.net',
        //     // collectionId?: string;
        // 	}),
        // 	// disablePayloadAccessControl: true, // see docs for the adapter you want to use
        // },
      },
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
});
