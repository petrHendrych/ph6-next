import React, { type ReactNode } from 'react';

const SectionHeader = ({ children }: { children: ReactNode }) => (
	<div className="container underline">{children}</div>
);

export default SectionHeader;
