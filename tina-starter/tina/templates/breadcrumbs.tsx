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
      name: "finalBreadcrumb",
      type: "string",
      label: "Final Breadcrumb",
    },
  ],
};
