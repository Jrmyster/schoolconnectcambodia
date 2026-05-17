export interface WordOfTheDayData {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definitionEn: string;
  definitionKh: string;
  example1En: string;
  example1Kh: string;
  example2En: string;
  example2Kh: string;
}

export const WORD_OF_THE_DAY_DB: WordOfTheDayData[] = [
  {
    word: "Pragmatic",
    phonetic: "/præɡˈmæt.ɪk/",
    partOfSpeech: "Adjective",
    definitionEn: "Solving problems in a sensible way that suits the conditions that really exist now, rather than obeying fixed theories, ideas, or rules.",
    definitionKh: "ការដោះស្រាយបញ្ហាតាមរបៀបជាក់ស្តែង និងសមហេតុផល ជាជាងការប្រកាន់ខ្ជាប់ទ្រឹស្តី ឬច្បាប់ថេរ។",
    example1En: "The committee took a pragmatic approach to the budget crisis, cutting unnecessary expenses immediately.",
    example1Kh: "គណៈកម្មាធិការបានអនុវត្តវិធីសាស្ត្រជាក់ស្តែងចំពោះវិបត្តិថវិកា ដោយកាត់បន្ថយការចំណាយមិនចាំបាច់ភ្លាមៗ។",
    example2En: "While his theory is interesting, we need a more pragmatic solution for the actual construction phase.",
    example2Kh: "ទោះបីជាទ្រឹស្តីរបស់គាត់គួរឱ្យចាប់អារម្មណ៍ក៏ដោយ យើងត្រូវការដំណោះស្រាយជាក់ស្តែងបន្ថែមទៀតសម្រាប់ដំណាក់កាលសាងសង់ពិតប្រាកដ។"
  },
  {
    word: "Articulate",
    phonetic: "/ɑːˈtɪk.jə.lət/",
    partOfSpeech: "Adjective / Verb",
    definitionEn: "Able to express thoughts and feelings easily and clearly, or showing this quality.",
    definitionKh: "មានសមត្ថភាពក្នុងការបញ្ចេញមតិយោបល់ និងអារម្មណ៍បានយ៉ាងងាយស្រួល និងច្បាស់លាស់។",
    example1En: "She is a highly articulate speaker who can explain complex subjects to any audience.",
    example1Kh: "នាងគឺជាវាគ្មិនដ៏ប៉ិនប្រសប់ដែលអាចពន្យល់ប្រធានបទស្មុគស្មាញដល់ទស្សនិកជនណាមួយ។",
    example2En: "He struggled to articulate his reasons for leaving the company.",
    example2Kh: "គាត់មានការលំបាកក្នុងការបញ្ជាក់យ៉ាងច្បាស់ពីហេតុផលរបស់គាត់ក្នុងការចាកចេញពីក្រុមហ៊ុន។"
  },
  {
    word: "Nuance",
    phonetic: "/ˈnjuː.ɑːns/",
    partOfSpeech: "Noun",
    definitionEn: "A very slight difference in appearance, meaning, sound, or feel.",
    definitionKh: "ភាពខុសគ្នាបន្តិចបន្តួចក្នុងរូបរាង អត្ថន័យ សំឡេង ឬអារម្មណ៍ (ភាពលម្អិតដ៏ស្តើង)។",
    example1En: "The translator failed to capture the cultural nuances of the original poem.",
    example1Kh: "អ្នកបកប្រែមិនអាចចាប់យកអត្ថន័យលម្អិតខាងវប្បធម៌នៃកំណាព្យដើមបានទេ។",
    example2En: "Understanding the nuances of body language is essential for international diplomats.",
    example2Kh: "ការយល់ដឹងពីអត្ថន័យលម្អិតនៃភាសាកាយវិការ គឺជារឿងចាំបាច់សម្រាប់អ្នកការទូតអន្តរជាតិ។"
  },
  {
    word: "Pivotal",
    phonetic: "/ˈpɪv.ə.təl/",
    partOfSpeech: "Adjective",
    definitionEn: "Central and important; having a crucial effect on the way something develops.",
    definitionKh: "មានសារៈសំខាន់បំផុត ឬជាចំណុចស្នូល ដែលមានឥទ្ធិពលយ៉ាងខ្លាំងលើការវិវត្តនៃអ្វីមួយ។",
    example1En: "The Battle of Waterloo was a pivotal moment in European history.",
    example1Kh: "សមរភូមិ Waterloo គឺជាព្រឹត្តិការណ៍ដ៏សំខាន់បំផុតនៅក្នុងប្រវត្តិសាស្ត្រអឺរ៉ុប។",
    example2En: "Her testimony played a pivotal role in securing the conviction.",
    example2Kh: "សក្ខីកម្មរបស់នាងបានដើរតួនាទីយ៉ាងសំខាន់ក្នុងការធានាបាននូវការកាត់ទោស។"
  },
  {
    word: "Comprehensive",
    phonetic: "/ˌkɒm.prɪˈhen.sɪv/",
    partOfSpeech: "Adjective",
    definitionEn: "Complete and including everything that is necessary.",
    definitionKh: "ពេញលេញ និងគ្របដណ្តប់លើអ្វីៗគ្រប់យ៉ាងដែលចាំបាច់ (ទូលំទូលាយ)។",
    example1En: "The government has promised a comprehensive review of the healthcare system.",
    example1Kh: "រដ្ឋាភិបាលបានសន្យាថានឹងធ្វើការត្រួតពិនិត្យយ៉ាងទូលំទូលាយលើប្រព័ន្ធថែទាំសុខភាព។",
    example2En: "This textbook provides a comprehensive overview of modern physical chemistry.",
    example2Kh: "សៀវភៅសិក្សានេះផ្តល់នូវទិដ្ឋភាពទូទៅយ៉ាងពេញលេញនៃគីមីរូបវិទ្យាសម័យទំនើប។"
  },
  {
    word: "Ambiguous",
    phonetic: "/æmˈbɪɡ.ju.əs/",
    partOfSpeech: "Adjective",
    definitionEn: "Having or expressing more than one possible meaning, sometimes intentionally.",
    definitionKh: "មានអត្ថន័យច្រើនជាងមួយ ឬមិនច្បាស់លាស់ (ពេលខ្លះដោយចេតនា)។",
    example1En: "The ending of the movie was deliberately ambiguous, leaving the audience to decide what happened.",
    example1Kh: "ទីបញ្ចប់នៃខ្សែភាពយន្តគឺមិនច្បាស់លាស់ដោយចេតនា ដោយទុកឱ្យទស្សនិកជនសម្រេចថាតើមានអ្វីកើតឡើង។",
    example2En: "His ambiguous instructions caused confusion among the staff.",
    example2Kh: "ការណែនាំមិនច្បាស់លាស់របស់គាត់បានបណ្តាលឱ្យមានការភាន់ច្រឡំក្នុងចំណោមបុគ្គលិក។"
  },
  {
    word: "Eloquent",
    phonetic: "/ˈel.ə.kwənt/",
    partOfSpeech: "Adjective",
    definitionEn: "Giving a clear, strong message in a beautiful or persuasive way.",
    definitionKh: "មានវោហារសព្ទល្អ និងមានសមត្ថភាពបញ្ចុះបញ្ចូល ឬទាក់ទាញដោយពាក្យសម្តី។",
    example1En: "She gave an eloquent speech advocating for human rights.",
    example1Kh: "នាងបានថ្លែងសុន្ទរកថាប្រកបដោយវោហារសព្ទគាំទ្រសិទ្ធិមនុស្ស។",
    example2En: "His silence on the issue was more eloquent than words could ever be.",
    example2Kh: "ភាពស្ងៀមស្ងាត់របស់គាត់ចំពោះបញ្ហានេះមានអត្ថន័យជ្រាលជ្រៅជាងពាក្យសម្តីទៅទៀត។"
  },
  {
    word: "Resilient",
    phonetic: "/rɪˈzɪl.i.ənt/",
    partOfSpeech: "Adjective",
    definitionEn: "Able to quickly return to a previous good condition after problems or trauma.",
    definitionKh: "មានសមត្ថភាពងើបឡើងវិញយ៉ាងឆាប់រហ័ស បន្ទាប់ពីជួបប្រទះការលំបាក ឬការប៉ះទង្គិច។",
    example1En: "Children are often far more resilient than adults realize.",
    example1Kh: "កុមារជារឿយៗមានភាពរឹងប៉ឹង និងងើបឡើងវិញបានលឿនជាងអ្វីដែលមនុស្សពេញវ័យគិត។",
    example2En: "The local economy proved highly resilient despite the global financial crisis.",
    example2Kh: "សេដ្ឋកិច្ចក្នុងស្រុកបានបង្ហាញពីភាពរឹងប៉ឹងយ៉ាងខ្លាំង ទោះបីជាមានវិបត្តិហិរញ្ញវត្ថុសកលក៏ដោយ។"
  },
  {
    word: "Methodical",
    phonetic: "/məˈθɒd.ɪ.kəl/",
    partOfSpeech: "Adjective",
    definitionEn: "Done in a very ordered, careful way.",
    definitionKh: "ដែលធ្វើឡើងតាមរបៀបរៀបរយ មានប្រព័ន្ធ និងប្រុងប្រយ័ត្ន។",
    example1En: "Tom is a very methodical worker who rarely makes careless mistakes.",
    example1Kh: "Tom គឺជាបុគ្គលិកម្នាក់ដែលធ្វើការមានរបៀបរៀបរយ ដែលកម្រមានកំហុសដោយការធ្វេសប្រហែស។",
    example2En: "The investigators conducted a methodical search of the entire building.",
    example2Kh: "អ្នកស៊ើបអង្កេតបានធ្វើការស្វែងរកដោយប្រុងប្រយ័ត្ន និងមានប្រព័ន្ធពេញមួយអគារ។"
  },
  {
    word: "Tentative",
    phonetic: "/ˈten.tə.tɪv/",
    partOfSpeech: "Adjective",
    definitionEn: "Not certain or fixed; provisional; done without confidence.",
    definitionKh: "មិនទាន់ប្រាកដប្រជា បណ្ដោះអាសន្ន ឬធ្វើឡើងដោយគ្មានទំនុកចិត្ត។",
    example1En: "We have made tentative plans to travel to Japan next year.",
    example1Kh: "យើងបានរៀបចំផែនការបណ្តោះអាសន្នដើម្បីធ្វើដំណើរទៅប្រទេសជប៉ុននៅឆ្នាំក្រោយ។",
    example2En: "The baby took a few tentative steps before falling over.",
    example2Kh: "ទារកបានបោះជំហានស្ទាក់ស្ទើរពីរឬបីជំហានមុនពេលដួល។"
  },
  {
    word: "Verify",
    phonetic: "/ˈver.ɪ.faɪ/",
    partOfSpeech: "Verb",
    definitionEn: "To make certain that something is correct or true.",
    definitionKh: "ផ្ទៀងផ្ទាត់ ឬបញ្ជាក់ថាអ្វីមួយគឺត្រឹមត្រូវ ឬពិតប្រាកដ។",
    example1En: "Please verify your email address to complete the registration process.",
    example1Kh: "សូមផ្ទៀងផ្ទាត់អាសយដ្ឋានអ៊ីមែលរបស់អ្នកដើម្បីបញ្ចប់ដំណើរការចុះឈ្មោះ។",
    example2En: "The auditors are coming tomorrow to verify the financial records.",
    example2Kh: "សវនករនឹងមកនៅថ្ងៃស្អែកដើម្បីផ្ទៀងផ្ទាត់កំណត់ត្រាហិរញ្ញវត្ថុ។"
  },
  {
    word: "Emphasize",
    phonetic: "/ˈem.fə.saɪz/",
    partOfSpeech: "Verb",
    definitionEn: "To show that something is very important or worth giving attention to.",
    definitionKh: "សង្កត់ធ្ងន់ ឬបង្ហាញថាអ្វីមួយមានសារៈសំខាន់ខ្លាំង។",
    example1En: "The professor emphasized the importance of completing the reading assignments before class.",
    example1Kh: "សាស្ត្រាចារ្យបានសង្កត់ធ្ងន់លើសារៈសំខាន់នៃការបញ្ចប់កិច្ចការអានមុនពេលចូលរៀន។",
    example2En: "The dress was designed to emphasize her tall, elegant figure.",
    example2Kh: "រ៉ូបនេះត្រូវបានរចនាឡើងដើម្បីរំលេចរូបរាងខ្ពស់ស្រឡះ និងឆើតឆាយរបស់នាង។"
  },
  {
    word: "Synthesize",
    phonetic: "/ˈsɪn.θə.saɪz/",
    partOfSpeech: "Verb",
    definitionEn: "To combine different ideas, styles, or systems into a single idea or system.",
    definitionKh: "សំយោគ ឬបញ្ចូលគំនិត ស្ទីល ឬប្រព័ន្ធផ្សេងៗគ្នាទៅជាធ្លុងមួយ។",
    example1En: "The final essay asks students to synthesize information from all four lectures.",
    example1Kh: "អត្ថបទបញ្ចប់តម្រូវឱ្យនិស្សិតសំយោគព័ត៌មានពីការបង្រៀនទាំងបួន។",
    example2En: "The artist successfully synthesized Eastern and Western painting techniques.",
    example2Kh: "វិចិត្រករបានបញ្ចូលគ្នាយ៉ាងជោគជ័យនូវបច្ចេកទេសគំនូរភាគខាងកើត និងភាគខាងលិច។"
  },
  {
    word: "Evaluate",
    phonetic: "/ɪˈvæl.ju.eɪt/",
    partOfSpeech: "Verb",
    definitionEn: "To judge or calculate the quality, importance, amount, or value of something.",
    definitionKh: "វាយតម្លៃគុណភាព សារៈសំខាន់ ចំនួន ឬតម្លៃនៃអ្វីមួយ។",
    example1En: "We need to evaluate the success of the marketing campaign before spending more money.",
    example1Kh: "យើងត្រូវវាយតម្លៃភាពជោគជ័យនៃយុទ្ធនាការទីផ្សារមុនពេលចំណាយប្រាក់បន្ថែមទៀត។",
    example2En: "The teacher evaluated the students' progress at the end of the semester.",
    example2Kh: "គ្រូបានវាយតម្លៃវឌ្ឍនភាពរបស់សិស្សនៅចុងឆមាស។"
  },
  {
    word: "Convey",
    phonetic: "/kənˈveɪ/",
    partOfSpeech: "Verb",
    definitionEn: "To express a thought, feeling, or idea so that it is understood by other people.",
    definitionKh: "បញ្ជូន ឬសម្តែងគំនិត អារម្មណ៍ ដើម្បីឱ្យអ្នកដទៃយល់។",
    example1En: "His poetry is able to convey complex emotions in very few words.",
    example1Kh: "កំណាព្យរបស់គាត់អាចបញ្ជូនអារម្មណ៍ស្មុគស្មាញដោយប្រើពាក្យតិចតួចបំផុត។",
    example2En: "Please convey my sincere apologies to your manager.",
    example2Kh: "សូមបញ្ជូនការសុំទោសដោយស្មោះរបស់ខ្ញុំទៅកាន់អ្នកគ្រប់គ្រងរបស់អ្នក។"
  },
  {
    word: "Conducive",
    phonetic: "/kənˈdʒuː.sɪv/",
    partOfSpeech: "Adjective",
    definitionEn: "Making a certain situation or outcome likely or possible.",
    definitionKh: "ដែលផ្តល់អំណោយផល ឬធ្វើឱ្យស្ថានភាពណាមួយងាយនឹងកើតឡើង។",
    example1En: "A quiet room is highly conducive to studying and concentration.",
    example1Kh: "បន្ទប់ស្ងាត់គឺមានអំណោយផលយ៉ាងខ្លាំងសម្រាប់ការសិក្សា និងការផ្ដោតអារម្មណ៍។",
    example2En: "The harsh political climate is not conducive to foreign investment.",
    example2Kh: "បរិយាកាសនយោបាយដ៏តឹងតែង មិនផ្តល់អំណោយផលដល់ការវិនិយោគបរទេសទេ។"
  },
  {
    word: "Erroneous",
    phonetic: "/ɪˈrəʊ.ni.əs/",
    partOfSpeech: "Adjective",
    definitionEn: "Wrong or false.",
    definitionKh: "ខុស ឬមិនពិត។",
    example1En: "The newspaper published an erroneous report about the company's bankruptcy.",
    example1Kh: "កាសែតបានចុះផ្សាយរបាយការណ៍ខុសឆ្គងអំពីការក្ស័យធនរបស់ក្រុមហ៊ុន។",
    example2En: "Many people hold the erroneous belief that vaccines cause autism.",
    example2Kh: "មនុស្សជាច្រើនមានជំនឿខុសឆ្គងថាវ៉ាក់សាំងបណ្តាលឱ្យមានជំងឺអូទីសឹម។"
  },
  {
    word: "Fluctuate",
    phonetic: "/ˈflʌk.tʃu.eɪt/",
    partOfSpeech: "Verb",
    definitionEn: "To change, especially continuously and between one level or thing and another.",
    definitionKh: "ប្រែប្រួលឡើងចុះ ឬផ្លាស់ប្តូរជានិច្ច។",
    example1En: "Vegetable prices fluctuate wildly depending on the season and weather.",
    example1Kh: "តម្លៃបន្លែប្រែប្រួលឡើងចុះយ៉ាងខ្លាំងអាស្រ័យលើរដូវកាល និងអាកាសធាតុ។",
    example2En: "His weight has fluctuated a lot since he stopped playing competitive sports.",
    example2Kh: "ទម្ងន់របស់គាត់មានការប្រែប្រួលជាច្រើនចាប់តាំងពីគាត់ឈប់លេងកីឡាប្រកួតប្រជែង។"
  },
  {
    word: "Implicate",
    phonetic: "/ˈɪm.plɪ.keɪt/",
    partOfSpeech: "Verb",
    definitionEn: "To show that someone is involved in a crime or partly responsible for something bad that has happened.",
    definitionKh: "ពាក់ព័ន្ធ ឬបង្ហាញថាមានជាប់ពាក់ព័ន្ធក្នុងបទល្មើស ឬទង្វើមិនល្អណាមួយ។",
    example1En: "The newly discovered emails directly implicate the CEO in the financial scandal.",
    example1Kh: "អ៊ីមែលដែលទើបរកឃើញថ្មី បានបង្ហាញពីការជាប់ពាក់ព័ន្ធផ្ទាល់របស់នាយកប្រតិបត្តិនៅក្នុងរឿងអាស្រូវហិរញ្ញវត្ថុ។",
    example2En: "Smoking is deeply implicated in the development of lung cancer.",
    example2Kh: "ការជក់បារីមានការពាក់ព័ន្ធយ៉ាងជ្រាលជ្រៅក្នុងការវិវត្តនៃជំងឺមហារីកសួត។"
  },
  {
    word: "Inherent",
    phonetic: "/ɪnˈher.ənt/",
    partOfSpeech: "Adjective",
    definitionEn: "Existing as a natural or basic part of something.",
    definitionKh: "ដែលមានជាប់ពីកំណើត ឬជាផ្នែកមូលដ្ឋាននៃអ្វីមួយ។",
    example1En: "There are inherent risks in any surgical procedure, no matter how routine.",
    example1Kh: "មានហានិភ័យដែលជាប់ទាក់ទងជាធម្មតានៅក្នុងនីតិវិធីវះកាត់ណាមួយ ទោះបីជាវាជាទម្លាប់ក៏ដោយ។",
    example2En: "The designer understood the inherent beauty of natural materials like wood and stone.",
    example2Kh: "អ្នករចនាយល់ពីភាពស្រស់ស្អាតពីធម្មជាតិនៃសម្ភារៈដូចជាឈើ និងថ្ម។"
  },
  {
    word: "Integrate",
    phonetic: "/ˈɪn.tɪ.ɡreɪt/",
    partOfSpeech: "Verb",
    definitionEn: "To mix with and join society or a group of people, often changing to suit their way of life, habits, and customs.",
    definitionKh: "ធ្វើសមាហរណកម្ម ឬរួមបញ្ចូលគ្នាដើម្បីឱ្យក្លាយជាផ្នែកមួយដ៏ល្អ។",
    example1En: "The school is actively trying to integrate students with special needs into mainstream classes.",
    example1Kh: "សាលារៀនកំពុងព្យាយាមយ៉ាងសកម្មក្នុងការដាក់បញ្ចូលសិស្សដែលមានតម្រូវការពិសេសទៅក្នុងថ្នាក់ធម្មតា។",
    example2En: "We need to integrate the new software system with our existing database.",
    example2Kh: "យើងត្រូវរួមបញ្ចូលប្រព័ន្ធផ្នែកទន់ថ្មីជាមួយនឹងមូលដ្ឋានទិន្នន័យដែលមានស្រាប់របស់យើង។"
  },
  {
    word: "Phenomenon",
    phonetic: "/fəˈnɒm.ɪ.nən/",
    partOfSpeech: "Noun",
    definitionEn: "Something that exists and can be seen, felt, tasted, etc., especially something unusual or interesting.",
    definitionKh: "បាតុភូត ឬព្រឹត្តិការណ៍ដែលអាចសង្កេតឃើញបាន ជាពិសេសអ្វីដែលចម្លែក ឬគួរឱ្យចាប់អារម្មណ៍។",
    example1En: "Gravity is a natural phenomenon that affects all objects with mass.",
    example1Kh: "ទំនាញផែនដីគឺជាបាតុភូតធម្មជាតិដែលជះឥទ្ធិពលលើវត្ថុទាំងអស់ដែលមានម៉ាស។",
    example2En: "The popularity of the new video game has become a worldwide cultural phenomenon.",
    example2Kh: "ភាពពេញនិយមនៃហ្គេមវីដេអូថ្មីនេះបានក្លាយជាបាតុភូតវប្បធម៌ទូទាំងពិភពលោក។"
  },
  {
    word: "Subsequent",
    phonetic: "/ˈsʌb.sɪ.kwənt/",
    partOfSpeech: "Adjective",
    definitionEn: "Happening after something else.",
    definitionKh: "ដែលកើតឡើងបន្ទាប់ ឬជាបន្តបន្ទាប់។",
    example1En: "The theory was supported by subsequent scientific discoveries in the 20th century.",
    example1Kh: "ទ្រឹស្តីនេះត្រូវបានគាំទ្រដោយរបកគំហើញវិទ្យាសាស្ត្រជាបន្តបន្ទាប់នៅសតវត្សទី ២០។",
    example2En: "Mistakes made in the initial design phase caused problems in all subsequent stages.",
    example2Kh: "កំហុសដែលបានកើតឡើងក្នុងដំណាក់កាលរចនាដំបូង បានបង្កឱ្យមានបញ្ហានៅគ្រប់ដំណាក់កាលបន្តបន្ទាប់។"
  },
  {
    word: "Tangible",
    phonetic: "/ˈtæn.dʒə.bəl/",
    partOfSpeech: "Adjective",
    definitionEn: "Real and not imaginary; able to be shown, touched, or experienced.",
    definitionKh: "ដែលអាចប៉ះបាន មើលឃើញ ឬមានពិតប្រាកដ។",
    example1En: "We need tangible evidence, not just rumors, to proceed with the investigation.",
    example1Kh: "យើងត្រូវការភស្តុតាងរឹងមាំ មិនមែនត្រឹមតែពាក្យចចាមអារ៉ាមទេ ដើម្បីបន្តការស៊ើបអង្កេត។",
    example2En: "The charity provides tangible benefits to the community, such as clean water and food.",
    example2Kh: "អង្គការសប្បុរសធម៌ផ្តល់អត្ថប្រយោជន៍ជាក់ស្តែងដល់សហគមន៍ ដូចជាទឹកស្អាត និងអាហារ។"
  },
  {
    word: "Validate",
    phonetic: "/ˈvæl.ɪ.deɪt/",
    partOfSpeech: "Verb",
    definitionEn: "To make something officially acceptable or approved, especially after examining it.",
    definitionKh: "ធ្វើសុពលភាព ឬបញ្ជាក់ថាត្រឹមត្រូវ និងអាចទទួលយកបាន។",
    example1En: "The university must validate your diploma before you can apply for the master's program.",
    example1Kh: "សាកលវិទ្យាល័យត្រូវតែធ្វើសុពលភាពសញ្ញាបត្ររបស់អ្នក មុនពេលអ្នកអាចដាក់ពាក្យចូលរៀនថ្នាក់អនុបណ្ឌិត។",
    example2En: "Her feelings of anger were validated by the therapist during the session.",
    example2Kh: "អារម្មណ៍ខឹងរបស់នាងត្រូវបានទទួលស្គាល់ថាត្រឹមត្រូវដោយអ្នកព្យាបាលរោគក្នុងអំឡុងពេលប្រឹក្សា។"
  },
  {
    word: "Viable",
    phonetic: "/ˈvaɪ.ə.bəl/",
    partOfSpeech: "Adjective",
    definitionEn: "Able to work as intended or able to succeed.",
    definitionKh: "ដែលអាចដំណើរការបាន ឬមានសង្ឃឹមជោគជ័យ។",
    example1En: "Solar power is now a highly viable alternative to fossil fuels.",
    example1Kh: "ថាមពលព្រះអាទិត្យឥឡូវនេះគឺជាជម្រើសដែលអាចដំណើរការបានយ៉ាងល្អជំនួសឱ្យឥន្ធនៈហ្វូស៊ីល។",
    example2En: "The committee concluded that the proposed business plan was not financially viable.",
    example2Kh: "គណៈកម្មាធិការបានសន្និដ្ឋានថា ផែនការអាជីវកម្មដែលបានស្នើឡើងមិនអាចដំណើរការបានផ្នែកហិរញ្ញវត្ថុទេ។"
  },
  {
    word: "Advocate",
    phonetic: "/ˈæd.və.keɪt/",
    partOfSpeech: "Verb / Noun",
    definitionEn: "To publicly support or suggest an idea, development, or way of doing something.",
    definitionKh: "គាំទ្រយ៉ាងសកម្ម ឬមេធាវី/អ្នកការពារសិទ្ធិ។",
    example1En: "Environmentalists strongly advocate for stricter laws on plastic pollution.",
    example1Kh: "អ្នកការពារបរិស្ថានគាំទ្រយ៉ាងខ្លាំងឱ្យមានច្បាប់តឹងរ៉ឹងជាងមុនស្តីពីការបំពុលប្លាស្ទិក។",
    example2En: "She is a passionate advocate for children's access to free education.",
    example2Kh: "នាងគឺជាអ្នកតស៊ូមតិយ៉ាងសកម្មសម្រាប់ការទទួលបានការអប់រំដោយឥតគិតថ្លៃរបស់កុមារ។"
  },
  {
    word: "Coherent",
    phonetic: "/kəʊˈhɪə.rənt/",
    partOfSpeech: "Adjective",
    definitionEn: "If an argument, set of ideas, or a plan is coherent, it is clear and carefully considered, and each part of it connects or follows in a natural or reasonable way.",
    definitionKh: "ដែលស៊ីសង្វាក់គ្នា ច្បាស់លាស់ និងមានហេតុផលត្រឹមត្រូវ។",
    example1En: "The president failed to present a coherent strategy for dealing with the economic crisis.",
    example1Kh: "ប្រធានាធិបតីមិនបានបង្ហាញយុទ្ធសាស្ត្រស៊ីសង្វាក់គ្នាណាមួយ ដើម្បីដោះស្រាយវិបត្តិសេដ្ឋកិច្ចនោះទេ។",
    example2En: "When writing your essay, ensure your arguments are logical and coherent.",
    example2Kh: "នៅពេលសរសេរអត្ថបទរបស់អ្នក សូមប្រាកដថាអំណះអំណាងរបស់អ្នកមានលក្ខណៈតក្កវិជ្ជា និងស៊ីសង្វាក់គ្នា។"
  },
  {
    word: "Differentiate",
    phonetic: "/ˌdɪf.əˈren.ʃi.eɪt/",
    partOfSpeech: "Verb",
    definitionEn: "To show or find the difference between things that are compared.",
    definitionKh: "បែងចែក ឬបង្ហាញពីភាពខុសគ្នារវាងវត្ថុដែលត្រូវបានប្រៀបធៀប។",
    example1En: "It can be difficult to differentiate between the symptoms of a cold and the flu.",
    example1Kh: "វាអាចមានការលំបាកក្នុងការបែងចែករវាងរោគសញ្ញានៃជំងឺផ្តាសាយធម្មតា និងជំងឺផ្តាសាយធំ។",
    example2En: "The company must differentiate its products from those of its competitors to survive.",
    example2Kh: "ក្រុមហ៊ុនត្រូវតែធ្វើឱ្យផលិតផលរបស់ខ្លួនមានភាពខុសប្លែកពីគូប្រជែង ដើម្បីរស់រានមានជីវិត។"
  },
  {
    word: "Foster",
    phonetic: "/ˈfɒs.tər/",
    partOfSpeech: "Verb",
    definitionEn: "To encourage the development or growth of ideas or feelings.",
    definitionKh: "ជំរុញ ឬលើកទឹកចិត្តឱ្យមានការរីកចម្រើន។",
    example1En: "The teacher's goal is to foster a love of reading in all her students.",
    example1Kh: "គោលដៅរបស់គ្រូគឺដើម្បីជំរុញក្តីស្រឡាញ់ចំពោះការអាននៅក្នុងសិស្សទាំងអស់របស់នាង។",
    example2En: "Open communication is essential to foster trust within a team.",
    example2Kh: "ការប្រាស្រ័យទាក់ទងបើកចំហ គឺជារឿងចាំបាច់ដើម្បីជំរុញទំនុកចិត្តនៅក្នុងក្រុម។"
  }
];
