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

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/tv" element={<Tv />}></Route>
          <Route path="/tv/:id" element={<TvDetail />} />
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail />}>
            <Route path=":id" element={<MovieDetail />} />
          </Route>
          <Route path="/*" exact element={<Home />}></Route>
        </Routes>
        <ChatBot />
        <Shoes />
      </BrowserRouter>
    </>
  );
}

export default App;
