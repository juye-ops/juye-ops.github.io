import { AboutSwiper } from "@/domain/about/components/AboutSwiper";
import { getAbout } from "../utils/getAbout";

export async function AboutPage() {
  const aboutData = await getAbout();

  return (
    <main className="relative h-dvh">
      <AboutSwiper {...aboutData} />
    </main>
  );
}