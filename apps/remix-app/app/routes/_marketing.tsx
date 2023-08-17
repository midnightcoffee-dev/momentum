import { Outlet } from "@remix-run/react";
import MarketingNavbar from "~/components/marketing-navbar";

export default function MarketingLayout() {
  return (
    <div>
      <MarketingNavbar />
      <Outlet />
    </div>
  );
}
