import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getTopRatedMovies, getUpcomingMovies } from "../api";
import InfiniteSlide from "../components/InfiniteSlide";
import SlideMulti from "../components/multiSlider";
import { makeImgPath } from "../util/makeImgPath";
import Loading from "../components/Loading";
import { useEffect } from "react";

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
  left: 8%;
`;
const Next = styled.button`
  right: 7%;
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
  transition: ${(props) => props.transition};
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
    transition: all ease-in-out 0.3s;
    filter: brightness(${(props) => (props.active ? "100%" : "35%")});
    &.on {
      pointer-events: all;
      height: 100%;
      transition: all ease-in-out 0.3s;
      filter: brightness(100%);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border: 1px solid transparent;
    transition: all ease-in-out 0.2s;
    box-shadow: 0px 60px 20px -20px rgba(0, 0, 0, 0.3);
    :hover {
      border: 1px solid #fff;
      border-style: outset;
    }
    box-shadow: 0px 50px 20px -20px rgba(0, 0, 0, 0.5);
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
const Upcoming = styled.section`
  width: 100%;
  height: 250px;
  margin-top: 30px;
`;
const TopRated = styled(Upcoming)`
  height: 300px;
  margin-top: 30px;
`;
const NowPlay = styled(Upcoming)`
  margin-bottom: 50px;
`;
const Title = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: #f9f9f9;
  margin: 15px 20px;
`;
const TopTitle = styled.h3`
  font-size: 28px;
  font-weight: bold;
  color: gold;
  margin: 20px 50px;
  em {
    font-size: 24px;
    margin-left: 10px;
    color: #f9f9f9;
  }
`;
const Trending = styled(Upcoming)``;

export default function Movies() {
  const [popula, setPopula] = useState([]);
  const { data: upcoming, isLoading: upcomingLoading } = useQuery(
    ["movie", "upcoming"],
    getUpcomingMovies
  );
  const { data: topRated, isLoading: topRatedLoading } = useQuery(
    ["movie", "toprated"],
    getTopRatedMovies
  );
  const slideRef = useRef();
  const [transition, setTransition] = useState(false);

  async function arrange() {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=ko`
    ).then((res) => res.json());
    const first = data?.results.slice(0, 1);
    const last = data?.results.slice(-1);
    await setPopula([...last, ...data.results, ...first]);
  }
  useEffect(() => {
    arrange();
  }, []);

  const [index, setIndex] = useState(1);

  const prevSlide = () => {
    if (index === 1) {
      // slideRef.current.style = "transition: all easy-in-out 0.3s";
      setTransition(true);
      slideRef.current.children[20].children[0].className = "on";
      setIndex((prev) => prev - 1);
      setTimeout(() => {
        // slideRef.current.style.transition = "none";
        setTransition(false);
        setIndex(20);
        slideRef.current.children[20].children[0].className = "";
      }, 300);
      return;
    }
    // slideRef.current.style = "transition: all easy-in-out 0.3s";
    setTransition(true);
    setIndex((prev) => prev - 1);
  };
  const nextSlide = () => {
    if (index === 20) {
      // slideRef.current.style = "transition: all easy-in-out 0.3s";
      setTransition(true);
      slideRef.current.children[1].children[0].className = "on";
      setIndex((prev) => prev + 1);
      setTimeout(() => {
        // slideRef.current.style.transition = "none";
        setTransition(false);
        setIndex(1);
        slideRef.current.children[1].children[0].className = "";
      }, 300);
      return;
    }
    // slideRef.current.style = "transition: all easy-in-out 0.3s";
    setTransition(true);
    setIndex((prev) => prev + 1);
  };

  return (
    <>
      {upcomingLoading || topRatedLoading ? (
        <Loading></Loading>
      ) : (
        <Wrapper>
          <Banner>
            <BigTitle>인기 영화</BigTitle>
            <Slider>
              <Slide
                ref={slideRef}
                slideWidth={popula?.length * 80}
                translate={index ? index * 80 - 10 : "base"}
                transition={transition ? "all ease-in-out 0.3s" : "none"}
              >
                {popula?.map((movie, i) => (
                  <Box key={i} active={index === i ? true : false}>
                    <Link to={`/movies/${movie.id}`}>
                      <img
                        src={
                          movie.backdrop_path
                            ? makeImgPath(movie.backdrop_path)
                            : ""
                        }
                      ></img>
                    </Link>
                    <BoxDetail>{movie.title}</BoxDetail>
                  </Box>
                ))}
              </Slide>
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
            </Slider>
          </Banner>
          <TopRated>
            <TopTitle>
              TOP 20<em>영화</em>
            </TopTitle>
            <SlideMulti
              offset={5}
              data={topRated?.results}
              type="movie"
            ></SlideMulti>
          </TopRated>
          <Trending>
            <Title>주간 트렌드</Title>
            <InfiniteSlide
              url={`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&language=ko`}
              offset={5}
              gap={10}
              type="movie"
            ></InfiniteSlide>
          </Trending>
          <Upcoming>
            <Title>개봉 예정작</Title>
            <InfiniteSlide
              url={`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_API_KEY}&language=ko`}
              offset={5}
              gap={10}
              type="movie"
            ></InfiniteSlide>
          </Upcoming>
          <NowPlay>
            <Title>현재 상영중</Title>
            <InfiniteSlide
              url={`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=ko`}
              offset={5}
              gap={10}
              type="movie"
            ></InfiniteSlide>
          </NowPlay>
        </Wrapper>
      )}
    </>
  );
}
