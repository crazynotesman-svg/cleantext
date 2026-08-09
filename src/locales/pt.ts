import type { Dict, FaqItem, PageSeo } from './types'
import type { PageKey } from '../config/pages'

const privacy: FaqItem = {
  question: 'Meus dados de texto são privados e seguros?',
  answer:
    'Sim. O PostCraft é 100% do lado do cliente — roda inteiramente no seu navegador. Não há backend, servidor ou conta. Seu texto nunca é enviado a lugar nenhum; é processado localmente e, se você ativar os rascunhos, salvo apenas no localStorage do seu próprio dispositivo. Nada do que você digita sai do seu computador.',
}

const faqBold: FaqItem = {
  question: 'Como adicionar texto em negrito ou itálico a publicações do LinkedIn e X (Twitter)?',
  answer:
    'LinkedIn e X (Twitter) não oferecem um botão nativo de negrito ou itálico, mas exibem letras matemáticas Unicode. No PostCraft, selecione as palavras que deseja enfatizar e clique em Negrito, Itálico, Mono ou Script na barra de estilos. O texto é convertido em uma fonte Unicode exibida em negrito ou itálico no LinkedIn, X, Instagram, Threads e na maioria das outras plataformas — sem imagem ou aplicativo de terceiros.',
}

const faqIg: FaqItem = {
  question: 'Por que minhas quebras de linha do Instagram somem e como o PostCraft corrige?',
  answer:
    'Quando você cola um texto de várias linhas no Instagram (ou Threads), o app remove as quebras de linha porque ignora as quebras finais. A ação "Corrigir quebras IG" do PostCraft adiciona um espaço de largura zero (U+200B) depois de cada quebra de linha. Esse caractere invisível força o Instagram a manter a linha vazia, então seu espaçamento sobrevive à colagem. Um clique e sua legenda mantém o layout exato que você criou.',
}

const faqHash: FaqItem = {
  question: 'Como funciona o limpador de hashtags?',
  answer:
    'O limpador de hashtags varre seu rascunho em busca de cada #tag, remove duplicatas (sem distinguir maiúsculas, então #React e #react contam como uma só), mantém a primeira grafia que você usou e move a lista organizada para o final do post. Ele também remove espaços soltos e caracteres estranhos, entregando um bloco de hashtags limpo e sem duplicatas, fácil de ler e copiar.',
}

const sharedFaqs: FaqItem[] = [faqBold, faqIg, faqHash, privacy]

const igFaqs: FaqItem[] = [
  {
    question: 'Como manter as quebras de linha em uma legenda do Instagram?',
    answer:
      'Escreva ou cole sua legenda no PostCraft e clique em "Corrigir quebras IG". O PostCraft adiciona um espaço de largura zero invisível (U+200B) após cada quebra de linha para o Instagram parar de remover suas linhas vazias. Copie o resultado e cole direto na caixa de legenda do Instagram — seu espaçamento de parágrafo fica exatamente como você o desenhou.',
  },
  {
    question: 'Por que o Instagram remove minhas quebras de linha ao colar?',
    answer:
      'O campo de legenda do Instagram recolhe as quebras de linha finais, então o texto de várias linhas que você copia do Notas ou de outro app vira um único bloco. A solução é um caractere invisível após cada linha que força o Instagram a renderizar a quebra. O PostCraft adiciona esse caractere automaticamente — sem truques manuais de espaçamento.',
  },
  {
    question: 'Isso também funciona para Threads e outros apps?',
    answer:
      'Sim. A mesma técnica de espaço de largura zero funciona para o Threads, e o espaçamento sobrevive à colagem na maioria dos apps sociais que removem quebras de linha. Também funciona na bio e nos comentários, onde as quebras de linha costumam sumir.',
  },
  privacy,
]

const linkedinFaqs: FaqItem[] = [
  {
    question: 'Como deixo o texto em negrito no LinkedIn?',
    answer:
      'O LinkedIn não tem um botão de negrito integrado, mas exibe letras matemáticas Unicode em negrito. No PostCraft, selecione as palavras que deseja enfatizar e clique em Negrito na barra de estilos. O texto selecionado é convertido em uma fonte Unicode em negrito exibida em negrito no LinkedIn, X e na maioria das plataformas — sem imagem ou extensão.',
  },
  {
    question: 'Posso deixar o texto em itálico no LinkedIn também?',
    answer:
      'Sim. Selecione seu texto e clique em Itálico na barra para convertê-lo em letras itálicas Unicode. Você também pode combinar ambas com Negrito itálico, ou usar Mono e Script para títulos e citações que se destacam em uma publicação do LinkedIn.',
  },
  {
    question: 'O texto em negrito/itálico mantém a formatação ao colar?',
    answer:
      'O estilo está embutido nos próprios caracteres (são letras Unicode especiais, não uma configuração de fonte), então a aparência de negrito ou itálico é preservada onde você colar — LinkedIn, X, e-mail ou Documentos Google. Basta copiar o texto convertido e colá-lo na sua publicação.',
  },
  privacy,
]

const twitterFaqs: FaqItem[] = [
  {
    question: 'Qual é o limite de caracteres no X (Twitter)?',
    answer:
      'Uma publicação do X / Twitter permite até 280 caracteres. O PostCraft mostra um contador ao vivo enquanto você digita e torna o indicador vermelho quando você excede o limite, então você sempre sabe antes de clicar em "Publicar".',
  },
  {
    question: 'Como divido um post longo em uma thread?',
    answer:
      'Quando seu rascunho passa de 280 caracteres, o PostCraft sinaliza e sugere dividir. Separe sua ideia em tweets numerados (1/…, 2/…, 3/…) para que cada um fique abaixo do limite e os leitores possam seguir a thread. O contador se atualiza para todo o rascunho enquanto você edita.',
  },
  {
    question: 'O contador conta emoji e caracteres especiais corretamente?',
    answer:
      'Sim. O PostCraft conta por pontos de código Unicode, então emoji, letras acentuadas e texto estilizado em Unicode são contados como o X faz — um emoji é um caractere, igual ao limite da plataforma.',
  },
  privacy,
]

const pages: Record<PageKey, PageSeo> = {
  root: {
    title: 'Formatador de publicações e limpador de hashtags grátis | PostCraft',
    description:
      'Formate texto em negrito e itálico para LinkedIn e X, corrija quebras de linha do Instagram, limpe hashtags duplicadas e visualize limites de caracteres online grátis.',
    keywords:
      'gerador de quebras de linha instagram, formatador de texto linkedin, gerador de fonte negrito, contador de caracteres twitter, limpar hashtags',
    h1: 'Formatador de publicações para redes sociais e limpador de hashtags',
    intro:
      'Texto em negrito e itálico para LinkedIn e X, quebras de linha do Instagram que sobrevivem à colagem, hashtags organizadas e limites de caracteres em tempo real, tudo no seu navegador.',
    faqs: sharedFaqs,
  },
  ig: {
    title: 'Gerador de quebras de linha do Instagram — Corrija o espaçamento grátis | PostCraft',
    description:
      'Gerador de quebras de linha do Instagram grátis. Cole sua legenda, corrija as quebras com um clique e mantenha o espaçamento ao colar no Instagram ou Threads. Sem app.',
    keywords:
      'gerador de quebras de linha instagram, corrigir quebras de linha instagram online, espaçamento legenda instagram, quebra de parágrafo instagram, manter quebras de linha instagram',
    h1: 'Gerador de quebras de linha do Instagram',
    intro:
      'Cole sua legenda, clique em "Corrigir quebras IG" e cada quebra de linha é preservada com caracteres invisíveis ao colar no Instagram ou Threads.',
    tip: 'Dica: clique em "Corrigir quebras IG" depois de escrever — ele adiciona um espaço de largura zero após cada linha para o Instagram manter seu espaçamento.',
    faqs: igFaqs,
  },
  linkedin: {
    title: 'Gerador de texto em negrito e itálico para LinkedIn — Formate grátis | PostCraft',
    description:
      'Gerador de texto em negrito e itálico para LinkedIn grátis. Converta o texto selecionado em negrito ou itálico Unicode exibido no LinkedIn e X, sem botão nativo.',
    keywords:
      'gerador de texto negrito linkedin, formatador de texto linkedin, gerador itálico linkedin, texto em negrito para linkedin, gerador de fonte linkedin',
    h1: 'Gerador de texto em negrito e itálico para LinkedIn',
    intro:
      'Selecione qualquer texto e clique em Negrito ou Itálico para convertê-lo em letras Unicode exibidas em negrito ou itálico no LinkedIn, X e na maioria das plataformas sociais.',
    highlight: ['bold', 'italic'],
    faqs: linkedinFaqs,
  },
  twitter: {
    title: 'Contador de caracteres do Twitter / X — Limite 280 e divisão em thread | PostCraft',
    description:
      'Contador de caracteres do Twitter / X grátis com indicador ao vivo do limite 280 e dicas para dividir em threads. Confira o tamanho do post antes de twittar.',
    keywords:
      'contador de caracteres twitter online, ferramenta limite caracteres x, contar caracteres tweet, limite caracteres x, divisor de threads twitter',
    h1: 'Contador de caracteres do Twitter / X',
    intro:
      'Digite ou cole seu post para ver um contador de caracteres ao vivo frente ao limite de 280, com aviso claro e dica de divisão em thread quando você passa do limite.',
    tip: 'Dica: mantenha-se abaixo de 280 caracteres, ou divida um post longo em uma thread numerada para melhor alcance.',
    faqs: twitterFaqs,
  },
}

export const pt: Dict = {
  locale: 'pt',
  ui: {
    htmlLang: 'pt',
    ogLocale: 'pt_BR',
    numberLocale: 'pt-BR',
    tagline: 'Formatar · Limpar · Pré-visualizar',
    editorTitle: 'Editor',
    editorDesc: 'Selecione o texto e escolha um estilo. As limpezas se aplicam a todo o post.',
    selectThenStyle: 'Selecione o texto e escolha um estilo.',
    livePreview: 'Pré-visualização',
    copy: 'Copiar texto limpo',
    copied: 'Copiado!',
    platformHints: {
      x: 'Mais de 280 caracteres? Divida em uma thread.',
      instagram: 'Apenas os primeiros 125 caracteres aparecem antes de “ver mais”.',
      linkedin: 'Apenas os primeiros 140 caracteres aparecem antes de “ver mais”.',
    },
    styles: {
      bold: 'Negrito',
      italic: 'Itálico',
      boldItalic: 'Negrito itálico',
      monospace: 'Mono',
      script: 'Script',
      normal: 'Normal',
    },
    styleTooltip: (label) => `Aplicar ${label} à seleção`,
    actions: {
      fixIg: 'Corrigir quebras IG',
      fixIgHint: 'Adiciona caracteres invisíveis para que as quebras de linha sobrevivam à colagem no Instagram',
      cleanHashtags: 'Limpar hashtags',
      cleanHashtagsHint: 'Remove hashtags duplicadas e as move para o final do post',
      trim: 'Remover espaços',
      trimHint: 'Remove espaços finais e reduz linhas em branco extras',
    },
    toast: {
      applied: (style) => `${style} aplicado à seleção`,
      allText: (style) => `Texto inteiro em ${style}`,
      igFixed: 'Quebras de linha do Instagram corrigidas',
      trimmed: 'Espaços removidos',
      noHashtags: 'Nenhuma hashtag encontrada',
      hashtagsCleaned: (n) =>
        `${n} hashtag${n > 1 ? 's' : ''} limpa${n > 1 ? 's' : ''} e movida${n > 1 ? 's' : ''} para o final`,
      copied: 'Copiado para a área de transferência!',
      copyFailed: 'Falha ao copiar — selecione e copie manualmente',
    },
    seeMore: 'Ver mais',
    social: {
      like: 'Curtir',
      comment: 'Comentar',
      repost: 'Republicar',
      send: 'Enviar',
      likes: '1.234 curtidas',
    },
    moreTools: 'Mais ferramentas grátis',
    faqTitle: 'Perguntas frequentes',
    faqSubtitle:
      'Tudo o que você precisa saber sobre como formatar publicações em redes sociais, limpar hashtags e manter seu texto privado.',
    footerTagline:
      'PostCraft — um formatador de publicações para redes sociais e limpador de hashtags grátis, 100% do lado do cliente. Seu texto nunca sai do seu navegador.',
    footerCopyright: '© %YEAR% PostCraft. Feito com React, Vite e Tailwind CSS.',
    switchLanguage: 'Selecionar idioma',
    counterExceeded: (n) => `Excedido em ${n.toLocaleString('pt-BR')} caracteres`,
    counterAlmostFull: 'Quase cheio',
    counterLeft: (n) => `${n.toLocaleString('pt-BR')} restantes`,
  },
  pages,
}
