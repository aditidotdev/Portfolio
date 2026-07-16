"use client";

import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { geoJsonToBorderGeometry, type GeoJsonData } from "@/lib/geo";
import { GLOBE } from "@/lib/constants";

type GeoJsonLinesProps = {
  url: string;
  radius: number;
  color?: string;
  opacity?: number;
};

export function GeoJsonLines({
  url,
  radius,
  color = "#22d3ee",
  opacity = 0.75,
}: GeoJsonLinesProps) {
  const rawData = useLoader(THREE.FileLoader, url) as string;

  const geometry = useMemo(() => {
    const geojson = JSON.parse(rawData) as GeoJsonData;
    return geoJsonToBorderGeometry(
      geojson,
      radius + GLOBE.borderOffset
    );
  }, [rawData, radius]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </lineSegments>
  );
}
