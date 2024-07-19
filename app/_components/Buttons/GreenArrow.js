export default function GreenArrow({ title }) {
  return (
    <button className="flex items-center gap-2 transition-all duration-200 hover:gap-4">
      <p className="text-greenView whitespace-nowrap font-bold">{title}</p>
      <svg
        className="w-3 h-3"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M8.46875 1.375L14.0937 7L8.46875 12.625M13.3125 7L1.90625 7"
          stroke="#088133"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>
  );
}
