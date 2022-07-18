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

const Main = styled.main`
  position: relative;
  width: 70%;
  margin: 0 auto;
  min-height: 700px;
  height: max-content;
  /* border: 1px solid #fff; */
  font-size: 16px;
  line-height: 40px;
  h2 {
    font-size: 38px;
    font-weight: bold;
    margin-top: 50px;
    margin-bottom: 50px;
    text-align: center;
  }
  .imgBtn {
    display: block;
    margin: 15px auto 0;
    cursor: pointer;
  }
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  margin: 30px auto 0;
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  /* border: ${(props) =>
    props.url === undefined ? "1px solid #d9d9d9" : null}; */
  svg {
    color: #d9d9d9;
    width: 150px;
    height: 150px;
  }
`;
const ImgLabel = styled.label`
  display: block;
  position: absolute;
  top: 140px;
  left: calc(50% - 75px);
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
`;
const ImgInput = styled.input`
  display: none;
`;
const Form = styled.form`
  width: 50%;
  max-width: 500px;
  min-width: 300px;
  height: max-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto 0;
  color: #f9f9f9;

  input {
    width: 100%;
    height: 50px;
    padding: 0px 10px;
    font-size: 16px;
    outline: none;
  }
  em {
    font-size: 12px;
    color: red;
  }
  strong {
    font-size: 12px;
    color: #f9f9f9;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
    color: #f9f9f9;
    background-color: #a40000;
    border: none;
    font-size: 16px;
    cursor: pointer;
    margin-top: 0px;
    :hover {
      filter: brightness(0.9);
    }
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
    const existingUser = user;
    if (form.password !== form.checkpassword) {
      return setError("notMatch", {
        type: "custom",
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
    if (
      form.nickname === existingUser.nickname &&
      form.password === existingUser.password
    ) {
      return setError("alreadyUse", {
        type: "custom",
        message: "변경된 내용이 없습니다.",
      });
    }
    existingUser.nickname = form.nickname;
    existingUser.password = form.password;
    localStorage.setItem("user", JSON.stringify(existingUser));
    localStorage.setItem("loginUser", JSON.stringify(existingUser));
    console.log(existingUser);
    navigate("/");
  };
  useEffect(() => {
    setValue("nickname", user?.nickname);
  }, [user]);

  const [profileImg, setProfileImg] = useState(null); //유저가 등록한 프로필이 있으면 useUser를 사용하여 디폴트값으로 연결되는 코드로 연결예정
  //https://taehoblog.netlify.app/react/previewimg/ 참고한 사이트
  const onLoadFile = (e) => {
    let reader = new FileReader();

    // console.log(e.target.files);

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onloadend = () => {
      const profileImgUrl = reader.result;
      console.log(reader.result);

      if (profileImgUrl) {
        setProfileImg(profileImgUrl);
        //유저 정보에도 이미지값 변경 or 추가
        //지금 상태에서는 페이지가 바뀌면 이미지 유지 안됨
      }
    };
  };

  return (
    <>
      {loading ? <Loading></Loading> : null}
      <Wrapper>
        <Main>
          <h2>My Page</h2>
          <ImgBox url={profileImg}>
            {!profileImg ? (
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
          <ImgLabel htmlFor="userImg"></ImgLabel>
          <ImgInput
            id="userImg"
            type="file"
            accept="image/*"
            onChange={onLoadFile}
          />
          <button
            onClick={() => {
              setProfileImg(null);
            }}
            className="imgBtn"
          >
            기본 이미지
          </button>
          <Form onSubmit={handleSubmit(onValid)}>
            <input
              onInput={() => {
                clearErrors();
              }}
              {...register("nickname", {
                required: { value: true, message: "닉네임은 필수입니다." },
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
              placeholder="닉네임"
            />
            {errors?.nickname ? (
              <em>{errors.nickname.message}</em>
            ) : (
              <strong>변경할 닉네임을 입력해 주세요.</strong>
            )}
            <input
              onInput={() => {
                clearErrors();
              }}
              {...register("password", {
                required: { value: true, message: "비밀번호를 입력해주세요." },
                minLength: {
                  value: 6,
                  message: "비밀번호는 최소 6글자입니다.",
                },
                maxLength: {
                  value: 18,
                  message: "비밀번호는 최대 18글자입니다.",
                },
              })}
              type="password"
              placeholder="신규 비밀번호"
            />
            {errors?.password ? (
              <em>{errors.password.message}</em>
            ) : (
              <strong>변경할 비밀번호를 입력해 주세요.</strong>
            )}
            <input
              onInput={() => {
                clearErrors();
              }}
              {...register("checkpassword", {
                required: { value: true, message: "비밀번호를 입력해주세요." },
                minLength: {
                  value: 6,
                  message: "비밀번호는 최소 6글자입니다.",
                },
                maxLength: {
                  value: 18,
                  message: "비밀번호는 최대 18글자입니다.",
                },
              })}
              type="password"
              placeholder="비밀번호 확인"
            />
            {errors?.notMatch ? (
              <em>{errors.notMatch.message}</em>
            ) : (
              <strong>변경할 비밀번호를 한번 더 입력해주세요.</strong>
            )}
            <button>회원정보 변경하기</button>
            {errors?.alreadyUse ? (
              <em>{errors.alreadyUse.message}</em>
            ) : (
              <strong></strong>
            )}
          </Form>
        </Main>
      </Wrapper>
    </>
  );
}
