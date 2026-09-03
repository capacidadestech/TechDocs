
interface ErrorMessageProps {
  error: string
  onRetry: () => void
}

export function ErrorMessage({ error, onRetry }: ErrorMessageProps) {
  return (
    <div className="animate-shake-error mx-auto my-12 w-full max-w-[600px] rounded-2xl border-2 border-[#d63d2e] bg-[#24283b] px-8 py-12 text-center shadow-[0_0_20px_rgba(214,61,46,0.4)]">
      <h2 className="mb-4 text-[1.8rem] font-bold uppercase tracking-[1px] text-[#d63d2e]">
        ¡Wubba Lubba Dub Dub - Error!
      </h2>
      <p className="text-[1.2rem] font-bold text-[#a9b1d6]">{error}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-8 rounded-lg border-2 border-[#97ce4c] bg-[#1a1a2e] px-5 py-3 font-bold text-[#97ce4c] transition-colors hover:bg-[#97ce4c] hover:text-[#1a1a2e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#97ce4c]"
      >
        Reintentar consulta
      </button>
    </div>
  );
}
