import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VOOMETDESIGN',
    short_name: 'VOOMET',
    description: 'Transforming spaces from concept to reality. Expert solutions for Hospitality, Education, and Residential projects.',
    start_url: '/',
    display: 'standalone',
    background_color: '#030712',
    theme_color: '#030712',
    icons: [
      {
        src: '/logo/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
