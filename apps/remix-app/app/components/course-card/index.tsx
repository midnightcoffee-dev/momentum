import { CircleIcon, StarIcon } from "@radix-ui/react-icons";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import type { Course } from "~/types";

type Props = {
  course: Course;
};

export function CourseCard({ course }: Props) {
  return (
    <Card className="hover:bg-accent">
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle className="line-clamp-2">{course.title}</CardTitle>
          <CardDescription>
            Beautifully designed components built with Radix UI and Tailwind
            CSS.
          </CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md text-primary">
          <Button variant="ghost" className="px-3 shadow-none">
            <StarIcon className="mr-2 h-4 w-4" />
            Star
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <StarIcon className="mr-1 h-3 w-3" />
            20k
          </div>
          <div>Updated April 2023</div>
        </div>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          {course?.technologies?.map((tech) => (
            <div key={tech.id} className="flex items-center">
              <CircleIcon
                className={`mr-1 h-3 w-3 ${getColorForTech(tech.name)}`}
              />
              {tech.name}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

type TechnologyColors = Record<
  "JavaScript" | "HTML" | "Typescript" | "CSS" | "React",
  string
>;

const technologyColors: TechnologyColors = {
  JavaScript: "text-yellow-400",
  HTML: "text-red-500",
  Typescript: "text-blue-400",
  CSS: "text-green-500",
  React: "text-pink-500",
};

const getColorForTech = (techName: keyof TechnologyColors | string): string => {
  return techName in technologyColors
    ? technologyColors[techName as keyof TechnologyColors]
    : "default-color-class"; // replace with your default color class
};
