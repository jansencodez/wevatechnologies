// app/admin/messages/page.tsx
"use client";

import { useState, useEffect } from "react";
import MessageList from "./MessageList";
import FilterBar from "./FilterBar";
import RespondModal from "./RespondModal";

interface Message {
  id: string;
  name: string;
  email: string;
  message: string;
  category: string;
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<Message[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`);
    const data: Message[] = await res.json();
    console.log(data);
    setMessages(data);
    setFilteredMessages(data);
  };

  const filterMessages = (category: string) => {
    setSelectedCategory(category);
    if (category) {
      setFilteredMessages(messages.filter((msg) => msg.category === category));
    } else {
      setFilteredMessages(messages);
    }
  };

  const openModal = (message: Message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <FilterBar
        selectedCategory={selectedCategory}
        onFilter={filterMessages}
      />
      <MessageList messages={filteredMessages} onRespond={openModal} />
      {isModalOpen && selectedMessage && (
        <RespondModal
          message={selectedMessage}
          onClose={() => setIsModalOpen(false)}
          onResponse={fetchMessages}
        />
      )}
    </div>
  );
}
