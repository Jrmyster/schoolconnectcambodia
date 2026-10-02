export type Locale='en'|'km';
export type Text={en:string;km:string};
export type Place={id:string;name:Text;type:Text;coordinate:[number,number];zoom:number;note:Text};
export const provinces: {sourceName:string;name:Text}[] = [
  {sourceName:'Phnom Penh',name:{en:'Phnom Penh',km:'ភ្នំពេញ'}},
  {sourceName:'Bantey Meanchey',name:{en:'Banteay Meanchey',km:'បន្ទាយមានជ័យ'}},
  {sourceName:'Battambang',name:{en:'Battambang',km:'បាត់ដំបង'}},
  {sourceName:'Kampong Cham',name:{en:'Kampong Cham',km:'កំពង់ចាម'}},
  {sourceName:'Kampong Chhnang',name:{en:'Kampong Chhnang',km:'កំពង់ឆ្នាំង'}},
  {sourceName:'Kampong Speu',name:{en:'Kampong Speu',km:'កំពង់ស្ពឺ'}},
  {sourceName:'Kampong Thom',name:{en:'Kampong Thom',km:'កំពង់ធំ'}},
  {sourceName:'Kampot',name:{en:'Kampot',km:'កំពត'}},
  {sourceName:'Kandal',name:{en:'Kandal',km:'កណ្ដាល'}},
  {sourceName:'Koh Kong',name:{en:'Koh Kong',km:'កោះកុង'}},
  {sourceName:'Kratie',name:{en:'Kratié',km:'ក្រចេះ'}},
  {sourceName:'Mondulkiri',name:{en:'Mondulkiri',km:'មណ្ឌលគិរី'}},
  {sourceName:'Oddar Meanchey',name:{en:'Oddar Meanchey',km:'ឧត្ដរមានជ័យ'}},
  {sourceName:'Pailin',name:{en:'Pailin',km:'ប៉ៃលិន'}},
  {sourceName:'Preah Sihanouk',name:{en:'Preah Sihanouk',km:'ព្រះសីហនុ'}},
  {sourceName:'Preah Vihear',name:{en:'Preah Vihear',km:'ព្រះវិហារ'}},
  {sourceName:'Pursat',name:{en:'Pursat',km:'ពោធិ៍សាត់'}},
  {sourceName:'Prey Veng',name:{en:'Prey Veng',km:'ព្រៃវែង'}},
  {sourceName:'Ratanakiri Province',name:{en:'Ratanakiri',km:'រតនគិរី'}},
  {sourceName:'Siem Reap',name:{en:'Siem Reap',km:'សៀមរាប'}},
  {sourceName:'Stung Treng',name:{en:'Stung Treng',km:'ស្ទឹងត្រែង'}},
  {sourceName:'Svay Rieng',name:{en:'Svay Rieng',km:'ស្វាយរៀង'}},
  {sourceName:'Takeo',name:{en:'Takéo',km:'តាកែវ'}},
  {sourceName:'Kep',name:{en:'Kep',km:'កែប'}},
  {sourceName:'Tbong Khmum',name:{en:'Tboung Khmum',km:'ត្បូងឃ្មុំ'}},
];
export const places:Place[]=[
 {id:'phnom-penh',name:{en:'Phnom Penh',km:'ភ្នំពេញ'},type:{en:'Capital & river confluence',km:'រាជធានី និងប្រសព្វទន្លេ'},coordinate:[104.9282,11.5564],zoom:10,note:{en:'Explore the meeting of the Mekong, Tonle Sap and Bassac rivers. Find the low, flat land around the capital.',km:'ស្វែងយល់ពីប្រសព្វទន្លេមេគង្គ ទន្លេសាប និងទន្លេបាសាក់។ សង្កេតដីទំនាបជុំវិញរាជធានី។'}},
 {id:'tonle-sap',name:{en:'Tonle Sap',km:'បឹងទន្លេសាប'},type:{en:'Lake & floodplain',km:'បឹង និងវាលលិចទឹក'},coordinate:[104.1,12.9],zoom:8.1,note:{en:'A shallow lake surrounded by broad floodplains. Its water extent changes seasonally; this imagery is a historical composite.',km:'បឹងរាក់មួយដែលមានវាលលិចទឹកធំទូលាយជុំវិញ។ ទំហំផ្ទៃទឹកប្រែប្រួលតាមរដូវ។ រូបភាពនេះជារូបភាពបញ្ចូលគ្នាពីអតីតកាល។'}},
 {id:'cardamoms',name:{en:'Cardamom Mountains',km:'ជួរភ្នំក្រវាញ'},type:{en:'Mountain landscape',km:'ទេសភាពភ្នំ'},coordinate:[103.15,12.05],zoom:9.1,note:{en:'Tilt the map to compare ridges and valleys with the central lowlands. Use the relief colors to find higher ground.',km:'បង្វិលផែនទីឱ្យលំអៀង ដើម្បីប្រៀបធៀបជួរភ្នំ និងជ្រលងជាមួយតំបន់ទំនាបកណ្ដាល។ ប្រើពណ៌កម្ពស់ដើម្បីរកដីខ្ពស់។'}},
 {id:'phnom-aural',name:{en:'Phnom Aural',km:'ភ្នំឱរ៉ាល់'},type:{en:'Mountain',km:'ភ្នំ'},coordinate:[104.1716,12.0325],zoom:11,note:{en:'Explore the mountain relief west of the central plain. Tap nearby slopes to compare approximate terrain elevations.',km:'ស្វែងយល់ពីទម្រង់ភ្នំនៅភាគខាងលិចនៃវាលទំនាបកណ្ដាល។ ចុចជម្រាលក្បែរៗដើម្បីប្រៀបធៀបកម្ពស់ប្រហាក់ប្រហែល។'}},
 {id:'angkor',name:{en:'Angkor Wat',km:'អង្គរវត្ត'},type:{en:'Heritage landscape',km:'ទេសភាពបេតិកភណ្ឌ'},coordinate:[103.867,13.4125],zoom:10,note:{en:'Locate Angkor north of Tonle Sap. This explorer shows surrounding terrain, not a detailed 3D reconstruction of the temple.',km:'រកទីតាំងអង្គរនៅខាងជើងបឹងទន្លេសាប។ ផែនទីនេះបង្ហាញទម្រង់ដីជុំវិញ មិនមែនជាគំរូលម្អិតនៃប្រាសាទទេ។'}},
 {id:'mondulkiri',name:{en:'Mondulkiri Highlands',km:'តំបន់ខ្ពង់រាបមណ្ឌលគិរី'},type:{en:'Eastern highlands',km:'ខ្ពង់រាបភាគខាងកើត'},coordinate:[107.18,12.46],zoom:9.4,note:{en:'Look for rolling hills and compare their elevation colors with the Mekong lowlands to the west.',km:'សង្កេតភ្នំតូចៗ និងប្រៀបធៀបពណ៌កម្ពស់ជាមួយតំបន់ទំនាបមេគង្គនៅភាគខាងលិច។'}},
 {id:'mekong',name:{en:'Mekong at Kratié',km:'ទន្លេមេគង្គនៅក្រចេះ'},type:{en:'River corridor',km:'តំបន់តាមដងទន្លេ'},coordinate:[106.018,12.489],zoom:9.3,note:{en:'Follow the broad river corridor southward. Compare the flat riverside land with the higher terrain farther east.',km:'សង្កេតតំបន់តាមដងទន្លេទៅភាគខាងត្បូង។ ប្រៀបធៀបដីទំនាបក្បែរទន្លេជាមួយដីខ្ពស់នៅភាគខាងកើត។'}},
 {id:'coast',name:{en:'Kampot & the coast',km:'កំពត និងឆ្នេរសមុទ្រ'},type:{en:'Coastal landscape',km:'ទេសភាពឆ្នេរសមុទ្រ'},coordinate:[104.18,10.61],zoom:9.4,note:{en:'Explore the transition from coastal lowlands to the hills inland. Dark blue relief represents terrain at or below sea level.',km:'ស្វែងយល់ពីការផ្លាស់ប្ដូរពីដីទំនាបឆ្នេរសមុទ្រទៅភ្នំនៅផ្នែកខាងក្នុង។ ពណ៌ខៀវងងឹតតំណាងដីនៅកម្រិតទឹកសមុទ្រ ឬទាបជាង។'}},
];
export const lessons=[
 {id:'water',place:'tonle-sap',title:{en:'A lake that changes with the seasons',km:'បឹងដែលប្រែប្រួលតាមរដូវ'},body:{en:'Tonle Sap is connected to the Mekong by the Tonle Sap River. During the wet season, high Mekong water levels can reverse the river flow, sending water into the lake. Low surrounding land allows water to spread.',km:'បឹងទន្លេសាបភ្ជាប់នឹងមេគង្គតាមទន្លេសាប។ ក្នុងរដូវវស្សា កម្ពស់ទឹកមេគង្គខ្ពស់អាចធ្វើឱ្យទឹកហូរបញ្ច្រាសចូលបឹង។ ដីទំនាបជុំវិញអនុញ្ញាតឱ្យទឹករីករាលដាល។'},task:{en:'Compare the lake margins with the Cardamom Mountains. Which area could flood more easily, and why?',km:'ប្រៀបធៀបតំបន់ជុំវិញបឹងជាមួយជួរភ្នំក្រវាញ។ តំបន់ណាងាយលិចទឹកជាង ហើយហេតុអ្វី?'},source:'https://www.mrcmekong.org/'},
 {id:'ridges',place:'cardamoms',title:{en:'Read a mountain landscape',km:'សិក្សាទេសភាពភ្នំ'},body:{en:'Ridges are higher stretches of land; valleys lie between them. Gravity generally carries surface water downhill. The terrain colors represent elevation, while shading helps reveal slopes.',km:'ជួរភ្នំជាដីខ្ពស់ ហើយជ្រលងនៅចន្លោះភ្នំ។ ជាទូទៅ ទំនាញធ្វើឱ្យទឹកលើផ្ទៃដីហូរចុះក្រោម។ ពណ៌តំណាងកម្ពស់ ហើយស្រមោលជួយបង្ហាញជម្រាល។'},task:{en:'Find a ridge and a valley. Tap both to compare elevations. Try 2× relief, then return to 1×: did the actual elevation change?',km:'រកជួរភ្នំ និងជ្រលង។ ចុចទាំងពីរដើម្បីប្រៀបធៀបកម្ពស់។ សាកល្បងបង្កើនទម្រង់ដី ២ដង រួចត្រឡប់ទៅ ១ដង។ តើកម្ពស់ពិតប្រែប្រួលទេ?'},source:'https://www.usgs.gov/programs/national-geospatial-program/topographic-maps'},
 {id:'plain',place:'mekong',title:{en:'Follow the Mekong lowlands',km:'សិក្សាតំបន់ទំនាបមេគង្គ'},body:{en:'Rivers connect landscapes upstream and downstream. Flat lowlands can contain floodplains where rivers spread during high water. Elevation alone cannot predict a flood: rainfall, flow, drainage and defenses also matter.',km:'ទន្លេភ្ជាប់តំបន់ខាងលើ និងខាងក្រោម។ ដីទំនាបអាចជាវាលលិចទឹក នៅពេលទឹកទន្លេឡើងខ្ពស់។ កម្ពស់ដីតែមួយមុខមិនអាចព្យាករណ៍ទឹកជំនន់បានទេ។ ភ្លៀង លំហូរ ប្រព័ន្ធបង្ហូរ និងរបាំងការពារក៏សំខាន់ដែរ។'},task:{en:'Compare Kratié with Mondulkiri. Describe the difference in relief without assuming that all flat land is flooded.',km:'ប្រៀបធៀបក្រចេះនឹងមណ្ឌលគិរី។ ពិពណ៌នាភាពខុសគ្នានៃទម្រង់ដី ដោយមិនសន្មតថាដីរាបទាំងអស់លិចទឹកទេ។'},source:'https://www.mrcmekong.org/'},
];
