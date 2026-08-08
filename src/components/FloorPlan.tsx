import React from 'react';

// Stair treads, and the tile grid drawn on the upper-right room's floor.
const TREADS = [48.3, 50.6, 52.9, 55.2, 57.5, 59.7];
const TILE_X = [63, 71.4, 79.8];
const TILE_Y = [22.4, 30.8];

/**
 * Faint drafting plan behind the projects-overview tile. It follows the
 * conventions an architect actually draws with: walls as paired lines with the
 * exterior heavier than the partitions, openings as breaks in those lines,
 * a quarter-circle arc per door showing which way the leaf swings, three lines
 * across a window, a stair run with a direction arrow, and a dimension line
 * with 45° ticks.
 *
 * Purely decorative. Strokes inherit `currentColor`, so the drawing inverts
 * with the tile it sits in, and `plan-lines` holds them to true hairlines at
 * any tile size.
 */
const FloorPlan = ({ className }: { className?: string }) => (
	<svg
		viewBox="0 0 100 100"
		fill="none"
		stroke="currentColor"
		strokeLinecap="square"
		aria-hidden="true"
		className={`plan-lines ${className ?? ''}`}
	>
		{/* Exterior wall, broken only for the entrance. The wall lines run through
		    a window opening — they are two of the three lines that draw it. */}
		<g strokeWidth="1" opacity="0.32">
			<path d="M9 12 H30 M42 12 H91 V66 H9 V12" />
			<path d="M11 14 H30 M42 14 H89 V64 H11 V14" />
		</g>

		{/* Interior partitions, broken for a door each. */}
		<g strokeWidth="0.85" opacity="0.26">
			<path d="M53.3 14 V30 M53.3 42 V64 M54.7 14 V30 M54.7 42 V64" />
			<path d="M54.7 39.3 H70 M78 39.3 H89 M54.7 40.7 H70 M78 40.7 H89" />
		</g>

		{/* Windows: the third line is the glass, with a jamb at each reveal. */}
		<g strokeWidth="0.7" opacity="0.24">
			<path d="M20 65 H38 M58 65 H76 M10 26 V44" />
			<path d="M20 64 V66 M38 64 V66 M58 64 V66 M76 64 V66 M9 26 H11 M9 44 H11" />
		</g>

		{/* Doors: leaf perpendicular to the wall, arc back to the closed jamb. */}
		<g strokeWidth="0.7" opacity="0.24">
			<path d="M30 14 V26 M30 26 A12 12 0 0 0 42 14" />
			<path d="M53.3 30 H41.3 M41.3 30 A12 12 0 0 0 53.3 42" />
			<path d="M70 40 V32 M70 32 A8 8 0 0 1 78 40" />
		</g>

		{/* Stair run, arrow pointing up the flight. */}
		<g strokeWidth="0.6" opacity="0.2">
			<path d="M16 46 V62 M30 46 V62 M16 46 H30 M16 62 H30" />
			{TREADS.map(y => (
				<path key={y} d={`M16 ${y} H30`} />
			))}
			<path d="M23 60.5 V47.5 M21.5 49.5 L23 47.5 L24.5 49.5" />
		</g>

		{/* Tiled floor in the upper-right room. */}
		<g strokeWidth="0.5" opacity="0.12">
			{TILE_X.map(x => (
				<path key={x} d={`M${x} 14 V39.3`} />
			))}
			{TILE_Y.map(y => (
				<path key={y} d={`M54.7 ${y} H89`} />
			))}
		</g>

		{/* Overall dimension down the right-hand side. */}
		<g strokeWidth="0.6" opacity="0.16">
			<path d="M95.5 12 V66 M91.5 12 H95.5 M91.5 66 H95.5" />
			<path d="M93.5 14 L97.5 10 M93.5 68 L97.5 64" />
		</g>
	</svg>
);

export default FloorPlan;
