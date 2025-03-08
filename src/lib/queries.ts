import { defineQuery } from "next-sanity";

// Types for the query responses
export interface Skill {
  _id: string;
  name: string;
  category: "design" | "development" | "animation";
}

export interface Quote {
  text: string;
  author: {
    name: string;
    role: string;
    image: string;
  };
}

export interface Asset {
  url: string;
  filetype: "img" | "video" | "video-stream";
  size: "full" | "compact";
}

export interface Project {
  _id: string;
  name: string;
  url?: string;
  thumbnail: string;
  subtitle: string;
  description: string;
  year: number;
  slug: string;
  skills: Skill[];
  mainAsset: Asset;
  secondaryAsset: Asset;
  assets?: Asset[];
  quote?: Quote;
}

// Project queries
export const PROJECTS_QUERY = defineQuery(`*[_type == "project" && defined(slug.current)][0...12] {
  _id,
  name,
  url,
  "thumbnail": thumbnail.asset->url,
  subtitle,
  description,
  year,
  "slug": slug.current,
  "skills": skills[]-> {
    _id,
    name,
    category
  },
  "mainAsset": {
    "url": select(
      mainAsset.filetype == "img" => mainAsset.image.asset->url,
      mainAsset.filetype == "video" => mainAsset.video.asset->url,
      mainAsset.filetype == "video-stream" => mainAsset.videoStream.asset->playbackId
    ),
    "filetype": mainAsset.filetype,
    "size": mainAsset.size
  },
  "secondaryAsset": {
    "url": select(
      secondaryAsset.filetype == "img" => secondaryAsset.image.asset->url,
      secondaryAsset.filetype == "video" => secondaryAsset.video.asset->url,
      secondaryAsset.filetype == "video-stream" => secondaryAsset.videoStream.asset->playbackId
    ),
    "filetype": secondaryAsset.filetype,
    "size": secondaryAsset.size
  },
  "assets": assets[] {
    "url": select(
      filetype == "img" => image.asset->url,
      filetype == "video" => video.asset->url,
      filetype == "video-stream" => videoStream.asset->playbackId
    ),
    filetype,
    size
  },
  quote {
    text,
    author {
      name,
      role,
      "image": image.asset->url
    }
  }
}`);

export const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0] {
  _id,
  name,
  url,
  "thumbnail": thumbnail.asset->url,
  subtitle,
  description,
  year,
  "slug": slug.current,
  "skills": skills[]-> {
    _id,
    name,
    category
  },
  "mainAsset": {
    "url": select(
      mainAsset.filetype == "img" => mainAsset.image.asset->url,
      mainAsset.filetype == "video" => mainAsset.video.asset->url,
      mainAsset.filetype == "video-stream" => mainAsset.videoStream.asset->playbackId
    ),
    "filetype": mainAsset.filetype,
    "size": mainAsset.size
  },
  "secondaryAsset": {
    "url": select(
      secondaryAsset.filetype == "img" => secondaryAsset.image.asset->url,
      secondaryAsset.filetype == "video" => secondaryAsset.video.asset->url,
      secondaryAsset.filetype == "video-stream" => secondaryAsset.videoStream.asset->playbackId
    ),
    "filetype": secondaryAsset.filetype,
    "size": secondaryAsset.size
  },
  "assets": assets[] {
    "url": select(
      filetype == "img" => image.asset->url,
      filetype == "video" => video.asset->url,
      filetype == "video-stream" => videoStream.asset->playbackId
    ),
    filetype,
    size
  },
  quote {
    text,
    author {
      name,
      role,
      "image": image.asset->url
    }
  }
}`);

// Skills queries
export const SKILLS_QUERY = defineQuery(`*[_type == "skill"] | order(name asc) {
  _id,
  name,
  category
}`);

export const SKILLS_BY_CATEGORY_QUERY =
  defineQuery(`*[_type == "skill" && category == $category] | order(name asc) {
  _id,
  name,
  category
}`);
