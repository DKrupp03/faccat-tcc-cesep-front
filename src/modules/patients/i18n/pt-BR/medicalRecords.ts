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
    "onlyTherapistCreates": "Somente o terapeuta do atendimento pode criar o prontuário.",
    "readOnly": "Somente o terapeuta do atendimento e o supervisor dele podem editar este prontuário.",
  },

  "rules": {
    "title": "Quem edita o prontuário",
    "create": "Só o <b>terapeuta do atendimento</b> pode criar o prontuário.",
    "therapist": "O terapeuta edita todos os campos, exceto os registros da supervisão e o visto.",
    "supervisor": "O <b>supervisor</b> dele edita apenas os registros da supervisão e o visto, depois de o prontuário ser salvo.",
    "review": "O visto, uma vez salvo, não pode ser desfeito.",
    "others": "Os demais usuários apenas consultam o prontuário.",
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
