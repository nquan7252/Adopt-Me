import logo from './logo.svg';
import './App.css';
import Card from './Components/Card';
import HomePage from './Pages/HomePage';
import {BrowserRouter,Routes,Route, Router} from 'react-router-dom'
import SearchPage from './Pages/SearchPage';
import PetProfile from './Pages/PetProfile';
import Filter from './Components/Filter';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SingupPage';
import PublicRoute from './Routes/PublicRoute';
import UserPage from './Pages/UserPage';
import Contact from './Components/Contact';
import Spinner from './Components/Spinner';
import RequestLogin from './Components/RequestLogin';
import PasswordResetPage from './Pages/PasswordResetPage2';
import PasswordResetPage2 from './Pages/PasswordResetPage2';
import PasswordResetPage1 from './Pages/PasswordResetPage1';
import SelectionBar from './Components/SelectionBar';
function App() {
  return <>
  <Routes>
    <Route exact path='/' element={<HomePage/>}/>
    <Route path='/login' element={<LoginPage/>}></Route>
    <Route path='/signup' element={<SignupPage/>}></Route>
    <Route path='/user' element={<UserPage/>}></Route>
    <Route path='/search/:page' element={<SearchPage/>}></Route>
    <Route path='/pet/profile' element={<PetProfile/>}/>
    {/* // <Route path='/login'/> */}
    <Route path='/reset-password' element={<PasswordResetPage1/>}></Route>
    <Route path='/reset-password/:token' element={<PasswordResetPage2/>}></Route>
    <Route path='/test' element={<SelectionBar/>}/>
    <Route path='/reset' element={<PasswordResetPage/>}/>
  </Routes>
  <Contact/>
   </>
}

export default App;
