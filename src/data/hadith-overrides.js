// Manual overrides for specific hadith entries where the fawazahmed0 bundle's
// English translation contains untranslated transliterations or is otherwise
// incomplete. HadithCard merges these on top of the auto-generated bundle
// (see src/data/hadith.js). Keys use the same "slug:number" format.
//
// Fields: any of { ar, en, grade, collection, number }. Only fields present
// here replace the bundle value; missing fields fall through to the bundle.

export const hadithOverrides = {
  'bukhari:6312': {
    en: "Narrated Hudhaifa (RA): When the Prophet \uFDFA went to bed, he would say, \"Bismika amutu wa ahya\" (\"In Your name, O Allah, I die and I live\"), and when he got up he would say, \"Alhamdu lillahil-ladhi ahyana ba'da ma amatana wa ilaihin-nushur\" (\"All praise belongs to Allah, who has given us life after causing us to die, and to Him is the resurrection\").",
  },
};
