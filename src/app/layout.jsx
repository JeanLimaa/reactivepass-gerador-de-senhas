import { Poppins } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer" ;
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "ReactivePass",
  description: "Gerador de senhas seguras.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <AuthProvider>
        <body className={`${poppins.className}`}>
          <Header  />
          {children}
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
