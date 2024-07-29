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
import { ObjectId } from "mongoose";
import { updateTag } from "@/lib/actions/user.action";

interface TagProps {
	tagAttributes: {
		_id: ObjectId;
		title: string;
		color: string;
	};
	setUserData: any;
}

const Tag: React.FC<TagProps> = ({ tagAttributes, setUserData }) => {
	const [title, setTitle] = useState<string>(tagAttributes.title);
	const [color, setColor] = useState<string>(tagAttributes.color);
	// const [title, setTitle] = useState('dog');
	// const [color, setColor] = useState("#9c27b0");
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
		setTimeout(async () => {
			setTitle(event.target.value);
			// data.tags[index].title = title
			// setUserData(data)
			const updatedUser = await updateTag(tagAttributes._id, title);
			setUserData(updatedUser);
		}, 10000);
		console.log(title);
	};

	const handleColorChange = (newColor: any) => {
		// setTimeout(() => {
		// 	setColor(newColor.hex);
		// 	console.log(title);
		// 	setUserData(title);
		// }, 10000);
		setColor(newColor.hex);
	};
	return (
		<div
			className="flex items-center justify-between py-2 gap-x-5 bg-orange-0"
			onMouseOver={() => setIsVisible(true)}
			onMouseOut={() => setIsVisible(false)}
		>
			{/* {JSON.stringify(data.tags[index].title)}
			{JSON.stringify(index)} */}
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
					<div className="flex items-center gap-x-1">
						<div className="rounded-sm hover:bg-slate-200 ease-in transition duration-100">
							<Eye />
						</div>
						<div className="rounded-sm hover:bg-slate-200 ease-in transition duration-100">
							<BookmarkMinus />
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Tag;
