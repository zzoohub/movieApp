import { Link } from "react-router-dom";
import styled from "styled-components";

const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1920px;
  height: 100px;
`;
const Nav = styled.nav`
  display: flex;
  align-items: center;
  width: 70%;
`;
const UserInfo = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`;
const Logo = styled.div`
  position: absolute;
  left: 50px;
  top: 50%;
`;
export default function NavBar() {
  return (
    <Header>
      <Logo>
        <Link to="/"></Link>
      </Logo>
      <Nav>
        <Link></Link>
        <Link></Link>
        <Link></Link>
      </Nav>
      <UserInfo></UserInfo>
    </Header>
  );
}
