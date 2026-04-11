import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { getPortfolio } from '@/entities/portfolio';
import { PortfolioSwiper } from '@/widgets/portfolio';

export async function PortfolioPage() {
  const portfolioData = await getPortfolio();
  
  return (
    <div className='absolute inset-0'>
      <PortfolioSwiper projects={portfolioData}/>
    </div>
  );
}