import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../util/useUser";

const HeaderWrap = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  height: 70px;
  z-index: 1;
  transition: all linear 0.2s;
  &.hidden {
    opacity: 0;
    pointer-events: none;
    z-index: -10;
  }
  :hover {
    background-color: #111;
  }
`;
const Header = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1920px;
  height: 100%;
  padding: 0px 30px;
  margin: 0px auto;
  left: 0px;
  right: 0px;
  background-color: transparent;
  transition: all linear 0.2s;
`;
const Nav = styled.ul`
  display: flex;
  align-items: center;
  position: relative;
  width: 70%;
  svg {
    width: 150px;
    transition: all ease-in-out 0.2s;
  }
`;
const Li = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: max-content;
  height: 50px;
  &:first-child {
    width: max-content;
    margin-right: 50px;
    font-size: 25px;
    font-weight: bold;
    a:hover {
      color: #ff8181;
    }
  }
  :not(:nth-of-type(1)) a {
    margin: 0px 30px;
    :hover {
      color: #ff8181;
    }
  }
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    transition: all linear 0.2s;
    color: #f9f9f9;
    text-align: center;
    /* text-transform: uppercase; */
    &.on {
      transition: all ease-in-out 0.2s;
      color: #ff3d3d;
      font-weight: bold;
    }
  }
`;

const UserInfo = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 50px;
  height: 50px;
  align-items: center;
  /* margin-right: 30px; */
  cursor: pointer;
  svg {
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
  img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    border-radius: 50%;
    background-color: #f9f9f9;
  }
  a {
    color: #f9f9f9;
    transition: all linear 0.2s;
    :hover {
      color: #ff8181;
    }
  }
`;
const ProfileMenu = styled.ul`
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: none;
  flex-direction: column;
  width: 80px;
  border: 1px solid #333;
  border-radius: 5px;
  overflow: hidden;
  li {
    padding: 10px;
    cursor: pointer;
    text-align: center;
    font-size: 12px;
    border-top: 1px solid #333;
    background-color: #d9d9d9;
    :hover {
      opacity: 0.9;
    }
    :first-child {
      border: none;
    }
  }
`;

export default function NavBar() {
  const homeMatch = useMatch("/");
  const searchMatch = useMatch("/search");
  const tvMatch = useMatch("/tv");
  const movieMatch = useMatch("/movies");
  const genreMatch = useMatch("/genre");
  const { user } = useUser();
  const [showNav, setShowNav] = useState(true);
  const profileMenu = useRef();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    if (window.confirm("로그아웃을 하시겠습니까?")) {
      localStorage.removeItem("loginUser");
      navigate("/");
      window.location.reload();
    }
    return;
  };

  const [pageY, setPageY] = useState(window.scrollY);
  const [clientY, setCLientY] = useState(window.clientY);

  const handleNavigation = useCallback(
    (e) => {
      const window = e.currentTarget;
      // if (y > window.scrollY) {
      //   setShowNav(false);
      // } else if (y < window.scrollY) {
      //   setShowNav(true);
      // }
      if (window.scrollY > 80) {
        setShowNav(false);
      } else {
        setShowNav(true);
      }
      setPageY(window.scrollY);
    },
    [pageY]
  );
  const handleMouseMove = useCallback(
    (event) => {
      setCLientY(event.clientY);
      if (window.scrollY > 80) {
        if (event.clientY < 70 || menuOver) {
          setShowNav(true);
        } else {
          setShowNav(false);
        }
      }
    },
    [clientY, pageY]
  );

  useEffect(() => {
    setPageY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleNavigation, handleMouseMove]);

  const [menuOver, setMenuOver] = useState(false);
  const mouseOver = () => {
    setMenuOver(true);
    profileMenu.current.style.display = "flex";
  };
  const mouseLeave = () => {
    setMenuOver(false);
    profileMenu.current.style.display = "none";
  };

  return (
    <HeaderWrap className={showNav ? "" : "hidden"}>
      <Header>
        <Nav>
          <Li>
            <Link
              id="logo"
              to="/"
              className={homeMatch || searchMatch || genreMatch ? "on" : ""}
            >
              MOVIE APP
            </Link>
          </Li>
          <Li>
            <Link to="/movies" className={movieMatch ? "on" : ""}>
              영화
            </Link>
          </Li>
          <Li>
            <Link to="/tv" className={tvMatch ? "on" : ""}>
              TV쇼
            </Link>
          </Li>
        </Nav>
        <UserInfo
          onMouseOver={
            user
              ? mouseOver
              : () => {
                  return;
                }
          }
          onMouseLeave={
            user
              ? mouseLeave
              : () => {
                  return;
                }
          }
        >
          {user ? (
            <>
              {user?.profileUrl ? (
                <img src={user?.profileUrl} />
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="#f9f9f9"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <ProfileMenu ref={profileMenu}>
                <li onClick={() => navigate(`/profile`)}>회원 정보</li>
                <li
                  onClick={() => {
                    if (location.pathname === "/favorits") return;
                    navigate(`/favorits`);
                  }}
                >
                  찜한 목록
                </li>
                <li onClick={logout}>로그 아웃 </li>
              </ProfileMenu>
            </>
          ) : (
            <Link to="/login">로그인</Link>
          )}
        </UserInfo>
      </Header>
    </HeaderWrap>
  );
}
