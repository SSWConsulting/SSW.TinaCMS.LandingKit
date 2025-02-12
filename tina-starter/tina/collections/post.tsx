import * as AntIcons from "react-icons/ai";
import { BreadcrumbTemplate, imageTextBlock } from "ssw-tinacms-landingkit";
import { buttonBlock } from "../templates/button";
import { cardCarouselBlock } from "../templates/card-carousel";
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
        cardCarouselBlock,
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
