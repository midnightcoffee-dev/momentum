import type { LoaderArgs } from "@remix-run/node";
import { useLoaderData, NavLink } from "@remix-run/react";
import { requireUserSession, getUser } from "~/data/auth.server";
import { getAllCourses, getUserCourses } from "~/data/course.server";
import { CourseCard } from "~/components/course-card";
import { Separator } from "~/components/ui/separator";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserSession(request);
  const user = await getUser(userId);
  const myCourses = await getUserCourses(userId);
  const excludeIds = myCourses.map((course: any) => course.id);
  const courses = await getAllCourses(excludeIds);

  return { user, courses, myCourses };
}

export default function CoursesDashboard() {
  const { user, courses, myCourses } = useLoaderData();
  const { firstName, lastName } = user;
  const displayName =
    firstName || lastName ? `${firstName} ${lastName}` : "Student";

  const userHasCourses = myCourses && myCourses.length > 0;
  const platformHasCourses = courses && courses.length > 0;
  const hasBoth = userHasCourses && platformHasCourses;

  return (
    <div className="py-10">
      <h1 className="text-2xl leading-tight">Welcome,</h1>
      <h1 className="text-4xl font-bold leading-tight mb-10">{displayName}</h1>
      {userHasCourses && (
        <>
          <h2 className="text-2xl mb-4">Your courses</h2>
          <ul className="grid grid-cols-3 gap-4">
            {myCourses.map((userCourse: any) => (
              <NavLink
                key={`my-course-${userCourse.id}`}
                to={`/course/${userCourse.slug.current}`}
              >
                <CourseCard course={userCourse} />
              </NavLink>
            ))}
          </ul>
        </>
      )}
      {hasBoth && <Separator className="my-8" />}
      {platformHasCourses && (
        <>
          <h2 className="text-2xl mb-4">All courses</h2>
          <ul className="grid grid-cols-3 gap-4">
            {courses &&
              courses.map((course: any) => (
                <NavLink
                  key={`all-courses-${course.id}`}
                  to={`/course/${course.slug.current}`}
                >
                  <CourseCard course={course} />
                </NavLink>
              ))}
          </ul>
        </>
      )}
    </div>
  );
}
