// Textes de l'interface (hors contenus éditables du CMS), en français et en anglais.
// Le dictionnaire anglais doit avoir exactement la même forme que le français.

const plural = (n: number, one: string, many: string) => (n > 1 ? many : one);

const fr = {
  meta: {
    title: 'ICHH 2026 — Conférence Internationale sur la Santé Humanitaire'
  },
  common: {
    register: 'S’inscrire',
    becomePartner: 'Devenir partenaire',
    close: 'Fermer',
    cancel: 'Annuler',
    sending: 'Envoi…',
    reset: 'Réinitialiser',
    resetFilters: 'Réinitialiser les filtres',
    all: 'Tous',
    skipToContent: 'Aller au contenu',
    keynote: 'Keynote',
    genericError: 'Une erreur est survenue.',
    emailLabel: 'Adresse e-mail',
    emailPlaceholder: 'prenom.nom@organisation.org',
    phoneLabel: 'Téléphone',
    invalidEmail: 'Merci de saisir une adresse e-mail valide.',
    invalidPhone: 'Merci d’indiquer un numéro de téléphone.',
    unavailable: 'Service momentanément indisponible. Réessayez plus tard.'
  },
  lang: {
    label: 'Langue',
    switchTo: 'Passer en anglais'
  },
  nav: {
    home: 'Accueil',
    about: 'À propos',
    mahola: '10 ans de Mahola',
    programme: 'Programme',
    speakers: 'Speakers',
    main: 'Navigation principale',
    mobile: 'Navigation mobile',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    homeAria: (name: string) => `${name} — accueil`
  },
  countdown: {
    days: 'jours',
    hours: 'heures',
    minutes: 'minutes',
    seconds: 'secondes',
    aria: (days: number) => `Ouverture dans ${days} jours`
  },
  hero: {
    brochure: 'Télécharger la brochure (PDF, 7,4 Mo)',
    videoAria: (name: string) => `Lire la vidéo de présentation de l’${name}`,
    videoAlt: 'Équipe Mahola en campagne de terrain',
    videoLabel: 'Vidéo de présentation — 2 min 40',
    opensIn: 'Ouverture des travaux dans',
    videoDialog: 'Vidéo de présentation',
    closeVideo: 'Fermer la vidéo',
    filmTitle: (name: string) => `Film de présentation — ${name}`,
    filmNote: 'Le montage définitif sera intégré ici avant l’ouverture des travaux, le 12 novembre 2026.'
  },
  home: {
    keyFigures: 'Chiffres clés',
    presidentAlt: 'Dr Mathilde Mbouck, présidente de la Mahola Health Foundation',
    presidentRole: 'Présidente · Mahola Health Foundation',
    welcomeQuote:
    '« Après dix ans d’action sanitaire volontaire, nous rassemblons celles et ceux qui bâtissent une santé résiliente pour les plus vulnérables. »',
    welcome: [
    'Depuis 2016, la Mahola Health Foundation organise des missions médicales au Cameroun et en Afrique centrale pour réduire le déficit de soins des personnes à faibles revenus. Douze missions, 8 700 consultations, 200 interventions chirurgicales : dix ans d’action de terrain, aux côtés de l’effort public de Couverture Santé Universelle.',
    'L’ICHH Yaoundé 2026 prolonge cet engagement à l’échelle continentale. Sous la supervision du Ministère de la Santé Publique et avec All Access Agency, la conférence réunit États, institutions internationales, experts, société civile et secteur privé autour de huit panels de haut niveau.',
    'Deux jours à l’Hôtel Hilton de Yaoundé, 500 participants, et un objectif : poser ensemble les jalons d’une action sanitaire commune en faveur des populations à faibles revenus, en zones urbaines comme rurales.'],

    whyTitle: 'Pourquoi participer',
    whyLead: 'Cinq raisons concrètes de rejoindre l’ICHH Yaoundé 2026.',
    whyNote:
    'Les inscriptions et les formules de participation sont ouvertes. Dossier d’offre de participation sur demande.',
    fullProgramme: 'Voir le programme complet',
    speakersTitle: 'Intervenants pressentis',
    speakersLead:
    'Décideurs publics, praticiens, experts et société civile. La liste définitive est arrêtée par le comité scientifique.',
    allSpeakers: 'Tous les intervenants',
    programmeTitle: 'Le programme en bref',
    programmeLead:
    'Deux jours à l’Hôtel Hilton de Yaoundé : cérémonie d’ouverture, huit panels de haut niveau, Salon Expo, mission médicale et gala des 10 ans.',
    detailedProgramme: 'Programme détaillé',
    sessionsScheduled: (n: number) => `${n} ${plural(n, 'session programmée', 'sessions programmées')}`,
    partnersTitle: 'Partenaires et institutions',
    partnersLead:
    'L’ICHH Yaoundé 2026 est portée par le MINSANTE, la Mahola Health Foundation et All Access Agency, en lien avec les partenaires techniques et financiers de la sous-région.',
    partnersNote:
    'Co-partenaire, sponsor, stand au Salon Expo santé ou table au gala : dossier d’offre de participation sur demande.',
    newsTitle: 'Actualités récentes',
    speakerProfile: 'Profil intervenant'
  },
  about: {
    title: 'À propos de l’ICHH',
    lead:
    'Une conférence internationale portée par le Ministère de la Santé Publique du Cameroun, coordonnée par la Mahola Health Foundation et mise en œuvre avec All Access Agency, pour bâtir une santé résiliente au service des populations vulnérables d’Afrique.',
    contextLabel: 'Contexte.',
    context:
    'Après la crise du Covid-19, l’Agenda 2063 de l’Union Africaine et la Commission économique pour l’Afrique appellent à des programmes de santé alignés sur les agendas 2030 et 2063, pour renforcer la résilience des systèmes sanitaires. L’ICHH Yaoundé 2026 s’inscrit dans cette dynamique et coïncide avec les 10 ans de la Mahola Health Foundation.',
    visionLabel: 'Vision.',
    vision:
    'Fédérer les pouvoirs publics, les partenaires techniques et financiers, les experts et les acteurs communautaires autour d’une action concertée pour améliorer la santé des populations les plus vulnérables, en zones urbaines comme rurales.',
    whyCameroonLabel: 'Pourquoi le Cameroun.',
    whyCameroon:
    'Le pays a été retenu pour son engagement en faveur de la Couverture Santé Universelle, la modernisation de ses infrastructures et la Stratégie Sectorielle de Santé 2020-2030 (SND30), qui vise un accès universel à des soins de qualité à l’horizon 2035.',
    theme: 'Thème central 2026',
    dates: 'Dates',
    venue: 'Lieu',
    languages: 'Langues de travail',
    languagesValue: 'Français et anglais',
    supervision: 'Supervision générale',
    supervisionValue: 'Ministère de la Santé Publique (MINSANTE)',
    coordination: 'Coordination',
    commissioner: 'Commissariat général',
    discoverMahola: 'Découvrir les 10 ans de Mahola →',
    objectivesTitle: 'Objectifs de la conférence',
    audiencesTitle: 'À qui s’adresse l’ICHH',
    audiencesLead:
    'Cinq familles d’acteurs réunies autour d’une même table, des États de la zone CEMAC-CEEAC à la société civile.',
    outcomesTitle: 'Résultats attendus',
    outcomesLead:
    'Les travaux des huit panels alimentent le rapport final de la conférence, remis au plus tard le 30 octobre 2026.',
    organisersTitle: 'Qui organise',
    governanceTitle: 'Gouvernance et organisation',
    governanceNote:
    'Supervision de l’État du Cameroun, coordination de la Mahola Health Foundation et maîtrise d’œuvre d’All Access Agency, appuyées par un comité de coordination et un comité interministériel.',
    scientificTitle: 'Comité scientifique',
    scientificNote:
    'Il arrête les termes de référence des huit panels, désigne les modérateurs et rapporteurs et rédige le rapport final. La composition nominative sera publiée avant la conférence.'
  },
  mahola: {
    logoAlt: 'Logo de la Mahola Health Foundation',
    title: 'Dix ans de la Mahola Health Foundation',
    lead:
    'Fondée en 2016 par le Dr Mathilde Mbouck, un premier dispensaire éphémère. Dix ans plus tard : 12 missions médicales, 8 700 consultations, 200 interventions chirurgicales et 25 accouchements assistés au Cameroun et en Afrique centrale.',
    visitSite: 'Visiter le site de Mahola',
    impactReport: 'Rapport d’impact 2016-2026 (PDF, 6,8 Mo)',
    historyTitle: 'L’histoire de Mahola',
    history1:
    'Mahola naît en 2016 à l’initiative de soignants bénévoles qui font le même constat, mission après mission : au Cameroun, les patients arrivent trop tard, et presque toujours pour la même raison. La distance, puis le coût du transport, puis l’absence d’information.',
    history2:
    'L’association choisit un modèle simple et mobile : des dispensaires éphémères montés le temps d’une mission, des équipes pluridisciplinaires — médecins, sages-femmes, pédiatres, ophtalmologues, kinésithérapeutes — et des médicaments collectés en amont auprès de partenaires et de donateurs. Chaque mission accompagne aussi un centre de santé local en formant ses professionnels.',
    history3:
    'Autour de cette mission, Mahola soutient également les orphelinats — soins, couverture santé, rénovation — et redistribue du matériel médical aux structures qui en manquent.',
    videoLabel: 'Vidéo institutionnelle',
    videoTitle: 'Dix ans de missions',
    videoMeta: 'Film documentaire — 8 min 12',
    videoNote:
    'Tourné pendant une mission au Cameroun, le film suit une équipe de bénévoles sur toute la durée d’un dispensaire éphémère, sans commentaire ajouté.',
    actionsTitle: 'Les missions de Mahola',
    actionsLead:
    'Six axes d’action complémentaires, tous tournés vers l’accès aux soins de santé primaire au Cameroun.',
    timelineTitle: 'Frise chronologique',
    timelineLead: 'Sélectionnez une année pour en lire le détail.',
    years: 'Années',
    impactTitle: 'Chiffres d’impact',
    impactNote:
    'Chiffres consolidés depuis 2016, à partir des rapports de mission de la Mahola Health Foundation : 150 professionnels de santé mobilisés et plus de 150 000 € de ressources engagées. Détail et méthodologie sur demande à',
    testimonialsTitle: 'Ce qu’en disent les communautés',
    galleryTitle: 'Galerie historique',
    galleryLead: 'Photographies de terrain, 2019 — 2024. Archives Mahola.'
  },
  programme: {
    title: 'Programme des deux jours',
    lead:
    'Les 12 et 13 novembre 2026 à l’Hôtel Hilton de Yaoundé : cérémonie d’ouverture, huit panels de haut niveau, Salon Expo santé, mission médicale et gala des 10 ans. Sélectionnez les sessions pour construire votre agenda.',
    pdf: 'Programme PDF',
    filters: 'Filtres du programme',
    day: 'Jour',
    type: 'Type d’activité',
    track: 'Thématique',
    room: 'Salle',
    count: (n: number, agenda: number) => `${n} ${plural(n, 'session', 'sessions')} · ${agenda} dans mon agenda`,
    emptyTitle: 'Aucune session pour cette combinaison',
    emptyText:
    'Toutes les salles n’accueillent pas tous les types d’activité. Élargissez un filtre pour voir des résultats.',
    addTitle: 'Ajouter à mon agenda et à Google Agenda',
    inAgenda: 'Dans mon agenda',
    add: 'Ajouter',
    sessionDetail: 'Détail de la session'
  },
  session: {
    schedule: 'Horaire',
    room: 'Salle',
    track: 'Thématique',
    description: 'Description',
    speakers: 'Intervenants',
    removeFromAgenda: 'Dans mon agenda — retirer',
    addToAgenda: 'Ajouter à mon agenda'
  },
  speakers: {
    title: 'Les intervenants',
    lead:
    'Décideurs publics, praticiens, experts et société civile mobilisés autour des huit panels. Liste pressentie : la composition définitive et les modérateurs sont arrêtés par le comité scientifique. Seule la présidente de la Mahola Health Foundation, le Dr Mathilde Mbouck, est confirmée.',
    search: 'Recherche',
    searchPlaceholder: 'Nom, organisation, spécialité…',
    country: 'Pays',
    organization: 'Organisation',
    domain: 'Domaine',
    count: (n: number) => `${n} ${plural(n, 'intervenant affiché', 'intervenants affichés')}`,
    emptyTitle: 'Aucun intervenant ne correspond',
    emptyText: 'Essayez un autre pays ou un autre domaine — la liste s’enrichit chaque semaine jusqu’en février.',
    viewProfile: (name: string) => `Voir le profil de ${name}`
  },
  profile: {
    bio: 'Biographie',
    sessions: (n: number) => `Sessions animées (${n})`,
    noSessions: 'Aucune session encore confirmée pour cet intervenant. Le programme est mis à jour chaque semaine.',
    dayLine: (day: number) => `Jour ${day}`,
    publications: 'Publications',
    contact: 'Contact professionnel',
    seeInProgramme: 'Voir ses sessions dans le programme →'
  },
  newsletter: {
    title: 'Suivre la préparation de l’ICHH Yaoundé 2026',
    text:
    'Une lettre par mois : programme des panels, intervenants confirmés, formules de participation et travaux du comité scientifique. Pas de communication commerciale.',
    confirmedBefore: 'Inscription confirmée pour',
    confirmedAfter: '. Un e-mail de confirmation vient de vous être envoyé.',
    subscribe: 'Je m’abonne',
    failed: 'L’inscription a échoué. Réessayez plus tard.'
  },
  registration: {
    title: 'S’inscrire à la conférence',
    intro:
    'Renseignez vos coordonnées pour pré-réserver votre place. L’équipe de la Mahola Health Foundation vous recontacte avec les modalités de participation (formules, accès, programme).',
    fullName: 'Nom et prénom',
    fullNamePlaceholder: 'Nom Prénom',
    city: 'Ville de résidence',
    submit: 'Envoyer mon inscription',
    errName: 'Merci d’indiquer vos nom et prénom.',
    errCity: 'Merci d’indiquer votre ville de résidence.',
    failed: 'L’envoi a échoué. Réessayez plus tard.',
    thanks: 'Merci',
    doneMiddle: '. Votre pré-inscription à l’ICHH Yaoundé 2026 a bien été enregistrée. L’équipe vous recontacte à l’adresse',
    doneEnd: 'avec les modalités de participation.'
  },
  partner: {
    intro:
    'Laissez-nous vos coordonnées et précisez la qualité de partenariat souhaitée. L’équipe de la Mahola Health Foundation vous recontacte avec le dossier d’offre de participation.',
    name: 'Nom complet',
    namePlaceholder: 'Prénom Nom',
    message: 'Qualité de partenariat souhaitée',
    messagePlaceholder:
    'Co-partenaire, sponsor (Platine / Or / Argent), stand au Salon Expo santé, table au gala… Décrivez votre organisation et le type de partenariat envisagé.',
    submit: 'Envoyer la demande',
    errName: 'Merci d’indiquer votre nom.',
    errMessage: 'Merci de préciser la qualité de partenariat souhaitée.',
    unavailable: 'Service momentanément indisponible. Écrivez-nous par e-mail.',
    failed: 'L’envoi a échoué. Réessayez ou écrivez-nous par e-mail.',
    thanks: 'Merci',
    doneMiddle:
    '. Votre demande de partenariat a bien été transmise à l’équipe de la Mahola Health Foundation. Nous revenons vers vous à l’adresse',
    doneEnd: '.'
  },
  footer: {
    about: (fullName: string) =>
    `${fullName} — célébration des 10 ans de la Mahola Health Foundation. Sous la supervision du MINSANTE, coordonnée par la Mahola Health Foundation, avec All Access Agency.`,
    rights: '© 2026 Mahola Health Foundation · All Access Agency. Tous droits réservés.'
  },
  drawer: {
    close: 'Fermer'
  },
  // Libellés affichés pour les valeurs techniques stockées en français dans le CMS.
  sessionTypes: {
    Cérémonie: 'Cérémonie',
    Keynote: 'Keynote',
    Panel: 'Panel',
    Atelier: 'Atelier',
    Exposition: 'Exposition',
    Networking: 'Networking'
  } as Record<string, string>,
  sponsorTiers: {
    Platine: 'Platine',
    Or: 'Or',
    Argent: 'Argent'
  } as Record<string, string>
};

export type Dictionary = typeof fr;

const en: Dictionary = {
  meta: {
    title: 'ICHH 2026 — International Conference on Humanitarian Health'
  },
  common: {
    register: 'Register',
    becomePartner: 'Become a partner',
    close: 'Close',
    cancel: 'Cancel',
    sending: 'Sending…',
    reset: 'Reset',
    resetFilters: 'Reset filters',
    all: 'All',
    skipToContent: 'Skip to content',
    keynote: 'Keynote',
    genericError: 'Something went wrong.',
    emailLabel: 'Email address',
    emailPlaceholder: 'firstname.lastname@organisation.org',
    phoneLabel: 'Phone',
    invalidEmail: 'Please enter a valid email address.',
    invalidPhone: 'Please enter a phone number.',
    unavailable: 'Service temporarily unavailable. Please try again later.'
  },
  lang: {
    label: 'Language',
    switchTo: 'Switch to French'
  },
  nav: {
    home: 'Home',
    about: 'About',
    mahola: 'Mahola at 10',
    programme: 'Programme',
    speakers: 'Speakers',
    main: 'Main navigation',
    mobile: 'Mobile navigation',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    homeAria: (name: string) => `${name} — home`
  },
  countdown: {
    days: 'days',
    hours: 'hours',
    minutes: 'minutes',
    seconds: 'seconds',
    aria: (days: number) => `Opening in ${days} days`
  },
  hero: {
    brochure: 'Download the brochure (PDF in French, 7.4 MB)',
    videoAria: (name: string) => `Play the ${name} presentation video`,
    videoAlt: 'Mahola team during a field campaign',
    videoLabel: 'Presentation video — 2 min 40',
    opensIn: 'Proceedings open in',
    videoDialog: 'Presentation video',
    closeVideo: 'Close video',
    filmTitle: (name: string) => `Presentation film — ${name}`,
    filmNote: 'The final cut will be available here before proceedings open on 12 November 2026.'
  },
  home: {
    keyFigures: 'Key figures',
    presidentAlt: 'Dr Mathilde Mbouck, President of the Mahola Health Foundation',
    presidentRole: 'President · Mahola Health Foundation',
    welcomeQuote:
    '“After ten years of volunteer health work, we are bringing together everyone building resilient health for the most vulnerable.”',
    welcome: [
    'Since 2016, the Mahola Health Foundation has run medical missions in Cameroon and Central Africa to close the care gap for low-income people. Twelve missions, 8,700 consultations, 200 surgical procedures: ten years of work on the ground, alongside the public drive for Universal Health Coverage.',
    'ICHH Yaoundé 2026 extends this commitment to the continental scale. Under the supervision of the Ministry of Public Health and with All Access Agency, the conference brings together governments, international institutions, experts, civil society and the private sector around eight high-level panels.',
    'Two days at the Hilton Yaoundé, 500 participants and one goal: to lay the foundations, together, for joint health action for low-income populations in urban and rural areas alike.'],

    whyTitle: 'Why attend',
    whyLead: 'Five concrete reasons to join ICHH Yaoundé 2026.',
    whyNote: 'Registration and participation packages are open. Participation offer available on request.',
    fullProgramme: 'See the full programme',
    speakersTitle: 'Expected speakers',
    speakersLead:
    'Policymakers, practitioners, experts and civil society. The final list is set by the scientific committee.',
    allSpeakers: 'All speakers',
    programmeTitle: 'The programme at a glance',
    programmeLead:
    'Two days at the Hilton Yaoundé: opening ceremony, eight high-level panels, Health Expo, medical mission and 10th-anniversary gala.',
    detailedProgramme: 'Detailed programme',
    sessionsScheduled: (n: number) => `${n} ${plural(n, 'session scheduled', 'sessions scheduled')}`,
    partnersTitle: 'Partners and institutions',
    partnersLead:
    'ICHH Yaoundé 2026 is led by MINSANTE, the Mahola Health Foundation and All Access Agency, together with the technical and financial partners of the sub-region.',
    partnersNote:
    'Co-partner, sponsor, Health Expo stand or gala table: participation offer available on request.',
    newsTitle: 'Latest news',
    speakerProfile: 'Speaker profile'
  },
  about: {
    title: 'About ICHH',
    lead:
    'An international conference led by Cameroon’s Ministry of Public Health, coordinated by the Mahola Health Foundation and delivered with All Access Agency, to build resilient health for Africa’s vulnerable populations.',
    contextLabel: 'Context.',
    context:
    'Following the Covid-19 crisis, the African Union’s Agenda 2063 and the Economic Commission for Africa have called for health programmes aligned with the 2030 and 2063 agendas to strengthen the resilience of health systems. ICHH Yaoundé 2026 is part of this momentum and coincides with the Mahola Health Foundation’s 10th anniversary.',
    visionLabel: 'Vision.',
    vision:
    'To unite public authorities, technical and financial partners, experts and community actors around concerted action to improve the health of the most vulnerable populations, in urban and rural areas alike.',
    whyCameroonLabel: 'Why Cameroon.',
    whyCameroon:
    'The country was chosen for its commitment to Universal Health Coverage, the modernisation of its infrastructure and its 2020-2030 Health Sector Strategy (SND30), which aims for universal access to quality care by 2035.',
    theme: 'Central theme 2026',
    dates: 'Dates',
    venue: 'Venue',
    languages: 'Working languages',
    languagesValue: 'French and English',
    supervision: 'General supervision',
    supervisionValue: 'Ministry of Public Health (MINSANTE)',
    coordination: 'Coordination',
    commissioner: 'General commissioner',
    discoverMahola: 'Discover Mahola’s 10 years →',
    objectivesTitle: 'Conference objectives',
    audiencesTitle: 'Who ICHH is for',
    audiencesLead:
    'Five groups of stakeholders around one table, from CEMAC-ECCAS governments to civil society.',
    outcomesTitle: 'Expected outcomes',
    outcomesLead:
    'The work of the eight panels feeds into the conference’s final report, due no later than 30 October 2026.',
    organisersTitle: 'Who is organising',
    governanceTitle: 'Governance and organisation',
    governanceNote:
    'Supervised by the State of Cameroon, coordinated by the Mahola Health Foundation and delivered by All Access Agency, supported by a coordination committee and an inter-ministerial committee.',
    scientificTitle: 'Scientific committee',
    scientificNote:
    'It sets the terms of reference for the eight panels, appoints moderators and rapporteurs and writes the final report. Its members will be named before the conference.'
  },
  mahola: {
    logoAlt: 'Mahola Health Foundation logo',
    title: 'Ten years of the Mahola Health Foundation',
    lead:
    'Founded in 2016 by Dr Mathilde Mbouck with a first pop-up clinic. Ten years later: 12 medical missions, 8,700 consultations, 200 surgical procedures and 25 assisted births in Cameroon and Central Africa.',
    visitSite: 'Visit the Mahola website',
    impactReport: 'Impact report 2016-2026 (PDF, 6.8 MB)',
    historyTitle: 'The Mahola story',
    history1:
    'Mahola was founded in 2016 by volunteer health workers who kept seeing the same thing, mission after mission: in Cameroon, patients arrive too late, and almost always for the same reason. Distance, then the cost of transport, then a lack of information.',
    history2:
    'The association chose a simple, mobile model: pop-up clinics set up for the length of a mission, multidisciplinary teams — doctors, midwives, paediatricians, ophthalmologists, physiotherapists — and medicines collected in advance from partners and donors. Each mission also supports a local health centre by training its staff.',
    history3:
    'Around this mission, Mahola also supports orphanages — care, health insurance, renovation — and redistributes medical equipment to facilities that lack it.',
    videoLabel: 'Institutional video',
    videoTitle: 'Ten years of missions',
    videoMeta: 'Documentary — 8 min 12',
    videoNote:
    'Filmed during a mission in Cameroon, the documentary follows a team of volunteers for the full length of a pop-up clinic, with no added commentary.',
    actionsTitle: 'What Mahola does',
    actionsLead: 'Six complementary areas of action, all focused on access to primary health care in Cameroon.',
    timelineTitle: 'Timeline',
    timelineLead: 'Select a year to read the details.',
    years: 'Years',
    impactTitle: 'Impact in figures',
    impactNote:
    'Figures consolidated since 2016 from the Mahola Health Foundation’s mission reports: 150 health professionals mobilised and over €150,000 in resources committed. Details and methodology on request at',
    testimonialsTitle: 'What communities say',
    galleryTitle: 'Historical gallery',
    galleryLead: 'Field photographs, 2019 — 2024. Mahola archives.'
  },
  programme: {
    title: 'Two-day programme',
    lead:
    '12 and 13 November 2026 at the Hilton Yaoundé: opening ceremony, eight high-level panels, Health Expo, medical mission and 10th-anniversary gala. Select sessions to build your agenda.',
    pdf: 'Programme PDF',
    filters: 'Programme filters',
    day: 'Day',
    type: 'Activity type',
    track: 'Theme',
    room: 'Room',
    count: (n: number, agenda: number) => `${n} ${plural(n, 'session', 'sessions')} · ${agenda} in my agenda`,
    emptyTitle: 'No sessions match this combination',
    emptyText: 'Not every room hosts every type of activity. Widen a filter to see results.',
    addTitle: 'Add to my agenda and to Google Calendar',
    inAgenda: 'In my agenda',
    add: 'Add',
    sessionDetail: 'Session details'
  },
  session: {
    schedule: 'Time',
    room: 'Room',
    track: 'Theme',
    description: 'Description',
    speakers: 'Speakers',
    removeFromAgenda: 'In my agenda — remove',
    addToAgenda: 'Add to my agenda'
  },
  speakers: {
    title: 'Speakers',
    lead:
    'Policymakers, practitioners, experts and civil society mobilised around the eight panels. Provisional list: final line-up and moderators are set by the scientific committee. Only the President of the Mahola Health Foundation, Dr Mathilde Mbouck, is confirmed.',
    search: 'Search',
    searchPlaceholder: 'Name, organisation, specialty…',
    country: 'Country',
    organization: 'Organisation',
    domain: 'Field',
    count: (n: number) => `${n} ${plural(n, 'speaker shown', 'speakers shown')}`,
    emptyTitle: 'No speakers match',
    emptyText: 'Try another country or field — the list grows every week until February.',
    viewProfile: (name: string) => `View ${name}’s profile`
  },
  profile: {
    bio: 'Biography',
    sessions: (n: number) => `Sessions (${n})`,
    noSessions: 'No sessions confirmed yet for this speaker. The programme is updated every week.',
    dayLine: (day: number) => `Day ${day}`,
    publications: 'Publications',
    contact: 'Professional contact',
    seeInProgramme: 'See their sessions in the programme →'
  },
  newsletter: {
    title: 'Follow the preparations for ICHH Yaoundé 2026',
    text:
    'One newsletter a month: panel programme, confirmed speakers, participation packages and the scientific committee’s work. No marketing.',
    confirmedBefore: 'Subscription confirmed for',
    confirmedAfter: '. A confirmation email has just been sent to you.',
    subscribe: 'Subscribe',
    failed: 'Subscription failed. Please try again later.'
  },
  registration: {
    title: 'Register for the conference',
    intro:
    'Enter your details to pre-book your place. The Mahola Health Foundation team will get back to you with participation details (packages, access, programme).',
    fullName: 'Full name',
    fullNamePlaceholder: 'First name Last name',
    city: 'City of residence',
    submit: 'Send my registration',
    errName: 'Please enter your full name.',
    errCity: 'Please enter your city of residence.',
    failed: 'Sending failed. Please try again later.',
    thanks: 'Thank you',
    doneMiddle: '. Your pre-registration for ICHH Yaoundé 2026 has been recorded. The team will contact you at',
    doneEnd: 'with participation details.'
  },
  partner: {
    intro:
    'Leave your details and tell us the type of partnership you have in mind. The Mahola Health Foundation team will get back to you with the participation offer.',
    name: 'Full name',
    namePlaceholder: 'First name Last name',
    message: 'Type of partnership',
    messagePlaceholder:
    'Co-partner, sponsor (Platinum / Gold / Silver), Health Expo stand, gala table… Describe your organisation and the partnership you have in mind.',
    submit: 'Send request',
    errName: 'Please enter your name.',
    errMessage: 'Please describe the type of partnership you are interested in.',
    unavailable: 'Service temporarily unavailable. Please email us.',
    failed: 'Sending failed. Please try again or email us.',
    thanks: 'Thank you',
    doneMiddle:
    '. Your partnership request has been sent to the Mahola Health Foundation team. We will get back to you at',
    doneEnd: '.'
  },
  footer: {
    about: (fullName: string) =>
    `${fullName} — celebrating 10 years of the Mahola Health Foundation. Under the supervision of MINSANTE, coordinated by the Mahola Health Foundation, with All Access Agency.`,
    rights: '© 2026 Mahola Health Foundation · All Access Agency. All rights reserved.'
  },
  drawer: {
    close: 'Close'
  },
  sessionTypes: {
    Cérémonie: 'Ceremony',
    Keynote: 'Keynote',
    Panel: 'Panel',
    Atelier: 'Workshop',
    Exposition: 'Exhibition',
    Networking: 'Networking'
  },
  sponsorTiers: {
    Platine: 'Platinum',
    Or: 'Gold',
    Argent: 'Silver'
  }
};

export const dictionaries = { fr, en };
