import './globals.css';
import { Providers } from './providers';
import { AppHeader } from '@/components';

export const metadata = {
  title: 'Google Books',
  description: 'Google Books API',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang='ru'>
      <body>
        <Providers>
          <AppHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
