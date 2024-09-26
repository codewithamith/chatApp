import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row, InputGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";

function MessageForm() {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user);
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);
  const messageEndRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const todayDate = getFormattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    setMessages(roomMessages);
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  }
  return (
    <>
      <div
        className="my-3 border overflow-scroll"
        style={{ height: "calc(100vh - 200px)" }}
      >
        {user && !privateMemberMsg?._id && (
          <div className="alert alert-info">
            You are in the {currentRoom} group...
          </div>
        )}
        {user && privateMemberMsg?._id && (
          <>
            <div className="alert alert-info text-center p-2">
              <div>
                Your conversation with <strong>{privateMemberMsg.name}</strong>{" "}
                <img
                  src={privateMemberMsg.picture}
                  className="my-2 mx-auto ml-2"
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "cover",
                    borderRadius: " 50%",
                  }}
                />
              </div>
            </div>
          </>
        )}
        {!user && <div className="alert alert-danger">Please Login...</div>}

        {user &&
          messages.map(({ _id: date, messagesByDate }, idx) => (
            <div key={idx}>
              <p className="alert alert-warning mx-auto my-0 mb-2 text-center w-25 p-1">
                {date}
              </p>
              {messagesByDate?.map(
                ({ content, time, from: sender }, msgIdx) => (
                  <div
                    className={
                      sender?.email == user?.email
                        ? "message"
                        : "d-flex justify-content-end"
                    }
                    key={msgIdx}
                  >
                    <div className="mb-2 p-2 mx-2 border" style={{ maxWidth: 'max-content', backgroundColor:'#BAF8DC'}}>
                        <div className="d-flex align-items-center mb-2">
                            <img
                            src={sender.picture}
                            style={{
                                width: 30,
                                height: 30,
                                objectFit: "cover",
                                borderRadius: "50%",
                            }}
                            />
                            <p className="m-0 fw-bold px-2">
                            {sender._id == user?._id ? "You" : sender.name}
                            </p>
                            <p className="m-0 px-3 ms-auto">{time}</p>
                        </div>

                      <p className="p-1 m-0">{content}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          ))}
        <div ref={messageEndRef} />
      </div>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={12}>
            <InputGroup className="mb-3">
              <Form.Control
                type="text"
                placeholder="Type..."
                disabled={!user}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></Form.Control>

              <Button variant="success" type="submit" disabled={!user}>
                <i className="fas fa-paper-plane"></i>
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default MessageForm;
