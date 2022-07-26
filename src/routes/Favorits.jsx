import styled from "styled-components";
import { useUser } from "../util/useUser";
import { useEffect, useState } from "react";
import { makeImgPath } from "../util/makeImgPath";
import { Link } from "react-router-dom";
import InfoBox from "../components/InfoBox";

const Wrapper = styled.div`
  position: relative;
  /* display: flex; */
  width: 100%;
  /* max-width: 1280px; */
  min-height: 100vh;
  padding: 0 30px;
  margin: 120px auto 0px auto;
  color: #f9f9f9;
  h2 {
    font-size: 32px;
    font-weight: 600;
    margin: 150px 0 30px 15px;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: calc(100% - 30px);
  margin: 50px auto 20px;
  border-bottom: 1px solid #94979e;
`;
const Tab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 35px;
  margin-right: 30px;
  /* border-radius: 5px; */
  background: none;
  color: ${(props) => (props.tabMatch ? "#fff" : "#94979E")};
  border: none;
  border-bottom: ${(props) => (props.tabMatch ? "3px solid #ff3d3d" : "none")};
  font-size: 18px;
  font-weight: ${(props) => (props.tabMatch ? "bold" : "500")};
  cursor: pointer;
  :hover {
    filter: brightness(0.9);
  }
`;

const Main = styled.main`
  position: relative;
  /* display: flex;
  flex-direction: column;
  width: 100%; */
  /* max-width: 1000px; */
  /* height: 600px; */
  /* padding: 0px 20px; */
  padding-bottom: 100px;
`;
const Bar = styled.div`
  display: flex;
  width: 100%;
  height: 70px;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  overflow: hidden;
  color: #f9f9f9;
  margin-bottom: 5px;
  cursor: pointer;
  transition: all ease 0.2s;
  :hover {
    transform: scale(1.02);
    background-color: rgba(0, 0, 0, 0.6);
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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-rows: auto;
  gap: 20px;
  width: 100%;
  margin: 5px auto;
  height: max-content;
  padding: 15px;
`;

const Alarm = styled.span`
  font-size: 16px;
  color: #d9d9d9;
  margin-left: 20px;
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
  const [tab, setTab] = useState("movie");
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
      <h2>찜한 목록</h2>
      <Tabs>
        <Tab
          onClick={() => setTab("movie")}
          tabMatch={tab === "movie" ? true : false}
        >
          영화
        </Tab>
        <Tab
          onClick={() => setTab("tv")}
          tabMatch={tab === "tv" ? true : false}
        >
          TV쇼
        </Tab>
      </Tabs>
      <Main>
        {/* {tab === "tv" ? (
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
              <Alarm>찜한 TV쇼가 없습니다.</Alarm>
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
              <Alarm>찜한 영화가 없습니다.</Alarm>
            )}
          </Flex>
        )} */}
        {tab === "movie" ? (
          <Grid>
            {movies[0] ? (
              <>
                {movies?.map((movie, index) => (
                  <Link key={index} to={`/movies/${movie.id}`}>
                    <InfoBox
                      bgUrl={
                        movie.backdrop_path
                          ? makeImgPath(movie.backdrop_path, "w500")
                          : null
                      }
                      name={movie.title}
                      voteAverage={movie.vote_average}
                      firstDate={movie.release_date}
                    ></InfoBox>
                  </Link>
                ))}
              </>
            ) : (
              <Alarm>찜한 영화가 없습니다.</Alarm>
            )}
          </Grid>
        ) : (
          <Grid>
            {tvs[0] ? (
              <>
                {" "}
                {tvs?.map((tv, index) => (
                  <Link key={index} to={`/tv/${tv.id}`}>
                    <InfoBox
                      bgUrl={
                        tv.backdrop_path
                          ? makeImgPath(tv.backdrop_path, "w500")
                          : null
                      }
                      name={tv.name}
                      voteAverage={tv.vote_average}
                      firstDate={tv.first_air_date}
                    ></InfoBox>
                  </Link>
                ))}
              </>
            ) : (
              <Alarm>찜한 TV쇼가 없습니다.</Alarm>
            )}
          </Grid>
        )}
      </Main>
    </Wrapper>
  );
}
