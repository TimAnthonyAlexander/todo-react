import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import './index.css';
import { ThemeProvider } from '@mui/material';
import { theme } from './theming/theme';
import Todo from './components/Todo';

const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Todo />
        ),
    },
]);

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <ThemeProvider
        theme={theme}
    >
        <RouterProvider
            router={router}
        />
    </ThemeProvider>
);
