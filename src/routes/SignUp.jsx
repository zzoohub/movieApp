import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import styled from "styled-components";
import { useUser } from "../util/useUser";

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
`;
const Main = styled.main`
  max-width: 1920px;
  margin: 0 auto;
  margin-top: 100px;
`;
const SignUpForm = styled.form`
  width: 50%;
  max-width: 500px;
  min-width: 300px;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px auto;
  color: #f9f9f9;
  h2 {
    font-size: 30px;
    font-weight: bold;
  }
  input {
    width: 100%;
    height: 50px;
    margin-top: 20px;
    padding: 0px 10px;
    font-size: 16px;
    outline: none;
    &:nth-of-type(2) {
      margin-top: 10px;
    }
  }
  em {
    font-size: 12px;
    margin-top: 5px;
    color: red;
  }
  strong {
    font-size: 12px;
    margin-top: 5px;
  }
  button,
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    margin-top: 10px;
    color: #f9f9f9;
    background-color: #222;
    border: none;
    font-size: 16px;
    cursor: pointer;
    &:nth-of-type(1) {
      margin-top: 20px;
    }
  }
`;

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = (form) => {
    localStorage.setItem("user", JSON.stringify(form));
    localStorage.setItem("loginUser", JSON.stringify(form));
    navigate("/");
    window.location.reload();
  };
  const { user } = useUser();
  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  return (
    <Wrapper>
      <Main>
        <SignUpForm onSubmit={handleSubmit(onValid)}>
          <h2>무비앱 회원가입</h2>
          <input
            {...register("ninkname", {
              required: { value: true, message: "닉네임은 필수입니다." },
              minLength: {
                value: 3,
                message: "닉네인 최소 3글자 이상이어야 합니다.",
              },
              maxLength: {
                value: 12,
                message: "닉네임은 최대 12글자를 넘으면 안됩니다.",
              },
            })}
            type="text"
            placeholder="닉네임을 지어주세요."
          />
          {errors?.ninkname ? (
            <em>{errors.ninkname.message}</em>
          ) : (
            <strong>닉네임은 아이디로 사용됩니다.</strong>
          )}
          <input
            {...register("password", {
              required: { value: true, message: "비밀번호를 입력해주세요." },
              minLength: { value: 6, message: "비밀번호는 최소 6글자입니다." },
              maxLength: {
                value: 18,
                message: "비밀번호는 최대 18글자입니다.",
              },
            })}
            type="password"
            placeholder="비밀번호를 입력하세요."
          />
          {errors?.password ? (
            <em>{errors.password.message}</em>
          ) : (
            <strong>비밀번호는 로컬스토리지에 저장됩니다.</strong>
          )}
          <button>회원가입</button>
          <Link to="/">로그인</Link>
        </SignUpForm>
      </Main>
    </Wrapper>
  );
}
