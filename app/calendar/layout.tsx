"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import LeftNavigation from "./_components/left-navigation";
import RightNavigation from "./_components/right-navigation";
import { useEffect, useState } from "react";
import { getUserData } from "@/lib/actions/user.action";

const CalendarLayout = ({ children }: { children: React.ReactNode }) => {
	const { isSignedIn, isLoaded, user } = useUser();
	const [userData, setUserData] = useState({});

	useEffect(() => {
		const getData = async () => {
			const data = await getUserData(user?.publicMetadata.userId);
			// console.log(data[0]);
			setUserData(data[0]);
		};
		getData();
	}, [isSignedIn]);

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
			<LeftNavigation tags={userData?.tags}/>
			<main className="w-screen h-screen overflow-hidden">
				{children}
			</main>
			<RightNavigation />
		</div>
	);
};

export default CalendarLayout;
