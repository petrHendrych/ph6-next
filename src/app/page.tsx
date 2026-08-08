import MainPictures from '@/components/MainPictures';
import Header from '@/components/Header';
import PreviewGrid from '@/components/PreviewGrid';
import AtelierContent from '@/components/AtelierContent';
import RewardsContent from '@/components/RewardsContent';
import ContactContent from '@/components/ContactContent';
import SectionHeading from '@/components/SectionHeading';
import Footer from '@/components/Footer';
import { HOME_PREVIEW_COUNT, previewImages } from '@/data';

const Home = () => (
	<>
		<Header />
		{/* The section titles are h2s, so the page still needs one h1. */}
		<h1 className="sr-only">PH6 — architektonický ateliér</h1>
		<MainPictures />

		<section
			id="preview-section"
			className="container mx-auto px-6 py-20 md:py-28"
		>
			<SectionHeading index="01" title="Projekty" note="Výběr realizací" />
			<PreviewGrid
				images={previewImages.slice(0, HOME_PREVIEW_COUNT)}
				showAllTile
			/>
		</section>

		<section
			id="atelier-section"
			className="container mx-auto px-6 py-20 md:py-28"
		>
			<SectionHeading index="02" title="Ateliér" note="Od roku 2002" />
			<AtelierContent />
		</section>

		<section className="container mx-auto px-6 py-20 md:py-28">
			<SectionHeading index="03" title="Ocenění" />
			<RewardsContent />
		</section>

		<section
			id="kontakt-section"
			className="container mx-auto px-6 py-20 md:py-28"
		>
			<SectionHeading index="04" title="Kontakt" note="Praha 6" />
			<ContactContent />
		</section>

		<Footer />
	</>
);

export default Home;
