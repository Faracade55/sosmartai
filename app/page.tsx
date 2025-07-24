"use client";
import React, { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const handleSend = async () => {
    const res = await fetch("/api/sosmart", {
      method: "POST",
      body: JSON.stringify({ input }),
    });
    const data = await res.json();
    setOutput(data.text);
  };

  return (
    <main className="p-4 max-w-xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">SoSmart.ai</h1>
      <textarea
        className="w-full border p-2 rounded"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Write your question..."
      />
      <button
        onClick={handleSend}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Send
      </button>
      {output && (
        <div className="bg-gray-100 p-4 rounded">
          <strong>AI:</strong> {output}
        </div>
      )}
    </main>
  );
}
