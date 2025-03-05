import { Template } from "tinacms";
import { backgroundSchema } from "./background.schema";
import { backgroundOptions } from "../components/sub-templates/tina-form-elements/colour-options/block-background-options";

export const breadcrumbBlock = (previewSrc?: string): Template => {
  return {
    name: "breadcrumbs",
    label: "Breadcrumbs",
    ui: {
      defaultItem: () => {
        return {
          finalBreadcrumb: "Final Breadcrumb",
        };
      },
      previewSrc: previewSrc,
    },
    fields: [
      //@ts-expect-error – custom component typing won't be pinned down
      backgroundSchema(backgroundOptions),
      {
        required: true,
        name: "finalBreadcrumb",
        type: "string",
        label: "Final Breadcrumb",
      },
    ],
  };
};
export default breadcrumbBlock;
