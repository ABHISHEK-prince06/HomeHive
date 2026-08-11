import { useState } from 'react';
import { Circle, MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const greenIcon = L.divIcon({
  className: 'custom-map-marker',
  html: '<div class="map-pin map-pin--green"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const blueIcon = L.divIcon({
  className: 'custom-map-marker',
  html: '<div class="map-pin map-pin--blue"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

export default function MapView({ center, providers, radius }) {
  const safeProviders = Array.isArray(providers) ? providers : [];
  const [hoveredProvider, setHoveredProvider] = useState(null);

  return (
    <div className="relative">
      <MapContainer center={center} zoom={13} scrollWheelZoom={false} className="h-[28rem] w-full rounded-[1.5rem]">
        <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center} icon={blueIcon}>
          <Popup>Your location</Popup>
        </Marker>

        {radius > 0 && <Circle center={center} radius={radius} pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.12, weight: 2 }} />}

        {safeProviders.map((provider, index) => {
          const item = provider && provider.role ? provider : provider.provider;
          const coordinates = item?.location || [76.966, 11.015];
          const position = Array.isArray(coordinates) ? coordinates : [coordinates[1], coordinates[0]];

          return (
            <Marker
              key={item?.id || item?._id || index}
              position={position}
              icon={greenIcon}
              eventHandlers={{
                mouseover: () => setHoveredProvider(item),
                mouseout: () => setHoveredProvider(null),
              }}
            >
              <Popup>
                <div className="space-y-1">
                  <strong>{item?.name || item?.userId?.name || 'Professional'}</strong>
                  <div>{item?.role || item?.serviceRoles?.[0] || 'Service Provider'}</div>
                  <div>₹{item?.hourlyRate || item?.provider?.hourlyRate || 350}/hr</div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      {hoveredProvider && (
        <div className="absolute left-4 top-4 z-[500] max-w-[240px] rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
          <div className="flex items-center gap-3">
            <img src={hoveredProvider.image} alt={hoveredProvider.name} className="h-10 w-10 rounded-xl object-cover" />
            <div>
              <p className="text-sm font-semibold text-slate-900">{hoveredProvider.name}</p>
              <p className="text-[11px] text-slate-500">{hoveredProvider.role}</p>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-slate-600">
            <span>★ {hoveredProvider.rating}</span>
            <span>{hoveredProvider.distance}m away</span>
          </div>
          <div className="mt-2 text-[11px] font-semibold text-emerald-700">₹{hoveredProvider.hourlyRate}/hr</div>
        </div>
      )}
    </div>
  );
}
