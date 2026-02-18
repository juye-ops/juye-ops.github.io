import { Outlet } from "react-router";
import { StickyNavBar } from "./StickyNavBar";

export function Layout() {
  return (
    <div>
      <StickyNavBar />
      <Outlet />
    </div>
  )
}