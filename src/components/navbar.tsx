import Link from "next/link";
import ThemeSwitch from "./theme-switch";

export default function Navbar() {
  return (
    <header>
      <div className="absolute top-0 right-0 left-0 -z-50 mx-auto blur-[250px]">
        <span
          className="absolute top-0 right-0 left-0 m-0 mx-auto h-[25vh] w-[90vw] bg-[#1D1EF0] p-0 transition-all sm:h-[15vh] md:h-[10vh] md:w-[80vw] dark:bg-[#6964ED]/80"
          style={{
            clipPath: "polygon(0% 51%, 50% 0%, 100% 51%, 100% 100%, 0% 100%)",
          }}
        />
      </div>
      <div className="flex items-center justify-between py-6 transition-all">
        <Link href="/" className="font-mono">
          hexaa
        </Link>
        <div className="flex">
          <ThemeSwitch />
        </div>
      </div>
    </header>
  );
}
