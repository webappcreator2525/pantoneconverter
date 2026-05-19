import '../styles/globals.css';
import { FavoritesProvider } from '../lib/FavoritesContext';

export default function App({ Component, pageProps }) {
  return (
    <FavoritesProvider>
      <Component {...pageProps} />
    </FavoritesProvider>
  );
}
