/**
 * @type {import('tinacms').Collection}
 */

const blogPosts = {
  label: "Blog Posts",
  name: "post",
  path: "content/post",
  fields: [
    {
      type: "object",
      label: "Breadcrumbs",
      name: "breadcrumbs",
      fields: [{
        name: "finalBreadcrumb",
        type: "string",
        label: "Final Breadcrumb",
        required: true,
      }]
    },
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
      return `/posts/explore/${document._sys.filename}`;
    },
  },
};
export default blogPosts;
