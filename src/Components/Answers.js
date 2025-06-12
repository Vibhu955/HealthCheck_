import React from "react";

const Answers = ({ results }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      {results.length === 0 ? (
        <div className="text-center text-gray-500">No answers found.</div>
      ) : (
        results.map((res, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-2xl p-6 space-y-4">
            <div className="text-sm text-gray-400">💡 Topic: <code>{res.topic || "Unknown"}</code></div>

            <h3 className="text-xl font-semibold text-blue-700">
              🔷 Answer {idx + 1}
            </h3>

            <div className="text-gray-700">
              <p><strong>👩‍⚕️ Therapist:</strong> {res.therapist}</p>
              <p>
                🔗 <a
                  href={res.therapist_url}
                  className="text-blue-500 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  PsychologyToday Profile
                </a>
              </p>
              <p className="text-xs text-red-400 mt-1">
                ⚠️ We link to public therapist listings for convenience. We do not verify or endorse them.
              </p>
            </div>

            <div>
              <h4 className="font-medium">📝 Summary:</h4>
              <p className="text-gray-800">{res.summary}</p>
            </div>

            <details className="bg-gray-100 p-4 rounded">
              <summary className="cursor-pointer text-blue-600">📖 Click to view full answer</summary>
              <p className="mt-2 text-gray-700 whitespace-pre-line">{res.answer}</p>
            </details>

            <div className="text-sm text-gray-500 flex gap-4">
              <span>👁️ Views: {res.views}</span>
              <span>👍 Upvotes: {res.upvotes}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Answers;
