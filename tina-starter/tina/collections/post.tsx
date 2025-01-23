import React, { useEffect, useState } from 'react';
import { Template, wrapFieldsWithMeta } from 'tinacms';
import { Checkbox } from '../../../dist';

const component = () => <React.Fragment></React.Fragment>;
//example path: "blocks.0.categoryGroup.0.cardGuidList.cardGuidList"
//example object: {blocks: [{categoryGroup: [{cardGuidList: {cardGuidList: []}}]}]}
function setNestedValue(obj: object, path: string, newValue: any) : void {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]);
    if (!current[key]) {
      throw new Error(`unable to find key ${key} in ${JSON.stringify(obj)}`);
    }
    current = current[key];
  }
  const finalKey = isNaN(Number(keys[keys.length - 1])) ? keys[keys.length - 1] : Number(keys[keys.length - 1]);
  current[finalKey] = newValue;
}

function getNestedValue(obj: object, path: string) : any {
  const keys = path.split('.');
  let current = obj;
  for (let i = 0; i < keys.length; i++) {
    const key = isNaN(Number(keys[i])) ? keys[i] : Number(keys[i]);
    if (!current[key]) {
      throw new Error(`unable to find key ${key} in ${JSON.stringify(obj)}`);
    }
    current = current[key];
  }
  return current;
}

const CarouselCardPicker = ({outerBlocksFieldName}: {outerBlocksFieldName: string} )=> {
  return wrapFieldsWithMeta(({ form, input, field }) => {
    // Gets the card carousel within the block list
    const blockComponentRegex = new RegExp(`^${outerBlocksFieldName.replaceAll(".", "\\.")}\\.(\\d+)`);
    //index of the current block
    const blockIndex = input.name.match(blockComponentRegex)[1];
    const carouselField = getNestedValue(form.getState().values, outerBlocksFieldName);
    const f = carouselField[parseInt(blockIndex)]
    console.log(f)
    console.log("block index", blockIndex)
    console.log("block field", carouselField) 
    console.log("field from index", f)

    const formState = form.getState();
    const values = formState.values;
    const [fieldValues, setFieldValues] = useState(
      input.value?.cardGuidList ?? []
    );
    const [options, setOptions] = useState([]);
    useEffect(() => {
      if (!input.value?.guid) {
        input.onChange({
          guid: GUIDFunction(),
          cardGuidList: [],
        });
      }
      setOptions(f.cards)
      const cards = values.blocks[blockIndex].cards;
      let cardListClone = JSON.parse(JSON.stringify(cards));
      let missingGuidFound = false;
      for(let i in values.blocks[blockIndex].cards)
      {
        if(values.blocks[blockIndex].cards[i].guid === null)
        {
          cardListClone[i].guid = GUIDFunction();
          missingGuidFound = true;
        }
        if(missingGuidFound)
        {
          values.blocks[blockIndex].cards = cardListClone;
        }
      }
    });
    return (
      <div>
        <div className="flex flex-col gap-4">
          {options.length === 0 && <p>No cards found.</p>}
          {options?.map((item, index) => {
            return (
              <div
                key={`${index}-${item}`}
                className="flex flex-wrap gap-2"
              >
                <Checkbox
                  disabled={!item.guid}
                  checked={fieldValues.includes(item.guid)}
                  onCheckedChange={(checked) => {
                    const newFieldValues = checked
                      ? [...fieldValues, item.guid]
                      : fieldValues.filter(
                          (value) => value !== item.guid
                        );
                    const newObjectValue = {
                      ...input.value,
                      cardGuidList: newFieldValues,
                    };
                    setFieldValues(newFieldValues);
                    return input.onChange(newObjectValue);
                  }}
                />
                <label
                  className={`${!item.guid ? "text-gray-600" : ""} text-wrap`}
                >
                  {item.heading ||
                    item.altText ||
                    `Unlabeled – ${item.guid}`}
                </label>
              </div>
            );
          })}
        </div>
      </div>
    );
  })
}

const defaultCardItem = {
  guid: null,
  altText: "Lorem Ipsum",
  chips: {
    chips: [
      {
        filledChipText: "Lorem",
        clearChipText: "Ipsum",
      },
    ],
  },
  icon: "info",
  heading: "Lorem Ipsum",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  featureList: {
    features: [
      {
        heading: "Feature 1",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        icon: "Tina",
      },
      {
        heading: "Feature 2",
        description:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        icon: "Tina",
      },
    ],
  },
  embeddedButton: {
    buttonText: "Lorem",
  },
};

//Breadcrumbs configuration
const breadcrumbBlock : Template =
{
  label: "Breadcrumbs",
  name: "breadcrumbs",
  ui: {
    defaultItem: ()=>{
      return { 
      finalBreadcrumb: "Final Breadcrumb",
      }
    },
  },
  fields: [{
    name: "finalBreadcrumb",
    type: "string",
    label: "Final Breadcrumb",
    required: true,
  }]
}

//LogoCarousel configuration
const logoCarouselBlock : Template = { 
  label: "Logo Carousel",
  name: "logoCarousel",
  ui: {
    defaultItem: ()=>{  
      return {
        heading: "Lorem Ipsum",
        logos: [{ 
          logo: "/uploads/microsoft.png",
          altText: "Microsoft"
        }],
      }
    }
  },
  fields: [{
    name: "heading",
    type: "string",
  },

  {
    name: "maskImages",
    type: "boolean",
    label: "Mask Images",
  },
  {
    name: "logos",
    type: "object",
    list: true,
    fields: [{
      name: "logo",
      type: "image",
    },
    {
      name: "altText",
      type: "string",
    }
    ]
  },
]}



const GUIDFunction = () => Math.random().toString(36).substring(7);


const defaultCardBlock = { 
  defaultItem: {
    buttons: [
      {
        buttonText: "Lorem",
        colour: 0,
      },
      {
        buttonText: "Ipsum",
        colour: 1,
      },
    ],
    isStacked: false,
    heading: "Lorem Ipsum",
    isH1: false,
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    categoryGroup: [
      {
        categoryName: "Lorem",
        cardGuidList: {
          cardGuidList: [],
        },
      },
      {
        categoryName: "Dolor",
        cardGuidList: {
          cardGuidList: [],
        },
      },
    ],
    buttonRow: [
      {
        buttonText: "Lorem",
      },
      {
        buttonText: "Ipsum",
      },
    ],
    cards: [
      defaultCardItem,
      defaultCardItem,
      defaultCardItem,
      defaultCardItem,
      defaultCardItem,
    ],
  },
}



// Example usage
// const obj = {
//   blocks: [
//     {
//       categoryGroup: [
//         {
//           cardGuidList: 'oldValue'
//         }
//       ]
//     }
//   ]
// };

const cardCarouselBlock : Template = {
  label: "Card Carousel",
  ui: defaultCardBlock,
  name: "cardCarousel",
  fields: [
    {
      type: "object",
      label: "Category Group",
      name: "categoryGroup",
      list: true,
      description: "The category that cards fit into",
      fields: [
        {
          type: "string",
          label: "Category Name",
          name: "categoryName",
          description: "Text to include on the tab.",
        },
        //This is a little convoluted, due to the way Tina limits data passing between components
        //We can get all form values from the custom component, but still need to identify the correct block
        //The hidden GUIDs let us find the correct block, category, and card list to use.
        {
          type: "object",
          label: "Attached Cards",
          name: "cardGuidList",
          fields: [
            {
              type: "string",
              label: "Category GUID",
              name: "guid",
            },
            {
              type: "string",
              label: "Card GUID List",
              name: "cardGuidList",
              list: true,
            },
          ],
          ui: {
            component: CarouselCardPicker({outerBlocksFieldName: "blocks"}),
          },
        },
      ],
    },
    {
      label: "Heading",
      name: "heading",
      type: "string",
    },
    {
      name: "cardStyle",
      type: "string",
      label: "Card Style",
      options:["Glass", "Transparent"]
    },
    {
      label: "Buttons",
      name: "buttons", 
      type: "object",
      list: true,
      fields: [

        {
          label: "Button Text",
          name: "buttonText",
          type: "string",
        },
        {
          label: "Button Link",
          name: "buttonLink",
          type: "string",
        },
        {
          name: "icon",
          type: "string",
          label: "Icon",
        },
        
        
      ]
    },
    {
      type: "object",
      label: "Cards",
      name: "cards",
      description: "The list of cards to be displayed.",
      list: true,
      ui: {
        itemProps: (item) => {
          return { label: item?.heading ?? "Card" };
        },
        defaultItem: defaultCardItem,
      },
      fields: [
        {
          type: "string",
          label: "guid",
          name: "guid",
          // ui: {
          //   component: ()=> <></>
          // },
        },

        {
          type: "image",
          label: "Image",
          name: "image",
          description: "Image source for the card.",
        },
        {
          type: "string",
          label: "Alt Text",
          name: "altText",
          description: "Alternative text for the card.",
        },

        {
          type: "string",
          label: "Description",
          name: "description",
          ui: {
            component: "textarea",
          },
        },
      
      ]
    }
  ]
}
        // @ts-expect-error – Tina doen't reconize imported fields
        // mediaTypeField,
        // @ts-expect-error – Tina doen't reconize imported fields
        // youtubeEmbedField,


        // {
        //   name: "chips",
        //   label: "Chips",
        //   type: "object",
        //   description: "Add chips to the bottom of the media text block.",
        //   //@ts-expect-error – fields are not being recognized
        //   fields: pillGroupSchema,
        // },
        // {
        //   type: "string",
        //   label: "Icon",
        //   name: "icon",
        //   ui: {
        //     // @ts-expect-error – component is not being recognized
        //     component: IconPickerInput,
        //   },
        // },
        // {
        //   type: "string",
        //   label: "Heading",
        //   name: "heading",
        // },

        // {
        //   name: "featureList",
        //   label: "Feature List",
        //   description:
        //     "A list of text-icon entries to go under the description.",
        //   type: "object",
        //   fields: [
        //     {
        //       list: true,
        //       type: "object",
        //       label: "Features",
        //       name: "features",
        //       description: "Add an item to the the feature columns.",
        //       //@ts-expect-error – fields are not being recognized
        //       fields: listItemSchema,
        //       ui: {
        //         defaultItem: {
        //           heading: "Lorem Ipsum",
        //           description:
        //             "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        //         },
        //       },
        //     },
        //   ],
        // },
        // {
        //   type: "object",
        //   label: "Embedded Button",
        //   name: "embeddedButton",
        //   description: "The link appearing at the bottom of each card.",
        //   fields: [
        //     {
        //       type: "string",
        //       label: "Button Text",
        //       name: "buttonText",
        //       description: "Text to appear on the button.",
        //     },
        //     {
        //       type: "string",
        //       label: "Button Link",
        //       name: "buttonLink",
        //       description: "Link to the page the button will navigate to.",
        //     },
            // {
            //   type: "string",
            //   label: "Icon",
            //   name: "icon",
            //   ui: {
            //     // @ts-expect-error – component is not being recognized
            //     component: IconPickerInput,
            //   },
            // },
    //     ],
    //   },
    // },


const blogPosts = {
  label: "Blog Posts",
  name: "post",
  path: "content/post",
  fields: [

    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "rich-text",
      label: "Blog Post Body",
      name: "body",
      isBody: true,
    },
    {
      type: "object",
      list: true,
      label: "Sections",
      name: "blocks",
      templates: [breadcrumbBlock, logoCarouselBlock, cardCarouselBlock]
    }
  ],
  ui: {
    router: ({ document }) => {
      return `/posts/explore/${document._sys.filename}`;
    },
  },
};
export default blogPosts;


export const pillGroupSchema = [
  {
    type: "string",
    label: "Filled Chip",
    name: "filledChipText",
    description: "Text for the filled chip.",
  },
  {
    type: "string",
    label: "Clear Chip",
    name: "clearChipText",
    description: "Text for the clear chip.",
  },
];


const mediaTypeField = {
  type: "string",
  label: "Media Type",
  name: "mediaType",
  description: "Choose between image or YouTube video",
  default: "image",
  optional: true,
  ui: {
    component: "select",
    options: ["image", "youtube"],
  },
};


export const listItemSchema = [
  {
    type: "string",
    label: "Heading",
    name: "heading",
  },
  {
    type: "string",
    label: "Description",
    name: "description",
  },
  // {
  //   type: "string",
  //   label: "Icon",
  //   name: "icon",
  //   ui: {
  //     component: IconPickerInput,
  //   },
  // },
];