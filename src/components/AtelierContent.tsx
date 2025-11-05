import React from 'react';
import Image from 'next/image';

const AtelierContent = () => (
	<div className="mx-auto flex max-w-7xl flex-col gap-3">
		<p className="text-base/relaxed">
			Architektonický atelier PH6 založil Ing. arch. Šimon Brnada v roce 2002.
			Zakládáme si na tom, že ke každému klientovi přistupujeme individuálně,
			nepoužíváme jen zaběhlá schémata, ale snažíme se na základě zadání a
			potřeb klienta dospět k originálnímu a jedinečnému řešení. V současné době
			atelier zabývá širokým spektrem zakázek od interiérové tvorby, přes návrhy
			rodinných i bytových domů až po objekty administrativní, obchodní,
			sportovní a školské stavby a je schopen zajistit veškeré přípravné,
			projektové i průzkumné práce. Snahou je poskytovat klientovi komplexní
			služby od urbanistického řešení až po projekty interiérů. V oboru
			interierů se zabýváme hlavně navrhováním gastro provozů – máme za sebou
			desítky realizovaných restaurací kaváren a zkušenosti s návrhy
			konceptových řetězců restaurací. V případě větších zakázek spolupracujeme
			s projekčními kancelářemi ARPLAN s.r.o a ORTOGONAL s.r.o, které poskytují
			kvalitní projekční zázemí.
		</p>

		<p className="text-base/relaxed">
			Pracovní tým v současnosti tvoří: Ing. arch. Šimon Brnada / Ing. arch. Jan
			Mudra / Ing. arch. Kristina Hanzlová / Ing. arch. Pavel Hendrych
			Vizualizace zajišťuje: ing. Jan Haspra - 3dvizualizace.cz
		</p>

		<p className="text-base/relaxed">Těšíme se na spolupráci</p>

		<div className="mx-auto mt-10 flex flex-row gap-24">
			<figure className="flex flex-col items-center gap-4">
				<Image
					src="/people/simon.jpg"
					alt="Simon Brnada"
					width={220}
					height={220}
					className="rounded-full drop-shadow-2xl transition-transform duration-300 hover:scale-110"
				/>
				<figcaption className="text-center text-sm text-black">
					Ing. arch. Šimon Brnada
				</figcaption>
			</figure>

			<figure className="flex flex-col items-center gap-4">
				<Image
					src="/people/kristina.jpg"
					alt="Kristina Hanzlova"
					width={220}
					height={220}
					className="rounded-full drop-shadow-2xl transition-transform duration-300 hover:scale-110"
				/>
				<figcaption className="text-center text-sm text-black">
					Ing. arch. Kristina Hanzlová
				</figcaption>
			</figure>

			<figure className="flex flex-col items-center gap-4">
				<Image
					src="/people/pavel.jpg"
					alt="Pavel Hendrych"
					width={220}
					height={220}
					className="rounded-full drop-shadow-2xl transition-transform duration-300 hover:scale-110"
				/>
				<figcaption className="text-center text-sm text-black">
					Ing. arch. Pavel Hendrych
				</figcaption>
			</figure>
		</div>
	</div>
);

export default AtelierContent;
