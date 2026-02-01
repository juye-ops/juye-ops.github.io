import { createBrowserRouter } from 'react-router';
import { Home } from '../../pages/Home/ui';
import { Portfolio } from '../../pages/Portfolio/ui';
import { Blog } from '../../pages/Blog/ui';
import { Layout } from '../../widgets/Layout';
import { About } from '../../pages/About/ui';
import { Post } from '../../pages/Post/ui/Post';

const router = createBrowserRouter([
  { path: '/', element: <Home />, },
  {
    element: <Layout />,
    children: [
      { path: '/about', element: <About />, },
      { path: '/portfolio', element: <Portfolio />, },
      { path: '/blog/:tab?', element: <Blog />, },
      { path: '/post', element: <Post />, },
    ],
  }
]);

export default router;