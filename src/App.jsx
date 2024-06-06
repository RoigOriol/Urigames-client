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
import AdminPrivate from "./components/AdminPrivate";
import GameList from "./pages/private-routes/GameList";
import GameDetails from "./pages/private-routes/GameDetails";
import UserProfile from "./pages/private-routes/UserProfile";
import GameCreation from "./pages/admin/GameCreation";
import GameEdition from "./pages/admin/GameEdition";
import { useContext } from "react";
import { themeContext } from "./context/theme.context";

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
          path="/games/create"
          element={
            <AdminPrivate>
              <GameCreation />
            </AdminPrivate>
          }
        />
        <Route
          path="/games/:id/edit"
          element={
            <AdminPrivate>
              <GameEdition />
            </AdminPrivate>
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
