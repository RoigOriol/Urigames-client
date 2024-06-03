import "./App.css";
import { Route, Routes } from "react-router-dom";
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
import { useContext } from "react";
import { themeContext } from "./context/theme.context";

import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";

function App() {
  const { isDarkTheme } = useContext(themeContext);

  return (
    <div className={isDarkTheme ? "darkTheme" : "lightTheme"}>
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

      <div style={{ height: "100px" }}></div>

      <Footer />
    </div>
  );
}

export default App;
