"use client";

import { Calendar } from "@/components/ui/calendar";
import { FolderPlus } from "lucide-react";
import { useEffect, useState } from "react";

// interface LeftNavigationProps {
// 	tags?: [];
// }

const LeftNavigation = (userData : any) => {
	const [tags, setTags] = useState([])
	useEffect(() => {
		console.log("tags:");
		console.log(userData);
		setTags(userData.tags)
	}, [userData]);
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
			<div>
				{tags?.map((tag : any) => (
					<div>
						<div>{tag.title}</div>
						<div>{tag.color}</div>
					</div>
				))}
				<div className="w-5 h-5 border border-black"></div>
			</div>
		</div>
	);
};

export default LeftNavigation;
