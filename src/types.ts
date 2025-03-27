export interface ILogin {
  emailOrByteId: string;
  password: string;
}

export interface IRegisterRequest {
  email: string;
  password: string; // Remember to avoid storing passwords in plain text.
  firstName: string;
  lastName: string;
  phoneNumber: string; // Consider using a specific phone number type if needed.
  address: string;
  country: string;
  dob: string; // Consider using a Date type for proper date handling.
  photo: string; // Consider a URL type for stricter validation.
}

export interface IRegister extends IRegisterRequest {
  confirmPassword: string;
}

// Base types for common structures
type UserId = string;
type NucleusId = string;

// Permission level type
type PermissionLevel = "public" | "admin" | 'selected';

// Base interface for permission objects
interface PermissionConfig {
  level: PermissionLevel;
  users: UserId[];
}

// Spatial domain configuration
interface SpatialDomainConfig {
  enabled: string;  // Using string to match the original structure
  domains: string[];
  limitPinningToDomain: boolean;
}

// Search engine configuration
interface SearchEngineConfig {
  enabled: boolean;
  keyword: string[];
}

// Ownership label configuration
interface ScapeOwnershipLabel {
  ownerName: string;
  ownerUrl: string;
}

// Main scape state interface
export interface IScapeState {
  scapeTitle: string;
  about: string;
  category: string;
  objectClass: NucleusId[];
  objectApplication: NucleusId[];
  view: PermissionConfig;
  pinComments: PermissionConfig;
  pinObjects: PermissionConfig;
  spatialDomain: SpatialDomainConfig;
  searchEngine: SearchEngineConfig;
  comment: boolean;
  scapeIcon: string;
  scapeOwnershipLabel: ScapeOwnershipLabel;
}



interface ScapeOwnershipLabel {
  ownerName: string;
  ownerUrl: string;
}



export interface ScapeOwner {
  name?: string;
  link?: string;
}

interface INucleus {
  _id: string;
  userId: string;
  primaryNature: string;
  category: string;
  parentTemplate: string;
  title: string;
  description: string;
  mobilityType: string;
  icon: {
    url: string;
    publicId: string;
  }
}

export interface ScapeObject {
  nucleus: INucleus;
  objectFunctions: string[];
  pinAccess?: 'public' | 'private' | 'admins';
  users?: string[];
}

export interface IImage {
  url: string;
  publicId: string; 
}

export interface IScape {
  _id: string;
  title: string;
  description: string;
  category: string;
  owner?: ScapeOwner;
  enableSearchEngine: boolean;
  keywords: string[];
  viewingAccess: 'public' | 'private' | 'admins' | string;
  commentAccess: 'disabled' | 'public' | 'private' | 'admins' | string;
  admins: string[];
  objects: ScapeObject[];
  geometry: {
    type: 'Point' | 'LineString' | 'Polygon' | 'MultiPoint' | 'MultiLineString' | 'MultiPolygon' | 'GeometryCollection';
    coordinates: number[][];
  },
  icon: IImage;
  user: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
  }
}