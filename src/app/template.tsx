import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

export default function RootTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="relative px-11 transition-[padding] duration-300 sm:px-12 md:px-16 lg:px-24 xl:px-32">
      <Navbar />
      <div className="pb-[80px] *:min-h-[calc(100dvh-160px)]">{children}</div>
      <Footer />
      <span className="absolute right-0 bottom-2 left-0 -z-40 h-6 max-w-dvw bg-[#D9D9D9]/40 blur-[100px]" />
    </main>
  );
}
