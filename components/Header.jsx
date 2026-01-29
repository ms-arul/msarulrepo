import Link from "next/link";
import Socials from "../components/Socials";

const Header = () => {
  return (
    <header
      className="
        fixed lg:absolute top-0 z-30 w-full
        px-4 sm:px-8 xl:px-0
        backdrop-blur-md bg-black/40
        lg:bg-transparent
      "
    >
      <div className="container mx-auto">
        <div
          className="
            flex flex-row lg:flex-row
            justify-between items-center
            h-[64px] lg:h-[90px]
          "
        >
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="w-[180px] sm:w-[220px] lg:w-[260px]">
              <svg
                width="100%"
                height="40"
                viewBox="0 0 260 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="select-none"
              >
                <text
                  x="0"
                  y="27"
                  fill="white"
                  fontSize="26"
                  fontFamily="Poppins, Montserrat, Arial, sans-serif"
                  fontWeight="700"
                  letterSpacing="3"
                >
                  ARUL PRAKASH
                </text>
              </svg>
            </div>
          </Link>

          {/* Social Icons */}
          <div className="flex items-center">
            <Socials />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
