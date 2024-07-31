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

// interface RightNavigationProps {
// 	setEvents: any;
// }

const RightNavigation = () => {
	const currentDate = new Date().toLocaleDateString("en-US", {
		weekday: "short",
		month: "long",
		day: "numeric",
	});

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
				<div className="flex flex-col bg-lime-0 w-full mt-5 justify-start items-start">
					<span className="font-medium text-sm">New Event</span>
					<form action="" className="mt-3">
						<input
							type="text"
							placeholder="Title"
							className="text-sm bg-[#F9F9F9] focus:bg-[#efefef] font-light p-2 rounded-md border border-[#F9F9F9] hover:border-[#efefef] hover:border-opacity-100"
						/>
						<div className="border-t-[1px] w-[100%] my-2" />
						<div className="flex justify-start items-center gap-x-3 mt-3">
							<div className="flex items-center">
								<div className="pr-2">
									<Clock className="w-4 h-4 opacity-50" />
								</div>
								<input
									type="text"
									placeholder={currentDate}
									className="text-xs bg-[#F9F9F9] focus:bg-[#efefef] font-light p-2 rounded-md border border-[#F9F9F9] hover:border-[#efefef] hover:border-opacity-100 w-24"
								/>
							</div>
							<input
								type="text"
								placeholder={currentDate}
								className="text-xs bg-[#F9F9F9] focus:bg-[#efefef] font-light p-2 rounded-md border border-[#F9F9F9] hover:border-[#efefef] hover:border-opacity-100 w-20"
							/>
						</div>
						<div className="flex items-center -ml-3 mt-3">
							<div className="flex items-center ">
								<Switch className="scale-50" />
							</div>
							<span className="text-xs font-light text-gray-400">
								All Day
							</span>
						</div>
						<div className="flex items-center mt-4 justify-start">
							<Select>
								<SelectTrigger className="w-full flex items-center text-xs bg-[#F9F9F9] focus:bg-[#efefef] text-gray-400">
									<Repeat className="w-4 h-4" />
									<SelectValue
										placeholder="Repeat"
										className="text-xs"
									/>
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{/* <SelectLabel>North America</SelectLabel> */}
										<SelectItem value="est">
											Everyday
										</SelectItem>
										<SelectItem value="cst">
											Every weekend day
										</SelectItem>
										<SelectItem value="mst">
											Every week
										</SelectItem>
										<SelectItem value="pst">
											Every 2 week
										</SelectItem>
										<SelectItem value="akst">
											Every month
										</SelectItem>
										<SelectItem value="hst">
											Every year
										</SelectItem>
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<div className="border-t-[1px] w-[100%] my-5" />
						<div className="text-xs bg-[#F9F9F9] focus:bg-[#efefef] font-light">
							<Textarea
								placeholder="description"
								className="bg-[#F9F9F9] border-hidden"
							/>
						</div>
					</form>
				</div>
			</div>
			<div className="w-[80%]">
				<Image
					alt="hero-reading"
					width={350}
					height={350}
					src={"/hero-reading.png"}
				/>
			</div>
		</div>
	);
};

export default RightNavigation;
