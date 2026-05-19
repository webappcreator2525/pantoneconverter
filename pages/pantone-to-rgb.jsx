import { Droplets } from 'lucide-react';
import PantoneToXPage from '../components/PantoneToXPage';

export default function PantoneToRgb() {
  return (
    <PantoneToXPage
      primaryOutput="rgb"
      icon={<Droplets size={20} color="#4f46e5" />}
      iconBg="#eef2ff"
      accentColor="#4f46e5"
      pageTitle="Pantone to RGB Converter — Free PMS Color Tool"
      metaDescription="Get the RGB values for any Pantone PMS color instantly. Free, no login, 3200+ Pantone colors. Perfect for UI design, app development, and digital brand guidelines."
      canonical="https://pantoneconverter.com/pantone-to-rgb/"
      seoH2="What is Pantone to RGB Conversion?"
      seoText={[
        `RGB (Red, Green, Blue) is the color model used by digital screens, cameras, and software to represent color as a mixture of light intensities. When you need to use a Pantone brand color in a mobile app, UI design tool, or video production, you need its RGB equivalent so the color renders correctly on screen.`,
        `Converting Pantone to RGB maps a physical ink reference into the additive light model that screens understand. Our database contains the official Pantone-published RGB approximations for each PMS color, ensuring your digital implementations are as faithful to the intended ink color as screen technology allows. This is especially useful for UI designers building design systems, app developers implementing brand guidelines, and video editors who need to match on-screen titles to a brand's Pantone specification.`,
      ]}
    />
  );
}
