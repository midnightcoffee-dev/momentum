// CourseSidebarNav.jsx
import { useLoaderData } from "@remix-run/react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "~/components/ui/accordion";
import { Link } from "@remix-run/react";

export function CourseSidebarNav() {
  const { course } = useLoaderData();
  const { lessons } = course;
  return (
    <Accordion type="multiple">
      {lessons.map((lesson: any) => (
        <AccordionItem key={lesson.id} value={`lesson-${lesson.id}`}>
          <AccordionTrigger>{lesson.title}</AccordionTrigger>
          <AccordionContent>
            {lesson.contents.map((content: any) => {
              return (
                <div key={content.id}>
                  <Link to={`content/${content.slug.current}`}>
                    {content.title || "Untitled"}
                  </Link>
                </div>
              );
            })}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
