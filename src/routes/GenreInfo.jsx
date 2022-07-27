import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import InfoBox from "../components/InfoBox";
import NotFound from "../components/NotFound";
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
  margin-bottom: 50px;
`;
const Contents = styled.div`
  position: relative;
`;

export default function GenreInfo() {
  const location = useLocation();
  let keyword = new URLSearchParams(location.search).get("id");

  const [allData, setAllData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [tvs, setTvs] = useState([]);
  const [movies, setMovies] = useState([]);
  const [tab, setTab] = useState("movie");

  useEffect(() => {
    const data = [];
    const fetchData = async () => {
      for (const i of [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]) {
        await fetch(
          `https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&language=ko&page=${i}`
        )
          .then((res) => res.json())
          .then((json) => data.push(...json.results));
      }
      setAllData(data);
    };
    fetchData();
  }, [keyword]);

  useEffect(() => {
    // setMovies([]);
    // setTvs([]);
    const set = async () => {
      await setFiltered([
        ...new Set(
          allData?.filter((content) => content?.genre_ids?.includes(+keyword))
        ),
      ]);
    };
    set();
  }, [allData]);

  useEffect(() => {
    setTvs(filtered.filter((content) => content.media_type === "tv"));
    setMovies(filtered.filter((content) => content.media_type === "movie"));
  }, [filtered]);

  return (
    <>
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
      <Contents>
        {tab === "movie" ? (
          <Grid>
            {movies.length > 0 ? (
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
              <NotFound text="검색결과가 없습니다." />
            )}
          </Grid>
        ) : (
          <Grid>
            {tvs.length > 0 ? (
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
              <NotFound text="검색결과가 없습니다." />
            )}
          </Grid>
        )}
      </Contents>
    </>
  );
}
