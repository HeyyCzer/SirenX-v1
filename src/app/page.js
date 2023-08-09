import Button from "@/components/Button";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center py-32">
			<div className="flex flex-col items-center mb-8">
				<h1 aria-label="Siren Tool" className="font-bold text-[2rem] md:text-[3rem] lg:text-[5rem] xl:text-[6rem] flex space-x-2">
					<span className="">Siren</span>
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 -translate-x-6">Tool</span>
				</h1>

				<p className="text-neutral-400 text-xl text-center">
					The ultimate <b className="text-white"><i>carcols.meta</i></b> light patterns editor<br/>
					and your new best friend.
				</p>
			</div>
			
			<Link href="/editor">
				<Button icon={faArrowRight} text="Take me to the editor!" />
			</Link>
		</main>
	);
}
