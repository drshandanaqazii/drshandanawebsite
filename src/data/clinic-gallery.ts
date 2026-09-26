import type { ImageMetadata } from 'astro';
import plant from '../assets/about-plant.jpg';
import notebook from '../assets/care-evaluation.jpg';
import vessels from '../assets/still-vessels.jpg';
import light from '../assets/hero-light.jpg';
import tea from '../assets/care-therapy.jpg';

export interface ClinicPhoto {
  src: ImageMetadata;
  alt: string;
  position?: string;
}

// These existing decorative assets demonstrate the gallery layout.
// Replace them with approved clinic photographs and then set preview to false.
export const CLINIC_GALLERY = {
  preview: true,
  photos: [
    { src: plant, alt: 'Illustrative preview: a leafy houseplant', position: '50% 48%' },
    { src: notebook, alt: 'Illustrative preview: a notebook and glasses on a desk', position: '50% 65%' },
    { src: vessels, alt: 'Illustrative preview: ceramic vases with dried stems', position: '50% 65%' },
    { src: light, alt: 'Illustrative preview: sunlight falling across a wall' },
    { src: tea, alt: 'Illustrative preview: a glass resting on a soft throw', position: '50% 40%' },
  ] satisfies ClinicPhoto[],
};
