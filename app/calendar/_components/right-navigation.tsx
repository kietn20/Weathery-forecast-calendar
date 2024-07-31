import { Navbar } from "@/components/navbar";
import { Switch } from "@/components/ui/switch";
import { CircleArrowRight, Clock, Repeat } from "lucide-react";
import { useEffect, useRef } from "react";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import NewEventForm from "./new-event-form";

// interface RightNavigationProps {
// 	setEvents: any;
// }

const RightNavigation = () => {
	// const currentDate = new Date().toLocaleDateString("en-US", {
	// 	weekday: "short",
	// 	month: "long",
	// 	day: "numeric",
	// });

	return (
		<div className="h-screen w-[300px] bg-[#F9F9F9] flex flex-col justify-between items-center p-3">
			<div className="flex flex-col items-center">
				<div className="flex flex-col gap-y-2">
					<div className="bg-[#3181AE] rounded-sm p-2 w-[218px] h-[51px] flex justify-center items-center gap-x-5 relative">
						<div className="rounded-full bg-green-500 w-5 h-5 absolute left-4" />
						<div className="flex flex-col justify-center items-center text-white w-[90%]">
							<span className="font-semibold text-sm">
								Current Task
							</span>
							<span className="font-light text-sm">
								Work on Project
							</span>
						</div>
					</div>
					<div className="bg-[#9AA8AF] rounded-sm p-2 w-[218px] h-[51px] flex justify-center items-center gap-x-5 relative">
						<div className="text-blue-700 rounded-full w-5 h-5 absolute left-4">
							<CircleArrowRight />
						</div>
						<div className="flex flex-col justify-center items-center text-white w-[90%]">
							<span className="font-semibold text-sm">
								Upcoming Task
							</span>
							<span className="font-light text-sm">
								Evening Run
							</span>
						</div>
					</div>
				</div>
				<NewEventForm />
				<div className="border-t-[1px] w-[100%] my-5" />
			</div>

			<div className="w-[80%] flex justify-center">
				<div>
					
				</div>
				<Image
					alt="hero-reading"
					width={100}
					height={100}
					src={"/hero-reading.png"}
				/>
			</div>
		</div>
	);
};

export default RightNavigation;
