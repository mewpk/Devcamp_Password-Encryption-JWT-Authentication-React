import { Routes,Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Profile from "./Components/Profile";
import Login from "./Components/Login";
import Register from "./Components/Register";


function App() {
  return (

    <>
    <Navbar/>
    <Routes>
          <Route path="/" element={<Profile />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
}

export default App;
