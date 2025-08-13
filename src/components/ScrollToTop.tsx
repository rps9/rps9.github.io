// used to bring the user to the top of the page whenever they are navigating to a new one

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
	useEffect(() => {
		window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
	}, [useLocation().pathname]);

	return null;
}