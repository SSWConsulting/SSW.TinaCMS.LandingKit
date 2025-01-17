// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselPickItem,
//   useCarousel,
// } from "@/components/ui/carousel";
// import {
//   Consultingv2BlocksCardCarouselCards as CarouselCard,
//   Consultingv2BlocksCardCarouselCategoryGroup,
// } from "@/tina/types";

import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselPickItem, useCarousel } from "../../../internal/shadcn/carousel";
import { Card, CardData, CardOptions } from "../card";

type Chip = {
  filledChipText: string,
  clearChipText: string

}

type ActiveCategory = { 
  categoryName: string,
  cardGuidList: {
    guid: string
    cardGuidList: string[]
  }

}

type CarouselCard = { 
  Heading: string
  guid: string,
  mediaType: string,
  youtubeUrl: string,
  image: string,
  altText: string,
  chips: Chip[],
}


type CardSlideshowProps = {
  data: {
    cards: CardData[];
    cardStyle: CardOptions;
  };
  hasImages: boolean;
  activeCategory: ActiveCategory;
};

const CardList = ({ activeCategory, data, hasImages }: CardSlideshowProps) => {
  const [cardData, setCardData] = useState(data.cards);
  const [indexLength, setIndexLength] = useState(0);

  useEffect(() => {
    if (
      activeCategory &&
      activeCategory?.cardGuidList?.cardGuidList &&
      data.cards
    ) {
      setCardData(
        data.cards.filter((card) => {
          return activeCategory?.cardGuidList.cardGuidList.includes(card.guid);
        })
      );
    } else {
      setCardData([]);
    }
  }, [activeCategory, data.cards]);
  useEffect(() => {
    setCardData(data.cards);
    setIndexLength(data.cards?.length ?? 0);
  }, [data]);

  return (
    <div>
      <div className="mask-horizontal-fade">
        <Carousel
          opts={{
            align: "center",
            loop: true,
            containScroll: false,
          }}
          className="w-full max-w-9xl"
          itemLength={indexLength}
        >
          <CarouselContent>
            {cardData?.map((cardData, index) => {
              return (
                <CarouselItem
                  className="flex basis-72 md:basis-96"
                  key={`card-carousel-${index}`}
                >
                  <Card
                    placeholder={hasImages}
                    data={{ ...cardData, cardOption: data.cardStyle }}
                  />
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <div className="m-auto flex w-3/4 justify-center gap-2 p-6">
            {cardData?.map((_, index) => {
              return (
                <CarouselButton
                  key={`carousel-button-${index}`}
                  index={index}
                />
              );
            })}
          </div>
        </Carousel>
      </div>
    </div>
  );
};

const CarouselButton = ({ index }) => {
  const { selectedIndex } = useCarousel();
  return (
    <CarouselPickItem
      className={`h-0.5 w-full max-w-8 rounded-full sm:h-1 ${selectedIndex === index ? "bg-gray-300" : "bg-gray-500"}`}
      index={index}
    ></CarouselPickItem>
  );
};

export { CardList };

