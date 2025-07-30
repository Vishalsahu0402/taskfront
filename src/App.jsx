import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Navbar from './componenets/Navbar.jsx'
import Signin from "./pages/Signin.jsx"
import Register from "./pages/Register.jsx"
import Home from "./pages/Home.jsx"
import AddProject from './componenets/AddProject.jsx';
import AddComment from './componenets/AddComment.jsx';
import Addprojects from './pages/AddProjects.jsx';

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Signin />} />
          <Route path="/register" element={<Register />} />
          <Route path="/addproject" element={<Addprojects />} />
          <Route path="/addcomment" element={<AddComment />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
