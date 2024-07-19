"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import LeftNavigation from "./_components/left-navigation";
import RightNavigation from "./_components/right-navigation";

const CalendarLayout = ({ children }: { children: React.ReactNode }) => {
	const { isSignedIn, isLoaded } = useUser();

	if (!isLoaded) {
		return (
			<div className="h-screen flex flex-col justify-center items-center">
				<Image
					src="/hero-tired.gif"
					width={300}
					height={300}
					alt="calendar-page-loading-gif"
				/>
				<span className="text-3xl opacity-60 blink_me italic">
					Loading
				</span>
			</div>
		);
	}

	if (!isSignedIn) {
		return redirect("/");
	}

	return (
		<div className="flex">
            <LeftNavigation />
			<main className="w-full h-screen bg-orange-100">{children}</main>
            <RightNavigation />
		</div>
	);
};

export default CalendarLayout;
