import './App.css'
import { Routes, Route } from "react-router-dom";
import Home from "./shared/home";
import { AdminRoutes } from './routes/adminRoutes';

function App() {


  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {AdminRoutes()}
    </Routes>
  )
}

export default App
