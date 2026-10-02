export interface SchoolPin {
  id: number;
  nameEn: string;
  nameKh: string;
  latitude: number;
  longitude: number;
  province: string;
  hideFromMap?: boolean;
}
export function validSchoolPin(s: SchoolPin): boolean {
  return (
    !s.hideFromMap &&
    Number.isFinite(s.latitude) &&
    Number.isFinite(s.longitude) &&
    s.latitude >= -90 &&
    s.latitude <= 90 &&
    s.longitude >= -180 &&
    s.longitude <= 180
  );
}
