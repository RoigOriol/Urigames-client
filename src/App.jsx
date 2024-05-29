import "./App.css";
import { Route, Routes } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/Footer";
import MyNavbar from "./components/MyNavbar";
import AboutPage from "./pages/AboutPage"
import Home from "./pages/Home"
import { Container } from "react-bootstrap";

function App() {
  return (
    <div >
      <MyNavbar />
     
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/"element ={<Home />}/>

        </Routes>
        <Footer />
      
    </div>
  );
}

export default App;
