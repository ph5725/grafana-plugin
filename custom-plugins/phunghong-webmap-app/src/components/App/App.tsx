import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AppRootProps } from '@grafana/data';
import { ROUTES } from '../../constants';
const PageOne = React.lazy(() => import('../../pages/PageOne'));
const PageTwo = React.lazy(() => import('../../pages/PageTwo'));
const PageThree = React.lazy(() => import('../../pages/PageThree'));
const PageFour = React.lazy(() => import('../../pages/PageFour'));
const PageMap = React.lazy(() => import('../../pages/PageMap'));
const ArcGISLink = React.lazy(() => import('../../pages/ArcGISLink'));

function App(props: AppRootProps) {
  return (
    <Routes>
      <Route path={ROUTES.Two} element={<PageTwo />} />
      <Route path={`${ROUTES.Three}/:id?`} element={<PageThree />} />
      <Route path={`${ROUTES.Three}/:id?`} element={<PageThree />} />
      <Route path={ROUTES.Map} element={<PageMap />} />
      <Route path={ROUTES.Link} element={<ArcGISLink />} />

      {/* Full-width page (this page will have no side navigation) */}
      <Route path={ROUTES.Four} element={<PageFour />} />

      {/* Default page */}
      <Route path="*" element={<PageOne />} />
    </Routes>
  );
}

export default App;
