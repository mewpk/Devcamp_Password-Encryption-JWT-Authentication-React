import Login from "./Components/Login";
import { Routes, Route } from 'react-router-dom';
import Profile from './Components/Profile';


function App() {
  return (
    
        <Routes>
          <Route path="/" element={<Profile />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
    
  );
}

export default App;
