import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import InfoBox from "../components/InfoBox";
import { makeImgPath } from "../util/makeImgPath";

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  color: #f9f9f9;
  em {
    margin-right: 10px;
    font-weight: bold;
    font-size: 30px;
  }
  span {
    font-size: 22px;
    margin-top: 2px;
  }
`;
const Tabs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const Tab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 40px;
  margin: 0 5px;
  border-radius: 5px;
  background-color: ${(props) => (props.tabMatch ? "#ff3d3d" : "#d9d9d9")};
  color: ${(props) => (props.tabMatch ? "#111" : "#333")};
  border: none;
  font-size: 18px;
  font-weight: ${(props) => (props.tabMatch ? "bold" : "500")};
  cursor: pointer;
  :hover {
    filter: brightness(0.9);
  }
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-template-rows: auto;
  gap: 20px;
  width: 100%;
  margin: 20px auto;
  height: max-content;
  padding: 15px;
`;

const Contents = styled.div``;

export default function SearchedInfo() {
  const [searchedData, setSearchedData] = useState(undefined);
  const [tvs, setTvs] = useState(undefined);
  const [movies, setMovies] = useState(undefined);
  const [tab, setTab] = useState("tv");
  const [page, setPage] = useState(undefined);
  const location = useLocation();
  let keyword = new URLSearchParams(location.search).get("keyword");

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=ko&query=${keyword}&page=${page ? page : "1"}`
    )
      .then((res) => res.json())
      .then((json) => setSearchedData(json));
  }, [keyword]);

  useEffect(() => {
    setTvs(
      searchedData?.results.filter((result) => result.media_type === "tv")
    );
    setMovies(
      searchedData?.results.filter((result) => result.media_type === "movie")
    );
  }, [searchedData, keyword]);

  return (
    <>
      {searchedData ? (
        <>
          <Title>
            <em>"{keyword}"</em>
            <span>검색 결과</span>
          </Title>
          <Tabs>
            <Tab
              onClick={() => setTab("movie")}
              tabMatch={tab === "movie" ? true : false}
            >
              Movie
            </Tab>
            <Tab
              onClick={() => setTab("tv")}
              tabMatch={tab === "tv" ? true : false}
            >
              TV
            </Tab>
          </Tabs>
          <Contents>
            {tab === "movie" ? (
              <Grid>
                {movies?.map((movie) => (
                  <Link key={movie.id} to={`/movies/${movie.id}`}>
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
              </Grid>
            ) : (
              <Grid>
                {tvs?.map((tv) => (
                  <Link key={tv.id} to={`/tv/${tv.id}`}>
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
              </Grid>
            )}
          </Contents>
        </>
      ) : null}
    </>
  );
}
