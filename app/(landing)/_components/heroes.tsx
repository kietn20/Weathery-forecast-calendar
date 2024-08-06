import Image from "next/image";
import Arrow45 from "./arrow31";
import { Calendar } from "./calendar";
import HeroTaskExample from "./hero-tasks-example";

export const Hero = () => {
	return (
		<div className="relative w-[500px] select-none">
			<Calendar
				mode="single"
				className="rounded-lg border scale-150 absolute left-32"
			/>
			<Image
				src="/arrow-31.svg"
				width={100}
				height={100}
				alt="arrow31"
				className="transform -scale-x-100 -rotate-45 absolute top-24 left-[500px]"
			/>
			<Image
				src="/hero-running.png"
				width={180}
				height={180}
				alt="arrow31"
				className="absolute rotate-[30deg] -top-12 left-[560px]"
			/>
			<Image
				src="/arrow-40.svg"
				width={70}
				height={70}
				alt="arrow40"
				className="rotate-45 absolute top-[400px] left-[120px]"
			/>
			<Image
				src="/hero-shopping.png"
				width={250}
				height={250}
				alt="arrow31"
				className="absolute -bottom-[70px] -left-36"
			/>
			<Image
				src="/arrow-45.svg"
				width={100}
				height={100}
				alt="arrow45"
				className="transform -scale-x-100 -rotate-[130deg] absolute -bottom-[20px] left-[450px]"
			/>
			<Image
				src="/hero-date.png"
				width={220}
				height={220}
				alt="arrow31"
				className="absolute -bottom-[70px] left-[550px] z-50"
			/>
			<div className="absolute top-[300px] left-[300px] ">
				<HeroTaskExample />
			</div>
		</div>
	);
};
