export type VerdictType = "FALSE" | "PARTIALLY TRUE";

export interface Challenge {
  id: string;
  verdict: VerdictType;
  verdictColor: string;
  en: {
    claim: string;
    background: string;
    verdictDetail: string;
    checklist: { peer_reviewed: string; sample_size: string; conflict: string };
  };
  kh: {
    claim: string;
    background: string;
    verdictDetail: string;
    checklist: { peer_reviewed: string; sample_size: string; conflict: string };
  };
  correctChecklist: { peer_reviewed: boolean; sample_size: boolean; conflict: boolean };
}

export const CHALLENGES: Challenge[] = [
  {
    id: "carrots-night-vision",
    verdict: "PARTIALLY TRUE",
    verdictColor: "#d97706",
    en: {
      claim: "Eating carrots gives you night vision.",
      background: "Spread by the British RAF in WWII to hide their radar technology from the Germans.",
      verdictDetail: "Vitamin A prevents night blindness caused by deficiency — but extra carrots won't improve normal vision.",
      checklist: {
        peer_reviewed: "Yes — vitamin A deficiency linked to night blindness in peer-reviewed studies.",
        sample_size: "Yes — global studies across thousands of people confirm the link with deficiency only.",
        conflict: "Yes — the original claim was deliberate wartime propaganda by the British government.",
      },
    },
    kh: {
      claim: "Carrot moel yup",
      background: "Kang thup angkas anglae RAF banh chay jeung WWII",
      verdictDetail: "Vitamin A kargear ney kar mel yup — ban tae carrot banlai min banlong",
      checklist: {
        peer_reviewed: "Bat — peer-reviewed study baanjak",
        sample_size: "Bat — study jeong pheap lok",
        conflict: "Bat — propaganda sangkream anglae",
      },
    },
    correctChecklist: { peer_reviewed: true, sample_size: true, conflict: true },
  },
  {
    id: "cold-weather-cold",
    verdict: "FALSE",
    verdictColor: "#dc2626",
    en: {
      claim: "Cold weather gives you the common cold.",
      background: "For centuries, people noticed colds happen more in winter, assuming cold temperatures cause illness.",
      verdictDetail: "Colds are caused by viruses, not temperature. People get more colds in winter because they stay indoors in close contact.",
      checklist: {
        peer_reviewed: "Yes — controlled experiments show chilled volunteers catch colds at the same rate as warm ones.",
        sample_size: "Yes — large randomised trials in the 1950s-70s with hundreds of volunteers confirmed this.",
        conflict: "No — most research is publicly funded with no commercial incentive.",
      },
    },
    kh: {
      claim: "Akasathat tracheak tweu aoy cheung prosaday",
      background: "Robas jeasa vassa, mneak kos sangket cheung prosaday keut cheung rodouvassa",
      verdictDetail: "Cheung prosaday baek pi virus min mein akasathat tracheak. Mneak keut cheung cheang nov rodouvassa pi neak chom khang knong phteah",
      checklist: {
        peer_reviewed: "Bat — ka tdam kat banh joy neak smar jait chhlong cheung dong chdong",
        sample_size: "Bat — bok sodom reak nov chhnam 1950-70 juamoy neak smar jait robas roeuy",
        conflict: "Te — ka svayvijja chenh pi pracheachon kandal min mean katvitreak vanijj",
      },
    },
    correctChecklist: { peer_reviewed: true, sample_size: true, conflict: false },
  },
  {
    id: "ten-percent-brain",
    verdict: "FALSE",
    verdictColor: "#dc2626",
    en: {
      claim: "Humans only use 10% of their brains.",
      background: "This myth is often cited in self-help books and motivational speeches, suggesting we have vast untapped mental potential.",
      verdictDetail: "Brain scans show we use virtually all of our brain. Damage to almost any region causes measurable harm, proving no 90% lies unused.",
      checklist: {
        peer_reviewed: "Yes — brain imaging studies (fMRI, PET scans) show virtually all brain regions are active over the course of a day.",
        sample_size: "Yes — thousands of patients and scans across decades of neuroscience research confirm this.",
        conflict: "Yes — self-help authors and marketers benefit commercially from the idea of 'unlocking hidden potential.'",
      },
    },
    kh: {
      claim: "Mneak yoeng praer tae 10% ney khuakbal",
      background: "Roeung preng nih ban level nov knung seupheov chuay khluan aeng neng bonthem kamlung",
      verdictDetail: "Skaner khuakbal banh joy neak yoeng praer khuakbal teang mool. Karch tevada dol todam tae moul touch klah gros damber changeas",
      checklist: {
        peer_reviewed: "Bat — fMRI neng PET scan banh joy tevada khuakbal teang mool samprak nov mdey",
        sample_size: "Bat — neak chea cheang robas ruoy chhnam banh joy reung nih",
        conflict: "Bat — neak niyay chuay khluan aeng neng marketer chnol chlai pi 'dak saknathipheap loeuk'",
      },
    },
    correctChecklist: { peer_reviewed: true, sample_size: true, conflict: true },
  },
];
