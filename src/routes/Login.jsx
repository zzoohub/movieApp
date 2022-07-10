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
  margin-top: 150px;
`;
const LoginForm = styled.form`
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
    font-size: 38px;
    font-weight: bold;
    margin-bottom: 20px;
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
    &.strong {
      font-size: 16px;
      margin-top: 10px;
    }
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
    color: #f9f9f9;
    background-color: #222;
    border: none;
    font-size: 16px;
    cursor: pointer;
    &:nth-of-type(1) {
      margin-top: 10px;
    }
    :hover {
      filter: brightness(0.9);
    }
  }
  button {
    background-color: #a40000;
    :hover {
      filter: brightness(0.9);
    }
  }
`;
export default function Login() {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    setError,
  } = useForm();
  const { user } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user]);
  const onValid = (form) => {
    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (!existingUser) return;
    if (
      existingUser.nickname === form.nickname &&
      existingUser.password === form.password
    ) {
      localStorage.setItem("loginUser", JSON.stringify(form));
      navigate("/");
      window.location.reload();
    } else {
      console.log(form, existingUser);
      setError("loginError", {
        type: "custom",
        message: "아이디 또는 패스워드가 일치하지 않습니다.",
      });
    }
  };
  return (
    <Wrapper>
      <Main>
        <LoginForm onSubmit={handleSubmit(onValid)}>
          <h2>로그인</h2>
          <input
            {...register("nickname", {
              required: { value: true, message: "닉네임을 입력하세요." },
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
            onInput={() => clearErrors()}
            placeholder="닉네임"
          />
          {errors?.nickname ? (
            <em>{errors.nickname.message}</em>
          ) : (
            <strong></strong>
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
            onInput={() => clearErrors()}
            type="password"
            placeholder="비밀번호"
          />
          {errors?.password ? (
            <em>{errors.password.message}</em>
          ) : (
            <strong></strong>
          )}
          <button>로그인</button>
          <Link to="/signup">회원가입</Link>
          <em className="strong">
            {errors?.loginError ? errors.loginError.message : null}
          </em>
        </LoginForm>
      </Main>
    </Wrapper>
  );
}
