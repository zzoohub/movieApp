import styled from "styled-components";

const FooterWrap = styled.div`
  width: 100%;
  height: 200px;
  background-color: blue;
`;
const Footer = styled.footer`
  max-width: 1440px;
  margin: 0 auto;
  padding: 20px;
`;

export default function Shoes() {
  return (
    <FooterWrap>
      <Footer>
        <h2>이 사이트는 포트폴리오입니다.</h2>
      </Footer>
    </FooterWrap>
  );
}
