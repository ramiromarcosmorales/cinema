import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-[#1E40AF] text-white py-4 px-6 md:px-8 flex items-center justify-between">
      <Link href="/" className="flex items-center space-x-2" prefetch={false}>
        <FilmIcon className="h-6 w-6" />
        <span className="text-2xl font-bold">Cinematica</span>
      </Link>
      <nav className="hidden md:flex items-center space-x-6">
        <Link href="/" className="hover:underline" prefetch={false}>
          Inicio
        </Link>
      </nav>
      <button variant="outline" className="md:hidden">
        <MenuIcon className="h-6 w-6" />
      </button>
    </header>
  );
}

function FilmIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <path d="M7 3v18" />
      <path d="M3 7.5h4" />
      <path d="M3 12h18" />
      <path d="M3 16.5h4" />
      <path d="M17 3v18" />
      <path d="M17 7.5h4" />
      <path d="M17 16.5h4" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
