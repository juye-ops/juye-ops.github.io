import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { PortfolioSwiper } from '../components/PortfolioSwiper';
import { getPortfolio } from '@/domain/portfolio/utils/getPortfolio';

export async function PortfolioPage() {
  const portfolioData = await getPortfolio();
  
  return (
    <div className='absolute inset-0'>
      <PortfolioSwiper projects={portfolioData}/>
    </div>
  );
}