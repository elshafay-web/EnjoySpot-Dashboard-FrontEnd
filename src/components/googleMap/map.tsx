import {
  APIProvider,
  ControlPosition,
  AdvancedMarker,
  Map,
} from '@vis.gl/react-google-maps';
import { CustomMapControl } from './map-control';
import '../../style/googleMapStye.scss';

const GOOGLE_MAP_API_KEY = 'AIzaSyDcBNvhTn41CVismsIzNM3Fr7ztlE73DRc';

type Props = {
  zoom: number;
  selectedPosition: { lat: number; lng: number };
  setSelectedPosition: (position: { lat: number; lng: number }) => void;
};

export default function GoogleMapWithSearch({
  zoom,
  selectedPosition,
  setSelectedPosition,
}: Props) {
  return (
    <div className="max-h-[700px] min-h-[700px]">
      <APIProvider apiKey={GOOGLE_MAP_API_KEY}>
        <Map
          defaultZoom={zoom}
          defaultCenter={selectedPosition}
          center={selectedPosition}
          gestureHandling="greedy"
          disableDefaultUI
          mapId="bf51a910020fa25a"
          className="max-h-[700px] min-h-[700px] h-[700px] w-full"
          fullscreenControl
          streetViewControl
          mapTypeControl
          zoomControl
          scaleControl
        >
          <AdvancedMarker
            position={{
              lat: selectedPosition.lat,
              lng: selectedPosition.lng,
            }}
          />
        </Map>

        <CustomMapControl
          controlPosition={ControlPosition.TOP}
          setSelectedPosition={setSelectedPosition}
        />
      </APIProvider>
    </div>
  );
}