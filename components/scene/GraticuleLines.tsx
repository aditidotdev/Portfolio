"use client";

import { GeoJsonLines } from "./GeoJsonLines";
import { COLORS, GLOBE } from "@/lib/constants";

type GraticuleLinesProps = {
  radius: number;
};

export function GraticuleLines({ radius }: GraticuleLinesProps) {
  return (
    <GeoJsonLines
      url="/data/ne_110m_graticules_30.geojson"
      radius={radius}
      color={COLORS.accentCyan}
      opacity={GLOBE.graticuleOpacity}
    />
  );
}
