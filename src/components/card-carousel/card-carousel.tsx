"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { tinaField } from "tinacms/dist/react";
import {
  CardCarouselProps,
  CardCarouselProvider,
  useCarouselContext,
} from "../../component-providers";
import { Button } from "../button";
import { Card, CardData } from "./card";
import { CardList } from "./layouts/card-carousel-slideshow";
import { Tabs, useTabCarousel } from "./layouts/card-carousel-tabs";
import { cn } from "../../internal/shadcn/utils";

export type ButtonColors = "Primary" | "Secondary" | string;

type CardGuidList = {
  guid?: string | null;
  cardGuidList?: (string | null)[] | null;
};

export type CategoryGroup = {
  categoryName?: string | null;
  cardGuidList?: CardGuidList | null | null;
};

type Button = {
  buttonText?: string | null;
  //TODO: add field for callback functions
  buttonLink?: string | null;
  callbackFunction?: string | null;
  icon?: string | null;
  iconFirst?: boolean | null;
  color?: ButtonColors | null;
};

type CardCarouselData = {
  callbackFunctions?: Record<string, () => void>;
  isStacked?: boolean | null;
  heading?: string | null;
  cardBlockBody?: string | null;
  buttons?: (Button | null)[] | null;
  categoryGroup?: (CategoryGroup | null)[] | null;
  cardStyle?: number | null;
  isH1?: boolean | null;
  cards?: (CardData | null)[] | null;
};

const CardCarouselContents = ({ data }: { data: CardCarouselData }) => {
  const { icons, callbackFunctions } = useCarouselContext();
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
  }, [activeCategory, data.categoryGroup, categoryGroup]);

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
            className="my-0 mx-auto py-2 text-3xl font-bold lg:text-4xl text-gray-200"
          >
            {data.heading}
          </h1>
        ) : (
          <h2
            data-tina-field={tinaField(data, "heading")}
            className="my-0 py-2 mx-auto text-2xl font-semibold lg:text-3xl text-gray-200"
          >
            {data.heading}
          </h2>
        )}
        {data.cardBlockBody && (
          <p
            className="m-auto max-w-4xl py-2 text-base font-light text-gray-300"
            data-tina-field={tinaField(data, "cardBlockBody")}
          >
            {data.cardBlockBody}
          </p>
        )}
        {data.buttons?.length > 0 && (
          <div className="mb-4 mt-2 flex justify-center gap-3">
            {data.buttons?.map((button, index) => {
              const onClick =
                button.callbackFunction &&
                callbackFunctions &&
                callbackFunctions[button.callbackFunction]
                  ? { onClick: callbackFunctions[button.callbackFunction] }
                  : {};
              const buttonElement = (
                <Button
                  className="text-base"
                  icons={icons}
                  callbackFunctions={callbackFunctions}
                  data={button}
                />
              );

              return button.buttonLink ? (
                <Link href={button.buttonLink} key={`link-wrapper-${index}`}>
                  {buttonElement}
                </Link>
              ) : (
                <div key={`button-${index}`}>{buttonElement}</div>
              );
            })}
          </div>
        )}
        {data.isStacked && data.cards && (
          <>
            <div
              className={cn(
                data.cardStyle === 1 ? "gap-8" : "gap-4",
                data.cards?.length === 2 && "sm:grid-cols-2",
                data.cards?.length === 3 &&
                  "sm:grid-cols-2 md:grid-cols-3 lg:gap-8",
                "grid items-stretch justify-center"
              )}
            >
              {cardSet?.map((cardData, index) => {
                return (
                  <Card
                    className="w-full"
                    key={`card-${index}`}
                    showPlaceholder={hasImages}
                    // placeholder={hasImages && placeholder}
                    data={{
                      ...cardData,
                      cardStyle: data.cardStyle ?? 0,
                    }}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>
      {data.cards && !data.isStacked && (
        <div className="py-4">
          <CardList
            activeCategory={activeCategory}
            data={{ cards: cardSet, cardStyle: data.cardStyle ?? 0 }}
            hasImages={hasImages}
          />
        </div>
      )}
    </>
  );
};

export const CardCarousel = (
  props: { data: CardCarouselData } & CardCarouselProps
) => {
  const icons = props.icons ?? {};
  const data = props.data;
  const iconColor = props.iconColor ?? "text-sswRed";
  const callbackFunctions = props.callbackFunctions ?? {};
  return (
    <CardCarouselProvider value={{ iconColor, callbackFunctions, icons }}>
      <CardCarouselContents data={data} />
    </CardCarouselProvider>
  );
};
