import {
	BadgePlus,
	CalendarIcon,
	CircleArrowRight,
	Clock,
	Repeat,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";

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
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useUserContext } from "@/hooks/UserContext";

const NewEventForm = () => {
	// const currentDate = new Date().toLocaleDateString("en-US", {
	// 	weekday: "short",
	// 	month: "long",
	// 	day: "numeric",
	// });
	const { userData, setUserData } = useUserContext();

	const [startDate, setStartDate] = useState<Date>();
	const [endDate, setEndDate] = useState<Date>();
	const [allDay, setAllDay] = useState(true);
	const [repeatOption, setRepeatOption] = useState("");
	const [description, setDescription] = useState("");
	const [owner, setOwner] = useState(userData?.tags[0]["title"] || '');

	return (
		<div className="flex flex-col bg-lime-0 w-full mt-5 justify-start items-start">
			<span className="font-medium text-sm">New Event</span>
			{JSON.stringify(owner)}
			<form action="" className="mt-3">
				<input
					type="text"
					placeholder="Title"
					className="text-sm bg-[#F9F9F9] focus:bg-[#efefef] font-light p-2 rounded-md border border-[#F9F9F9] hover:border-[#ebebeb] hover:border-opacity-100 duration-150"
				/>
				<div className="border-t-[1px] w-[100%] my-2" />
				<div className="flex justify-start items-center gap-x-2 mt-3">
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"justify-start text-left text-xs bg-[#F9F9F9] focus:bg-[#efefef] font-light p-1 rounded-md border border-[#F9F9F9] hover:border-[#efefef] hover:border-opacity-100 w-28 p-2 hover:text-gray-500 -ml-2 group",
									!startDate && "text-muted-foreground"
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 duration-100" />
								{startDate ? (
									<span className="ml-2 text-gray-400 group-hover:text-gray-500 duration-100">
										{format(startDate, "E MMM d")}
									</span>
								) : (
									<span className="ml-2 text-gray-400 group-hover:text-gray-500 duration-100">
										Start Date
									</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={startDate}
								onSelect={setStartDate}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"justify-center text-left text-xs bg-[#F9F9F9] focus:bg-[#efefef] font-light p-1 rounded-md border border-[#F9F9F9] hover:border-[#efefef] hover:border-opacity-100 w-24 p-2 hover:text-gray-500 group",
									!startDate && "text-muted-foreground"
								)}
								disabled={allDay}
							>
								{endDate ? (
									<span className=" text-gray-400 group-hover:text-gray-500 duration-100">
										{format(endDate, "E MMM d")}
									</span>
								) : (
									<span className="text-gray-400 group-hover:text-gray-500 duration-100">
										End Date
									</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={endDate}
								onSelect={setEndDate}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</div>
				<div className="flex items-center -ml-3 mt-3 group">
					<div className="flex items-center ">
						<Switch
							className="scale-50"
							checked={allDay}
							onCheckedChange={() => setAllDay(!allDay)}
						/>
					</div>
					<span className="text-xs font-light text-gray-400 group-hover:text-gray-500 duration-100">
						All Day
					</span>
				</div>
				<div className="flex items-center mt-4 justify-start group">
					<Select onValueChange={setRepeatOption}>
						<SelectTrigger className="w-full flex items-center text-xs bg-[#F9F9F9] focus:bg-[#efefef] text-gray-400 group-hover:text-gray-500 duration-100">
							<div className="w-full flex gap-x-3 items-center">
								<Repeat className="w-[14px] h-[14px]" />
								<SelectValue
									placeholder="Repeat"
									className=""
								/>
							</div>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="everyday">
									Everyday
								</SelectItem>
								<SelectItem value="every-weekend">
									Every weekend day
								</SelectItem>
								<SelectItem value="every-week">
									Every week
								</SelectItem>
								<SelectItem value="every-2-week">
									Every 2 week
								</SelectItem>
								<SelectItem value="every-month">
									Every month
								</SelectItem>
								<SelectItem value="every-year">
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
						className="bg-[#F9F9F9] border border-[#F9F9F9] hover:border-[#d5d5d5] hover:border-opacity-100 resize-none focus:border-opacity-0"
						onChange={(event) => setDescription(event.target.value)}
					/>
				</div>
				<div className="flex items-center my-4 justify-start group">
					<Select value="" onValueChange={setRepeatOption}>
						<SelectTrigger className="w-full flex justify-between items-center text-xs bg-[#F9F9F9] focus:bg-[#efefef] text-gray-400 group-hover:text-gray-500 duration-100">
							<div className="w-full flex gap-x-3 items-center">
								<Repeat className="w-[14px] h-[14px]" />
								<SelectValue placeholder="Owner" className="" />
							</div>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value="everyday">
									Everyday
								</SelectItem>
								<SelectItem value="every-weekend">
									Every weekend day
								</SelectItem>
								<SelectItem value="every-week">
									Every week
								</SelectItem>
								<SelectItem value="every-2-week">
									Every 2 week
								</SelectItem>
								<SelectItem value="every-month">
									Every month
								</SelectItem>
								<SelectItem value="every-year">
									Every year
								</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				{/* <div className="bg-red-50 flex justify-center">
					<button>
						<BadgePlus />
					</button>
				</div> */}
			</form>
		</div>
	);
};

export default NewEventForm;
