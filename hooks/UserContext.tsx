"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Image from "next/image";

interface UserData {
	clerkId: string;
	username: string;
	email: string;
	firstName?: string;
	lastName?: string;
	events: [];
	tags: [];
}

interface INewEvent {
	title: string;
	start: Date | string;
	end: Date | string;
	allDay: boolean;
	repeat: string;
	backgroundColor: string;
	description: string;
}

interface UserContextType {
	userData: UserData | any;
	setUserData: React.Dispatch<React.SetStateAction<UserData | any>>;
	newEvent: INewEvent | any;
	setNewEvent: React.Dispatch<React.SetStateAction<INewEvent | any>>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
	const { isSignedIn, isLoaded, user } = useUser();
	const [userData, setUserData] = useState<UserData | any>(null);
	const [loading, setLoading] = useState(true);
	const [newEvent, setNewEvent] = useState({
		title: "",
		start: "",
		end: "",
		allDay: true,
		repeat: "",
		backgroundColor: "",
		description: "",
	});

	useEffect(() => {
		if (!isLoaded) return;
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
					unoptimized
				/>
				<span className="text-3xl opacity-60 blink_me italic">
					Loading Calendar
				</span>
			</div>
		);
	}

	return (
		<UserContext.Provider
			value={{ userData, setUserData, newEvent, setNewEvent }}
		>
			{children}
		</UserContext.Provider>
	);
};

export const useUserContext = () => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUserContext must be used within a UserProvider");
	}
	return context;
};
