import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';
import Home from './components/Home/Home';
import Login from './components/User/Login/Login';
import Register from './components/User/Register/Register';
import { AppLayout } from './components/layout/AppLayout';
import Intro from './components/Intro/Intro';
import SearchResult from './components/Home/Slide/SearchResult/SearchResult';
import { DataProvider } from "./DataContext";
// import { useData } from './DataContext';
// import Create_Exams from './components/Home/Slide/Admin/Create_Exams';
// import RedirectIfLoggedIn from './components/layout/RedirectIfLoggedIn';


function App() {
  return (
    <div className='App'>
      <DataProvider>
        <Routes>
          {/* <Route path="" element={<RedirectIfLoggedIn />} > */}
            <Route path="" element={<Intro/>} /> 
            <Route path="/user/login" element={<Login />} />
            <Route path="/user/register" element={<Register />} />
          {/* </Route> */}
          <Route path="" element={<AppLayout />} >
            <Route path="/home" element={<Home />} />
            {/* <Route path="/search" element={<SearchResult />} /> */}
          </Route>
        </Routes>
      </DataProvider>
    </div>
  );
}

export default App;
