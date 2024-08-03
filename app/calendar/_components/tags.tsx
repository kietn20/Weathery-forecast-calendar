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
import { deleteTag, updateTag } from "@/lib/actions/user.action";
import { useUserContext } from "@/hooks/UserContext";

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
	const [pickingColor, setPickingColor] = useState(false);
	const [isVisible, setIsVisible] = useState(false);
	const [hideTag, setHideTag] = useState(false);
	const { tagsHidden, setTagsHidden } = useUserContext();

	const colorStyle = {
		backgroundColor: color,
	};

	const debounce = (func: (...args: any[]) => void, wait: number) => {
		let timeout: NodeJS.Timeout;
		return (...args: any[]) => {
			clearTimeout(timeout);
			timeout = setTimeout(() => func(...args), wait);
		};
	};

	const handleTitleChange = debounce(
		async (event: React.ChangeEvent<HTMLInputElement>) => {
			setTitle(event.target.value);
			const updatedUser = await updateTag(
				tagAttributes._id,
				event.target.value
			);
			setUserData(updatedUser);
		},
		1000
	);

	const handleColorChange = debounce(async (newColor: any) => {
		setColor(newColor.hex);
		const updatedUser = await updateTag(
			tagAttributes._id,
			undefined,
			newColor.hex
		);
		setUserData(updatedUser);
	}, 0);

	const handleDelete = async () => {
		const updatedUser = await deleteTag(tagAttributes._id);
		setUserData(updatedUser);
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
					className="w-[90%] px-1 border-0 rounded-md focus:border-black focus:bg-white bg-inherit font-medium text-normal"
					onChange={handleTitleChange}
				/>
			</div>
			<div className="flex">
				{isVisible && (
					<div className="flex items-center gap-x-1">
						{!hideTag ? (
							<button
								className="rounded-sm hover:bg-slate-200 ease-in transition duration-100"
								onClick={() => {
									setTagsHidden([
										...tagsHidden,
										tagAttributes._id,
									]);
									setHideTag(!hideTag);
								}}
							>
								<Eye />
							</button>
						) : (
							<button
								className="rounded-sm hover:bg-slate-200 ease-in transition duration-100"
								onClick={() => {
									setTagsHidden((prevTagsHidden: any) =>
										prevTagsHidden.filter(
											(item: any) =>
												item !== tagAttributes._id
										)
									);
									setHideTag(!hideTag);
								}}
							>
								<EyeOff />
							</button>
						)}
						<button
							className="rounded-sm hover:bg-slate-200 ease-in transition duration-100"
							onClick={handleDelete}
						>
							<BookmarkMinus />
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Tag;
