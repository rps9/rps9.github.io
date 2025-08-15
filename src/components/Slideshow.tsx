import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Slide = {
	src: string;
	caption?: string;
};

type Props = {
	slides: Slide[];
};

export default function Slideshow({ slides }: Props) {
    const autoIntervalMs = 5000 // Change slide automatically every 5 seconds
	const [idx, setIdx] = useState(0);
	const timerRef = useRef<number | null>(null);
	const containerRef = useRef<HTMLDivElement | null>(null);

	const go = (next: number) => {
		setIdx((curr) => (next + slides.length) % slides.length);
	};

	const next = () => go(idx + 1);
	const prev = () => go(idx - 1);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "ArrowRight") next();
			if (e.key === "ArrowLeft") prev();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [idx]);

	// Move to next slide after time
	useEffect(() => {
		if (!autoIntervalMs) return;
		timerRef.current && window.clearInterval(timerRef.current);
		timerRef.current = window.setInterval(next, autoIntervalMs);
		return () => {
			if (timerRef.current) window.clearInterval(timerRef.current);
		};
	}, [idx, autoIntervalMs]);

	// Basic 
	useEffect(() => {
		const el = containerRef.current;
		if (!el) return;

		let startX = 0;
		let endX = 0;

		const down = (e: PointerEvent) => {
			startX = e.clientX;
		};
		const up = (e: PointerEvent) => {
			endX = e.clientX;
			const delta = endX - startX;
			if (Math.abs(delta) > 40) {
				delta < 0 ? next() : prev();
			}
		};

		el.addEventListener("pointerdown", down);
		el.addEventListener("pointerup", up);
		return () => {
			el.removeEventListener("pointerdown", down);
			el.removeEventListener("pointerup", up);
		};
	}, [idx]);

	if (!slides?.length) return null;

	return (
		<div
			ref={containerRef}
			className="w-full max-w-4xl mx-auto my-10 rounded-2xl overflow-hidden bg-gray-800 shadow-lg relative"
			aria-roledescription="carousel"
		>
			{/* Image */}
			<div className="relative">
				<img
					src={slides[idx].src}
					className="w-full h-80 md:h-[32rem] object-cover"
					loading="lazy"
				/>
				{/* Caption */}
				{slides[idx].caption && (
					<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
						<p className="text-gray-200 text-sm md:text-base">{slides[idx].caption}</p>
					</div>
				)}
			</div>

			{/* Back and forth controls */}
			<button
				type="button"
				onClick={prev}
				aria-label="Previous slide"
				className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-gray-900/60 hover:bg-gray-900/80 transition"
			>
				<ChevronLeft className="text-white" />
			</button>
			<button
				type="button"
				onClick={next}
				aria-label="Next slide"
				className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-gray-900/60 hover:bg-gray-900/80 transition"
			>
				<ChevronRight className="text-white" />
			</button>

			{/* Navigation dots at the bottom */}
			<div className="flex items-center justify-center gap-2 py-3 bg-gray-900/60">
				{slides.map((_, i) => (
					<button
						key={i}
						onClick={() => go(i)}
						aria-label={`Go to slide ${i + 1}`}
						className={`h-2 w-2 rounded-full transition ${
							i === idx ? "bg-blue-500 w-6" : "bg-gray-500 hover:bg-gray-400"
						}`}
					/>
				))}
			</div>
		</div>
	);
}
