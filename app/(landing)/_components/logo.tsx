import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
	subsets: ["latin"],
	weight: ["400", "600"],
});

const Logo = () => {
	return (
		<div className="hidden md:flex items-center gap-x-4">
			<Image src="/logo.gif" height="60" width="60" alt="Logo" />
			<p className={cn("font-extrabold text-2xl", font.className)}>
				Weathery
			</p>
		</div>
	);
};

export default Logo;
