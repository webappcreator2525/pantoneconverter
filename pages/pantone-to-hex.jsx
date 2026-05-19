import { Fingerprint } from 'lucide-react';
import PantoneToXPage from '../components/PantoneToXPage';

export default function PantoneToHex() {
  return (
    <PantoneToXPage
      primaryOutput="hex"
      icon={<Fingerprint size={20} color="#ca8a04" />}
      iconBg="#fefce8"
      accentColor="#ca8a04"
      pageTitle="Pantone to HEX Converter — Free PMS Color Tool"
      metaDescription="Find the HEX color code equivalent for any Pantone PMS color instantly. Free, no login, covers 3200+ Pantone colors including coated and uncoated."
      canonical="https://pantoneconverter.com/pantone-to-hex/"
      seoH2="What is Pantone to HEX Conversion?"
      seoText={[
        `HEX color codes are the standard currency of digital design — used in CSS, design tools like Figma and Sketch, and web graphics. When a brand's Pantone specification needs to be translated into a digital environment, designers need the closest HEX equivalent to maintain color consistency across screens.`,
        `Converting Pantone to HEX involves mapping a physical spot color ink into the sRGB color space that digital displays use. Because Pantone spot colors can be more vivid than what a screen can display, the HEX value represents the closest achievable on-screen approximation. This tool looks up the official Pantone-to-RGB mapping in our database and converts it directly to HEX — giving you the same HEX code that Pantone themselves use in their published digital references, so you can trust the values for web design, social media assets, and digital brand guidelines.`,
      ]}
    />
  );
}
