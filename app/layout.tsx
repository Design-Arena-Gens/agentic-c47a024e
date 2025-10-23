import './globals.css';
import type { Metadata } from 'next';
import { Open_Sans, Roboto } from 'next/font/google';
import { ThemeProvider } from '../providers/ThemeProvider';
import { BottomNav } from '../components/BottomNav';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

const roboto = Roboto({ subsets: ['latin'], weight: ['400','500','700'], variable: '--font-roboto' });
const openSans = Open_Sans({ subsets: ['latin'], weight: ['400','600','700'], variable: '--font-open-sans' });

export const metadata: Metadata = {
  title: 'NewsFlow',
  description: 'Social news platform for reading and discussion',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${openSans.variable}`}> 
      <body className="min-h-screen bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <Header />
              <main id="main" className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-24" role="main">
                {children}
              </main>
              <BottomNav />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
