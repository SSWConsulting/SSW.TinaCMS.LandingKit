/**
 * @type {import('tinacms').Collection}
 */
import { BreadcrumbSchema } from "ssw-tinacms-launchkit/dist/";



export default {
  label: "Blog Posts",
  name: "post",
  path: "content/post",
  fields: [
    BreadcrumbSchema,
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "rich-text",
      label: "Blog Post Body",
      name: "body",
      isBody: true,
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/posts/explore/{document._sys.filename}`;
    },
  },
};
