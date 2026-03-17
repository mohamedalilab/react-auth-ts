import React from "react";
import { Feature } from "./featuresSection";

interface FeatureCardProps {
  feature: Feature;
}
function FeatureCard({ feature }: FeatureCardProps): React.JSX.Element {
  return (
    <div className="feature-card card card-hover">
      <h3 className="text-lg text-main-black mb-2 md:text-2xl md:mb-4">{`${feature.icon} ${feature.title}`}</h3>
      <p className="text-sm text-alt-black leading-main md:text-lg">
        {feature.description}
      </p>
    </div>
  );
}

export default FeatureCard;
