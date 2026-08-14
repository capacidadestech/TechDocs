import './ErrorMessage.css';

export function ErrorMessage({ error }) {
  return (
    <div className="error-message">
      <h2>¡Wubba Lubba Dub Dub - Error!</h2>
      <p>{error}</p>
    </div>
  );
}
