import { useEffect, useRef, useState } from "react";
import { Socket } from "socket.io-client";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { queryClient } from "../../utils/queryClient";
import type { SafeUserInterface } from "../../types/interfaces/UserInterface";
import { socketIoClient } from "../../utils/socketIoClient";
import { v4 as uuid } from "uuid";

interface Message {
  messageId: string;
  type: string;
  senderId: string;
  content: string;
  timestamp: string;
}

interface WelcomePayload {
  type: string;
  username: string;
}

interface JoinPayload {
  type: string;
  username: string;
}

const ConversationDetailsPage = () => {
  const webSocket: Socket | null = socketIoClient();
  const me = queryClient.getQueryData<SafeUserInterface>(["me"]);
  const socketRef = useRef<Socket | null>(null);

  const [messageInput, setMessageInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const conversationId = "yfcgvuhb"; // Id de la conversation

  // Scroll automatique
  const messagesEndRef = useRef<HTMLLIElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!webSocket || !me) return;
    socketRef.current = webSocket;
    const socket = socketRef.current;

    const onConnect = () => {
      socket.emit("joinConversation", conversationId);
    };

    const onMessage = (data: Message) => {
      // if (data.conversationId === conversationId) {
      setMessages((prev) => (prev.some((m) => m.messageId === data.messageId) ? prev : [...prev, data]));
      // }
    };

    const onWelcome = (data: WelcomePayload) => {
      setMessages((prev) => [
        ...prev,
        {
          messageId: uuid(),
          type: "welcome",
          content: `Bienvenue ${data.username} 👋`,
          senderId: "system",
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    const onJoin = (data: JoinPayload) => {
      setMessages((prev) => [
        ...prev,
        {
          messageId: uuid(),
          type: "user_joined",
          content: `${data.username} a regoind la conversation`,
          senderId: "system",
          timestamp: new Date().toISOString(),
        },
      ]);
    };

    const onLeft = (data: JoinPayload) => {
      setMessages((prev) => [
        ...prev,
        {
          messageId: uuid(),
          type: "user_joined",
          content: `${data.username} a quité la conversation`,
          senderId: "system",
          timestamp: new Date().toISOString(),
        },
      ]);
    };


    if (socket.connected) {
      onConnect();
    } else {
      socket.on("connect", onConnect);
    }

    socket.on("message", onMessage);
    socket.on("welcome", onWelcome);
    socket.on("user_joined", onJoin);
    socket.on("user_left", onLeft);

    return () => {
      socket.off("connect", onConnect);
      socket.off("message", onMessage);
      socket.off("welcome", onWelcome);
      socket.off("user_joined", onJoin);
      socket.off("user_left", onLeft);
      socketRef.current = null;
    };
  }, [conversationId, me, webSocket]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!messageInput.trim() || !me) return;

    const msg: Message = {
      messageId: uuid(),
      type: "message",
      content: messageInput,
      senderId: me.id,
      timestamp: new Date().toISOString(),
    };

    socketRef.current?.emit("message", msg);
    setMessages((prev) => [...prev, msg]);
    setMessageInput("");
  };

  return (
    <>
      <ul className="list-none m-0 p-0 mb-14">
        {messages.map((msg) => (
          <li
            key={msg.messageId}
            className={`px-4 py-2 text-sm italic ${
              msg.senderId === "system"
                ? "text-gray-500 text-center"
                : msg.senderId === me?.id
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-black"
            }`}
          >
            {msg.content}
          </li>
        ))}
        <li ref={messagesEndRef} />
      </ul>

      <form onSubmit={sendMessage} className="fixed bottom-0 left-0 right-0 flex h-12 p-1 bg-black/15 backdrop-blur-md">
        <input
          className="flex-grow px-4 rounded-full m-1 focus:outline-none"
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Votre message..."
        />
        <PrimaryButton type="submit">Send</PrimaryButton>
      </form>
    </>
  );
};

export default ConversationDetailsPage;
