import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1E40AF] text-white py-4 px-6 md:px-8 flex items-center justify-center space-x-2">
      <span className="text-xl md:text-2xl font-bold text-center">
        Hecho con ❤️ por Ramiro
      </span>
      <Link href="https://github.com/ramiromarcosmorales" legacyBehavior>
        <a target="_blank" rel="noopener noreferrer">
          <svg
            className="w-6 h-6 ml-2"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.612-4.042-1.612-.546-1.387-1.333-1.757-1.333-1.757-1.089-.744.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.76-1.605-2.665-.305-5.466-1.332-5.466-5.931 0-1.31.469-2.381 1.235-3.221-.123-.303-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.005-.404 1.021.005 2.048.138 3.006.404 2.292-1.553 3.298-1.23 3.298-1.23.653 1.649.241 2.873.118 3.176.77.84 1.232 1.911 1.232 3.221 0 4.609-2.803 5.624-5.473 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.218.694.825.576C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
          </svg>
        </a>
      </Link>
    </footer>
  );
}
