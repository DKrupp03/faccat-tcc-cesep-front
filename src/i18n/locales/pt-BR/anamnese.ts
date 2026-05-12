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

  "puberty": {
    "title": "Puberdade e adolescência",
    "socialRelations": "Relações sociais",
    "schoolHistory": "História escolar",
    "problems": "Problemas específicos da adolescência",
  },

  "adulthood": {
    "title": "Idade adulta",
    "studies": "Estuda? O quê?",
    "occupationChoice": "Escolha profissional",
    "currentSituation": "Ocupação e situação atual",
    "colleaguesRelationships": "Relação com colegas, chefias e ambiente de trabalho",
    "numberOfJobs": "Número de empregos e duração (explorar motivo(s) da(s) troca(s)",
    "jobSatisfaction": "Satisfação com o trabalho atual",
    "intimateRelationships": "Relacionamentos íntimos, qualidade da relação, sexualidade, satisfação",
    "friends": "Círculo de amizade (fora do trabalho)",
    "relateAbility": "Capacidade de se relacionar, interesses sociais e intelectuais",
  },

  "matureAge": {
    "title": "Idade madura",
    "physicalChanges": "Alterações físicas importantes (como se sente?)",
    "adversities": "Crises, adversidades e outras situações críticas e estressantes ao longo da vida (como foi o enfrentamento?)",
    "aging": "Aspectos do envelhecimento e perdas ao longo da vida",
  },

  "schoolHistory": {
    "title": "História escolar",
    "entry": "Como foi a entrada na escola?",
    "difficulties": "Dificuldades",
    "repetition": "Repetência (quantas vezes? Em qual série/ano?)",
    "interpersonalRelationships": "Relações interpessoais na escola",
  },

  "occupationHistory": {
    "title": "História ocupacional",
    "jobInfos": "Caso o(a) adolescente trabalhe, obter informações sobre seu trabalho",
  },

  "clinicalHistory": {
    "title": "História clínica",
    "illnesses": "Doenças que já teve/tem",
    "medicine": {
      "title": "Medicamentos",
      "which": "Fez ou faz uso de medicamento? Qual?",
      "dosage": "Dosagem e forma de administração",
      "since": "Desde quando?",
      "interruptionReason": "Se foi interrompido, qual o motivo?",
    },
    "hospitalizations": "Hospitalizações/cirurgias",
    "chemicalSubstances": "Exposição a substâncias químicas ou raio X?",
    "specialists": {
      "title": "Terapeutas",
      "happened": "Já teve/tem contato com algum especialista (psiquiatra, neurologista, etc.)? Qual/quais?",
      "professionalsNames": "Caso o paciente esteja em atendimento com algum desses profissionais no momento, solicite o nome e o contato de cada um",
      "reason": "Por qual motivo?",
      "since": "Desde quando?",
      "interruptionReason": "Se foi interrompido, qual o motivo?",
    },
    "familiars": {
      "title": "Família",
      "happenedDiagnosis": "Algum familiar já foi diagnosticado com algum transtorno psiquiátrico/doença neurológica?",
      "whichDiagnosis": "Qual?",
      "kinshipDiagnosis": "Qual o parentesco com o paciente?",
      "happenedSymptom": "Algum familiar já apresentou algum sintoma que considere importante mencionar?",
      "kinshipSymptom": "Qual o parentesco?",
    },
  },

  "currentMoment":  {
    "title": "Momento atual",
    "basicFunctions": {
      "title": "Funções básicas",
      "sleep": "Sono",
      "food": "Alimentação",
      "hygiene": "Hábitos de higiene",
      "socialConditions": "Condição econômica/social/cultural",
      "foodDificulties": "Dificuldades em se alimentar/falta de alimentos?",
    },
    "religion": {
      "title": "Religião/crenças",
      "family": "A família possui alguma religião/crença?",
      "adolescent": "O(A) adolescente compartilha dessa religião/crença?",
    },
  },
} as const;

export default anamnese;
