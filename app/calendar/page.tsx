"use client";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
	Draggable,
	DropArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
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
import { Navbar } from "./_components/navbar";

const CalendarPage = () => {
	const OpenweatherAPIKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
	const { user } = useUser();
	const {
		userData,
		setUserData,
		newEvent,
		setNewEvent,
		forecast,
		setForecast,
		tagsHidden,
		// loading,
		// setLoading,
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
	const [loading, setLoading] = useState(true);

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

	useEffect(() => {
		const fetchWeatherFromApi = async () => {
			try {
				// setLoading(true);
				const response = await fetch(
					`https://pro.openweathermap.org/data/2.5/forecast/climate?q=${
						userData.city
					},${"US"}&units=imperial&appid=${OpenweatherAPIKey}`
				);
				const data = await response.json();
				setForecast(data.list); // `list` contains daily forecast data
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		};
		if (userData.city) {
			fetchWeatherFromApi();
		}
	}, [userData.city]);

	const handleDayCellDidMount = (info: any) => {
		if (forecast.length > 0) {
			// Get the date of the current cell
			const cellDate = info.date;

			// Find the corresponding forecast data for this date
			const forecastData = forecast.find(
				(f: any) =>
					new Date(f.dt * 1000).toDateString() ===
					cellDate.toDateString()
			);

			if (forecastData) {
				const weatherMain = forecastData.weather[0].main;

				// Apply different background images based on weather conditions
				let backgroundImage = "";

				switch (weatherMain) {
					case "Rain":
						backgroundImage = "url('/rainning.png')";
						break;
					case "Clear":
						backgroundImage = "url('/sunny.png')";
						break;
					case "Clouds":
						backgroundImage = "url('/cloudy.png')";
						break;
					default:
						backgroundImage = "url('/sunny.png')";
				}

				// Apply the background image to the cell
				info.el.style.backgroundImage = backgroundImage;
				info.el.style.backgroundSize = "contain"; // Ensure the image covers the cell
				info.el.style.backgroundPosition = "center";
				info.el.style.backgroundRepeat = "no-repeat";
			}
		} else {
			console.log("No forecast yet. Enter City Name.");
		}
	};

	if (loading) {
		return <div>Loading weather data...</div>;
	}

	return (
		<div className="flex flex-col w-[1350px]  h-screen">
			<Navbar />
			{/* {JSON.stringify(userData.city)} */}
			{/* {JSON.stringify(newEvent.start)} */}
			{/* <span>
				--------------------------------------------------------------------------------------------
			</span> */}
			{/* NewEvent: {JSON.stringify(newEvent)} */}
			{/* <span>
				--------------------------------------------------------------------------------------------
			</span>
			Tags Hidden: {JSON.stringify(tagsHidden)}
			<span>
				--------------------------------------------------------------------------------------------
			</span> */}
			{/* Forecast: {JSON.stringify(forecast)} */}
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
					events={userData?.events.filter(
						(event: any) => !tagsHidden.includes(event.tag_id)
					)}
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
					// dayCellDidMount={handleDayCellDidMount}
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
