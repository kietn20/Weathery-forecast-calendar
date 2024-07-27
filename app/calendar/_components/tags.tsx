"use client";

import { BookmarkMinus, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
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
	const [isVisible, setIsVisible] = useState(false);

	// useEffect(() => {
	// 	setTitle(tagAttributes.title);
	// 	setColor(tagAttributes.color);
	// }, [tagAttributes]);

	const colorStyle = {
		backgroundColor: color,
	};

	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value);
	};

	const handleColorChange = (newColor: any) => {
		setColor(newColor.hex);
	};
	return (
		<div
			className="flex items-center justify-between py-2 gap-x-5 bg-orange-0"
			onMouseOver={() => setIsVisible(true)}
			onMouseOut={() => setIsVisible(false)}
		>
			<div className="flex gap-x-3 items-center relative">
				<DropdownMenu>
					<DropdownMenuTrigger>
						<div
							className={`w-5 h-5 rounded-sm relative`}
							style={colorStyle}
							onClick={() => setPickingColor(!pickingColor)}
						/>
					</DropdownMenuTrigger>
					{pickingColor && (
						<div className="absolute">
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
					defaultValue={title}
					className="w-[90%] px-1 border-0 rounded-md focus:border-black focus:bg-white bg-inherit"
					onChange={handleTitleChange}
				/>
			</div>
			<div className="flex">
				{isVisible && (
					<div className="flex">
						<Eye />
						<BookmarkMinus />
					</div>
				)}
			</div>
		</div>
	);
};

export default Tag;
