import React, { useEffect, useRef, useState } from 'react';
import './messages.css';
import useGetAllMessage from '../../../Contexts/useGetAllMessage';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../common_Routes/Loading';

const Messages = ({ selectedUser }) => {
  const { messages } = useSelector(store => store.onlineUsers);
  const socket = useSelector(store => store.socketio.socket);
  const fetchMessages = useGetAllMessage();
  const bottomRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch messages and handle socket updates
  useEffect(() => {
    const loadMessages = async () => {
      setIsLoading(true);
      await fetchMessages();
      setIsLoading(false);
    };

    loadMessages();

    const handleNewMessage = async (newMessage) => {
      if (
        newMessage.sender_id === selectedUser._id ||
        newMessage.receiver_id === selectedUser._id
      ) {
        setIsLoading(true);
        await fetchMessages();
        setIsLoading(false);
      }
    };

    if (socket) {
      socket.on('newMessage', handleNewMessage);
    }

    return () => {
      if (socket) {
        socket.off('newMessage', handleNewMessage);
      }
    };
  }, [selectedUser, socket]);

  // Scroll to bottom when messages update
  useEffect(() => {
    const timer = setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);

    return () => clearTimeout(timer);
  }, [messages, selectedUser]);

  return (
    <div className='messages_frame'>
      <div className="message_content_frame_display">
        {isLoading ? (
          <div className="loading_frame_message">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="message_content_frame_display_cont">
            {messages && messages.map((message) => (
              <div
                key={message._id}
                className={`display_message ${
                  message.sender_id === selectedUser._id
                    ? 'display_message_user'
                    : 'display_message_admin'
                }`}
              >
                <div
                  className={`display_message_type ${
                    message.sender_id === selectedUser._id
                      ? 'display_message_type_a'
                      : 'display_message_type_u'
                  }`}
                >
                  <p>{message.message}</p>
                </div>
              </div>
            ))}
            {/* Scroll anchor */}
            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
