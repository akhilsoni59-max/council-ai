import type { Scenario } from '../types';

export const scenarios: Scenario[] = [
  {
    id: 'ki-school',
    prompt: 'Tell me everything about KI School.',
    title: 'Kunskapsskolan International School guide',
    category: 'Education research',
    sources: {
      chatgpt: 'Kunskapsskolan International School is an independent senior-secondary school beside Sector 70A in Gurugram. CBSE SARAS lists affiliation 531683, a 2016 opening, senior-secondary status, and affiliation through March 2029. The school combines Indian curriculum requirements with the KED personalized-learning model and advertises CBSE, Cambridge, and IBDP pathways on its official campus page.',
      grok: 'The useful distinction is between verified facts and admissions claims. The CBSE affiliation, address, opening year, management details, and public-disclosure figures can be checked independently. Current fees, grade-wise seat availability, transport routes, class size, and the exact curriculum available to a child in a given year should be confirmed in writing with the Sector 70A admissions team.',
      gemini: 'The educational model centers on individual goals, personal coaching, and student ownership. Sequential subjects such as mathematics and languages are organized as Steps, while integrated subjects are taught through Themes and project-based missions. A typical day can include base-group planning, workshops, lectures, seminars, communication sessions, labs, arts, music, dance, sports, and enrichment activities.',
      glm: 'For a practical admissions decision, request the current fee schedule, grade-specific curriculum map, teacher and class-size data, assessment policy, transport coverage, meal and extended-day costs, inclusion support, safety procedures, and recent board outcomes. Visit during a normal school day and ask to see how personal coaching and weekly planning work in practice.',
    },
    finalIntro: 'Kunskapsskolan International School (often shortened to KI or KIS) is a private, independent senior-secondary school beside Sector 70A in Gurugram. Its defining feature is the Swedish-origin KED personalized-learning model, used alongside the school\'s Indian and international curriculum pathways.',
    finalSections: [
      {
        heading: 'School profile',
        body: [
          'Official name: Kunskapsskolan International School.',
          'Location: Gul Farm Complex, adjacent to Sector 70A, Gurugram, Haryana 122004.',
          'CBSE affiliation: 531683; CBSE SARAS lists the school at senior-secondary level and records its first opening on 1 April 2016.',
          'The current CBSE affiliation period shown in SARAS runs from 1 April 2024 to 31 March 2029.',
          'The official site says Kunskapsskolan schools in India are operated and managed by Keduventures Smart Services Private Limited; CBSE SARAS names Knowledge Education Trust as the managing committee.',
        ],
      },
      {
        heading: 'Curriculum pathways',
        body: [
          'CBSE: the school has a verifiable CBSE affiliation and describes its national curriculum as integrated with the KED Program.',
          'Cambridge: the official campus page advertises a Cambridge pathway integrated with KED and focused on confident, responsible, reflective, innovative, and engaged learners.',
          'IBDP: the official KI campus page currently displays an IBDP offering. Families should confirm the active grades, authorization status, subject choices, and campus-specific intake directly before applying.',
          'Preschool learning is described as theme-based and focused on language, numeracy, cognitive, social-emotional, and motor development.',
        ],
      },
      {
        heading: 'How the KED learning model works',
        body: [
          'Each student works with clear goals, personal coaching, and a personal time plan intended to build ownership and self-management.',
          'Mathematics and languages are treated as Step subjects: students progress through sequential skills after demonstrating mastery.',
          'EVS, arts, and computers are described as Theme courses, combining subjects through projects and missions.',
          'Assessment can include projects and presentations, with workshops providing targeted individual or small-group support.',
        ],
      },
      {
        heading: 'A typical school day',
        body: [
          'Students begin in a base group with a coach, review daily news, and plan how to use their time against personal and academic goals.',
          'The day may combine workshops, lectures, seminars, communication sessions, and laboratory sessions rather than relying on one lesson format.',
          'Academic sessions are interspersed with art, music, dance, and sports.',
          'The official enrichment program schedules opportunities two or three times a week across sport, technology, creative arts, leadership, innovation, and other life skills.',
        ],
      },
      {
        heading: 'Campus, staffing, and student support',
        body: [
          'The mandatory public disclosure available on the official site reports a 9,234 square-metre campus, 26 classrooms of 60 square metres each, and six laboratories totaling 470 square metres.',
          'The same disclosure reports internet access, nine girls\' toilets, nine boys\' toilets, 41 teachers, one special educator, one counsellor/wellness teacher, and a teacher-section ratio of 1:7.',
          'The school site lists safety and security, POSH, parent-teacher, counselling, special-education, occupational-therapy, infirmary, transport, and security roles. Treat these as disclosure snapshots and ask for current staffing during admission.',
        ],
      },
      {
        heading: 'Admissions and contact',
        body: [
          'Admissions phone shown on the official campus page: +91 95917 48899.',
          'Admissions email: admissions@ked.edu.in.',
          'The official site links to an online application portal for Kunskapsskolan International.',
          'A separate mandatory-disclosure contact is 7027373737 with info@ked.edu.in.',
          'Ask admissions for the current grade-wise fee sheet, one-time charges, meals, transport, extended-day costs, refund rules, assessment or interaction steps, required documents, and seat availability.',
        ],
      },
      {
        heading: 'What to verify before deciding',
        body: [
          'Which curriculum pathway is available for the child\'s exact grade and admission year, and whether changing pathways later is practical.',
          'Current fees and all optional or recurring charges; the official page labels a fee section, but families should obtain the signed current schedule directly.',
          'Actual class size, coach-to-student load, teacher turnover, inclusion support, transport time, meal arrangements, device policy, and homework expectations.',
          'Recent grade-specific board results and university guidance rather than promotional rankings alone.',
          'Visit on a regular working day and ask to observe a base-group or coaching session; this is the clearest way to judge whether the KED model suits the child.',
        ],
      },
      {
        heading: 'Official references used',
        body: [
          'School campus page: https://ked.edu.in/international/',
          'KED and curriculum overview: https://ked.edu.in/curriculum-2/',
          'CBSE SARAS affiliation record: https://saras.cbse.gov.in/SARAS/AffiliatedList/AfflicationDetails/531683',
          'Mandatory public disclosure: https://ked.edu.in/wp-content/uploads/2023/12/annexure-IX-form-ki-2.pdf',
        ],
      },
    ],
    agreement: {
      headline: 'Strong agreement - official records prioritized - admissions details flagged for confirmation',
      mainAgreement: 'KI School combines verified CBSE status with a distinctive KED personalized-learning model, but current grade-level pathways, fees, and availability should be confirmed directly.',
      uniqueInsights: 12,
      uncertainty: 'Fees, seat availability, transport routes, staffing, and campus-specific curriculum offerings can change by academic year.',
      conflicts: ['Promotional curriculum language was separated from independently verifiable affiliation data.', 'Third-party fee estimates were excluded in favor of direct confirmation with the school.'],
    },
    timings: { chatgpt: 2.7, grok: 3.9, gemini: 3.2, glm: 3.5 },
  },
  {
    id: 'startup-launch',
    prompt: 'Build a launch strategy for my AI startup.',
    title: 'AI startup launch strategy',
    category: 'Strategy',
    sources: {
      chatgpt: 'Start with a sharply defined ideal customer profile and a single high-frequency problem. Run a four-week launch: validate positioning with ten interviews, recruit a design-partner cohort, publish proof-driven content, and coordinate a focused launch week. Measure activation, time-to-value, weekly retention, and qualified pipeline rather than traffic alone.',
      grok: 'The largest launch risk is trying to sound like every other AI product. Before spending on acquisition, prove that users will change an existing workflow for this product. Lead with a concrete before-and-after result, set a narrow wedge, and prepare an honest answer for data privacy, reliability, and what happens when the model is wrong.',
      gemini: 'Treat launch as a learning system. Combine category research, search-intent analysis, competitor review, and structured customer interviews. Create benchmark content around the problem, document early-user outcomes, and build distribution partnerships with communities that already aggregate your target audience.',
      glm: 'Prioritize channels by learning speed and cost. Founder-led outreach and a small design-partner cohort should come before broad paid campaigns. Standardize onboarding, create reusable demo assets, automate follow-up, and use a weekly decision cadence to double down on only the channels producing activated users.',
    },
    finalIntro: 'Launch around one measurable transformation for one well-defined customer — then use the first 30 days to turn real user outcomes into your distribution engine.',
    finalSections: [
      { heading: 'Recommended position', body: 'Describe the product as the fastest reliable way for a specific user to complete a specific job. Avoid leading with model architecture. Lead with the outcome, the time saved, and the moment in the workflow where Council AI becomes indispensable.' },
      { heading: 'Target audience', body: ['Primary: one role with an urgent, repeated workflow and authority to adopt a tool.', 'Design partners: 10–15 accessible teams willing to meet weekly and share measurable outcomes.', 'Expansion audience: adjacent roles only after the primary workflow retains users.'] },
      { heading: 'Pre-launch · Days 1–14', body: ['Interview 10 target users and capture the exact language they use for the problem.', 'Onboard 5–8 design partners manually. Define one activation event and instrument it.', 'Build a proof page: problem, 90-second product story, two concrete workflows, and an early result.', 'Prepare trust answers covering data handling, accuracy, limitations, and human review.'] },
      { heading: 'Launch week · Days 15–21', body: ['Publish a founder story anchored in the user problem, not generic AI commentary.', 'Release one benchmark or teardown that is useful even without buying the product.', 'Coordinate customer quotes, community demos, partner mentions, and a focused launch moment.', 'Run live onboarding twice and collect objections in a shared decision log.'] },
      { heading: '30-day scorecard', body: ['Activation: users reaching first value in the initial session.', 'Retention: percentage returning to repeat the core workflow in week two.', 'Quality: successful outputs without manual recovery.', 'Pipeline: qualified conversations and conversion from design partner to paid intent.', 'Learning velocity: validated or rejected assumptions per week.'] },
    ],
    agreement: {
      headline: 'High agreement · 4/4 models completed · 2 conflicting suggestions resolved',
      mainAgreement: 'Start narrow, validate with design partners, and optimize for activation before reach.',
      uniqueInsights: 9,
      uncertainty: 'The strongest channel depends on the audience you choose.',
      conflicts: ['Broad public launch was deferred until retention is visible.', 'Paid acquisition was placed after founder-led validation.'],
    },
    timings: { chatgpt: 2.8, grok: 4.2, gemini: 3.3, glm: 3.7 },
  },
  {
    id: 'frontend-framework',
    prompt: 'Which frontend framework should I choose for a new SaaS platform?',
    title: 'Frontend framework decision',
    category: 'Engineering',
    sources: {
      chatgpt: 'For most SaaS teams, choose React with a production framework such as Next.js when hiring flexibility, a large component ecosystem, and mixed rendering strategies matter. Choose Vue/Nuxt for a gentler learning curve and cohesive conventions. Choose SvelteKit when a smaller team values simple components and can accept a narrower hiring pool.',
      grok: 'Framework choice is rarely the bottleneck. Team familiarity, product iteration speed, testing discipline, and dependency restraint matter more. Default to the framework your team can debug at 2 a.m. Only deviate when a concrete constraint — bundle size, embedded delivery, offline capability, or content rendering — justifies it.',
      gemini: 'Evaluate routing, data fetching, accessibility support, internationalization, observability, deployment targets, ecosystem maturity, and long-term maintenance. A short architecture spike using the hardest screen will reveal more than a feature checklist. Record the decision and its assumptions so it can be revisited rationally.',
      glm: 'Use a weighted decision matrix. Assign the highest weights to current team capability, delivery speed, and operational fit. React/Next.js is the low-risk default for a typical multi-tenant SaaS. Keep business logic framework-agnostic and isolate vendor-specific primitives to reduce future migration cost.',
    },
    finalIntro: 'Choose React with Next.js as the default for a conventional SaaS product — unless your team is substantially faster in Vue or Svelte, in which case team fluency should win.',
    finalSections: [
      { heading: 'Decision rule', body: 'Optimize for the next 24 months of delivery, hiring, and maintenance — not the elegance of the first prototype. Your team’s demonstrated fluency is the strongest predictor of execution speed.' },
      { heading: 'Recommended baseline', body: ['Next.js + TypeScript for broad ecosystem support and flexible rendering.', 'A small, accessible component system with design tokens.', 'Feature modules that keep domain logic outside framework-specific views.', 'Contract-tested API clients so the backend boundary stays replaceable.'] },
      { heading: 'When to choose differently', body: ['Choose Nuxt when your team is deeply experienced in Vue and values its conventions.', 'Choose SvelteKit for a compact product team that prizes component simplicity and controls hiring.', 'Choose a client-only Vite app when SEO and server rendering are irrelevant and the product is fully authenticated.'] },
      { heading: 'One-week validation spike', body: ['Build authentication shell, a data-heavy table, one complex form, and an optimistic update.', 'Test loading, error, empty, and permission states.', 'Measure local build speed, bundle output, accessibility, and deployment ergonomics.', 'Write a short decision record with risks and exit criteria.'] },
    ],
    agreement: {
      headline: 'Strong agreement · 4/4 models completed · 1 trade-off clarified',
      mainAgreement: 'Team fluency and maintainability matter more than benchmark differences.',
      uniqueInsights: 7,
      uncertainty: 'Rendering and deployment constraints were not specified.',
      conflicts: ['The default recommendation was kept conditional on team experience.'],
    },
    timings: { chatgpt: 2.6, grok: 4.0, gemini: 3.2, glm: 3.6 },
  },
  {
    id: 'japan-itinerary',
    prompt: 'Create a seven-day Japan itinerary for a first-time visitor.',
    title: 'Seven-day Japan itinerary',
    category: 'Travel',
    sources: {
      chatgpt: 'Use Tokyo and Kyoto as the two bases to avoid excessive hotel changes. Spend days 1–3 in Tokyo, travel to Kyoto on day 4, take a Nara half-day trip, and finish with Kyoto’s eastern districts. Reserve long-distance trains and popular attractions early, and leave one unstructured evening.',
      grok: 'Seven days is short, so resist adding Osaka, Hiroshima, Hakone, and every famous stop. Jet lag makes an ambitious first morning fragile. Group neighborhoods geographically and protect recovery time. The best itinerary has fewer transit hours and room for accidental discoveries.',
      gemini: 'Balance major cultural sites with contemporary neighborhoods and everyday experiences. In Tokyo, combine Meiji Shrine and Harajuku, then Asakusa and Ueno. In Kyoto, visit Fushimi Inari early, Higashiyama on foot, and Nara if temples and history are priorities. Check seasonal closures and local event calendars.',
      glm: 'Use a simple logistics plan: IC transit card, luggage forwarding, offline map, and two hotel bases near major stations. Schedule the highest-priority site first each day. Keep meals flexible except for one reservation, and create a rain alternative for outdoor-heavy days.',
    },
    finalIntro: 'For a first visit, use two bases — Tokyo and Kyoto — and leave enough breathing room to enjoy each neighborhood instead of collecting stations.',
    finalSections: [
      { heading: 'Days 1–3 · Tokyo', body: ['Day 1: Arrive, check in near Shinjuku or Tokyo Station, and take a gentle evening walk.', 'Day 2: Meiji Shrine → Harajuku → Omotesando → Shibuya at dusk.', 'Day 3: Early Asakusa → Ueno → optional river cruise or a relaxed neighborhood dinner.'] },
      { heading: 'Day 4 · Tokyo to Kyoto', body: ['Take a morning shinkansen, drop luggage, then explore Nishiki Market and Gion.', 'Keep the evening open for a quiet walk around Shirakawa or Pontocho.'] },
      { heading: 'Days 5–7 · Kyoto and Nara', body: ['Day 5: Fushimi Inari early → Tofuku-ji → relaxed central Kyoto afternoon.', 'Day 6: Nara half-day for Todai-ji and Nara Park; return before dinner.', 'Day 7: Kiyomizu-dera → Higashiyama lanes → Nanzen-ji, then depart.'] },
      { heading: 'Practical notes', body: ['Use an IC card for local transit and reserve only the long-distance seats you truly need.', 'Forward large luggage between bases if that makes the train day easier.', 'Book one special meal; let convenience stores, markets, and neighborhood spots handle the rest.', 'Swap Nara for a slower Kyoto day if energy or weather calls for it.'] },
    ],
    agreement: {
      headline: 'High agreement · 4/4 models completed · pace simplified',
      mainAgreement: 'Two bases, geographically grouped days, and a deliberately restrained schedule.',
      uniqueInsights: 8,
      uncertainty: 'Arrival airport, season, budget, and mobility needs are unknown.',
      conflicts: ['Osaka was excluded to protect time and reduce hotel changes.'],
    },
    timings: { chatgpt: 2.9, grok: 4.3, gemini: 3.4, glm: 3.8 },
  },
  {
    id: 'business-risks',
    prompt: 'Review this business idea and identify its biggest risks.',
    title: 'Business idea risk review',
    category: 'Analysis',
    sources: {
      chatgpt: 'Without the underlying idea, begin with five risk categories: problem urgency, reachable market, differentiation, unit economics, and execution. Convert each into a falsifiable assumption, define evidence that would change your mind, and run the cheapest validation test before building further.',
      grok: 'The most dangerous risk is often polite interest mistaken for demand. Ask for a commitment: time, data, an introduction, a pilot agreement, or money. Also test whether an incumbent can bundle the feature, whether switching costs block adoption, and whether the business depends on one platform’s rules.',
      gemini: 'Build an evidence map separating known facts, research-backed estimates, and founder assumptions. Review regulatory exposure, data rights, accessibility, customer concentration, and competitor substitutes. Use interviews across buyers, end users, and blockers because their incentives frequently differ.',
      glm: 'Rank risks by impact, probability, and cost to test. Prioritize reversible experiments: landing-page demand test, concierge pilot, willingness-to-pay interviews, and a manual delivery prototype. Set kill criteria in advance to prevent sunk-cost bias from keeping a weak direction alive.',
    },
    finalIntro: 'The right risk review is not a list of worries; it is a prioritized validation plan that tells you what to test before you spend more time or money.',
    finalSections: [
      { heading: 'The five biggest risk areas', body: ['Demand: the problem may be real but not urgent enough to change behavior.', 'Distribution: the audience may be identifiable but expensive or slow to reach.', 'Differentiation: an incumbent may copy, bundle, or out-distribute the product.', 'Economics: support, acquisition, infrastructure, or delivery costs may erase margin.', 'Execution and dependency: success may rely on skills, data, regulation, or platforms you do not control.'] },
      { heading: 'Evidence to gather first', body: ['Five recorded problem interviews with people who recently tried to solve it.', 'Three concrete commitments: a paid pilot, signed letter of intent, data access, or scheduled onboarding.', 'A manual prototype proving the promised outcome without building the full product.', 'A simple model for price, gross margin, acquisition cost, and retention assumptions.'] },
      { heading: 'Two-week validation plan', body: ['Days 1–2: write the core assumptions and pre-commit pass/fail thresholds.', 'Days 3–7: recruit and interview buyers, users, and likely blockers.', 'Days 8–11: deliver the result manually for two prospects.', 'Days 12–14: ask for payment or a binding next step; continue, revise, or stop based on evidence.'] },
      { heading: 'Kill criteria', body: 'Pause or change direction if the problem is infrequent, prospects will not commit after seeing the outcome, distribution depends on unaffordable paid acquisition, or gross margin remains weak even at plausible scale.' },
    ],
    agreement: {
      headline: 'High agreement · 4/4 models completed · validation order resolved',
      mainAgreement: 'Test urgency and willingness to commit before investing in a full build.',
      uniqueInsights: 10,
      uncertainty: 'A specific business idea was not included, so the review is a reusable framework.',
      conflicts: ['Research depth was balanced against the need for fast commitment tests.'],
    },
    timings: { chatgpt: 2.7, grok: 4.1, gemini: 3.5, glm: 3.9 },
  },
];

export const genericScenario = (prompt: string): Scenario => ({
  id: 'custom',
  prompt,
  title: prompt.length > 46 ? `${prompt.slice(0, 46)}…` : prompt,
  category: 'Council review',
  sources: {
    chatgpt: 'A useful answer starts by defining the desired outcome, current constraints, and the decision that needs to be made. I would break the request into a practical sequence: clarify success, identify the highest-leverage options, compare trade-offs, and turn the chosen direction into a short action plan.',
    grok: 'The key is to challenge the hidden assumptions in the request. What would have to be true for the obvious answer to work? Consider downside risk, switching cost, incentives, and the possibility that a smaller or simpler intervention solves the real problem more reliably.',
    gemini: 'A research-oriented approach would separate established facts from context-dependent judgments. Gather the minimum missing evidence, compare credible alternatives using consistent criteria, and note which parts of the conclusion are sensitive to timing, location, budget, or stakeholder needs.',
    glm: 'Focus on execution efficiency. Prioritize actions by expected impact, reversibility, and cost. Start with a small test, define measurable checkpoints, and keep the plan modular so low-performing steps can be replaced without disrupting the entire approach.',
  },
  finalIntro: `The strongest approach to “${prompt}” is to clarify the intended outcome, test the riskiest assumption early, and use a short feedback loop before committing to a larger plan.`,
  finalSections: [
    { heading: 'Recommended approach', body: 'Begin by defining what a successful result looks like, who it is for, and which constraints cannot move. Then compare a small number of credible options against the same criteria instead of optimizing each option in isolation.' },
    { heading: 'Practical next steps', body: ['Write the desired outcome in one measurable sentence.', 'List the three assumptions most likely to change the recommendation.', 'Run the smallest test that produces real evidence.', 'Review the result, keep what worked, and revise the weakest part.'] },
    { heading: 'Trade-offs to keep visible', body: ['Speed versus depth', 'Short-term simplicity versus future flexibility', 'Expected upside versus cost of failure', 'Stakeholder needs versus operational load'] },
    { heading: 'What would improve this answer', body: 'Add your timeline, budget, audience, existing constraints, and what you have already tried. Those details would let the council replace general guidance with a sharper decision.' },
  ],
  agreement: {
    headline: 'Broad agreement · 4/4 models completed · 2 assumptions flagged',
    mainAgreement: 'Clarify success, test the riskiest assumption, and iterate from evidence.',
    uniqueInsights: 6,
    uncertainty: 'The request does not include detailed constraints or context.',
    conflicts: ['Depth of initial research was balanced with speed of testing.', 'The final recommendation remains conditional on the missing context.'],
  },
  timings: { chatgpt: 2.8, grok: 4.0, gemini: 3.3, glm: 3.7 },
});

export function findScenario(prompt: string) {
  const normalized = prompt.toLowerCase().replace(/[?.!]/g, '').trim();
  const matched = scenarios.find((scenario) => {
    const sample = scenario.prompt.toLowerCase().replace(/[?.!]/g, '').trim();
    const isKiSchoolQuery = scenario.id === 'ki-school'
      && (normalized.includes('ki school') || normalized.includes('kunskapsskolan international'));
    return normalized === sample || normalized.includes(sample.slice(0, 24)) || isKiSchoolQuery;
  });
  return matched ?? genericScenario(prompt);
}
