import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { makeImgPath } from "../util/makeImgPath";

const MultiSlide = styled.div`
  position: relative;
  max-width: 1920px;
  height: 250px;
  button {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    height: 250px;
    width: 50px;
    bottom: 0%;
    border: none;
    background-color: transparent;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.2);
    :hover {
      background-color: rgba(0, 0, 0, 0.6);
    }
    :hover svg {
      color: rgba(255, 255, 255, 0.8);
    }
    svg {
      width: 80px;
      height: 80px;
      color: rgba(255, 255, 255, 0.5);
    }
  }
`;
const MultiSet = styled.div`
  position: absolute;
  bottom: 0%;
  width: 100%;
  height: 250px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  padding: 0px 50px;
  box-sizing: border-box;
  z-index: 1;
  transition: all ease-in-out 0.2s;
  opacity: 0;
  &.on {
    z-index: 2;
    opacity: 1;
  }
`;
const Item = styled.div`
  position: relative;
  background-color: #333;
  height: 100%;
  border: 1px solid transparent;
  transition: all ease-in-out 0.2s;
  overflow: hidden;
  :hover {
    border: 1px solid #ff3d3d;
  }
  :hover img {
    transform: scale(1.05);
  }
  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    transition: all ease-in-out 0.2s;
  }
  h4 {
    color: #f9f9f9;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 5px 7px;
    position: absolute;
    bottom: 3%;
    left: 3%;
    font-weight: bold;
  }
  span {
    color: #ff3d3d;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 5px 7px;
    position: absolute;
    bottom: 3%;
    right: 3%;
    font-weight: bold;
  }
  em {
    position: absolute;
    left: 5%;
    top: 5%;
    color: gold;
    padding: 5px;
    font-weight: bold;
    font-size: 14px;
    background-color: #222;
  }
`;
const Prev = styled.button`
  left: 0px;
`;
const Next = styled.button`
  right: 0px;
`;

export default function SlideMulti({ offset, data, type }) {
  const [page, setPage] = useState(0);
  return (
    <>
      {data ? (
        <MultiSlide>
          {[...Array(Math.ceil(data.length / offset))].map((v, indexes) => (
            <MultiSet key={indexes} className={page === indexes ? "on" : ""}>
              {[...Array(offset)].map((item, index) => (
                <Link
                  to={`/movies/${data[offset * indexes + index]?.id}`}
                  key={index}
                >
                  <Item>
                    <img
                      src={
                        data[offset * indexes + index]?.backdrop_path
                          ? makeImgPath(
                              data[offset * indexes + index]?.backdrop_path,
                              "w500"
                            )
                          : null
                      }
                      alt=""
                    />
                    <h4>
                      {type === "movie"
                        ? data[offset * indexes + index]?.title
                        : data[offset * indexes + index]?.name}
                    </h4>
                    <span>{data[offset * indexes + index]?.vote_average}</span>
                    <em>RANK {offset * indexes + index + 1}</em>
                  </Item>
                </Link>
              ))}
            </MultiSet>
          ))}
          {page !== 0 ? (
            <Prev
              onClick={() => {
                setPage((old) => old - 1);
              }}
            >
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

          {page < Math.ceil(data?.length / 5) - 1 ? (
            <Next
              onClick={() => {
                setPage((old) => old + 1);
              }}
            >
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
        </MultiSlide>
      ) : null}
    </>
  );
}
