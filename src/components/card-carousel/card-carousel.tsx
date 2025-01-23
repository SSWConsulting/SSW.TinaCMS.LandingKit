"use client"
import { useEffect, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { CardCarouselProps, CardCarouselProvider, LinkComponentType, useCarouselContext } from "../../component-providers";
import { Button, ButtonColors } from "../button";
import { Icon } from "../subtemplates/tina-form-elements/icon";
import { Card, CardData, CardOptions } from "./card";
import { CardList } from "./layouts/card-carousel-slideshow";
import { Tabs, useTabCarousel } from "./layouts/card-carousel-tabs";

type CardGuidList = { 
  guid?: string | null;
  cardGuidList?: (string | null )[] | null;
}

export type CategoryGroup = { 
  categoryName?: string | null;
  cardGuidList?: CardGuidList | null | null;
}

type Button = {
  buttonText?: string | null;
  //TODO: add field for callback functions
  buttonLink?: string | null;
  icon?: string | null;
  iconFirst?: boolean | null;
  colour?:  ButtonColors | null;
}

type CardCarouselData = {
  linkComponent?: LinkComponentType
  isStacked? : boolean | null;
  heading?: string | null;
  body?: string | null; 
  buttons?: (Button | null) [] | null;
  categoryGroup?: (CategoryGroup | null)[] | null;
  cardStyle?: CardOptions | null;
  isH1?: boolean | null;
  cards?: (CardData | null)[] | null;
} 

const CardCarouselContents = ({ data }: {data :CardCarouselData}) => {
  const { LinkComponent, icons } = useCarouselContext();
  //Check if any images are used in cards (adds a placeholder to the other cards)
  const [hasImages, setHasImages] = useState(false);
  const { tabsData, activeCategory, categoryGroup } = useTabCarousel({
    categoryGroup: data.categoryGroup,
  });
  const [cardSet, setCardSet] = useState(data.cards);

  useEffect(() => {
    if (activeCategory && data.cards) {
      setCardSet(
        data.cards.filter((card) =>
          activeCategory.cardGuidList.cardGuidList.includes(card.guid)
        )
      );
    }
  }, [activeCategory, data.cards]);

  useEffect(() => {
    setHasImages(data.cards?.some((card) => card.image));
    setCardSet(data.cards);
  }, [data.cards]);

  return (
    <>
        <div className="flex flex-col gap-4 text-center">
          <Tabs tabsData={tabsData} categoryGroup={categoryGroup} />
          {data.isH1 ? (
            <h1
              data-tina-field={tinaField(data, "heading")}
              className="my-0 mx-auto py-2 text-3xl font-bold lg:text-4xl dark:text-gray-200"
            >
              {data.heading}
            </h1>
          ) : (
            <h2
              data-tina-field={tinaField(data, "heading")}
              className="my-0 py-2 mx-auto text-2xl font-semibold lg:text-3xl dark:text-gray-200"
            >
              {data.heading}
            </h2>
          )}
          {data.body && (
            <p
              className="m-auto max-w-4xl py-2 text-base font-light dark:text-gray-300"
              data-tina-field={tinaField(data, "body")}
            >
              {data.body}
            </p>
          )}
          {data.buttons?.length > 0 && (
            <div className={"mb-4 mt-2 flex justify-center gap-3"}>
              {data.buttons?.map((button, index) => {

                console.log("button", button);
                console.log("icons", icons);
                const iconInfo = button.icon ? { icon: () => <Icon icons={icons} data={{ name: button.icon }} /> } : { icon: undefined };
                const buttonElement = (
                  <Button
                    className="text-base font-semibold"
                    key={`image-text-button-${index}`}
                    data={{...button, ...iconInfo}}
                  />
                );

                return button.buttonLink? (
                  <LinkComponent href={button.buttonLink} key={`link-wrapper-${index}`}>
                    {buttonElement}
                  </LinkComponent>
                ) : (
                  <>{buttonElement}</>
                );
              })}
            </div>
          )}
          {data.isStacked && data.cards && (
            <>
              <div className="flex flex-wrap items-stretch justify-center gap-4 lg:gap-8">
                {cardSet?.map((cardData, index) => {
                  return (
                    <Card
                      key={`card-${index}`}
                      showPlaceholder={hasImages} 
                      // placeholder={hasImages && placeholder}
                      data={{ ...cardData, cardStyle: data.cardStyle ?? "Glass"}}
                    />
                  );
                })}
              </div>
            </>
          )}
        </div>
        {data.cards && !data.isStacked && (
          // <Container size="custom" padding="sm:px-8" className="py-4">
            <CardList
              activeCategory={activeCategory}
              data={{ cards: cardSet, cardStyle: data.cardStyle ?? "Glass" }}
              hasImages={hasImages}
            />
          // </Container>
        )}

    </>
  );
};

const defaultLinkComponent = ({href, className, children})=> <a href={href} className={className}>{children}</a>

export const CardCarousel = (props: {data: CardCarouselData} & CardCarouselProps)=> {
  const icons = props.icons ?? {};
  const data = props.data;
  const LinkComponent = props.LinkComponent ?? defaultLinkComponent;
  const iconColor = props.iconColor ?? "text-sswRed";
  const callbackFunctions = props.callbackFunctions ?? {};
  return (
    <CardCarouselProvider value={{ LinkComponent, iconColor, callbackFunctions, icons}}>
      <CardCarouselContents data={data} />
    </CardCarouselProvider>
  )
}