"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
	Draggable,
	DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { Navbar } from "@/components/navbar";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { useUserContext } from "@/hooks/UserContext";
import LeftNavigation from "./_components/left-navigation";
import RightNavigation from "./_components/right-navigation";
import { addEventToDB } from "@/lib/actions/user.action";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { DayCellContentArg, EventClickArg } from "@fullcalendar/core/index.js";

const CalendarPage = () => {
	const { user } = useUser();
	const {
		userData,
		setUserData,
		newEvent,
		setNewEvent,
		forecast,
		setForecast,
	} = useUserContext();
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [selectedEvent, setSetselectedEvent] = useState<any>(null);
	const data = [
		{
			goal: 400,
		},
		{
			goal: 300,
		},
		{
			goal: 200,
		},
		{
			goal: 300,
		},
		{
			goal: 200,
		},
		{
			goal: 278,
		},
		{
			goal: 189,
		},
		{
			goal: 239,
		},
		{
			goal: 300,
		},
		{
			goal: 200,
		},
		{
			goal: 278,
		},
		{
			goal: 189,
		},
		{
			goal: 349,
		},
	];
	// useEffect(() => {
	// 	console.log(user);
	// 	console.log(user?.publicMetadata.userId)
	// }, []);
	const [allEvents, setAllEvents] = useState<any[]>([]);

	const addEvent = async (data: DropArg) => {
		const event = {
			...newEvent,
			start: data.date.toDateString(),
			title: data.draggedEl.innerText,
			allDay: data.allDay,
		};
		setAllEvents([...allEvents, event]);
		const updatedUser = await addEventToDB(event);
		setUserData(updatedUser);
	};

	const handleEventClick = (clickInfo: EventClickArg) => {
		setSetselectedEvent(clickInfo.event);
		setIsDrawerOpen(true);
	};

	const handleDayCellDidMount = (arg: DayCellContentArg) => {
		const dayElement = arg.el;
		const date = arg.date;

		dayElement.style.backgroundImage = "url(/cloudy.png)";

		dayElement.style.backgroundSize = "contain";
		dayElement.style.backgroundRepeat = "no-repeat";
	};

	return (
		<div className="flex flex-col w-[1350px]  h-screen">
			<Navbar />
			{/* {JSON.stringify(userData.events)} */}
			{/* {JSON.stringify(newEvent.start)} */}
			{/* <span>
					--------------------------------------------------------------------------------------------
				</span> */}
			{/* {JSON.stringify(newEvent)} */}
			{JSON.stringify(forecast)}
			<div className="h-full pt-5 px-2">
				<FullCalendar
					plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
					headerToolbar={{
						left: "title",
						center: "",
						right: "dayGridMonth,timeGridWeek,prev,next,today",
					}}
					height="auto"
					handleWindowResize={true}
					expandRows={false}
					events={userData?.events}
					nowIndicator={true}
					editable={true}
					droppable={true}
					selectable={true}
					selectMirror={true}
					dateClick={(selectedDate) => {
						setNewEvent({
							...newEvent,
							start: selectedDate.date,
						});
					}}
					drop={(data) => addEvent(data)}
					eventClick={handleEventClick}
					dayMaxEventRows={4}
					eventBorderColor="#555555"
					dayCellDidMount={handleDayCellDidMount}
				/>
			</div>

			{selectedEvent && (
				<Drawer
					open={isDrawerOpen}
					onClose={() => setIsDrawerOpen(false)}
				>
					<DrawerContent>
						<div className="mx-auto w-full max-w-sm">
							<DrawerHeader>
								{JSON.stringify(selectedEvent)}
								<DrawerTitle>{selectedEvent.title}</DrawerTitle>
								<DrawerDescription>
									{selectedEvent.description
										? selectedEvent.description
										: "No Description"}
								</DrawerDescription>
							</DrawerHeader>
							<div className="p-4 pb-0">
								<div className="mt-3 h-[120px]">
									<ResponsiveContainer
										width="100%"
										height="100%"
									>
										<BarChart data={data}>
											<Bar
												dataKey="goal"
												style={
													{
														fill: "hsl(var(--foreground))",
														opacity: 0.9,
													} as React.CSSProperties
												}
											/>
										</BarChart>
									</ResponsiveContainer>
								</div>
							</div>
							<DrawerFooter>
								<Button>Submit</Button>
								<DrawerClose
									asChild
									onClick={() => {
										setIsDrawerOpen(false);
										setSetselectedEvent(null);
									}}
								>
									<Button variant="outline">Close</Button>
								</DrawerClose>
							</DrawerFooter>
						</div>
					</DrawerContent>
				</Drawer>
			)}
		</div>
	);
};

export default CalendarPage;
