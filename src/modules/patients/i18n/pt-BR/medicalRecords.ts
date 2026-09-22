const medicalRecords = {
  "actions": {
    "create": "Criar prontuário",
    "created": "Prontuário criado com sucesso!",
    "edit": "Editar prontuário",
    "updated": "Prontuário atualizado com sucesso!",
    "filtrate": "Filtrar prontuários",
    "delete": "Excluir prontuário",
    "delete.confirmation": "Tem certeza que deseja excluir este prontuário?",
    "deleted": "Prontuário excluído com sucesso!",
  },

  "session": "{{name}} · sessão de {{date}}",

  "columns": {
    "title": "Título",
    "date": "Data",
    "evolution": "Evolução do atendimento",
    "documentaryRecord": "Registro documental",
    "supervisionRecord": "Registros da supervisão",
    "service": "Atendimento",
    "therapist": "Terapeuta",
    "reviewed": "Visto pelo supervisor",
  },

  "help": {
    "reviewed": "Somente o supervisor do terapeuta do atendimento pode dar o visto, e depois de salvo ele não pode ser desfeito.",
    "reviewedBy": "Visto por {{name}} em {{date}}",
    "notSaved": "O prontuário ainda não foi salvo pelo terapeuta, o que impede o visto.",
  },

  "filter": {
    "dateStart": "Data inicial",
    "dateEnd": "Data final",
    "reviewed": "Vistos",
    "notReviewed": "Não vistos",
  },
  
  "order": {
    "dateDesc": "Data (mais recente)",
    "dateAsc": "Data (mais antigo)",
  },
} as const;

export default medicalRecords;
