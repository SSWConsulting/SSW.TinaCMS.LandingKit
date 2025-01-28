#### Card Carousel

A component that displays a list of cards, either in a slideshow or adjacent to one another.

```tsx
// using with TinaCMS
import { Breadcrumbs } from 'ssw-tinacms-landingkit/dist/';

import * as Icons from 'react-icons/<library>';

<CardCarousel
  icons={Icons}
  data={
    {
      // ...<data from tina>}
    }
  }
/>;

// using with out TinaCMS

<CardCarousel
  icons={AntIcons}
  data={{
    categoryGroup: [
      {
        categoryName: '<category-name>',
        cardGuidList: {
          cardGuidList: ['1'],
        },
      },
      {
        categoryName: '<category-name>',
        cardGuidList: {
          cardGuidList: ['2'],
        },
      },
    ],
    isH1: false,
    isStacked: false,
    heading: '<heading>',
    body: '<flavor-text>',
    buttons: [
      {
        buttonText: '<button-1>',
        buttonLink: '/learn-more',
        icon: '<icon-name>',
        color: 'Primary',
      },
      {
        buttonText: '<button-n>',
        buttonLink: '<url>',
        icon: '<icon-name>',
        color: 'Secondary',
      },
    ],
    cardStyle: 'Glass',
    cards: [
      {
        guid: '1',
        chips: {
          filledChipText: '<chip-text>',
          clearChipText: '<chip-text>',
        },
        mediaType: 'image',
        image: '<image-url>',
        altText: '<image-alt-text>',
        heading: '<card-1-heading>',
        description: '<card-1-description>',
        featureList: {
          features: [
            {
              heading: '<feature-1>',
              description: '<feature-1-description>',
              icon: 'AiOutlineCheck',
            },
            {
              heading: '<feture-2>',
              description: '<feature-1-description>',
              icon: 'AiOutlineCheck',
            },
          ],
        },
        embeddedButton: {
          buttonText: '<button-text>',
          buttonLink: '<url>',
          icon: 'AiOutlineArrowRight',
        },
      },
      {
        guid: '2',
        chips: {
          filledChipText: '<chip-text>',
          clearChipText: '<chip-text>',
        },
        mediaType: 'youtube',
        youtubeUrl: 'https://www.youtube.com/watch?v=<video-id>',
        heading: '<card-2-heading>',
        description: '<card-2-description>',
        featureList: {
          features: [
            {
              heading: '<feature-1>',
              description: '<feature-1-description>',
              icon: 'AiOutlineCheck',
            },
            {
              heading: '<feature-2>',
              description: '<feature-2-description>',
              icon: 'AiOutlineCheck',
            },
          ],
        },
        embeddedButton: {
          buttonText: '<button-text>',
          buttonLink: '<url>',
          icon: 'AiOutlineArrowRight',
        },
      },
    ],
  }}
/>;
```

##### Props

- `data`: Object containing the breadcrumb content
  - `categoryGroup`:
    - `categoryName`: The name of the group the cards will sit under
    - `cardGuidList`: an object containing the list of card guids assigned to the tab
      - `cardGuidList`: a list of guids for the cards that will display when this tab is clicked
    - `isH1`: Whether or not the title of the component will use a level 1 heading
    - `body`: some flavor text that will display above the cards
    - `buttons`: an array of buttons that will display beneath the card list
      - `buttonText`: the text that will show inside of the button
      - `buttonLink`: an optional hyperlink to wrap the button with
      - `icon`: the name of the icon component that will display next to the button
      - `color`: a string indicating the style of the button ("Primary" or "Secondary")
    - `cardStyle`: a string indicating the style for the cards ("Glass" or "Transparent")
    - `cards`:
      - `guid`: an ID representing the card (used in the categoryGroup field)
      - `chips`: an object containing the text for the pills below the button image
        - `filledChipText`:
        - `clearChipText`
      - `mediaType`: a string indicating the type of media that will be shown in the card ("image" or "youtube")
      - `youtubeUrl`: The name of the youtube video to embed at the top of the card (e.g. `https://www.youtube.com/watch?v=9bZkp7q19f0`)
      - `heading`: The heading at the top of the card
      - `description`: The flavor text for the card,
      - `featureList`: an object containing information
        - `features`: an array used to populate the list at the bottom of the button
          - `heading`: the heading of the list item
          - `description`: the description displayed under the heading for the feature list item
          - `icon`: the name of the icon from the `icons` field the button uses
      - `embeddedButton`: The link displayed at the bottom of the card
        - `buttonText`: '<button-text>',
        - `buttonLink`: The name of the icon from the `icons` field the button uses
        - `icon`: The name of the icon from the `icons` field the button uses
- `icons`: a dictionary containing the icons the user can chose from as React components
