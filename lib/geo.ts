import earcut from "earcut";
import * as THREE from "three";

type Position = [number, number];
type Ring = Position[];
type PolygonCoords = Ring[];
type MultiPolygonCoords = PolygonCoords[];

type GeoGeometry = {
  type: string;
  coordinates: unknown;
};

type GeoFeature = {
  geometry: GeoGeometry;
};

export type GeoJsonData = {
  type: string;
  features?: GeoFeature[];
  geometry?: GeoGeometry;
};

function latLngToVector3(
  lat: number,
  lng: number,
  radius: number
): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

const SURFACE_NORMAL = new THREE.Vector3(0, 0, 1);

export function latLngToSurfaceTransform(
  lat: number,
  lng: number,
  radius: number
): { position: THREE.Vector3; quaternion: THREE.Quaternion } {
  const position = latLngToVector3(lat, lng, radius);
  const normal = position.clone().normalize();
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    SURFACE_NORMAL,
    normal
  );
  return { position, quaternion };
}

function ringLngSpan(ring: Ring): number {
  let minLng = Infinity;
  let maxLng = -Infinity;
  for (const [lng] of ring) {
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
  }
  return maxLng - minLng;
}

function triangulatePolygon(
  rings: PolygonCoords,
  radius: number,
  positions: number[],
  indices: number[]
) {
  if (!rings.length || rings[0].length < 3) return;

  const outerRing = rings[0];
  if (ringLngSpan(outerRing) > 340) return;

  const flatCoords: number[] = [];
  const holeIndices: number[] = [];

  for (let r = 0; r < rings.length; r++) {
    const ring = rings[r];
    if (ring.length < 3) continue;
    if (r > 0) {
      holeIndices.push(flatCoords.length / 2);
    }
    for (const [lng, lat] of ring) {
      flatCoords.push(lng, lat);
    }
  }

  if (flatCoords.length < 6) return;

  const triangleIndices = earcut(flatCoords, holeIndices);
  const vertexOffset = positions.length / 3;

  for (let i = 0; i < flatCoords.length; i += 2) {
    const lng = flatCoords[i];
    const lat = flatCoords[i + 1];
    const vertex = latLngToVector3(lat, lng, radius);
    positions.push(vertex.x, vertex.y, vertex.z);
  }

  for (const index of triangleIndices) {
    indices.push(vertexOffset + index);
  }
}

function processFillGeometry(
  geometry: GeoGeometry,
  radius: number,
  positions: number[],
  indices: number[]
) {
  const { type, coordinates } = geometry;

  if (type === "Polygon") {
    triangulatePolygon(coordinates as PolygonCoords, radius, positions, indices);
    return;
  }

  if (type === "MultiPolygon") {
    for (const polygon of coordinates as MultiPolygonCoords) {
      triangulatePolygon(polygon, radius, positions, indices);
    }
  }
}

function addLineRing(
  ring: Ring,
  radius: number,
  positions: number[],
  closeRing: boolean
) {
  if (ring.length < 2) return;

  for (let i = 0; i < ring.length - 1; i++) {
    const [lng1, lat1] = ring[i];
    const [lng2, lat2] = ring[i + 1];
    const start = latLngToVector3(lat1, lng1, radius);
    const end = latLngToVector3(lat2, lng2, radius);
    positions.push(start.x, start.y, start.z, end.x, end.y, end.z);
  }

  if (closeRing) {
    const [lng1, lat1] = ring[ring.length - 1];
    const [lng2, lat2] = ring[0];
    const start = latLngToVector3(lat1, lng1, radius);
    const end = latLngToVector3(lat2, lng2, radius);
    positions.push(start.x, start.y, start.z, end.x, end.y, end.z);
  }
}

function processBorderGeometry(
  geometry: GeoGeometry,
  radius: number,
  positions: number[]
) {
  const { type, coordinates } = geometry;

  if (type === "LineString") {
    addLineRing(coordinates as Ring, radius, positions, false);
    return;
  }

  if (type === "MultiLineString") {
    for (const line of coordinates as Ring[]) {
      addLineRing(line, radius, positions, false);
    }
    return;
  }

  if (type === "Polygon") {
    for (const ring of coordinates as PolygonCoords) {
      addLineRing(ring, radius, positions, true);
    }
    return;
  }

  if (type === "MultiPolygon") {
    for (const polygon of coordinates as MultiPolygonCoords) {
      for (const ring of polygon) {
        addLineRing(ring, radius, positions, true);
      }
    }
  }
}

export function geoJsonToFillGeometry(
  geojson: GeoJsonData,
  radius: number
): THREE.BufferGeometry {
  const positions: number[] = [];
  const indices: number[] = [];

  if (geojson.features) {
    for (const feature of geojson.features) {
      processFillGeometry(feature.geometry, radius, positions, indices);
    }
  } else if (geojson.geometry) {
    processFillGeometry(geojson.geometry, radius, positions, indices);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  geometry.setIndex(indices);
  return geometry;
}

export function geoJsonToBorderGeometry(
  geojson: GeoJsonData,
  radius: number
): THREE.BufferGeometry {
  const positions: number[] = [];

  if (geojson.features) {
    for (const feature of geojson.features) {
      processBorderGeometry(feature.geometry, radius, positions);
    }
  } else if (geojson.geometry) {
    processBorderGeometry(geojson.geometry, radius, positions);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  return geometry;
}
