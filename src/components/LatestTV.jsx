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
  const [posts, setPosts] = useState([]);
  const { data: latest, isLoading: latestLoading } = useQuery(
    ["tv", "latest"],
    getLatestTvs
  );

  useEffect(() => {
    setPosts(latest);
  }, []);

  // console.log(latest);
  return (
    <Wrapper>
      <Title>Latest TV</Title>
      <Main></Main>
    </Wrapper>
  );
}
