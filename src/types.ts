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

interface SpatialDomain {
  enabled: boolean;
  domains: string[];
  limitPinningToDomain: boolean;
}

interface SearchEngine {
  enabled: boolean;
  keywords: string[];
}

interface ScapeOwnershipLabel {
  ownerName: string;
  ownerUrl: string;
}

interface Template {
  isTemplate: boolean;
}

interface View {
  level: string;
  users: string[];
  _id: string;
}

export interface IScape {
  spatialDomain: SpatialDomain;
  searchEngine: SearchEngine;
  scapeOwnershipLabel: ScapeOwnershipLabel;
  template: Template;
  _id: string;
  owner: string;
  scapeTitle: string;
  about: string;
  category: string;
  objectClass: string[];
  objectApplication: string[];
  view: View;
  pinComments: View;
  pinObjects: View;
  scapeIcon: string;
}