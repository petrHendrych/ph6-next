import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		// Next 16 only optimises qualities named here. The team portraits in
		// `AtelierContent` ask for 90; without it they silently fall back to 75.
		qualities: [75, 90],
		// AVIF first: the 1920px hero lands at ~140 kB instead of ~275 kB as
		// WebP, and a photography site is nothing but image bytes. It costs one
		// slower encode per variant on the very first request for it; every
		// visitor after that is served from the cache below.
		formats: ['image/avif', 'image/webp'],
		// The photographs never change without a new file name, so there is no
		// reason to re-encode them a month from now. 30 days.
		minimumCacheTTL: 2592000
	}
};

export default nextConfig;
