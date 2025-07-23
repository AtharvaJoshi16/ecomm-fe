import { ReactNode } from "react";
import { Header } from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <Header />
      {children}
    </div>
  );
}
