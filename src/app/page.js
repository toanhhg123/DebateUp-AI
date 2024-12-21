"use client";

// components

// sections
import Hero from "./hero.js";
import TopBookCategories from "./top-book-categories.js";
import BackToSchoolBooks from "./back-to-school-books.js";
import OtherBookOffers from "./other-book-offers.js";
import CarouselFeatures from "./carousel-features.js";
import GetYourBookFromUs from "./get-your-book-from-us.js";
import Faq from "./faq.js";

export default function Campaign() {
  return (
    <>
      <Hero />
      <TopBookCategories />
      <BackToSchoolBooks />
      <OtherBookOffers />
      <CarouselFeatures />
      <GetYourBookFromUs />
      <Faq />
    </>
  );
}
