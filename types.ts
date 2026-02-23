export interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: number;
  image?: string; // Base64 string for the image
}

export interface CatalogItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  gallery?: CatalogImage[];
}

export interface CatalogImage {
  src: string;
  title: string;
  description: string;
}

export interface ServiceItem {
  id: number;
  icon: string; // FontAwesome class
  image?: string; // Optional image for the service card
  title: string;
  description: string;
}

// Global definition for marked.js loaded via CDN
declare global {
  interface Window {
    marked: {
      parse: (text: string) => string;
    };
  }
}
