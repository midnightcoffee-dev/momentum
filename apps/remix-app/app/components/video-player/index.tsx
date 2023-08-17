// import imageUrlBuilder from "@sanity/image-url";
// import { getClient } from "~/lib/sanity";
type Props = {
  url: string;
};
export default function Component({ url }: Props) {
  // const client = getClient();
  // const builder = imageUrlBuilder(client);

  // const videoUrl = builder.image(url);
  return (
    <div className="relative" style={{ paddingTop: "56.25%" }}>
      <video className="absolute inset-0 w-full h-full" controls>
        <source src={url} type="video/mp4" />
      </video>
    </div>
  );
}
//https://res.cloudinary.com/dn68vijnl/video/upload/v1690147170/course-1/test-video-2_le8exc.mp4
