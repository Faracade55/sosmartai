'use client';
import React, { useState } from 'react';
import { Volume2, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SoSmartAI() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch('/api/sosmart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    });
    const data = await res.json();
    setResponse(data.text);
    setAudioUrl(data.audio);
    setVideoUrl(data.video);
    setLoading(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
  };

  return (
    <main style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>SoSmart.ai 🤖</h1>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ku qor su’aashaada ama codsigaaga / Write your question..."
        rows={4}
        style={{ width: '100%', padding: 10, borderRadius: 8, marginBottom: 10 }}
      />
      <button onClick={handleSubmit} disabled={loading} style={{ padding: 10, borderRadius: 8 }}>
        {loading ? 'Sug... / Loading...' : 'Dir / Submit'}
      </button>

      {response && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: 20 }}>
          <h2>Jawaabta AI / AI Response:</h2>
          <div style={{ display: 'flex', gap: 10, marginTop: 5 }}>
            <button onClick={handleCopy}><Copy size={16} /></button>
            {audioUrl && <button onClick={() => new Audio(audioUrl).play()}><Volume2 size={16} /></button>}
          </div>
          <p>{response}</p>
          {videoUrl && (
            <video controls style={{ width: '100%', marginTop: 10 }}>
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}
        </motion.div>
      )}
    </main>
  );
}
