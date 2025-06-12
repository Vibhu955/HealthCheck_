import React from "react";

const Answers = ({ results }) => {
  if (!Array.isArray(results)) {
    return (
      <div className="text-center text-danger mt-4 fs-5">
        ❌ Invalid data received from server.
      </div>
    );
  }

  return (
    <div className="container py-4">
      {results.length === 0 ? (
        <><h3 className="text-center text-muted fs-5 mt-3">Enter a Valid Querry.</h3>
          <h5 className="text-center fs-5 my-1 " style={{fontWeight:"lighter" }}>
            The query should contain your problems. </h5>
          <p className="text-center fs-5 mt-5" style={{ color: "rgb(110, 99, 197)", fontWeight:"bold" }}>Your Happiness is appreciated, but cannot be evaluated here.</p>
        </>
      ) : (
        results.map((res, idx) => (
          <div
            key={idx}
            className="card shadow-lg mb-4 border-0 rounded-4 overflow-hidden"
          >
            <div className="card-body p-4">
              {/* Topic & Answer Title */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge text-bg-light border border-secondary px-3 py-2 rounded-pill text-capitalize">
                  💡 Topic: {res.topic || "Unknown"}
                </span>
                <h5 className="mb-0 fw-bold" style={{ color: "rgb(110, 99, 197)" }}>
                  <i className="bi bi-chat-text-fill me-1"></i> Answer {idx + 1}
                </h5>
              </div>

              {/* Therapist Info */}
              <p className="text-secondary mb-1">
                <i className="bi bi-person-circle"></i>{" "}
                <strong >Therapist:</strong>{" "}
                {res.therapist || "Unknown Therapist"}
              </p>

              {res.therapist_url && (
                <a
                  href={res.therapist_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="d-inline-block text-decoration-none text-info mb-3"
                >
                  <i className="bi bi-link-45deg" ></i> Psychologytoday Therapist Profile
                </a>
              )}

              {/* Disclaimer */}
              <div className="alert alert-warning small py-2">
                ⚠️ We link to public therapist listings for convenience.
                We do not verify or endorse them.
              </div>

              {/* Summary Box */}
              <div className="bg-light p-3 rounded mt-4 mb-3 border-start border-4 border-primary">
                <h6 className="mb-2 text-dark">
                  <i className="bi bi-quote text-secondary me-1"></i> Summary:
                </h6>
                <p className="mb-0 text-dark">{res.summary}</p>
              </div>

              {/* Expandable Full Answer */}
              <details className="bg-body-secondary p-3 rounded">
                <summary className="fw-semibold cursor-pointer" style={{ color: "rgb(110, 99, 197)" }}>
                  📖 Click to view full answer
                </summary>
                <p className="mt-3 text-dark">{res.answer}</p>
              </details>

              {/* Metadata */}
              <div className="mt-4 d-flex justify-content-between small text-muted">
                <span>
                  <i className="bi bi-eye me-1"></i> Views: {res.views}
                </span>
                <span>
                  <i className="bi bi-hand-thumbs-up me-1"></i> Upvotes:{" "}
                  {res.upvotes}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Answers;
