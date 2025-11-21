import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Header } from "@/components/sections/Header";
import { AirdropList } from "@/components/sections/AirdropList";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Blog } from "@/components/sections/Blog";
import { FAQ } from "@/components/sections/FAQ";
import { Footer } from "@/components/layout/Footer";
import { getAirdrops } from "@/services/airdrop-service";
import { getPosts } from "@/services/blog-service";

export default async function Page({ params }) {
  const { locale } = await params;
  const airdrops = await getAirdrops(locale);
  const posts = await getPosts(locale);

  return (
    <div>
      <Navbar />
      <Header />
      <AirdropList airdrops={airdrops} />
      <HowItWorks />
      <Blog posts={posts} />
      <FAQ />
      <Footer />
    </div>
  );
}
