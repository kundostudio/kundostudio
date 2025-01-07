import { Rule } from "sanity";

export interface SkillSchema {
  name: "skill";
  fields: {
    name: {
      name: "name";
      type: "string";
      validation: (rule: Rule) => Rule;
    };
  }[];
}

export interface QuoteAuthorSchema {
  name: "name" | "role" | "image";
  type: "string" | "image";
  title: string;
  validation: (rule: Rule) => Rule;
  options?: {
    hotspot: boolean;
  };
}

export interface QuoteSchema {
  name: "quote";
  type: "object";
  fields: {
    name: "text" | "author";
    type: "text" | "object";
    title: string;
    validation?: (rule: Rule) => Rule;
    fields?: QuoteAuthorSchema[];
  }[];
}

export interface ProjectSchema {
  name: "project";
  fields: {
    name: string;
    title: string;
    type: "string" | "url" | "image" | "text" | "number" | "array" | "slug" | "quote";
    validation?: (rule: Rule) => Rule;
    options?: {
      hotspot?: boolean;
      source?: string;
      maxLength?: number;
    };
    of?: {
      type: string;
      to?: { type: string }[];
      options?: {
        hotspot: boolean;
      };
    }[];
  }[];
  preview: {
    select: {
      title: string;
      subtitle: string;
      media: string;
    };
  };
}
