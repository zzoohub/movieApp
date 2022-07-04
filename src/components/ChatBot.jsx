import { useState } from "react";
import styled from "styled-components";

const ChatBot_wrap = styled.div`
  position: fixed;
  right: 80px;
  bottom: 80px;
  width: 70px;
  background-color: #dd4982;
  height: 70px;
`;
const ChatBot_btn = styled.button`
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
const Chat_box = styled.div`
  position: absolute;
  right: -10px;
  bottom: -10px;
  width: 300px;
  height: 700px;
  background-color: #6aebb7;
  border-radius: 20px;
  padding: 15px;
`;
// const chat_header = styled.div{

// }

export default function ChatBot() {
  const [showOn, setShowOn] = useState(false);
  const show = () => setShowOn(!showOn);

  const close = () => setShowOn(!showOn);
  return (
    <ChatBot_wrap>
      <ChatBot_btn onClick={show}>ChatBot</ChatBot_btn>
      {showOn ? (
        <Chat_box>
          <div className="chat_header">
            <h2>MovieApp</h2>
            <button>set</button>
            <button onClick={close}>X</button>
          </div>
        </Chat_box>
      ) : null}
    </ChatBot_wrap>
  );
}
