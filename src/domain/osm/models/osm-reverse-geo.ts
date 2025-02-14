export interface OsmReverseGeoResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  class: string;
  type: string;
  place_rank: number;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: OsmAddress;
  boundingbox: string[];
}

export interface OsmAddress {
  building: string;
  house_number: string;
  road: string;
  quarter: string;
  suburb: string;
  town: string;
  city: string;
  "ISO3166-2-lvl4": string;
  postcode: string;
  country: string;
  country_code: string;
}
