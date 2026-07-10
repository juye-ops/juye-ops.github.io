import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { PortfolioSwiper } from '../components/PortfolioSwiper';

export async function PortfolioPage() {  
  return (
    <div className='absolute inset-0'>
      <PortfolioSwiper/>
    </div>
  );
}