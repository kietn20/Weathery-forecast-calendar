"use client";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default function Heading() {
	const { isSignedIn, isLoaded } = useUser();
	return (
		<div className="max-w-[750px] space-y-4 bg-orange-100">
			<h1 className="text-6xl font-bold">
				A <span className="underline">monthly</span> calendar that helps
				you plan your life around the{" "}
				<span className="underline">weather</span>.
			</h1>
			<h3 className="text-base sm:text-xl md:text-2xl font-light">
				A calendar scheduling tool that embrace the changing elements of
				nature to allow you to fully plans your days around the weather.
			</h3>
			<br />
			{!isLoaded && <Spinner />}
			<div className="flex justify-center gap-x-8">
				{!isSignedIn && isLoaded && (
					<>
						<SignInButton mode="modal">
							<Button size="lg" className="w-52 h-16">
								Try Weathery Free
							</Button>
						</SignInButton>
					</>
				)}
				{isSignedIn && isLoaded && (
					<>
						<Button
							variant="default"
							size="lg"
							asChild
							className="bg-black hover:bg-neutral-800 w-52 h-16"
						>
							<Link href="/documents">Enter Weathery</Link>
						</Button>
					</>
				)}
				<div>
					<Button
						size="lg"
						className="w-52 h-16 hover:bg-lime-200 transition ease-in-out duration-300"
						variant="secondary"
					>
						Try Demo
					</Button>
				</div>
			</div>
			<br />
			<div className="flex justify-center">
				<Image src="/hero2.png" alt="hero" width={300} height={300} />
			</div>
		</div>
	);
}
