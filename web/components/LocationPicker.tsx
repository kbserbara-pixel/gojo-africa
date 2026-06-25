"use client";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface Props {
  lat: number | null;
  lng: number | null;
  onChange: (lat: number, lng: number) => void;
}

// Default center: Addis Ababa. Free OpenStreetMap tiles via Leaflet -- no API
// key, no Google Cloud billing account needed, click anywhere to drop/move
// the pin and capture lat/lng for the listing.
const DEFAULT_CENTER: [number, number] = [9.03, 38.74];

export default function LocationPicker({ lat, lng, onChange }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  useEffect(() => {
    let map: any;
    (async () => {
      const L = (await import("leaflet")).default;
      if (!mapRef.current || mapInstanceRef.current) return;

      // Leaflet's default marker icon paths break under bundlers -- point
      // them at a CDN instead of relying on local asset resolution.
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const center: [number, number] = lat != null && lng != null ? [lat, lng] : DEFAULT_CENTER;
      map = L.map(mapRef.current).setView(center, lat != null && lng != null ? 15 : 12);
      mapInstanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      if (lat != null && lng != null) {
        markerRef.current = L.marker([lat, lng]).addTo(map);
      }

      map.on("click", (e: any) => {
        const { lat: clickLat, lng: clickLng } = e.latlng;
        if (markerRef.current) {
          markerRef.current.setLatLng([clickLat, clickLng]);
        } else {
          markerRef.current = L.marker([clickLat, clickLng]).addTo(map);
        }
        onChange(Number(clickLat.toFixed(6)), Number(clickLng.toFixed(6)));
      });
    })();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Recenter/move the marker if lat/lng change from outside (e.g. "use my
  // current location" button), without re-creating the whole map.
  useEffect(() => {
    (async () => {
      const L = (await import("leaflet")).default;
      const map = mapInstanceRef.current;
      if (!map || lat == null || lng == null) return;
      if (markerRef.current) {
        markerRef.current.setLatLng([lat, lng]);
      } else {
        markerRef.current = L.marker([lat, lng]).addTo(map);
      }
      map.setView([lat, lng], 15);
    })();
  }, [lat, lng]);

  return <div ref={mapRef} className="w-full h-64 rounded-lg border" />;
}
