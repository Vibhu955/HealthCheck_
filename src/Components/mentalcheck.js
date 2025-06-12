import React, { useState } from "react";
import Answers from "./Answers";
import axios from "axios";
import Loading from "./loading.js"; // Import your top loading bar component

function Mentalcheck() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // For loading bar

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    // console.log("Submitting query:", query);
    setLoading(true);
    setProgress(progress + 10); // Start loading

    try {
      // const response = await axios.post(`${process.env.REACT_APP_BACKEND_CHAT_URL}/answers`, {
      const response = await axios.post("http://127.0.0.1:8050/answers", {
        query: query,
      });
      console.log(response);
      setTimeout(() => {
        setProgress(70);
      }, 1000);

      setResults(response.data);
      setTimeout(() => {
        setProgress(100);
      }, 2000);
      // setProgress(100); // Done
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong while contacting the backend.");
      setProgress(100);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Top loading bar */}
      <Loading progress={progress} setProgress={setProgress} />

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          className="p-4 border rounded-lg w-full h-32 resize-none"
          placeholder="Describe your mental health concern..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Processing..." : "Submit Query"}
        </button>
      </form>

      <Answers results={results} />
    </div>
  );
}

export default Mentalcheck;
