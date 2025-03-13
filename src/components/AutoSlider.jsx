import { useRef } from 'react';
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { makeImgPath } from '../util/makeImgPath';

const AutoSlider = styled.div`
  position: relative;
  height: 200px;
`;
const AutoKeyframes = reversed => keyframes`
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
  animation: ${props => AutoKeyframes(props.reversed)} 120s linear infinite;
  :hover {
    animation-play-state: paused;
  }
`;
const AutoBox = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 100%;
  background-image: url(${props => props.autoBoxBgUrl});
  background-position: center;
  background-size: cover;
  border: ${props => (props.autoBoxBgUrl === 'no' ? '1px solid #d9d9d9' : null)};
  svg {
    color: #d9d9d9;
    width: 100px;
    height: 100px;
  }
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
        {data?.map(item => (
          <Link to={`/movies/${item.id}`} key={item.id}>
            <AutoBox autoBoxBgUrl={item.backdrop_path ? makeImgPath(item.backdrop_path, 'w500') : 'no'}>
              {!item.backdrop_path ? (
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
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              ) : null}
              <Title>{item.title}</Title>
            </AutoBox>
          </Link>
        ))}
      </AutoSlide>
    </AutoSlider>
  );
}
