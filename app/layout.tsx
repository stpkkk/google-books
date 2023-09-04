import "./globals.css";
import { AppHeader } from "@/components";
import { Providers } from "./providers";

export const metadata = {
  title: "Google Books",
  description: "Google Books API",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ru">
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
