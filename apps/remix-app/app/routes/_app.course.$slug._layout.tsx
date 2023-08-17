import { Outlet } from "@remix-run/react";
import { CourseSidebarNav } from "~/components/course-sidebar-nav";
import type { LoaderArgs } from "@remix-run/node";
import { getClient } from "~/lib/sanity";

export let loader = async ({ request, params }: LoaderArgs) => {
  const slug = params.slug;
  const courseQuery = `*[_type == "course" && slug.current == '${slug}']{
    title,
    lessons[] ->{
      title,
      "id": _id,
      contents[] ->{
        title,
        slug,
      }
    }
  }[0]
  `;
  const course = await getClient().fetch(courseQuery);

  if (!course) throw new Error("Course not found");

  return { course };
};

export default function Layout() {
  return (
    <div className="flex gap-4">
      <main className="w-3/4">
        <Outlet />
      </main>
      <div className="w-1/4">
        <CourseSidebarNav />
      </div>
    </div>
  );
}
