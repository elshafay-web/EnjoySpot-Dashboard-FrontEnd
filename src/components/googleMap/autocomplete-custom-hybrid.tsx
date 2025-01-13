/* eslint-disable consistent-return */
import { useEffect, useState, useCallback } from 'react';
import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import Combobox from 'react-widgets/Combobox';
import 'react-widgets/styles.css';

interface Props {
  setSelectedPosition: (position: { lat: number; lng: number }) => void;
}

export const AutocompleteCustomHybrid = ({ setSelectedPosition }: Props) => {
  const map = useMap();
  const places = useMapsLibrary('places');
  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();
  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);
  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);
  const [predictionResults, setPredictionResults] = useState<
    Array<google.maps.places.AutocompletePrediction>
  >([]);

  const [inputValue, setInputValue] = useState<string>('');
  const [fetchingData, setFetchingData] = useState<boolean>(false);

  useEffect(() => {
    if (!places || !map) return;
    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());
    return () => setAutocompleteService(null);
  }, [map, places]);

  // const fetchPredictions = useCallback(
  //   async (values: string) => {
  //     if (!autocompleteService || !values) {
  //       return;
  //     }
  //     setFetchingData(true);
  //     const request = { input: values, sessionToken };
  //     const response = await autocompleteService.getPlacePredictions(request);
  //     setPredictionResults(response.predictions);
  //     setFetchingData(false);
  //   },
  //   [autocompleteService, sessionToken],
  // );
  const fetchPredictions = useCallback(
    async (values: string) => {
      if (!autocompleteService || !values) {
        return;
      }
      setFetchingData(true);
      const request = {
        input: values,
        sessionToken,
        componentRestrictions: { country: 'AE' }, // Restrict to UAE
      };
      const response = await autocompleteService.getPlacePredictions(request);
      setPredictionResults(response.predictions);
      setFetchingData(false);
    },
    [autocompleteService, sessionToken],
  );

  const onInputChange = useCallback(
    (value: google.maps.places.AutocompletePrediction | string) => {
      if (typeof value === 'string') {
        setInputValue(value);
        fetchPredictions(value);
      }
    },
    [fetchPredictions],
  );

  // const onSelect = useCallback(
  //   (prediction: google.maps.places.AutocompletePrediction | string) => {
  //     if (!places || typeof prediction === 'string') return;
  //     setFetchingData(true);
  //     const detailRequestOptions = {
  //       placeId: prediction.place_id,
  //       fields: ['geometry', 'name', 'formatted_address'],
  //       sessionToken,
  //     };
  //     const detailsRequestCallback = (
  //       placeDetails: google.maps.places.PlaceResult | null,
  //     ) => {
  //       if (!placeDetails) return;
  //       map?.panTo({
  //         lat: placeDetails?.geometry?.location?.lat() ?? 0,
  //         lng: placeDetails?.geometry?.location?.lng() ?? 0,
  //       });
  //       setSelectedPosition({
  //         lat: placeDetails?.geometry?.location?.lat() ?? 0,
  //         lng: placeDetails?.geometry?.location?.lng() ?? 0,
  //       });
  //       setInputValue(placeDetails?.formatted_address ?? '');
  //       setSessionToken(new places.AutocompleteSessionToken());
  //       setFetchingData(false);
  //     };

  //     placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
  //   },
  //   [places, sessionToken, placesService, map, setSelectedPosition],
  // );
  const onSelect = useCallback(
    (prediction: google.maps.places.AutocompletePrediction | string) => {
      if (!places || typeof prediction === 'string') return;
      setFetchingData(true);
      const detailRequestOptions = {
        placeId: prediction.place_id,
        fields: ['geometry', 'address_components', 'name', 'formatted_address'],
        sessionToken,
      };
      const detailsRequestCallback = (
        placeDetails: google.maps.places.PlaceResult | null,
      ) => {
        if (!placeDetails) return;

        // Check if the place is in UAE
        const isInUAE = placeDetails.address_components?.some(
          (component) => component.short_name === 'AE',
        );

        if (!isInUAE) {
          alert('Please select a location within the UAE.');
          setFetchingData(false);
          return;
        }

        map?.panTo({
          lat: placeDetails?.geometry?.location?.lat() ?? 0,
          lng: placeDetails?.geometry?.location?.lng() ?? 0,
        });
        setSelectedPosition({
          lat: placeDetails?.geometry?.location?.lat() ?? 0,
          lng: placeDetails?.geometry?.location?.lng() ?? 0,
        });
        setInputValue(placeDetails?.formatted_address ?? '');
        setSessionToken(new places.AutocompleteSessionToken());
        setFetchingData(false);
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [places, sessionToken, placesService, map, setSelectedPosition],
  );

  return (
    <div className="autocomplete-container mt-4">
      <Combobox
        placeholder="Search for a place"
        data={predictionResults}
        dataKey="place_id"
        textField="description"
        value={inputValue}
        onChange={onInputChange}
        onSelect={onSelect}
        busy={fetchingData}
        filter={() => true}
        focusFirstItem
        hideEmptyPopup
        hideCaret
      />
    </div>
  );
};
