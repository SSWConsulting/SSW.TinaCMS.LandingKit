import { Template } from "tinacms";
import { backgroundSchema } from "./background.schema";
import { ColorPickerOptions } from "../interfaces/color-options";
import { defaultBackgroundOptions } from "../internal/default-config/default-bg-options";

const BreadcrumbsSchemaGenerator: (options?: {backgroundColors?: ColorPickerOptions[], previewSrc?: string}) => Template = (options = {}) => {
    return {
      name: "breadcrumbs",
      label: "<SSW> Breadcrumbs",
      ui: {
        ...(options?.previewSrc ? {previewSrc: options.previewSrc} : {}),
      },
      fields: [
        backgroundSchema(options?.backgroundColors ?? defaultBackgroundOptions),
        {
          type: "string",
          label: "Final Breadcrumb",
          name: "finalBreadcrumb",
          description: "The final breadcrumb in the list",
        },
      ],
  } as Template;
};

export default BreadcrumbsSchemaGenerator;
