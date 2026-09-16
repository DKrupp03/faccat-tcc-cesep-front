const therapists = {
	columns: {
		name: "Nome",
		email: "E-mail",
		gender: "Gênero",
		birth: "Data de nascimento",
		phone: "Telefone",
		address: "Endereço",
		cpf: "CPF",
		rg: "RG",
		crp: "CRP",
		active: "Ativo",
		admin: "Administrador",
		supervisor: "Supervisor",
		services: "Atendimentos",
		patients: "Pacientes",
		lastService: "Último atendimento",
	},

	subtitle: "{{active}} ativos de {{total}} cadastrados",
	listTitle: "Lista de terapeutas",
	adminTag: "Admin",

	drawer: {
		newTherapist: "Novo terapeuta",
		withCrp: "{{name}} · CRP {{crp}}",
	},

	form: {
		photo: "Foto do terapeuta",
		photoHint: "Imagem JPG ou PNG",
		upload: "Enviar",
	},

	headerCards: {
		total: "Total de terapeutas",
		filtered: "Terapeutas filtrados",
		actives: "Terapeutas ativos",
	},

	actions: {
		create: "Criar terapeuta",
		created: "Terapeuta criado com sucesso!",
		edit: "Editar terapeuta",
		updated: "Terapeuta atualizado com sucesso!",
		filtrate: "Filtrar terapeutas",
		delete: "Excluir terapeuta",
		"delete.confirmation":
			"Tem certeza que deseja excluir este terapeuta?</br>Ao continuar, <b>serão excluídos todos prontuários e atendimentos</b> associados à ele!",
		deleted: "Terapeuta excluído com sucesso!",
	},

	tabs: {
		form: "Formulário",
		services: "Atendimentos",
		patients: "Pacientes",
	},

	help: {
		admin:
			"Administradores tem acesso à todas informações do sistema. Terapeutas comuns tem acesso apenas às informações dos seus próprios pacientes e atendimentos.",
		active:
			"Terapeutas inativos não estarão disponíveis para a realização de novas consultas.",
	},
} as const;

export default therapists;
