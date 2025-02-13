# Image Text Block

A component that displays a series of list items, buttons, and a heading adjacent to an image or youtube embed.

**Note**: It's not recommended to use this component without TinaCMS because it uses the rich text field to display the description.

## Code Example

```tsx
// swap this with your icon library of choice
import * as AntIcons from 'react-icons/ai'


// for coniguring the outer blocks component see tina documentation https://tina.io/docs/editing/blocks#rendering-our-blocks

const callbackFunctions = {
  "<your-callback-function>"
  : ()=> {
    //stub
  }
}
// usage with tina
<ImageTextBlock
  icons={AntIcons}
  callbackFunctions={callbackFunctions}
  data={block}></ImageTextBlock>
```

## Props

- `data`:
  - `heading`
  - `description`: the descrtiption that displays next to the image (uses the tina rich text type)
  - `topLabel`:
    - `icon`: the name of the icon from the `icons` field the label uses
    - `labelText`: the text used in the label before the heading
  - `isH1`: a boolean indicating whether the heading will use h1 or h2 tags (uses h2 by default)
  - `chips`: an object containing the text for the pills below the button image
    - `filledChipText`: the text in the left-hand filled chip
    - `clearChipText`: the text in the right-hand clear chip
  - `featureColumns`: an object containing information for the list below the description
    - `twoColumns`: a boolean that determines whether the list below the paragraph will use one or two columns
    - `features`: an array used to populate the list at the bottom of the button
      - `heading`: the heading of the list item
      - `description`: the description displayed under the heading for the feature list item
      - `icon`: the name of the icon from the `icons` field the feature uses
    - `buttons`: an array of buttons displaying below the text (The fields below are the same as the fields for the button schema)
      - `buttonText`: the text that will show inside of the button
      - `buttonLink`: an optional hyperlink to wrap the button with
      - `callbackFunction`: a string matching the key of the callback function that fires on click (passed in via `callbackFunctions`)
      - `icon`: the name of the icon from the `icons` field the button uses
      - `iconFirst`: a boolean indicating whether the embedded icon (if present) will display before or after the button text
      - `color`: a string indicating the style of the button ("Primary" | "Secondary")
  - `mediaConfiguration`: an object containing formatting options for the image that displays next to the text
    - `mediaType`: the type of embed displaying adjacent to the text ("image" | "youtube")
    - `placement`: where the image (or youtube embed) sits relative to the text ("Left" | "Right")
    - `verticalPlacement`: where the image (or youtube embed) sits vertically in the window ("Centered" | "Top" | "Bottom")
    - `mobilePlacement`: where the image sits relative to the text in mobile view ("Above" | "Below")
    - `imageSource`: he url for the image in the image & text block (this will only be used when `mediaType` is set to `image`)
    - `youtubeUrl`: the full ul for the youtube video being embedded (this will only be used when `mediaType` is set to `youtube`)
- `icons`: a dictionary containing the icons used in the component with React components as values
- `callbackFunctions`: a dictionary of callback functions that can be invoked when the button is clicked
