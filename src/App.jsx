import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import NavBar from "./components/NavBar";
import Tv from "./routes/Tv";
import Shoes from "./components/Shoes";
import Movies from "./routes/Movies";
import ChatBot from "./components/ChatBot";
import SignUp from "./routes/SignUp";
import TvDetail from "./routes/TvDetail";
import PopulaTv from "./routes/PopulaTv";
import OnAirMovies from "./routes/OnAirMovies";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/tv/popula" element={<PopulaTv />}></Route>
          <Route path="/tv/:id" element={<TvDetail />}></Route>
          <Route path="/tv" element={<Tv />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/movies/onair" element={<OnAirMovies />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/*" exact element={<Home />}></Route>
        </Routes>
        <ChatBot />
        <Shoes />
      </BrowserRouter>
    </>
  );
}

export default App;
