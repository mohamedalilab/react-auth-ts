import React from "react";

interface HeroSectionProps {
  children: React.ReactNode;
}

function HeroSection({ children }: HeroSectionProps): React.JSX.Element {
  return (
    <section className="landing-hero text-center mb-10">
      <h1 className="sm:text-5xl sm:mb-4 text-2xl text-main-black font-bold mb-2">
        Welcome to MyApp
      </h1>
      <p className="sm:text-xl text-sm text-alt-black leading-main mb-8 ">
        Practice project for React, Authentication, CRUD operations, and
        Protected Routes
      </p>
      {children}
    </section>
  );
}

export default HeroSection;
