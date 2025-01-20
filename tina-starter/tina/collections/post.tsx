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

//LogoCarousel configuration
const logoCarouselBlock : Template = { 
  label: "Logo Carousel",
  name: "logoCarousel",
  ui: {
    defaultItem: ()=>{  
      return {
        heading: "Lorem Ipsum",
        logos: [{ 
          logo: "/uploads/microsoft.png",
          altText: "Microsoft"
        }],
      }
    }
  },
  fields: [{
    name: "heading",
    type: "string",
  },

  {
    name: "maskImages",
    type: "boolean",
    label: "Mask Images",
  },
  {
    name: "logos",
    type: "object",
    list: true,
    fields: [{
      name: "logo",
      type: "image",
    },
    {
      name: "altText",
      type: "string",
    }
    ]
  },
]}

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
      templates: [breadcrumbBlock, logoCarouselBlock]
    }
  ],
  ui: {
    router: ({ document }) => {
      return `/posts/explore/${document._sys.filename}`;
    },
  },
};
export default blogPosts;
