import "~/styles/globals.css"

import { type Metadata } from "next"

import { TRPCReactProvider } from "~/trpc/react"
import { ClerkProvider } from "@clerk/nextjs"
import { ThemeProvider } from "~/components/theme-provider"
import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin"
import { extractRouterConfig } from "uploadthing/server"
import { fileRouter } from "~/uploadthing/file-router"

export const metadata: Metadata = {
  title: "Escape Room",
  description:
    "Design, build, and customize immersive escape rooms with our powerful Escape Room Builder. Create puzzles, add interactive objects, and bring your escape room ideas to life effortlessly! 🚀",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className="font-body" suppressHydrationWarning>
        <body>
          <NextSSRPlugin routerConfig={extractRouterConfig(fileRouter)} />
          <TRPCReactProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </TRPCReactProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
