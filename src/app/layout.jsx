import { Poppins } from "next/font/google";
import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";
import Head from "next/head";

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
 {/*      <head>
        <meta name="author" content="Jean Lima" />
        <meta name="language" content="pt-BR" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:locale" content="pt-BR" />
        <meta property="og:title" content="Título da Página" />
        <meta property="og:description" content="Descrição da Página" />
        <meta property="og:image" content="URL da Imagem" />
        <meta property="og:url" content="URL da Página" />
      </head> */}
      <AuthProvider>
        <body className={`${poppins.className}`}>
          <Header />
          {children}
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
