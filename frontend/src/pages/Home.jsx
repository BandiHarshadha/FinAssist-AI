import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import Categories from "../components/home/Categories";
import Features from "../components/home/Features";
import ChatPreview from "../components/home/ChatPreview";
import CTA from "../components/home/CTA";
import Footer from "../components/layout/Footer";

function Home() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <Navbar />
      <Hero />
      <Categories />
      <Features />
      <ChatPreview />
      <CTA />
      <Footer />
    </div>
  );
}

export default Home;