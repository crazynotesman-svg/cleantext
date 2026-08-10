import type { Dict, FaqItem, PageSeo } from './types'
import type { PageKey } from '../config/pages'

const privacy: FaqItem = {
  question: 'Mes données de texte sont-elles privées et sécurisées ?',
  answer:
    'Oui. PostCraft est 100 % côté client — il s’exécute entièrement dans votre navigateur. Il n’y a ni backend, ni serveur, ni compte. Votre texte n’est jamais téléversé ; il est traité localement et, si vous activez les brouillons, enregistré uniquement dans le localStorage de votre propre appareil. Rien de ce que vous tapez ne quitte votre ordinateur.',
}

const faqBold: FaqItem = {
  question: 'Comment ajouter du texte en gras ou en italique aux publications LinkedIn et X (Twitter) ?',
  answer:
    'LinkedIn et X (Twitter) n’offrent pas de bouton natif gras ou italique, mais ils affichent les lettres mathématiques Unicode. Dans PostCraft, sélectionnez les mots à mettre en valeur et cliquez sur Gras, Italique, Mono ou Script dans la barre de styles. Le texte est converti en une police Unicode affichée en gras ou italique sur LinkedIn, X, Instagram, Threads et la plupart des autres plateformes — sans image ni application tierce.',
}

const faqIg: FaqItem = {
  question: 'Pourquoi mes sauts de ligne Instagram disparaissent-ils et comment PostCraft y remédie ?',
  answer:
    'Lorsque vous collez un texte multi-lignes dans Instagram (ou Threads), l’application supprime les sauts de ligne car elle ignore les retours à la ligne de fin. L’action « Corriger les sauts IG » de PostCraft ajoute un espace sans chasse (U+200B) après chaque saut de ligne. Ce caractère invisible force Instagram à conserver la ligne vide, donc votre espacement survit au collage. Un clic et votre légende garde la mise en page exacte que vous avez conçue.',
}

const faqHash: FaqItem = {
  question: 'Comment fonctionne le nettoyeur de hashtags ?',
  answer:
    'Le nettoyeur de hashtags parcourt votre brouillon à la recherche de chaque #tag, supprime les doublons (sans tenir compte de la casse, donc #React et #react comptent comme un seul), conserve la première orthographe utilisée et déplace la liste rangée à la toute fin de votre post. Il supprime aussi les espaces errants et les caractères bizarres, vous donnant un bloc de hashtags propre, sans doublon, facile à lire et à copier.',
}

const sharedFaqs: FaqItem[] = [faqBold, faqIg, faqHash, privacy]

const igFaqs: FaqItem[] = [
  {
    question: 'Comment conserver les sauts de ligne dans une légende Instagram ?',
    answer:
      'Écrivez ou collez votre légende dans PostCraft, puis cliquez sur « Corriger les sauts IG ». PostCraft ajoute un espace sans chasse invisible (U+200B) après chaque saut de ligne pour que Instagram arrête de supprimer vos lignes vides. Copiez le résultat et collez-le directement dans le champ de légende Instagram — votre espacement de paragraphe reste exactement comme vous l’avez conçu.',
  },
  {
    question: 'Pourquoi Instagram supprime-t-il mes sauts de ligne au collage ?',
    answer:
      'Le champ de légende d’Instagram réduit les retours à la ligne de fin, donc le texte multi-lignes copié depuis Notes ou une autre appli est aplati en un seul bloc. La solution est un caractère invisible après chaque ligne qui force Instagram à afficher le saut. PostCraft ajoute ce caractère automatiquement — sans astuce d’espacement manuel.',
  },
  {
    question: 'Est-ce que cela fonctionne aussi pour Threads et d’autres applis ?',
    answer:
      'Oui. La même technique de l’espace sans chasse fonctionne pour Threads, et l’espacement survit au collage dans la plupart des applis sociales qui suppriment les sauts de ligne. Elle fonctionne aussi pour la bio et les commentaires, où les sauts de ligne ont tendance à disparaître.',
  },
  privacy,
]

const linkedinFaqs: FaqItem[] = [
  {
    question: 'Comment mettre du texte en gras sur LinkedIn ?',
    answer:
      'LinkedIn n’a pas de bouton gras intégré, mais il affiche les lettres mathématiques Unicode en gras. Dans PostCraft, sélectionnez les mots à mettre en valeur et cliquez sur Gras dans la barre de styles. Le texte sélectionné est converti en police Unicode grasse affichée en gras sur LinkedIn, X et la plupart des plateformes — sans image ni extension.',
  },
  {
    question: 'Puis-je aussi mettre du texte en italique sur LinkedIn ?',
    answer:
      'Oui. Sélectionnez votre texte et cliquez sur Italique dans la barre pour le convertir en lettres italiques Unicode. Vous pouvez aussi combiner les deux avec Gras italique, ou utiliser Mono et Script pour des titres et citations qui ressortent dans une publication LinkedIn.',
  },
  {
    question: 'Le texte gras/italique reste-t-il formaté au collage ?',
    answer:
      'Le style est intégré aux caractères eux-mêmes (ce sont des lettres Unicode spéciales, pas un réglage de police), donc l’aspect gras ou italique est conservé partout où vous collez — LinkedIn, X, e-mail ou Document Google. Copiez simplement le texte converti et collez-le dans votre publication.',
  },
  privacy,
]

const twitterFaqs: FaqItem[] = [
  {
    question: 'Quelle est la limite de caractères sur X (Twitter) ?',
    answer:
      'Une publication X / Twitter permet jusqu’à 280 caractères. PostCraft affiche un compteur en direct pendant la saisie et passe l’indicateur en rouge lorsque vous dépassez la limite, donc vous le savez toujours avant de cliquer sur « Publier ».',
  },
  {
    question: 'Comment diviser une longue publication en un fil ?',
    answer:
      'Lorsque votre brouillon dépasse 280 caractères, PostCraft le signale et suggère une découpe. Divisez votre idée en tweets numérotés (1/…, 2/…, 3/…) pour que chacun reste sous la limite et que les lecteurs puissent suivre le fil. Le compteur se met à jour pour tout le brouillon pendant l’édition.',
  },
  {
    question: 'Le compteur compte-t-il correctement les emoji et les caractères spéciaux ?',
    answer:
      'Oui. PostCraft compte par points de code Unicode, donc les emoji, les lettres accentuées et le texte stylisé Unicode sont comptés comme le fait X — un emoji vaut un caractère, conformément à la limite de la plateforme.',
  },
  privacy,
]

const threadFaqs: FaqItem[] = [
  {
    question: 'Comment découper un long post en fil Twitter / X ?',
    answer:
      'Collez votre brouillon dans le découpeur de fils, choisissez le préréglage X · 280 puis cliquez sur « Découper en fil ». PostCraft regroupe votre texte dans les plus grands blocs qui tiennent dans la limite et ajoute un compteur (1/5), (2/5) à chacun. Copiez les cartes dans l’ordre et publiez-les en réponses pour construire le fil.',
  },
  {
    question: 'Où le découpeur coupe-t-il mon texte ?',
    answer:
      'Toujours à une frontière naturelle : d’abord les paragraphes, puis les fins de phrase (. ! ?) et seulement ensuite les espaces entre les mots. Un tweet n’est jamais coupé au milieu d’un mot, donc chaque partie se lit comme une idée complète.',
  },
  {
    question: 'Est-ce que ça marche pour Threads, Bluesky ou une limite personnalisée ?',
    answer:
      'Oui. Passez au préréglage Threads · 500 pour Meta Threads, ou choisissez Personnalisé et saisissez la limite de votre choix : 300 pour Bluesky, 3 000 pour LinkedIn, ou la vôtre. La numérotation et le compteur de chaque carte se mettent à jour instantanément.',
  },
  privacy,
]

const quoteFaqs: FaqItem[] = [
  {
    question: 'Comment transformer une citation en image ?',
    answer:
      'Saisissez ou collez votre phrase dans l’outil de carte, choisissez l’un des quatre styles visuels, sélectionnez un format puis cliquez sur « Télécharger le PNG ». La carte se dessine en direct : l’aperçu correspond exactement au fichier enregistré.',
  },
  {
    question: 'Quelle taille pour une carte Instagram ou Xiaohongshu ?',
    answer:
      'Utilisez le 4:5 (1080 × 1350). C’est le format le plus haut affiché sans recadrage par les fils Instagram et Xiaohongshu, donc celui qui occupe le plus d’écran. Le 1:1 (1080 × 1080) convient au post carré classique, et le 16:9 (1920 × 1080) à X, LinkedIn ou un en-tête de blog.',
  },
  {
    question: 'Le PNG exporté est-il en haute résolution ?',
    answer:
      'Oui. Les cartes sont exportées à leur taille réelle en pixels — 1080 × 1080, 1080 × 1350 ou 1920 × 1080 — c’est-à-dire la résolution d’envoi native des grandes plateformes. Le texte reste net au lieu d’être recompressé depuis un petit aperçu.',
  },
  privacy,
]

const breakerFaqs: FaqItem[] = [
  {
    question: 'Comment ajouter des sauts de ligne à une bio ou une légende Instagram ?',
    answer:
      'Écrivez votre texte avec les lignes vides exactement où vous les voulez, cliquez sur « Corriger les sauts de ligne », puis collez le résultat dans Instagram. PostCraft insère une espace sans chasse (U+200B) invisible sur chaque ligne vide, ce qui empêche Instagram de la supprimer.',
  },
  {
    question: 'Pourquoi Instagram supprime-t-il mes lignes vides au collage ?',
    answer:
      'Instagram supprime les espaces en fin de ligne, et une ligne vide n’est faite que d’espaces : elle disparaît et vos paragraphes fusionnent en un seul bloc. Un caractère invisible rend la ligne « non vide » et l’espacement est conservé.',
  },
  {
    question: 'Est-ce que ça fonctionne dans les commentaires et sur Threads ?',
    answer:
      'Oui. La même technique fonctionne dans les commentaires Instagram, le champ bio, les publications Threads et la plupart des applis qui suppriment les lignes vides. Collez le texte corrigé partout où votre mise en page disparaît d’habitude.',
  },
  privacy,
]

const pages: Record<PageKey, PageSeo> = {
  root: {
    title: 'Formateur de publications réseaux sociaux & nettoyeur de hashtags gratuit | PostCraft',
    description:
      'Formatez du texte en gras et italique pour LinkedIn et X, corrigez les sauts de ligne Instagram, nettoyez les hashtags en double et prévisualisez les limites de caractères en ligne gratuitement.',
    keywords:
      'générateur de sauts de ligne instagram, formateur de texte linkedin, générateur de police grasse, compteur de caractères twitter, nettoyer les hashtags',
    h1: 'Formateur de publications pour réseaux sociaux & nettoyeur de hashtags',
    intro:
      'Texte en gras et italique pour LinkedIn et X, sauts de ligne Instagram qui survivent au collage, hashtags rangés et limites de caractères en direct — tout dans votre navigateur.',
    faqs: sharedFaqs,
  },
  ig: {
    title: 'Générateur de sauts de ligne Instagram — Corrigez l’espacement gratuitement | PostCraft',
    description:
      'Générateur de sauts de ligne Instagram gratuit. Collez votre légende, corrigez les sauts en un clic et conservez votre espacement en collant dans Instagram ou Threads. Aucune application requise.',
    keywords:
      'générateur de sauts de ligne instagram, corriger sauts de ligne instagram en ligne, espacement légende instagram, saut de paragraphe instagram, conserver sauts de ligne instagram',
    h1: 'Générateur de sauts de ligne Instagram',
    intro:
      'Collez votre légende, cliquez sur « Corriger les sauts IG » et chaque saut de ligne est conservé avec des caractères invisibles lors du collage dans Instagram ou Threads.',
    tip: 'Astuce : cliquez sur « Corriger les sauts IG » après l’écriture — il ajoute un espace sans chasse après chaque ligne pour que Instagram conserve votre espacement.',
    faqs: igFaqs,
  },
  linkedin: {
    title: 'Générateur de texte gras & italique LinkedIn — Formatez gratuitement | PostCraft',
    description:
      'Générateur de texte gras et italique LinkedIn gratuit. Convertissez le texte sélectionné en gras ou italique Unicode affiché sur LinkedIn et X — sans bouton natif.',
    keywords:
      'générateur texte gras linkedin, formateur de texte linkedin, générateur italique linkedin, texte gras pour linkedin, générateur de police linkedin',
    h1: 'Générateur de texte gras & italique LinkedIn',
    intro:
      'Sélectionnez n’importe quel texte et cliquez sur Gras ou Italique pour le convertir en lettres Unicode affichées en gras ou italique sur LinkedIn, X et la plupart des plateformes sociales.',
    highlight: ['bold', 'italic'],
    faqs: linkedinFaqs,
  },
  twitter: {
    title: 'Compteur de caractères Twitter / X — Limite 280 & découpe en fil | PostCraft',
    description:
      'Compteur de caractères Twitter / X gratuit avec un indicateur en direct de la limite 280 et des astuces pour découper en fil. Vérifiez la longueur de votre publication avant de tweeter.',
    keywords:
      'compteur de caractères twitter en ligne, outil limite caractères x, compter caractères tweet, limite caractères x, découpe fil twitter',
    h1: 'Compteur de caractères Twitter / X',
    intro:
      'Tapez ou collez votre publication pour voir un compteur de caractères en direct face à la limite 280, avec un avertissement clair et une astuce de découpe en fil si vous dépassez.',
    tip: 'Astuce : restez sous 280 caractères, ou divisez une longue publication en un fil numéroté pour un meilleur reach.',
    faqs: twitterFaqs,
  },
  threadSplitter: {
    title: 'Découpeur de fils Twitter / X — Diviser un long post gratuitement | PostCraft',
    description:
      'Découpeur de fils gratuit. Collez un long post et découpez-le en tweets numérotés de 280 caractères qui se lisent naturellement. Threads 500 et limites personnalisées pris en charge.',
    keywords:
      'decoupeur de fils twitter, generateur de thread twitter, diviser un long texte en tweets, creer un fil x, decouper post threads',
    h1: 'Découpeur de fils Twitter / X',
    intro:
      'Collez un long post et découpez-le en un fil X numéroté en un clic. PostCraft coupe aux frontières de paragraphe et de phrase, pour que chaque tweet reste une idée complète.',
    tip: 'Astuce : choisissez X · 280 pour Twitter ou Threads · 500 pour Meta Threads, puis copiez les cartes dans l’ordre.',
    faqs: threadFaqs,
  },
  quoteCard: {
    title: 'Générateur de cartes de citation — Texte en image PNG gratuit | PostCraft',
    description:
      'Générateur de cartes de citation gratuit. Transformez une phrase en PNG prêt à partager avec les styles sombre, Xiaohongshu, dégradé ou papier en 1:1, 4:5 ou 16:9.',
    keywords:
      'generateur de carte de citation, transformer texte en image, creer citation instagram, generateur carte xiaohongshu, telecharger citation png',
    h1: 'Générateur de cartes de citation',
    intro:
      'Transformez une phrase en image prête à partager. Choisissez un style, un format 1:1, 4:5 ou 16:9, et téléchargez un PNG haute résolution — tout est généré dans votre navigateur.',
    tip: 'Astuce : le 4:5 occupe le plus d’écran dans les fils Instagram et Xiaohongshu ; le 16:9 convient à X et LinkedIn.',
    faqs: quoteFaqs,
  },
  igBreaker: {
    title: 'Sauts de ligne Instagram — Conservez l’espacement des légendes | PostCraft',
    description:
      'Outil gratuit de sauts de ligne Instagram. Ajoutez de vrais espacements de paragraphe dans vos légendes, bios et commentaires pour que vos lignes vides survivent au collage.',
    keywords:
      'saut de ligne instagram, saut de ligne bio instagram, ajouter des espaces legende instagram, espacement paragraphe instagram, saut de ligne threads',
    h1: 'Outil de sauts de ligne Instagram',
    intro:
      'Découpez votre légende en paragraphes nets et gardez-les. PostCraft ajoute des caractères d’espacement invisibles pour qu’Instagram, Threads et le champ bio cessent de supprimer vos lignes vides.',
    tip: 'Astuce : placez les lignes vides voulues, cliquez sur « Corriger les sauts de ligne », puis collez directement dans Instagram.',
    faqs: breakerFaqs,
  },
}

export const fr: Dict = {
  locale: 'fr',
  ui: {
    htmlLang: 'fr',
    ogLocale: 'fr_FR',
    numberLocale: 'fr-FR',
    tagline: 'Formatter · Nettoyer · Prévisualiser',
    editorTitle: 'Éditeur',
    editorDesc: 'Sélectionnez du texte, puis choisissez un style. Les nettoyages s’appliquent à tout le post.',
    selectThenStyle: 'Sélectionnez du texte, puis choisissez un style.',
    tools: {
      studio: 'Studio de style',
      thread: 'Fils & sauts',
      quote: 'Carte de citation',
    },
    symbols: {
      title: 'Symboles & Emoji',
      toggle: 'Insérer symboles et emoji',
      categories: {
        numbers: 'Chiffres',
        lists: 'Puces',
        dividers: 'Séparateurs',
        vibe: 'Emoji d’ambiance',
      },
      close: 'Fermer',
    },
    thread: {
      title: 'Découpeur de fils & correcteur de sauts',
      subtitle:
        'Découpe les longs posts en fils numérotés et conserve tes sauts de ligne sur Instagram et Threads.',
      inputPlaceholder: 'Colle ou écris ton long post ici…',
      limitLabel: 'Limite de caractères',
      presets: {
        twitter: 'X / Twitter · 280',
        threads: 'Threads · 500',
        custom: 'Personnalisé',
      },
      split: 'Découper en fil',
      fixBreaks: 'Corriger les sauts',
      clear: 'Effacer',
      partsHeading: 'Aperçu du fil',
      cardCopy: 'Copier',
      cardCopied: 'Copié !',
      charsOf: (n, total) =>
        `${n.toLocaleString('fr-FR')} / ${total.toLocaleString('fr-FR')} caractères`,
      empty: 'Saisis du texte et choisis une limite pour le découper en fil.',
      overLimit: (n) => `Dépasse la limite de ${n.toLocaleString('fr-FR')} caractères`,
      fit: 'Dans la limite',
    },
    quote: {
      title: 'Générateur de cartes de citation',
      subtitle:
        'Transformez une phrase en PNG prêt à partager — 4 styles, 3 formats, sans inscription.',
      inputPlaceholder: 'Écrivez ou collez la phrase à afficher sur la carte…',
      sample: 'Écrivez le post que vous auriez aimé lire.',
      authorLabel: 'Auteur',
      authorPlaceholder: 'Votre nom ou @pseudo',
      charsLeft: (n) => `${n.toLocaleString('fr-FR')} restants`,
      presetLabel: 'Style visuel',
      presets: {
        dark: 'Sombre minimaliste',
        xiaohongshu: 'Xiaohongshu viral',
        gradient: 'Dégradé moderne',
        paper: 'Papier vintage',
      },
      ratioLabel: 'Format',
      ratios: {
        square: 'Carré · 1:1',
        portrait: 'Fil · 4:5',
        landscape: 'Paysage · 16:9',
      },
      download: 'Télécharger le PNG',
      downloading: 'Génération…',
      clear: 'Effacer',
      previewLabel: 'Aperçu de la carte',
      sizeNote: (w, h) => `Export en ${w} × ${h} px`,
      exportHint:
        'Généré et enregistré entièrement dans votre navigateur — l’image n’est jamais envoyée.',
    },
    livePreview: 'Aperçu en direct',
    copy: 'Copier le texte propre',
    copied: 'Copié !',
    platformHints: {
      x: 'Plus de 280 caractères ? Divisez en un fil.',
      instagram: 'Seuls les 125 premiers caractères s’affichent avant « en savoir plus ».',
      linkedin: 'Seuls les 140 premiers caractères s’affichent avant « voir plus ».',
    },
    styles: {
      bold: 'Gras',
      italic: 'Italique',
      boldItalic: 'Gras italique',
      monospace: 'Mono',
      script: 'Script',
      normal: 'Normal',
    },
    styleTooltip: (label) => `Appliquer ${label} à la sélection`,
    actions: {
      fixIg: 'Corriger les sauts IG',
      fixIgHint: 'Ajoute des caractères invisibles pour que les sauts de ligne survivent au collage Instagram',
      cleanHashtags: 'Nettoyer les hashtags',
      cleanHashtagsHint: 'Dédoublonne les hashtags et les déplace à la fin du post',
      trim: 'Supprimer les espaces',
      trimHint: 'Supprime les espaces de fin et réduit les lignes vides',
      clear: 'Effacer',
      clearHint: 'Supprime tout le texte et recommence',
    },
    toast: {
      applied: (style) => `${style} appliqué à la sélection`,
      allText: (style) => `Texte entier en ${style}`,
      igFixed: 'Sauts de ligne Instagram corrigés',
      trimmed: 'Espaces supprimés',
      noHashtags: 'Aucun hashtag trouvé',
      cleared: 'Éditeur vidé',
      lineBreaksFixed: 'Sauts corrigés — les lignes vides seront conservées au collage',
      threadSplit: (n) => `Découpé en ${n} partie${n > 1 ? 's' : ''}`,
      imageDownloaded: 'Carte de citation téléchargée',
      imageFailed: 'Échec de l’export — réessayez ou raccourcissez la citation',
      hashtagsCleaned: (n) =>
        `${n} hashtag${n > 1 ? 's' : ''} nettoyé${n > 1 ? 's' : ''} et déplacé${n > 1 ? 's' : ''} à la fin`,
      copied: 'Copié dans le presse-papiers !',
      copyFailed: 'Échec de la copie — sélectionnez et copiez manuellement',
    },
    seeMore: 'Voir plus',
    social: {
      like: 'J’aime',
      comment: 'Commenter',
      repost: 'Repartager',
      send: 'Envoyer',
      likes: '1 234 j’aime',
    },
    moreTools: 'Plus d’outils gratuits',
    faqTitle: 'Questions fréquentes',
    faqSubtitle:
      'Tout ce qu’il faut savoir sur le formatage des publications sur les réseaux sociaux, le nettoyage des hashtags et la confidentialité de votre texte.',
    footerTagline:
      'PostCraft — un formateur de publications pour réseaux sociaux et un nettoyeur de hashtags gratuit, 100 % côté client. Votre texte ne quitte jamais votre navigateur.',
    footerCopyright: '© %YEAR% PostCraft. Conçu avec React, Vite et Tailwind CSS.',
    switchLanguage: 'Choisir la langue',
    counterExceeded: (n) => `Dépassement de ${n.toLocaleString('fr-FR')} caractères`,
    counterAlmostFull: 'Presque plein',
    counterLeft: (n) => `${n.toLocaleString('fr-FR')} restants`,
  },
  pages,
}
