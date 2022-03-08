import logo from './logo.svg';
import './App.css';
import Card from './Components/Card';
import HomePage from './Pages/HomePage';
import {BrowserRouter,Routes,Route, Router} from 'react-router-dom'
import SearchPage from './Pages/SearchPage';
import PetProfile from './Pages/PetProfile';
import Filter from './Components/Filter';
function App() {
  return <BrowserRouter>
  <Routes>
    <Route exact path='/' element={<HomePage/>}/>
    <Route path='/search' element={<SearchPage/>}></Route>
    <Route path='/pet/profile' element={<PetProfile/>}/>
    
    {/* // <Route path='/login'/> */}
    <Route path='/test' element={<Filter/>}/>
  </Routes>

   </BrowserRouter>
}

export default App;
