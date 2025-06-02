import AnimateOnView from "@/components/animation";
import Navbar from "@/components/navbar";
import FloatingNavbar from "@/components/floating-navbar";
import Footer from "@/components/footer";

export default function RootTemplate({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AnimateOnView className="relative px-11 transition-[padding] duration-300 sm:px-12 md:px-16 lg:px-24 xl:px-32">
      <Navbar />
      <FloatingNavbar />
      <div className="pb-[80px] *:min-h-[calc(100dvh-160px)]">{children}</div>
      <span className="absolute right-0 bottom-2 left-0 -z-40 h-6 max-w-dvw bg-[#D9D9D9]/40 blur-[100px]" />
      <Footer />
    </AnimateOnView>
  );
}
