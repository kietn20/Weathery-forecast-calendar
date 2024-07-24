"use client";

import { Calendar } from "@/components/ui/calendar";
import { FolderPlus } from "lucide-react";
import { useEffect, useState } from "react";
import Tag from "./tags";

interface LeftNavigationProps {
	data: {
		clerkId: string;
		username: string;
		email: string;
		firstName?: string;
		lastName?: string;
		events: [];
		tags: [];
	};
}

const LeftNavigation: React.FC<LeftNavigationProps> = ({ data }) => {
	// console.log("Data passed to LeftNavigation:", data); // Debugging log

	return (
		<div className="w-[300px] bg-[#F9F9F9] flex flex-col justify-start items-center pt-14">
			<div>
				<Calendar className="px-10" />
			</div>
			<div className="border-t-[1px] w-[90%] pt-2" />
			<div className="flex justify-between w-[80%] pt-2">
				<h1 className="text-xl">Tags</h1>
				<button>
					<FolderPlus />
				</button>
			</div>
			<div className="w-[70%]">
				{data.tags.map((tag: any) => (
					<Tag tagAttributes={tag} />
				))}
			</div>
		</div>
	);
};

export default LeftNavigation;
