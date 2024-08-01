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
	const { userData, setUserData } = useUserContext();

	// useEffect(() => {
	// 	console.log(user);
	// 	console.log(user?.publicMetadata.userId)
	// }, []);
	const [allEvents, setAllEvents] = useState<any[]>([]);
	const [newEvent, setNewEvent] = useState({
		title: "",
		start: "",
		allDay: true,
	});

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
		<div className="flex">
			<LeftNavigation />
			<div className="flex flex-col w-screen h-screen overflow-hidden">
				<Navbar />
				{JSON.stringify(userData)}
				<div className="h-screen pt-9 px-2">
					<FullCalendar
						plugins={[
							dayGridPlugin,
							interactionPlugin,
							timeGridPlugin,
						]}
						headerToolbar={{
							left: "title",
							center: "",
							right: "dayGridMonth,timeGridWeek,prev,next,today",
						}}
						height="90%"
						handleWindowResize={true}
						expandRows={true}
						events={userData?.events}
						nowIndicator={true}
						editable={true}
						droppable={true}
						// selectable={true}
						selectMirror={true}
						// dateClick={() =>}
						drop={(data) => addEvent(data)}
						eventClick={() => console.log}
					/>
				</div>
			</div>
			<RightNavigation />
		</div>
	);
};

export default CalendarPage;
