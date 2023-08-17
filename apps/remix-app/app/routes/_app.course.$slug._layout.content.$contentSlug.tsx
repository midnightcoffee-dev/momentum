import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import VideoPlayer from "~/components/video-player";
import { getClient } from "~/lib/sanity";

export let loader = async ({ params, request }: LoaderArgs) => {
  const { contentSlug } = params;
  const contentQuery = `*[_type == "content" && slug.current == '${contentSlug}']{
    title, 
    "type": content.type,
    "video_url": content.video.asset->url,
  }[0]
  `;

  const content = await getClient().fetch(contentQuery);

  if (!content) throw new Error("Content not found");

  return content;
};

export default function Content() {
  const content = useLoaderData();

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-3">{content.title}</h1>
      <ContentRenderer content={content} />
    </div>
  );
}

const ContentRenderer = ({ content }: any) => {
  switch (content.type) {
    case "video":
      return <VideoPlayer url={content.video_url} />;

    default:
      return <div>Content type not supported</div>;
  }
};
