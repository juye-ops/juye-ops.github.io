import { createBrowserRouter } from 'react-router';
import Home from '../../pages/Home';
import Portfolio from '../../pages/Portfolio';
import Blog from '../../pages/Blog';
import { Layout } from '../../widgets/layout';
import About from '../../pages/About';

const router = createBrowserRouter([
  { path: '/', element: <Home />, },
  {
    element: <Layout />,
    children: [
      { path: '/about', element: <About />, },
      { path: '/portfolio', element: <Portfolio />, },
      { path: '/blog', element: <Blog />, },
    ],
  }
]);

export default router;