// app/admin/messages/MessageList.tsx
import MessageCard from "./MessageCard";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  category: string;
};

interface MessageListProps {
  messages: Message[];
  onRespond: (message: Message) => void;
}

export default function MessageList({
  messages = [],
  onRespond,
}: MessageListProps) {
  if (messages.length === 0) {
    return <p>No messages found.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {messages.map((message) => (
        <MessageCard key={message.id} message={message} onRespond={onRespond} />
      ))}
    </div>
  );
}
