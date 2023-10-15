import { ThemeProvider } from "@/components/providers/theme-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils"
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { Toaster, toast } from 'sonner';
import { TooltipProvider } from "@/components/ui/tooltip";
import { ModalProvider } from "@/components/providers/modal-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nukotion",
  description: "El espacio de trabajo donde las cosas suceden",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={cn("dark:dark:bg-[#1f1f1f]", inter.className)}>
        <ConvexClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="nukotion-theme"
          >
            <Toaster position="bottom-center" />
            <TooltipProvider>
              <ModalProvider />
              {children}
            </TooltipProvider>
          </ThemeProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
