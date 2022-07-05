import { useState } from "react";
import styled from "styled-components";
import { useUser } from "../util/useUser";

const ChatBotWrap = styled.div`
  position: fixed;
  right: 80px;
  bottom: 80px;
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
  bottom: -10px;
  width: 300px;
  height: 600px;
  background-color: #6aebb7;
  border-radius: 20px;
  color: #f9f9f9;
  padding: 20px 15px;
  .chatHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      color: #007d51;
      font-weight: 700;
    }
    button {
      cursor: pointer;
      border: none;
      background: none;
      color: #f9f9f9;
      padding: 0 0 0 5px;
      svg {
        width: 25px;
        height: 25px;
      }
      :hover {
        color: #007d51;
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
  height: 400px;
  border: 1px solid red;
`;
const ThumNail = styled.div`
  background-color: #000;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  line-height: 50px;
  text-align: center;
`;
const Form = styled.form`
  textarea {
    width: 100%;
    height: 50px;
  }
  button {
    display: block;
    text-align: right;
  }
`;

function ChatBalloon() {
  const { user } = useUser();

  const [inputText, setInputText] = useState("");
  const lists = [
    // {
    //   id: 1,
    //   profile: user.nickname,
    //   text: "더운 여름에 시원하게 볼 수 있는 공포영화 추천해 주세요.",
    // },
    // {
    //   id: 2,
    //   profile: user?.nickname,
    //   text: "더운 여름에 시원하게 볼 수 있는 공포영화 추천해 주세요.",
    // },
  ];
  const [chatList, setChatList] = useState([]);
  const [nextId, setNextId] = useState(3);
  const userInput = (e) => {
    setInputText(e.target.value);
  };
  const onClick = (e) => {
    e.preventDefault();
    if (inputText.length > 0) {
      const newChat = { id: nextId, profile: user?.nickname, text: inputText };
      const newLists = [...lists];
      newLists.push(newChat);
      setChatList(newLists);
      setNextId(nextId + 1);
      setInputText("");
    }
  };

  return (
    <div>
      <ChatUl>
        {chatList.map((list) => (
          <li key={list.id}>
            <ThumNail>{list.profile}</ThumNail>
            <div>{list.text}</div>
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
            <h2>MovieApp</h2>
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
            <h3>다양한 영화와 Tv Show 정보를 얻으실 수 있는 무비앱 입니다.</h3>
            <ChatBalloon />
          </div>
        </ChatBox>
      ) : null}
    </ChatBotWrap>
  );
}
