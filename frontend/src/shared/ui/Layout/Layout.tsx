import type { ReactNode } from "react";
import { Header } from "../../../widgets/Header";
import { Footer } from "../../../widgets/Footer";
import styles from './Layout.module.css'

interface LayoutProps {
  children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

