import { BookmarkMinus, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { BlockPicker } from "react-color";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TagProps {
	tagAttributes: {
		title: string;
		color: string;
	};
}

const Tag: React.FC<TagProps> = ({ tagAttributes }) => {
	const [title, setTitle] = useState(tagAttributes.title);
	const [color, setColor] = useState(tagAttributes.color);
	const [pickingColor, setPickingColor] = useState(false);

	const colorStyle = {
		backgroundColor: color,
	};

	const handleColorChange = (newColor: string) => {
		setColor(newColor.hex);
	};
	return (
		<div
			key={tagAttributes.title}
			className="flex items-center justify-between py-5 gap-x-5 bg-orange-100"
		>
			<div className="flex gap-x-3 items-center relative">
				<DropdownMenu>
					<DropdownMenuTrigger>
						<div
							className={`w-5 h-5 rounded-sm bg-[${color}] relative`}
							style={colorStyle}
							onClick={() => setPickingColor(!pickingColor)}
						/>
					</DropdownMenuTrigger>
					{pickingColor && (
						<div className="">
							<DropdownMenuContent className="absolute mt-3">
								<BlockPicker
									color={color}
									className="absolute p-2"
									onChangeComplete={handleColorChange}
                                    triangle="hide"
								/>
							</DropdownMenuContent>
						</div>
					)}
				</DropdownMenu>
				<input
					type="text"
					value={title}
					className="w-[90%] px-1 border-0 rounded-md focus:border-black focus:bg-white bg-inherit"
				/>
			</div>
			<div className="flex">
				<Eye />
				<EyeOff />
				<BookmarkMinus />
			</div>
		</div>
	);
};

export default Tag;
