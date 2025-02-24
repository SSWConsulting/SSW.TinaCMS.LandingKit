"use client";

import * as AntIcons from "react-icons/ai";
import { useTina } from "tinacms/dist/react";
import {
  Accordion,
  Breadcrumbs,
  Button,
  CardCarousel,
  ImageTextBlock,
  LogoCarousel,
} from "ssw-tinacms-landingkit";
import type {
  PostBlocks,
  PostQuery,
} from "../tina/__generated__/types";

interface ClientPageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: PostQuery;
}

const callbackFunctions = {
  Placeholder: () => {
    alert("Replace this with your own callback function");
  },
};

export default function Post(props: ClientPageProps) {
  // data passes though in production mode and data is updated to the sidebar data in edit-mode
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });
  return (
    <>
      <Blocks blocks={data.post.blocks}></Blocks>
    </>
  );
}

type Block = PostBlocks | null | undefined;
interface BlocksProps {
  blocks: Block[] | null | undefined;
}

const Blocks = ({ blocks }: BlocksProps) => {
  if (!blocks) return <></>;
  return (
    <>
      {blocks.map((block) => {
        if (!block) {
          return <></>;
        }
        switch (block.__typename) {
          case "PostBlocksBreadcrumbs":
            return (
              <Breadcrumbs
                data={{
                  ...block,
                  //URL segment mapping is configured outside of the schema
                  breadcrumbReplacements: [
                    {
                      from: "explore",
                      to: "Explore",
                    },
                  ],
                  firstBreadcrumb: "Home",
                }}
              />
            );
          case "PostBlocksLogoCarousel":
            return <LogoCarousel repeat={10} data={block} />;
          case "PostBlocksCardCarousel":
            return (
              <CardCarousel
                icons={AntIcons}
                callbackFunctions={callbackFunctions}
                data={block}
              />
            );
          case "PostBlocksButton":
            return (
              <Button
                icons={AntIcons}
                callbackFunctions={callbackFunctions}
                data={block}
              />
            );
          case "PostBlocksImageTextBlock":
            return (
              <ImageTextBlock
                icons={AntIcons}
                callbackFunctions={callbackFunctions}
                data={block}
              ></ImageTextBlock>
            );
          case "PostBlocksAccordion":
            return (
              <Accordion
                icons={AntIcons}
                callbackFunctions={callbackFunctions}
                data={block}
              ></Accordion>
            );
        }
      })}
    </>
  );
};
