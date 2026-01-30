
export interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
}

export interface PermitReport {
  id: string;
  query: string;
  content: string;
  timestamp: number;
  sources: GroundingChunk[];
}

export interface UserLocation {
  latitude: number;
  longitude: number;
}
