import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { queryClient } from "../../utils/queryClient";
import type { SafeUserInterface } from "../../types/interfaces/UserInterface";
import { socketIoClient } from "../../utils/socketIoClient";

interface Message {
  id?: string;
  conversationId: string;
  content: string;
  senderId: string;
  timestamp?: string;
}

const ConversationDetailsPage = () => {
  const webSocket: Socket | null = socketIoClient();
  const me = queryClient.getQueryData<SafeUserInterface>(["me"]);
  const socketRef = useRef<Socket | null>(null);

  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const conversationId = "yfcgvuhb"; // Id de la conversation

  // Scroll automatique
  const messagesEndRef = useRef<HTMLLIElement | null>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Connexion Socket.IO avec token auth
    socketRef.current = webSocket;
    if (socketRef.current) {
      socketRef.current.on("connect", () => {
        console.log("✅ Connected socketIO");

        // Rejoindre la conversation
        socketRef.current?.emit("joinConversation", conversationId);
      });
      // Écouter les messages de la conversation
      socketRef.current.on("message", (data: Message) => {
        if (data.conversationId === conversationId) {
          setMessages((prev) => [...prev, data]);
        }
      });
    }

    return () => {
      socketRef.current?.disconnect();
    };
  }, [conversationId, webSocket]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || !me) return;

    const msg: Message = {
      conversationId,
      content: message,
      senderId: me.id,
      timestamp: new Date().toISOString(),
    };

    socketRef.current?.emit("message", msg);
    setMessages((prev) => [...prev, msg]); // Afficher immédiatement côté front
    setMessage("");
  };

  return (
    <>
      <ul className="list-none m-0 p-0 mb-14">
        {messages.map((msg) => (
          <li
            key={msg.timestamp + msg.senderId}
            className={`px-4 py-2 ${msg.senderId === me?.id ? "bg-blue-500 text-white" : "bg-gray-100 text-black"}`}
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Votre message..."
        />
        <PrimaryButton type="submit">Send</PrimaryButton>
      </form>
    </>
  );
};

export default ConversationDetailsPage;
