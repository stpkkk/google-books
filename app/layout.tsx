import "./globals.css";
import { AppHeader } from "@/components";

export const metadata = {
  title: "Google Books",
  description: "Google Books API",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ru">
      <body>
        <AppHeader />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
