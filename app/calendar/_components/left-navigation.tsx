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
		<div className="flex flex-col justify-between w-[300px] bg-[#F9F9F9] items-center">
			<div className="flex flex-col justify-start items-center pt-14">
				<div>
					<Calendar className="px-10" />
				</div>
				<div className="border-t-[1px] w-[90%] pt-2" />
				<div className="flex justify-between items-center w-[70%] py-1 bg-red-0">
					<h1 className="text-xl">Tags</h1>
					<button className="hover:bg-slate-200 p-1 rounded-sm duration-100 transition ease-in">
						<FolderPlus />
					</button>
				</div>
				<div className="w-[75%] pl-5">
					{data.tags.map((tag: any) => (
						<Tag key={tag.title} tagAttributes={tag} />
					))}
				</div>
			</div>
			<div className="w-[80%] flex flex-col bg-purple-0 justify-center text-gray-700 py-7">
				<h1 className="text-xl text-black font-semibold">Navigation</h1>
				<div className="flex justify-between bg-red-0 items-center py-1 opacity-60">
					<h3 className="font-medium">Month</h3>
					<span className="w-5 h-5 bg-gray-300 flex justify-center items-center rounded-sm opacity-70 text-xs font-bold p-1">
						M
					</span>
				</div>
				<div className="flex justify-between items-center py-1 opacity-60">
					<h3 className="font-medium">Week</h3>
					<span className="w-5 h-5 bg-gray-300 flex justify-center items-center rounded-sm opacity-70 text-xs font-bold p-1">
						W
					</span>
				</div>
				<div className="flex justify-between items-center py-1 opacity-60">
					<h3 className="font-medium">Day</h3>
					<span className="w-5 h-5 bg-gray-300 flex justify-center items-center rounded-sm opacity-70 text-xs font-bold p-1">
						D
					</span>
				</div>
				<h1 className="text-xl text-black font-semibold pt-5">
					Useful Shortcuts
				</h1>
				<div className="flex justify-between bg-red-0 items-center py-1 opacity-60">
					<h3 className="font-medium">Command Menu</h3>
					<div className="flex justify-between gap-1">
						<span className="w-auto h-auto p-1 bg-gray-300 flex justify-center items-center rounded-sm opacity-70 text-xs font-bold">
							CRTL
						</span>
						<span className="w-auto h-auto p-1 bg-gray-300 flex justify-center items-center rounded-sm opacity-70 text-xs font-bold">
							K
						</span>
					</div>
				</div>
				<div className="flex justify-between items-center py-1 opacity-60">
					<h3 className="font-medium">Toggle Menu Bar Calendar</h3>
					<span className="w-5 h-5 bg-gray-300 flex justify-center items-center rounded-sm opacity-70 text-lg font-bold p-1">
						`
					</span>
				</div>
				<div className="flex justify-between bg-slate-0 items-center py-1 opacity-60">
					<h3 className="font-medium">Go to Date</h3>
					<span className="w-5 h-5 bg-gray-300 flex justify-center items-center rounded-sm opacity-70 text-lg font-bold p-1">
						.
					</span>
				</div>
			</div>
		</div>
	);
};

export default LeftNavigation;
