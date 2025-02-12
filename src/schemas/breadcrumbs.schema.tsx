import { Template } from 'tinacms';

export const BreadcrumbTemplate = (previewSrc?: string): Template => {
  return {
    label: 'Breadcrumbs',
    name: 'breadcrumbs',
    ui: {
      defaultItem: () => {
        return {
          finalBreadcrumb: 'Final Breadcrumb',
        };
      },
      previewSrc: previewSrc,
    },
    fields: [
      {
        required: true,
        name: 'finalBreadcrumb',
        type: 'string',
        label: 'Final Breadcrumb',
      },
    ],
  };
};
export default BreadcrumbTemplate;
