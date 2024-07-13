import Image from "next/image";
import Arrow45 from "./arrow";
import { Calendar } from "./calendar";

export const Hero = () => {
	return (
		<div className="relative w-[664px] bg-rose-100">
			<Calendar mode="single" className="rounded-lg border scale-125 absolute -top-10" />
			<Arrow45 className="rotate-90 absolute top-36 left-96" />
			<div className="w-96 h-96  absolute top-60 left-32">
				<Image src="/hero1.png" alt="hero" fill />
			</div>
		</div>
	);
};
