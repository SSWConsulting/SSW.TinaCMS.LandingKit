import * as AntIcons from "../../node_modules/react-icons/ai";
import {
  buttonBlock,
  BreadcrumbTemplate,
  cardCarouselBlock,
  imageTextBlock,
} from "../../node_modules/ssw-tinacms-landingkit/dist";

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
      return `/posts/explore/${document._sys.filename}`;
    },
  },
};
export default blogPosts;
