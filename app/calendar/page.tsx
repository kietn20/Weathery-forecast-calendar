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

const CalendarPage = () => {
	const { user } = useUser();
	const { userData, setUserData, newEvent, setNewEvent } = useUserContext();

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

	return (
		<div className="flex flex-col w-[1350px]  h-screen">
			<Navbar />
			{/* {JSON.stringify(userData.events)} */}
			{/* {JSON.stringify(newEvent.start)} */}
			{/* <span>
					--------------------------------------------------------------------------------------------
				</span> */}
			{/* {JSON.stringify(newEvent)} */}
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
					eventClick={() => console.log}
					dayMaxEventRows={4}
					eventBorderColor="#d9e3f0"
				/>
			</div>
		</div>
	);
};

export default CalendarPage;
