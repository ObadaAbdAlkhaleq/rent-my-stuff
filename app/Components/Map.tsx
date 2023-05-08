'use client';

import L from "leaflet";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

interface MapProps {
  center?: number[];
}

const Map: React.FC<MapProps> = ({ center }) => {
  return (

    <MapContainer
      center={ center as L.LatLngExpression || [ 31.95586995, +35.2703 ] }
      zoom={ center ? 10.5 : 8 }
      scrollWheelZoom={ true }
      // zoomDelta={.01}
      className="h-[35vh] p-5 rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      { center && (
        <Marker
          position={ center as L.LatLngExpression }
        />
      ) }
    </MapContainer>
  );
};
// TODO: CHANGE FROM GLOBAL TO LOCAL ATTEMPT WITH LEAFLET CONTROL GEOCODER
export default Map;