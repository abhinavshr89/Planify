import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { shadesOfPurple } from "@clerk/themes";
import Header from "@/components/header";
import { Toaster } from "sonner";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Planify",
  description: "Zcrum is a simple project management tool.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
        variables:{
          colorPrimary:"#3b82f6",
          colorBackground:"#1a202c",
          colorInputBackground:"#2d3748",
          colorInputText:"#F3F4F6",
        },
        elements:{
          formButtonPrimary:"bg-purple-600 hover:bg-purple-700 text-white",
          card:"bg-gray-800",
          headerTitle:"text-blue-400",
          headerSubtitle:"text-gray-400",
        }
      }}
    >
      <html lang="en">
        <body className={`${poppins.className} animated-dotted-background `}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Header />

            <main className="min-h-screen">{children}</main>
            <Toaster richColors />
            <footer className="bg-gray-900 py-12">
              <div className="container mx-auto px-4 text-center text-gray-200">
                <p>This is my first NEXTjs Project</p>
              </div>
            </footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
