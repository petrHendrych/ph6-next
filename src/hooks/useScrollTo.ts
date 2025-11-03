import { gsap } from 'gsap';

export const useScrollTo = () => {
	const scrollToTop = () => {
		gsap.to(window, {
			duration: 0.8,
			scrollTo: 0,
			ease: 'power2.inOut'
		});
	};

	const scrollToProjects = () => {
		gsap.to(window, {
			duration: 0.8,
			scrollTo: {
				y: '#preview-section',
				offsetY: +100
			},
			ease: 'power2.inOut'
		});
	};

	const scrollToAtelier = () => {
		gsap.to(window, {
			duration: 0.8,
			scrollTo: {
				y: '#atelier-section',
				offsetY: +100
			},
			ease: 'power2.inOut'
		});
	};

	return { scrollToTop, scrollToProjects, scrollToAtelier };
};
