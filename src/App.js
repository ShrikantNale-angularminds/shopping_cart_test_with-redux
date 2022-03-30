import './App.css';
import Home from './Components/home/Home';
import Cart from './Components/cart/Cart';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PlaceOrder from './Components/placeOrder/PlaceOrder';
import Pagination from './Components/pagination/Pagination';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path='/' element={<Navigate to={'/Home'} />} />
          <Route path='/Home' element={<Home />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/place-order' element={<PlaceOrder />} />
        </Routes>
      </Router>
      <ToastContainer
        theme='colored'
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
