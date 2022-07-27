import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { useUser } from "../util/useUser";
import { ReactComponent as BlackLogo } from "../images/logo_black.svg";
import { ReactComponent as Send } from "../images/paper-plane-solid.svg";

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
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  bottom: 0;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  background-color: #fff;
  border: none;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 17px 20px -18px rgba(0, 0, 0, 1);
  cursor: pointer;
  :hover {
    transform: scale(1.05);
    font-weight: bold;
    transition: all ease 0.1s;
  }
  svg {
    margin-top: 5px;
  }
`;
const ChatBox = styled.div`
  position: absolute;
  right: -10px;
  bottom: 0px;
  width: 350px;
  height: 610px;
  background-color: #fcfcf3;
  border-radius: 20px;
  color: #f9f9f9;
  padding: 15px 15px;
  box-shadow: 0px 10px 20px 20px rgba(0, 0, 0, 0.2);
  .p1 {
    font-size: 14px;
    line-height: 20px;
    margin: 15px 5px;
    color: rgba(0, 0, 0, 0.4);
  }
  .p2 {
    margin-top: 10px;
    font-size: 12px;
    text-align: center;
    color: rgba(0, 0, 0, 0.5);
  }
`;
const ChatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  h2 {
    display: flex;
    align-items: center;
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
    color: #2c3e50;
    padding: 0 0 0 5px;
    svg {
      width: 25px;
      height: 25px;
    }
    :hover {
      filter: brightness(0.9);
    }
  }
  .miniBtn:hover {
    color: #35628b;
  }
  .miniBtn.arrow_left svg {
    height: 22px;
    padding: 0 10px 0 0;
    margin: 0 3px 0 0;
    &:hover {
      color: #d2d8dd;
    }
  }
`;
const ChatBalloonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  width: 100%;
  color: rgba(0, 0, 0, 0.85);
  padding: 5px 5px 10px 5px;
  border-radius: 30px;
  background-color: #fff;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 16px 1px;
  word-break: keep-all;
  button {
    width: 98%;
    height: 45px;
    font-size: 15px;
    font-weight: bold;
    color: #f9f9f9;
    margin-top: 5px;
    border-radius: 15px;
    background-color: #2c3e50;
    border: none;
    cursor: pointer;
    :hover {
      filter: brightness(0.9);
    }
  }
`;
const ChatBalloonWrap_2 = styled(ChatBalloonWrap)`
  position: relative;
  height: 94%;
  padding: 0;
  border-radius: 8px;
`;
const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 30px;
  padding: 15px;
  & > div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border: 1px solid rgba(0, 0, 0, 0.85);
    border-radius: 50%;
  }
`;
const FlexBox_2 = styled(FlexBox)`
  justify-content: start;
  padding: 10px 7px 0 7px;
  & > div:nth-child(1) {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border: 1px solid rgba(0, 0, 0, 0.85);
    border-radius: 50%;
  }
`;
const FlexBox_3 = styled(FlexBox_2)`
  flex-direction: row-reverse;
  justify-content: end;
`;

const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 83%;
  p:nth-child(1) {
    font-size: 15px;
    font-weight: bold;
  }
  p:nth-child(2) {
    width: fit-content;
    font-size: 16px;
    text-align: left;
    line-height: 25px;
  }
`;
const MessageBox_2 = styled(MessageBox)`
  width: 89%;
  border-radius: 15px;
  p:nth-child(1) {
    padding: 0px 10px;
    margin-top: 3px;
  }
  p:nth-child(2) {
    font-size: 14px;
    line-height: 1.5;
    padding: 5px 10px 5px 7px;
    margin-top: 5px;
    background-color: #f7f7f7;
    border-radius: 15px;
    border-top-left-radius: 0;
  }
`;
const MessageBox_3 = styled(MessageBox_2)`
  align-items: flex-end;
  p:nth-child(1) {
    font-weight: normal;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px 10px 5px 7px;
    margin-top: 10px;
    margin-right: 5px;
    background-color: #f7f7f7;
    border-radius: 15px;
    border-top-right-radius: 0;
    word-break: break-all;
  }
`;

const NotiBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;
const Dot = styled.span`
  display: inline-block;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.color === "green" ? "#00bb4f" : "#fc0202"};
`;
const Notice = styled.span`
  font-size: 13px;
  margin-left: 5px;
`;
const ChatUl = styled.ul`
  height: calc(100% - 55px);
  width: 100%;
  /* border: 1px solid red; */
  overflow-y: scroll;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
  li {
    display: flex;
    img {
      width: 20px;
      height: 20px;
      object-fit: cover;
      border-radius: 50%;
      background-color: #f9f9f9;
    }
  }
`;
const ChatInputBox = styled.form`
  position: absolute;
  bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: 1px solid red; */
  width: calc(100% - 20px);
  height: 35px;
  padding: 3px 5px;
  background-color: #ececec;
  border-radius: 50px;
  box-shadow: rgb(0 0 0 / 10%) 0px 2px 16px 1px;

  .sendBtn {
    width: 10%;
    height: 100%;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      fill: #f6f6f6;
      height: 60%;
    }
  }
`;
const ChatInput = styled.input`
  width: 89%;
  height: 100%;
  font-size: 14px;
  background-color: #ececec;
  border: none;
  outline: none;
`;

export default function ChatBot() {
  const { user } = useUser();
  const [showOn, setShowOn] = useState(false); //챗봇창 열고 닫기
  const [chatOn, setChatOn] = useState(true);
  const [onTime, setOnTime] = useState(false); //운영시간 모드
  const now = new Date(); //챗봇 열때 현재시각 갖고오기
  const nowTime = now.getHours() * 60 + now.getMinutes(); //현재시각 분으로 환산
  const nowDay = now.getDay(); //현재 요일

  const open = () => {
    setShowOn(!showOn);
    // console.log(nowDay, nowTime);
    if (nowDay === 0 || nowDay >= 6) {
      //월~금이 아닌경우 운영시간 false 후 종료
      return setOnTime(false);
    }
    if (nowTime >= 570 && nowTime <= 1020) {
      //월~금이고 9:30~17:00일때 운영시간 true
      setOnTime(true);
    }
  };

  const [inputText, setInputText] = useState("");
  const lists = [];
  const [chatList, setChatList] = useState(lists);
  const [id, setId] = useState("2");
  const [scrollHeight, setScrollHeight] = useState("");
  const scrollRef = useRef();

  const userInput = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
  };
  const onClick = (e) => {
    e.preventDefault();
    if (inputText.length > 0) {
      const newChat = { text: inputText };
      chatList.push(newChat);
      setChatList(chatList);
      setInputText("");
      setId(id + 1);
      setScrollHeight(scrollRef.current.scrollHeight);
    }
  };
  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [scrollHeight, chatOn]);

  return (
    <ChatBotWrap>
      {user ? (
        <ChatBotBtn onClick={open}>
          <BlackLogo width={35} />
        </ChatBotBtn>
      ) : null}
      {showOn ? (
        <ChatBox>
          {chatOn ? (
            <>
              <ChatHeader>
                <h2>
                  <BlackLogo width={20} /> Movie App
                </h2>
                <div>
                  <button className="miniBtn">
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
                  <button
                    onClick={() => setShowOn(!showOn)}
                    className="miniBtn"
                  >
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
              </ChatHeader>
              <p className="p1">
                다양한 영화와 Tv Show 정보를 제공하는
                <br />
                무비앱 입니다.
              </p>

              <ChatBalloonWrap>
                <FlexBox>
                  <div>
                    <BlackLogo width={18} />
                  </div>
                  <MessageBox>
                    <p>Movie App</p>
                    <p>
                      반갑습니다, 고객님 :) 다양한 영화와 Tv Show 정보를
                      제공하는 무비앱 입니다. 무엇을 도와드릴
                      <br />
                      ...
                    </p>
                  </MessageBox>
                </FlexBox>
                <button
                  onClick={() => {
                    if (onTime) {
                      setChatOn(!chatOn);
                    }
                  }}
                >
                  새 문의하기
                </button>
                <NotiBox>
                  <Dot color={onTime ? "green" : null} />
                  <Notice>
                    {onTime
                      ? "보통 수십 분 내 답변"
                      : "현재 운영 시간이 아닙니다."}
                  </Notice>
                </NotiBox>
              </ChatBalloonWrap>
              <p className="p2">운영시간 | 평일 오전 9:30 ~ 오후 5:00</p>
            </>
          ) : (
            <>
              <ChatHeader>
                <h2>
                  <button
                    className="miniBtn arrow_left"
                    onClick={() => {
                      setChatOn(!chatOn);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 512"
                    >
                      <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
                    </svg>
                  </button>
                  Movie App
                </h2>
                <div>
                  <button className="miniBtn">
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
                  <button
                    onClick={() => setShowOn(!showOn)}
                    className="miniBtn"
                  >
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
              </ChatHeader>
              <ChatBalloonWrap_2>
                <ChatUl ref={scrollRef}>
                  <li>
                    <FlexBox_2>
                      <div>
                        <BlackLogo width={15} />
                      </div>
                      <MessageBox_2>
                        <p>Movie App</p>
                        <p>
                          반갑습니다, 고객님 :) 다양한 영화와 Tv Show 정보를
                          제공하는 무비앱 입니다. 무엇을 도와드릴까요?
                        </p>
                      </MessageBox_2>
                    </FlexBox_2>
                  </li>
                  {chatList.map((list, index) => (
                    <li key={index}>
                      <FlexBox_3>
                        <div>
                          {user?.profileUrl ? (
                            <img src={user?.profileUrl} />
                          ) : (
                            <svg
                              className="w-6 h-6"
                              fill="#333"
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
                        </div>
                        <MessageBox_3>
                          <p>{list.text}</p>
                        </MessageBox_3>
                      </FlexBox_3>
                    </li>
                  ))}
                </ChatUl>
                <ChatInputBox>
                  <ChatInput
                    type="text"
                    placeholder="무엇이든 물어보세요."
                    onChange={userInput}
                    id={id}
                    value={inputText}
                  />
                  <button className="sendBtn" onClick={onClick}>
                    <Send />
                  </button>
                </ChatInputBox>
              </ChatBalloonWrap_2>
            </>
          )}
        </ChatBox>
      ) : null}
    </ChatBotWrap>
  );
}
