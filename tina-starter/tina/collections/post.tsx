import { Template } from 'tinacms';

//Breadcrumbs configuration
const breadcrumbBlock : Template =
{
  label: "Breadcrumbs",
  name: "breadcrumbs",
  ui: {
    defaultItem: ()=>{
      return { 
      finalBreadcrumb: "Final Breadcrumb",
      }
    },
  },
  fields: [{
    name: "finalBreadcrumb",
    type: "string",
    label: "Final Breadcrumb",
    required: true,
  }]
}

const blogPosts = {
  label: "Blog Posts",
  name: "post",
  path: "content/post",
  fields: [

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
    {
      type: "object",
      list: true,
      label: "Sections",
      name: "blocks",
      templates: [breadcrumbBlock]
    }
  ],
  ui: {
    router: ({ document }) => {
      return `/posts/explore/${document._sys.filename}`;
    },
  },
};
export default blogPosts;
