
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import Home from "./components/Home/Home"
import Movies from "./components/Movies/Movies"
import People from "./components/People/People"
import Networks from "./components/Networks/Networks"
import About from "./components/About/About"
import TvShows from "./components/Tvshows/Tvshows"
import Login from "./components/Login/Login"
import Register from "./components/Register/Register"
import Notfound from "./components/Notfound/Notfound"
import Details from "./components/Details/Details"
import Search from "./components/Search/Search"
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import TrendingContextProvider from './components/store';



function App() {

  //Navigate (GO To Login)
  let navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  // Retrieve and decode user token, then store decoded data in state
  function saveUserData() {
    const encodedToken = localStorage.getItem('user');
    if (!encodedToken) return; // safety check
    const decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken);
  }


  // On app load, check for stored user token and restore user session (handle refresh)
  useEffect(() => {
    saveUserData();
  }, []);


  //Logout
  function logout() {
    localStorage.removeItem("user");
    setUserData(null);
    navigate('/login')
  }

  // Protected Route: redirect to login if no token
  function ProtectedRoute({ children }) {
    if (!localStorage.getItem('user')) {
      return <Navigate to="/login" replace />
    } else {
      return children;
    }
  }


  return (
    <div >
      <Navbar userData={userData} logout={logout} />
      <div className="container my-3">
        <TrendingContextProvider>


          <Routes>
            <Route path='/' element={<ProtectedRoute><Home /> </ProtectedRoute>} ></Route>
            <Route path='home' element={<ProtectedRoute><Home /> </ProtectedRoute>}></Route>
            <Route path='Details' element={<ProtectedRoute><Details /></ProtectedRoute>}></Route>
            <Route path='movies' element={<ProtectedRoute><Movies /> </ProtectedRoute>}></Route>
            <Route path='about' element={<ProtectedRoute><About /> </ProtectedRoute>}></Route>
            <Route path='tvShows' element={<ProtectedRoute> <TvShows /></ProtectedRoute>}></Route>
            <Route path='people' element={<ProtectedRoute> <People /></ProtectedRoute>}></Route>
            <Route path='networks' element={<ProtectedRoute> <Networks /> </ProtectedRoute>}></Route>
            <Route path='search' element={<ProtectedRoute> <Search /> </ProtectedRoute>}></Route>
            <Route path='login' element={<Login saveUserData={saveUserData} />}></Route>
            <Route path='register' element={<Register />}></Route>
            <Route path='*' element={<Notfound />}></Route>
          </Routes>
        </TrendingContextProvider>
      </div>

    </div>
  );
}

export default App;
