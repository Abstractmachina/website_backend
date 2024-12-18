/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    users: User;
    pages: Page;
    media: Media;
    blogPosts: BlogPost;
    projects: Project;
    projectTags: ProjectTag;
    videos: Video;
    expenses: Expense;
    expenseTags: ExpenseTag;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  globals: {
    header: Header;
    footer: Footer;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "users".
 */
export interface User {
  id: string;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "pages".
 */
export interface Page {
  id: string;
  name: string;
  slug: string;
  layout?:
    | (
        | {
            heading?: string | null;
            text?: string | null;
            backgroundImage?: string | Media | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'hero';
          }
        | {
            heading?: string | null;
            text?: string | null;
            image?: string | Media | null;
            direction?: ('default' | 'reverse') | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'twoColumn';
          }
        | {
            body?: {
              root: {
                type: string;
                children: {
                  type: string;
                  version: number;
                  [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
              };
              [k: string]: unknown;
            } | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'simpleRichText';
          }
        | {
            heading?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'recentBlogPosts';
          }
      )[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "media".
 */
export interface Media {
  id: string;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "blogPosts".
 */
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  body: {
    root: {
      type: string;
      children: {
        type: string;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "projects".
 */
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  slug: string;
  year: number;
  location: string;
  tags: (string | ProjectTag)[];
  layout?:
    | (
        | {
            heading?: string | null;
            text?: string | null;
            backgroundImage?: string | Media | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'hero';
          }
        | {
            heading?: string | null;
            text?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'oneColumn';
          }
        | {
            heading?: string | null;
            text?: string | null;
            image?: string | Media | null;
            direction?: ('default' | 'reverse') | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'twoColumn';
          }
        | {
            body?: {
              root: {
                type: string;
                children: {
                  type: string;
                  version: number;
                  [k: string]: unknown;
                }[];
                direction: ('ltr' | 'rtl') | null;
                format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
                indent: number;
                version: number;
              };
              [k: string]: unknown;
            } | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'simpleRichText';
          }
        | {
            heading?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'recentBlogPosts';
          }
        | {
            description?: string | null;
            image?: string | Media | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'figure';
          }
        | {
            sourceType?: ('internal' | 'external') | null;
            externalUrl?: string | null;
            internalVideo?: string | Video | null;
            caption?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'videoBlock';
          }
        | {
            text?: string | null;
            link?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: 'link';
          }
      )[]
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "projectTags".
 */
export interface ProjectTag {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "videos".
 */
export interface Video {
  id: string;
  title?: string | null;
  caption?: string | null;
  providerData?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "expenses".
 */
export interface Expense {
  id: string;
  amount?: number | null;
  category?:
    | ('food' | 'shelter' | 'transport' | 'health' | 'Fitness' | 'education' | 'business' | 'wife' | 'non-essential')
    | null;
  tags?: (string | null) | ExpenseTag;
  comment?: string | null;
  date?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "expenseTags".
 */
export interface ExpenseTag {
  id: string;
  name: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'users';
    value: string | User;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "header".
 */
export interface Header {
  id: string;
  logo?: string | Media | null;
  navLinks?:
    | {
        label?: string | null;
        link?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "footer".
 */
export interface Footer {
  id: string;
  bottomNavLinks?:
    | {
        label?: string | null;
        link?: string | null;
        id?: string | null;
      }[]
    | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
