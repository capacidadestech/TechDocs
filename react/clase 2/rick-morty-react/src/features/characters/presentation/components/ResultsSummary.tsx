
interface ResultsSummaryProps {
  count: number
}

export function ResultsSummary({ count }: ResultsSummaryProps) {
  const resultText =
    count === 1 ? '1 personaje encontrado' : `${count} personajes encontrados`

  return (
    <p
      aria-live="polite"
      className="mt-8 text-center font-bold text-[#a9b1d6]"
    >
      {resultText}
    </p>
  )
}
