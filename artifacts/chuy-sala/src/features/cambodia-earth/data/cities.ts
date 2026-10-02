import type { Text } from './places';
import type { Coordinate } from '../lib/geography';
export interface City { id:string; name:Text; province:Text; coordinate:Coordinate; radiusKm:number; population:number; features:Text; }
// Population refers to the province/municipality, not an invented urban-area estimate.
// NIS General Population Census 2019, final results.
export const cities:City[]=[
 {id:'phnom-penh',name:{en:'Phnom Penh',km:'ភ្នំពេញ'},province:{en:'Phnom Penh municipality',km:'រាជធានីភ្នំពេញ'},coordinate:[104.9282,11.5564],radiusKm:18,population:2281951,features:{en:'Royal Palace, Central Market, riverside avenues and the Mekong–Tonle Sap confluence.',km:'ព្រះបរមរាជវាំង ផ្សារធំថ្មី មហាវិថីមាត់ទន្លេ និងចំណុចប្រសព្វទន្លេមេគង្គ–ទន្លេសាប។'}},
 {id:'siem-reap',name:{en:'Siem Reap',km:'សៀមរាប'},province:{en:'Siem Reap province',km:'ខេត្តសៀមរាប'},coordinate:[103.8448,13.3671],radiusKm:12,population:1014234,features:{en:'Pub Street, Old Market, Siem Reap River and the gateway to Angkor.',km:'ផាប់ស្ទ្រីត ផ្សារចាស់ ស្ទឹងសៀមរាប និងច្រកចូលទៅអង្គរ។'}},
 {id:'battambang',name:{en:'Battambang',km:'បាត់ដំបង'},province:{en:'Battambang province',km:'ខេត្តបាត់ដំបង'},coordinate:[103.2022,13.0957],radiusKm:10,population:997169,features:{en:'Central Market, Sangker River and the historic city-center street network.',km:'ផ្សារណាត់ ស្ទឹងសង្កែ និងបណ្តាញផ្លូវក្នុងមជ្ឈមណ្ឌលទីក្រុងប្រវត្តិសាស្ត្រ។'}},
 {id:'kampong-chhnang',name:{en:'Kampong Chhnang',km:'កំពង់ឆ្នាំង'},province:{en:'Kampong Chhnang province',km:'ខេត្តកំពង់ឆ្នាំង'},coordinate:[104.6667,12.25],radiusKm:9,population:527027,features:{en:'National Road 5, local markets, pottery communities and the Tonle Sap riverside.',km:'ផ្លូវជាតិលេខ៥ ផ្សារក្នុងតំបន់ សហគមន៍ផលិតឆ្នាំងដី និងមាត់ទន្លេសាប។'}},
 {id:'kratie',name:{en:'Kratié',km:'ក្រចេះ'},province:{en:'Kratié province',km:'ខេត្តក្រចេះ'},coordinate:[106.0188,12.4883],radiusKm:9,population:374755,features:{en:'Mekong riverfront, central market and the town’s riverside road network.',km:'មាត់ទន្លេមេគង្គ ផ្សារកណ្តាល និងបណ្តាញផ្លូវមាត់ទន្លេក្នុងទីក្រុង។'}},
];
export const CENSUS_URL='https://www.nis.gov.kh/nis/Census2019/Final-Leaflet-Census-Report-2019-Eng.pdf';
