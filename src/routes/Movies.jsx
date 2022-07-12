import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import env from "react-dotenv";
import styled from "styled-components";
import {
  getNowPlay,
  getPopulaMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../api";
import SlideAuto from "../components/AutoSlider";
import InfiniteSlide from "../components/InfiniteSlide";
import SlideMulti from "../components/multiSlider";
import { makeImgPath } from "../util/makeImgPath";

const Wrapper = styled.div`
  min-height: 100vh;
  height: max-content;
  max-width: 1920px;
`;
const Banner = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 650px;
  margin-top: 120px;
`;
const BigTitle = styled.h2`
  position: absolute;
  left: 15%;
  top: 0%;
  font-size: 28px;
  font-weight: bold;
  color: #f9f9f9;
`;
const Slider = styled.div`
  position: relative;
  width: 100%;
  height: 550px;
  button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    cursor: pointer;
    :hover svg {
      color: rgba(255, 255, 255, 0.6);
    }
    svg {
      width: 70px;
      height: 70px;
      color: rgba(255, 255, 255, 0.2);
    }
  }
`;
const Prev = styled.button`
  left: 7%;
`;
const Next = styled.button`
  right: 6%;
`;

const Slide = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  display: flex;
  width: ${(props) => props.slideWidth}vw;
  transform: translateX(
    ${(props) => (props.translate === "base" ? 10 : -props.translate)}vw
  );
  height: 100%;
  transition: all ease-in-out 0.5s;
`;
const Box = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 100%;
  pointer-events: ${(props) => (props.active ? "all" : "none")};
  :hover h3 {
    display: block;
    opacity: 1;
    transform: translateX(50px);
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    pointer-events: ${(props) => (props.active ? "all" : "none")};
    height: ${(props) => (props.active ? "100%" : "65%")};
    transition: all ease-in-out 0.5s;
    filter: brightness(${(props) => (props.active ? "100%" : "30%")});
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 1px solid transparent;
    transition: all ease-in-out 0.2s;
    :hover {
      border: 1px solid #fff;
      border-style: outset;
    }
  }
`;
const BoxDetail = styled.h3`
  position: absolute;
  bottom: 5%;
  left: 5%;
  opacity: 0;
  font-size: 44px;
  font-weight: bold;
  color: #f9f9f9;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 10px 20px;
  transition: all ease-in-out 0.2s;
`;
const NowPlay = styled.section`
  width: 100%;
  height: 250px;
`;
const Upcoming = styled(NowPlay)``;
const TopRated = styled(NowPlay)`
  height: 450px;
`;
const Title = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: #f9f9f9;
  margin: 15px 20px;
`;

export default function Movies() {
  const { data: popula, isLoading: populaLoading } = useQuery(
    ["movie", "popula"],
    getPopulaMovies
  );
  // const { data: nowPlay, isLoading: nowPlayLoading } = useQuery(
  //   ["movie", "nowPlay"],
  //   getNowPlay
  // );
  const { data: upcoming, isLoading: upcomingLoading } = useQuery(
    ["movie", "upcoming"],
    getUpcomingMovies
  );
  const { data: topRated, isLoading: topRatedLoading } = useQuery(
    ["movie", "toprated"],
    getTopRatedMovies
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
        <BigTitle>Popula Movies</BigTitle>
        <Slider>
          <Slide
            ref={slide}
            slideWidth={popula?.results.length * 80}
            translate={index ? index * 80 - 10 : "base"}
          >
            {popula?.results.map((result) => (
              <Box
                key={result.id}
                active={
                  popula?.results.indexOf(result) === index ? true : false
                }
              >
                <Link to={`/movies/${result.id}`}>
                  <img
                    src={
                      result.backdrop_path
                        ? makeImgPath(result.backdrop_path)
                        : ""
                    }
                  ></img>
                </Link>
                <BoxDetail>{result.title}</BoxDetail>
              </Box>
            ))}
          </Slide>
          {index ? (
            <Prev onClick={prevSlide}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Prev>
          ) : null}
          {index !== popula?.results.length - 1 ? (
            <Next onClick={nextSlide}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Next>
          ) : null}
        </Slider>
      </Banner>
      <Upcoming>
        <Title>개봉예정 영화</Title>
        <SlideAuto data={upcoming?.results} reversed={false}></SlideAuto>
      </Upcoming>
      <NowPlay>
        <Title>상영중인 영화</Title>
        <InfiniteSlide
          url={`https://api.themoviedb.org/3/movie/now_playing?api_key=${env.API_KEY}&language=ko`}
          offset={5}
          gap={10}
          type="movie"
        ></InfiniteSlide>
      </NowPlay>
      <TopRated>
        <SlideMulti offset={5} data={topRated?.results}></SlideMulti>
      </TopRated>
    </Wrapper>
  );
}
