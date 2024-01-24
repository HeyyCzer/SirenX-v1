import { Inter } from "next/font/google";
import "./globals.css";

import { NavigationEvents } from "@/components/NavigationEvents";
import * as gtag from "@/lib/gtag";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Script from "next/script";
config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "SirenX - The carcols.meta Editor",
	description: "The simple carcols.meta editor for GTA V/FiveM. SirenX allows you to quickly and easily create siren patterns for your emergency vehicles by importing files into the editor and exporting them after modifying them.",
	openGraph: {
		url: 'https://heyyczer.github.io/SirenX',
		locale: "en_US",
		images: 'https://heyyczer.github.io/SirenX/siren.png',
	},
	twitter: {
		cardType: "summary",
	}
};

export default function RootLayout({ children }) {
	return (
		<html lang="pt">
			{/* Global Site Tag (gtag.js) - Google Analytics */}
			<Script
				strategy="afterInteractive"
				src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
			/>
			<Script id="gtag-init" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());

					gtag('config', '${gtag.GA_TRACKING_ID}');
				`}
			</Script>

			<body className={inter.className}>
				<NavigationEvents />

				{children}
			</body>
		</html>
	);
}
