import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Branch from './Pages/Branch/Branch';
import AuthProvider from './Pages/Context/AuthProvider';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import PrivateRoute from './Pages/PrivateRoute/PrivateRoute';
import Register from './Pages/Register/Register';

function App() {
  return (
    <div className="App">
     <AuthProvider>
     <BrowserRouter>
       <Routes>
        <Route path="/" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/home" element={<PrivateRoute> <Home></Home></PrivateRoute>}></Route>
       </Routes>
      </BrowserRouter>
     </AuthProvider>
    
      
    </div>
  );
}

export default App;
