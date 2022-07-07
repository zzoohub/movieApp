import { useState } from "react";
import styled from "styled-components";
import { useUser } from "../util/useUser";

const ChatBotWrap = styled.div`
  position: fixed;
  right: 40px;
  bottom: 25px;
  width: 70px;
  /* background-color: #dd4982; */
  height: 70px;
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
  width: 300px;
  height: 600px;
  background-color: #eaeaea;
  border-radius: 20px;
  color: #f9f9f9;
  padding: 20px 15px;
  box-shadow: 0px 10px 20px 20px rgba(0, 0, 0, 0.2);
  .chatHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      color: #333;
      font-weight: 700;
    }
    button {
      cursor: pointer;
      border: none;
      background: none;
      color: #666;
      padding: 0 0 0 5px;
      svg {
        width: 25px;
        height: 25px;
      }
      :hover {
        color: #333;
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
`;
const ChatBalloonWrap = styled.div`
  height: 530px;
  width: 270px;
  border-radius: 10px;
  background-color: #f9f9f9;
`;
const ChatUl = styled.ul`
  position: relative;
  height: 485px;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 2px 5px;
  overflow-y: auto;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0px;
    padding: 0px 8px;
  }
  li:first-child div:nth-child(2) {
    position: relative;
    width: 80%;
    text-align: justify;
    word-break: break-all;
    color: #000;
    ::before {
      content: "";
      position: absolute;
      left: -33px;
      top: 50%;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-bottom: 10px solid transparent;
      border-top: 10px solid transparent;
      border-left: 20px solid transparent;
      border-right: 20px solid #d9d9d9;
    }
  }
  li:not(:first-child) {
    flex-direction: row-reverse;
    div:nth-child(2) {
      position: relative;
      width: 80%;
      text-align: justify;
      word-break: break-all;
      color: #000;
      ::before {
        content: "";
        position: absolute;
        right: -33px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-bottom: 10px solid transparent;
        border-top: 10px solid transparent;
        border-right: 20px solid transparent;
        border-left: 20px solid #d9d9d9;
      }
    }
  }
`;
const Text = styled.div`
  padding: 7px;
  background-color: #d9d9d9;
  font-size: 14px;
  border-radius: 5px;
`;
const ThumNail = styled.div`
  background-color: gray;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  line-height: 48px;
  text-align: center;
`;
const Form = styled.form`
  position: absolute;
  left: 23px;
  bottom: 20px;
  display: flex;
  width: 254px;
  height: 32px;
  margin-top: 10px;
  border-radius: 20px;
  overflow: hidden;
  background-color: #fff;
  input {
    width: 85%;
    outline: none;
    border: none;
    line-height: 18px;
    padding: 7px;
  }
  button {
    position: absolute;
    right: 2px;
    top: 2px;
    width: 28px;
    height: 28px;
    border: none;
    border-radius: 50%;

    text-align: right;
    cursor: pointer;
  }
`;

function ChatBalloon() {
  const { user } = useUser();
  const nickName = user?.nickname;

  const [inputText, setInputText] = useState("");
  const lists = [
    {
      id: 1,
      profile: "",
      text: "더운 여름에 시원하게 볼 수 있는 공포영화 어떠세요?",
    },
  ];

  const [chatList, setChatList] = useState(lists);
  const [nextId, setNextId] = useState(2);
  const userInput = (e) => {
    e.preventDefault();
    setInputText(e.target.value);
  };
  const onClick = (e) => {
    e.preventDefault();
    if (inputText.length > 0) {
      const newChat = { id: nextId, profile: nickName, text: inputText };
      chatList.push(newChat);
      setChatList(chatList);
      setNextId(nextId + 1);
      setInputText("");
    }
  };

  return (
    <ChatBalloonWrap>
      <ChatUl>
        {chatList.map((list) => (
          <li key={list.id}>
            <ThumNail />
            <Text>{list.text}</Text>
          </li>
        ))}
      </ChatUl>
      <Form>
        <input
          type="text"
          placeholder="무엇이든 물어보세요."
          onChange={userInput}
          id={nextId}
          value={inputText}
          profile={"user"}
        ></input>
        <button onClick={onClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="#1C8FFC"
          >
            <path d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z" />
          </svg>
        </button>
      </Form>
    </ChatBalloonWrap>
  );
}

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
            <h2>Chating Bot</h2>
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
          <div className="chatBody">
            <ChatBalloon />
          </div>
        </ChatBox>
      ) : null}
    </ChatBotWrap>
  );
}
