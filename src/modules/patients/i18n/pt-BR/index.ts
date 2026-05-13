import anamnese from "./anamnese";
import medicalRecords from "./medicalRecords";

const patients = {
  anamnese,
  medicalRecords,

  "headerCards": {
    "total": "Número total de pacientes",
    "filtered": "Número de pacientes filtrados",
    "actives": "Número de pacientes ativos",
  },

  "actions": {
    "create": "Criar paciente",
    "created": "Paciente criado com sucesso!",
    "edit": "Editar paciente",
    "updated": "Paciente atualizado com sucesso!",
    "filtrate": "Filtrar pacientes",
    "delete": "Excluir paciente",
    "delete.confirmation": "Tem certeza que deseja excluir este paciente?</br>Ao continuar, <b>serão excluídos todos prontuários, atendimentos e pagamentos</b> associados à ele!",
    "deleted": "Paciente excluído com sucesso!",
  },

  "tabs": {
    "form": "Formulário",
    "anamnese": "Anamnese",
    "medicalRecords": "Prontuários",
    "services": "Atendimentos",
    "payments": "Pagamentos",
  },

  "help": {
    "active": "Pacientes inativos não estarão disponíveis para a realização de novos atendimentos.",
  },
} as const;

export default patients;
