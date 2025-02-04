import { Template } from "tinacms";

export const breadcrumbBlock: Template = {
  label: "Breadcrumbs",
  name: "breadcrumbs",
  ui: {
    defaultItem: () => {
      return {
        finalBreadcrumb: "Final Breadcrumb",
      };
    },
  },
  fields: [
    {
      required: true,
      name: "finalBreadcrumb",
      type: "string",
      label: "Final Breadcrumb",
    },
  ],
};
