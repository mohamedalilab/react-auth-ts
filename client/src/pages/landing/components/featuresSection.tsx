import React from "react";
import FeatureCard from "./featureCard";

export type Feature = {
  icon: string;
  title: string;
  description: string;
};

const featuresData: Feature[] = [
  {
    icon: "🔐",
    title: "Authentication",
    description: "Secure login and registration with JWT tokens",
  },
  {
    icon: "🔄",
    title: "Token Refresh",
    description: "Automatic token refresh for seamless user experience",
  },
  {
    icon: "🛡️",
    title: "Protected Routes",
    description: "Role-based access control for different user types",
  },
  {
    icon: "📝",
    title: "CRUD Operations",
    description: "Full Create, Read, Update, Delete functionality",
  },
];

function FeaturesSection(): React.JSX.Element {
  return (
    <section className="landing-features w-full grid grid-auto-md gap-5 md:gap-7">
      {featuresData.map((feature: Feature) => (
        <FeatureCard key={feature.title} feature={feature} />
      ))}
    </section>
  );
}

export default FeaturesSection;
