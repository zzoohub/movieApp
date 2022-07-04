import { useEffect, useState } from "react";
import env from "react-dotenv";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { makeImgPath } from "../util/makeImgPath";

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  color: #f9f9f9;
  em {
    margin-right: 10px;
    font-weight: bold;
    font-size: 28px;
  }
  span {
    font-size: 24px;
  }
`;
const Tabs = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;
const Tab = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  height: 50px;
  margin: 0 30px;
  border-radius: 5px;
  background-color: ${(props) => (props.tabMatch ? "gold" : "#333")};
  color: #fff;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: repeat(auto-fill, 1fr);
  gap: 10px;
  max-width: 1440px;
  margin: 30px auto;
`;
const Item = styled.div`
  display: flex;
  flex-direction: column;
  height: 200px;
`;
const Img = styled.div`
  width: 100%;
  height: 200px;
  background-position: center;
  background-size: cover;
  background-image: url(${(props) => props.bgImg});
`;

const Contents = styled.div``;

export default function SearchedInfo() {
  const [searchedData, setSearchedData] = useState(undefined);
  const [tvs, setTvs] = useState(undefined);
  const [movies, setMovies] = useState(undefined);
  const [tab, setTab] = useState("movie");
  const [page, setPage] = useState(undefined);
  const location = useLocation();
  let keyword = new URLSearchParams(location.search).get("keyword");

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/search/multi?api_key=${
        env.API_KEY
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
              영화
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
                  <Item key={movie.id}>
                    <Img bgImg={makeImgPath(movie.backdrop_path, "w500")} />
                    <h3>{movie.title}</h3>
                    <p>평점: {movie.vote_average}</p>
                  </Item>
                ))}
              </Grid>
            ) : (
              <Grid>
                {tvs?.map((tv) => (
                  <Item key={tv.id}>
                    <Img bgImg={makeImgPath(tv.backdrop_path, "w500")} />
                    <h3>{tv.title}</h3>
                    <p>평점: {tv.vote_average}</p>
                  </Item>
                ))}
              </Grid>
            )}
          </Contents>
        </>
      ) : null}
    </>
  );
}
