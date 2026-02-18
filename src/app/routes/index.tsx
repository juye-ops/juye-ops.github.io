import { createBrowserRouter } from 'react-router';
import { Home } from '@/pages/Home/ui';
import { Portfolio } from '@/pages/Portfolio/ui';
import { Blog } from '@/pages/Blog/ui';
import { StickyNavBar } from '@/widgets/Layout/ui/StickyNavBar';
import { About } from '@/pages/About/ui';
import { PostListPage } from '@/pages/Blog/ui/PostList';
import { PostPage } from '@/pages/Blog/ui/PostPage';

const router = createBrowserRouter([
  {
    element: <StickyNavBar />,
    children: [
      { path: '/', element: <Home />, },
      { path: '/about', element: <About />, },
      { path: '/portfolio', element: <Portfolio />, },
      {
        path: 'blog',
        children: [
          { index: true, element: <Blog /> },           // /blog
          { path: ':domain', element: <PostListPage /> },       // /blog/Docker
          { path: ':domain/:category', element: <PostListPage /> },  // /blog/Docker/Volume
          { path: ':domain/:category/:slug', element: <PostPage /> }, // /blog/Docker/Volume/post-slug
        ],
      },
    ],
  }
]);

export default router;