import { getTvPopular } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { makeImgPath } from "../util/makeImgPath";
import { useRef, useState } from "react";

const Wrapper = styled.div`
  height: max-content;
  max-width: 1920px;
`;
const PopTv = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 200px;
`;
const Button = styled.button`
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
`;
const Prev = styled(Button)`
  left: 0;
`;
const Next = styled(Button)`
  right: 0;
`;
const Title = styled.h3`
  font-size: 22px;
  font-weight: bold;
  color: #f9f9f9;
  margin: 15px 20px;
`;
const Slider = styled.div`
  height: 200px;
  width: 90%;
  overflow: hidden;
  outline: auto;
`;
const Slide = styled.div`
  position: relative;
  display: flex;
  gap: 15px;
  height: 200px;
  width: 100%;
  margin-left: ${(props) =>
    props.count === 0 ? "0" : -(props.count * 250) + "px"};
  transition: all ease-in-out 0.2s;
`;
const Box = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250px;
  height: 100%;
  background-image: url(${(props) => props.autoBoxBgUrl});
  background-position: center;
  background-size: cover;
  border: ${(props) =>
    props.autoBoxBgUrl === "no" ? "1px solid #d9d9d9" : null};
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
const TvTitle = styled.h3`
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
export default function PopularTV() {
  const { data: popular, isLoading: populaLoading } = useQuery(
    ["tv", "popular"],
    getTvPopular
  );
  const [count, setCount] = useState(0);
  const slide = useRef();
  const prevSlide = () => {
    setCount(count + 1);
  };
  const nextSlide = () => {
    setCount(count - 1);
  };
  return (
    <Wrapper>
      <Title>Popular TV</Title>
      <PopTv>
        <Slider>
          <Slide ref={slide} count={count}>
            {popular?.results.map((item) => (
              <Link to={`/tv/${item.id}`} key={item.id}>
                <Box
                  autoBoxBgUrl={
                    item.backdrop_path
                      ? makeImgPath(item.backdrop_path, "w500")
                      : "no"
                  }
                >
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
                  <TvTitle>{item.name}</TvTitle>
                </Box>
              </Link>
            ))}
          </Slide>
        </Slider>
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
      </PopTv>
    </Wrapper>
  );
}
