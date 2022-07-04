import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import NavBar from "./components/NavBar";
import Tv from "./routes/Tv";
import Shoes from "./components/Shoes";
import Movies from "./routes/Movies";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/tv" element={<Tv />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/*" element={<Home />}></Route>
        </Routes>
        <Shoes />
      </BrowserRouter>
    </>
  );
}

export default App;
