import { ThemeProvider } from "@/context/theme";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>

            {children}

        </ThemeProvider>
      </body>
    </html>
  );
}
