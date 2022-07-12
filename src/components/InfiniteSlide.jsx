import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { makeImgPath } from "../util/makeImgPath";

const Slider = styled.div`
  max-width: 1920px;
  width: 100%;
  height: 200px;
  button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
    width: 50px;
    z-index: 3;
    border: none;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    :hover {
      background-color: rgba(0, 0, 0, 0.8);
    }
    :hover svg {
      color: rgba(255, 255, 255, 0.9);
    }
    svg {
      width: 80px;
      height: 80px;
      color: rgba(255, 255, 255, 0.6);
    }
  }
`;
const Slide = styled.div`
  transform-origin: left;
  transform: scale(${(props) => props.scale});
  position: absolute;
  display: flex;
  height: 200px;
  gap: ${(props) => props.gap}px;
  padding: 0px 5px;
  transition: all ease 0.3s;
`;
const Box = styled.div`
  height: 100%;
  background-image: url(${(props) => props.bgUrl});
  background-position: center;
  background-size: cover;
  :hover {
    border: 1px solid #fff;
    transform: scale(1.01);
  }
  :hover h3 {
    transform: translateY(-15px);
    opacity: 1;
  }
`;
const Prev = styled.button`
  left: 5px;
`;
const Next = styled.button`
  right: 5px;
`;
const Title = styled.h3`
  position: absolute;
  bottom: 0%;
  left: 5%;
  font-size: 16px;
  font-weight: bold;
  color: #f9f9f9;
  padding: 5px 7px;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: all ease-in-out 0.2s;
`;

export default function InfiniteSlide({ url, offset, gap }) {
  const [nowPlay, setNowPlay] = useState([]);
  const [scale, setScale] = useState((window.innerWidth / 1920).toFixed(2));
  const [boxWidth, setBoxWidth] = useState(
    (window.innerWidth / offset).toFixed() - gap
  );
  const [count, setCount] = useState(1);
  const slideRef = useRef();
  const MAX_SLIDES = 30;

  window.addEventListener("resize", (event) => {
    setScale((window.innerWidth / 1920).toFixed(2));
    setBoxWidth((window.innerWidth / offset).toFixed());
  });

  async function setting() {
    const data = await fetch(url).then((res) => res.json());
    const first = data.results.slice(0, 5);
    const last = data.results.slice(-5);
    slideRef.current.style.width = `${boxWidth + gap * MAX_SLIDES}px`;
    slideRef.current.style.transform = `translateX(-${
      (boxWidth + gap) * offset * count
    }px)`;
    await setNowPlay([...last, ...data.results, ...first]);
  }

  useEffect(() => {
    slideRef.current.style.transition = "none";
  }, []);
  useEffect(() => {
    setting();
  }, [count, url]);

  const countUp = () => {
    if (count < 4) {
      slideRef.current.style = "transition: all easy-in-out 0.3s";
      setCount((prev) => prev + 1);
      console.log(count);
    } else {
      setCount((prev) => prev + 1);
      setTimeout(() => {
        slideRef.current.style.transition = `none`;
        setCount(1);
      }, 300);
    }
  };
  const countDown = () => {
    if (count > 1) {
      slideRef.current.style = "transition: all easy-in-out 0.3s";
      setCount((prev) => prev - 1);
      console.log(count);
    } else {
      setCount((prev) => prev - 1);
      setTimeout(() => {
        slideRef.current.style.transition = `none`;
        setCount(4);
      }, 300);
    }
  };

  return (
    <Slider>
      {nowPlay ? (
        <Slide ref={slideRef} scale={scale} gap={gap}>
          {nowPlay.map((item, index) => (
            <Link to={`/movies/${item.id}`} key={index}>
              <Box
                bgUrl={
                  item.backdrop_path
                    ? makeImgPath(item.backdrop_path, "w500")
                    : "no"
                }
                style={{ width: `${boxWidth}px` }}
              >
                <Title>{item.title}</Title>
              </Box>
            </Link>
          ))}
        </Slide>
      ) : null}
      <Prev onClick={countDown}>
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
      <Next onClick={countUp}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </Next>
    </Slider>
  );
}
