import "@/app/_styles/globals.css"
import Header from  "@/app/_components/Header/Header"
import Footer from "@/app/_components/Footer/Footer"

export const metadata = {
  title: {
    template: "%s",
    default: "MRJ Trade"
  },
  description: "MRJ Trade in UAE"
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Header />
        <main className="w-full bg-white">{children}</main>
        <Footer />
      </body>
    </html>
  );
}