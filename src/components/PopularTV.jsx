import { getTvPopular } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useRef, useState } from "react";
import { useEffect } from "react";
import InfiniteSlide from "./InfiniteSlide";

const Wrapper = styled.div`
  height: max-content;
  max-width: 1920px;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: #f9f9f9;
  margin: 15px 20px;
`;
export default function PopularTV() {
  return (
    <Wrapper>
      <Title>Popular TV</Title>
      <InfiniteSlide
        url={`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&language=ko`}
        offset={5}
        gap={10}
      ></InfiniteSlide>
    </Wrapper>
  );
}
