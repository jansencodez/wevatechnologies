// app/admin/messages/MessageCard.tsx
type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  category: string;
};

interface MessageCardProps {
  message: Message;
  onRespond: (message: Message) => void;
}

export default function MessageCard({ message, onRespond }: MessageCardProps) {
  return (
    <div className="p-4 border rounded shadow">
      <h2 className="font-bold text-lg">{message.name}</h2>
      <p className="text-gray-600">{message.email}</p>
      <p className="text-sm text-gray-800">{message.message}</p>
      <p className="text-sm text-blue-500">{message.category}</p>
      <button
        onClick={() => onRespond(message)}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
      >
        Respond
      </button>
    </div>
  );
}
