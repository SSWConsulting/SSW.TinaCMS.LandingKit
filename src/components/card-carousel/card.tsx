import Image from "next/image";
import { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { useCarouselContext } from "../../component-providers";
import { cn } from "../../internal/shadcn/utils";
import { YouTubeEmbed } from "../../internal/youtube-embed";
import { ListItem } from "../subtemplates/list-item";
import { PillGroup } from "../subtemplates/pill-group";
import { Icon } from "../subtemplates/tina-form-elements/icon";

export type CardData = {
  guid: string;
  embed: string;
  cardStyle: CardOptions;
  chips: string[];
  description: string;
  heading: string;
  contain : boolean;
  icon?: string;
  altText: string; 
  image: string;
  cardOption: CardOptions;
  featureList: {
    features: string[];
  }
  embeddedButton: { 
    buttonText?: string | null;
    buttonLink?: string | null;
    icon? : string | null;
},
};
type CardProps = {
  data: CardData;
  showPlaceholder: boolean;
}

const Card = ({ data, showPlaceholder }: CardProps) => {
  //If image fails to load, use placeholder provided
  const { placeholderImage, iconColor, icons} = useCarouselContext();
  const [usePlaceholder, setUsePlaceholder] = useState(false);
  //const placeholderImage = "/images/videoPlaceholder.png";
  return (
    <div
      className={`flex w-90 shrink flex-col rounded-md text-start ${
        cardOptions[data.cardOption].classes
      }`}
    >
      {data.embed ? (
        <YouTubeEmbed className="mb-2 min-h-36 w-full" id={data.embed} />
      ) : (
        (data.image || (placeholderImage && usePlaceholder)) && (
          <div
            className="relative mb-2 min-h-36 w-full overflow-hidden rounded-md"
            data-tina-field={tinaField(data, "image")}
          >
            <Image
              src={
                usePlaceholder
                  ? placeholderImage
                  : (data.image ?? placeholderImage)
              }
              onError={() => setUsePlaceholder(true)}
              alt={data.altText ?? "Card Image"}
              fill={true}
              className={data.contain ? "object-contain" : "object-cover"}
            />
          </div>
        )
      )}
      <Icon icons={icons} data={{ name: data.icon }} className="size-6 text-sswRed" />
      {data.chips && <PillGroup data={data.chips} />}
      <h3
        className="pb-2 text-xl font-semibold leading-6 dark:text-gray-200"
        data-tina-field={tinaField(data, "heading")}
      >
        {data.heading}
      </h3>
      {data.description && (
        <p
          className="text-sm font-light dark:text-gray-300"
          data-tina-field={tinaField(data, "description")}
        >
          {data.description}
        </p>
      )}
      {data.featureList?.features?.map((item, index) => {
        return <ListItem key={index} icons={icons} data={{description: item}} />;
      })}
      {data.embeddedButton && (
        <div className="flex h-full flex-col-reverse justify-between">
          <a
            href={data.embeddedButton.buttonLink}
            className="pt-2 font-semibold text-white !decoration-gray-400 !decoration-1 hover:!decoration-sswRed"
          >
            {data.embeddedButton.buttonText}            
            <Icon
              icons={icons}
              data={{ name: data.embeddedButton.icon }}
              className={cn(iconColor,"inline size-4")}
            />
          </a>
        </div>
      )}
    </div>
  );
};

export type CardOption = {
  name: string;
  classes: string;
}

export type CardOptions = "Glass" | "Transparent";
export const cardOptions: Record<string, CardOption>= 
{
  "Glass": {
    name: "Glass",
    classes: "bg-glass text-gray-600 border-1 border-gray-600 p-4 lg:p-6",
    //Note: this is necessary as Tina doesn't recognise tailwind config settings
    // editorClasses:
    //   "bg-[linear-gradient(152.97deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)] text-gray-800",
    // reference: 0,
  },
  "Transparent": {
    name: "Transparent",
    classes: "bg-transparent text-black",
    // reference: 1,
  },
}
export { Card };

