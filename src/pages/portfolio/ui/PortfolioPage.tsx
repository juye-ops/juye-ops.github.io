import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getPortfolio } from '@/entities/portfolio';
import { PortfolioSwiper } from '@/widgets/portfolio';

export async function PortfolioPage() {
  const portfolioData = await getPortfolio();
  console.log(portfolioData);

  return (
    <div className='absolute inset-0'>
      <PortfolioSwiper projects={portfolioData}/>
    </div>
  );
}