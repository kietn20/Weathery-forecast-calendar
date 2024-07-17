import Image from "next/image";
import { Footer } from "./_components/footer";
import Heading from "./_components/heading";
import { Hero } from "./_components/heroes";

export default function LandingPage() {
	return (
		<div className="flex justify-center relative">
			<Heading />
			<Hero />
			
		</div>
	);
}
