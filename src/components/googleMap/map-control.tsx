import { ControlPosition, MapControl } from '@vis.gl/react-google-maps';
import { AutocompleteCustomHybrid } from './autocomplete-custom-hybrid';

type CustomAutocompleteControlProps = {
  controlPosition: ControlPosition;
  setSelectedPosition: (position: { lat: number; lng: number }) => void;
};

export const CustomMapControl = ({
  controlPosition,
  setSelectedPosition,
}: CustomAutocompleteControlProps) => (
  <MapControl position={controlPosition}>
    <AutocompleteCustomHybrid setSelectedPosition={setSelectedPosition} />
  </MapControl>
);
