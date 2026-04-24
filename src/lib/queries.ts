import type { PortableTextBlock } from "@portabletext/types";
import { defineQuery } from "next-sanity";

// Types for the query responses

export interface Quote {
	text: string;
	author: {
		name: string;
		role: string;
		image: string;
	};
}

export interface AssetDimensions {
	width: number;
	height: number;
	aspectRatio: number;
}

export interface Asset {
	url: string;
	filetype: "img" | "video" | "video-stream";
	alt?: string | null;
	dimensions?: AssetDimensions | null;
}

export interface RoleItem {
	role?: string;
	people?: string;
}

export interface ProjectRoles {
	internal?: RoleItem[];
	external?: RoleItem[];
	services?: string[];
}

export type PortableTextValue = PortableTextBlock[];

export interface SecondaryDescriptionSection {
	title?: string;
	content?: PortableTextValue;
}

export interface SecondaryDescription {
	sections?: SecondaryDescriptionSection[];
}

export interface Project {
	_id: string;
	name: string;
	url?: string;
	thumbnail: string;
	subtitle: string;
	description: string;
	secondaryDescription?: SecondaryDescription | null;
	year: number;
	slug: string;
	projectType?: string | string[];
	roles?: ProjectRoles;
	mainAsset: Asset;
	secondaryAsset: Asset;
	assets?: Asset[];
	quote?: Quote;
	visible?: boolean;
}

export interface SocialLink {
	platform: string;
	url: string;
	label?: string;
}

export interface ContactPage {
	contactContent: any[];
	collaborateContent: any[];
	followContent: any[];
	email: string;
	calendarLink?: string;
	socialLinks?: SocialLink[];
}

export interface WorksPage {
	title: any[];
	featuredProjects: Project[];
}

// Project queries
export const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0] {
  _id,
  name,
  url,
  "thumbnail": thumbnail.asset->url,
  title,
  metaTitle,
  metaDescription,
  description,
  "projectType": projectType[].name,
  secondaryDescription {
    sections[] {
      title,
      content
    }
  },
  year,
  "slug": slug.current,
  visible,
  "client": client-> {
    _id,
    name,
    website,
    "logo": logo.asset->url
  },
  "mainAsset": {
    "url": select(
      mainAsset.filetype == "img" => mainAsset.image.asset->url,
      mainAsset.filetype == "video" => mainAsset.video.asset->url,
      mainAsset.filetype == "video-stream" => mainAsset.videoStream.asset->playbackId
    ),
    "filetype": mainAsset.filetype,
    "size": mainAsset.size,
    "alt": mainAsset.alt
  },
  "secondaryAsset": {
    "url": select(
      secondaryAsset.filetype == "img" => secondaryAsset.image.asset->url,
      secondaryAsset.filetype == "video" => secondaryAsset.video.asset->url,
      secondaryAsset.filetype == "video-stream" => secondaryAsset.videoStream.asset->playbackId
    ),
    "filetype": secondaryAsset.filetype,
    "size": secondaryAsset.size,
    "alt": secondaryAsset.alt
  },
  "assets": assets[] {
    "url": select(
      filetype == "img" => image.asset->url,
      filetype == "video" => video.asset->url,
      filetype == "video-stream" => videoStream.asset->playbackId
    ),
    filetype,
    size,
    alt,
    "dimensions": image.asset->metadata.dimensions
  },
  roles {
    internal[]{
      role,
      people
    },
    external[]{
      role,
      people
    },
    services
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

// About page V2 query
export const ABOUT_V2_QUERY = defineQuery(`*[_type == "about" && _id == "about"][0] {
  descriptionV2,
  servicesV2[] {
    category,
    description,
    items
  }
}`);

export interface AboutV2Page {
	descriptionV2?: string | null;
	servicesV2?:
		| { category: string; description?: string; items: string[] }[]
		| null;
}

// Contact page query
export const CONTACT_QUERY = defineQuery(`*[_type == "contact" && _id == "contact"][0] {
  contactContent,
  collaborateContent,
  followContent,
  email,
  calendarLink,
  "socialLinks": socialLinks[] {
    platform,
    url,
    label
  }
}`);

// Works page query
export const WORKS_QUERY = defineQuery(`*[_type == "works" && _id == "works"][0] {
  title,
  "featuredProjects": featuredProjects[]-> {
    _id,
    name,
    url,
    "thumbnail": thumbnail.asset->url,
    subtitle,
    description,
    year,
    "slug": slug.current,
    "projectType": projectType[].name,
    visible,
    "client": client-> {
      _id,
      name,
      website,
      "logo": logo.asset->url
    },
    "mainAsset": {
      "url": select(
        mainAsset.filetype == "img" => mainAsset.image.asset->url,
        mainAsset.filetype == "video" => mainAsset.video.asset->url,
        mainAsset.filetype == "video-stream" => mainAsset.videoStream.asset->playbackId
      ),
      "filetype": mainAsset.filetype,
      "size": mainAsset.size,
      "alt": mainAsset.alt
    },
    "secondaryAsset": {
      "url": select(
        secondaryAsset.filetype == "img" => secondaryAsset.image.asset->url,
        secondaryAsset.filetype == "video" => secondaryAsset.video.asset->url,
        secondaryAsset.filetype == "video-stream" => secondaryAsset.videoStream.asset->playbackId
      ),
      "filetype": secondaryAsset.filetype,
      "size": secondaryAsset.size,
      "alt": secondaryAsset.alt
    },
    "assets": assets[] {
      "url": select(
        filetype == "img" => image.asset->url,
        filetype == "video" => video.asset->url,
        filetype == "video-stream" => videoStream.asset->playbackId
      ),
      filetype,
      size,
      alt
    },
    quote {
      text,
      author {
        name,
        role,
        "image": image.asset->url
      }
    }
  }
}`);

// Query to get all project slugs for navigation (uses same order as /work page)
export const PROJECT_SLUGS_QUERY = defineQuery(`*[_type == "works" && _id == "works"][0].featuredProjects[]-> {
  "slug": slug.current,
  "title": name,
  "thumbnail": thumbnail.asset->url
}`);

export type ProjectSlug = {
	slug: string;
	title: string;
	thumbnail?: string;
};
