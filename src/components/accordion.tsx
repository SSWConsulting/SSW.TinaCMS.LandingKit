"use client";

import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import { cn } from "../internal/shadcn/utils";
import { ImageComponentLayout } from "./sub-templates/image-component-layout";
import {
  AccordionRadix,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../internal/shadcn/accordion-radix";
import { Button } from "./button";

const Accordion = ({ data, icons, callbackFunctions }) => {
  const headingClasses = "my-0 py-2 text-gray-200";
  const isYouTube = data.mediaConfiguration?.mediaType === "youtube";
  const isImage =
    !isYouTube &&
    data.mediaConfiguration?.imageSource &&
    data.mediaConfiguration?.imageWidth &&
    data.mediaConfiguration?.imageHeight;
  const hasMedia = isYouTube || isImage;

  return (
    <ImageComponentLayout data={data}>
      <section
        className={cn(
          hasMedia && "thisHasMediaSomehow",
          data.tabletTextAlignment === "Center" && "text-center",
          hasMedia || "sm:text-center"
        )}
      >
        {data.isH1 ? (
          <h1
            data-tina-field={tinaField(data, "heading")}
            className={cn(headingClasses, "text-3xl font-bold lg:text-4xl")}
          >
            {data.heading}
          </h1>
        ) : (
          <h2
            data-tina-field={tinaField(data, "heading")}
            className={cn("text-2xl font-semibold lg:text-3xl", headingClasses)}
          >
            {data.heading}
          </h2>
        )}
        {data.accordionBody && (
          <p
            className="py-2 text-base font-light text-gray-300"
            data-tina-field={tinaField(data, "accordionBody")}
          >
            {data.accordionBody}
          </p>
        )}
      </section>
      {data.buttons?.length > 0 && (
        <div
          className={cn(
            "mt-5 flex flex-wrap gap-3",
            data.tabletTextAlignment === "Center" && "justify-center",
            hasMedia && "xl:justify-start"
          )}
        >
          {data.buttons?.map((button, index) => {
            return (
              <Button
                icons={icons}
                className="text-base font-semibold"
                key={`image-text-button-${index}`}
                callbackFunctions={callbackFunctions}
                data={button}
              />
            );
          })}
        </div>
      )}
      {data.accordionItems && (
        <AccordionRadix
          type={data.isMultipleOpen ? "multiple" : "single"}
          collapsible
          className="mt-14 w-full"
        >
          {data.accordionItems?.map((item, index) => {
            return (
              <AccordionItem
                key={`accord-${index}`}
                className="w-full"
                value={`accord-${index}`}
              >
                <AccordionTrigger className="border-t-1 border-gray-300 text-white">
                  {item.label}
                </AccordionTrigger>
                <AccordionContent
                  data-tina-field={tinaField(item, "content")}
                  className="marker:text-sswRed child-ul:!ml-0 descendant-ul:ml-6 descendant-ul:!list-square"
                >
                  <TinaMarkdown
                    content={item.content}
                    components={{
                      p: (props) => (
                        <p
                          {...props}
                          className="mb-3 text-base font-light text-white last:mb-0 [&>strong]:text-base [&>strong]:font-extrabold [&>strong]:text-white"
                        />
                      ),
                      h6: (props) => <h6 {...props} className="py-2" />,
                      h5: (props) => <h5 {...props} className="py-2" />,
                      h4: (props) => <h4 {...props} className="py-2" />,
                      h3: (props) => <h3 {...props} className="py-2" />,
                      h2: (props) => <h2 {...props} className="py-2" />,
                      h1: (props) => <h2 {...props} className="py-2" />,
                      //Import sadly needed as somewhere up the food chain the default ul is overridden
                      ul: (props) => (
                        <ul className="!ml-5 mb-3 mt-0" {...props} />
                      ),
                      ol: (props) => (
                        <ol className="my-0 ml-5 list-decimal" {...props} />
                      ),
                      li: (props) => (
                        <li
                          className="text-base font-light text-white"
                          {...props}
                        />
                      ),
                    }}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </AccordionRadix>
      )}
    </ImageComponentLayout>
  );
};

export default Accordion;
