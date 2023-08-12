"use client";

import { pageview } from "@/lib/gtag";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function NavigationEvents() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const url = `${pathname}?${searchParams}`;
		pageview(url);
	}, [pathname, searchParams]);

	return null;
}
