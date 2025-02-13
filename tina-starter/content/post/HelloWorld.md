---
breadcrumbs:
  finalBreadcrumb: This is Configureable
title: 'Hello, World!!'
blocks:
  - finalBreadcrumb: Lorem Ipsum
    _template: breadcrumbs
  - topLabel:
      labelText: Lorem Ipsum
    heading: Lorem Ipsum
    isH1: false
    description: >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    chips:
      filledChipText: Lorem
      clearChipText: Ipsum
    featureColumns:
      twoColumns: true
      features:
        - heading: Lorem
          description: 'Ipsum dolor sit amet, consectetur adipiscing elit.'
          icon: AiFillAppstore
        - heading: Ipsum
          description: 'Lorem dolor sit amet, consectetur adipiscing elit.'
          icon: AiFillAppstore
    buttons:
      - buttonText: Lorem Ipsum
      - buttonText: Dolor Sit
    mediaConfiguration:
      mediaType: image
      placement: Right
      verticalPlacement: Centered
      mobilePlacement: Above
      imageSource: /uploads/tina.jpeg
      youtubeUrl: 'https://youtu.be/ocbPkNROnlc'
      altText: llama
    _template: imageTextBlock
  - heading: Lorem Ipsum
    body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    accordionItems:
      - label: Lorem
        content: |
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      - label: Ipsum
        content: |
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    buttons:
      - buttonText: Lorem Ipsum
      - buttonText: Dolor Sit
        color: Secondary
    _template: accordionBlock
  - isStacked: false
    heading: Lorem Ipsum
    isH1: false
    body: >-
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    buttons:
      - buttonText: Hello
        callbackFunction: Placeholder
      - buttonText: Ipsum
    cardStyle: Transparent
    cards:
      - guid: null
        mediaType: image
        youtubeUrl: ''
        heading: Lorem Ipsum
        icon: AiFillAppstore
        image: /uploads/tina.jpeg
        altText: Lorem Ipsum
        chips:
          filledChipText: Lorem
          clearChipText: Ipsum
        description: >-
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        featureList:
          features:
            - heading: Lorem Ipsum
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
              icon: AiOutlineCheck
            - heading: Lorem Ipsum
              description: >-
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              icon: AiOutlineCheck
      - guid: null
        mediaType: youtube
        youtubeUrl: 'https://youtu.be/qz2PcNRA3F4'
        heading: Lorem Ipsum
        icon: AiFillAppstore
        image: ''
        altText: Lorem Ipsum
        chips:
          filledChipText: Lorem
          clearChipText: Ipsum
        description: >-
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        featureList:
          features:
            - heading: Lorem Ipsum
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
              icon: AiOutlineCheck
            - heading: Lorem Ipsum
              description: >-
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              icon: AiOutlineCheck
      - guid: null
        mediaType: image
        youtubeUrl: 'https://youtu.be/qz2PcNRA3F4'
        heading: Lorem Ipsum
        icon: AiFillAppstore
        image: /uploads/tina.jpeg
        altText: Lorem Ipsum
        chips:
          filledChipText: Lorem
          clearChipText: Ipsum
        description: >-
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        featureList:
          features:
            - heading: Lorem Ipsum
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
              icon: AiOutlineCheck
            - heading: Lorem Ipsum
              description: >-
                Sed do eiusmod tempor incididunt ut labore et dolore magna
                aliqua.
              icon: AiOutlineCheck
      - guid: null
        mediaType: youtube
        youtubeUrl: 'https://youtu.be/qz2PcNRA3F4'
        heading: Lorem Ipsum
        icon: AiFillAppstore
        altText: Lorem Ipsum
        chips:
          filledChipText: Lorem
          clearChipText: Ipsum
        description: >-
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        featureList:
          features:
            - heading: Lorem Ipsum
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
              icon: AiOutlineCheck
            - heading: Lorem Ipsum
              description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
              icon: AiOutlineCheck
    _template: cardCarousel
  - heading: Lorem Ipsum
    maskImages: true
    logos:
      - logo: /uploads/microsoft.png
        altText: Microsoft
    _template: logoCarousel
  - buttonText: Lorem Ipsum
    callbackFunction: Placeholder
    color: Primary
    _template: button
---

