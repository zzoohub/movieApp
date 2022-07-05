import styled from "styled-components";
import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import SearchedInfo from "./SearchedInfo";

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
  width: 50%;
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
    top: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 40px;
    background-color: #1bb9b9;
    border: none;
    border-radius: 100px;
    cursor: pointer;
    transition: all ease-in-out 0.2s;
    &:hover {
      background-color: aqua;
    }
    &:hover svg {
      width: 35px;
      height: 35px;
      color: #fff;
    }
    svg {
      transition: all ease-in-out 0.2s;
      width: 30px;
      height: 30px;
    }
  }
`;
const Media = styled.section`
  width: 100%;
`;

export default function Home({ isLogin }) {
  const navigate = useNavigate();

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
        <Media>
          <Routes>
            <Route path={`/search`} element={<SearchedInfo />}></Route>
          </Routes>
        </Media>
      </Main>
    </Wrapper>
  );
}
