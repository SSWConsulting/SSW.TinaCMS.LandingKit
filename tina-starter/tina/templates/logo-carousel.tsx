import { Template } from "tinacms";

const logoCarouselBlock: Template = {
  label: "Logo Carousel",
  name: "logoCarousel",
  ui: {
    defaultItem: () => {
      return {
        heading: "Lorem Ipsum",
        logos: [
          {
            logo: "/uploads/microsoft.png",
            altText: "Microsoft",
          },
        ],
      };
    },
  },
  fields: [
    {
      name: "heading",
      type: "string",
      label: "Heading",
    },

    {
      name: "maskImages",
      type: "boolean",
      label: "Mask Images",
    },
    {
      name: "logos",
      label: "Logos",
      type: "object",
      list: true,
      fields: [
        {
          label: "Logo",
          name: "logo",
          type: "image",
        },
        {
          label: "Logo Alt text",
          description: "Alt text for the logo image.",
          name: "altText",
          type: "string",
        },
      ],
    },
  ],
};

export { logoCarouselBlock };
