"use client";

import { useMemo } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { geoJsonToFillGeometry, type GeoJsonData } from "@/lib/geo";
import { COLORS, GLOBE } from "@/lib/constants";

type CountryFillProps = {
  radius: number;
};

export function CountryFill({ radius }: CountryFillProps) {
  const rawData = useLoader(
    THREE.FileLoader,
    "/data/ne_50m_admin_0_countries.geojson"
  ) as string;

  const geometry = useMemo(() => {
    const geojson = JSON.parse(rawData) as GeoJsonData;
    return geoJsonToFillGeometry(
      geojson,
      radius - GLOBE.fillOffset
    );
  }, [rawData, radius]);

  return (
    <mesh geometry={geometry}>
      <meshBasicMaterial
        color={COLORS.landFill}
        transparent
        opacity={GLOBE.landFillOpacity}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
