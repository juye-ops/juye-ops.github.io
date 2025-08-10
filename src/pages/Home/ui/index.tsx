import { cn } from '../../../shared/utils/cn';
import * as m from '../../../features/Swipe';

export function Home() {
  const button_data = [
    { label: "ABOUT", path: "/about" },
    { label: "PORTFOLIO", path: "/portfolio" },
    { label: "BLOG", path: "/blog" }
  ];

  return (
    <div className={cn("bg-[#ffcccc] w-lvw flex flex-col gap-20 items-center justify-center h-screen fade-in")}>
      <div className={cn("w-[200px] h-[200px] rounded-full bg-[#333] flex items-center justify-center overflow-hidden")}>
        <a href="/">
          <img src="/src/_assets/profile.jpg" alt="profile" className={cn("w-full h-full object-cover")} />
        </a>
      </div>
      <div>
        <m.SwipeBoard data={button_data} />
      </div>
    </div>
  );
}