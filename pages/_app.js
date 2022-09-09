import { useContext } from 'react';
import { ThemeContext, ThemeProvider } from '../context/theme';
import TopNav from '../components/TopNav';
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <TopNav />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
export default MyApp;
