import styled from "styled-components";
import { useUser } from "../util/useUser";
import { useEffect, useState } from "react";
import { makeImgPath } from "../util/makeImgPath";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  width: 90%;
  max-width: 1920px;
  margin-top: 180px;
  min-height: 100vh;
  gap: 20px;
  h2 {
    position: absolute;
    left: 320px;
    top: -50px;
    font-size: 24px;
    font-weight: 600;
    color: #ff3d3d;
  }
`;
const Aside = styled.aside`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 500px;
  max-width: 300px;
`;
const Btn = styled.button`
  width: 100%;
  height: 50px;
  background-color: ${(props) =>
    props.active === true ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.2)"};
  color: ${(props) => (props.active ? "#f9f9f9" : "gray")};
  border: none;
  cursor: pointer;
`;
const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 1000px;
  height: 600px;
  overflow-y: auto;
  padding: 0px 20px;
`;
const Bar = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 2px;
  overflow: hidden;
  color: #f9f9f9;
  margin-bottom: 5px;
  cursor: pointer;
  transition: all ease 0.2s;
  :hover {
    transform: scale(1.02);
    background-color: rgba(0, 0, 0, 0.4);
  }
  img {
    height: 100%;
    width: 100px;
    object-fit: cover;
  }
  div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 10px;
    padding: 5px 0px;
    color: #f9f9f9;
    h3 {
      font-weight: bold;
    }
    em {
      color: #d9d9d9;
      font-size: 12px;
    }
    span {
      color: #d9d9d9;
      font-size: 10px;
    }
  }
`;
const Alarm = styled.span`
  font-size: 14px;
  color: #d9d9d9;
  margin-left: 30px;
  margin-top: 10px;
`;
const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;
const AltImg = styled.article`
  width: 100px;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  svg {
    width: 40px;
    height: 40px;
    color: gray;
  }
`;

export default function Favorits() {
  const { user } = useUser();
  const [tab, setTab] = useState("tv");
  const [tvs, setTvs] = useState([]);
  const [movies, setMovies] = useState([]);

  function fetchTv() {
    if (user?.like?.tv) {
      for (const tv of user?.like?.tv) {
        fetch(
          `https://api.themoviedb.org/3/tv/${tv}?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
        )
          .then((res) => res.json())
          .then((json) => setTvs((old) => [...old, json]));
      }
    }
  }
  function fetchMovie() {
    if (user?.like?.movie) {
      for (const movie of user?.like?.movie) {
        fetch(
          `https://api.themoviedb.org/3/movie/${movie}?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
        )
          .then((res) => res.json())
          .then((json) => setMovies((old) => [...old, json]));
      }
    }
  }

  useEffect(() => {
    fetchTv();
    fetchMovie();
  }, [user]);

  return (
    <Wrapper>
      <h2>Liked {tab === "tv" ? "Program" : "Movies"}</h2>
      <Aside>
        <Btn active={tab === "tv" ? true : false} onClick={() => setTab("tv")}>
          Tv
        </Btn>
        <Btn
          active={tab === "movie" ? true : false}
          onClick={() => setTab("movie")}
        >
          Movie
        </Btn>
      </Aside>
      <Main>
        {tab === "tv" ? (
          <Flex>
            {tvs[0] ? (
              tvs?.map((tv, index) => (
                <Link to={`/tv/${tv.id}`} key={index}>
                  <Bar>
                    {tv.backdrop_path ? (
                      <img src={makeImgPath(tv.backdrop_path, "w500")} alt="" />
                    ) : (
                      <AltImg className="img">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </AltImg>
                    )}
                    <div>
                      <h3>{tv.name}</h3>
                      <em>평점 {tv.vote_average}</em>
                      <span>
                        {tv.first_air_date}~{tv.last_air_date}
                      </span>
                    </div>
                  </Bar>
                </Link>
              ))
            ) : (
              <Alarm>There are no favorite Tv program.</Alarm>
            )}
          </Flex>
        ) : (
          <Flex>
            {movies[0] ? (
              movies?.map((movie, index) => (
                <Link to={`/movies/${movie.id}`} key={index}>
                  <Bar>
                    <img
                      src={
                        movie.backdrop_path
                          ? makeImgPath(movie.backdrop_path, "w500")
                          : null
                      }
                      alt=""
                    />
                    <div>
                      <h3>{movie.title}</h3>
                      <em>평점 {movie.vote_average}</em>
                      <span>{movie.release_date}</span>
                    </div>
                  </Bar>
                </Link>
              ))
            ) : (
              <Alarm>There are no favorite movies.</Alarm>
            )}
          </Flex>
        )}
      </Main>
    </Wrapper>
  );
}
