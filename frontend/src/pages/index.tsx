import { useState } from "react";

export default function Home() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState("");

  const handleGenerate = async () => {
    // ここでAPI呼び出しや生成処理を行う
    setResult(`「${keyword}」でなぞかけ生成！（仮）`);
  };

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>AIなぞかけメーカー</h1>
      <p>ここからアプリが始まります。</p>

      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="お題を入力"
        style={{ marginRight: "0.5rem" }}
      />
      <button onClick={handleGenerate}>なぞかけ生成</button>

      {result && (
        <div style={{ marginTop: "1rem" }}>
          <strong>結果:</strong> {result}
        </div>
      )}
    </main>
  );
}
