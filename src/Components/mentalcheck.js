import React, { useState, useEffect } from "react";
import Answers from "./Answers";
import axios from "axios";
import Loading from "./loading.js";
import Summary from "./Summary.js";
import { useHistory } from "react-router-dom";

function Mentalcheck() {
  const history = useHistory();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("token"))
      history.push("/login");
  }, [])

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setProgress((prev) => (prev < 70 ? prev + 10 : prev));
      }, 500);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setProgress(10);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_CHAT_URL}/answers`,
        { query },
        { headers: { "Content-Type": "application/json" } }
      );
      const data = response.data;
      setResults(data.results || []);
      setSummary(data.final_summary || "");
      setProgress(100);
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong while contacting the backend.");
      setProgress(100);
    } finally {
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 800);
    }
  };

  return (
    <div className="container">
      <Loading progress={progress} setProgress={setProgress} />
      <h2 className="text-2xl font-bold text-gray-800 mb-4 m-3">
        Tell us about Your Concern!
      </h2>
      {/* Query Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 flex justify-center">
        <form onSubmit={handleSubmit} className="w-full flex justify-center">
          <div className="flex flex-col gap-4 items-center w-full">
            <div className="form-floating">
              <textarea className="form-control" placeholder="Ask a query here..." id="floatingTextarea" style={{ minHeight: "35vh", resize: "none", fontSize: "1rem", lineHeight: "1.4", padding: "2.5rem" }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}>

              </textarea>
              <label for="floatingTextarea">Ask a query here...</label>

              {/* className="w-1/2 min-h-[100rem] resize-none p-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500" */}
            </div>
            <button
              style={{ color: "rgb(110, 99, 197)" }}
              type="submit"
              className="bg-blue-600 py-2 px-6 rounded-xl shadow hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 m-5"
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit Query"}
            </button>
          </div>
        </form>
      </div>
      {/* Summary */}
      {summary && <Summary summary={summary} />}
      {/* Results */}
      <Answers results={results} />

    </div>
  );
}

export default Mentalcheck;
