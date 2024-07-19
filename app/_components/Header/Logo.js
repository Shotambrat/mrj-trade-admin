import Image from "next/image";
import Link from "next/link";
import logo from "@/public/images/mrj-logo.png";

function Logo() {
  return (
    <Link href="/" className="h-full">
        <Image
          src={logo}
          width={300}
          height={300}
          alt="MRJ Logo"
          className="h-full w-auto"
        />
    </Link>
  );
}

export default Logo;
