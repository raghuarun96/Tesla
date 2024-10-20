import { Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage';
import CarsListPage from './CarlistPage';
import CarDetail from './CarDetailPage';
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/cars-list" element={<CarsListPage />} />
      <Route path="/car-detail" element={<CarDetail />} />
    </Routes>
  );
}

export default AppRoutes;
