import { useEffect, useRef } from "react";
import PrimaryButton from "../../components/ui/PrimaryButton";
import type { SafeUserInterface } from "../../types/interfaces/UserInterface";
import { queryClient } from "../../utils/queryClient";
import { io, Socket } from "socket.io-client";

const ConversationDetailsPage = () => {
  const me: SafeUserInterface | undefined = queryClient.getQueryData(["me"]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    socketRef.current = io("http://localhost:3001", {
      transports: ["websocket"],
    });

    socketRef.current.on("connect", () => {
      console.log("✅ Connected socketIO");
    });

    socketRef.current.on("message", (data) => {
      console.log("📩 message reçu", data);
      // displayMessage(data.username, data.text);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch("http://localhost:3001/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        conversationId: "yfcgvuhb",
        content: "Hello",
        senderId: "123",
      }),
    });
  };
  return (
    <>
      <ul id="messages" className="list-none m-0 p-0">
        <li className="px-4 py-2 bg-gray-100 text-black">Message 1</li>
        <li className="px-4 py-2">Message 2</li>
        <li className="px-4 py-2 bg-gray-100 text-black">Message 3</li>
      </ul>

      <form
        onSubmit={sendMessage}
        id="form"
        className="fixed bottom-0 left-0 right-0 flex h-12 p-1 bg-black/15 backdrop-blur-md box-border"
      >
        <input
          id="input"
          className="flex-grow border-none px-4 rounded-full m-1 focus:outline-none"
          type="text"
          placeholder="Votre message..."
        />
        <PrimaryButton customClass="w-50 mx-auto mt-5 px-5 py-2 text-center" type="submit">
          Send
        </PrimaryButton>
      </form>
    </>
  );
};

export default ConversationDetailsPage;
