"use client";
import { Breadcrumbs, LogoCarousel } from "ssw-tinacms-landingkit/dist/";
import { useTina } from "tinacms/dist/react";
import type { PostBlocks, PostQuery } from "../../../../tina/__generated__/types";

interface ClientPageProps {
  query: string;
  variables: {
    relativePath: string;
  };
  data: PostQuery;
}

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
  if(!blocks) return <></>
  return <>{blocks.map((block) => { 
    if(!block) 
    {
      return <></>
    }
    switch(block.__typename) {
      case "PostBlocksBreadcrumbs":
        return  <Breadcrumbs 
        hoverColor="hover:text-blue-500"
        separatorColor="stroke-black"
        textColor="text-black"
        data={
          {
          ...block,
          //URL segment mapping is configured outside of the schema
          breadcrumbReplacements: [{
            from: "explore", to: "Explore"
          }],
          firstBreadcrumb: "Home",
        }}  />
      case "PostBlocksLogoCarousel":
        return <LogoCarousel repeat={10} data={block} /> 
      }
    })}
    </>

}