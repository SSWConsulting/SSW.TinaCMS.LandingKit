"use client";
import { tinaField, useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { PostQuery } from "../../../tina/__generated__/types";

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
  const content = data.post.body;
  return (
    <>

    <Breadcrumbs 
    hoverColor="hover:text-blue-500"
    textColor="text-black"
    data={{
      breadcrumbReplacements: [
        { from: "posts", to: "Blog" },
      ],
      finalBreadcrumb: props.data.post.title || "",
      firstBreadcrumb: "Home",
    }}  />
      <h1 data-tina-field={tinaField(data.post, "title")}>
        {data.post.title}
      </h1>
      <div data-tina-field={tinaField(data.post, "body")}>
        <TinaMarkdown content={content} />
      </div>
    </>
  );
}
