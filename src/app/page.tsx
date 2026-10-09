import { Hero } from "@/components/hero/Hero";
import { DiscoverPage } from "@/components/discover/DiscoverPage";

export default function Home() {
  return (
    <main>
      <Hero />
      <div id="discover">
        <DiscoverPage hideNavbar />
      </div>
    </main>
  );
}