import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getLatestMovies, getNowPlay, getPopulaMovies } from "../api";
import { makeImgPath } from "../util/makeImgPath";

const Wrapper = styled.div`
  height: 200vh;
  width: 100%;
`;
const Banner = styled.div`
  max-width: 1920px;
  height: 800px;
  margin-top: 100px;
  overflow-x: hidden;
`;
const SliderWrap = styled.div`
  position: relative;
  width: 100%;
  height: 800px;
  overflow-x: scroll;
`;
const Slider = styled.div`
  position: absolute;
  display: flex;
`;
const Slide = styled.div`
  width: 80vw;
  height: 700px;
  background-image: url(${(props) => props.bgUrl});
  background-position: center;
  background-size: cover;
`;

export default function Movies() {
  const { data: latest, isLoading: latestLoading } = useQuery(
    ["movie", "latest"],
    getLatestMovies
  );
  const { data: nowPlay, isLoading: nowPlayLoading } = useQuery(
    ["movie", "popula"],
    getNowPlay
  );
  const { data: popula, isLoading: populaLoading } = useQuery(
    ["movie", "popula"],
    getPopulaMovies
  );
  const [screenX, setScreenX] = useState();

  useEffect(() => {
    window.addEventListener("resize", (event) => {
      setScreenX(event.target.outerWidth);
    });
  }, [window.screenX, setScreenX]);

  return (
    <Wrapper>
      <Banner>
        <SliderWrap>
          <Slider style={{ width: `${latest?.results?.length * screenX}px` }}>
            {popula?.results.map((result) => (
              <Slide
                key={result.id}
                bgUrl={
                  result.backdrop_path
                    ? makeImgPath(result.backdrop_path)
                    : "noImg"
                }
                style={{
                  width: `${(screenX * 0.8).toFixed(0)}px`,
                  margin: `${screenX * (0.1).toFixed(0)}px`,
                }}
              ></Slide>
            ))}
          </Slider>
        </SliderWrap>
      </Banner>
    </Wrapper>
  );
}
