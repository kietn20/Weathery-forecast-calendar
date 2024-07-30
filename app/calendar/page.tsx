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
import { useEffect } from "react";

const CalendarPage = () => {
	const { user } = useUser();

	// useEffect(() => {
	// 	console.log(user);
	// 	console.log(user?.publicMetadata.userId)
	// }, []);

	return (
		<div className="flex flex-col">
			<div className="h-screen pt-24 px-2">
				<FullCalendar
					plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
					headerToolbar={{
						left: "title",
						center: "",
						right: "dayGridMonth,timeGridWeek,prev,next,today",
					}}
					height="90%"
					handleWindowResize={true}
					expandRows={true}
					events={[
						{ id: "a", title: "my event", start: "2024-07-29" },
					]}
					nowIndicator={true}
					editable={true}
					droppable={true}
					selectable={true}
					selectMirror={true}
					dateClick={() => console.log}
					drop={() => console.log}
					eventClick={() => console.log}
				/>
			</div>
		</div>
	);
};

export default CalendarPage;
