import { useState } from 'react';

export default function Home() {
  const [theme, setTheme] = useState('');
  const [result, setResult] = useState('');

  const handleGenerate = async () => {
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          theme: theme,
          style: '標準',       // 必要に応じて変更可能
          difficulty: '普通',  // 必要に応じて変更可能
        }),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setResult(data.result || 'エラーが発生しました');
    } catch (err) {
      console.error(err);
      setResult('エラーが発生しました');
    }
  };

  return (
    <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>なぞかけ生成</h1>
      <input
        type="text"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        placeholder="お題を入力（例：寿司）"
        style={{ padding: '0.5rem', width: '300px', marginRight: '1rem' }}
      />
      <button onClick={handleGenerate} style={{ padding: '0.5rem 1rem' }}>
        生成
      </button>
      {result && (
        <p style={{ marginTop: '2rem', fontWeight: 'bold' }}>
          結果: {result}
        </p>
      )}
    </main>
  );
}
