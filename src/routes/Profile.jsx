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
  font-size: 16px;
  line-height: 40px;
  h2 {
    font-size: 32px;
    font-weight: 600;
    margin-top: 50px;
    margin-bottom: 30px;
    text-align: center;
  }
  .imgBtn {
    display: block;
    margin: 20px;
    font-size: 12px;
    color: #333;
    background-color: #f9f9f9;
    line-height: 1;
    padding: 7px;
    cursor: pointer;
    :active {
      transform: scale(0.96);
    }
  }
`;

const ImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 170px;
  height: 170px;
  margin: 0px auto;
  background-image: url(${(props) => props.url});
  background-position: center;
  background-size: cover;
  border-radius: 50%;
  svg {
    color: #d9d9d9;
    width: 170px;
    height: 170px;
  }
`;
const ImgLabel = styled.label`
  display: block;
  position: absolute;
  top: 120px;
  left: calc(50% - 85px);
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  cursor: pointer;
  :hover {
    filter: brightness(0.5);
  }
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
  const { user } = useUser();
  const [previewUrl, setPreviewUrl] = useState(user?.profileUrl);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
    setError,
    setValue,
  } = useForm();

  const onValid = (form) => {
    const existingUser = user;
    let profileUrl = "";
    if (form.password !== form.checkpassword) {
      return setError("notMatch", {
        type: "custom",
        message: "비밀번호가 일치하지 않습니다.",
      });
    }
    if (
      form.nickname === existingUser.nickname &&
      form.password === existingUser.password &&
      !previewUrl
    ) {
      return setError("alreadyUse", {
        type: "custom",
        message: "변경된 내용이 없습니다.",
      });
    }
    if (!previewUrl) {
      profileUrl = user?.profileUrl;
    } else {
      profileUrl = previewUrl;
    }

    existingUser.nickname = form.nickname;
    existingUser.password = form.password;
    existingUser.profileUrl = profileUrl;
    localStorage.setItem("user", JSON.stringify(existingUser));
    localStorage.setItem("loginUser", JSON.stringify(existingUser));
    navigate("/");
  };

  useEffect(() => {
    setValue("profileImg", user?.profileUrl);
    setValue("nickname", user?.nickname);
    setValue("password", user?.password);
    setValue("checkpassword", user?.password);
  }, [user]);

  const onLoadFile = (e) => {
    clearErrors();
    let reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onloadend = () => {
      const fileUrl = reader.result;

      if (fileUrl) {
        setPreviewUrl(fileUrl);
      }
    };
  };

  return (
    <>
      {loading ? <Loading></Loading> : null}
      <Wrapper>
        <Main>
          <h2>회원 정보</h2>
          <Form onSubmit={handleSubmit(onValid)}>
            <ImgBox
              url={
                previewUrl
                  ? previewUrl
                  : user?.profileUrl
                  ? user?.profileUrl
                  : null
              }
            >
              {!user?.profileUrl && !previewUrl ? (
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
              onInput={onLoadFile}
              {...register("profileImg")}
            />
            <span
              onClick={() => {
                setPreviewUrl(null);
              }}
              className="imgBtn"
            >
              변경전으로
            </span>
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
                required: {
                  value: true,
                  message: "비밀번호 확인란을 입력해주세요.",
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
              type="password"
              placeholder="비밀번호 확인"
            />
            {errors?.checkpassword ? (
              <em>{errors.checkpassword.message}</em>
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
