import { useState } from "react";
import styled from "styled-components";
import Loading from "../components/Loading";
import { useUser } from "../util/useUser";

const Wrapper = styled.div`
  position: relative;
  display: flex;
  max-width: 1920px;
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  margin-top: 100px;
  color: #f9f9f9;
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
  font-size: 18px;
  line-height: 40px;
  h2 {
    font-size: 38px;
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 20px;
    text-align: center;
  }
  button {
    width: 50%;
    height: 50px;
    background-color: #a40000;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    color: #f9f9f9;
    border: none;
    font-size: 16px;
    cursor: pointer;
    :hover {
      filter: brightness(0.9);
    }
  }
`;

const Form = styled.form`
  width: 50%;
  margin: 50px auto;
  display: flex;
  align-items: center;
  line-height: 28px;
  input {
    display: block;
    width: 100%;
    outline: none;
    font-size: 18px;
  }
  > div:nth-child(2) {
    width: calc(100% - 230px);
  }
  button {
    height: 30px;
    margin-right: 0;
  }
`;

const Read = styled.div`
  width: 50%;
  margin: 50px auto;
  display: flex;
  align-items: center;
`;
const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  margin-right: 30px;
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: cover;
  border: ${(props) => (props.url === undefined ? "1px solid #d9d9d9" : null)};
  svg {
    color: #d9d9d9;
    width: 100px;
    height: 100px;
  }
`;

export default function Profile() {
  const [loading, setLoading] = useState(false);
  const [read, setRead] = useState(true);
  const { user } = useUser();
  const userName = user?.nickname;
  const userPW = user?.password;
  const userEmail = user?.email;
  const [inputName, setInputName] = useState(userName);
  const [inputPW, setInputPW] = useState("");
  console.log(inputName, userName, read);

  const nameInput = (e) => {
    e.preventDefault();
    setInputName(e.target.value);
  };
  const onChangeMode = () => setRead(!read);
  const onSubmit = () => {};
  return (
    <Wrapper>
      {loading ? <Loading></Loading> : null}
      <SideBar></SideBar>
      <Main>
        <h2>My Page</h2>
        {read ? (
          <Read>
            <ImgBox url={user?.img}>
              {!user?.img ? (
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
              ) : null}
            </ImgBox>
            <div>
              <div>
                <span>닉네임 | </span>
                <span>{userName}</span>
              </div>

              <div>
                <span>이메일 | </span>
                <span>
                  {user?.email === undefined
                    ? "등록된 이메일이 없습니다."
                    : user?.email}
                </span>
              </div>
            </div>
          </Read>
        ) : (
          <Form>
            <ImgBox url={user?.img}>
              {!user?.img ? (
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
              ) : null}
            </ImgBox>
            <div>
              <button>프로필 변경</button>
              <div>
                <p>닉네임 | </p>
                <input
                  type="text"
                  defaultValue={user?.nickname}
                  onChange={nameInput}
                />
              </div>
              <div>
                <p>신규 비밀번호 | </p>
                <input type="password" defaultValue={user?.password} />
              </div>
              <div>
                <p>비밀번호 확인 | </p>
                <input type="password" defaultValue={""} />
              </div>
            </div>
          </Form>
        )}
        <button onClick={read ? onChangeMode : onSubmit}>
          {read ? "회원 정보 수정하기" : "변경 내용 저장"}
        </button>
      </Main>
    </Wrapper>
  );
}
