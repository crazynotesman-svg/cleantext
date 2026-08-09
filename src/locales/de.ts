import type { Dict, FaqItem, PageSeo } from './types'
import type { PageKey } from '../config/pages'

const privacy: FaqItem = {
  question: 'Sind meine Textdaten privat und sicher?',
  answer:
    'Ja. PostCraft ist zu 100 % clientseitig — er läuft vollständig in deinem Browser. Es gibt keinen Backend, keinen Server und kein Konto. Dein Text wird niemals irgendwo hochgeladen, sondern lokal verarbeitet und — sofern du Entwürfe aktivierst — nur im localStorage deines eigenen Geräts gespeichert. Nichts von dem, was du eingibst, verlässt deinen Computer.',
}

const faqBold: FaqItem = {
  question: 'Wie füge ich fetten oder kursiven Text in LinkedIn- & X-Beiträge (Twitter) ein?',
  answer:
    'LinkedIn und X (Twitter) bieten keine eingebaute Fett- oder Kursiv-Schaltfläche, rendern aber Unicode-Mathematikbuchstaben. Wähle in PostCraft die hervorzuhebenden Wörter aus und klicke auf Fett, Kursiv, Mono oder Script in der Stilwerkzeugleiste. Der Text wird in eine Unicode-Schrift konvertiert, die auf LinkedIn, X, Instagram, Threads und den meisten anderen Plattformen fett oder kursiv angezeigt wird — ohne Bild oder Fremd-App.',
}

const faqIg: FaqItem = {
  question: 'Warum verschwinden meine Instagram-Zeilenumbrüche und wie behebt PostCraft das?',
  answer:
    'Wenn du mehrzeiligen Text in Instagram (oder Threads) einfügst, entfernt die App die Zeilenumbrüche, weil sie abschließende Zeilenvorschübe ignoriert. Die Aktion „IG-Zeilenumbrüche fixen“ in PostCraft hängt nach jedem Umbruch ein Leerzeichen ohne Breite (U+200B) an. Dieses unsichtbare Zeichen zwingt Instagram, die leere Zeile zu behalten, sodass dein Abstand beim Einfügen erhalten bleibt. Ein Klick, und deine Beschreibung behält das genaue Layout, das du entworfen hast.',
}

const faqHash: FaqItem = {
  question: 'Wie funktioniert der Hashtag-Reiniger?',
  answer:
    'Der Hashtag-Reiniger durchsucht deinen Entwurf nach jedem #Tag, entfernt Duplikate (ohne Beachtung der Groß-/Kleinschreibung, also zählen #React und #react als eines), behält die zuerst verwendete Schreibweise und verschiebt die aufgeräumte Liste an das Ende deines Beitrags. Er entfernt auch verstreute Leerzeichen und Sonderzeichen und liefert einen sauberen, deduplizierten Hashtag-Block, der sich leicht lesen und kopieren lässt.',
}

const sharedFaqs: FaqItem[] = [faqBold, faqIg, faqHash, privacy]

const igFaqs: FaqItem[] = [
  {
    question: 'Wie behalte ich Zeilenumbrüche in einer Instagram-Beschreibung?',
    answer:
      'Schreibe oder füge deine Beschreibung in PostCraft ein und klicke dann auf „IG-Zeilenumbrüche fixen“. PostCraft hängt nach jedem Zeilenumbruch ein unsichtbares Leerzeichen ohne Breite (U+200B) an, sodass Instagram deine leeren Zeilen nicht mehr entfernt. Kopiere das Ergebnis und füge es direkt in das Beschreibungsfeld von Instagram ein — dein Absatzabstand bleibt genau so, wie du ihn entworfen hast.',
  },
  {
    question: 'Warum entfernt Instagram meine Zeilenumbrüche beim Einfügen?',
    answer:
      'Das Beschreibungsfeld von Instagram klappt abschließende Zeilenvorschübe zusammen, sodass mehrzeiliger Text, den du aus Notizen oder einer anderen App kopierst, zu einem einzigen Block wird. Die Lösung ist ein unsichtbares Zeichen nach jeder Zeile, das Instagram zwingt, den Umbruch anzuzeigen. PostCraft fügt dieses Zeichen automatisch hinzu — ohne manuelle Abstandstricks.',
  },
  {
    question: 'Funktioniert das auch für Threads und andere Apps?',
    answer:
      'Ja. Dieselbe Technik mit dem Leerzeichen ohne Breite funktioniert für Threads, und der Abstand bleibt beim Einfügen in die meisten Social-Apps erhalten, die Zeilenumbrüche entfernen. Sie funktioniert auch bei Bio und Kommentaren, wo Zeilenumbrüche oft verschwinden.',
  },
  privacy,
]

const linkedinFaqs: FaqItem[] = [
  {
    question: 'Wie mache ich Text auf LinkedIn fett?',
    answer:
      'LinkedIn hat keine eingebaute Fett-Schaltfläche, rendert aber Unicode-Mathematikbuchstaben fett. Wähle in PostCraft die hervorzuhebenden Wörter aus und klicke auf Fett in der Stilwerkzeugleiste. Der ausgewählte Text wird in eine Unicode-Fettschrift konvertiert, die auf LinkedIn, X und den meisten Plattformen fett angezeigt wird — ohne Bild oder Erweiterung.',
  },
  {
    question: 'Kann ich Text auf LinkedIn auch kursiv schreiben?',
    answer:
      'Ja. Wähle deinen Text aus und klicke auf Kursiv in der Werkzeugleiste, um ihn in Unicode-Kursivbuchstaben zu konvertieren. Du kannst beides mit Fett Kursiv kombinieren oder Mono und Script für Überschriften und Zitate verwenden, die in einem LinkedIn-Beitrag hervorstechen.',
  },
  {
    question: 'Bleibt die Fett-/Kursiv-Formatierung beim Einfügen erhalten?',
    answer:
      'Der Stil steckt in den Zeichen selbst (es sind spezielle Unicode-Buchstaben, keine Schriftarteinstellung), sodass das fette oder kursive Aussehen überall erhalten bleibt, wo du einfügst — LinkedIn, X, E-Mail oder ein Google-Dokument. Kopiere einfach den konvertierten Text und füge ihn in deinen Beitrag ein.',
  },
  privacy,
]

const twitterFaqs: FaqItem[] = [
  {
    question: 'Wie hoch ist das Zeichenlimit auf X (Twitter)?',
    answer:
      'Ein einzelner X-/Twitter-Beitrag erlaubt bis zu 280 Zeichen. PostCraft zeigt beim Tippen einen Live-Zähler an und färbt die Anzeige rot, wenn du das Limit überschreitest, sodass du es immer weißt, bevor du auf „Posten“ klickst.',
  },
  {
    question: 'Wie teile ich einen langen Beitrag in einen Thread auf?',
    answer:
      'Wenn dein Entwurf über 280 Zeichen liegt, markiert PostCraft dies und schlägt eine Aufteilung vor. Unterteile deine Idee in nummerierte Tweets (1/…, 2/…, 3/…), sodass jeder unter dem Limit bleibt und Leser dem Thread folgen können. Der Zähler aktualisiert sich für den gesamten Entwurf während der Bearbeitung.',
  },
  {
    question: 'Zählt der Zähler Emoji und Sonderzeichen richtig?',
    answer:
      'Ja. PostCraft zählt nach Unicode-Codepunkten, sodass Emoji, akzentuierte Buchstaben und Unicode-formatierter Text jeweils so gezählt werden wie bei X: ein Emoji ist ein Zeichen, entsprechend dem Limit der Plattform.',
  },
  privacy,
]

const pages: Record<PageKey, PageSeo> = {
  root: {
    title: 'Kostenloser Formatter für Social-Media-Beiträge & Hashtag-Reiniger | PostCraft',
    description:
      'Formatiere fetten & kursiven Text für LinkedIn & X, korrigiere Instagram-Zeilenumbrüche, bereinige doppelte Hashtags und sieh online kostenlos Zeichenlimits in der Vorschau.',
    keywords:
      'instagram zeilenumbruch generator, linkedin text formatter, fett schrift generator, twitter zeichenzähler, hashtags bereinigen',
    h1: 'Formatter für Social-Media-Beiträge & Hashtag-Reiniger',
    intro:
      'Fetter und kursiver Text für LinkedIn und X, Instagram-Zeilenumbrüche, die beim Einfügen erhalten bleiben, aufgeräumte Hashtags und Live-Zeichenlimits — alles im Browser.',
    faqs: sharedFaqs,
  },
  ig: {
    title: 'Instagram-Zeilenumbrüche-Generator — Beschreibungsabstand kostenlos fixen | PostCraft',
    description:
      'Kostenloser Instagram-Zeilenumbrüche-Generator. Füge deine Beschreibung ein, korrigiere Zeilenumbrüche mit einem Klick und behalte deinen Abstand beim Einfügen in Instagram oder Threads. Keine App nötig.',
    keywords:
      'instagram zeilenumbruch generator, instagram zeilenumbrüche online fixen, instagram beschreibung abstand, instagram absatzumbruch, zeilenumbrüche instagram behalten',
    h1: 'Instagram-Zeilenumbrüche-Generator',
    intro:
      'Füge deine Beschreibung ein, klicke auf „IG-Zeilenumbrüche fixen“, und jeder Zeilenumbruch wird mit unsichtbaren Zeichen erhalten, wenn du ihn in Instagram oder Threads einfügst.',
    tip: 'Tipp: Klicke nach dem Schreiben auf „IG-Zeilenumbrüche fixen“ — er fügt nach jeder Zeile ein Leerzeichen ohne Breite hinzu, damit Instagram deinen Abstand behält.',
    faqs: igFaqs,
  },
  linkedin: {
    title: 'LinkedIn-Fett- & Kursiv-Text-Generator — Beiträge kostenlos formatieren | PostCraft',
    description:
      'Kostenloser LinkedIn-Generator für fetten und kursiven Text. Konvertiere ausgewählten Text in Unicode-Fett oder -Kursiv, der auf LinkedIn und X angezeigt wird — ohne eingebaute Schaltfläche.',
    keywords:
      'linkedin fett text generator, linkedin text formatter, linkedin kursiv generator, fett text linkedin, linkedin schrift generator',
    h1: 'LinkedIn-Fett- & Kursiv-Text-Generator',
    intro:
      'Wähle einen beliebigen Text und klicke auf Fett oder Kursiv, um ihn in Unicode-Buchstaben zu konvertieren, die auf LinkedIn, X und den meisten Social-Plattformen fett oder kursiv gerendert werden.',
    highlight: ['bold', 'italic'],
    faqs: linkedinFaqs,
  },
  twitter: {
    title: 'Twitter-/X-Zeichenzähler — Limit 280 & Thread-Splitter | PostCraft',
    description:
      'Kostenloser Twitter-/X-Zeichenzähler mit Live-Anzeige für das Limit 280 und Tipps zum Thread-Splitten. Prüfe die Länge deines Beitrags, bevor du twitterest.',
    keywords:
      'twitter zeichenzähler online, x beitrag zeichenlimit tool, tweet zeichen zählen, x zeichenlimit, twitter thread splitter',
    h1: 'Twitter-/X-Zeichenzähler',
    intro:
      'Tippe oder füge deinen Beitrag ein, um einen Live-Zeichenzähler gegen das Limit 280 zu sehen, mit klarer Warnung und Thread-Splitting-Tipp, wenn du darüber liegst.',
    tip: 'Tipp: Bleib unter 280 Zeichen oder teile einen langen Beitrag in einen nummerierten Thread auf, um mehr Reichweite zu erzielen.',
    faqs: twitterFaqs,
  },
}

export const de: Dict = {
  locale: 'de',
  ui: {
    htmlLang: 'de',
    ogLocale: 'de_DE',
    numberLocale: 'de-DE',
    tagline: 'Formatieren · Bereinigen · Vorschau',
    editorTitle: 'Editor',
    editorDesc: 'Text auswählen, dann einen Stil wählen. Bereinigungen gelten für den ganzen Beitrag.',
    selectThenStyle: 'Text auswählen und einen Stil wählen.',
    livePreview: 'Live-Vorschau',
    copy: 'Bereinigten Text kopieren',
    copied: 'Kopiert!',
    platformHints: {
      x: 'Über 280 Zeichen? In einen Thread aufteilen.',
      instagram: 'Nur die ersten 125 Zeichen werden vor „mehr“ angezeigt.',
      linkedin: 'Nur die ersten 140 Zeichen werden vor „mehr anzeigen“ angezeigt.',
    },
    styles: {
      bold: 'Fett',
      italic: 'Kursiv',
      boldItalic: 'Fett Kursiv',
      monospace: 'Mono',
      script: 'Script',
      normal: 'Normal',
    },
    styleTooltip: (label) => `${label} auf Auswahl anwenden`,
    actions: {
      fixIg: 'IG-Zeilenumbrüche fixen',
      fixIgHint: 'Unsichtbare Zeichen anhängen, damit Zeilenumbrüche beim Einfügen in Instagram erhalten bleiben',
      cleanHashtags: 'Hashtags bereinigen',
      cleanHashtagsHint: 'Hashtags deduplizieren und ans Ende des Beitrags verschieben',
      trim: 'Leerzeichen entfernen',
      trimHint: 'Abschließende Leerzeichen entfernen und überflüssige Leerzeilen zusammenfassen',
      clear: 'Löschen',
      clearHint: 'Entfernt den gesamten Text und startet neu',
    },
    toast: {
      applied: (style) => `${style} auf Auswahl angewendet`,
      allText: (style) => `Ganzer Text als ${style}`,
      igFixed: 'Instagram-Zeilenumbrüche korrigiert',
      trimmed: 'Leerzeichen entfernt',
      noHashtags: 'Keine Hashtags gefunden',
      cleared: 'Editor geleert',
      hashtagsCleaned: (n) =>
        `${n} Hashtag${n > 1 ? 's' : ''} bereinigt und ans Ende verschoben`,
      copied: 'In Zwischenablage kopiert!',
      copyFailed: 'Kopieren fehlgeschlagen — manuell auswählen und kopieren',
    },
    seeMore: 'Mehr anzeigen',
    social: {
      like: 'Gefällt mir',
      comment: 'Kommentieren',
      repost: 'Teilen',
      send: 'Senden',
      likes: '1.234 Gefällt mir',
    },
    moreTools: 'Weitere kostenlose Tools',
    faqTitle: 'Häufig gestellte Fragen',
    faqSubtitle:
      'Alles, was du über das Formatieren von Social-Media-Beiträgen, das Bereinigen von Hashtags und den Schutz deiner Texte wissen musst.',
    footerTagline:
      'PostCraft — ein kostenloser, 100 % clientseitiger Formatter für Social-Media-Beiträge und Hashtag-Reiniger. Dein Text verlässt niemals deinen Browser.',
    footerCopyright: '© %YEAR% PostCraft. Erstellt mit React, Vite und Tailwind CSS.',
    switchLanguage: 'Sprache auswählen',
    counterExceeded: (n) => `Um ${n.toLocaleString('de-DE')} Zeichen überschritten`,
    counterAlmostFull: 'Fast voll',
    counterLeft: (n) => `${n.toLocaleString('de-DE')} übrig`,
  },
  pages,
}
