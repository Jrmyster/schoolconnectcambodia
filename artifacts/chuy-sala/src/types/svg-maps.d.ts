declare module '@svg-maps/cambodia' {
  const map: any;
  export default map;
}

declare module 'react-svg-map' {
  import * as React from 'react';
  export interface SVGMapProps {
    map: any;
    className?: string;
    role?: string;
    locationClassName?: string | ((location: any, index: number) => string);
    locationTabIndex?: string | ((location: any, index: number) => string);
    locationRole?: string;
    onLocationMouseOver?: (event: any) => void;
    onLocationMouseOut?: (event: any) => void;
    onLocationMouseMove?: (event: any) => void;
    onLocationClick?: (event: any) => void;
    onLocationKeyDown?: (event: any) => void;
    onLocationFocus?: (event: any) => void;
    onLocationBlur?: (event: any) => void;
    isLocationSelected?: (location: any, index: number) => boolean;
    childrenBefore?: React.ReactNode;
    childrenAfter?: React.ReactNode;
  }
  export const SVGMap: React.FC<SVGMapProps>;
}
