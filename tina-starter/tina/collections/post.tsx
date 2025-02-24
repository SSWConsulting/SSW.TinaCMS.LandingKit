import * as AntIcons from "../../node_modules/react-icons/ai";
import {
  breadcrumbBlock,
  buttonBlock,
  cardCarouselBlock,
  imageTextBlock,
  logoCarouselBlock,
  accordionBlock,
} from "../../node_modules/ssw-tinacms-landingkit/dist";

const blogPosts = {
  label: "Blog Posts",
  name: "post",
  path: "content/post",
  fields: [
    {
      type: "object",
      list: true,
      label: "Sections",
      name: "blocks",
      ui: {
        visualSelector: true,
      },
      templates: [
        breadcrumbBlock("/tina/previews/breadcrumbs.jpg"),
        logoCarouselBlock("/tina/previews/logo-carousel.png"),
        accordionBlock({
          icons: AntIcons,
          previewSrc: "/tina/previews/accordion.png",
        }),
        buttonBlock({
          icons: AntIcons,
          previewSrc: "/tina/previews/button.png",
        }),
        cardCarouselBlock({
          icons: AntIcons,
          previewSrc: "/tina/previews/card-carousel.jpg",
        }),
        imageTextBlock({
          icons: AntIcons,
          previewSrc: "/tina/previews/image-text-block.png",
        }),
      ],
    },
  ],
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "HelloWorld") {
        return "/";
      }
    },
  },
};
export default blogPosts;
