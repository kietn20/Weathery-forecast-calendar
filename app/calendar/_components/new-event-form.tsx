import {
	BadgePlus,
	CalendarIcon,
	CircleArrowRight,
	Clock,
	Repeat,
	User,
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
import { DropArg } from "@fullcalendar/interaction/index.js";

const NewEventForm = () => {
	const { userData, setUserData, newEvent, setNewEvent } = useUserContext();

	const handleSubmit = (event: any) => {
		event.preventDefault();
		setUserData((prevUserData: any) => ({
			...prevUserData,
			events: [...prevUserData?.events, newEvent],
		}));
		setNewEvent({
			title: "",
			start: "",
			end: "",
			allDay: true,
			repeat: "",
			tag: "",
			description: "",
		});
		console.log("done submit");
	};

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewEvent({ ...newEvent, title: event.target.value });
	};

	return (
		<div className="flex flex-col bg-lime-0 w-full mt-5 justify-start items-start">
			<span className="font-medium text-sm">New Event</span>
			<form action="" className="mt-3 relative" onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="Title"
					className="text-sm bg-[#F9F9F9] focus:bg-[#efefef] font-light p-2 rounded-md border border-[#F9F9F9] hover:border-[#d5d5d5] hover:border-opacity-100 duration-150"
					onChange={(event) => handleTitleChange(event)}
					required
				/>
				<div className="border-t-[1px] w-[100%] my-2" />
				<div className="flex justify-start items-center gap-x-2 mt-3">
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"justify-start text-left text-xs bg-[#F9F9F9] focus:bg-[#efefef] font-light p-1 rounded-md border border-[#F9F9F9] hover:border-[#efefef] hover:border-opacity-100 w-28 hover:text-gray-500 -ml-2 group",
									!newEvent.start && "text-muted-foreground"
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4 text-gray-400 group-hover:text-gray-500 duration-100" />
								{newEvent.start ? (
									<span className="ml-2 text-gray-400 group-hover:text-gray-500 duration-100">
										{format(newEvent.start, "E MMM d")}
										{/* {JSON.stringify(newEvent.start)} */}
										{/* {newEvent.start
											.toLocaleDateString("en-US", {
												weekday: "short", // Day name (e.g., Monday)
												month: "short", // Abbreviated month (e.g., Jan)
												day: "numeric", // Day number (e.g., 1)
											})
											.replace(/,/g, "")} */}
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
								selected={newEvent.start}
								onSelect={(selectedStartDate) =>
									setNewEvent({
										...newEvent,
										start: selectedStartDate,
									})
								}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"justify-center text-left text-xs bg-[#F9F9F9] focus:bg-[#efefef] font-light p-1 rounded-md border border-[#F9F9F9] hover:border-[#efefef] hover:border-opacity-100 w-24 hover:text-gray-500 group",
									!newEvent.end && "text-muted-foreground"
								)}
								disabled={newEvent.allDay}
							>
								{newEvent.end ? (
									<span className=" text-gray-400 group-hover:text-gray-500 duration-100">
										{format(newEvent.end, "E MMM d")}
									</span>
								) : (
									<span
										className={`text-gray-400 group-hover:text-gray-500 duration-100 ${
											newEvent.allDay && `line-through`
										}`}
									>
										End Date
									</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={newEvent.end}
								onSelect={(selectedEndDate) =>
									setNewEvent({
										...newEvent,
										end: selectedEndDate,
									})
								}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</div>
				<div className="flex items-center -ml-3 mt-3 group">
					<div className="flex items-center ">
						<Switch
							className="scale-50"
							checked={newEvent.allDay}
							onCheckedChange={() => {
								setNewEvent({
									...newEvent,
									allDay: !newEvent.allDay,
									end: "",
								});
							}}
						/>
					</div>
					<span className="text-xs font-light text-gray-400 group-hover:text-gray-500 duration-100">
						All Day
					</span>
				</div>
				<div className="flex items-center mt-4 justify-start group">
					<Select
						onValueChange={(selectedRepeatOption) =>
							setNewEvent({
								...newEvent,
								repeat: selectedRepeatOption,
							})
						}
					>
						<SelectTrigger className="w-full flex items-center text-xs bg-[#F9F9F9] focus:bg-[#efefef] text-gray-400 group-hover:text-gray-500 duration-300 hover:border-[#939393] focus:border-hidden">
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
								<SelectItem value="everyday">Daily</SelectItem>
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
				<div className="flex items-center my-4 justify-start group">
					<Select
						defaultValue={userData.tags[0].title}
						onValueChange={(selectedTag) =>
							setNewEvent({ ...newEvent, tag: selectedTag })
						}
					>
						<SelectTrigger className="w-full flex justify-between items-center text-xs bg-[#F9F9F9] focus:bg-[#efefef] text-gray-400 group-hover:text-gray-500 duration-300 hover:border-[#939393] focus:border-hidden">
							<div className="w-full flex gap-x-3 items-center">
								<User className="w-[14px] h-[14px]" />
								<SelectValue placeholder="Tag" />
							</div>
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{userData?.tags.map((tag: any) => (
									<SelectItem key={tag._id} value={tag.title}>
										<span className={`text-[${tag.color}]`}>
											{tag.title}
										</span>
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				{/* <div className="border-t-[1px] w-[100%] my-5" /> */}
				<div className="text-xs border-[#9ca3af] focus:bg-[#efefef] font-light group">
					<Textarea
						placeholder="description"
						value={newEvent.description}
						className="bg-[#F9F9F9] hover:border-[#939393] resize-none focus:border-hidden truncate text-gray-400 group-hover:text-gray-900 duration-200"
						spellCheck={false}
						onChange={(event) =>
							setNewEvent({
								...newEvent,
								description: event.target.value,
							})
						}
					/>
				</div>
				<button className="relative inline-block text-sm group my-5">
					<span className="relative z-10 block px-16 py-1 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
						<span className="absolute inset-0 w-full h-full px-5 py-3 rounded-lg bg-gray-50"></span>
						<span className="absolute left-0 w-[110%] h-48 -ml-2 transition-all duration-500 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease rounded-3xl"></span>
						<span className="relative">Create Event</span>
					</span>
				</button>
			</form>
		</div>
	);
};

export default NewEventForm;
