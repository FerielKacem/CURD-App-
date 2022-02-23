
import './App.css';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router , Route , Routes } from 'react-router-dom';
import Home from './pages/Home';
import Addcontact from './pages/Addcontact';

import View from './pages/View';
function App() {
  return (
    

<Router>
<div className="App">
      <ToastContainer position="top-center"/>
<Routes>
    <Route path='/'  element ={<Home/>}></Route>
    <Route path='/Addcontact'  element ={<Addcontact/>}></Route>
    <Route path='/update/:id'  element ={<Addcontact/>}></Route>
    <Route path='/view/:id'  element ={<View/>}></Route>
</Routes>
</div>
</Router>
  


   
  );
}

export default App;
