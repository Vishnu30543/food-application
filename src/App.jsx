import { BrowserRouter, Routes, Route } from "react-router-dom"
import Menu2 from "./components/Menu2";
import Home from "./components/Home";
import './index.css'
import Admin1 from "./components/Admin2";
import Success from "./components/Successpage";
import Cart from "./components/Cart";
import Failurepage from "./components/Failurepage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu2 />} />
        <Route path="/about" element={<Home />} />
        <Route path="/contact" element={<Home />} />
        <Route path="/admin" element={<Admin1 />} />
        <Route path="/success" element={<Success />} />
        <Route path="/cancel" element={<Failurepage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;