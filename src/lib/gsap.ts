'use client';
import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

// Single registration point — import gsap and plugins from here, never from
// 'gsap/*' directly.
gsap.registerPlugin(ScrollToPlugin, ScrollTrigger, SplitText);

export { gsap, ScrollToPlugin, ScrollTrigger, SplitText };
