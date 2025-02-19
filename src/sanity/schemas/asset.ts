import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export default defineType({
  name: "asset",
  type: "object",
  title: "Asset",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "filetype",
      type: "string",
      title: "File Type",
      initialValue: "img",
      options: {
        list: [
          { title: "Image / GIF", value: "img" },
          { title: "Video", value: "video" },
          { title: "Video Streaming", value: "video-stream" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "size",
      type: "string",
      title: "Size",
      initialValue: "compact",
      options: {
        list: [
          { title: "Full", value: "full" },
          { title: "Compact", value: "compact" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Image",
      options: {
        hotspot: true,
      },
      hidden: ({ parent }) => parent?.filetype !== "img",
    }),
    defineField({
      name: "video",
      type: "file",
      title: "Video",
      hidden: ({ parent }) => parent?.filetype !== "video",
    }),
    defineField({
      name: "videoStream",
      type: "mux.video",
      title: "Video Streaming",
      hidden: ({ parent }) => parent?.filetype !== "video-stream",
    }),
  ],
});
