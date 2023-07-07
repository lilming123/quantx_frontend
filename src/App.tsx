import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import route from '@/routes'
function App() {
    return (
        <BrowserRouter>
            {renderRoutes(route)}
        </BrowserRouter>
    );
}

export default App;
