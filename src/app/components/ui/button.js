export default function Button({ children, className, ...props }) {
  return (
    <button
      className={`px-4 py-2 font-bold text-white bg-blue-500 rounded ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
