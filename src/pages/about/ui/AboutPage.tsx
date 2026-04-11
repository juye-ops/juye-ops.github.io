import { getAbout } from "@/entities/about";
import { AboutSwiper } from "@/widgets/about";

export async function AboutPage() {
  const aboutData = await getAbout();

  return (
    <main style={{ position: 'relative', height: '100vh' }}>
      <AboutSwiper {...aboutData} />
    </main>
  );
}