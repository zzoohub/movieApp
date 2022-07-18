import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import NavBar from "./components/NavBar";
import Tv from "./routes/Tv";
import Shoes from "./components/Shoes";
import Movies from "./routes/Movies";
import ChatBot from "./components/ChatBot";
import SignUp from "./routes/SignUp";
import TvDetail from "./routes/TvDetail";
import Login from "./routes/Login";
import MovieDetail from "./routes/MovieDetail";
import Profile from "./routes/Profile";
import Favorits, { FavoritMovie, FavoritTv } from "./routes/Favorits";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <NavBar />
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/tv" element={<Tv />}></Route>
          <Route path="/tv/:id" element={<TvDetail />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail />}></Route>
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorits" element={<Favorits />}></Route>
          <Route path="/*" exact element={<Home />}></Route>
        </Routes>
        <ChatBot />
        <Shoes />
      </BrowserRouter>
    </>
  );
}

export default App;
