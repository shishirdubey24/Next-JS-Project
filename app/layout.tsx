import "./globals.css";
import { Footer } from "./footer/Footer";
import { Header } from "./header/Header";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import { AuthHydrator } from "./ui-cards/AuthHydration";
export default async function RootLayout({ children }: LayoutProps<"/">) {
  const user = await getCurrentUser();
  console.log("current User", user);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <AuthHydrator user={user} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
