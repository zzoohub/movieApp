import { Link } from "react-router-dom";
import styled from "styled-components";

const FooterWrap = styled.div`
  width: 100%;
  /* height: 200px; */
  background-color: #111;
  color: #a5a5a7;
  line-height: 1.4;
`;
const Footer = styled.footer`
  max-width: 1920px;
  font-size: 13px;
  margin: 0 auto;
  padding: 30px 20px;
  div:nth-child(1) {
    p:nth-child(1) {
      margin-bottom: 20px;
    }
    p:nth-child(4) {
      margin-bottom: 20px;
    }
  }
  div:nth-child(2) {
    color: #848485;
    .logo {
      color: #fff;
    }
  }
`;

export default function Shoes() {
  return (
    <FooterWrap>
      <Footer>
        <div>
          <p>
            <span>서비스 이용약관</span> | <span>개인정보 처리방침</span> |{" "}
            <span>회사 안내</span>
          </p>
          <p>
            고객센터 | <span>cs@movieapp.com</span>, 02-1234-5678
          </p>
          <p>
            광고 문의 | <span>ad@movieapp.com</span>
          </p>
          <p>
            제휴 및 대외 협력 |{" "}
            <a href="https://github.com/zzoodev" target="blank">
              https://github.com/zzoodev
            </a>
          </p>
        </div>
        <div>
          <p>
            주식회사 무비앱 | 대표 주영석 | 서울특별시 강남구 도곡로127
            제노아빌딩 3층
          </p>
          <p>사업자 등록 번호 000-00-0000</p>
          <p>
            <span className="logo">MOVIE APP</span> © 2022 by Movie App, Inc.
            All rights reserved.
          </p>
        </div>
      </Footer>
    </FooterWrap>
  );
}
