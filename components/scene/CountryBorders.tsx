"use client";

import { GeoJsonLines } from "./GeoJsonLines";
import { COLORS, GLOBE } from "@/lib/constants";

type CountryBordersProps = {
  radius: number;
};

export function CountryBorders({ radius }: CountryBordersProps) {
  return (
    <GeoJsonLines
      url="/data/ne_50m_admin_0_countries.geojson"
      radius={radius}
      color={COLORS.accentCyan}
      opacity={GLOBE.borderOpacity}
    />
  );
}
