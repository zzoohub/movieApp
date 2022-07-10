import { useRef } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { makeImgPath } from "../util/makeImgPath";

const AutoSlider = styled.div`
  position: relative;
  height: 200px;
`;
const AutoKeyframes = (reversed) => keyframes`
  0% {
    transform: translateX(${reversed ? -75 : 0}%)
  }
  50% {
    transform: translateX(${reversed ? 0 : -75}%);
  }
  100% {
    transform: translateX(${reversed ? -75 : 0}%);
  }
`;
const AutoSlide = styled.div`
  position: absolute;
  display: flex;
  gap: 15px;
  height: 100%;
  animation: ${(props) => AutoKeyframes(props.reversed)} 120s linear infinite;
  :hover {
    animation-play-state: paused;
  }
`;
const AutoBox = styled.div`
  position: relative;
  width: 250px;
  height: 100%;
  background-image: url(${(props) => props.autoBoxBgUrl});
  background-position: center;
  background-size: cover;
  :hover {
    transform: scale(1.03);
    border: 2px solid #fff;
    border-style: outset;
  }
  :hover h3 {
    transform: translateY(-15px);
    opacity: 1;
  }
`;
const Title = styled.h3`
  position: absolute;
  bottom: 0%;
  left: 5%;
  font-size: 14px;
  font-weight: bold;
  color: #f9f9f9;
  padding: 5px 7px;
  background-color: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: all ease-in-out 0.2s;
`;

export default function SlideAuto({ data, reversed }) {
  const autoSlide = useRef();
  return (
    <AutoSlider>
      <AutoSlide ref={autoSlide} reversed={reversed}>
        {data?.map((item) => (
          <Link to={`/movies/${item.id}`} key={item.id}>
            <AutoBox
              autoBoxBgUrl={
                item.backdrop_path
                  ? makeImgPath(item.backdrop_path, "w500")
                  : "no"
              }
            >
              <Title>{item.title}</Title>
            </AutoBox>
          </Link>
        ))}
      </AutoSlide>
    </AutoSlider>
  );
}
