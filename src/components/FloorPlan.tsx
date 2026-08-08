import React from 'react';

// Stair treads, and the sparse floor tiling in the kitchen.
const TREADS = [54.9, 57.7, 60.6, 63.4, 66.3, 69.1];
const TILE_X = [58, 66, 74, 82];
const TILE_Y = [22, 30, 38];

/**
 * Faint drafting plan behind the projects-overview tile: a two-bedroom flat with
 * a kitchen, a stair and a dining set. It follows the conventions an architect
 * actually draws with — walls as paired lines with the exterior heavier than the
 * partitions, openings as breaks in those lines, a quarter-circle arc per door
 * showing which way the leaf swings, three lines across a window, and a
 * dimension line with 45° ticks.
 *
 * Purely decorative. Strokes inherit `currentColor`, so the drawing inverts with
 * the tile it sits in; `plan-lines` holds them to true hairlines at any tile
 * size; and `plan-fade` fades the drawing out over the lower third so it never
 * competes with the label sitting there.
 */
const FloorPlan = ({ className }: { className?: string }) => (
	<svg
		viewBox="0 0 100 100"
		fill="none"
		stroke="currentColor"
		strokeLinecap="square"
		aria-hidden="true"
		className={`plan-lines plan-fade ${className ?? ''}`}
	>
		{/* Exterior wall, broken only for the entrance. The wall lines run through
		    a window opening — they are two of the three lines that draw it. */}
		<g strokeWidth="0.9" opacity="0.32">
			<path d="M7 7 H20 M32 7 H89 V76 H7 V7" />
			<path d="M9 9 H20 M32 9 H87 V74 H9 V9" />
		</g>

		{/* Interior partitions, broken for a door each. */}
		<g strokeWidth="0.85" opacity="0.26">
			<path d="M51.3 9 V50 M51.3 62 V74 M52.7 9 V50 M52.7 62 V74" />
			<path d="M52.7 41.3 H66 M74 41.3 H87 M52.7 42.7 H66 M74 42.7 H87" />
		</g>

		{/* Windows: the third line is the glass, with a jamb at each reveal. */}
		<g strokeWidth="0.6" opacity="0.24">
			<path d="M16 75 H32 M56 75 H72 M8 24 V42 M88 18 V34 M88 52 V66 M60 8 H78" />
			<path d="M16 74 V76 M32 74 V76 M56 74 V76 M72 74 V76 M7 24 H9 M7 42 H9 M87 18 H89 M87 34 H89 M87 52 H89 M87 66 H89 M60 7 V9 M78 7 V9" />
		</g>

		{/* Doors: leaf perpendicular to the wall, arc back to the closed jamb. */}
		<g strokeWidth="0.7" opacity="0.24">
			<path d="M20 9 V21 M20 21 A12 12 0 0 0 32 9" />
			<path d="M51.3 50 H39.3 M39.3 50 A12 12 0 0 0 51.3 62" />
			<path d="M66 42 V34 M66 34 A8 8 0 0 1 74 42" />
		</g>

		{/* Dining table with a chair to each side. */}
		<g strokeWidth="0.5" opacity="0.2">
			<path d="M28 20 H44 V32 H28 V20" />
			<path d="M33 15 H39 V19 H33 V15 M33 33 H39 V37 H33 V33" />
			<path d="M23 22 H27 V30 H23 V22 M45 22 H49 V30 H45 V22" />
		</g>

		{/* Kitchen: counter run along the exterior wall, sink and two hobs. */}
		<g strokeWidth="0.5" opacity="0.2">
			<path d="M55 9 V14 H84 V9" />
			<circle cx="66" cy="11.5" r="2" />
			<circle cx="76" cy="11.3" r="1.2" />
			<circle cx="79.5" cy="11.3" r="1.2" />
		</g>

		{/* Bedroom: bed with the pillow at the head, a nightstand each side. */}
		<g strokeWidth="0.5" opacity="0.2">
			<path d="M60 48 H80 V70 H60 V48 M60 54 H80" />
			<path d="M55 48 H59 V52 H55 V48 M81 48 H85 V52 H81 V48" />
		</g>

		{/* Stair run, arrow pointing up the flight. */}
		<g strokeWidth="0.6" opacity="0.2">
			<path d="M12 52 V72 M26 52 V72 M12 52 H26 M12 72 H26" />
			{TREADS.map(y => (
				<path key={y} d={`M12 ${y} H26`} />
			))}
			<path d="M19 70.5 V53.5 M17.5 55.5 L19 53.5 L20.5 55.5" />
		</g>

		{/* Tiled kitchen floor. */}
		<g strokeWidth="0.5" opacity="0.12">
			{TILE_X.map(x => (
				<path key={x} d={`M${x} 14 V41.3`} />
			))}
			{TILE_Y.map(y => (
				<path key={y} d={`M52.7 ${y} H87`} />
			))}
		</g>

		{/* Overall dimension down the right-hand side. */}
		<g strokeWidth="0.6" opacity="0.16">
			<path d="M94 7 V76 M90 7 H94 M90 76 H94" />
			<path d="M92 9 L96 5 M92 78 L96 74" />
		</g>
	</svg>
);

export default FloorPlan;
