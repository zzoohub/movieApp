import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { makeImgPath } from "../util/makeImgPath";

const Slider = styled.div`
  max-width: 1920px;
  width: 100%;
  height: 250px;
  button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 220px;
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
  height: 220px;
  gap: ${(props) => props.gap}px;
  /* padding: 0px 5px; */
  transition: all ease 0.3s;
`;
const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url(${(props) => props.bgUrl});
  background-position: center;
  background-size: cover;
  border: ${(props) => (props.bgUrl === "no" ? "1px solid gray" : "none")};
  :hover {
    border: 1px solid #fff;
    transform: scale(1.01);
  }
  :hover h3 {
    transform: translateY(-15px);
    opacity: 1;
  }
  svg {
    color: #d9d9d9;
    width: 50px;
    height: 50px;
  }
`;
const Prev = styled.button`
  left: 0px;
`;
const Next = styled.button`
  right: 0px;
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

export default function InfiniteSlide({ url, offset, gap, type }) {
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
    } else {
      slideRef.current.style = "transition: all easy-in-out 0.3s";
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
    } else {
      slideRef.current.style = "transition: all easy-in-out 0.3s";
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
                <Title>{type === "movie" ? item.title : item.name}</Title>
                {item.backdrop_path ? null : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                )}
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
