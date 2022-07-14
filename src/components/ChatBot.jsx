import { useState } from "react";
import styled from "styled-components";
import { useUser } from "../util/useUser";
import { ReactComponent as Mlogo } from "../images/logo.svg";

const ChatBotWrap = styled.div`
  position: fixed;
  right: 40px;
  bottom: 25px;
  width: 70px;
  /* background-color: #dd4982; */
  height: 70px;
  z-index: 10;
`;
const ChatBotBtn = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  background-color: #fff;
  border: none;
  box-shadow: 0 17px 20px -18px rgba(0, 0, 0, 1);
  cursor: pointer;
  :hover {
    transform: scale(1.1);
    font-weight: bold;
    transition: all ease 0.1s;
  }
`;
const ChatBox = styled.div`
  position: absolute;
  right: -10px;
  bottom: 0px;
  width: 350px;
  height: 510px;
  background-color: #fcfcf3;
  border-radius: 20px;
  color: #f9f9f9;
  padding: 15px 15px;
  box-shadow: 0px 10px 20px 20px rgba(0, 0, 0, 0.2);
  .chatHeader {
    div:nth-child(1) {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      h2 {
        color: #333;
        font-weight: 700;
        font-size: 18px;
        svg {
          margin-left: 7px;
          margin-right: 10px;
        }
      }
      button {
        cursor: pointer;
        border: none;
        background: none;
        color: #00bb4f;
        padding: 0 0 0 5px;
        svg {
          width: 25px;
          height: 25px;
        }
        :hover {
          filter: brightness(0.9);
        }
      }
    }
  }
  .chatBody {
    width: 100%;
    text-align: justify;
    word-break: keep-all;
    line-height: 1.2;
    margin-top: 10px;
    h3 {
      margin: 10px 0 15px;
    }
  }
  > p {
    font-size: 14px;
    line-height: 20px;
    margin: 15px 5px;
    color: rgba(0, 0, 0, 0.4);
  }
`;
const ChatBalloonWrap = styled.div`
  width: 100%;
  text-align: justify;
  word-break: keep-all;
  line-height: 1.2;
  margin-top: 10px;
  h3 {
    margin: 10px 0 15px;
  }
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100%;
  width: 100%;
  color: rgba(0, 0, 0, 0.85);
  padding: 5px 5px 10px 5px;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 16px 1px;
  button {
    width: 98%;
    height: 45px;
    font-size: 15px;
    font-weight: bold;
    color: #f9f9f9;
    margin-top: 5px;
    border-radius: 15px;
    background-color: #00bb4f;
    border: none;
    cursor: pointer;
    :hover {
      filter: brightness(0.9);
    }
  }
`;
const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 30px;
  padding: 15px;
  cursor: pointer;
  & > div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid rgba(0, 0, 0, 0.85);
    border-radius: 50%;
  }
  &:hover {
    background-color: #ececec;
  }
`;
const MessageBox = styled.div`
  width: 83%;
  p:nth-child(1) {
    font-size: 15px;
    font-weight: bold;
  }
  p:nth-child(2) {
    font-size: 16px;
    text-align: left;
    line-height: 25px;
  }
`;
const NotiBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
const GreenDot = styled.span`
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #00bb4f;
`;
const Notice = styled.span`
  font-size: 13px;
  margin-left: 5px;
`;
export default function ChatBot() {
  const [showOn, setShowOn] = useState(false);
  const { user } = useUser();

  return (
    <ChatBotWrap>
      {user ? (
        <ChatBotBtn onClick={() => setShowOn(!showOn)}>ChatBot</ChatBotBtn>
      ) : null}
      {showOn ? (
        <ChatBox>
          <div className="chatHeader">
            <div>
              <h2>
                <Mlogo width={16} /> MovieApp
              </h2>
              <div>
                <button>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button onClick={() => setShowOn(!showOn)}>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <p>
            다양한 영화와 Tv Show 정보를 제공하는
            <br />
            무비앱 입니다.
          </p>
          <div className="chatBody">
            <ChatBalloonWrap>
              <FlexBox>
                <div>
                  <Mlogo width={15}></Mlogo>
                </div>
                <MessageBox>
                  <p>MovieApp</p>
                  <p>
                    반갑습니다, 고객님 :) 다양한 영화와 Tv Show 정보를 제공하는
                    무비앱 입니다. 원하시는 문의사항을 선택해주세요!
                    <br />
                    ...
                  </p>
                </MessageBox>
              </FlexBox>
              <button>새 문의하기</button>
              <NotiBox>
                <GreenDot />
                <Notice>보통 수십 분 내 답변</Notice>
              </NotiBox>
            </ChatBalloonWrap>
          </div>
        </ChatBox>
      ) : null}
    </ChatBotWrap>
  );
}
