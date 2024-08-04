import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSignIn } from "@clerk/nextjs";

export default function DemoPage() {
	const { signIn } = useSignIn();
	const router = useRouter();

	useEffect(() => {
		const signInDemoUser = async () => {
			try {
				// Sign in using the demo user credentials
				const signInAttempt = await signIn!.create({
					identifier: "123",
					password: "123",
				});

				// If the sign-in was successful, Clerk automatically sets the session
				if (signInAttempt.status === "complete") {
					// Redirect to the main calendar page
					router.push("/calendar");
				} else {
					// Handle unsuccessful sign-in attempt (e.g., invalid credentials)
					console.error("Sign-in failed");
				}
			} catch (error) {
				console.error("Error signing in demo user:", error);
			}
		};

		signInDemoUser();
	}, [signIn, router]);

	return <div>Loading demo...</div>;
}
