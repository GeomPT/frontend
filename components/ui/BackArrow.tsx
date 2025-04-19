"use client";
import { useRouter } from "next/navigation";

type BackArrowProps = {
  href?: string; // Optional: direct parent route
  label?: string;
};

const BackArrow = ({ href, label = "Back" }: BackArrowProps) => {
  const router = useRouter();

  return (
    <button
      onClick={() => (href ? router.push(href) : router.back())}
      className="flex items-center text-sky-500 hover:text-sky-700 transition-colors"
      type="button"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-1"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-xl font-bold">{label}</span>
    </button>
  );
};

export default BackArrow;
