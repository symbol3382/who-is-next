import './App.css';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {useState} from "react";
import AppRoutes from "./routes/Routes";
import {BrowserRouter} from "react-router-dom";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

let themes = {
    dark: createTheme({
        palette: {
            mode: "dark",
        }
    }),
    light: createTheme({
        palette: {
            mode: "light",
        }
    })
}

function App() {

    const [currentTheme, setCurrentTheme] = useState('dark');

    return (
        <BrowserRouter>
            <ThemeProvider theme={themes[currentTheme || 'light']}>
                <CssBaseline/>
                <AppRoutes/>
            </ThemeProvider>
        </BrowserRouter>
    );
}

export default App;
