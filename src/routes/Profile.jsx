import { useState, useRef } from "react";
import styled from "styled-components";
import Loading from "../components/Loading";
import { useUser } from "../util/useUser";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  font-size: 16px;
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
  em {
    /* display: block; */
    font-size: 12px;
    text-align: center;
    color: red;
    &.strong {
      font-size: 16px;
      margin-top: 10px;
    }
  }
`;

const Form = styled.form`
  width: 50%;
  margin: 50px auto;
  line-height: 28px;
  input {
    display: block;
    width: 100%;
    outline: none;
    font-size: 16px;
  }
  & > div:nth-child(1) {
    display: flex;
    line-height: 28px;
    & > div:nth-child(2) {
      width: calc(100% - 230px);
    }
  }
  button {
    display: block;
    height: 30px;
    margin-top: 30px;
    margin-right: 0;
  }
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
  const navigate = useNavigate();
  const { user } = useUser();
  const { profleImgInput } = useRef();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    setError,
    setValue,
    reset,
  } = useForm();
  const onValid = (form) => {
    if (form.checkPassword !== form.password) {
      setError("notMatch", {
        type: "custom",
        message: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }
    const existingUser = user;
    existingUser.nickname = form.nickname;
    existingUser.password = form.password;
    localStorage.setItem("loginUser", JSON.stringify(existingUser));

    alert("프로필이 변경되었습니다.");
    reset();
    setValue("nickname", existingUser.nickname);
    setValue("password", existingUser.password);
  };
  useEffect(() => {
    setValue("nickname", user?.nickname);
  }, [user]);

  return (
    <>
      {loading ? <Loading></Loading> : null}
      <Wrapper>
        <SideBar></SideBar>
        <Main>
          <h2>My Page</h2>
          <Form onSubmit={handleSubmit(onValid)}>
            <div>
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
                <input
                  ref={profleImgInput}
                  type="file"
                  name="file"
                  accept="image/*"
                />
                <div>
                  <p>
                    닉네임 |{" "}
                    {errors?.nickname ? (
                      <em>{errors?.nickname.message}</em>
                    ) : (
                      <strong> </strong>
                    )}
                  </p>
                  <input
                    {...register("nickname", {
                      required: {
                        value: true,
                        message: "닉네임을 입력해주세요.",
                      },
                      minLength: {
                        value: 3,
                        message: "닉네임은 최소 3글자 이상이어야 합니다.",
                      },
                      maxLength: {
                        value: 12,
                        message: "닉네임은 최대 12글자를 넘으면 안됩니다.",
                      },
                    })}
                    type="text"
                    onInput={() => clearErrors()}
                    placeholder="닉네임"
                    // defaultValue={user?.nickname}
                  />
                </div>
                <div>
                  <p>
                    비밀번호 변경 |{" "}
                    {errors?.password ? (
                      <em>{errors?.password.message}</em>
                    ) : (
                      <strong> </strong>
                    )}
                  </p>
                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "비밀번호를 입력해주세요.",
                      },
                      minLength: {
                        value: 6,
                        message: "비밀번호는 최소 6글자입니다.",
                      },
                      maxLength: {
                        value: 18,
                        message: "비밀번호는 최대 18글자입니다.",
                      },
                    })}
                    onInput={() => clearErrors()}
                    type="password"
                    placeholder="비밀번호"
                  />
                </div>
                <div>
                  <p>
                    비밀번호 확인 |{" "}
                    {errors?.notMatch ? (
                      <em>{errors?.notMatch.message}</em>
                    ) : (
                      <strong></strong>
                    )}
                  </p>
                  <input
                    {...register("checkPassword", {
                      required: {
                        value: true,
                        message: "비밀번호가 일치하지 않습니다.",
                      },
                    })}
                    onInput={() => clearErrors()}
                    type="password"
                    placeholder="비밀번호"
                  />
                </div>
              </div>
            </div>

            <button>회원 정보 수정하기</button>
          </Form>
        </Main>
      </Wrapper>
    </>
  );
}
