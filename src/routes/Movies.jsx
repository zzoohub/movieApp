import { useRef, useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getNowPlay, getPopulaMovies } from "../api";
import { makeImgPath } from "../util/makeImgPath";

const Wrapper = styled.div`
  min-height: 100vh;
  max-width: 1920px;
`;
const Banner = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 800px;
  background-color: #333;
`;
const Slider = styled.div`
  position: relative;
  width: 100%;
  height: 550px;
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    :first-of-type {
      left: 5%;
    }
    :last-of-type {
      right: 5%;
    }
  }
`;
const Slide = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  transform: translateX(10vw);
  display: flex;
  height: 100%;
  transition: all ease-in-out 0.5s;
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
  img {
    width: 92%;
    height: ${(props) => (props.active ? "100%" : "85%")};
    object-fit: cover;
    transition: all ease-in-out 0.5s;
    filter: brightness(${(props) => (props.active ? "100%" : "50%")});
  }
`;

export default function Movies() {
  const { data: nowPlay, isLoading: nowPlayLoading } = useQuery(
    ["movie", "popula"],
    getNowPlay
  );
  const { data: popula, isLoading: populaLoading } = useQuery(
    ["movie", "popula"],
    getPopulaMovies
  );
  const slide = useRef();
  const [index, setIndex] = useState(0);
  const prevSlide = () => {
    setIndex((prev) => prev - 1);
  };
  const nextSlide = () => {
    setIndex((prev) => prev + 1);
  };

  return (
    <Wrapper>
      <Banner>
        <Slider>
          <Slide
            ref={slide}
            style={{
              width: `${popula?.results.length * 80}vw`,
              transform: `translateX(-${index * 80 - 10}vw)`,
            }}
          >
            {popula?.results.map((result) => (
              <Box
                key={result.id}
                active={
                  popula?.results.indexOf(result) === index ? true : false
                }
              >
                <img
                  src={
                    result.backdrop_path
                      ? makeImgPath(result.backdrop_path)
                      : ""
                  }
                ></img>
              </Box>
            ))}
          </Slide>
          <button onClick={prevSlide}>prev</button>
          <button onClick={nextSlide}>next</button>
        </Slider>
      </Banner>
    </Wrapper>
  );
}
