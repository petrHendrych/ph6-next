'use client';
import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Single registration point. Import gsap and plugins from here, never from
// 'gsap/*' directly, so no component can use a plugin that was registered
// somewhere else by accident.
gsap.registerPlugin(Flip, ScrollToPlugin, ScrollTrigger, SplitText);

export { gsap, Flip, ScrollToPlugin, ScrollTrigger, SplitText };
