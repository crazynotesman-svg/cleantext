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
