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
import { useUserContext } from "@/hooks/UserContext";
import { Draggable } from "@fullcalendar/interaction/index.js";

// interface RightNavigationProps {
// 	setEvents: any;
// }

const RightNavigation = () => {
	// const currentDate = new Date().toLocaleDateString("en-US", {
	// 	weekday: "short",
	// 	month: "long",
	// 	day: "numeric",
	// });
	const { userData, setUserData } = useUserContext();

	useEffect(() => {
		let draggableEl = document.getElementById("draggable-el");
		if (draggableEl) {
			new Draggable(draggableEl, {
				itemSelector: ".fc-event",
				eventData: function (eventEl) {
					let title = eventEl.getAttribute("title");
					let id = eventEl.getAttribute("data");
					let start = eventEl.getAttribute("start");
					return { title, id, start };
				},
			});
		}
	}, []);

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
				<div className="border-t-[1px] w-[100%]" />
			</div>

			<div className="w-full h-96 flex flex-col justify-start items-center p-2 border-2 border-dashed rounded-md">
				<span className="text-sm text-gray-400 pb-2">
					Draggable Events
				</span>
				<div
					id="draggable-el"
					className="flex flex-wrap justify-center items-center "
				>
					{userData?.events
						.filter((event: any) => event.start == "")
						.map((event: any) => (
							<div
								className="fc-event border p-2 rounded-md bg-slate-200 m-1"
								title={event.title}
								key={event._id}
							>
								{event.title}
							</div>
						))}
				</div>
				{/* <Image
					alt="hero-reading"
					width={100}
					height={100}
					src={"/hero-reading.png"}
				/> */}
			</div>
		</div>
	);
};

export default RightNavigation;
