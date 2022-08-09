import './App.css';
import Movies from "./pages/Movies"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AddMovie from "./pages/AddMovie"
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/films/create" element={<AddMovie />} />
        <Route path="/films" element={<Movies />} />
        <Route path="/films/:slug" element={<Movies />} />
        <Route path="/" element={ <Navigate to= "/films" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
