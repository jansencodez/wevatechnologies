// app/admin/messages/RespondModal.tsx
import { useState } from "react";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
};
interface RespondModalProps {
  message: Message;
  onClose: () => void;
  onResponse: () => void;
}

export default function RespondModal({
  message,
  onClose,
  onResponse,
}: RespondModalProps) {
  const [responseMessage, setResponseMessage] = useState<string>("");

  const sendResponse = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/messages/${message.id}/respond`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ response: responseMessage }),
        }
      );
      if (!res.ok) {
        const errorData = await res.json();
        console.log("Error:", errorData);
      } else {
        console.log("Response sent successfully");
        onResponse();
        onClose();
      }
    } catch (error) {
      console.log("Request failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-bold mb-4">Respond to {message.name}</h2>
        <textarea
          value={responseMessage}
          onChange={(e) => setResponseMessage(e.target.value)}
          className="w-full border p-2 rounded"
          rows={4}
          placeholder="Type your response here..."
        />
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={sendResponse}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
