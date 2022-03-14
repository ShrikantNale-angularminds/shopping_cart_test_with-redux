import './App.css';
import Home from './Components/Home';
import Cart from './Components/Cart';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PlaceOrder from './Components/PlaceOrder';

function App() {

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path='/' element={<Navigate to={'/Home'}/>} />
          <Route path='/Home' element={<Home/>} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/place-order' element={<PlaceOrder />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
