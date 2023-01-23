import './App.css';
import  Home  from "./Components/Home";
import  Cart  from "./Components/Cart";
import Submit from './Components/Submit';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Invoice from './Components/Invoice';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart/:id/:id" element={<Cart />} />
          <Route path="/invoice/:id/:id/:id" element={<Invoice />} />
          <Route path="/thanks" element={<Submit />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
