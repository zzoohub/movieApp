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
const ChatUl = styled.ul`
  height: 450px;
  background-color: #f9f9f9;
  border-radius: 10px;
  padding: 2px 5px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 15px 0px;
    padding: 0px 8px;
    div:nth-child(2) {
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
  display: flex;
  height: 70px;
  margin-top: 10px;
  textarea {
    resize: none;
    width: 85%;
    border: none;
    border-bottom-left-radius: 10px;
    border-top-left-radius: 10px;
    padding: 5px;
  }
  button {
    width: 15%;
    border: none;
    color: #f9f9f9;
    border-bottom-right-radius: 10px;
    border-top-right-radius: 10px;
    background-color: #007d51;
    text-align: right;
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
      text: "더운 여름에 시원하게 볼 수 있는 공포영화 추천해 주세요.",
    },
  ];
  console.log(lists);

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

      console.log(chatList, nextId);
    }
  };

  return (
    <div>
      <ChatUl>
        {chatList.map((list) => (
          <li key={list.id}>
            <ThumNail>
              {/* {list.profile.length < 4
                ? list.profile
                : list.profile.slice(undefined, 3)} */}
            </ThumNail>
            <Text>{list.text}</Text>
          </li>
        ))}
      </ChatUl>
      <Form>
        <textarea
          type="text"
          placeholder="무엇이든 물어보세요."
          onChange={userInput}
          id={nextId}
          value={inputText}
          profile={"user"}
        >
          {inputText}
        </textarea>
        <button onClick={onClick}>전송</button>
      </Form>
    </div>
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
