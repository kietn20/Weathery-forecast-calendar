import { Navbar } from "@/components/navbar";
import { CircleArrowRight } from "lucide-react";

// interface RightNavigationProps {
// 	setEvents: any;
// }

const RightNavigation = () => {
	return (
		<div className="h-screen w-[300px] bg-[#F9F9F9] bg-indigo-100 flex flex-col justify-between items-center p-3">
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
				<div>
					creating new event
				</div>
			</div>
			<div>Image</div>
		</div>
	);
};

export default RightNavigation;
