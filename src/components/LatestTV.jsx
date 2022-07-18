import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useQuery } from "react-query";
import { useState } from "react";
import { getLatestTvs } from "../api";
import { useEffect } from "react";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
`;
const Main = styled.main`
  max-width: 1920px;
  margin: 0 auto;
  margin-top: 150px;
`;
const Title = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: #f9f9f9;
  margin: 15px 20px;
`;

export default function LatestTV() {
  const [posts, setPosts] = useState({});
  const { data: latest, isLoading: latestLoading } = useQuery(
    ["tv", "latest"],
    getLatestTvs
  );
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/tv/top_rated?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
    )
      .then((res) => res.json())
      .then((data) => setPosts(data.results));
    console.log(posts);
  }, []);

  return (
    <Wrapper>
      <Title>Latest TV</Title>
      <Main></Main>
    </Wrapper>
  );
}
