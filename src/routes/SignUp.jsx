import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import styled from 'styled-components';
import { useUser } from '../util/useUser';

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
`;
const Main = styled.main`
  max-width: 1920px;
  margin: 0 auto;
  margin-top: 150px;
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
  }
  strong {
    font-size: 12px;
    margin-top: 5px;
    color: #f9f9f9;
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

export default function SignUp() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onValid = form => {
    const user = form;
    user.like = { tv: [], movie: [] };
    user.profileUrl = '';
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/login');
  };
  const { user } = useUser();
  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  return (
    <Wrapper>
      <Main>
        <SignUpForm onSubmit={handleSubmit(onValid)}>
          <h2>무비앱 회원가입</h2>
          <input
            {...register('nickname', {
              required: { value: true, message: '닉네임은 필수입니다.' },
              minLength: {
                value: 3,
                message: '닉네임은 최소 3글자 이상이어야 합니다.',
              },
              maxLength: {
                value: 12,
                message: '닉네임은 최대 12글자를 넘으면 안됩니다.',
              },
            })}
            type="text"
            placeholder="닉네임을 지어주세요."
          />
          {errors?.nickname ? <em>{errors.nickname.message}</em> : <strong>닉네임은 아이디로 사용됩니다.</strong>}
          <input
            {...register('password', {
              required: { value: true, message: '비밀번호를 입력해주세요.' },
              minLength: { value: 6, message: '비밀번호는 최소 6글자입니다.' },
              maxLength: {
                value: 18,
                message: '비밀번호는 최대 18글자입니다.',
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
          <Link to="/login">로그인</Link>
        </SignUpForm>
      </Main>
    </Wrapper>
  );
}
