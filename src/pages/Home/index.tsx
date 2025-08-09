import { cn } from '../../shared/utils/cn';
import * as m from '../../widgets/m';

function Home() {
  const button_data = [
    { label: "ABOUT", path: "/about" },
    { label: "PORTFOLIO", path: "/portfolio" },
    { label: "BLOG", path: "/blog" }
  ];

  return (
    <div className={cn("bg-[#ffcccc] w-lvw flex flex-col items-center justify-center h-screen fade-in")}>
      <div className={cn("w-[200px] h-[200px] rounded-full bg-[#333] flex items-center justify-center overflow-hidden")}>
        <a href="/">
          <img src="https://via.placeholder.com/200" alt="profile" className={cn("w-full h-full object-cover")} />
        </a>
      </div>
      <div>
        <m.SwipeBoard data={button_data} />
      </div>
    </div>
  );
}

export default Home;