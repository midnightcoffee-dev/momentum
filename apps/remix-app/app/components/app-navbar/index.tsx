import { ModeToggle } from "../theme.toggle";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { BellIcon } from "@radix-ui/react-icons";

export const AppNavbar = () => {
  return (
    <header className="sticky bg-background top-0 z-50 flex justify-between items-center p-5">
      <div className="flex justify-between items-center w-full">
        {/* <div className="text-2xl font-bold">App Logo</div> */}
      </div>
      <div className="flex items-center space-x-4">
        <Button asChild variant="ghost">
          <Link to="/courses" className="px-5 py-2 rounded">
            Courses
          </Link>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/profile" className="px-5 py-2 rounded">
            Profile
          </Link>
        </Button>
        <Button asChild variant="ghost">
          <Link to="/api/logout" className="px-5 py-2 rounded">
            Logout
          </Link>
        </Button>
        {/* Icon placeholder for notifications or similar app-specific feature */}
        <Button variant="ghost" size="icon">
          <BellIcon name="bell" />
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
};

export default AppNavbar;
