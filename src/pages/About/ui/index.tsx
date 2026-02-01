import { cn } from '../../../shared/utils/cn';
import * as m from '../../../features/Nav';

export function About() {
  const button_data = [
    { label: "ABOUT", path: "/About" },
    { label: "PORTFOLIO", path: "/Portfolio" },
    { label: "BLOG", path: "/Blog" }
  ];

  return (
    <div className={cn("bg-[#ffcccc] w-lvw flex flex-col items-center justify-center h-screen fade-in")}>
      <div className={cn("w-[200px] h-[200px] rounded-full bg-[#333] flex items-center justify-center overflow-hidden")}>
        <a href="/">
          <img src="https://via.placeholder.com/200" alt="profile" className={cn("w-full h-full object-cover")} />
        </a>
      </div>
      <div>
        <m.NavBoard data={button_data} />
      </div>
    </div>
  );
}