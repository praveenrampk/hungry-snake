import {
  createHashRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Outlet,
} from 'react-router-dom';
import { ROUTES } from './constants';
import HomePage from '@src/home/page';
import DashboardPage from '@src/dashboard/page';
import '@src/styles/main.css';
import TokensPage from '@src/test/pages';
import '@src/styles/main.css';
import HeaderNoBackground from '@src/components/header/header-no-bg.component';

const router = createHashRouter(
  createRoutesFromElements(
    <Route
      path={ROUTES.DEFAULT_ROUTE}
      element={
        <>
          <HeaderNoBackground />
          <Outlet />
        </>
      }
    >
      <Route index element={<HomePage />} />
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
      <Route path={ROUTES.TEST} element={<TokensPage />} />
    </Route>
  )
);

function App() {
  return (
    <div className="relative">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
