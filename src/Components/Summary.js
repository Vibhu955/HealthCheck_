import React, { useRef, useEffect, useState } from "react";

const Summary = ({ summary }) => {
  const toastRef = useRef(null);
  const toastInstanceRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let toast;
    import("bootstrap/dist/js/bootstrap.bundle.min.js").then(({ Toast }) => {
      if (toastRef.current && !toastInstanceRef.current) {
        toast = new Toast(toastRef.current, {
          autohide: false,
          delay: 9999999, // Just in case
        });
        toastInstanceRef.current = toast;

        toastRef.current.addEventListener("hidden.bs.toast", () => {
          setIsVisible(false);
        });
      }
    });
  }, []);

  const showToast = () => {
    if (toastInstanceRef.current) {
      toastInstanceRef.current.show();
      setIsVisible(true);
    }
  };

  return (
    <>
      {!isVisible && (
        <button
          onClick={showToast}
          className="btn btn-primary mb-3"
          style={{
            position: "fixed",
            bottom: "90px",
            right: "30px",
            zIndex: 1050,
            backgroundColor: "rgb(110, 99, 197)",
            borderColor: "rgb(110, 99, 197)"
          }}
        >
          Show Summary
        </button>
      )}

      <div className="toast-container position-fixed bottom-0 end-0 p-3">
        <div
          ref={toastRef}
          className="toast"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          style={{ minWidth: "25vw" }}
        >
          <div className="toast-header">
            <span className="rounded me-2">
              <i className="bi bi-quote text-secondary me-1"></i>
            </span>
            <strong className="me-auto" style={{ color: "rgb(110, 99, 197)" }}>
              Summary
            </strong>
            <small className="text-muted">Just now</small>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
            ></button>
          </div>
          <div
            className="toast-body"
            style={{
              fontSize: "1.1rem",
              padding: "1rem",
              lineHeight: "1.6",
              color: "#333"
            }}
          >
            {summary}
          </div>
        </div>
      </div>
    </>
  );
};

export default Summary;
