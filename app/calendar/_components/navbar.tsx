"use client";

import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { Spinner } from "@/components/spinner";
import { usePathname } from "next/navigation";
import { MapPin } from "lucide-react";
import { useUserContext } from "@/hooks/UserContext";
import { updateCity } from "@/lib/actions/user.action";
import Logo from "@/app/(landing)/_components/logo";
import { Input } from "@/components/ui/input";

export const Navbar = () => {
	// const { isAuthenticated, isLoading } = useConvexAuth();
	const { isSignedIn, isLoaded } = useUser();
	const scrolled = useScrollTop();
	const pathname = usePathname();
	const { setUserData, city, setCity } = useUserContext();

	const debounce = (func: (...args: any[]) => void, wait: number) => {
		let timeout: NodeJS.Timeout;
		return (...args: any[]) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => func(...args), wait);
		};
	};

	const handleCityChange = debounce(async (event: any) => {
		console.log(event.target.value);
		setCity(event.target.value);
		const updatedUser = await updateCity(city);
		setUserData(updatedUser);
	}, 1000);

	return (
		<div>
			{pathname === "/" && (
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
			)}
			{pathname === "/calendar" && (
				<div className="flex justify-end p-3 gap-x-5 items-center">
					<div className="flex items-center border rounded-md group pl-2">
						<MapPin />
						<Input
							type="text"
							placeholder={city ? city : "Enter US City Name"}
							className="border-0"
							// value={city}
							onChange={handleCityChange}
						/>
					</div>
					<UserButton afterSignOutUrl="/" />
				</div>
			)}
		</div>
	);
};
