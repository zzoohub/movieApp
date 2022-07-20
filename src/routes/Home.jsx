import styled from "styled-components";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getMovieGenres, getTvGenres } from "../api";
import { useQuery } from "react-query";

const Wrapper = styled.div`
  width: 100%;
`;
const Main = styled.main`
  max-width: 1920px;
  min-height: 100vh;
  margin: 0 auto;
  left: 0px;
  right: 0px;
  padding: 0px 30px;
  h2 {
    text-align: center;
    padding-top: 150px;
    color: #f9f9f9;
    line-height: 28px;
    font-size: 18px;
  }
`;
const SearchForm = styled.form`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  height: max-content;
  margin: 0 auto;
  input {
    min-width: 300px;
    width: 100%;
    margin-top: 30px;
    height: 50px;
    outline: none;
    border-radius: 100px;
    padding-left: 3%;
    padding-right: 15%;
    font-size: 18px;
  }
  button {
    position: absolute;
    right: 5px;
    top: 34px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    transition: all ease-in-out 0.2s;
    background-color: transparent;
    &:hover svg {
      width: 40px;
      height: 40px;
      color: aqua;
    }
    svg {
      transition: all ease-in-out 0.2s;
      width: 30px;
      height: 30px;
    }
  }
`;
const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 50%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  margin-top: 20px;
  gap: 10px;
  a {
    padding: 10px 15px;
    border-radius: 100px;
    border: 1px solid #f9f9f9;
    color: #f9f9f9;
    :hover {
      background-color: #f9f9f9;
      color: #000;
    }
  }
`;
const Media = styled.section`
  width: 100%;
`;

export default function Home() {
  const navigate = useNavigate();
  const { data: genres } = useQuery("keywords", getTvGenres);
  // const { data: movieGenres } = useQuery("keywords", getMovieGenres);

  const onValid = (form) => {
    form.preventDefault();
    const userInput = form.target[0].value;
    if (!userInput) return;
    form.target[0].value = "";
    navigate(`/search?keyword=${userInput}`);
  };

  return (
    <Wrapper>
      <Main>
        <h2>
          안녕하세요 무비앱입니다.
          <br />
          다양한 영화와 Tv Show 정보를 얻으실 수 있습니다.
        </h2>
        <SearchForm onSubmit={onValid}>
          <input type="text" />
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </SearchForm>
        <Genres>
          {genres?.genres.map((genre) => (
            <Link to={`/genre?id=${genre.id}`} key={genre.id}>
              {genre.name}
            </Link>
          ))}
        </Genres>
        <Media>
          <Outlet></Outlet>
        </Media>
      </Main>
    </Wrapper>
  );
}
