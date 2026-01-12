import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  preload: false,
});

export const metadata = {
  title: "Create Next App",
  description: "Prueba tecnica",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className}>
      <body >
        {children}
      </body>
    </html>
  );
}
