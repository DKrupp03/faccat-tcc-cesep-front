import anamnese from "./anamnese";
import medicalRecords from "./medicalRecords";

const patients = {
	anamnese,
	medicalRecords,

	columns: {
		name: "Nome",
		email: "E-mail",
		gender: "Gênero",
		birth: "Data de nascimento",
		phone: "Telefone",
		address: "Endereço",
		cpf: "CPF",
		rg: "RG",
		maritalStatus: "Estado civil",
		educationLevel: "Nível de escolaridade",
		occupation: "Profissão",
		defaultValue: "Valor padrão",
		extra: "Observações",
		active: "Ativo",
		parent: "Responsável",
		paymentStatus: "Status do pagamento",
		services: "Atendimentos",
		therapist: "Terapeuta",
		lastService: "Último atendimento",
	},

	subtitle: "{{active}} ativos de {{total}} cadastrados",
	listTitle: "Lista de pacientes",

	drawer: {
		since: "{{name}} · paciente desde {{date}}",
		newPatient: "Novo paciente",
		records: "{{name}} · {{count}} registros",
	},

	form: {
		personalData: "Dados pessoais",
		serviceData: "Atendimento",
		photo: "Foto do paciente",
		photoHint: "Imagem JPG ou PNG",
		upload: "Enviar",
	},

	headerCards: {
		total: "Total de pacientes",
		filtered: "Pacientes filtrados",
		actives: "Pacientes ativos",
	},

	actions: {
		create: "Criar paciente",
		new: "Novo paciente",
		created: "Paciente criado com sucesso!",
		edit: "Editar paciente",
		updated: "Paciente atualizado com sucesso!",
		filtrate: "Filtrar pacientes",
		delete: "Excluir paciente",
		"delete.confirmation":
			"Tem certeza que deseja excluir este paciente?</br>Ao continuar, <b>serão excluídos todos prontuários, atendimentos e pagamentos</b> associados à ele!",
		deleted: "Paciente excluído com sucesso!",
	},

	tabs: {
		form: "Formulário",
		anamnese: "Anamnese",
		medicalRecords: "Prontuários",
		services: "Atendimentos",
		payments: "Pagamentos",
	},

	help: {
		active:
			"Pacientes inativos não estarão disponíveis para a realização de novos atendimentos.",
	},
} as const;

export default patients;
