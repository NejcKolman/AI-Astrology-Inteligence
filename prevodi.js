const language = {
  en: {
    storitve: "SERVICES",
    storitve2: "SERVICES2",
    oMeni: "ABOUT ME",
    kontakt: "CONTACT",
    poučniČlanki: "EDUCATIONAL ARTICLES",
    prvaStran: "FIRST PAGE",
    firstPageAppointmentButton1: "Natal Chart Analysis",
    firstPageAppointmentButton2: "Partner Astrology Analysis",
    firstPageAppointmentButton3: "Astrological Counseling for Parents",
    uvodniTekstStoritve: "Andrej offers deep astrological insights tailored to your life’s path. Whether you're curious about your own natal chart, your relationship dynamics, or seeking guidance in parenting, these readings provide clarity and perspective rooted in astrology.",
    naslovStoritve1: "1. Natal Chart and Its Astrological Interpretation",
    opisStoritve1: "This session provides a detailed interpretation of your birth chart (also known as natal chart) based on your time, date, and place of birth. The reading reveals your personality structure, strengths, life themes, and potential challenges. It’s a valuable starting point for personal growth and self-awareness.",
    naslovStoritve2: "2. Astrological Compatibility Analysis (Relationship Reading)",
    opisStoritve2: "A reading that explores the astrological dynamics between you and your partner (or potential partner). It highlights strengths, challenges, communication styles, emotional needs, and compatibility markers. This analysis helps you understand your relationship on a deeper level.",
    naslovStoritve3: "3. Astrological Guidance for Parenting Challenges",
    opisStoritve3: "Parenting can be challenging. This session focuses on understanding your child’s temperament, emotional needs, and learning patterns through their birth chart. It also offers insights into your own parenting style and how to best support your child’s development.",
    bookASessionButton: "Book a session",
  },
  sl: {
    storitve: "STORITVE",
    storitve2: "STORITVE2",
    oMeni: "O MENI",
    kontakt: "KONTAKT",
    poučniČlanki: "POUČNI ČLANKI",
    prvaStran: "PRVA STRAN",
    firstPageAppointmentButton1: "Analiza rojstne karte",
    firstPageAppointmentButton2: "Partnerska astrološka analiza",
    firstPageAppointmentButton3: "Astrološko svetovanje za starše",
    uvodniTekstStoritve: "Andrej ponuja poglobljene astrološke vpoglede, prilagojene tvoji življenjski poti. Ne glede na to, ali te zanima tvoja rojstna karta, dinamika v partnerskem odnosu ali iščeš usmeritev pri vzgoji otrok, ti svetovanja ponujajo jasnost in širšo perspektivo, utemeljeno na astrologiji.",
    naslovStoritve1: "1. Rojstna (natalna) karta in njena astrološka analiza",
    opisStoritve1: "To svetovanje ponuja podrobno razlago tvoje rojstne karte (imenovane tudi natalna karta), ki temelji na tvojem času, datumu in kraju rojstva. Razlaga razkrije strukturo tvoje osebnosti, tvoje močne strani, življenjske teme in morebitne izzive. To je dragocena iztočnica za osebno rast in večje samorazumevanje.",
    naslovStoritve2: "2. Partnerska astrološka analiza (analiza odnosa)",
    opisStoritve2: "Svetovanje, ki raziskuje astrološko dinamiko med tabo in tvojim partnerjem (ali morebitnim partnerjem). Poudari močne plati vajinega odnosa, izzive, način komunikacije, čustvene potrebe ter kazalce ujemanja. Ta analiza ti pomaga, da odnos razumeš globlje in bolj celostno.",
    naslovStoritve3: "3. Astrološko svetovanje pri vzgojnih dilemah",
    opisStoritve3: "Vzgoja je lahko zahtevna. To svetovanje je namenjeno razumevanju otrokovega temperamenta, čustvenih potreb in učnih vzorcev skozi njegovo rojstno karto. Poleg tega ponuja tudi vpogled v tvoj način vzgajanja in kako lahko najbolje podpreš otrokov razvoj.",
    bookASessionButton: "Rezerviraj termin",
  },
};

fetch("header.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("headerPlaceholder").innerHTML = data;
    setupLanguageButtons();
    updateTextLanguage();
  });
function toggleMenu() {
  console.log("click");
  document.getElementById("header4").classList.toggle("active");
}

function setupLanguageButtons() {
  const setLanguage = (lang) => {
    window.location.hash = `#${lang}`;
    localStorage.setItem("jezik", `#${lang}`);
    location.reload();
  };

  const buttonEn = document.querySelector(".buttonEn");
  const buttonSl = document.querySelector(".buttonSl");
  const buttonEnMobile = document.querySelector(".buttonEnMobile");
  const buttonSlMobile = document.querySelector(".buttonSlMobile");

  if (buttonEn) buttonEn.addEventListener("click", () => setLanguage("en"));
  if (buttonSl) buttonSl.addEventListener("click", () => setLanguage("sl"));
  if (buttonEnMobile) buttonEnMobile.addEventListener("click", () => setLanguage("en"));
  if (buttonSlMobile) buttonSlMobile.addEventListener("click", () => setLanguage("sl"));
}

function updateTextLanguage() {
  const langKey = window.location.hash === "#sl" ? "sl" : "en";
  const lang = language[langKey];

  for (let key in lang) {
    const element = document.getElementById(key);
    if (element) element.textContent = lang[key];

    const mobileElement = document.getElementById(key + "Mobile");
    if (mobileElement) mobileElement.textContent = lang[key];
  }

  // Highlight selected language button
  const isSl = langKey === "sl";
  const toggleClass = (id, add) => {
    const el = document.getElementById(id);
    if (el) el.classList.toggle("buttonEnSlSelected", add);
  };

  toggleClass("buttonSl", isSl);
  toggleClass("buttonEn", !isSl);
  toggleClass("buttonSlMobile", isSl);
  toggleClass("buttonEnMobile", !isSl);
}

/*
//sprememba # v URL za spremembo jezika in refresh
if (localStorage.getItem("jezik") == "#sl") {
  window.location.hash = "#sl";
} else if (!window.location.hash) {
  window.location.hash = "#en";
}

const buttonEnElement = document.querySelector(".buttonEn");
if (buttonEnElement) {
  buttonEnElement.addEventListener("click", () => {
    console.log("lan");
    window.location.hash = "#en";
    localStorage.setItem("jezik", "#en");
    location.reload();
  });
}
const buttonSlElement = document.querySelector(".buttonSl");
if (buttonSlElement) {
  buttonSlElement.addEventListener("click", () => {
    window.location.hash = "#sl";
    localStorage.setItem("jezik", "#sl");
    location.reload();
  });
}
//enako za mobile
const buttonEnElementMobile = document.querySelector(".buttonEnMobile");
if (buttonEnElementMobile) {
  buttonEnElementMobile.addEventListener("click", () => {
    console.log("ln");
    window.location.hash = "#en";
    localStorage.setItem("jezik", "#en");
    location.reload();
  });
}
const buttonSlElementMobile = document.querySelector(".buttonSlMobile");
if (buttonSlElementMobile) {
  buttonSlElementMobile.addEventListener("click", () => {
    window.location.hash = "#sl";
    localStorage.setItem("jezik", "#sl");
    location.reload();
  });
}

//slovar besed
let language = {
  en: {
    storitve: "SERVICES",
    storitve2: "SERVICES2",
    oMeni: "ABOUT ME",
    kontakt: "CONTACT",
    poučniČlanki: "EDUCATIONAL ARTICLES",
    prvaStran: "FIRST PAGE",
    firstPageAppointmentButton1: "Natal Chart Analysis",
    firstPageAppointmentButton2: "Partner Astrology Analysis",
    firstPageAppointmentButton3: "Astrological Counseling for Parents",
    uvodniTekstStoritve: "Andrej offers deep astrological insights tailored to your life’s path. Whether you're curious about your own natal chart, your relationship dynamics, or seeking guidance in parenting, these readings provide clarity and perspective rooted in astrology.",
    naslovStoritve1: "1. Natal Chart and Its Astrological Interpretation",
    opisStoritve1: "This session provides a detailed interpretation of your birth chart (also known as natal chart) based on your time, date, and place of birth. The reading reveals your personality structure, strengths, life themes, and potential challenges. It’s a valuable starting point for personal growth and self-awareness.",
    naslovStoritve2: "2. Astrological Compatibility Analysis (Relationship Reading)",
    opisStoritve2: "A reading that explores the astrological dynamics between you and your partner (or potential partner). It highlights strengths, challenges, communication styles, emotional needs, and compatibility markers. This analysis helps you understand your relationship on a deeper level.",
    naslovStoritve3: "3. Astrological Guidance for Parenting Challenges",
    opisStoritve3: "Parenting can be challenging. This session focuses on understanding your child’s temperament, emotional needs, and learning patterns through their birth chart. It also offers insights into your own parenting style and how to best support your child’s development.",
    bookASessionButton: "Book a session",
  },
  sl: {
    storitve: "STORITVE",
    storitve2: "STORITVE2",
    oMeni: "O MENI",
    kontakt: "KONTAKT",
    poučniČlanki: "POUČNI ČLANKI",
    prvaStran: "PRVA STRAN",
    firstPageAppointmentButton1: "Analiza rojstne karte",
    firstPageAppointmentButton2: "Partnerska astrološka analiza",
    firstPageAppointmentButton3: "Astrološko svetovanje za starše",
    uvodniTekstStoritve: "Andrej ponuja poglobljene astrološke vpoglede, prilagojene tvoji življenjski poti. Ne glede na to, ali te zanima tvoja rojstna karta, dinamika v partnerskem odnosu ali iščeš usmeritev pri vzgoji otrok, ti svetovanja ponujajo jasnost in širšo perspektivo, utemeljeno na astrologiji.",
    naslovStoritve1: "1. Rojstna (natalna) karta in njena astrološka analiza",
    opisStoritve1: "To svetovanje ponuja podrobno razlago tvoje rojstne karte (imenovane tudi natalna karta), ki temelji na tvojem času, datumu in kraju rojstva. Razlaga razkrije strukturo tvoje osebnosti, tvoje močne strani, življenjske teme in morebitne izzive. To je dragocena iztočnica za osebno rast in večje samorazumevanje.",
    naslovStoritve2: "2. Partnerska astrološka analiza (analiza odnosa)",
    opisStoritve2: "Svetovanje, ki raziskuje astrološko dinamiko med tabo in tvojim partnerjem (ali morebitnim partnerjem). Poudari močne plati vajinega odnosa, izzive, način komunikacije, čustvene potrebe ter kazalce ujemanja. Ta analiza ti pomaga, da odnos razumeš globlje in bolj celostno.",
    naslovStoritve3: "3. Astrološko svetovanje pri vzgojnih dilemah",
    opisStoritve3: "Vzgoja je lahko zahtevna. To svetovanje je namenjeno razumevanju otrokovega temperamenta, čustvenih potreb in učnih vzorcev skozi njegovo rojstno karto. Poleg tega ponuja tudi vpogled v tvoj način vzgajanja in kako lahko najbolje podpreš otrokov razvoj.",
    bookASessionButton: "Rezerviraj termin",
  },
};
//poglej hash in spremeni besedilo, označi gumbe za izbiro jezika pravilno
for (let textElement in language.sl) {
  if (document.getElementById(textElement + "Mobile") == null) {
    continue;
  }
  console.log(textElement);
  if (window.location.hash === "#sl") {
    eval(textElement).textContent = language.sl[textElement];
    eval(textElement + "Mobile").textContent = language.sl[textElement];

    document.getElementById("buttonSl").classList.add("buttonEnSlSelected");
    document.getElementById("buttonEn").classList.remove("buttonEnSlSelected");
    document.getElementById("buttonSlMobile").classList.add("buttonEnSlSelected");
    document.getElementById("buttonEnMobile").classList.remove("buttonEnSlSelected");
  } else {
    eval(textElement).textContent = language.en[textElement];
    eval(textElement + "Mobile").textContent = language.en[textElement];
    document.getElementById("buttonEnMobile").classList.add("buttonEnSlSelected");
    document.getElementById("buttonSlMobile").classList.remove("buttonEnSlSelected");
    document.getElementById("buttonEn").classList.add("buttonEnSlSelected");
    document.getElementById("buttonSl").classList.remove("buttonEnSlSelected");
  }
}
*/
