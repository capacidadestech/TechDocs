
export function Header() {
  return (
    <header className="w-[90%] max-w-[600px] rounded-[24px] border-[3px] border-[#f0e14a] bg-[linear-gradient(135deg,#00b0c8_0%,#97ce4c_100%)] px-12 py-10 text-center shadow-[0_15px_35px_rgba(151,206,76,0.4)] transition-transform duration-300 ease-in-out hover:-translate-y-[5px]">
      <h1 className="m-0 text-[2.5rem] font-extrabold uppercase tracking-[2px] text-white [text-shadow:3px_3px_0_#000]">
        Mi App de Rick and Morty
      </h1>
      <p className="mt-4 inline-block rounded-xl bg-white/70 px-4 py-2 text-[1.2rem] font-normal text-[#1a1a2e]">
        Encuentra el listado de personajes de la serie.
      </p>
    </header>
  );
}
