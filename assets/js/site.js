/* Sened Medical Equipment — behaviour layer.
   Security notes: no innerHTML, no eval, no dynamic script/URL construction,
   no third-party calls. Every string below is authored here and injected with
   textContent only, so no markup can ever be interpreted from data. */
(function () {
  'use strict';

  /* clickjacking guard: meta CSP cannot enforce frame-ancestors */
  if (window.top !== window.self) {
    try { document.documentElement.hidden = true; } catch (e) {}
    return;
  }

  var LANGS = ['ar', 'fr', 'en'];
  var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------------------- i18n */

  var FR = {
    skip: 'Aller au contenu',
    brand: 'Sened Équipements Médicaux',
    brandSub: 'Nouakchott · Mauritanie',
    navAria: 'Navigation principale',
    langAria: 'Langue',
    menuAria: 'Menu',
    waAria: 'WhatsApp',
    logoAlt: 'Logo Sened Équipements Médicaux',
    nav1: 'À propos', nav2: 'Produits', nav3: 'Acheter', nav4: 'Services', nav5: 'Pourquoi Sened', nav6: 'Contact',

    heroKicker: 'Spécialistes de l’équipement médical · Nouakchott · Mauritanie',
    heroTitle: 'Sened Équipements Médicaux',
    heroTitle2: 'Fourniture et distribution d’équipements et de consommables médicaux',
    heroSub: 'Consommables médicaux, équipement d’hôpitaux et de cliniques, appareils de diagnostic et de laboratoire — en gros pour les magasins et les institutions, et en vente directe pour les cliniques et les particuliers.',
    ctaRetail: 'Commander — particuliers & cliniques',
    ctaWholesale: 'Tarifs de gros',
    heroNote: 'Réponse directe sur WhatsApp · Livraison à Nouakchott',

    tick1: 'Consommables médicaux', tick2: 'Équipement de cliniques', tick3: 'Échographie',
    tick4: 'Moniteurs de signes vitaux', tick5: 'Lits & tables d’examen', tick6: 'Matériel de laboratoire',
    tick7: 'Import d’équipements médicaux', tick8: 'Gros pour institutions et magasins',

    stat1: 'points de vente fournis', stat2: 'dans le secteur médical depuis', stat3: 'familles de produits médicaux couvertes',
    stat4: 'du cycle d’import géré en interne',

    aboutLabel: 'À propos',
    aboutTitle: 'Une société mauritanienne dédiée à l’équipement médical — de l’import jusqu’à votre porte.',
    aboutP1: 'Sened est une société enregistrée à Nouakchott dont le seul domaine est l’équipement et les consommables médicaux : nous ne travaillons dans aucun autre secteur. Nous importons directement auprès des fournisseurs et des fabricants de dispositifs médicaux à l’étranger et gérons nous-mêmes tout le cycle : négociation, documents, fret, dédouanement, stockage puis distribution.',
    aboutP2: 'Nous travaillons sur deux niveaux à la fois : la fourniture en gros aux magasins, aux sociétés d’équipement médical et aux hôpitaux, et la vente directe aux cliniques, aux professionnels et aux particuliers qui cherchent un appareil ou un consommable précis.',
    aboutP3: 'Parce que la compétence de dédouanement est interne à la société, nous calculons le coût rendu avant l’achat — le prix annoncé est le prix qui arrive.',
    pill1: 'Spécialisation médicale exclusive', pill2: 'Import direct auprès des fabricants', pill3: 'Stock permanent de consommables', pill4: 'Livraison à Nouakchott',
    aboutImgAlt: 'Salle d’examen équipée',
    aboutStamp: 'Nouakchott · Mauritanie',

    prodLabel: 'Nos produits',
    prodTitle: 'Tout ce dont une clinique ou un hôpital a besoin — chez un seul fournisseur médical.',
    prodSub: 'Quatre familles d’équipements et de consommables médicaux, et rien d’autre : d’une seule paire de gants à l’équipement complet d’une clinique ou à un échographe.',
    p1t: 'Consommables médicaux',
    p1d: 'Tout ce qu’une clinique consomme au quotidien : demande récurrente et stock permanent chez nous.',
    p1a: 'Gants d’examen', p1b: 'Seringues', p1c: 'Compresses et pansements', p1d2: 'Masques', p1e: 'Désinfectants et antiseptiques',
    p1alt: 'Consommables médicaux : gants, seringues et compresses',
    p2t: 'Équipement d’hôpitaux et de cliniques',
    p2d: 'Équiper des salles et des services à neuf, ou compléter ce qui manque à une clinique existante.',
    p2a: 'Lits médicaux', p2b: 'Tables d’examen', p2c: 'Chariots médicaux', p2d2: 'Chaises et mobilier de clinique', p2e: 'Aménagement des salles',
    p2alt: 'Salle d’examen équipée d’un lit et d’une table d’examen',
    p3t: 'Appareils d’examen et de diagnostic',
    p3d: 'Appareils de diagnostic et d’examen clinique, avec conseil pour choisir l’appareil adapté à votre activité.',
    p3a: 'Échographie / Ultrasound', p3b: 'Moniteurs de signes vitaux', p3c: 'Tensiomètres', p3d2: 'Oxymètres et thermomètres', p3e: 'Stéthoscopes',
    p3alt: 'Échographe (appareil à ultrasons)',
    p4t: 'Matériel de laboratoire',
    p4d: 'Pour les laboratoires de cliniques et de centres de santé — appareils et consommables d’analyse.',
    p4a: 'Analyseurs de laboratoire', p4b: 'Centrifugeuses', p4c: 'Microscopes', p4d2: 'Tubes et consommables d’analyse', p4e: 'Matériel de prélèvement',
    p4alt: 'Analyseur dans un laboratoire d’analyses médicales',

    secTitle: 'Qui nous servons dans le secteur médical',
    secSub: 'Tous nos clients viennent du secteur de la santé — c’est pourquoi nous comprenons leur demande dès le premier message.',
    sec1: 'Hôpitaux et centres de santé', sec2: 'Cliniques et cabinets privés', sec3: 'Laboratoires d’analyses',
    sec4: 'Magasins et sociétés d’équipement médical', sec5: 'ONG et projets de santé', sec6: 'Médecins, infirmiers et particuliers',

    buyLabel: 'Comment acheter',
    buyTitle: 'Deux voies d’achat — choisissez la vôtre.',
    buySub: 'Chaque voie a son propre numéro WhatsApp, pour que la bonne personne vous réponde directement.',
    chan1Badge: 'Le plus demandé',
    chan1Title: 'Particuliers & cliniques',
    chan1Desc: 'Besoin d’un appareil ou de consommables pour votre cabinet ou pour vous-même ? Envoyez-nous votre demande et nous répondons avec le prix et la disponibilité.',
    chan1L1: 'Vente à l’unité et en petites quantités',
    chan1L2: 'Conseil pour choisir l’appareil adapté',
    chan1L3: 'Livraison à Nouakchott',
    chan1Cta: 'WhatsApp ventes',
    chan2Badge: 'Institutions',
    chan2Title: 'Magasins, sociétés & hôpitaux',
    chan2Desc: 'Prix de gros et volumes pour les magasins, les sociétés d’équipement médical et les hôpitaux, avec approvisionnement régulier et accords de longue durée.',
    chan2L1: 'Prix de gros et volumes',
    chan2L2: 'Approvisionnement régulier et contrats',
    chan2L3: 'Import sur commande et dédouanement',
    chan2Cta: 'WhatsApp gros & distribution',

    servLabel: 'Nos services',
    servTitle: 'Ce que nous offrons au-delà de la vente d’équipements médicaux.',
    s1t: 'Fourniture en gros d’équipements médicaux',
    s1d: 'Approvisionnement des magasins, des sociétés d’équipement médical et des hôpitaux en appareils et consommables, en volumes et à prix de gros.',
    s2t: 'Import d’appareils médicaux sur commande',
    s2d: 'Un appareil ou une référence introuvable sur le marché local ? Nous l’importons pour vous : demande de prix, documents, fret et dédouanement — sans intermédiaire.',
    s3t: 'Représentation locale des fabricants d’équipements médicaux',
    s3d: 'Partenaire local d’import et de distribution pour les fabricants et fournisseurs de dispositifs médicaux qui ont des acheteurs en Mauritanie sans entité locale.',
    cap1: 'Import sur commande', cap2: 'Conformité aux spécifications demandées', cap3: 'Approvisionnement régulier en consommables',
    cap4: 'Conseil dans le choix de l’appareil', cap5: 'Livraison à Nouakchott',

    whyLabel: 'Pourquoi Sened',
    whyTitle: 'Quatre raisons qui simplifient le travail avec nous.',
    w1t: 'Un canal de distribution établi',
    w1d: 'Nous fournissons 26 points de vente. Un produit qui passe par nous atteint le marché via un réseau, pas une seule vitrine.',
    w2t: 'Dédouanement interne',
    w2d: 'Une expérience de dédouanement en exercice depuis 2022, au sein de la société — votre marchandise n’attend pas un tiers au port.',
    w3t: 'Un prix final transparent',
    w3d: 'Nous calculons le coût rendu (produit + fret + droits + livraison) avant l’achat. Le prix annoncé est le prix final.',
    w4t: 'Cycle d’import complet',
    w4d: 'De la source à la livraison : négociation, documents, dédouanement, stockage et distribution — un seul interlocuteur responsable.',

    faqLabel: 'Questions fréquentes',
    faqTitle: 'Ce que nos clients nous demandent.',
    q1: 'Vendez-vous aux particuliers ou uniquement en gros ?',
    a1: 'Les deux. Nous avons une voie de vente directe à l’unité pour les particuliers et les cliniques, et une voie de gros et de distribution pour les magasins, les sociétés et les hôpitaux — chacune avec son propre numéro WhatsApp.',
    q2: 'Quels équipements médicaux fournissez-vous ?',
    a2: 'Consommables médicaux (gants, seringues, compresses et pansements, masques, désinfectants), équipement d’hôpitaux et de cliniques (lits, tables d’examen, chariots et mobilier), appareils d’examen et de diagnostic (échographes, moniteurs de signes vitaux, tensiomètres et thermomètres), ainsi que le matériel et les consommables de laboratoire.',
    q3: 'Comment commander et sous quel délai répondez-vous ?',
    a3: 'Envoyez le nom du produit ou sa photo sur le WhatsApp correspondant : nous répondons avec le prix, la disponibilité et le délai. Si le produit n’est pas en stock, nous l’importons sur commande.',
    q4: 'Assurez-vous la livraison ?',
    a4: 'Oui, la livraison à Nouakchott. Vers les autres wilayas, l’expédition est organisée selon le volume de la commande.',
    q5: 'Représentez-vous des fabricants étrangers en Mauritanie ?',
    a5: 'Oui. Nous recherchons des accords d’agence et de distribution avec des fabricants d’équipements médicaux, et nous offrons un canal de gros établi et un dédouanement interne. Contactez-nous via le numéro gros ou par e-mail.',
    q6: 'Vendez-vous des produits non médicaux ?',
    a6: 'Non. Sened est spécialisée uniquement dans les équipements et consommables médicaux — c’est notre seul domaine, et tout ce que nous importons et distribuons appartient au secteur médical.',

    ctaTitle: 'Commandez ce dont vous avez besoin dès aujourd’hui.',
    ctaText: 'Que vous soyez une clinique, un magasin, un hôpital ou un particulier — écrivez-nous et nous répondons avec le prix et la disponibilité.',
    cbox1k: 'Particuliers & cliniques', cbox1t: 'WhatsApp ventes',
    cbox2k: 'Gros & distribution', cbox2t: 'WhatsApp institutions',
    cbox3k: 'E-mail', cbox3t: 'Fournisseurs & offres',
    cbox4k: 'Notre adresse', cbox4v: 'Medina 3 — Nouakchott', cbox4t: 'Ouvrir dans Google Maps',
    ctaNote: 'Nouakchott · Mauritanie — nous parlons arabe, français et anglais',
    footRights: 'Tous droits réservés'
  };

  var EN = {
    skip: 'Skip to content',
    brand: 'Sened Medical Equipment',
    brandSub: 'Nouakchott · Mauritania',
    navAria: 'Main navigation',
    langAria: 'Language',
    menuAria: 'Menu',
    waAria: 'WhatsApp',
    logoAlt: 'Sened Medical Equipment logo',
    nav1: 'About', nav2: 'Products', nav3: 'Buy', nav4: 'Services', nav5: 'Why Sened', nav6: 'Contact',

    heroKicker: 'Medical equipment specialists · Nouakchott · Mauritania',
    heroTitle: 'Sened Medical Equipment',
    heroTitle2: 'Supply and distribution of medical equipment and consumables',
    heroSub: 'Medical consumables, hospital and clinic fit-out, diagnostic and laboratory devices — wholesale for retailers and institutions, and direct sales for clinics and individuals.',
    ctaRetail: 'Order now — individuals & clinics',
    ctaWholesale: 'Wholesale pricing',
    heroNote: 'Direct reply on WhatsApp · Delivery within Nouakchott',

    tick1: 'Medical consumables', tick2: 'Clinic fit-out', tick3: 'Ultrasound',
    tick4: 'Vital signs monitors', tick5: 'Beds & examination tables', tick6: 'Laboratory equipment',
    tick7: 'Medical equipment import', tick8: 'Wholesale for institutions & retailers',

    stat1: 'retail points supplied', stat2: 'in the medical sector since', stat3: 'medical product families covered',
    stat4: 'of the import cycle run in-house',

    aboutLabel: 'About us',
    aboutTitle: 'A Mauritanian company devoted to medical equipment alone — from import to your door.',
    aboutP1: 'Sened is a registered company in Nouakchott whose only field is medical equipment and consumables: we trade in no other sector. We import directly from suppliers and medical device manufacturers abroad and handle the full cycle ourselves: negotiation, documentation, freight, customs clearance, warehousing and distribution.',
    aboutP2: 'We work on two levels at once: wholesale supply to retailers, medical equipment companies and hospitals, and direct sales to clinics, professionals and individuals who need a specific device or consumable.',
    aboutP3: 'Because customs clearance expertise sits inside the company, we calculate landed cost before purchase — the price we quote is the price that lands.',
    pill1: 'Medical-only specialisation', pill2: 'Direct import from manufacturers', pill3: 'Consumables always in stock', pill4: 'Delivery within Nouakchott',
    aboutImgAlt: 'Equipped examination room',
    aboutStamp: 'Nouakchott · Mauritania',

    prodLabel: 'Our products',
    prodTitle: 'Everything a clinic or hospital needs — from one medical supplier.',
    prodSub: 'Four families of medical equipment and consumables, and nothing outside them: from a single pair of gloves to a fully equipped clinic or an ultrasound machine.',
    p1t: 'Medical consumables',
    p1d: 'Everything a clinic goes through daily — recurring demand, permanent stock on our side.',
    p1a: 'Examination gloves', p1b: 'Syringes & needles', p1c: 'Gauze & dressings', p1d2: 'Face masks', p1e: 'Disinfectants & antiseptics',
    p1alt: 'Medical consumables: gloves, syringes and gauze',
    p2t: 'Hospital & clinic fit-out',
    p2d: 'Fitting out rooms and departments from scratch, or completing what an existing clinic is missing.',
    p2a: 'Medical beds', p2b: 'Examination tables', p2c: 'Medical trolleys', p2d2: 'Clinic chairs & furniture', p2e: 'Room fit-out units',
    p2alt: 'Examination room equipped with a bed and examination table',
    p3t: 'Examination & diagnostic devices',
    p3d: 'Diagnostic and clinical examination devices, with advice on choosing the right one for the size of your practice.',
    p3a: 'Ultrasound machines', p3b: 'Vital signs monitors', p3c: 'Blood pressure monitors', p3d2: 'Oximeters & thermometers', p3e: 'Stethoscopes',
    p3alt: 'Ultrasound machine',
    p4t: 'Laboratory equipment',
    p4d: 'For clinic and health-centre laboratories — analysis devices and consumables together.',
    p4a: 'Laboratory analysers', p4b: 'Centrifuges', p4c: 'Microscopes', p4d2: 'Tubes & testing supplies', p4e: 'Blood collection supplies',
    p4alt: 'Laboratory analyser in a medical testing lab',

    secTitle: 'Who we serve in the medical sector',
    secSub: 'Every one of our clients comes from healthcare — which is why we understand the request from the first message.',
    sec1: 'Hospitals & health centres', sec2: 'Private clinics & practices', sec3: 'Laboratories & testing centres',
    sec4: 'Medical equipment retailers & companies', sec5: 'NGOs & health projects', sec6: 'Doctors, nurses & individuals',

    buyLabel: 'How to buy',
    buyTitle: 'Two ways to buy — pick the one that fits.',
    buySub: 'Each route has its own WhatsApp number, so the right person answers you directly.',
    chan1Badge: 'Most requested',
    chan1Title: 'Individuals & clinics',
    chan1Desc: 'Need a device or supplies for your practice or for yourself? Send us what you need and we reply with price and availability.',
    chan1L1: 'Single units and small quantities',
    chan1L2: 'Advice on choosing the right device',
    chan1L3: 'Delivery within Nouakchott',
    chan1Cta: 'Sales WhatsApp',
    chan2Badge: 'For institutions',
    chan2Title: 'Retailers, companies & hospitals',
    chan2Desc: 'Wholesale prices and volumes for retailers, medical equipment companies and hospitals, with recurring supply and long-term agreements.',
    chan2L1: 'Wholesale prices and volumes',
    chan2L2: 'Recurring supply and contracts',
    chan2L3: 'Import to order and customs clearance',
    chan2Cta: 'Wholesale WhatsApp',

    servLabel: 'Our services',
    servTitle: 'What we offer beyond selling medical equipment.',
    s1t: 'Wholesale medical equipment supply',
    s1d: 'Supplying retailers, medical equipment companies and hospitals with devices and consumables in volume at wholesale prices.',
    s2t: 'Medical device import to order',
    s2d: 'A device or item the local market does not carry? We import it for you: quotation, documentation, freight and clearance — with no middleman.',
    s3t: 'Local representation for medical device manufacturers',
    s3d: 'A local import and distribution partner for medical device manufacturers and suppliers with buyers in Mauritania but no local entity.',
    cap1: 'Import to order', cap2: 'Matching the specifications you ask for', cap3: 'Recurring consumables supply',
    cap4: 'Advice on choosing the device', cap5: 'Delivery within Nouakchott',

    whyLabel: 'Why Sened',
    whyTitle: 'Four reasons working with us is easier.',
    w1t: 'An established distribution channel',
    w1d: 'We supply 26 points of sale. A product that comes through us reaches the market via a network, not a single storefront.',
    w2t: 'In-house customs clearance',
    w2d: 'Practising clearance experience since 2022, inside the company — your goods do not wait on a third party at the port.',
    w3t: 'Transparent final pricing',
    w3d: 'We calculate landed cost (product + freight + duties + delivery) before purchase. The quoted price is the final price.',
    w4t: 'A complete import cycle',
    w4d: 'From source to delivery: negotiation, documentation, clearance, warehousing and distribution — one accountable party.',

    faqLabel: 'FAQ',
    faqTitle: 'What our clients ask.',
    q1: 'Do you sell to individuals or wholesale only?',
    a1: 'Both. We run a direct per-unit sales route for individuals and clinics, and a wholesale and distribution route for retailers, companies and hospitals — each with its own WhatsApp number.',
    q2: 'What medical equipment do you supply?',
    a2: 'Medical consumables (gloves, syringes, gauze and dressings, masks, disinfectants), hospital and clinic fit-out (beds, examination tables, trolleys and furniture), examination and diagnostic devices (ultrasound machines, vital signs monitors, blood pressure monitors and thermometers), and laboratory equipment and supplies.',
    q3: 'How do I order, and how fast do you reply?',
    a3: 'Send the product name or a photo of it to the matching WhatsApp number and we reply with price, availability and lead time. If it is not in stock, we import it to order.',
    q4: 'Do you deliver?',
    a4: 'Yes, delivery within Nouakchott. Shipping to other regions is arranged according to order size.',
    q5: 'Do you represent foreign manufacturers in Mauritania?',
    a5: 'Yes. We are looking for agency and distribution agreements with medical equipment manufacturers, and we offer an established wholesale channel and in-house customs clearance. Reach us on the wholesale number or by email.',
    q6: 'Do you sell non-medical products?',
    a6: 'No. Sened specialises in medical equipment and consumables only — it is our single field, and everything we import and distribute belongs to the medical sector.',

    ctaTitle: 'Order what you need today.',
    ctaText: 'Whether you are a clinic, a retailer, a hospital or an individual — write to us and we reply with price and availability.',
    cbox1k: 'Individuals & clinics', cbox1t: 'Sales WhatsApp',
    cbox2k: 'Wholesale & distribution', cbox2t: 'Institutions WhatsApp',
    cbox3k: 'Email', cbox3t: 'Suppliers & offers',
    cbox4k: 'Our location', cbox4v: 'Medina 3 — Nouakchott', cbox4t: 'Open in Google Maps',
    ctaNote: 'Nouakchott · Mauritania — we speak Arabic, French and English',
    footRights: 'All rights reserved'
  };

  var DICT = { fr: FR, en: EN };

  /* Arabic is the markup's own content, captured once so we can switch back. */
  var AR = {};
  function capture(attr, store) {
    var nodes = document.querySelectorAll('[' + attr + ']');
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute(attr);
      if (!(key in store)) {
        store[key] = attr === 'data-i18n' ? nodes[i].textContent
          : attr === 'data-i18n-aria' ? nodes[i].getAttribute('aria-label')
            : nodes[i].getAttribute('alt');
      }
    }
  }
  capture('data-i18n', AR);
  capture('data-i18n-aria', AR);
  capture('data-i18n-alt', AR);

  function applyLang(lang) {
    if (LANGS.indexOf(lang) === -1) lang = 'ar';
    var d = lang === 'ar' ? AR : DICT[lang];
    var i, nodes;

    nodes = document.querySelectorAll('[data-i18n]');
    for (i = 0; i < nodes.length; i++) {
      var t = d[nodes[i].getAttribute('data-i18n')];
      if (typeof t === 'string') nodes[i].textContent = t;
    }
    nodes = document.querySelectorAll('[data-i18n-aria]');
    for (i = 0; i < nodes.length; i++) {
      var a = d[nodes[i].getAttribute('data-i18n-aria')];
      if (typeof a === 'string') nodes[i].setAttribute('aria-label', a);
    }
    nodes = document.querySelectorAll('[data-i18n-alt]');
    for (i = 0; i < nodes.length; i++) {
      var al = d[nodes[i].getAttribute('data-i18n-alt')];
      if (typeof al === 'string') nodes[i].setAttribute('alt', al);
    }

    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    var btns = document.querySelectorAll('.lang button');
    for (i = 0; i < btns.length; i++) {
      btns[i].classList.toggle('on', btns[i].getAttribute('data-lang') === lang);
    }
    try { localStorage.setItem('sened_lang', lang); } catch (e) {}
  }

  var stored = null;
  try { stored = localStorage.getItem('sened_lang'); } catch (e) {}
  if (stored && LANGS.indexOf(stored) !== -1 && stored !== 'ar') applyLang(stored);

  var langBox = document.querySelector('.lang');
  if (langBox) {
    langBox.addEventListener('click', function (ev) {
      var b = ev.target.closest('button[data-lang]');
      if (!b) return;
      applyLang(b.getAttribute('data-lang'));
      document.body.classList.add('lang-swap');
      window.setTimeout(function () { document.body.classList.remove('lang-swap'); }, 400);
    });
  }

  /* ------------------------------------------------------------ preloader */
  window.addEventListener('load', function () {
    var pre = document.getElementById('preloader');
    if (!pre) return;
    window.setTimeout(function () { pre.classList.add('done'); }, reduced ? 0 : 550);
  });

  /* --------------------------------------------------------------- header */
  var hd = document.getElementById('hd');
  var bar = document.getElementById('progress');
  var nav = document.getElementById('nav');
  var burger = document.getElementById('burger');
  var links = nav ? nav.querySelectorAll('a[href^="#"]') : [];
  var sections = [];
  for (var li = 0; li < links.length; li++) {
    var s = document.getElementById(links[li].getAttribute('href').slice(1));
    if (s) sections.push({ link: links[li], el: s });
  }

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    if (hd) hd.classList.toggle('stuck', y > 24);
    if (bar) {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    }
    var active = null;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].el.getBoundingClientRect().top <= window.innerHeight * 0.35) active = sections[i];
    }
    for (var j = 0; j < sections.length; j++) {
      sections[j].link.classList.toggle('active', active === sections[j]);
    }
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () { onScroll(); ticking = false; });
  }, { passive: true });
  onScroll();

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      burger.classList.toggle('on', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('lock', open);
    });
    nav.addEventListener('click', function (ev) {
      if (!ev.target.closest('a')) return;
      nav.classList.remove('open');
      burger.classList.remove('on');
      burger.setAttribute('aria-expanded', 'false');
      document.body.classList.remove('lock');
    });
  }

  /* --------------------------------------------------------------- reveal */
  var rv = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window) || reduced) {
    for (var r = 0; r < rv.length; r++) rv[r].classList.add('in');
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e, idx) {
        if (!e.isIntersecting) return;
        var el = e.target;
        window.setTimeout(function () { el.classList.add('in'); }, idx * 70);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    for (var r2 = 0; r2 < rv.length; r2++) io.observe(rv[r2]);
    window.setTimeout(function () {
      for (var r3 = 0; r3 < rv.length; r3++) rv[r3].classList.add('in');
    }, 4000);
  }

  /* -------------------------------------------------------------- count up */
  var nums = document.querySelectorAll('[data-count]');
  if ('IntersectionObserver' in window && !reduced) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        cio.unobserve(el);
        var target = parseInt(el.getAttribute('data-count'), 10);
        if (isNaN(target)) return;
        var suffix = el.getAttribute('data-suffix') || '';
        var dur = target > 200 ? 1500 : 1100;
        var t0 = performance.now();
        (function step(now) {
          var p = Math.min((now - t0) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (p < 1) window.requestAnimationFrame(step);
        })(t0);
      });
    }, { threshold: 0.35 });
    for (var n = 0; n < nums.length; n++) cio.observe(nums[n]);
  }

  /* ------------------------------------------------------------------ faq */
  var qs = document.querySelectorAll('.faq .q');
  for (var q = 0; q < qs.length; q++) {
    (function (box) {
      var btn = box.querySelector('button');
      var panel = box.querySelector('.a');
      if (!btn || !panel) return;
      btn.addEventListener('click', function () {
        var open = box.classList.toggle('open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
      });
    })(qs[q]);
  }
  window.addEventListener('resize', function () {
    var open = document.querySelectorAll('.faq .q.open .a');
    for (var i = 0; i < open.length; i++) open[i].style.maxHeight = open[i].scrollHeight + 'px';
  });

  if (reduced) return;

  /* ----------------------------------------------------------- parallax */
  var pxNodes = window.innerWidth >= 900 ? document.querySelectorAll('[data-px]') : [];
  if (pxNodes.length) {
    var pTick = false;
    var runPx = function () {
      var vh = window.innerHeight;
      for (var i = 0; i < pxNodes.length; i++) {
        var el = pxNodes[i];
        var rect = el.getBoundingClientRect();
        var mid = rect.top + rect.height / 2 - vh / 2;
        el.style.transform = 'translate3d(0,' + (-mid * parseFloat(el.getAttribute('data-px'))).toFixed(1) + 'px,0)';
      }
    };
    window.addEventListener('scroll', function () {
      if (pTick) return;
      pTick = true;
      window.requestAnimationFrame(function () { runPx(); pTick = false; });
    }, { passive: true });
    runPx();
  }

  var fine = window.matchMedia && window.matchMedia('(hover:hover) and (pointer:fine)').matches;

  /* ------------------------------------------------- cursor + spotlight */
  var spot = document.getElementById('spot');
  var cur = document.getElementById('cursor');
  var curDot = cur ? cur.querySelector('b') : null;
  if (fine) {
    var tx = window.innerWidth / 2, ty = window.innerHeight / 2, cx = tx, cy = ty;
    document.body.classList.add('has-cursor');
    document.addEventListener('mousemove', function (ev) {
      tx = ev.clientX; ty = ev.clientY;
      if (spot) {
        spot.style.setProperty('--mx', (tx / window.innerWidth * 100).toFixed(2) + '%');
        spot.style.setProperty('--my', (ty / window.innerHeight * 100).toFixed(2) + '%');
      }
    }, { passive: true });
    (function follow() {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      if (curDot) curDot.style.transform = 'translate3d(' + cx.toFixed(1) + 'px,' + cy.toFixed(1) + 'px,0)';
      window.requestAnimationFrame(follow);
    })();
    document.addEventListener('mouseover', function (ev) {
      var hot = ev.target.closest('a,button,.card,.chan-card');
      document.body.classList.toggle('cursor-hot', !!hot);
    }, { passive: true });
  }

  /* ------------------------------------------------------------ 3D tilt */
  if (fine) {
    var tilts = document.querySelectorAll('.tilt,.card');
    for (var t = 0; t < tilts.length; t++) {
      (function (el) {
        el.addEventListener('mousemove', function (ev) {
          var b = el.getBoundingClientRect();
          var px = (ev.clientX - b.left) / b.width;
          var py = (ev.clientY - b.top) / b.height;
          el.style.setProperty('--cx', (px * 100).toFixed(1) + '%');
          el.style.setProperty('--cy', (py * 100).toFixed(1) + '%');
          el.style.transform = 'perspective(900px) rotateX(' + ((0.5 - py) * 7).toFixed(2) +
            'deg) rotateY(' + ((px - 0.5) * 9).toFixed(2) + 'deg) translateY(-6px)';
        });
        el.addEventListener('mouseleave', function () { el.style.transform = ''; });
      })(tilts[t]);
    }

    /* magnetic buttons */
    var mags = document.querySelectorAll('.mag');
    for (var m = 0; m < mags.length; m++) {
      (function (el) {
        el.addEventListener('mousemove', function (ev) {
          var b = el.getBoundingClientRect();
          var dx = (ev.clientX - (b.left + b.width / 2)) / b.width;
          var dy = (ev.clientY - (b.top + b.height / 2)) / b.height;
          el.style.transform = 'translate(' + (dx * 14).toFixed(1) + 'px,' + (dy * 10).toFixed(1) + 'px)';
        });
        el.addEventListener('mouseleave', function () { el.style.transform = ''; });
      })(mags[m]);
    }
  }

  /* ----------------------------------------------------- gold dust canvas */
  var cv = window.innerWidth >= 700 ? document.getElementById('dust') : null;
  if (cv && cv.getContext) {
    var ctx = cv.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var parts = [];
    var mouse = { x: -999, y: -999 };

    function sizeCanvas() {
      cv.width = Math.floor(window.innerWidth * dpr);
      cv.height = Math.floor(window.innerHeight * dpr);
      cv.style.width = window.innerWidth + 'px';
      cv.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }
    function build() {
      var count = Math.min(Math.round(window.innerWidth * window.innerHeight / 17000), 110);
      parts = [];
      for (var i = 0; i < count; i++) {
        parts.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 1.5 + 0.4,
          vx: (Math.random() - 0.5) * 0.16,
          vy: (Math.random() - 0.5) * 0.16,
          a: Math.random() * 0.5 + 0.18,
          g: Math.random() > 0.65
        });
      }
    }
    if (fine) {
      document.addEventListener('mousemove', function (ev) { mouse.x = ev.clientX; mouse.y = ev.clientY; }, { passive: true });
      document.addEventListener('mouseleave', function () { mouse.x = -999; mouse.y = -999; });
    }
    function frame() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (var i = 0; i < parts.length; i++) {
        var p = parts[i];
        var dx = p.x - mouse.x, dy = p.y - mouse.y;
        var d2 = dx * dx + dy * dy;
        if (d2 < 16000 && d2 > 0.01) {
          var f = (1 - d2 / 16000) * 0.7;
          var d = Math.sqrt(d2);
          p.x += (dx / d) * f;
          p.y += (dy / d) * f;
        }
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = window.innerWidth + 10;
        if (p.x > window.innerWidth + 10) p.x = -10;
        if (p.y < -10) p.y = window.innerHeight + 10;
        if (p.y > window.innerHeight + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.g ? 'rgba(242,223,174,' + p.a + ')' : 'rgba(200,214,246,' + (p.a * 0.7) + ')';
        ctx.fill();
      }
      window.requestAnimationFrame(frame);
    }
    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);
    frame();
  }

  /* ------------------------------------------------------------- footer year */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
