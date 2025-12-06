import "./globals.css";

export const metadata = {
  title: "VTaranya",
  description: "Nature reporting system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/** Header + nav will render on all pages; inside main we can protect routes separately */}
        {children}
        {/* Footer can be global; alternatively show only on main */}
      </body>
    </html>
  );
}
