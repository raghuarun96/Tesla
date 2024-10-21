import '../src/styles/main.scss';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource/poppins'; // Defaults to weight 400
import '@fontsource/poppins/400.css'; // Specify weight
import '@fontsource/poppins/400-italic.css'; // Specify weight and style
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
