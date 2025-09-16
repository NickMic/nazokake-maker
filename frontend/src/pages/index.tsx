import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          theme: prompt,
          style: '標準',
          difficulty: '普通',
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      console.error(err);
      setResult('エラーが発生しました');
    }
  };

  return (
    <main>
      <h1>なぞかけ生成</h1>
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="お題を入力（例：寿司）"
      />
      <button onClick={handleGenerate}>生成</button>
      {result && <p>結果: {result}</p>}
    </main>
  );
}
