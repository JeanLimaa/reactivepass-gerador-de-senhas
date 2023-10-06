import { Poppins } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import AuthProvider from "@/components/AuthProvider";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Head from "@/components/Head/HeadComponent";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "ReactivePass - Gerenciamento e Armazenamento de Senhas",
  description: "Gerenciamento e geração de senhas fortes, de maneira segura. Aqui você pode gerar uma senha personalizavel de maneira fácil e rápida. Além disso, ao registrar uma conta, você poderá armazenar essas senhas aqui mesmo no nosso site.",
  author: "Jean Lima",
  locale: "pt-BR",
  ogUrl: "reactivepass.vercel.app",
  keywords: "senhas, passwords, segurança, senhas fortes, senhas seguras, gerador, gerador de senhas, geração de senhas, gerar senhas, armazenamento de senhas, armazenar senhas, salvar senhas"
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <Head metadata={metadata}/>
      <AuthProvider>
        <body className={`${poppins.className}`}>
          <Header />
          {children}
          <Analytics />
          <Footer />
        </body>
      </AuthProvider>
    </html>
  );
}
