import { createBrowserRouter } from 'react-router';
import Home from '../../pages/Home/ui';
import Portfolio from '../../pages/Portfolio/ui';
import Blog from '../../pages/Blog/ui';
import { Layout } from '../../widgets/Layout';
import About from '../../pages/About/ui';

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