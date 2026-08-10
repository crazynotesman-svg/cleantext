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

const threadFaqs: FaqItem[] = [
  {
    question: 'Wie teile ich einen langen Beitrag in einen Twitter-/X-Thread auf?',
    answer:
      'Füge deinen Entwurf in den Thread-Splitter ein, wähle die Voreinstellung X · 280 und klicke auf „In Thread aufteilen“. PostCraft packt deinen Text in die größtmöglichen Blöcke, die noch ins Limit passen, und hängt an jeden einen Zähler (1/5), (2/5) an. Kopiere die Karten der Reihe nach und poste sie als Antworten.',
  },
  {
    question: 'Wo schneidet der Splitter meinen Text?',
    answer:
      'Immer an einer natürlichen Grenze: zuerst an Absätzen, dann an Satzenden (. ! ?) und erst danach an Wortgrenzen. Ein Tweet wird nie mitten im Wort getrennt, sodass jeder Teil ein abgeschlossener Gedanke bleibt.',
  },
  {
    question: 'Funktioniert das auch für Threads, Bluesky oder ein eigenes Limit?',
    answer:
      'Ja. Stelle die Voreinstellung auf Threads · 500 für Meta Threads um oder wähle „Benutzerdefiniert“ und gib ein beliebiges Limit ein — 300 für Bluesky, 3.000 für LinkedIn oder dein eigenes. Nummerierung und Zeichenzähler aktualisieren sich sofort.',
  },
  privacy,
]

const quoteFaqs: FaqItem[] = [
  {
    question: 'Wie mache ich aus einem Zitat ein Bild?',
    answer:
      'Tippe oder füge deine Zeile in das Zitatkarten-Tool ein, wähle eine der vier Vorlagen, entscheide dich für ein Seitenverhältnis und klicke auf „PNG herunterladen“. Die Karte wird live gerendert — die Vorschau entspricht exakt der gespeicherten Datei.',
  },
  {
    question: 'Welche Größe sollte eine Zitatkarte für Instagram oder Xiaohongshu haben?',
    answer:
      'Nimm 4:5 (1080 × 1350). Das ist das höchste Format, das die Feeds von Instagram und Xiaohongshu ohne Beschnitt anzeigen, und es belegt am meisten Bildschirmfläche. 1:1 (1080 × 1080) eignet sich für den klassischen quadratischen Post, 16:9 (1920 × 1080) für X, LinkedIn oder einen Blog-Header.',
  },
  {
    question: 'Ist das exportierte PNG hochauflösend?',
    answer:
      'Ja. Karten werden in ihrer echten Pixelgröße exportiert — 1080 × 1080, 1080 × 1350 oder 1920 × 1080. Das ist die native Upload-Auflösung aller großen Plattformen, sodass der Text scharf bleibt und nicht aus einer kleinen Vorschau hochskaliert wird.',
  },
  privacy,
]

const breakerFaqs: FaqItem[] = [
  {
    question: 'Wie füge ich Zeilenumbrüche in eine Instagram-Bio oder -Beschreibung ein?',
    answer:
      'Schreibe deinen Text mit den Leerzeilen genau dort, wo du sie haben willst, klicke auf „Zeilenumbrüche reparieren“ und füge das Ergebnis in Instagram ein. PostCraft setzt in jede leere Zeile ein unsichtbares Leerzeichen ohne Breite (U+200B), damit Instagram sie nicht entfernt.',
  },
  {
    question: 'Warum löscht Instagram meine Leerzeilen beim Einfügen?',
    answer:
      'Instagram entfernt am Zeilenende jeden Leerraum — und eine leere Zeile besteht nur aus Leerraum. Sie verschwindet, und deine Absätze fallen zu einem Block zusammen. Ein unsichtbares Zeichen macht die Zeile „nicht leer“, und der Abstand bleibt erhalten.',
  },
  {
    question: 'Funktioniert der Zeilenumbrecher auch in Kommentaren und auf Threads?',
    answer:
      'Ja. Dieselbe Technik funktioniert in Instagram-Kommentaren, im Bio-Feld, in Threads-Beiträgen und in den meisten Apps, die Leerzeilen entfernen. Füge den reparierten Text überall dort ein, wo dein Abstand sonst verschwindet.',
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
  threadSplitter: {
    title: 'Tweet-Thread-Splitter — Lange Beiträge in X-Threads teilen | PostCraft',
    description:
      'Kostenloser Tweet-Thread-Splitter. Füge einen langen Beitrag ein und teile ihn in nummerierte Tweets mit 280 Zeichen, die sich natürlich lesen. Threads 500 und eigene Limits inklusive.',
    keywords:
      'tweet thread splitter, twitter thread generator, langen text in tweets aufteilen, x thread erstellen, threads beitrag teilen',
    h1: 'Tweet-Thread-Splitter',
    intro:
      'Füge einen langen Beitrag ein und teile ihn mit einem Klick in einen nummerierten X-Thread. PostCraft schneidet an Absatz- und Satzgrenzen, sodass jeder Tweet ein abgeschlossener Gedanke bleibt.',
    tip: 'Tipp: Wähle X · 280 für Twitter oder Threads · 500 für Meta Threads und kopiere die Karten der Reihe nach.',
    faqs: threadFaqs,
  },
  quoteCard: {
    title: 'Zitatkarten-Generator — Text kostenlos als PNG-Bild erstellen | PostCraft',
    description:
      'Kostenloser Zitatkarten-Generator. Verwandle jeden Satz in ein teilbares PNG mit den Vorlagen Dark, Xiaohongshu, Gradient oder Paper in 1:1, 4:5 oder 16:9.',
    keywords:
      'zitatkarten generator, text in bild umwandeln, instagram zitat erstellen, xiaohongshu karte generator, zitat png herunterladen',
    h1: 'Zitatkarten-Generator',
    intro:
      'Verwandle einen Satz in ein teilbares Bild. Wähle eine Vorlage, entscheide dich für 1:1, 4:5 oder 16:9 und lade ein hochauflösendes PNG herunter — alles direkt im Browser.',
    tip: 'Tipp: 4:5 belegt in den Feeds von Instagram und Xiaohongshu die meiste Fläche; 16:9 passt zu X und LinkedIn.',
    faqs: quoteFaqs,
  },
  igBreaker: {
    title: 'Instagram Zeilenumbruch-Tool — Abstände in Beschreibung & Bio behalten | PostCraft',
    description:
      'Kostenloses Instagram-Zeilenumbruch-Tool. Füge echte Absatzabstände in Beschreibungen, Bio und Kommentare ein, damit deine Leerzeilen das Einfügen überleben.',
    keywords:
      'instagram zeilenumbruch, instagram bio zeilenumbruch, abstand instagram beschreibung, instagram absatz abstand tool, threads zeilenumbruch',
    h1: 'Instagram Zeilenumbruch-Tool',
    intro:
      'Gliedere deine Beschreibung in saubere Absätze und behalte sie. PostCraft setzt unsichtbare Abstandszeichen, damit Instagram, Threads und das Bio-Feld deine Leerzeilen nicht mehr zusammenziehen.',
    tip: 'Tipp: Setze die gewünschten Leerzeilen, klicke auf „Zeilenumbrüche reparieren“ und füge den Text direkt in Instagram ein.',
    faqs: breakerFaqs,
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
    tools: {
      studio: 'Schriftstudio',
      thread: 'Thread & Zeilen',
      quote: 'Zitatkarte',
    },
    symbols: {
      title: 'Symbole & Emoji',
      toggle: 'Symbole und Emoji einfügen',
      categories: {
        numbers: 'Zahlen',
        lists: 'Aufzählungen',
        dividers: 'Trenner',
        vibe: 'Stimmungs-Emoji',
      },
      close: 'Schließen',
    },
    thread: {
      title: 'Thread-Splitter & Zeilenfixer',
      subtitle:
        'Teile lange Beiträge in nummerierte Threads und behalte deine Zeilenumbrüche auf Instagram & Threads.',
      inputPlaceholder: 'Füge deinen langen Beitrag hier ein oder schreibe ihn…',
      limitLabel: 'Zeichenlimit',
      presets: {
        twitter: 'X / Twitter · 280',
        threads: 'Threads · 500',
        custom: 'Benutzerdefiniert',
      },
      split: 'In Thread teilen',
      fixBreaks: 'Zeilenumbrüche fixen',
      clear: 'Leeren',
      partsHeading: 'Thread-Vorschau',
      cardCopy: 'Kopieren',
      cardCopied: 'Kopiert!',
      charsOf: (n, total) =>
        `${n.toLocaleString('de-DE')} / ${total.toLocaleString('de-DE')} Zeichen`,
      empty: 'Gib Text ein und wähle ein Limit, um ihn in einen Thread zu teilen.',
      overLimit: (n) => `Limit um ${n.toLocaleString('de-DE')} Zeichen überschritten`,
      fit: 'Innerhalb des Limits',
    },
    quote: {
      title: 'Zitatkarten-Generator',
      subtitle:
        'Verwandle einen Satz in ein teilbares PNG — 4 Vorlagen, 3 Formate, ohne Anmeldung.',
      inputPlaceholder: 'Schreibe oder füge die Zeile ein, die auf die Karte soll…',
      sample: 'Schreibe den Beitrag, den du selbst gern gelesen hättest.',
      authorLabel: 'Autor',
      authorPlaceholder: 'Dein Name oder @handle',
      charsLeft: (n) => `noch ${n.toLocaleString('de-DE')}`,
      presetLabel: 'Stilvorlage',
      presets: {
        dark: 'Dunkel minimalistisch',
        xiaohongshu: 'Xiaohongshu viral',
        gradient: 'Moderner Verlauf',
        paper: 'Vintage-Papier',
      },
      ratioLabel: 'Seitenverhältnis',
      ratios: {
        square: 'Quadratisch · 1:1',
        portrait: 'Feed · 4:5',
        landscape: 'Querformat · 16:9',
      },
      download: 'PNG herunterladen',
      downloading: 'Wird gerendert…',
      clear: 'Löschen',
      previewLabel: 'Kartenvorschau',
      sizeNote: (w, h) => `Export mit ${w} × ${h} px`,
      exportHint:
        'Wird komplett in deinem Browser erzeugt und gespeichert — das Bild wird nie hochgeladen.',
    },
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
      lineBreaksFixed: 'Zeilenumbrüche gefixt — leere Zeilen bleiben beim Einfügen erhalten',
      threadSplit: (n) => `In ${n} Teil${n > 1 ? 'e' : ''} geteilt`,
      imageDownloaded: 'Zitatkarte heruntergeladen',
      imageFailed: 'Export fehlgeschlagen — versuche es erneut oder kürze das Zitat',
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
