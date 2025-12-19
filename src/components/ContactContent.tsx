import React from 'react';

const ContactContent = () => (
	<div className="relative h-[215px] w-full overflow-hidden">
		<a
			href="https://mapy.com/en/zakladni?q=narodni%20obrany%2031&source=firm&id=13622813&x=14.3965261&y=50.1012649&z=16"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Otevřít mapu v novém okně"
			className="absolute inset-0 bg-gray-200 bg-[url(/map.png)] bg-cover bg-right grayscale transition-opacity hover:opacity-90"
		/>

		<div className="pointer-events-none absolute inset-y-0 left-1/2 flex -translate-x-1/2 items-center justify-center">
			<div className="pointer-events-auto flex h-full min-w-[300px] flex-col items-center justify-center gap-y-3 bg-white/40 px-12 text-center backdrop-blur-sm">
				<div className="flex flex-col items-center">
					<span className="text-xs uppercase tracking-widest text-gray-500">
						Adresa
					</span>
					<a
						href="https://mapy.com/en/zakladni?q=narodni%20obrany%2031&source=firm&id=13622813&x=14.3965261&y=50.1012649&z=16"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Otevřít mapu v novém okně"
						className="text-sm font-medium text-black"
					>
						Národní obrany 31
						<br />
						Praha 6<br />
						160 00, Česká republika
					</a>
				</div>
				<div className="flex flex-col items-center">
					<span className="text-xs uppercase tracking-widest text-gray-500">
						Email
					</span>
					<a
						href="mailto:brnada@ph6.cz"
						className="text-sm font-medium text-black underline underline-offset-4"
					>
						brnada@ph6.cz
					</a>
				</div>
				<div className="flex flex-col items-center">
					<span className="text-xs uppercase tracking-widest text-gray-500">
						Telefon
					</span>
					<span className="text-sm font-medium text-black">
						+420 602 236 516
					</span>
				</div>
			</div>
		</div>
	</div>
);

export default ContactContent;
