import { ModeToggle } from "../theme.toggle";
import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";

export const Navbar = () => {
  return (
    <header className="flex justify-between items-center p-5 sticky top-0 bg-background z-10">
      <div className="flex justify-between items-center w-full">
        {/* <div className="text-2xl font-bold">Logo</div> */}
      </div>
      <div className="flex items-center space-x-4">
        <Button asChild variant="ghost">
          <Link to="/auth?mode=login" className="px-5 py-2 rounded">
            Login
          </Link>
        </Button>
        <Button asChild className="ml-2">
          <Link to="/auth?mode=register" className="px-5 py-2 rounded">
            Register
          </Link>
        </Button>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Navbar;
