import { breadcrumbBlock } from "../templates/breadcrumbs";
import { buttonBlock } from "../templates/button";
import { cardCarouselBlock } from "../templates/card-carousel";
import { imageTextBlockSchema } from "../templates/image-text-block";
import { logoCarouselBlock } from "../templates/logo-carousel";
import { accordionSchema } from "../templates/accordion";

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
      templates: [
        breadcrumbBlock,
        logoCarouselBlock,
        cardCarouselBlock,
        buttonBlock,
        imageTextBlockSchema,
        accordionSchema,
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
