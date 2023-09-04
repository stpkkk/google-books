import "./globals.css";

export const metadata = {
  title: "Google Books",
  description: "Google Books API",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
