function DemoLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-screen overflow-hidden">
			<main className="pt-24">{children}</main>
		</div>
	);
}

export default DemoLayout;
