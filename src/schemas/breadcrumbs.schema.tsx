
const BreadcrumbSchema =  {
      type: "object",
      name: "breadcrumbs",
      label: "Breadcrumbs",
      fields: [
        {
          type: "string",
          label: "Final Breadcrumb",
          name: "finalBreadcrumb",
          description: "The final breadcrumb in the list",
        },
      ],
};

export default BreadcrumbSchema;
