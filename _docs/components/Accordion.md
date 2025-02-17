# Accordion

A component that displays an accordion with heading, description, buttons, media which can be image or youtube embed.

**Note**: It's not recommended to use this component without TinaCMS because it uses the rich text field to display the description.

## Code Example

```tsx
<Accordion
  icons={AntIcons}
  callbackFunctions={callbackFunctions}
  data={block}
></Accordion>
```

## Props

- `data`:
  - `heading`
  - `isH1`: a boolean indicating whether the heading will use h1 or h2 tags (uses h2 by default)
  - `body`: flavour text under the accordion heading
  - `accordionItems`: collapsable part of the accordion component
  - `TabletTextAlignmentFieldSchema`: the configuration to specify alignment on mobile (left or center)
  - `isMultipleOpen`: allow multiple accordion items to be open at once
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
- `callbackFunctions`: a dictionary of callback functions that can be invoked when the button is clicked
