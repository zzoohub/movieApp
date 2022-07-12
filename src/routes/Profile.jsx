import { useState } from "react";
import styled from "styled-components";
import Loading from "../components/Loading";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  max-width: 1920px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  margin-top: 100px;
`;
const SideBar = styled.aside`
  position: absolute;
  left: 0px;
  width: 200px;
  min-height: 700px;
  height: max-content;
  background-color: rgba(255, 255, 255, 0.2);

  ul {
    display: flex;
    flex-direction: column;
    width: 100%;
    li {
      height: 30px;
    }
  }
`;
const Main = styled.main`
  width: 70%;
  margin: 0 auto;
  min-height: 700px;
  height: max-content;
  border: 1px solid #fff;
`;
export default function Profile() {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading ? (
        <Loading></Loading>
      ) : (
        <Wrapper>
          <SideBar></SideBar>
          <Main></Main>
        </Wrapper>
      )}
    </>
  );
}
