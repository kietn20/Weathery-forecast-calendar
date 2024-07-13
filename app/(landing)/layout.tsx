import { Footer } from "./_components/footer";
import { Navbar } from "./_components/navbar";

function LandingLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-screen">
			<Navbar />
			<main className="pt-24">{children}</main>
			{/* <Footer /> */}
		</div>
	);
}

export default LandingLayout;
