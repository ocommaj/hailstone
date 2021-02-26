import { gsap } from 'gsap';
import ModalAnimations from './_modal';
import UpvoteGraphic from './_upvoteGraphic';

const modalAnimations = ModalAnimations(gsap);
const upvoteAnimation = UpvoteGraphic(gsap);
export { modalAnimations, upvoteAnimation }
