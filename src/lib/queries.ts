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
}

export interface Client {
	_id: string;
	name: string;
	website: string;
	logo?: string;
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
	visible?: boolean;
	client?: Client;
}

export interface CarouselItem {
	_id: string;
	name: string;
	slug: string;
	src: string;
	type: "img" | "video" | "video-stream";
}

export interface HomePage {
	title: string;
	asset?: Asset;
}

export interface AboutPage {
	content: any[]; // Using 'any' for PortableText content
}

export interface SocialLink {
	platform: string;
	url: string;
	label?: string;
}

export interface ContactPage {
	contactContent: any[]; // Using 'any' for PortableText content
	collaborateContent: any[]; // Using 'any' for PortableText content
	followContent: any[]; // Using 'any' for PortableText content
	email: string;
	calendarLink?: string;
	socialLinks?: SocialLink[];
}

export interface WorksPage {
	title: string;
	subtitle?: string;
	description: any[]; // Using 'any' for PortableText content
	featuredProjects: Project[];
}

// Home page query
export const HOME_QUERY = defineQuery(`*[_type == "home" && _id == "home"][0] {
  title,
  "asset": {
    "url": select(
      asset.filetype == "img" => asset.image.asset->url,
      asset.filetype == "video" => asset.video.asset->url,
      asset.filetype == "video-stream" => asset.videoStream.asset->playbackId
    ),
    "filetype": asset.filetype
  }
}`);

// Project queries
export const PROJECTS_QUERY =
	defineQuery(`*[_type == "project" && defined(slug.current) && visible == true][0...12] {
  _id,
  name,
  url,
  "thumbnail": thumbnail.asset->url,
  subtitle,
  description,
  year,
  "slug": slug.current,
  visible,
  "client": client-> {
    _id,
    name,
    website,
    "logo": logo.asset->url
  },
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

  },
  "secondaryAsset": {
    "url": select(
      secondaryAsset.filetype == "img" => secondaryAsset.image.asset->url,
      secondaryAsset.filetype == "video" => secondaryAsset.video.asset->url,
      secondaryAsset.filetype == "video-stream" => secondaryAsset.videoStream.asset->playbackId
    ),
    "filetype": secondaryAsset.filetype,

  },
  "assets": assets[] {
    "url": select(
      filetype == "img" => image.asset->url,
      filetype == "video" => video.asset->url,
      filetype == "video-stream" => videoStream.asset->playbackId
    ),
    filetype,

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
  visible,
  "client": client-> {
    _id,
    name,
    website,
    "logo": logo.asset->url
  },
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

  },
  "secondaryAsset": {
    "url": select(
      secondaryAsset.filetype == "img" => secondaryAsset.image.asset->url,
      secondaryAsset.filetype == "video" => secondaryAsset.video.asset->url,
      secondaryAsset.filetype == "video-stream" => secondaryAsset.videoStream.asset->playbackId
    ),
    "filetype": secondaryAsset.filetype,

  },
  "assets": assets[] {
    "url": select(
      filetype == "img" => image.asset->url,
      filetype == "video" => video.asset->url,
      filetype == "video-stream" => videoStream.asset->playbackId
    ),
    filetype,

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

// Clients query
export const CLIENTS_QUERY =
	defineQuery(`*[_type == "client" && visible != false] | order(name asc) {
  _id,
  name,
  website,
  "logo": logo.asset->url,
  description
}`);

// About page query
export const ABOUT_QUERY = defineQuery(`*[_type == "about" && _id == "about"][0] {
  content
}`);

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
  subtitle,
  description,
  "featuredProjects": featuredProjects[]-> {
    _id,
    name,
    url,
    "thumbnail": thumbnail.asset->url,
    subtitle,
    description,
    year,
    "slug": slug.current,
    visible,
    "client": client-> {
      _id,
      name,
      website,
      "logo": logo.asset->url
    },
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
  
    },
    "secondaryAsset": {
      "url": select(
        secondaryAsset.filetype == "img" => secondaryAsset.image.asset->url,
        secondaryAsset.filetype == "video" => secondaryAsset.video.asset->url,
        secondaryAsset.filetype == "video-stream" => secondaryAsset.videoStream.asset->playbackId
      ),
      "filetype": secondaryAsset.filetype,
  
    },
    "assets": assets[] {
      "url": select(
        filetype == "img" => image.asset->url,
        filetype == "video" => video.asset->url,
        filetype == "video-stream" => videoStream.asset->playbackId
      ),
      filetype,
  
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
