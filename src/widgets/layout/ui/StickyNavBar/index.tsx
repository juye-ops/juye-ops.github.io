import { Link, NavLink } from "react-router";

// SPALayout.jsx - About/Portfolio/Blog 공통 레이아웃
export function StickyNavBar() {

  return (
    <>
      <header className="sticky z-40 backdrop-blur-md bg-white/80">
        <nav className="max-w-6xl mx-auto px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">
            YourLogo
          </Link>

          <ul className="flex gap-8">
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? "font-bold border-b-2 border-current" : "hover:opacity-70"}> About</NavLink>
            </li>
            <li>
              <NavLink to="/portfolio" className={({ isActive }) => isActive ? "font-bold border-b-2 border-current" : "hover:opacity-70"}>Portfolio</NavLink>
            </li>
            <li>
              <NavLink to="/blog" className={({ isActive }) => isActive ? "font-bold border-b-2 border-current" : "hover:opacity-70"}>Blog</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
