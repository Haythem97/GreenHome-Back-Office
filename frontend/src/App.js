import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useState } from "react";
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'
import Objets from './pages/Objets'
import Sidebar from "./scenes/global/Sidebar";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Topbar from "./scenes/global/Topbar";

function App() {
    const [isSidebar, setIsSidebar] = useState(true);
    const [theme, colorMode] = useMode();

    return (
    <>
      <Router>
          <ColorModeContext.Provider value={colorMode}>
              <ThemeProvider theme={theme}>
                  <CssBaseline />
                  <div className="app">
                      <Sidebar isSidebar={isSidebar} />
                      <main className="content">
                          <Topbar setIsSidebar={setIsSidebar} />
                          <Routes>
                              <Route path='/' element={<Dashboard />} />
                              <Route path='/login' element={<Login />} />
                              <Route path='/register' element={<Register />} />
                              <Route path="/goals/:goalId" element={<Objets />} />
                          </Routes>
                      </main>
                  </div>
              </ThemeProvider>
          </ColorModeContext.Provider>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App;
