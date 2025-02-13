import { breadcrumbBlock } from "../templates/breadcrumbs";
import { cardCarouselBlock } from "../templates/card-carousel";
import { imageTextBlockSchema } from "../templates/image-text-block";
import { logoCarouselBlock } from "../templates/logo-carousel";
import { AccordionSchema } from "ssw-tinacms-landingkit";
import { ButtonBlock } from "ssw-tinacms-landingkit";

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
        imageTextBlockSchema,
        AccordionSchema,
        ButtonBlock,
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
