import { useEffect, useState } from "react";
import axios from "axios";
import "./Chatsocket.css";

export default function Chatsocket({ socket, username, room }) {
  const [messageList, setMessageList] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };

      try {
        // Send message to the HTTP server
        const response = await axios.post("http://localhost:8081/messages", messageData);
        if (response.status === 200) {
          setMessageList((list) => [...list, messageData]);
          setCurrentMessage("");
          console.log("Message sent  successfully");
        } else {
          console.error("Failed to send message to HTTP server:", response.status);
        }
      } catch (error) {
        console.error("Error sending message to HTTP server:", error);
      }

      // Emit message to the socket server
      socket.emit("send_message", messageData);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
      console.log(messageList);
    });
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-body">
        <div className="message-container">
          {messageList.map((messageContent, index) => (
            <div
              className="message"
              key={index}
              id={username === messageContent.author ? "you" : "other"}
            >
              <div>
                <div className="message-content">
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => setCurrentMessage(event.target.value)}
          onKeyPress={(event) => event.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}
