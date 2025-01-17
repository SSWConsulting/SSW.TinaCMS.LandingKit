"use client";
import { useTina } from "tinacms/dist/react";
import type { PostQuery } from "../../../../tina/__generated__/types";

import { Breadcrumbs } from "ssw-tinacms-launchkit/dist/";

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
  console.log("data",data);
  return (
    <>
    <h2>Breadcrumbs</h2>
    {
      data.post.breadcrumbs && <Breadcrumbs 
      hoverColor="hover:text-blue-500"
      separatorColor="stroke-black"
      textColor="text-black"
      data={{
        ...data.post?.breadcrumbs,
        firstBreadcrumb: "Home",
      }}  />

    }



    <h2>Card Carousel</h2>

{/* 
    <CardCarousel data={

      
    }>


    </CardCarousel> */}
    </>
  );
}
