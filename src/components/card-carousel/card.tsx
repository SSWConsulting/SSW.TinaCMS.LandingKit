import Image from "next/image";
import { useState } from "react";
import { tinaField } from "tinacms/dist/react";
import { useCarouselContext } from "../../component-providers";
import { cn } from "../../internal/shadcn/utils";
import { ListItem } from "../sub-templates/list-item";
import { PillGroup } from "../sub-templates/pill-group";
import { ColorPickerOptions } from "../sub-templates/tina-form-elements/color-selector";
import { Icon } from "../sub-templates/tina-form-elements/icon";

type Feature = {
  description?: string | null;
  icon?: string | null;
  heading?: string | null;
};

export type Chips = {
  filledChipText?: string | null;
  clearChipText?: string | null;
};

export type CardData = {
  guid?: string | null;
  chips?: Chips | null;
  mediaType?: string | null;
  youtubeUrl?: string | null;
  description?: string | null;
  heading?: string | null;
  icon?: string | null;
  altText?: string | null;
  image?: string | null;
  featureList?: {
    features?: (Feature | null)[] | null;
  } | null;
  embeddedButton?: {
    buttonText?: string | null;
    buttonLink?: string | null;
    icon?: string | null;
  } | null;
};

type CardProps = {
  data: CardData & { cardStyle: number };
  showPlaceholder: boolean;
  className?: string;
};

const Card = ({ data, showPlaceholder, className }: CardProps) => {
  const isYoutubeEmbed = data.mediaType === "youtube";
  const youtubeEmbedId = isYoutubeEmbed
    ? getYouTubeVideoId(data.youtubeUrl)
    : null;
  //If image fails to load, use placeholder provided
  const { placeholderImage, iconColor, icons } = useCarouselContext();
  const [usePlaceholder, setUsePlaceholder] = useState(false);
  //const placeholderImage = "/images/videoPlaceholder.png";

  return (
    <div
      className={cn(
        "flex shrink flex-col rounded-md text-start",
        className,
        cardColors.find((value) => {
          return value.reference === data.cardStyle;
        })?.classes
      )}
    >
      {youtubeEmbedId && isYoutubeEmbed ? (
        <YouTubeEmbed
          showSeparateChannelPreviews={false}
          controls={0}
          className="mb-2 aspect-video w-full rounded-md"
          id={youtubeEmbedId}
        />
      ) : (
        (data.image || usePlaceholder) && (
          <div
            className="relative mb-2 aspect-video w-full shrink-0 overflow-hidden rounded-md"
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
              className={"object-cover"}
            />
          </div>
        )
      )}
      <Icon
        icons={icons}
        data={{ name: data.icon }}
        className="size-6 text-sswRed"
      />
      {data.chips && <PillGroup data={data.chips} />}
      <h3
        className="pb-2 text-xl font-semibold leading-6 text-gray-200"
        data-tina-field={tinaField(data, "heading")}
      >
        {data.heading}
      </h3>
      {data.description && (
        <p
          className="text-sm font-light text-[#cccccc]"
          data-tina-field={tinaField(data, "description")}
        >
          {data.description}
        </p>
      )}
      {data.featureList?.features?.map((item, index) => {
        return <ListItem key={`feature-${index}`} icons={icons} data={item} />;
      })}
      {data.embeddedButton && (
        <div className="flex h-full flex-col-reverse justify-between">
          <a
            href={data.embeddedButton.buttonLink}
            className="pt-2 font-semibold text-white !decoration-gray-400 !decoration-1 underline transition-colors hover:text-sswRed hover:!decoration-sswRed"
          >
            {data.embeddedButton.buttonText}
            <Icon
              icons={icons}
              data={{ name: data.embeddedButton.icon }}
              className={cn("inline size-4")}
            />
          </a>
        </div>
      )}
    </div>
  );
};

// export type CardOption = {
//   name: string;
//   classes: string;
// };

// export type CardOptions = "Glass" | "Transparent" | string;

export const cardColors: ColorPickerOptions[] = [
  {
    name: "Glass",
    classes: "bg-glass text-gray-600 border-1 border-gray-600 p-4 lg:p-6",
    editorClasses:
      "bg-[linear-gradient(152.97deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0) 100%)] text-gray-800",
    reference: 0,
  },
  {
    name: "Transparent",
    classes: "bg-transparent text-black",
    editorClasses: "bg-transparent text-black",
    reference: 1,
  },
];

export { Card };

const getYouTubeVideoId = (url: string) => {
  if (!url) return null;
  // Handle different YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const YouTubeEmbed = ({
  className,
  width,
  height,
  id,
  autoplay,
  showSeparateChannelPreviews = true,
  controls = 1,
}: YouTubeEmbedProps) => {
  return (
    <iframe
      className={className}
      width={width}
      height={height}
      src={`https://www.youtube.com/embed/${id || ""}?autoplay=${
        autoplay ? 1 : 0
      }&controls=${controls}&rel=${Number(showSeparateChannelPreviews)}`}
      title="YouTube video player"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
};
type YouTubeEmbedProps = {
  className?: string;
  width?: string;
  height?: string;
  id: string;
  autoplay?: boolean;
  showSeparateChannelPreviews?: boolean;
  controls?: 1 | 0;
};
