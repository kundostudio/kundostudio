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

export interface Asset {
	url: string;
	filetype: "img" | "video" | "video-stream";
	alt?: string | null;
}

export interface Client {
	_id: string;
	name: string;
	website: string;
	logo?: string;
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
	assets?: Asset[];
	imageDuration?: number;
}

export type PortableTextValue = PortableTextBlock[];

export interface AboutHero {
	heading?: string;
	body?: PortableTextValue;
	asset?: Asset | null;
}

export interface AboutCard {
	_key: string;
	title?: string;
	description?: PortableTextValue;
	asset?: Asset | null;
}

export interface AboutCapability {
	_key: string;
	title?: string;
	description?: PortableTextValue;
}

export interface AboutWhatWeDoSection {
	heading?: string;
	description?: PortableTextValue;
	capabilities?: AboutCapability[];
}

export interface AboutPrefooter {
	tagline?: string;
	asset?: Asset | null;
}

export interface AboutPage {
	hero?: AboutHero | null;
	cards?: AboutCard[];
	whatWeDo?: AboutWhatWeDoSection | null;
	prefooter?: AboutPrefooter | null;
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
  imageDuration,
  "assets": assets[] {
    "url": select(
      filetype == "img" => image.asset->url,
      filetype == "video" => video.asset->url,
      filetype == "video-stream" => videoStream.asset->playbackId
    ),
    filetype,
    alt
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

export const PROJECT_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0] {
  _id,
  name,
  url,
  "thumbnail": thumbnail.asset->url,
  title,
  description,
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
  hero {
    heading,
    "asset": asset {
      "url": select(
        filetype == "img" => image.asset->url,
        filetype == "video" => video.asset->url,
        filetype == "video-stream" => videoStream.asset->playbackId
      ),
      "filetype": filetype,
      alt
    }
  },
  "cards": cards[] {
    _key,
    title,
    description,
    "asset": asset {
      "url": select(
        filetype == "img" => image.asset->url,
        filetype == "video" => video.asset->url,
        filetype == "video-stream" => videoStream.asset->playbackId
      ),
      "filetype": filetype,
      alt
    }
  },
  whatWeDo {
    heading,
    description,
    "capabilities": capabilities[] {
      _key,
      title,
      description
    }
  },
  prefooter {
    tagline,
    "asset": asset {
      "url": select(
        filetype == "img" => image.asset->url,
        filetype == "video" => video.asset->url,
        filetype == "video-stream" => videoStream.asset->playbackId
      ),
      "filetype": filetype,
      alt
    }
  }
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
  }
}`);

// Query to get all project slugs for navigation (uses same order as /work page)
export const PROJECT_SLUGS_QUERY = defineQuery(`*[_type == "works" && _id == "works"][0].featuredProjects[]-> {
  "slug": slug.current,
  "title": name
}`);

export type ProjectSlug = {
	slug: string;
	title: string;
};
