import { useEffect, useState } from "react";
import env from "react-dotenv";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Tabs = styled.div``;
const Contents = styled.div``;

export default function SearchedInfo() {
  const [searchedData, setSearchedData] = useState(undefined);
  const [tvs, setTvs] = useState(undefined);
  const [movies, setMovies] = useState(undefined);
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
  }, []);

  useEffect(() => {
    setTvs(
      searchedData?.results.filter((result) => result.media_type === "tv")
    );
    setMovies(
      searchedData?.results.filter((result) => result.media_type === "movie")
    );
  }, [searchedData]);

  return (
    <>
      {searchedData ? (
        <>
          <Tabs></Tabs>
          <Contents>good</Contents>
        </>
      ) : null}
    </>
  );
}
