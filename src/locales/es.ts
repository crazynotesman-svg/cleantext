import type { Dict, FaqItem, PageSeo } from './types'
import type { PageKey } from '../config/pages'

const privacy: FaqItem = {
  question: '¿Son privados y seguros mis datos de texto?',
  answer:
    'Sí. PostCraft es 100% del lado del cliente: funciona completamente en tu navegador. No hay servidor, no hay backend ni cuenta. Tu texto nunca se sube a ningún lugar; se procesa localmente y, si activas los borradores, se guarda solo en el localStorage de tu propio dispositivo. Nada de lo que escribes sale de tu computadora.',
}

const faqBold: FaqItem = {
  question: '¿Cómo añadir texto en negrita o cursiva a publicaciones de LinkedIn y X (Twitter)?',
  answer:
    'LinkedIn y X (Twitter) no ofrecen un botón nativo de negrita o cursiva, pero sí muestran letras matemáticas Unicode. En PostCraft, selecciona las palabras que quieres resaltar y haz clic en Negrita, Cursiva, Mono o Script en la barra de estilos. El texto se convierte en una fuente Unicode que se ve en negrita o cursiva en LinkedIn, X, Instagram, Threads y la mayoría de las plataformas, sin imágenes ni aplicaciones de terceros.',
}

const faqIg: FaqItem = {
  question: '¿Por qué desaparecen mis saltos de línea en Instagram y cómo lo arregla PostCraft?',
  answer:
    'Cuando pegas texto de varias líneas en Instagram (o Threads), la app elimina los saltos de línea porque ignora los saltos finales. La acción "Arreglar saltos IG" de PostCraft añade un espacio de ancho cero (U+200B) después de cada salto de línea. Ese carácter invisible obliga a Instagram a mantener la línea vacía, así tu espaciado se conserva al pegar. Un clic y tu descripción mantiene el diseño exacto que creaste.',
}

const faqHash: FaqItem = {
  question: '¿Cómo funciona el limpiador de hashtags?',
  answer:
    'El limpiador de hashtags busca cada #etiqueta en tu borrador, elimina duplicados (sin distinguir mayúsculas, así que #React y #react cuentan como uno), conserva la primera escritura que usaste y mueve la lista ordenada al final de tu publicación. También elimina espacios sueltos y caracteres extraños, dándote un bloque de hashtags limpio y sin duplicados, fácil de leer y copiar.',
}

const sharedFaqs: FaqItem[] = [faqBold, faqIg, faqHash, privacy]

const igFaqs: FaqItem[] = [
  {
    question: '¿Cómo mantengo los saltos de línea en una descripción de Instagram?',
    answer:
      'Escribe o pega tu descripción en PostCraft y luego haz clic en "Arreglar saltos IG". PostCraft añade un espacio de ancho cero invisible (U+200B) después de cada salto de línea para que Instagram deje de eliminar tus líneas vacías. Copia el resultado y pégualo directamente en el cuadro de descripción de Instagram: el espaciado de tu párrafo se mantiene exactamente como lo diseñaste.',
  },
  {
    question: '¿Por qué Instagram elimina mis saltos de línea al pegar?',
    answer:
      'El campo de descripción de Instagram colapsa los saltos de línea finales, así que el texto de varias líneas que copias de Notas u otra app se aplana en un solo bloque. La solución es un carácter invisible después de cada línea que obliga a Instagram a mostrar el salto. PostCraft añade ese carácter automáticamente, sin trucos manuales de espaciado.',
  },
  {
    question: '¿Esto también funciona para Threads y otras apps?',
    answer:
      'Sí. La misma técnica del espacio de ancho cero funciona para Threads, y el espaciado se conserva al pegar en la mayoría de las apps sociales que eliminan saltos de línea. También funciona en la biografía y los comentarios, donde los saltos de línea suelen desaparecer.',
  },
  privacy,
]

const linkedinFaqs: FaqItem[] = [
  {
    question: '¿Cómo pongo texto en negrita en LinkedIn?',
    answer:
      'LinkedIn no tiene un botón de negrita integrado, pero muestra letras matemáticas Unicode en negrita. En PostCraft, selecciona las palabras que quieres resaltar y haz clic en Negrita en la barra de estilos. El texto seleccionado se convierte en una fuente Unicode en negrita que se ve en negrita en LinkedIn, X y la mayoría de las plataformas, sin imágenes ni extensiones.',
  },
  {
    question: '¿Puedo poner texto en cursiva en LinkedIn también?',
    answer:
      'Sí. Selecciona tu texto y haz clic en Cursiva en la barra para convertirlo en letras cursivas Unicode. También puedes combinar ambas con Negrita cursiva, o usar Mono y Script para títulos y citas que destaquen en una publicación de LinkedIn.',
  },
  {
    question: '¿Se mantendrá el formato de negrita o cursiva al pegar el texto?',
    answer:
      'El estilo está integrado en los propios caracteres (son letras Unicode especiales, no una configuración de fuente), así que el aspecto de negrita o cursiva se conserva donde lo pegues: LinkedIn, X, correo o un Documento de Google. Solo copia el texto convertido y pégualo en tu publicación.',
  },
  privacy,
]

const twitterFaqs: FaqItem[] = [
  {
    question: '¿Cuál es el límite de caracteres en X (Twitter)?',
    answer:
      'Una publicación de X / Twitter permite hasta 280 caracteres. PostCraft muestra un contador en vivo mientras escribes y pone el indicador en rojo cuando superas el límite, para que siempre lo sepas antes de pulsar "Publicar".',
  },
  {
    question: '¿Cómo divido una publicación larga en un hilo?',
    answer:
      'Cuando tu borrador supera los 280 caracteres, PostCraft lo marca y sugiere dividirlo. Separa tu idea en tuits numerados (1/…, 2/…, 3/…) para que cada uno quede por debajo del límite y los lectores puedan seguir el hilo. El contador se actualiza para todo el borrador mientras editas.',
  },
  {
    question: '¿El contador cuenta bien los emoji y los caracteres especiales?',
    answer:
      'Sí. PostCraft cuenta por puntos de código Unicode, así que los emoji, las letras acentuadas y el texto con estilo Unicode se cuentan como lo hace X: un emoji es un carácter, igual que el límite de la plataforma.',
  },
  privacy,
]

const threadFaqs: FaqItem[] = [
  {
    question: '¿Cómo divido una publicación larga en un hilo de Twitter / X?',
    answer:
      'Pega tu borrador en el divisor de hilos, elige el preajuste X · 280 y haz clic en "Dividir en hilo". PostCraft agrupa tu texto en los bloques más grandes que caben en el límite y añade un contador (1/5), (2/5) a cada uno. Copia las tarjetas en orden y publícalas como respuestas para construir el hilo.',
  },
  {
    question: '¿Dónde corta el texto el divisor?',
    answer:
      'Siempre prefiere un límite natural: primero los saltos de párrafo, después el final de las frases (. ! ?) y solo entonces los espacios entre palabras. Nunca se corta un tuit en mitad de una palabra, así que cada parte sigue leyéndose como una idea completa.',
  },
  {
    question: '¿Funciona con Threads, Bluesky o un límite personalizado?',
    answer:
      'Sí. Cambia el preajuste a Threads · 500 para Meta Threads, o elige Personalizado y escribe el límite que necesites: 300 para Bluesky, 3.000 para LinkedIn o el tuyo propio. La numeración y el contador de cada tarjeta se actualizan al instante.',
  },
  privacy,
]

const quoteFaqs: FaqItem[] = [
  {
    question: '¿Cómo convierto una frase en una imagen?',
    answer:
      'Escribe o pega tu frase en la herramienta de tarjetas, elige uno de los cuatro estilos visuales, selecciona una proporción y haz clic en "Descargar PNG". La tarjeta se dibuja en vivo mientras escribes, así que lo que ves en la vista previa es exactamente lo que se guarda.',
  },
  {
    question: '¿Qué tamaño debe tener una tarjeta para Instagram o Xiaohongshu?',
    answer:
      'Usa 4:5 (1080 × 1350). Es la proporción más alta que los feeds de Instagram y Xiaohongshu muestran sin recortar, así que ocupa más pantalla. Elige 1:1 (1080 × 1080) para un post cuadrado clásico y 16:9 (1920 × 1080) para X, LinkedIn o la cabecera de un blog.',
  },
  {
    question: '¿El PNG exportado tiene alta resolución?',
    answer:
      'Sí. Las tarjetas se exportan a su tamaño real en píxeles (1080 × 1080, 1080 × 1350 o 1920 × 1080), que es la resolución nativa de subida de las principales plataformas, así que el texto se mantiene nítido en lugar de recomprimirse desde una vista previa pequeña.',
  },
  privacy,
]

const breakerFaqs: FaqItem[] = [
  {
    question: '¿Cómo añado saltos de línea a una biografía o descripción de Instagram?',
    answer:
      'Escribe tu texto con las líneas en blanco exactamente donde las quieras, haz clic en "Arreglar saltos de línea" y copia el resultado en Instagram. PostCraft inserta un espacio de ancho cero (U+200B) invisible en cada línea vacía, lo que impide que Instagram la elimine.',
  },
  {
    question: '¿Por qué Instagram borra mis líneas en blanco al pegar?',
    answer:
      'Instagram recorta los espacios finales de cada línea, y una línea en blanco no es más que espacio, así que desaparece y tus párrafos se juntan en un solo bloque. Al poner un carácter invisible en esa línea deja de estar vacía y el espaciado se conserva.',
  },
  {
    question: '¿Funciona también en los comentarios y en Threads?',
    answer:
      'Sí. La misma técnica del carácter invisible funciona en los comentarios de Instagram, en la biografía, en las publicaciones de Threads y en la mayoría de apps que eliminan las líneas en blanco. Pega el texto corregido donde tu espaciado suele desaparecer.',
  },
  privacy,
]

const pages: Record<PageKey, PageSeo> = {
  root: {
    title: 'Formateador de posts y limpiador de hashtags gratis | PostCraft',
    description:
      'Formatea texto en negrita y cursiva para LinkedIn y X, arregla los saltos de línea de Instagram, limpia hashtags duplicados y previsualiza los límites de caracteres en línea gratis.',
    keywords:
      'generador de saltos de línea instagram, formateador de texto linkedin, generador de fuente negrita, contador de caracteres twitter, limpiar hashtags',
    h1: 'Formateador de publicaciones para redes sociales y limpiador de hashtags',
    intro:
      'Texto en negrita y cursiva para LinkedIn y X, saltos de línea de Instagram que se mantienen al pegar, hashtags ordenados y límites de caracteres en vivo, todo en tu navegador.',
    faqs: sharedFaqs,
  },
  ig: {
    title: 'Generador de saltos de línea para Instagram — Arregla el espaciado gratis | PostCraft',
    description:
      'Generador de saltos de línea para Instagram gratis. Pega tu descripción, arregla los saltos con un clic y mantén el espaciado al pegar en Instagram o Threads. Sin necesidad de app.',
    keywords:
      'generador de saltos de línea instagram, arreglar saltos de línea instagram online, espaciado descripción instagram, salto de párrafo instagram, mantener saltos de línea instagram',
    h1: 'Generador de saltos de línea para Instagram',
    intro:
      'Pega tu descripción, haz clic en "Arreglar saltos IG" y cada salto de línea se conserva con caracteres invisibles al pegar en Instagram o Threads.',
    tip: 'Consejo: haz clic en "Arreglar saltos IG" después de escribir — añade un espacio de ancho cero después de cada línea para que Instagram mantenga tu espaciado.',
    faqs: igFaqs,
  },
  linkedin: {
    title: 'Generador de texto en negrita y cursiva para LinkedIn — Formatea gratis | PostCraft',
    description:
      'Generador de texto en negrita y cursiva para LinkedIn gratis. Convierte el texto seleccionado en negrita o cursiva Unicode que se muestra en LinkedIn y X, sin botón nativo.',
    keywords:
      'generador de texto negrita linkedin, formateador de texto linkedin, generador cursiva linkedin, texto en negrita para linkedin, generador de fuente linkedin',
    h1: 'Generador de texto en negrita y cursiva para LinkedIn',
    intro:
      'Selecciona cualquier texto y haz clic en Negrita o Cursiva para convertirlo en letras Unicode que se ven en negrita o cursiva en LinkedIn, X y la mayoría de las plataformas sociales.',
    highlight: ['bold', 'italic'],
    faqs: linkedinFaqs,
  },
  twitter: {
    title: 'Contador de caracteres de Twitter / X — Límite 280 y división en hilos | PostCraft',
    description:
      'Contador de caracteres de Twitter / X gratis con un indicador en vivo del límite 280 y consejos para dividir hilos. Comprueba la longitud de tu publicación antes de tuitear.',
    keywords:
      'contador de caracteres twitter online, herramienta límite caracteres x, contar caracteres tweet, límite caracteres x, divisor de hilos twitter',
    h1: 'Contador de caracteres de Twitter / X',
    intro:
      'Escribe o pega tu publicación para ver un contador de caracteres en vivo frente al límite de 280, con una advertencia clara y un consejo para dividir hilos cuando te pasas.',
    tip: 'Consejo: mantente por debajo de 280 caracteres, o divide una publicación larga en un hilo numerado para mayor alcance.',
    faqs: twitterFaqs,
  },
  threadSplitter: {
    title: 'Divisor de hilos para Twitter / X — Divide posts largos gratis | PostCraft',
    description:
      'Divisor de hilos para tuits gratis. Pega un post largo y divídelo en tuits numerados de 280 caracteres que se leen con naturalidad. Compatible con Threads 500 y límites personalizados.',
    keywords:
      'divisor de hilos twitter, generador de hilos twitter, dividir texto largo en tuits, crear hilo x, divisor de posts threads',
    h1: 'Divisor de hilos para Twitter / X',
    intro:
      'Pega un post largo y divídelo en un hilo numerado de X con un clic. PostCraft corta en los límites de párrafo y de frase, así cada tuit sigue siendo una idea completa.',
    tip: 'Consejo: elige X · 280 para Twitter o Threads · 500 para Meta Threads y copia las tarjetas en orden.',
    faqs: threadFaqs,
  },
  quoteCard: {
    title: 'Generador de tarjetas de citas — Convierte texto en PNG gratis | PostCraft',
    description:
      'Generador de tarjetas de citas gratis. Convierte cualquier frase en un PNG listo para compartir con estilos oscuro, Xiaohongshu, degradado o papel en 1:1, 4:5 y 16:9.',
    keywords:
      'generador de tarjetas de citas, convertir texto en imagen, crear citas para instagram, generador de tarjetas xiaohongshu, descargar cita png',
    h1: 'Generador de tarjetas de citas',
    intro:
      'Convierte una frase en una imagen lista para compartir. Elige un estilo, selecciona 1:1, 4:5 o 16:9 y descarga un PNG en alta resolución: todo se genera en tu navegador.',
    tip: 'Consejo: 4:5 ocupa más pantalla en los feeds de Instagram y Xiaohongshu; 16:9 encaja mejor en X y LinkedIn.',
    faqs: quoteFaqs,
  },
  igBreaker: {
    title: 'Separador de líneas para Instagram — Mantén el espaciado gratis | PostCraft',
    description:
      'Separador de líneas para Instagram gratis. Añade espaciado real entre párrafos en descripciones, biografías y comentarios para que tus líneas en blanco sobrevivan al pegar.',
    keywords:
      'separador de lineas instagram, salto de linea biografia instagram, añadir espacios descripcion instagram, espaciado parrafos instagram, salto de linea threads',
    h1: 'Separador de líneas para Instagram',
    intro:
      'Divide tu descripción en párrafos limpios y consérvalos. PostCraft añade caracteres de espaciado invisibles para que Instagram, Threads y la biografía dejen de juntar tus líneas vacías.',
    tip: 'Consejo: coloca las líneas en blanco que quieras, haz clic en "Arreglar saltos de línea" y pega directamente en Instagram.',
    faqs: breakerFaqs,
  },
}

export const es: Dict = {
  locale: 'es',
  ui: {
    htmlLang: 'es',
    ogLocale: 'es_ES',
    numberLocale: 'es-ES',
    tagline: 'Formatea · Limpia · Previsualiza',
    editorTitle: 'Editor',
    editorDesc: 'Selecciona texto y elige un estilo. Las limpiezas se aplican a todo el post.',
    selectThenStyle: 'Selecciona texto y luego elige un estilo.',
    tools: {
      studio: 'Estudio de fuentes',
      thread: 'Hilos y saltos',
      quote: 'Tarjeta de cita',
    },
    symbols: {
      title: 'Símbolos y emoji',
      toggle: 'Insertar símbolos y emoji',
      categories: {
        numbers: 'Números',
        lists: 'Viñetas',
        dividers: 'Separadores',
        vibe: 'Emoji de ambiente',
      },
      close: 'Cerrar',
    },
    thread: {
      title: 'Divisor de hilos y arreglo de saltos',
      subtitle:
        'Divide publicaciones largas en hilos numerados y conserva tus saltos de línea en Instagram y Threads.',
      inputPlaceholder: 'Pega o escribe tu publicación larga aquí…',
      limitLabel: 'Límite de caracteres',
      presets: {
        twitter: 'X / Twitter · 280',
        threads: 'Threads · 500',
        custom: 'Personalizado',
      },
      split: 'Dividir en hilo',
      fixBreaks: 'Arreglar saltos',
      clear: 'Limpiar',
      partsHeading: 'Vista previa del hilo',
      cardCopy: 'Copiar',
      cardCopied: '¡Copiado!',
      charsOf: (n, total) =>
        `${n.toLocaleString('es-ES')} / ${total.toLocaleString('es-ES')} caracteres`,
      empty: 'Escribe texto y elige un límite para dividirlo en un hilo.',
      overLimit: (n) => `Supera el límite por ${n.toLocaleString('es-ES')} caracteres`,
      fit: 'Dentro del límite',
    },
    quote: {
      title: 'Generador de tarjetas de citas',
      subtitle:
        'Convierte una frase en un PNG listo para compartir: 4 estilos, 3 proporciones, sin registro.',
      inputPlaceholder: 'Escribe o pega la frase que quieres en la tarjeta…',
      sample: 'Escribe el post que te habría gustado leer.',
      authorLabel: 'Autor',
      authorPlaceholder: 'Tu nombre o @usuario',
      charsLeft: (n) => `quedan ${n.toLocaleString('es-ES')}`,
      presetLabel: 'Estilo visual',
      presets: {
        dark: 'Oscuro minimalista',
        xiaohongshu: 'Xiaohongshu viral',
        gradient: 'Degradado moderno',
        paper: 'Papel vintage',
      },
      ratioLabel: 'Proporción',
      ratios: {
        square: 'Cuadrada · 1:1',
        portrait: 'Feed · 4:5',
        landscape: 'Horizontal · 16:9',
      },
      download: 'Descargar PNG',
      downloading: 'Generando…',
      clear: 'Limpiar',
      previewLabel: 'Vista previa de la tarjeta',
      sizeNote: (w, h) => `Se exporta a ${w} × ${h} px`,
      exportHint:
        'Se genera y se guarda por completo en tu navegador: la imagen nunca se sube.',
    },
    livePreview: 'Vista previa',
    copy: 'Copiar texto limpio',
    copied: '¡Copiado!',
    platformHints: {
      x: '¿Más de 280 caracteres? Divídelo en un hilo.',
      instagram: 'Solo se muestran los primeros 125 caracteres antes de "más".',
      linkedin: 'Solo se muestran los primeros 140 caracteres antes de "ver más".',
    },
    styles: {
      bold: 'Negrita',
      italic: 'Cursiva',
      boldItalic: 'Negrita cursiva',
      monospace: 'Mono',
      script: 'Script',
      normal: 'Normal',
    },
    styleTooltip: (label) => `Aplicar ${label} a la selección`,
    actions: {
      fixIg: 'Arreglar saltos IG',
      fixIgHint: 'Añade caracteres invisibles para que los saltos de línea se mantengan al pegar en Instagram',
      cleanHashtags: 'Limpiar hashtags',
      cleanHashtagsHint: 'Elimina hashtags duplicados y muévelos al final del post',
      trim: 'Recortar espacios',
      trimHint: 'Elimina espacios finales y reduce las líneas en blanco',
      clear: 'Limpiar',
      clearHint: 'Borra todo el texto y empieza de nuevo',
    },
    toast: {
      applied: (style) => `${style} aplicado a la selección`,
      allText: (style) => `Todo el texto en ${style}`,
      igFixed: 'Saltos de línea de Instagram arreglados',
      trimmed: 'Espacios recortados',
      noHashtags: 'No se encontraron hashtags',
      cleared: 'Editor vaciado',
      lineBreaksFixed: 'Saltos arreglados: las líneas en blanco se conservarán al pegar',
      threadSplit: (n) => `Dividido en ${n} parte${n > 1 ? 's' : ''}`,
      imageDownloaded: 'Tarjeta de cita descargada',
      imageFailed: 'Error al exportar: inténtalo de nuevo o acorta la cita',
      hashtagsCleaned: (n) =>
        `${n} hashtag${n > 1 ? 's' : ''} limpiado${n > 1 ? 's' : ''} y movido${n > 1 ? 's' : ''} al final`,
      copied: '¡Copiado al portapapeles!',
      copyFailed: 'Error al copiar — selecciona y copia manualmente',
    },
    seeMore: 'Ver más',
    social: {
      like: 'Me gusta',
      comment: 'Comentar',
      repost: 'Reenviar',
      send: 'Enviar',
      likes: '1.234 me gusta',
    },
    moreTools: 'Más herramientas gratis',
    faqTitle: 'Preguntas frecuentes',
    faqSubtitle:
      'Todo lo que necesitas saber sobre cómo formatear publicaciones en redes sociales, limpiar hashtags y mantener tu texto privado.',
    footerTagline:
      'PostCraft — un formateador de publicaciones para redes sociales y limpiador de hashtags gratuito, 100% del lado del cliente. Tu texto nunca sale de tu navegador.',
    footerCopyright: '© %YEAR% PostCraft. Creado con React, Vite y Tailwind CSS.',
    switchLanguage: 'Seleccionar idioma',
    counterExceeded: (n) => `Excedido por ${n.toLocaleString('es-ES')} caracteres`,
    counterAlmostFull: 'Casi lleno',
    counterLeft: (n) => `${n.toLocaleString('es-ES')} restantes`,
  },
  pages,
}
