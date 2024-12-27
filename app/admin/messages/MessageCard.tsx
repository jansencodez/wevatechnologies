type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  category: string;
  read: boolean; // New property to indicate if the message is read
};

interface MessageCardProps {
  message: Message;
  onRespond: (message: Message) => void;
}

export default function MessageCard({ message, onRespond }: MessageCardProps) {
  return (
    <div
      className={`p-4 border rounded shadow flex flex-col w-full max-w-7xl ${
        message.read ? "bg-gray-200" : "bg-blue-100"
      }`}
    >
      {/* First Row: Name and Email */}
      <div className="flex justify-between mb-2">
        <h2
          className={`font-bold text-lg ${
            message.read ? "text-gray-500" : "text-black"
          }`}
        >
          {message.name}
        </h2>
        <p
          className={`text-sm ${
            message.read ? "text-gray-500" : "text-gray-600"
          }`}
        >
          {message.email}
        </p>
      </div>

      {/* Second Row: Message */}
      <div className="mb-2">
        <p
          className={`text-sm ${
            message.read ? "text-gray-500" : "text-gray-800"
          }`}
        >
          {message.message}
        </p>
      </div>

      {/* Third Row: Category and Button */}
      <div className="flex justify-between items-center">
        <p
          className={`text-sm ${
            message.read ? "text-gray-400" : "text-blue-500"
          }`}
        >
          {message.category}
        </p>
        <button
          onClick={() => onRespond(message)}
          className={`px-4 py-2 rounded ${
            message.read
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          disabled={message.read} // Disable button if message is read
        >
          Respond
        </button>
      </div>
    </div>
  );
}
