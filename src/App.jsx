import '../src/styles/main.scss';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
};

export default App;
