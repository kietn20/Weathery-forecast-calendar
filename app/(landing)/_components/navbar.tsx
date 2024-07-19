"use client";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Logo from "./logo";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { Spinner } from "@/components/spinner";

export const Navbar = () => {
	// const { isAuthenticated, isLoading } = useConvexAuth();
	const { isSignedIn, isLoaded } = useUser();
	const scrolled = useScrollTop();

	return (
		// <div
		// 	className={cn(
		// 		"z-50 bg-background dark:bg-[#1F1F1F] fixed top-0 flex items-center w-full p-6",
		// 		scrolled && "border-b shadow-sm"
		// 	)}
		// >
		// 	<Logo />
		// 	<div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
		// 		{!isLoaded && <Spinner />}
		// 		{!isSignedIn && isLoaded && (
		// 			<>
		// 				<SignInButton mode="modal">
		// 					<Button variant="ghost" size="sm">
		// 						Log In
		// 					</Button>
		// 				</SignInButton>
		// 				<SignInButton mode="modal">
		// 					<Button size="sm">Try Weathery Free</Button>
		// 				</SignInButton>
		// 			</>
		// 		)}
		// 		{isSignedIn && isLoaded && (
		// 			<>
		// 				<Button variant="ghost" size="sm" asChild>
		// 					<Link href="/documents">Enter Weathery</Link>
		// 				</Button>
		// 				<UserButton afterSignOutUrl="/" />
		// 			</>
		// 		)}
		// 		<ModeToggle />
		// 	</div>
		// </div>
		<div className="w-full flex justify-between items-center p-6">
			<Logo />
			<div className="flex justify-between gap-x-3 pr-5">
				{!isLoaded && <Spinner size="lg" />}
				{!isSignedIn && isLoaded && (
					<>
						<SignInButton mode="modal">
							<Button
								variant="ghost"
								size="lg"
								className="hover:bg-lime-200 transition duration-300 ease-in-out border border-slate-400 hover:border-slate-600"
							>
								Log In
							</Button>
						</SignInButton>
						<SignInButton mode="modal">
							<Button size="lg">Try Weathery Free</Button>
						</SignInButton>
					</>
				)}
				{isSignedIn && isLoaded && (
					<>
						<Button
							variant="ghost"
							size="lg"
							asChild
							className=" hover:underline hover:border-slate-600 transition ease-in-out duration-300 hover:bg-violet-400 hover:text-white"
						>
							<Link href="/calendar">Enter Weathery</Link>
						</Button>
						<UserButton afterSignOutUrl="/" />
					</>
				)}
			</div>
		</div>
	);
};
