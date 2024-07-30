import { Navbar } from "@/components/navbar";

interface RightNavigationProps {
	setEvents: any;
}

const RightNavigation: React.FC<RightNavigationProps> = ({ setEvents }) => {
	return (
		<div className="h-screen w-[300px] bg-[#F9F9F9]">
			<Navbar />
			Right navigation
		</div>
	);
};

export default RightNavigation;
