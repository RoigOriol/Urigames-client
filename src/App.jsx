import { Route, Routes } from "react-router-dom";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";
import ErrorPage from "./pages/ErrorPage";
import Footer from "./components/Footer";
import MyNavbar from "./components/MyNavbar";
import AboutPage from "./pages/AboutPage";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import OnlyPrivate from "./components/OnlyPrivate";
import GameList from "./pages/private-routes/GameList";
import GameDetails from "./pages/private-routes/GameDetails";
import UserProfile from "./pages/private-routes/UserProfile";
import GameCreation from "./pages/private-routes/GameCreation";
import GameEdition from "./pages/private-routes/GameEdition";
import React from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

function App() {
  const App = () => {
    const cld = new Cloudinary({ cloud: { cloudName: "dlhw4ihaf" } });

    // Use this sample image or upload your own via the Media Explorer
    const img = cld
      .image("cld-sample-5")
      .format("auto") // Optimize delivery by resizing and applying auto-format and auto-quality
      .quality("auto")
      .resize(auto().gravity(autoGravity()).width(500).height(500)); // Transform the image: auto-crop to square aspect_ratio

    return <AdvancedImage cldImg={img} />;
  };

  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route
          path="/games"
          element={
            <OnlyPrivate>
              <GameList />
            </OnlyPrivate>
          }
        />
        <Route
          path="/games/:id"
          element={
            <OnlyPrivate>
              <GameDetails />
            </OnlyPrivate>
          }
        />
        <Route
          path="/games/:id/create"
          element={
            <OnlyPrivate>
              <GameCreation />
            </OnlyPrivate>
          }
        />
        <Route
          path="/games/:id/edit"
          element={
            <OnlyPrivate>
              <GameEdition />
            </OnlyPrivate>
          }
        />
        <Route
          path="/user/:id"
          element={
            <OnlyPrivate>
              <UserProfile />
            </OnlyPrivate>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
