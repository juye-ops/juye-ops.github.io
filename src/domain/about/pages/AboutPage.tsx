import { AboutSwiper } from "@/domain/about/components/AboutSwiper";
import { getAbout } from "../types/getAbout";

export async function AboutPage() {
  const aboutData = await getAbout();

  return (
    <main style={{ position: 'relative', height: '100vh' }}>
      <AboutSwiper {...aboutData} />
    </main>
  );
}