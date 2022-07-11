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
    background-color: rgba(0, 0, 0, 0.5);
  }
`;
const Slide = styled.div`
  transform-origin: left;
  transform: scale(${(props) => props.scale});
  position: absolute;
  display: flex;
  height: 200px;
  gap: 10px;
  transition: all ease-in-out 0.3s;
`;
const Box = styled.div`
  height: 100%;
  width: 350px;
  background-image: url(${(props) => props.bgUrl});
  background-position: center;
  background-size: cover;
`;
const Prev = styled.button`
  left: 0px;
`;
const Next = styled.button`
  right: 0px;
`;

export default function InfiniteSlide({ url, offset }) {
  const [nowPlay, setNowPlay] = useState([]);
  const [scale, setScale] = useState((window.innerWidth / 1920).toFixed(2));
  const slideRef = useRef();
  const boxRef = useRef();

  window.addEventListener("resize", (event) => {
    setScale((window.innerWidth / 1920).toFixed(2));
  });

  const BOX_MARGIN = 10;
  const BOX_WIDTH = 350;
  const MAX_SLIDES = 30;

  let fullData = [];

  async function setting() {
    const data = await fetch(url).then((res) => res.json());
    const first = data.results.slice(0, 5);
    const last = data.results.slice(-5);
    slideRef.current.style.width = `${BOX_WIDTH + BOX_MARGIN * MAX_SLIDES}px`;
    slideRef.current.style.transform = `translateX(-${
      (BOX_WIDTH + BOX_MARGIN) * offset * count
    }px)`;
    await setNowPlay([...last, ...data.results, ...first]);
  }
  const [count, setCount] = useState(1);
  const maxCount = useEffect(() => {
    setting();
  }, [count]);

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
        <Slide ref={slideRef} scale={scale}>
          {nowPlay.map((item, index) => (
            <Link to={`/movies/${item.id}`} key={index}>
              <Box
                bgUrl={
                  item.backdrop_path
                    ? makeImgPath(item.backdrop_path, "w500")
                    : "no"
                }
                width={((window.innerWidth / 1920) * 350).toFixed(0)}
              ></Box>
            </Link>
          ))}
        </Slide>
      ) : null}
      <Prev onClick={countDown}></Prev>
      <Next onClick={countUp}></Next>
    </Slider>
  );
}
