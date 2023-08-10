import { Inter } from "next/font/google";
import "./globals.css";

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import Head from "next/head";
config.autoAddCss = false

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "SirenTool - The carcols.meta Editor",
	description: "The simple carcols.meta editor for GTA V/FiveM",
	openGraph: {
		siteName: "SirenTool",
		title: 'SirenTool - The carcols.meta Editor',
		description: 'The simple carcols.meta editor for GTA V/FiveM',
		url: 'https://heyyczer.github.io/SirenTool',
		images: '/siren.png',
	}
};

export default function RootLayout({ children }) {
	return (
		<html lang="pt">
			<Head>
				<meta name="google-site-verification" content="hkufpl1ZmKG8oSpCV_nKrU-mY01i6VkRhuqrRQ_2TpI" />
			</Head>

			<body className={inter.className}>
				{children}
			</body>
		</html>
	);
}
