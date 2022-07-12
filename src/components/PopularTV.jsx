import { getTvPopular } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";
import { useRef, useState } from "react";
import { useEffect } from "react";
import InfiniteSlide from "./InfiniteSlide";
import env from "react-dotenv";

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
  width: 1500px;
  overflow: hidden;
  outline: auto;
`;
const Slide = styled.div`
  position: relative;
  display: flex;
  height: 200px;
  width: 100%;
  margin-left: ${(props) =>
    props.count === 0 ? "0" : -(props.count * 1500) + "px"};
  transition: all ease-in-out 0.2s;
`;
const Box = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 300px;
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
  const [lists, setLists] = useState(popular?.results);

  const [count, setCount] = useState(0);
  const [innerWidth, setInnerWidth] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", resizing);
    return () => {
      window.removeEventListener("resize", resizing);
    };
  }, []);
  const resizing = () => {
    setInnerWidth(window.innerWidth);
  };
  const slide = useRef();
  const prevSlide = () => {
    setCount(count - 1);
  };
  const nextSlide = () => {
    if (count < 3) {
      setCount(count + 1);
    } else if (count == 3) {
      setCount(count + 1);
      let firstLi = lists.slice(0, 5);
      lists.push(firstLi);
      setLists(lists);
      console.log(lists);
    }
  };

  return (
    <Wrapper>
      <Title>Popular TV</Title>
      <InfiniteSlide
        url={`https://api.themoviedb.org/3/tv/popular?api_key=${env.API_KEY}&language=ko`}
        offset={5}
        gap={10}
      ></InfiniteSlide>
    </Wrapper>
  );
}
