// Time-of-day → submodule mapping for the Prophetic Path planner.
// Each key is a PropheticPath node id (see src/components/islamic/PropheticPath.jsx).
// Each value is a list of canonical submodule ids to pull tasks from for that window.
//
// Canonical submodule ids follow MAQASID_PILLARS.subModuleIds in src/data/maqasid.js:
//   faith-shahada | faith-salah | faith-zakah | faith-siyam | faith-hajj
//   life-physical | life-mental | life-safety | life-social
//   intellect-learning | intellect-thinking | intellect-cognitive | intellect-professional
//   family-marriage | family-parenting | family-kinship | family-home | family-office
//   wealth-earning | wealth-financial | wealth-ownership | wealth-circulation
//   env-resource | env-waste | env-ecosystem | env-sourcing
//   work | money | people | office | tech
//
// Iterate freely — this file is the single source of truth for which modules
// surface at which time of day.

// Each entry is either a plain array of canonical submodule ids (legacy shape)
// or a richer object: { submodules, matchers, phaseMatchers, moduleGroups }.
//   - submodules:   pre-filter scope (same as the legacy array form)
//   - matchers:     array of RegExp that a task TITLE must match against.
//                   If at least one matcher hits, the task is included.
//                   If matchers filter out every task, buildTasksForNode falls
//                   back to the unfiltered submodule pool for that node.
//   - phaseMatchers:{ before: [RegExp], after: [RegExp] } — splits tasks into
//                   Before/Main/After slots within a node.
//   - moduleGroups: OPTIONAL [{ id, label, submodules: [...] }] — lets a node
//                   expose a pillar-scoped toggle (e.g., Wealth vs Community).
//                   When caller passes options.moduleId, buildTasksForNode
//                   intersects scope with that group's submodules.
//                   Nodes without moduleGroups expose a single implicit group.
//
// Matchers below are drafted from each node's descriptive text. Iterate freely.
export const TOD_SUBMODULES = {
  isha: {
    submodules: ['faith-salah', 'faith-siyam', 'life-mental', 'family-home'],
    matchers: [
      /\bnight\b/i,
      /\b(?:evening|bedtime|sleep|before\s+sleep)\b/i,
      /\b(?:tahajjud|qiyam(?:\s*al-?layl)?|witr|isha)\b/i,
      /\b(?:third|last\s+third)\s+of\s+the\s+night\b/i,
      /\b(?:wind\s*down|rest|stillness|surrender)\b/i,
      /\b(?:evening\s+adhkar|adhkar.*(?:night|sleep|evening))\b/i,
      /\b(?:pre-?prayer|post-?prayer|rawatib|sunnah\s+prayer|siwak|sutrah|adhan|tasbih|prophetic\s+supplications?)\b/i,
      /\btransition:(?:evening-adhkar|pre-sleep)\b/i,
    ],
    phaseMatchers: {
      before: [
        /\bprayer-phase:before\b/i,
        /\bpre-?prayer\b/i,
        /\b(?:before\s+(?:salah|prayer|the\s+fard|isha))\b/i,
        /\b(?:siwak|sutrah|adhan|wudu|ablution|rawatib)\b/i,
        /\btransition:evening-adhkar\b/i,
        /\bevening\s+adhkar\b/i,
        /\b(?:amsayna|allahumma\s+bika\s+amsayna)\b/i,
      ],
      after: [
        /\bprayer-phase:after\b/i,
        /\bpost-?prayer\b/i,
        /\b(?:after\s+(?:salah|prayer|fard|isha|witr))\b/i,
        /\b(?:prophetic\s+supplications?|surah\s+al-?mulk|surah\s+al-?kafirun)\b/i,
        /\btransition:pre-sleep\b/i,
        /\b(?:before\s+sleep|pre-?sleep)\b/i,
        /\bbismika\s+allahumma\b/i,
        /\bsleep.*right\s+side\b/i,
      ],
    },
  },
  tahajjud: {
    submodules: ['faith-salah', 'intellect-thinking'],
    matchers: [
      /\btahajjud\b/i,
      /\bqiyam(?:\s*al-?layl)?\b/i,
      /\bnight\s+prayer\b/i,
      /\bmunajat\b/i,
      /\b(?:reflect|contemplat|tafakkur|meditat)/i,
      /\bistikhara\b/i,
      /\bkhushu['ʿ]?\b/i,
      /\b(?:witr|light\s+du|prophetic\s+supplications?|siwak|rawatib)\b/i,
      /\brise\s+for\s+tahajjud\b/i,
      /\bseal\s+the\s+night\b/i,
    ],
    phaseMatchers: {
      before: [
        /\bprayer-phase:before\b/i,
        /\btransition:tahajjud-waking\b/i,
        /\bpre-?prayer\b/i,
        /\b(?:siwak|wudu|ablution)\b/i,
        /\b(?:wake|waking|rub.*sleep|rise.*night|rise\s+for\s+tahajjud)/i,
        /\b(?:al-?imran|istiftah|wake-?du|wake.*du['ʿ]?a)\b/i,
      ],
      after: [
        /\bprayer-phase:after\b/i,
        /\btransition:post-witr\b/i,
        /\bpost-?prayer\b/i,
        /\b(?:after\s+witr|light\s+du|witr\s+du|post-?witr|seal\s+the\s+night)\b/i,
        /\b(?:subhanal-?malik|qunut|last\s+third)\b/i,
      ],
    },
  },
  fajr: {
    submodules: ['faith-shahada', 'faith-salah', 'life-physical'],
    matchers: [
      /\b(?:fajr|dawn|sunrise|pre-?dawn)\b/i,
      /\bmorning\s+(?:routine|adhkar|supplication)/i,
      /\b(?:quran|qur['ʾ]?an|recit)/i,
      /\b(?:dhikr|remembrance|adhkar)\b/i,
      /\bwudu\b/i,
      /\b(?:begin|start).*\bday\b/i,
      /\btawhid\b/i,
      /\bshahada\b/i,
      /\b(?:pre-?prayer|post-?prayer|rawatib|sunnah\s+prayer|siwak|sutrah|adhan|tasbih|istighfar|ayat\s+al-?kursi|ishraq|prophetic\s+supplications?)\b/i,
    ],
    phaseMatchers: {
      before: [
        /\bprayer-phase:before\b/i,
        /\bpre-?prayer\b/i,
        /\b(?:before\s+(?:salah|prayer|the\s+fard|fajr))\b/i,
        /\b(?:siwak|sutrah|adhan|wudu|ablution|rawatib)\b/i,
      ],
      after: [
        /\bprayer-phase:after\b/i,
        /\bpost-?prayer\b/i,
        /\b(?:after\s+(?:salah|prayer|fard|fajr))\b/i,
        /\b(?:ishraq|until\s+sunrise|remain\s+in.*musalla|tasbih|istighfar|ayat\s+al-?kursi|prophetic\s+supplications?)\b/i,
      ],
    },
  },
  morning: {
    submodules: ['faith-salah', 'intellect-professional', 'wealth-earning', 'work', 'intellect-learning'],
    matchers: [
      /\b(?:work|project|task|deliverable|goal)\b/i,
      /\b(?:productiv|focus|deep\s+work)/i,
      /\b(?:learn|stud|read|skill|knowledge|course)/i,
      /\b(?:career|profession|job|role)\b/i,
      /\b(?:earn|income|business|revenue|client|customer)\b/i,
      /\b(?:plan|schedul|prioriti[sz]e|roadmap)/i,
      /\b(?:meeting|email|communicat)/i,
      /\bcraft|mastery|excellence\b/i,
      /\btransition:(?:waking|morning-adhkar|end-of-morning)\b/i,
      /\b(?:waking\s+du|morning\s+adhkar|sayyid\s+al-?istighfar)\b/i,
      /\bclose\s+the\s+morning\b/i,
      /\bpray.*dhuhr.*(?:first|earliest)\s+time\b/i,
    ],
    phaseMatchers: {
      before: [
        /\bprayer-phase:before\b/i,
        /\btransition:(?:waking|morning-adhkar)\b/i,
        /\b(?:waking\s+du|upon\s+(?:rising|waking))\b/i,
        /\bmorning\s+adhkar\b/i,
        /\bsayyid\s+al-?istighfar\b/i,
        /\b(?:asbahna|allahumma\s+bika\s+asbahna)\b/i,
        /\bishraq\b/i,
      ],
      after: [
        /\bprayer-phase:after\b/i,
        /\btransition:end-of-morning\b/i,
        /\b(?:end\s+of\s+morning|midday\s+transition|pre-?dhuhr)\b/i,
        /\b(?:pause.*work.*prayer|prayer\s+at\s+(?:the\s+)?(?:first|proper|earliest)\s+time)\b/i,
      ],
    },
  },
  'midday-labor': {
    submodules: ['wealth-earning', 'wealth-circulation', 'intellect-professional', 'work', 'community', 'neighbors', 'collective'],
    moduleGroups: [
      {
        id: 'wealth',
        label: 'Wealth',
        submodules: ['wealth-earning', 'wealth-circulation', 'intellect-professional', 'work'],
      },
      {
        id: 'community',
        label: 'Community',
        submodules: ['community', 'neighbors', 'collective'],
      },
    ],
    matchers: [
      /\b(?:work|project|task|deliverable|goal|deep\s+work|focus)\b/i,
      /\b(?:earn|income|business|revenue|client|customer|contract|invoice)\b/i,
      /\b(?:halal|amanah|rizq|livelihood|barakah)\b/i,
      /\b(?:plan|schedul|prioriti[sz]e|roadmap|standup|handoff|shutdown)\b/i,
      /\b(?:meeting|collaborat|team|colleague|co-?worker)\b/i,
      /\b(?:community|neighbo[u]?r|ummah|collective|mutual\s+aid|dawah)\b/i,
    ],
    phaseMatchers: {
      before: [
        /\bphase:before\b/i,
        /\b(?:plan|planning|standup|intent|niyyah|prepare|prep|warm-?up)\b/i,
        /\b(?:shura|consult|align|kickoff)\b/i,
      ],
      after: [
        /\bphase:after\b/i,
        /\b(?:handoff|shutdown|retro|review|close[\s-]?out|wrap)\b/i,
        /\b(?:gratitude|alhamdulillah|reflection)\b/i,
      ],
    },
  },
  dhuhr: {
    submodules: ['faith-salah', 'life-social', 'people'],
    matchers: [
      /\b(?:dhuhr|zuhr|midday|noon)\b/i,
      /\b(?:reset|realign|refocus|recenter|pause|break)\b/i,
      /\b(?:intention|niyyah|purpose|mission)\b/i,
      /\b(?:prayer\s+on\s+time|five\s+daily\s+prayers|salah)\b/i,
      /\b(?:colleague|team|coworker|social|character|akhlaq)/i,
      /\b(?:honest|truthful|trust|amanah)/i,
      /\b(?:pre-?prayer|post-?prayer|rawatib|sunnah\s+prayer|siwak|sutrah|adhan|tasbih|istighfar|ayat\s+al-?kursi|prophetic\s+supplications?)\b/i,
    ],
    phaseMatchers: {
      before: [
        /\bprayer-phase:before\b/i,
        /\bpre-?prayer\b/i,
        /\b(?:before\s+(?:salah|prayer|the\s+fard|dhuhr))\b/i,
        /\b(?:siwak|sutrah|adhan|wudu|ablution|rawatib)\b/i,
      ],
      after: [
        /\bprayer-phase:after\b/i,
        /\bpost-?prayer\b/i,
        /\b(?:after\s+(?:salah|prayer|fard|dhuhr))\b/i,
        /\b(?:tasbih|istighfar|ayat\s+al-?kursi|prophetic\s+supplications?)\b/i,
      ],
    },
  },
  asr: {
    submodules: ['faith-salah', 'wealth-earning', 'wealth-financial', 'intellect-cognitive'],
    matchers: [
      /\b(?:asr|afternoon|late\s+afternoon)\b/i,
      /\b(?:close\s*out|wrap|complete|finish|finali[sz])/i,
      /\b(?:review|reflect|evaluat|audit)/i,
      /\b(?:financ|invest|budget|debt|riba|zakat|zakah)/i,
      /\b(?:halal|haram)\b/i,
      /\b(?:income|earning|wealth)/i,
      /\b(?:discipline|habit|consistency)/i,
      /\b(?:middle\s+prayer|pre-?prayer|post-?prayer|rawatib|siwak|sutrah|adhan|tasbih|istighfar|ayat\s+al-?kursi|prophetic\s+supplications?|grave)\b/i,
    ],
    phaseMatchers: {
      before: [
        /\bprayer-phase:before\b/i,
        /\bpre-?prayer\b/i,
        /\b(?:before\s+(?:salah|prayer|the\s+fard|asr))\b/i,
        /\b(?:siwak|sutrah|adhan|wudu|ablution|rawatib|middle\s+prayer)\b/i,
      ],
      after: [
        /\bprayer-phase:after\b/i,
        /\bpost-?prayer\b/i,
        /\b(?:after\s+(?:salah|prayer|fard|asr))\b/i,
        /\b(?:tasbih|istighfar|ayat\s+al-?kursi|prophetic\s+supplications?|refuge.*grave|grave)\b/i,
      ],
    },
  },
  witr: {
    submodules: ['faith-salah'],
    matchers: [
      /\b(?:witr|al-?witr|salat\s+al-?witr|witr\s+prayer)\b/i,
      /\b(?:odd\s+rak[ʿ']?ah|seal\s+the\s+night|last\s+prayer\s+(?:of|at)\s+(?:the\s+)?night)\b/i,
      /\b(?:qunut|du[ʿ']?a\s+al-?qunut|qunoot)\b/i,
      /\btransition:witr\b/i,
    ],
    phaseMatchers: {
      before: [
        /\bphase:before\b/i,
        /\b(?:wudu|ablution|niyyah\s+for\s+witr|prepare\s+(?:for\s+)?witr)\b/i,
      ],
      after: [
        /\bphase:after\b/i,
        /\b(?:after\s+witr|post-?witr|seal(?:ed)?\s+the\s+night)\b/i,
      ],
    },
  },
  bedtime: {
    submodules: ['faith-salah', 'life-physical', 'family-home'],
    matchers: [
      /\b(?:bedtime|sleep|pre-?sleep|before\s+sleep)\b/i,
      /\b(?:sunan\s+al-?nawm|right\s+side|wudu\s+before\s+sleep)\b/i,
      /\b(?:bismika\s+allahumma|allahumma\s+aslamtu\s+wajhi)\b/i,
      /\b(?:ayat\s+al-?kursi|surah\s+al-?mulk|three\s+quls|al-?ikhlas|al-?falaq|an-?nas)\b/i,
      /\btransition:bedtime\b/i,
    ],
    phaseMatchers: {
      before: [
        /\bphase:before\b/i,
        /\b(?:wudu|ablution|dust\s+bed|dust\s+off\s+bed)\b/i,
      ],
      after: [
        /\bphase:after\b/i,
        /\b(?:upon\s+(?:waking|rising)|alhamdulillah\s+alladhi\s+ahyana)\b/i,
      ],
    },
  },
  'qiyam-rest': {
    submodules: ['faith-salah', 'life-physical'],
    matchers: [
      /\b(?:qiyam[- ]rest|sleep\s+with\s+niyyah|niyyah\s+(?:for|to\s+rise|to\s+pray\s+at\s+night))\b/i,
      /\b(?:rise\s+for\s+(?:tahajjud|qiyam)|wake\s+for\s+(?:tahajjud|qiyam))\b/i,
      /\b(?:satan.*knot|three\s+knots|knots.*head)\b/i,
      /\btransition:qiyam-rest\b/i,
    ],
    phaseMatchers: {
      before: [
        /\bphase:before\b/i,
        /\b(?:set\s+(?:alarm|niyyah)\s+(?:for|to\s+rise))\b/i,
      ],
      after: [
        /\bphase:after\b/i,
        /\b(?:upon\s+waking|first\s+words\s+on\s+waking)\b/i,
      ],
    },
  },
  sahari: {
    submodules: ['faith-siyam', 'life-physical'],
    matchers: [
      /\b(?:sahari|sahur|suhur|suhoor|pre-?dawn\s+meal|predawn)\b/i,
      /\b(?:imsak|barakah\s+in\s+suhur|distinguish.*fasting.*book)\b/i,
      /\btransition:sahari\b/i,
    ],
    phaseMatchers: {
      before: [
        /\bphase:before\b/i,
        /\b(?:prepare\s+suhur|wake\s+for\s+suhur)\b/i,
      ],
      after: [
        /\bphase:after\b/i,
        /\b(?:after\s+suhur|fajr\s+(?:approach|arrival))\b/i,
      ],
    },
  },
  duha: {
    submodules: ['faith-salah', 'life-physical', 'intellect-thinking'],
    matchers: [
      /\b(?:duha|ad-?duha|forenoon|chasht|ishraq)\b/i,
      /\b(?:two\s+rak[ʿ']?ahs?|2\s+rak[ʿ']?ahs?)\b/i,
      /\b(?:charity\s+of\s+every\s+joint|sadaqah.*joint)\b/i,
      /\b(?:abu\s+hurayrah|abu\s+dharr).*(?:three|fasting|witr|duha)/i,
      /\btransition:duha\b/i,
    ],
    phaseMatchers: {
      before: [
        /\bphase:before\b/i,
        /\b(?:wudu|ablution|niyyah)\b/i,
      ],
      after: [
        /\bphase:after\b/i,
        /\b(?:after\s+duha|post-?duha)\b/i,
      ],
    },
  },
  qaylulah: {
    submodules: ['life-physical', 'life-mental'],
    matchers: [
      /\b(?:qaylulah|qayl|midday\s+nap|noon\s+nap|short\s+nap)\b/i,
      /\b(?:rest|nap|siesta)\b/i,
      /\b(?:strength.*night\s+prayer|prepare.*qiyam)\b/i,
      /\btransition:qaylulah\b/i,
    ],
    phaseMatchers: {
      before: [
        /\bphase:before\b/i,
        /\b(?:wind-?down|prepare.*nap)\b/i,
      ],
      after: [
        /\bphase:after\b/i,
        /\b(?:after\s+(?:nap|qaylulah)|wake.*nap)\b/i,
      ],
    },
  },
  'after-asr': {
    submodules: ['family-marriage', 'family-parenting', 'family-kinship', 'family-home'],
    matchers: [
      /\b(?:after\s+asr|post-?asr|return\s+home)\b/i,
      /\b(?:family|spouse|wife|husband|child|children|parent|kin)\b/i,
      /\b(?:home|household|domestic|tarbiyah)\b/i,
      /\b(?:rotation\s+among\s+wives|visit\s+wives)\b/i,
      /\btransition:after-asr\b/i,
    ],
    phaseMatchers: {
      before: [
        /\bphase:before\b/i,
        /\b(?:close.*work|wrap.*work|leave\s+work)\b/i,
      ],
      after: [
        /\bphase:after\b/i,
        /\b(?:before\s+maghrib|pre-?maghrib|sunset\s+approach)\b/i,
      ],
    },
  },
  jumuah: {
    submodules: ['faith-salah', 'community', 'collective', 'people'],
    matchers: [
      /\b(?:jumu[a']?ah|friday\s+prayer|congregational\s+prayer)\b/i,
      /\b(?:ghusl|miswak|perfume|white\s+clothes|walk\s+to\s+(?:the\s+)?masjid)\b/i,
      /\b(?:surah\s+al-?kahf|kahf|al-?kahf)\b/i,
      /\b(?:salawat|salat\s+ala\s+an-?nabi|invoke\s+blessings\s+on\s+(?:the\s+)?prophet)\b/i,
      /\b(?:khutbah|sermon)\b/i,
      /\btransition:jumuah\b/i,
    ],
    phaseMatchers: {
      before: [
        /\bphase:before\b/i,
        /\b(?:ghusl|miswak|perfume|prepare.*jumu|walk.*masjid|recite.*kahf)\b/i,
      ],
      after: [
        /\bphase:after\b/i,
        /\b(?:after\s+jumu|post-?jumu|salawat)\b/i,
      ],
    },
  },
  'maghrib-iftar': {
    submodules: ['faith-salah', 'faith-siyam'],
    matchers: [
      /\biftar\b/i,
      /\b(?:break.*fast|breaking.*fast)\b/i,
      /\b(?:dhahaba\s+al-?zama|allahumma\s+laka\s+sumtu|iftar\s+du[ʿ']?a)\b/i,
      /\btransition:maghrib-iftar\b/i,
    ],
    phaseMatchers: {
      before: [/\bphase:before\b/i, /\b(?:prepare.*iftar|niyyah.*fast)\b/i],
      after:  [/\bphase:after\b/i,  /\b(?:after\s+iftar|post-?iftar)\b/i],
    },
  },
  'isha-taraweeh': {
    submodules: ['faith-salah', 'faith-siyam'],
    matchers: [
      /\btaraweeh\b/i,
      /\bqiyam\s+ramadan\b/i,
      /\b(?:stand.*night.*ramadan|night\s+prayer.*ramadan)\b/i,
      /\btransition:isha-taraweeh\b/i,
    ],
    phaseMatchers: {
      before: [/\bphase:before\b/i, /\b(?:prepare.*taraweeh|wudu.*taraweeh)\b/i],
      after:  [/\bphase:after\b/i,  /\b(?:after\s+taraweeh|post-?taraweeh|witr.*ramadan)\b/i],
    },
  },
  'traveler-departure': {
    submodules: ['faith-salah', 'ummah-community', 'family-home'],
    matchers: [
      /\b(?:travel|safar|journey|depart|trip)\b/i,
      /\b(?:qasr|shorten.*prayer|jam[\u02bb']?|combin.*prayer)\b/i,
      /\b(?:dua.*travel|travel.*dua|safar.*dua)\b/i,
      /\b(?:mount|conveyance|vehicle|board.*flight)\b/i,
      /\btransition:traveler-departure\b/i,
    ],
    phaseMatchers: {
      before: [/\bphase:before\b/i, /\b(?:niyyah.*travel|prepare.*journey)\b/i],
      after:  [/\bphase:after\b/i,  /\b(?:after\s+departure|en\s+route)\b/i],
    },
  },
  'traveler-arrival': {
    submodules: ['faith-salah', 'family-home', 'ummah-community'],
    matchers: [
      /\b(?:arrival|return|home(?:coming)?|aibun|ta\u02beibun)\b/i,
      /\b(?:enter.*home|return.*journey)\b/i,
      /\btransition:traveler-arrival\b/i,
    ],
    phaseMatchers: {
      before: [/\bphase:before\b/i, /\b(?:approach.*home|takbir.*ascent)\b/i],
      after:  [/\bphase:after\b/i,  /\b(?:after\s+return|resume.*resident)\b/i],
    },
  },
  'eid-prayer': {
    submodules: ['faith-salah', 'ummah-community', 'family-home'],
    matchers: [
      /\beid\b/i,
      /\b(?:salat\s+al-?[ʿ']?id|[ʿ']?id\s+prayer|musalla)\b/i,
      /\b(?:takbir|takbeer|takbirat)\b/i,
      /\b(?:zakat\s+al-?fitr|fitrana)\b/i,
      /\b(?:udhiyyah|qurbani|sacrifice)\b/i,
      /\btransition:eid-prayer\b/i,
    ],
    phaseMatchers: {
      before: [
        /\bphase:before\b/i,
        /\b(?:before\s+eid|odd\s+dates|ghusl.*eid|best\s+clothes)\b/i,
        /\bzakat\s+al-?fitr\b/i,
      ],
      after: [
        /\bphase:after\b/i,
        /\b(?:after\s+eid|return.*different\s+route|udhiyyah|qurbani)\b/i,
      ],
    },
  },
  'istijabah-hour': {
    submodules: ['faith-salah', 'faith-shahada'],
    matchers: [
      /\bistijabah\b/i,
      /\b(?:hour\s+of\s+(?:istijabah|acceptance)|sa['ʿ]?ah\s+of\s+istijabah)\b/i,
      /\b(?:last\s+hour\s+(?:before|of)\s+(?:maghrib|friday)|friday.*last\s+hour)\b/i,
      /\b(?:du[ʿ']?a.*friday|friday.*du[ʿ']?a)\b/i,
      /\btransition:istijabah-hour\b/i,
    ],
    phaseMatchers: {
      before: [
        /\bphase:before\b/i,
        /\b(?:prepare.*du|niyyah.*istijabah)\b/i,
      ],
      after: [
        /\bphase:after\b/i,
        /\b(?:after\s+istijabah|post-?istijabah)\b/i,
      ],
    },
  },
  maghrib: {
    submodules: ['faith-salah', 'family-marriage', 'family-parenting', 'family-kinship', 'family-home'],
    matchers: [
      /\b(?:maghrib|sunset|dusk|evening)\b/i,
      /\b(?:family|spouse|wife|husband|child|children|parent|kin|sibling|relative)\b/i,
      /\b(?:dinner|iftar|meal)/i,
      /\b(?:home|household|household\s+adhkar)\b/i,
      /\b(?:transition|end.*day|close.*day)\b/i,
      /\b(?:marriage|parenting|tarbiyah)/i,
      /\b(?:pre-?prayer|post-?prayer|rawatib|sunnah\s+prayer|siwak|sutrah|adhan|tasbih|istighfar|ayat\s+al-?kursi|prophetic\s+supplications?)\b/i,
    ],
    phaseMatchers: {
      before: [
        /\bprayer-phase:before\b/i,
        /\bpre-?prayer\b/i,
        /\b(?:before\s+(?:salah|prayer|the\s+fard|maghrib))\b/i,
        /\b(?:siwak|sutrah|adhan|wudu|ablution|rawatib|break.*fast|iftar)\b/i,
      ],
      after: [
        /\bprayer-phase:after\b/i,
        /\bpost-?prayer\b/i,
        /\b(?:after\s+(?:salah|prayer|fard|maghrib))\b/i,
        /\b(?:tasbih|istighfar|ayat\s+al-?kursi|prophetic\s+supplications?|la\s+ilaha\s+illallah.*ten)\b/i,
      ],
    },
  },
};

// project.moduleId → canonical submodule id.
// Mirrors the logic in src/store/task-store.js (resolveSubmoduleFromProject)
// but in reverse-lookup form so we can filter projects by TOD target.
export const MODULE_ID_TO_SUBMODULE_ID = {
  // Faith (project moduleIds use legacy short forms)
  shahada: 'faith-shahada',
  salat: 'faith-salah',
  zakat: 'faith-zakah',
  siyam: 'faith-siyam',
  hajj: 'faith-hajj',
  // Life
  physical: 'life-physical',
  mental: 'life-mental',
  safety: 'life-safety',
  social: 'life-social',
  // Intellect
  learning: 'intellect-learning',
  thinking: 'intellect-thinking',
  cognitive: 'intellect-cognitive',
  professional: 'intellect-professional',
  // Family
  marriage: 'family-marriage',
  parenting: 'family-parenting',
  kinship: 'family-kinship',
  home: 'family-home',
  'family-office': 'family-office',
  // Wealth
  earning: 'wealth-earning',
  financial: 'wealth-financial',
  ownership: 'wealth-ownership',
  circulation: 'wealth-circulation',
  // Standalone / BBOS-Biz
  work: 'work',
  money: 'money',
  people: 'people',
  office: 'office',
  tech: 'tech',
};

// Aladhan timings key per node (mirrors NODE_TIMING in PropheticPath.jsx).
// Co-located here so non-component callers can derive node anchor times
// without importing the timeline component.
export const NODE_TIMING_KEY = {
  isha:           'Isha',
  witr:           'Isha',
  bedtime:        'Isha',
  'qiyam-rest':   'Lastthird',
  tahajjud:       'Lastthird',
  sahari:         'Imsak',
  fajr:           'Fajr',
  duha:           'Sunrise',
  morning:        'Sunrise',
  qaylulah:       'Dhuhr',
  dhuhr:          'Dhuhr',
  jumuah:         'Dhuhr',
  'midday-labor': 'Dhuhr',
  asr:            'Asr',
  'after-asr':    'Asr',
  'istijabah-hour': 'Maghrib',
  maghrib:        'Maghrib',
  'maghrib-iftar': 'Maghrib',
  'isha-taraweeh': 'Isha',
  'eid-prayer':   'Sunrise',
};

// Friday is the only day-of-week branch in the spine. On Fridays jumuah
// replaces dhuhr and the last hour before Maghrib surfaces as istijabah-hour.
export function isFriday(date = new Date()) {
  return date.getDay() === 5;
}

// Hijri-date helpers. Aladhan returns hijri = { day, month: { number }, year, ... }.
// All helpers accept this shape (or null) and return false when hijri is unavailable.
function hijriParts(hijri) {
  if (!hijri) return null;
  const day = Number(hijri.day);
  const month = Number(hijri.month?.number ?? hijri.month);
  if (!Number.isFinite(day) || !Number.isFinite(month)) return null;
  return { day, month };
}

export function isRamadan(hijri) {
  const p = hijriParts(hijri);
  return !!p && p.month === 9;
}

export function isEidFitr(hijri) {
  const p = hijriParts(hijri);
  return !!p && p.month === 10 && p.day === 1;
}

export function isEidAdha(hijri) {
  const p = hijriParts(hijri);
  return !!p && p.month === 12 && p.day === 10;
}

export function isTashreeq(hijri) {
  const p = hijriParts(hijri);
  return !!p && p.month === 12 && p.day >= 11 && p.day <= 13;
}

export function isArafah(hijri) {
  const p = hijriParts(hijri);
  return !!p && p.month === 12 && p.day === 9;
}

export function isLastTenNights(hijri) {
  const p = hijriParts(hijri);
  return !!p && p.month === 9 && p.day >= 21;
}

// Phase-window minutes around a node anchor.
// before: [-BEFORE_MIN, anchor)   during: [anchor, anchor+DURING_MIN)   after: rest
const PHASE_BEFORE_MIN = 25;
const PHASE_DURING_MIN = 15;

function timingsToMs(raw, today) {
  if (typeof raw !== 'string') return null;
  const clean = raw.replace(/\s*\(.*\)/, '');
  if (!/^\d{1,2}:\d{2}/.test(clean)) return null;
  const [h, m] = clean.split(':').map(Number);
  const d = new Date(today);
  d.setHours(h, m, 0, 0);
  return d.getTime();
}

// Given a node id, current Date, and Aladhan timings, return 'before' | 'during' | 'after'.
// Falls back to 'during' when no timings are available.
export function inferPhaseForNode(nodeId, now = new Date(), timings = null) {
  const key = NODE_TIMING_KEY[nodeId];
  if (!key || !timings) return 'during';
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const anchorMs = timingsToMs(timings[key], today);
  if (anchorMs == null) return 'during';
  const diff = now.getTime() - anchorMs; // negative = before anchor
  if (diff < 0 && diff >= -PHASE_BEFORE_MIN * 60_000) return 'before';
  if (diff >= 0 && diff < PHASE_DURING_MIN * 60_000) return 'during';
  return diff < 0 ? 'before' : 'after';
}

// Hour-range fallback for when no active prayer window is returned by
// usePrayerTimes. Returns the PropheticPath node id.
export function inferNodeFromHour(date = new Date()) {
  const h = date.getHours() + date.getMinutes() / 60;
  const friday = isFriday(date);
  if (h < 2) return 'bedtime';
  if (h < 4) return 'qiyam-rest';
  if (h < 5) return 'tahajjud';
  if (h < 5.5) return 'sahari';
  if (h < 6.5) return 'fajr';
  if (h < 7.5) return 'duha';
  if (h < 11.5) return 'morning';
  if (h < 12.5) return 'qaylulah';
  if (h < 13.5) return friday ? 'jumuah' : 'dhuhr';
  if (h < 15) return 'midday-labor';
  if (h < 17) return 'asr';
  if (h < 18.5) return friday ? 'istijabah-hour' : 'after-asr';
  if (h < 20) return 'maghrib';
  if (h < 21) return 'isha';
  if (h < 22) return 'witr';
  return 'bedtime';
}

// Project id encodes Maqasid level via suffix. 1 = Daruriyyat, 2 = Hajiyyat, 3 = Tahsiniyyat.
export function levelFromProjectId(projectId) {
  if (!projectId) return 3;
  if (projectId.endsWith('_core')) return 1;
  if (projectId.endsWith('_growth')) return 2;
  if (projectId.endsWith('_excellence')) return 3;
  return 3;
}

export const LEVEL_LABEL = { 1: 'L1', 2: 'L2', 3: 'L3' };
export const LEVEL_FULL_LABEL = {
  1: 'Daruriyyat',
  2: 'Hajiyyat',
  3: 'Tahsiniyyat',
};

const PRIORITY_RANK = { urgent: 0, high: 1, medium: 2, low: 3 };

// Build the sorted task list for a given TOD node.
//   nodeId         — one of the keys in TOD_SUBMODULES
//   projects       — array from useProjectStore().projects
//   tasksByProject — object from useTaskStore().tasksByProject
//   limit          — optional cap on returned rows (default 8)
// Returns: [{ id, projectId, title, priority, dueDate, _level, _submoduleId, _submoduleName }]
// Normalise a TOD entry (array or object) to
// { submodules, matchers, phaseMatchers, moduleGroups }.
function resolveEntry(nodeId) {
  const raw = TOD_SUBMODULES[nodeId];
  if (!raw) return { submodules: [], matchers: null, phaseMatchers: null, moduleGroups: [] };
  if (Array.isArray(raw)) return { submodules: raw, matchers: null, phaseMatchers: null, moduleGroups: [] };
  return {
    submodules: raw.submodules || [],
    matchers: (raw.matchers && raw.matchers.length > 0) ? raw.matchers : null,
    phaseMatchers: raw.phaseMatchers || null,
    moduleGroups: Array.isArray(raw.moduleGroups) ? raw.moduleGroups : [],
  };
}

// Public helper: return module groups for a node, or [] if none are defined.
// UI layers use this to decide whether to render a Wealth/Community-style toggle.
export function getModuleGroups(nodeId) {
  return resolveEntry(nodeId).moduleGroups;
}

// Auto-seeded pillar/submodule/level boards (created by ensure*Projects in
// project-store.js) are flagged with one of these keys. They are not shown
// in the prophetic-path Action list — only real user projects appear there.
const SEEDED_PILLAR_FLAGS = [
  '_faithModule', '_lifeModule', '_intellectModule', '_familyModule',
  '_wealthModule', '_environmentModule', '_ummahModule',
  '_weeklyModule', '_prayerModule',
];
function isSeededPillarBoard(p) {
  return SEEDED_PILLAR_FLAGS.some((k) => p[k] === true);
}

// User-created projects (seeded pillar boards filtered out) whose moduleId
// resolves to one of the given submoduleIds. Used by the Action tab to show
// only projects that belong to the currently active moduleGroup (Wealth/
// Community/etc.). Weekly planning will later narrow further.
const PILLAR_TO_SUBMODULES = {
  faith:       ['faith-shahada', 'faith-salah', 'faith-zakah', 'faith-siyam', 'faith-hajj'],
  life:        ['life-physical', 'life-mental', 'life-safety', 'life-social'],
  intellect:   ['intellect-learning', 'intellect-thinking', 'intellect-cognitive', 'intellect-professional'],
  family:      ['family-marriage', 'family-parenting', 'family-kinship', 'family-home'],
  wealth:      ['wealth-earning', 'wealth-financial', 'wealth-ownership', 'wealth-circulation'],
  environment: ['env-resource', 'env-waste', 'env-ecosystem', 'env-sourcing'],
  ummah:       ['collective', 'neighbors', 'community'],
};

export function buildUserProjectsForScope(projects, submoduleIds) {
  if (!submoduleIds || submoduleIds.length === 0) return [];
  const scope = new Set(submoduleIds);
  return (projects || []).filter((p) => {
    if (p.archived || isSeededPillarBoard(p)) return false;
    if (!p.moduleId) return false;
    const pillarSubs = PILLAR_TO_SUBMODULES[p.moduleId];
    if (pillarSubs && pillarSubs.some((id) => scope.has(id))) return true;
    const canonical = MODULE_ID_TO_SUBMODULE_ID[p.moduleId] || p.moduleId;
    return scope.has(canonical);
  });
}

// Return the list of (non-archived) projects that fall within a node's scope,
// optionally narrowed to a single module group. Used by the midday-labor node's
// Action mode, which renders a project list instead of a task list.
export function buildProjectsForNode(nodeId, projects, options = {}) {
  const { moduleId = null } = options;
  const { submodules: targetSubmodules, moduleGroups } = resolveEntry(nodeId);
  if (targetSubmodules.length === 0) return [];

  let scopeSubmodules = targetSubmodules;
  if (moduleId && moduleGroups.length > 0) {
    const group = moduleGroups.find((g) => g.id === moduleId);
    if (group && Array.isArray(group.submodules) && group.submodules.length > 0) {
      scopeSubmodules = group.submodules;
    }
  }
  const targetSet = new Set(scopeSubmodules);

  return (projects || []).filter((p) => {
    if (p.archived || isSeededPillarBoard(p)) return false;
    const canonical = MODULE_ID_TO_SUBMODULE_ID[p.moduleId] || p.moduleId;
    return canonical && targetSet.has(canonical);
  });
}

// List of submodule ids in a node's active module group (or the full node
// scope if no group matches). Used by the Education tab to render one card
// per submodule dashboard.
export function submodulesForNode(nodeId, moduleId = null) {
  const { submodules: targetSubmodules, moduleGroups } = resolveEntry(nodeId);
  if (moduleId && moduleGroups.length > 0) {
    const group = moduleGroups.find((g) => g.id === moduleId);
    if (group && Array.isArray(group.submodules) && group.submodules.length > 0) {
      return group.submodules;
    }
  }
  return targetSubmodules;
}

function titleMatches(title, matchers) {
  if (!matchers) return true;
  const t = title || '';
  for (const re of matchers) {
    if (re.test(t)) return true;
  }
  return false;
}

// A task matches a phase if any of its tags or title matches the phase regexes.
function taskMatchesPhase(task, phaseRegexes) {
  if (!phaseRegexes || phaseRegexes.length === 0) return false;
  const haystacks = [task.title || '', ...(task.tags || [])];
  for (const re of phaseRegexes) {
    for (const h of haystacks) {
      if (re.test(h)) return true;
    }
  }
  return false;
}

export function buildTasksForNode(nodeId, projects, tasksByProject, options = {}) {
  const { limit = 8, submoduleNameById = {}, phase = null, moduleId = null } = options;
  const { submodules: targetSubmodules, matchers, phaseMatchers, moduleGroups } = resolveEntry(nodeId);
  if (targetSubmodules.length === 0) return [];

  // If a module group is active, intersect scope with that group's submodules.
  let scopeSubmodules = targetSubmodules;
  if (moduleId && moduleGroups.length > 0) {
    const group = moduleGroups.find((g) => g.id === moduleId);
    if (group && Array.isArray(group.submodules) && group.submodules.length > 0) {
      scopeSubmodules = group.submodules;
    }
  }
  const targetSet = new Set(scopeSubmodules);

  const matchingProjects = (projects || []).filter((p) => {
    const canonical = MODULE_ID_TO_SUBMODULE_ID[p.moduleId] || p.moduleId;
    return canonical && targetSet.has(canonical);
  });

  // Collect all open tasks in the submodule scope (unfiltered pool).
  const scopePool = [];
  for (const project of matchingProjects) {
    const tasks = tasksByProject?.[project.id] || [];
    const canonical = MODULE_ID_TO_SUBMODULE_ID[project.moduleId] || project.moduleId;
    for (const t of tasks) {
      if (t.completedAt) continue;
      scopePool.push({
        id: t.id,
        projectId: project.id,
        title: t.title,
        priority: t.priority || 'medium',
        dueDate: t.dueDate || null,
        columnId: t.columnId,
        subtasks: t.subtasks || [],
        tags: t.tags || [],
        _level: levelFromProjectId(project.id),
        _submoduleId: canonical,
        _submoduleName: submoduleNameById[canonical] || canonical,
        _project: project,
      });
    }
  }

  // Apply content-matchers; if the filter leaves zero rows, fall back to the
  // unfiltered scope pool so the user still sees something for that window.
  let rows = scopePool;
  if (matchers) {
    const matched = scopePool.filter((r) => titleMatches(r.title, matchers));
    rows = matched.length > 0 ? matched : scopePool;
  }

  // Phase filter: before/after narrow the pool via phaseMatchers (title+tags);
  // main returns the remainder (tasks that are NOT before and NOT after).
  // Nodes without phaseMatchers ignore `phase` entirely.
  if (phase && phaseMatchers) {
    const beforeRE = phaseMatchers.before || [];
    const afterRE = phaseMatchers.after || [];
    if (phase === 'before') {
      rows = rows.filter((r) => taskMatchesPhase(r, beforeRE));
    } else if (phase === 'after') {
      rows = rows.filter((r) => taskMatchesPhase(r, afterRE));
    } else if (phase === 'main') {
      rows = rows.filter(
        (r) => !taskMatchesPhase(r, beforeRE) && !taskMatchesPhase(r, afterRE),
      );
    }
  }

  rows.sort((a, b) => (
    (a._level - b._level)
    || (PRIORITY_RANK[a.priority] - PRIORITY_RANK[b.priority])
    || (new Date(a.dueDate || 8640000000000000) - new Date(b.dueDate || 8640000000000000))
  ));

  // Dedupe by (normalized title + level) — legacy migrations sometimes leave
  // overlapping boards (e.g., faith_sawm_core + faith_siyam_core) with
  // identical seed tasks. Keep the first occurrence in sorted order.
  const seen = new Set();
  const deduped = [];
  for (const row of rows) {
    const key = `${row._level}|${(row.title || '').trim().toLowerCase()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    deduped.push(row);
    if (deduped.length >= limit) break;
  }
  return deduped;
}
