import path from 'path'

import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { buildConfig } from 'payload/config'

import Users from './collections/Users';
import Media from './collections/Media';
import Pages from './collections/Pages';
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import BlogPosts from './collections/BlogPosts';
import Header from './globals/Header';
import Footer from './globals/Footer';
import Projects from './collections/Projects';
import ProjectTags from './collections/ProjectTags';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import { bunnyStorage } from './adapters/BunnyStorageAdapter';

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
  },
  editor: lexicalEditor({}),
  collections: [
    Users,
    Pages,
    Media,
    BlogPosts,
    Projects,
    ProjectTags
  ],
  globals: [
    Header,
    Footer,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [
    cloudStorage({
      enabled: true,
      collections: {
        media: {
          adapter: bunnyStorage({
						zone: 'taos-storage',
						region: "default",
						accessKey: process.env.BUNNY_STORAGE_PASSWORD,
						pullZone: new URL("https://taos-pullzone.b-cdn.net"),
					}),
					// disablePayloadAccessControl: true, // see docs for the adapter you want to use
        },
      },
    }),
  ],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
