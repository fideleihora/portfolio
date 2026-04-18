'use client'

import React, { createContext, useContext, useState } from 'react'

export type Language = 'en' | 'sw' | 'fr' | 'rw'

interface Translations {
  [key: string]: {
    [key in Language]: string
  }
}

const translations: Translations = {
  // Navbar
  home: { en: 'Home', sw: 'Nyumbani', fr: 'Accueil', rw: 'Ahabanza' },
  about: { en: 'About', sw: 'Kuhusu', fr: 'À propos', rw: 'Ibyerekeye' },
  projects: { en: 'Projects', sw: 'Miradi', fr: 'Projets', rw: 'Imishinga' },
  experience: { en: 'Experience', sw: 'Uzoefu', fr: 'Expérience', rw: 'Ubunararibonye' },
  skills: { en: 'Skills', sw: 'Ujuzi', fr: 'Compétences', rw: 'Ubumenyi' },
  honors: { en: 'Honors', sw: 'Heshima', fr: 'Distinctions', rw: 'Ibyubahiro' },
  stats: { en: 'Stats', sw: 'Takwimu', fr: 'Stats', rw: 'Imibare' },
  contact: { en: 'Contact', sw: 'Mawasiliano', fr: 'Contact', rw: 'Twandikire' },
  gallery: { en: 'Gallery', sw: 'Matunzio', fr: 'Galerie', rw: 'Amafoto' },
  
  // Hero
  hello: { en: "Hello, I'm", sw: "Habari, Mimi ni", fr: "Bonjour, Je suis", rw: "Muraho, Ndi" },
  description: { 
    en: 'Mathematics, Physics & Computer Science Specialist based in Rwanda. I build elegant solutions and strive for technical excellence.',
    sw: 'Mtaalamu wa Hisabati, Fizikia na Sayansi ya Kompyuta nchini Rwanda. Ninaunda suluhisho bora na kujitahidi kwa ubora wa kiufundi.',
    fr: 'Spécialiste en mathématiques, physique et informatique basé au Rwanda. Je construis des solutions élégantes et vise l\'excellence technique.',
    rw: 'Inzobere mu mibare, ubugenge n\'ikoranabuhanga uba mu Rwanda. Ndasubiza ibibazo nifashishije ikoranabuhanga kandi nshyize imbere ubunyamwuga.'
  },
  aboutMe: { en: 'About Me', sw: 'Kuhusu Mimi', fr: 'À propos de moi', rw: 'Ibyerekeye' },
  letsTalk: { en: "Let's Talk", sw: "Tuzungumze", fr: "Parlons-en", rw: "Tuvugane" },
  hireMe: { en: 'Hire Me', sw: 'Niajiri', fr: 'Recrutez-moi', rw: 'Nshaka Akazi' },
  collaborate: { en: 'Collaborate', sw: 'Tushirikiane', fr: 'Collaborer', rw: 'Ubufatanye' },
  assist: { en: 'Assist', sw: 'Saidia', fr: 'Assister', rw: 'Ubufasha' },

  // About
  aboutTitle: { en: 'About Me', sw: 'Kuhusu Mimi', fr: 'À propos de moi', rw: 'Ibyerekeye' },
  aboutP1: {
    en: 'I am a dedicated student with a strong background in Mathematics, Physics, and Computer Science. My journey began at Ecole de Science Byimana, where I honed my analytical skills and developed a deep interest in technology and problem-solving.',
    sw: 'Mimi ni mwanafunzi aliyejitolea mwenye msingi thabiti katika Hisabati, Fizikia, na Sayansi ya Kompyuta. Safari yangu ilianzia Ecole de Science Byimana, ambapo niliboresha ujuzi wangu wa uchambuzi na kukuza maslahi makubwa katika teknolojia na utatuzi wa matatizo.',
    fr: 'Je suis un étudiant dévoué avec une solide formation en mathématiques, physique et informatique. Mon parcours a commencé à l\'École de Science Byimana, où j\'ai affiné mes capacités d\'analyse et développé un profond intérêt pour la technologie et la résolution de problèmes.',
    rw: 'Ndi umunyeshura ukorana umwete ufite ubumenyi buhamye mu mibare, ubugenge n\'ikoranabuhanga. Urugendo rwanjye rwatangiriye mu ishuri rya Ecole de Science Byimana, aho nacyariye ubumenyi bwanjye mu gusesengura no gukunda ikoranabuhanga no gukemura ibibazo.'
  },
  aboutP2: {
    en: 'Beyond academics, I am passionate about video editing and sports, which have taught me the importance of discipline, teamwork, and creative expression. I am currently looking for opportunities to apply my technical skills and contribute to impactful projects.',
    sw: 'Zaidi ya masomo, ninapenda uhariri wa video na michezo, ambayo imenifundisha umuhimu wa nidhamu, kazi ya pamoja, na kujieleza kwa ubunifu. Kwa sasa natafuta fursa za kutumia ujuzi wangu wa kiufundi na kuchangia katika miradi yenye athari.',
    fr: 'Au-delà des études, je suis passionné par le montage vidéo et le sport, qui m\'ont appris l\'importance de la discipline, du travail d\'équipe et de l\'expression créative. Je recherche actuellement des opportunités pour appliquer mes compétences techniques et contribuer à des projets percutants.',
    rw: 'Usibye amasomo, nkunda gutunganya amavideo na siporo, binyigisha gukurikiza amategeko, gukorera hamwe n\'imitekerereze yagutse. Kuri ubu ndashaka amahirwe yo gukoresha ubumenyi bwanjye mu ikoranabuhanga nunganira mishinga ifitiye abantu akamaro.'
  },
  location: { en: 'Location', sw: 'Mahali', fr: 'Emplacement', rw: 'Aho mba' },
  locationVal: { en: 'Musanze District, Northern Province, Rwanda', sw: 'Wilaya ya Musanze, Mkoa wa Kaskazini, Rwanda', fr: 'District de Musanze, Province du Nord, Rwanda', rw: 'Akarere ka Musanze, Intara y\'Amajyaruguru, u Rwanda' },
  education: { en: 'Education', sw: 'Elimu', fr: 'Éducation', rw: 'Amashuri' },
  interests: { en: 'Interests', sw: 'Vivutio', fr: 'Intérêts', rw: 'Ibyo nkunda' },
  interestsVal: { en: 'Football, Video Editing', sw: 'Mpira wa miguu, Uhariri wa Video', fr: 'Football, Montage Vidéo', rw: 'Umupira w\'amaguru, Gutunganya Amavideo' },
  graduate: { en: 'Graduate', sw: 'Mhitimu', fr: 'Diplômé', rw: 'Yarangije' },
  certs: { en: 'Certs', sw: 'Vyeti', fr: 'Certs', rw: 'Impamyabumenyi' },

  // Skills
  expertise: { en: 'My Expertise', sw: 'Utaalamu Wangu', fr: 'Mon expertise', rw: 'Ubumenyi bwanjye' },
  technical: { en: 'Technical', sw: 'Kiufundi', fr: 'Technique', rw: 'Ikoranabuhanga' },
  softSkills: { en: 'Soft Skills', sw: 'Ujuzi wa Kijamii', fr: 'Compétences douces', rw: 'Imibanire' },
  languages: { en: 'Languages', sw: 'Lugha', fr: 'Langues', rw: 'Indimi' },
  certifications: { en: 'Certifications', sw: 'Vyeti', fr: 'Certifications', rw: 'Impamyabumenyi' },

  // Contact
  getInTouch: { en: 'Get In Touch', sw: 'Wasiliana Nami', fr: 'Contactez-moi', rw: 'Tuvugane' },
  contactSubtitle: { 
    en: "I'm always open to new opportunities and collaborations. Feel free to reach out to me!",
    sw: "Daima niko tayari kwa fursa mpya na ushirikiano. Jisikie huru kuwasiliana nami!",
    fr: "Je suis toujours ouvert à de nouvelles opportunités et collaborations. N'hésitez pas à me contacter !",
    rw: "Niteguye amahirwe mashya n'ubufatanye. Nyandikira igihe cyose!"
  },
  email: { en: 'Email', sw: 'Barua Pepe', fr: 'E-mail', rw: 'Imeri' },
  phone: { en: 'Phone', sw: 'Simu', fr: 'Téléphone', rw: 'Telefoni' },
  socialMedia: { en: 'Social Media', sw: 'Mitandao ya Kijamii', fr: 'Réseaux sociaux', rw: 'Imbuga nkoranyambaga' },
  namePlaceholder: { en: 'Your Name', sw: 'Jina Lako', fr: 'Votre nom', rw: 'Izina ryawe' },
  emailPlaceholder: { en: 'Your Email', sw: 'Barua Pepe Yako', fr: 'Votre e-mail', rw: 'Imeri yawe' },
  subject: { en: 'Subject', sw: 'Mada', fr: 'Sujet', rw: 'Umutwe w\'ubutumwa' },
  subjectPlaceholder: { 
    en: 'Project, collaboration, or opportunity', 
    sw: 'Mradi, ushirikiano, au fursa', 
    fr: 'Projet, collaboration ou opportunité', 
    rw: 'Umushinga, ubufatanye, cyangwa amahirwe' 
  },
  messagePlaceholder: { en: 'Your Message', sw: 'Ujumbe Wako', fr: 'Votre message', rw: 'Ubutumwa bwawe' },
  sendMessage: { en: 'Send Message', sw: 'Tuma Ujumbe', fr: 'Envoyer le message', rw: 'Ohereza ubutumwa' },

  // Projects
  projectsTitle: { en: 'Projects', sw: 'Miradi', fr: 'Projets', rw: 'Imishinga' },
  projectsSubtitle: {
    en: 'A simple project field that presents the kinds of digital work, systems, and portfolio experiences I am building.',
    sw: 'Sehemu rahisi ya miradi inayoonyesha aina ya kazi za kidijitali, mifumo, na maonesho ya portfolio ninayojenga.',
    fr: 'Une section simple qui présente les types de travaux numériques, de systèmes et d’expériences de portfolio que je construis.',
    rw: 'Iki gice cyerekana mu buryo bworoshye ubwoko bw’imishinga, sisitemu n’urubuga rwa portfolio ndi kubaka.'
  },
  projectLabel: { en: 'Concept', sw: 'Wazo', fr: 'Concept', rw: 'Igitekerezo' },
  projectOneTitle: { en: 'Portfolio Experience', sw: 'Uko Portfolio Igaragara', fr: 'Expérience Portfolio', rw: 'Uko Portfolio Iteye' },
  projectOneDesc: {
    en: 'A modern personal portfolio designed to present background, skills, gallery moments, and contact channels in one place.',
    sw: 'Portfolio ya kisasa ya kibinafsi inayowasilisha historia, ujuzi, kumbukumbu za picha, na njia za mawasiliano mahali pamoja.',
    fr: 'Un portfolio personnel moderne conçu pour présenter le parcours, les compétences, la galerie et les moyens de contact au même endroit.',
    rw: 'Portfolio igezweho igaragaza amateka yanjye, ubumenyi, amafoto n’inzira zo kuvugana ahantu hamwe.'
  },
  projectTwoTitle: { en: 'Interactive Navigation System', sw: 'Mfumo wa Urambazaji', fr: 'Système de Navigation Interactif', rw: 'Sisitemu yo Kuyobora Ukoresha' },
  projectTwoDesc: {
    en: 'A clean route-based structure connecting every main section of the website so visitors can move through the story clearly.',
    sw: 'Muundo safi unaounganisha kila sehemu kuu ya tovuti ili wageni waweze kufuatilia simulizi kwa urahisi.',
    fr: 'Une structure claire basée sur les routes qui relie chaque section principale du site pour une navigation fluide.',
    rw: 'Imiterere isobanutse ihuza buri gice cy’ingenzi cy’urubuga kugira ngo abakoresha bagende mu nkuru neza.'
  },
  projectThreeTitle: { en: 'Learning and Skills Showcase', sw: 'Onyesho la Ujuzi', fr: 'Vitrine des Compétences', rw: 'Iyerekana ry’Ubumenyi' },
  projectThreeDesc: {
    en: 'A structured showcase for mathematics, physics, computer science, language ability, and personal growth.',
    sw: 'Onyesho lililopangwa la hisabati, fizikia, sayansi ya kompyuta, lugha, na ukuaji binafsi.',
    fr: 'Une présentation structurée des mathématiques, de la physique, de l’informatique, des langues et de l’évolution personnelle.',
    rw: 'Iyerekana riteguye neza rigaragaza imibare, ubugenge, ikoranabuhanga, indimi n’iterambere ryanjye.'
  },
  projectFourTitle: { en: 'Creative Media Direction', sw: 'Ubunifu wa Media', fr: 'Direction Créative', rw: 'Icyerekezo cy’Ubuhanzi' },
  projectFourDesc: {
    en: 'A simple visual space inspired by photography, video editing, and storytelling through selected memories and achievements.',
    sw: 'Nafasi rahisi ya picha na ubunifu iliyochochewa na uhariri wa video, simulizi, na kumbukumbu zilizochaguliwa.',
    fr: 'Un espace visuel simple inspiré par la photographie, le montage vidéo et la narration à travers des souvenirs choisis.',
    rw: 'Ahantu horoshye hagenewe amafoto n’ubuhanzi bushushanya gutunganya amavideo n’inkuru z’urugendo rwanjye.'
  },

  // Honors
  honorsTitle: { en: 'Honors & Awards', sw: 'Heshima na Tuzo', fr: 'Distinctions et Récompenses', rw: 'Ibyubahiro n’Impano' },
  honorsSubtitle: {
    en: 'Because detailed award records are still limited here, this section highlights meaningful recognition themes from my journey.',
    sw: 'Kwa kuwa taarifa za kina za tuzo bado ni chache hapa, sehemu hii inaonyesha mada muhimu za heshima katika safari yangu.',
    fr: 'Comme les informations détaillées sur les récompenses sont encore limitées ici, cette section met en avant des formes de reconnaissance importantes.',
    rw: 'Kubera ko amakuru arambuye ku bihembo ataraba menshi hano, iki gice cyerekana ibyubahiro by’ingenzi mu rugendo rwanjye.'
  },
  recognitionLabel: { en: 'Recognition', sw: 'Utambuzi', fr: 'Reconnaissance', rw: 'Ishimwe' },
  viewCertificate: { en: 'View Certificate', sw: 'Tazama Cheti', fr: 'Voir le certificat', rw: 'Reba Impamyabumenyi' },
  honorOneTitle: { en: 'Itorero Indangamirwa (15th Cohort)', sw: 'Itorero Indangamirwa (Kikundi cha 15)', fr: 'Itorero Indangamirwa (15ème Cohorte)', rw: 'Itorero Indangamirwa (Icyiciro cya 15)' },
  honorOneDesc: {
    en: 'Successfully participated in the national service program, focusing on leadership, patriotism, and civic engagement at the National Ubutore Development Centre.',
    sw: 'Alishiriki vyema katika mpango wa huduma ya kitaifa, akizingatia uongozi, uzalendo, na ushiriki wa kijamii katika Kituo cha Kitaifa cha Maendeleo ya Ubutore.',
    fr: 'A participé avec succès au programme de service national, axé sur le leadership, le patriotisme et l\'engagement civique au Centre National de Développement d\'Ubutore.',
    rw: 'Yitabiriye neza porogaramu y\'urugerero, yibanda ku buyobozi, gukunda igihugu, n\'uburere mboneragihugu mu Kigo cy\'Igihugu gishinzwe Ubutore.'
  },
  honorTwoTitle: { en: 'Beyond Success Leadership Training', sw: 'Mafunzo ya Uongozi ya Beyond Success', fr: 'Formation au Leadership Beyond Success', rw: 'Amahugurwa y\'Ubuyobozi ya Beyond Success' },
  honorTwoDesc: {
    en: 'Completed ethical leadership and character development training, emphasizing integrity and values-based leadership in community service.',
    sw: 'Alihitimu mafunzo ya uongozi wa kimaadili na kukuza tabia, akisisitiza uadilifu na uongozi unaozingatia maadili katika huduma ya jamii.',
    fr: 'A terminé une formation sur le leadership éthique et le développement du caractère, mettant l\'accent sur l\'intégrité et le leadership fondé sur les valeurs.',
    rw: 'Yarangije amahugurwa y\'ubuyobozi bushingiye ku ndangagaciro, yibanda ku bunyangamugayo n\'ubuyobozi bufitiye abandi akamaro.'
  },
  honorThreeTitle: { en: 'Digital Skills Foundation', sw: 'Msingi wa Ujuzi wa Kidijitali', fr: 'Fondation des Compétences Numériques', rw: 'Ubumenyi mu Ikoranabuhanga rya Kijyambere' },
  honorThreeDesc: {
    en: 'Demonstrated proficiency in computer applications and digital tools, ensuring readiness for modern technology and data-driven environments.',
    sw: 'Alionyesha umahiri katika programu za kompyuta na zana za kidijitali, akihakikisha yuko tayari kwa teknolojia ya kisasa.',
    fr: 'A démontré une maîtrise des applications informatiques et des outils numériques, assurant une préparation aux environnements technologiques modernes.',
    rw: 'Yagaragaje ubumenyi mu gukoresha porogaramu za mudasobwa n\'ibikoresho by\'ikoranabuhanga bigezweho.'
  },
  honorFourTitle: { en: 'English Proficiency Certification', sw: 'Cheti cha Umahiri wa Kiingereza', fr: 'Certification de Maîtrise de l\'Anglais', rw: 'Impamyabumenyi y\'ururimi rw\'Icyongereza' },
  honorFourDesc: {
    en: 'Achieved professional level English proficiency, validating advanced communication skills for international academic and professional success.',
    sw: 'Alifikia kiwango cha kitaalamu cha Kiingereza, akithibitisha ujuzi wa mawasiliano ya hali ya juu kwa mafanikio ya kimataifa.',
    fr: 'A atteint un niveau professionnel de maîtrise de l\'anglais, validant des compétences de communication avancées.',
    rw: 'Yageze ku rwego rwo hejuru mu rurimi rw\'Icyongereza, rwerekana ko ashoboye gushyikirana n\'abandi mu rwego mpuzamahanga.'
  },

  // Timeline
  eduJourney: { en: 'Education Journey', sw: 'Safari ya Elimu', fr: 'Parcours éducatif', rw: 'Urugendo rw\'amashuri' },
  
  // Stats
  analytics: { en: 'Website Analytics', sw: 'Uchambuzi wa Tovuti', fr: 'Analytique du site', rw: 'Imibare y\'urubuga' },
  visitors: { en: 'Total Visitors', sw: 'Jumla ya Wageni', fr: 'Visiteurs totaux', rw: 'Abasuye bose' },
  messages: { en: 'Messages Sent', sw: 'Ujumbe Uliotumwa', fr: 'Messages envoyés', rw: 'Ubutumwa bwoherejwe' },
  activity: { en: 'Activity Breakdown', sw: 'Mchanganuo wa Shughuli', fr: 'Répartition de l\'activité', rw: 'Incamake y\'ibikorwa' },
  traffic: { en: 'Traffic Sources', sw: 'Vyanzo vya Trafiki', fr: 'Sources de trafic', rw: 'Aho abantu baturuka' },
  footer: { 
    en: 'All rights reserved.', 
    sw: 'Haki zote zimehifadhiwa.', 
    fr: 'Tous droits réservés.',
    rw: 'Uburenganzira bwose ni ubwa nyirabyo.'
  },
  memoriesTitle: { en: 'Memories & Achievements', sw: 'Kumbukumbu na Mafanikio', fr: 'Souvenirs et Réalisations', rw: 'Urwibutso n\'Ibihinduramateka' },
  memoriesSub: { 
    en: 'A glimpse into my journey of service, leadership, and personal growth.',
    sw: 'Mtazamo wa safari yangu ya huduma, uongozi, na ukuaji wa kibinafsi.',
    fr: 'Un aperçu de mon parcours de service, de leadership et de croissance personnelle.',
    rw: 'Incamake y\'urugendo rwanjye mu gukorera igihugu, ubuyobozi n\'iterambere ryanjye.'
  },
  urugereroTitle: { en: 'National Service (Urugerero)', sw: 'Huduma ya Taifa', fr: 'Service National', rw: 'Urugerero rwo gukunda igihugu' },
  urugereroDesc: { 
    en: 'Proudly served in the National Service, contributing to community development and fostering patriotism.',
    sw: 'Nilitumikia kwa fahari katika Huduma ya Taifa, nikichangia maendeleo ya jamii na kukuza uzalendo.',
    fr: 'Fièrement servi dans le service national, contribuant au développement communautaire et favorisant le patriotisme.',
    rw: 'Nishimiye gukorera igihugu mu rugerero, nungunira iterambere ry\'abaturage n\'uburere mboneragihugu.'
  },
  leadershipTitle: { en: 'Leadership & Discipline', sw: 'Uongozi na Nidhamu', fr: 'Leadership et Discipline', rw: 'Ubuyobozi n\'Ikinyabupfura' },
  leadershipDesc: { 
    en: 'Developed strong leadership skills and discipline through specialized training and teamwork.',
    sw: 'Nilikua na ujuzi thabiti wa uongozi na nidhamu kupitia mafunzo maalum na kazi ya pamoja.',
    fr: 'Développement de solides compétences en leadership et d\'une discipline rigoureuse grâce à une formation spécialisée.',
    rw: 'Nacyariye ubumenyi mu buyobozi n\'ikinyabupfura binyuze mu mahugurwa n\'ubufatanye.'
  },
  socialTitle: { en: 'Community & Hobbies', sw: 'Jamii na Mapendeleo', fr: 'Communauté et Loisirs', rw: 'Imibanire n\'Ibyo nkunda' },
  socialDesc: { 
    en: 'Building lasting connections and expressing creativity through video editing and sports.',
    sw: 'Kujenga uhusiano wa kudumu na kuelezea ubunifu kupitia uhariri wa video na michezo.',
    fr: 'Établir des liens durables et exprimer sa créativité à travers le montage vidéo et le sport.',
    rw: 'Kubaka umubano n\'abandi no kugaragaza impano mu gutunganya amavideo no mu mikino.'
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en')

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  const t = (key: string) => {
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
