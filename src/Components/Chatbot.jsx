import { useState, useEffect } from "react";
import "./Chatbot.css";

const Chatbot = () => {
  const [state, setState] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    const openButton = document.querySelector(".chatbox__button");
    const chatBox = document.querySelector(".chatbox__support");
    const sendButton = document.querySelector(".send__button");

    const toggleState = () => {
      setState(!state);
      if (state) {
        chatBox.classList.remove("chatbox--active");
      } else {
        chatBox.classList.add("chatbox--active");
      }
    };

    const onSendButton = () => {
      if (inputText === "") return;

      let msg1 = { name: "User", message: inputText };
      setMessages([...messages, msg1]);

      fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: JSON.stringify({ message: inputText }),
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((r) => r.json())
        .then((r) => {
          let msg2 = { name: "Sam", message: r.answer };
          setMessages([...messages, msg2]);
          setInputText("");
        })
        .catch((error) => {
          console.error("Error:", error);
          setInputText("");
        });
    };

    openButton.addEventListener("click", toggleState);
    sendButton.addEventListener("click", onSendButton);

    const handleEnterKey = (event) => {
      if (event.key === "Enter") {
        onSendButton();
      }
    };

    const node = chatBox.querySelector("input");
    node.addEventListener("keyup", handleEnterKey);

    return () => {
      openButton.removeEventListener("click", toggleState);
      sendButton.removeEventListener("click", onSendButton);
      node.removeEventListener("keyup", handleEnterKey);
    };
  }, [state, inputText, messages]);

  const updateChatText = () => {
    return messages
      .slice()
      .reverse()
      .map((item, index) => {
        return (
          <div
            key={index}
            className={
              item.name === "Sam"
                ? "messages__item messages__item--visitor"
                : "messages__item messages__item--operator"
            }
          >
            {item.message}
          </div>
        );
      });
  };

  return (
    <div className="container">
      <div className="chatbox">
        <div className={`chatbox__support ${state ? "chatbox--active" : ""}`}>
          <div className="chatbox__header">
            <div className="chatbox__image--header">
              <img
                src="https://img.icons8.com/color/48/000000/circled-user-female-skin-type-5--v1.png"
                alt="image"
              />
            </div>
            <div className="chatbox__content--header">
              <h4 className="chatbox__heading--header">Chat support</h4>
              <p className="chatbox__description--header">
                Hi. My name is Sam. How can I help you?
              </p>
            </div>
          </div>
          <div className="chatbox__messages">{updateChatText()}</div>
          <div className="chatbox__footer">
            <input
              type="text"
              placeholder="Write a message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button className="chatbox__send--footer send__button">Send</button>
          </div>
        </div>
        <div className="chatbox__button">
          <button>
            <img src="./images/chatbox-icon.svg" alt="Chatbox" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
