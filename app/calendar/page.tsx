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
import { useUserContext } from "@/hooks/UserContext";

const CalendarPage = () => {
	const { user } = useUser();
	const { userData, setUserData } = useUserContext();

	// useEffect(() => {
	// 	console.log(user);
	// 	console.log(user?.publicMetadata.userId)
	// }, []);

	return (
		<div className="flex flex-col">
			<Navbar />
			<div className="h-screen pt-9 px-2">
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
					events={userData?.events}
					nowIndicator={true}
					editable={true}
					droppable={true}
					selectable={true}
					selectMirror={true}
					dateClick={() => console.log("clicking")}
					drop={() => console.log}
					eventClick={() => console.log}
				/>
			</div>
		</div>
	);
};

export default CalendarPage;
