import type { LoaderArgs } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import VideoPlayer from "~/components/video-player";
import { Button } from "~/components/ui/button";
import { getCourseBySlug, isUserEnrolled } from "~/data/course.server";
import { CourseSidebarNav } from "~/components/course-sidebar-nav";

export let loader = async ({ request, params }: LoaderArgs) => {
  const slug = params.slug;
  const course = await getCourseBySlug(slug);
  const isEnrolled = await isUserEnrolled(request, course.id);
  return { course, isEnrolled };
};

// export async function action({ request, params }: ActionArgs) {
//   const formData = await request.formData();
//   const sanityCourseId = formData.get("sanityCourseId");
//   const userId = requireUserSession(request);
//   const pricePaid = formData.get("pricePaid");

//   const success = await purchaseAndEnroll(sanityCourseId, userId, pricePaid);

//   if (success) {
//     return {
//       redirect: `/courses/${params.slug}`,
//       message: "You have successfully purchased this course",
//     };
//   }

//   return {
//     redirect: `/courses/${params.slug}`,
//     message: "There was an error purchasing this course",
//   };
// }

type TechnologyColors = Record<
  "JavaScript" | "HTML" | "Typescript" | "CSS" | "React",
  string
>;

const technologyColors: TechnologyColors = {
  JavaScript: "bg-yellow-400",
  HTML: "bg-red-500",
  Typescript: "bg-blue-400",
  CSS: "bg-green-500",
  React: "bg-pink-500",
};

const getColorForTech = (techName: keyof TechnologyColors | string): string => {
  if (techName in technologyColors) {
    return technologyColors[techName as keyof TechnologyColors];
  } else {
    return "bg-gray-400";
  }
};

export default function CoursePage() {
  const { course, isEnrolled } = useLoaderData();
  return (
    <div className="shadow-sm rounded-lg mx-auto max-w-full p-4">
      <div className="px-4 py-5 sm:p-6">
        <h1 className="text-3xl font-semibold mb-3">{course.title}</h1>
        <div className="flex items-center space-x-2 mb-5">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                fill={i < course.stars ? "currentColor" : "none"}
                className="h-4 w-4 text-yellow-500"
                viewBox="0 0 20 20"
              >
                <path d="M10 12.382l3.846 2.019-1.469-4.548 3.656-2.807-4.699-.362L10 2.5 7.666 6.684l-4.699.362 3.656 2.807-1.468 4.548L10 12.382z" />
              </svg>
            ))}
          </div>
          <p className="text-sm">{course.stars} / 5 stars</p>
        </div>
        <div className="aspect-w-16 aspect-h-9 mb-5">
          <VideoPlayer url={course.previewUrl} />
        </div>

        <div className="mt-4">
          <ul className="flex flex-wrap mt-2">
            {course.technologies &&
              course.technologies.map((technology: any) => (
                <li
                  key={technology.id}
                  className={`py-1 px-2 mr-2 mb-2 rounded text-white ${
                    getColorForTech(technology.name) || "bg-gray-400"
                  }`}
                >
                  {technology.name}
                </li>
              ))}
          </ul>
        </div>
        <p className="text-sm">{course.description}</p>
      </div>
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div></div>
          <div>
            {isEnrolled && (
              <Button asChild variant="ghost" className="ml-2">
                <NavLink
                  to={"content/getting-started"}
                  className="px-5 py-2 rounded"
                >
                  Continue Course
                </NavLink>
              </Button>
            )}

            {!isEnrolled && (
              <div className="flex items-center space-x-3">
                <div className="text-lg text-gray-600">{`$${course.price}`}</div>
                <Button asChild className="ml-2">
                  <NavLink to={"enroll"} className="px-5 py-2 rounded">
                    Enroll Today!
                  </NavLink>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6">
        <h2 className="text-xl font-semibold mt-5 mb-3">Course Contents</h2>
        <CourseSidebarNav />
      </div>
    </div>
  );
}
