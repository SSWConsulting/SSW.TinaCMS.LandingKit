import * as AntIcons from "react-icons/ai";
import {
  BreadcrumbTemplate,
  cardCarouselBlock,
  imageTextBlock,
} from "ssw-tinacms-landingkit";
import { buttonBlock } from "../templates/button";
import { logoCarouselBlock } from "../templates/logo-carousel";

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
        BreadcrumbTemplate("/tina/previews/breadcrumbs.jpg"),
        logoCarouselBlock,
        cardCarouselBlock({
          icons: AntIcons,
          previewSrc: "/tina/previews/card-carousel.jpg",
        }),
        buttonBlock,
        imageTextBlock({
          icons: AntIcons,
          previewSrc: "/tina/previews/image-text-block.jpg",
        }),
      ],
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/posts/explore/${document._sys.filename}`;
    },
  },
};
export default blogPosts;
