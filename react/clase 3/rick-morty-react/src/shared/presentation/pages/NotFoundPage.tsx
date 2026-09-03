import { Link } from 'react-router-dom'
import { Header } from '../../components/Header/Header'

export function NotFoundPage() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#1a1a2e] px-4 py-12 font-[Nunito,sans-serif]">
      <Header />
      <section className="mx-auto my-12 w-full max-w-2xl rounded-2xl border-2 border-dashed border-[#00b0c8] bg-[#24283b] px-8 py-16 text-center text-[#a9b1d6]">
        <p className="text-6xl font-extrabold text-[#97ce4c]">404</p>
        <h1 className="mt-4 text-3xl font-extrabold text-white">Portal no encontrado</h1>
        <p className="mt-4 text-lg">Esta dimensión no existe o el enlace cambió de universo.</p>
        <Link
          to="/"
          className="mt-8 inline-block rounded-lg border-2 border-[#97ce4c] px-5 py-3 font-bold text-[#97ce4c] transition-colors hover:bg-[#97ce4c] hover:text-[#1a1a2e]"
        >
          Ir al catálogo
        </Link>
      </section>
    </main>
  )
}
