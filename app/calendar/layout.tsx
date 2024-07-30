"use client";

import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { redirect } from "next/navigation";
import LeftNavigation from "./_components/left-navigation";
import RightNavigation from "./_components/right-navigation";
import { useEffect, useState } from "react";

const CalendarLayout = ({ children }: { children: React.ReactNode }) => {
	const { isSignedIn, isLoaded, user } = useUser();
	const [loading, setLoading] = useState(true);
	const [userData, setUserData] = useState(null);
	const [events, setEvents] = useState([
		{ id: "a", title: "my event", start: "2024-07-29" },
	]);

	useEffect(() => {
		if (!isLoaded) {
			return;
		}

		if (!isSignedIn) {
			redirect("/");
			return;
		}

		const fetchUserFromApi = async () => {
			try {
				const response = await fetch("/api/data", {
					headers: {
						Accept: "application/json",
						method: "GET",
					},
				});

				if (response.ok) {
					const data = await response.json();
					// console.log("Fetched user data:", data); // Debugging log
					setUserData(data);
				}
			} catch (error) {
				console.log(error);
			} finally {
				setLoading(false);
			}
		};

		fetchUserFromApi();
	}, [isLoaded, isSignedIn]);

	if (loading) {
		return (
			<div className="h-screen flex flex-col justify-center items-center">
				<Image
					src="/hero-tired.gif"
					width={300}
					height={300}
					alt="calendar-page-loading-gif"
				/>
				<span className="text-3xl opacity-60 blink_me italic">
					Loading Calendar
				</span>
			</div>
		);
	}

	return (
		<div className="flex">
			{userData && (
				<LeftNavigation data={userData} setUserData={setUserData} />
			)}
			<main className="w-screen h-screen overflow-hidden">
				{children}
			</main>
			<RightNavigation setEvents={setEvents} />
		</div>
	);
};

export default CalendarLayout;
