"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import LeftNavigation from "./_components/left-navigation";
import RightNavigation from "./_components/right-navigation";
import { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/UserContext";
import { UserProvider } from "@/hooks/UserContext";

const CalendarLayout = ({ children }: { children: React.ReactNode }) => {
	// const { userData, setUserData } = useUserContext();

	return (
		<UserProvider>
			<div className="flex">
				<LeftNavigation />
				<main className="w-screen h-screen overflow-hidden">
					{children}
				</main>
				<RightNavigation />
			</div>
		</UserProvider>
	);
};

export default CalendarLayout;
