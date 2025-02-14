#### CarouselCardPicker

```tsx

import {CarouselCardPicker} from

const categoryGroupField = {

  type: 'object',
  label: 'Attached Cards',
  name: 'cardGuidList',
  fields: [
    {
      type: 'string',
      label: 'Category GUID',
      name: 'guid',
    },
    {
      type: 'string',
      label: 'Card GUID List',
      name: 'cardGuidList',
      required: false,
      list: true,
    },
  ],
  ui: {
    component: CarouselCardPicker({
      outerBlocksFieldName: '<name-of-blocks-field>',
    }),
  },
};
```

##### Props

- `outerBlocksFieldName`: the name of the [block list field](https://tina.io/docs/editing/blocks#defining-our-schema) containing the card carousel schema.
  **note**: for nested fields use '.' to traverse to the field containing the CardCarousel field data.

take the field below for example.

```tsx
const blogPosts = {
  label: 'Blog Posts',
  name: 'post',
  path: 'content/post',
  fields: [
    {
      type: 'object',
      list: true,
      label: 'Sections',
      name: 'outerObject',
      fields: [
        {
          name: 'inner',
          type: 'innerObject',
          templates: [breadcrumbBlock, logoCarouselBlock, cardCarouselBlock],
        },
      ],
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/posts/explore/${document._sys.filename}`;
    },
  },
};
```

in this case you would locate the blocks rendering field using the following:

```tsx
CarouselCardPicker({
  outerBlocksFieldName: outerObject.innerObject,
});
```
