import '../app/styles/globals.css';
import type { AppProps } from 'next/app';
import RootLayout from './layout';
import { Poppins } from 'next/font/google';

const font = Poppins({
    subsets: ['latin'],
    weight: ['700'],
});

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <RootLayout className={font.className}>
            <Component {...pageProps} />
        </RootLayout>
    );
}

export default MyApp;
