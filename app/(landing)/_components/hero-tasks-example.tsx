const HeroTaskExample = () => {
	return (
		<div className="relative w-[380px] h-[280px] z-0">
			<div className="w-[380px] h-[280px] bg-[url('/heroTaskbg.png')] bg-[100%_100%] rounded-2xl bg-contain [font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-8 whitespace-nowrap">
				<div className="absolute w-[340px] h-8 top-3.5 left-[25px] [font-family:'Inter',Helvetica] font-semibold text-white text-xs tracking-[1.00px] leading-8 whitespace-nowrap">
					<div className="absolute top-0 left-0 ">TASKS</div>
					<div className="absolute top-0 left-[164px] ">DAY</div>
					<div className="absolute top-0 left-[269px] ">WEATHER</div>
				</div>
				<div className="absolute w-[313px] h-8 top-[68px] left-[25px] ">
					<div className="absolute w-[94px] top-0 left-0">
						Go Grocery
					</div>
					<div className="absolute top-0 left-[164px]">Monday</div>
					<div className="absolute w-[38px] top-0 left-[269px]">
						1977
					</div>
				</div>
				<div className="absolute w-[313px] h-8 top-[101px] left-[25px]">
					<div className="absolute top-0 left-0">Pick Up Clothes</div>
					<div className="absolute top-0 left-[164px]">Tuesday</div>
					<div className="absolute w-[38px] top-0 left-[269px]">
						1986
					</div>
				</div>
				<div className="absolute w-[313px] h-8 top-[134px] left-[25px]">
					<div className="absolute top-0 left-0">Turn In Project</div>
					<div className="absolute top-0 left-[164px]">Wednesday</div>
					<div className="absolute w-[38px] top-0 left-[269px]">
						1973
					</div>
				</div>
				<div className="absolute w-[313px] h-8 top-[167px] left-[25px]">
					<div className="absolute top-0 left-0">Joe’s Birthday</div>
					<div className="absolute top-0 left-[164px]">Thursday</div>
					<div className="absolute w-[38px] top-0 left-[269px]">
						1942
					</div>
				</div>
				<div className="absolute w-[313px] h-8 top-[200px] left-[25px]">
					<div className="absolute top-0 left-0">Movie Date</div>
					<div className="absolute top-0 left-[164px]">Friday</div>
					<div className="absolute w-[38px] top-0 left-[269px]">
						1960
					</div>
				</div>
				<div className="absolute w-[313px] h-8 top-[233px] left-[25px]">
					<div className="absolute top-0 left-0">Laundry</div>
					<div className="absolute top-0 left-[164px]">Sunday</div>
					<div className="absolute w-[38px] top-0 left-[269px]">
						1972
					</div>
				</div>
				<img
					className="absolute w-[337px] h-px top-[54px] left-[25px] object-cover"
					alt="Line"
					src="https://c.animaapp.com/cguUCruN/img/line-1.svg"
				/>
			</div>
		</div>
	);
};

export default HeroTaskExample;
