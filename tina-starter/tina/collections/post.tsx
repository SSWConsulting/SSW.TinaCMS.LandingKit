import { breadcrumbBlock } from "../templates/breadcrumbs";
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
      templates: [
        breadcrumbBlock,
        logoCarouselBlock,
        cardCarouselBlock,
        buttonBlock,
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
