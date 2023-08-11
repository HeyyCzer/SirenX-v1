import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { faArrowRight, faDownload, faEdit, faUpload } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";

import screenshot from "@/assets/home/screenshot.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center py-32 gap-y-24">
			{/* Hero */}
			<section className="flex flex-col items-center pb-32">
				<h1 aria-label="Siren Tool" className="font-bold text-[2rem] md:text-[3rem] lg:text-[5rem] xl:text-[6rem] flex space-x-2">
					<span className="-mr-6">Siren</span>
					<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Tool</span>
				</h1>

				<p className="text-neutral-400 text-xl text-center">
					The ultimate <b className="text-white"><i>carcols.meta</i></b> light patterns editor<br/>
					and your new best friend.
				</p>

				<Link href="/editor" className="mt-8">
					<Button icon={faArrowRight} text="Take me to the editor!" />
				</Link>
			</section>

			{/* Screenshot */}
			<section className="grid grid-cols-1 xl:grid-cols-2 items-center gap-14 text-center w-9/12">
				<div className="w-full md:w-2/3 mx-auto">
					<Heading className="mx-auto mb-4">What is Siren Tool?</Heading>

					<p className="text-neutral-400 text-xl">
						Siren Tool is a web-based tool that allows you to edit <b className="text-white"><i>carcols.meta</i></b> light patterns for <b className="text-white"><i>GTA V</i></b> vehicles.
						<br />
						<br />
						You can upload your file, edit it and download it back.
					</p>
				</div>

				<div className="perspective-1000">
					<Image src={ screenshot } alt="Screenshot" className="shadow-xl shadow-neutral-800/50 rounded-lg xl:transform-style-3d xl:-rotate-y-[20deg] backface-hidden" />
				</div>
			</section>
			
			{/* Features */}
			<section className="flex flex-col text-center">
				<Heading className="mx-auto mb-12">Features</Heading>

				{/* Cards */}
				<div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
					{/* Card */}
					<div className="flex flex-col items-center gap-y-4">
						<div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-600 flex items-center justify-center">
							<FontAwesomeIcon icon={ faUpload } className="text-4xl text-white" />
						</div>

						<h3 className="font-bold text-xl">Upload</h3>

						<p className="text-neutral-400 text-lg">
							Upload your <b className="text-white"><i>carcols.meta</i></b> file and edit it.
						</p>
					</div>

					{/* Card */}
					<div className="flex flex-col items-center gap-y-4">
						<div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-600 flex items-center justify-center">
							<FontAwesomeIcon icon={ faEdit } className="text-4xl text-white" />
						</div>

						<h3 className="font-bold text-xl">Edit</h3>

						<p className="text-neutral-400 text-lg">
							Edit your <b className="text-white"><i>carcols.meta</i></b> file and download it back.
						</p>
					</div>

					{/* Card */}
					<div className="flex flex-col items-center gap-y-4">
						<div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-400 to-pink-600 flex items-center justify-center">
							<FontAwesomeIcon icon={ faDownload } className="text-4xl text-white" />
						</div>

						<h3 className="font-bold text-xl">Download</h3>

						<p className="text-neutral-400 text-lg">
							Download your edited <b className="text-white"><i>carcols.meta</i></b> file.
						</p>
					</div>
				</div>
			</section>
		</main>
	);
}
