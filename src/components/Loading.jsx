import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div``;

export default function Loading() {
  return (
    <Wrapper>
      <Loader></Loader>
    </Wrapper>
  );
}
