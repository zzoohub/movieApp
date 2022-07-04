import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterWrap = styled.div`
  width: 100%;
  /* height: 200px; */
  background-color: #f1f1e6;
  line-height: 1.4;
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
        <p>이 사이트는 상업 목적이 아닌 포트폴리오용으로 제작되었습니다.</p>
        <p>product by Zzoo & Jiny | © 2022 MovieApp, All rights reserved.</p>
        <p>
          Zzoo |
          <a href="https://github.com/zzoodev" target="blank">
            https://github.com/zzoodev
          </a>
        </p>
        <p>
          Jiny |
          <a href="https://github.com/algojiny" target="blank">
            https://github.com/algojiny
          </a>
        </p>
      </Footer>
    </FooterWrap>
  );
}
