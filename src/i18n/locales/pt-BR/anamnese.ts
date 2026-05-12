const anamnese = {
  "generalData": {
    "type": "Tipo da anamnese",
    "types": {
      "child": "Criança",
      "adolescent": "Adolescente",
      "adult": "Adulto",
    },
    "therapist": "Avaliador",
    "date": "Data da Anamnese",
  },

  "identificationData": {
    "title": "Dados de identificação",
    "informant": "Informante (Nome/Parentesco)",
    "age": "Idade",
    "relationStatus": {
      "label": "Status de relacionamento",
      "single": "Solteiro(a)",
      "dating": "Namorando",
    },
  },

  "family": {
    "title": "Dados familiares",
    "responsibles": {
      "title": "Responsáveis",
      "none": "Sem responsáveis para exibir.",
      "responsible": "Responsável",
      "age": "Idade",
    },
    "brothers": {
      "title": "Irmãos",
      "none": "Sem irmãos para exibir.",
      "name": "Nome",
      "age": "Idade",
    },
    "children": {
      "title": "Filhos",
      "none": "Sem filhos para exibir.",
      "name": "Nome",
      "age": "Idade",
    },
    "spouse": {
      "title": "Cônjuge",
      "has": "Possui?",
      "name": "Nome",
      "age": "Idade",
    },
    "liveWith": "Com quem reside?",
    "genome": "Genograma (recomendável – com três gerações)",
  },

  "reason": {
    "title": "Motivo",
    "mainComplaint": "Queixa principal",
    "evolution": "Evolução da queixa",
    "effects": "Efeitos da queixa sobre o funcionamento presente",
    "feeling": "Como o paciente se sente em relação à queixa",
  },

  "previousHistory": {
    "title": "História prévia",
    "adultInfo": {
      "notableEvents": "Gestação (eventos marcantes)",
      "development": "Desenvolvimento (aspectos marcantes, anormalidades)",
      "schoolJourney": "Percurso escolar",
      "socialRelations": "Relações sociais",
      "hospitalizations": "Hospitalizações/cirurgias",
    },
    "gestation": {
      "title": "Gestação",
      "planned": "Planejada?",
      "desired": "Desejada?",
      "prenatal": "Pré-Natal?",
      "motherConditions": "Condições de saúde da mãe",
    },
    "abortions": {
      "title": "Abortos",
      "happened": "Ocorreu?",
      "howMany": "Quantos?",
      "cause": "Causa?",
    },
    "childbirth": {
      "title": "Parto",
      "type": "Tipo",
      "types": {
        "normal": "Normal",
        "cesarian": "Cesárea",
      },
      "weeks": "Quantas semanas?",
      "apgar": "Apgar",
      "parentsReaction": "Reação dos pais ao ver o bebê",
      "postpartumDepression": "Investigar depressão pós-parto (se ocorreu)",
    },
  },

  "development": {
    "title": "Desenvolvimento",
    "breastFeeding": "Amamentação (mamou? Até quando? Como foi a introdução de alimentos?)",
    "crawlingWalking": "Engatinhar/caminhar (engatinhou? Quando caminhou? Com ou sem ajuda?)",
    "sphincterControl": "Controle esfincteriano (fraldas, até quando? Urinava na cama?)",
    "language": "Linguagem (primeiras palavras, quando começou?)",
    "socialRelations": "Relações sociais com amigos e colegas",
    "socialRelationsBeginning": "Início das relações sociais",
    "losses": "Perdas/separações/distanciamentos (estranha ficar longe dos responsáveis? Como se adapta a ambientes diferentes?)",
    "dependence": "Dependência/independência",
    "alone": "O que faz sozinho?",
    "help": "No que precisa de ajuda?",
    "event": "Há algum evento que você ache importante relatar? (quedas, falecimentos, mudanças significativas, etc). Como foi? Quando isso aconteceu?",
  },
} as const;

export default anamnese;
