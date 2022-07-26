import styled from "styled-components";
import { useUser } from "../util/useUser";
import { useEffect, useState } from "react";
import { makeImgPath } from "../util/makeImgPath";
import { Link } from "react-router-dom";
import InfoBox from "../components/InfoBox";

const Wrapper = styled.div`
  max-width: 1920px;
  min-height: 100vh;
  margin: 0 auto;
  left: 0px;
  right: 0px;
  padding: 0px 30px;
  color: #f9f9f9;
  h2 {
    font-size: 22px;
    font-weight: 600;
    margin: 150px 0 30px 15px;
  }
`;

const Tabs = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  width: calc(100% - 30px);
  margin: 20px auto;
  border-bottom: 1px solid #94979e;
`;
const Tab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 35px;
  background: none;
  color: ${(props) => (props.tabMatch ? "#fff" : "#94979E")};
  border: none;
  border-bottom: ${(props) => (props.tabMatch ? "2px solid #ff3d3d" : "none")};
  font-size: 18px;
  font-weight: ${(props) => (props.tabMatch ? "500" : "300")};
  transition: all linear 0.2s;
  cursor: pointer;
  :hover {
    filter: brightness(0.9);
  }
`;

const Main = styled.main`
  position: relative;
  padding-bottom: 100px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  grid-template-rows: auto;
  gap: 40px;
  row-gap: 60px;
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
