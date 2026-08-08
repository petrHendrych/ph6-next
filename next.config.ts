import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	// Next 16 only optimises qualities named here. The team portraits in
	// `AtelierContent` ask for 90; without it they silently fall back to 75.
	images: { qualities: [75, 90] }
};

export default nextConfig;
