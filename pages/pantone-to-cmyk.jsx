import { ArrowRightLeft } from 'lucide-react';
import PantoneToXPage from '../components/PantoneToXPage';

export default function PantoneToCmyk() {
  return (
    <PantoneToXPage
      primaryOutput="cmyk"
      icon={<ArrowRightLeft size={20} color="#ea580c" />}
      iconBg="#fff7ed"
      accentColor="#ea580c"
      pageTitle="Pantone to CMYK Converter — Free PMS Color Tool"
      metaDescription="Look up any Pantone PMS color and get its CMYK values instantly. Free, no login, 3200+ Pantone colors including coated, uncoated, and metallic."
      canonical="https://pantoneconverter.com/pantone-to-cmyk/"
      seoH2="What is Pantone to CMYK Conversion?"
      seoText={[
        `When a designer receives a Pantone PMS color specification — such as "Pantone 485 C" for a brand red — they often need to convert it into CMYK process values so the color can be reproduced on a standard four-color offset or digital press. CMYK (Cyan, Magenta, Yellow, Key/Black) represents how percentages of each ink combine to approximate the target color.`,
        `It's important to understand that this conversion is an approximation. Pantone spot colors are pre-mixed specialty inks, while CMYK uses overlapping halftone dots. Highly saturated or vivid Pantone colors — especially bright oranges, greens, and violets — often fall outside the CMYK gamut and cannot be perfectly reproduced. However, knowing the nearest CMYK breakdown helps printers set ink densities and allows designers to predict how a brand color will appear in four-color process printing.`,
      ]}
    />
  );
}
