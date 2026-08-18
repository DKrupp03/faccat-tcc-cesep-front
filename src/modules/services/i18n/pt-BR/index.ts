const services = {
	headerCards: {
		total: "Total de atendimentos",
		filtered: "Atendimentos filtrados",
	},

	actions: {
		create: "Criar atendimento",
		created: "Atendimento criado com sucesso!",
		edit: "Editar atendimento",
		updated: "Atendimento atualizado com sucesso!",
		filtrate: "Filtrar atendimentos",
		delete: "Excluir atendimento",
		"delete.confirmation":
			"Tem certeza que deseja excluir este atendimento?</br>Ao continuar, <b>serão excluídos o prontuário e o pagamento</b> associados à ele!",
		deleted: "Atendimento excluído com sucesso!",
	},

	tabs: {
		form: "Formulário",
		payment: "Pagamento",
		medicalRecord: "Prontuário",
	},

	columns: {
		patient: "Paciente",
		therapist: "Terapeuta",
		serviceType: "Tipo de atendimento",
		status: "Status",
		date: "Data",
		startTime: "Hora de início",
		endTime: "Hora de fim",
		observations: "Observações",
	},

	form: {
		datesTimes: "Datas/horários",
	},

	errors: {
		endTimeBeforeStart: "Deve ser posterior à hora de início.",
		endDateBeforeStart: "Deve ser igual ou posterior à data de início.",
	},

	recurrence: {
		title: "Recorrência",
		frequency: "Frequência",
		every: "A cada",
		day: "Dia",
		end: "Fim",
		endByDate: "Por data",
		endByOccurrences: "Por ocorrência",
		endDate: "Data fim",
		occurrences: "Ocorrências",
		locked:
			"O padrão de recorrência não pode ser alterado após a criação da série.",

		frequencies: {
			daily: "Diário",
			weekly: "Semanal",
			monthly: "Mensal",
		},

		units: {
			daily: "Dias",
			weekly: "Semanas",
			monthly: "Meses",
		},

		weekdays: {
			"0": "Domingo",
			"1": "Segunda-feira",
			"2": "Terça-feira",
			"3": "Quarta-feira",
			"4": "Quinta-feira",
			"5": "Sexta-feira",
			"6": "Sábado",
		},

		summary: {
			daily_one: "Repete todos os dias",
			daily_other: "Repete a cada {{count}} dias",
			weekly_one: "Repete toda semana",
			weekly_other: "Repete a cada {{count}} semanas",
			monthly_one: "Repete todo mês",
			monthly_other: "Repete a cada {{count}} meses",
			onWeekday: "no(a) {{weekday}}",
			onMonthDay: "no dia {{day}}",
			start: "com início no dia {{date}}",
			endDate: "e fim no dia {{date}}",
			endOccurrences_one: "por {{count}} ocorrência",
			endOccurrences_other: "por {{count}} ocorrências",
		},

		scope: {
			title: "Atendimento recorrente",
			editDescription:
				"Este atendimento faz parte de uma série. Onde deseja aplicar as alterações?",
			deleteDescription:
				"Este atendimento faz parte de uma série. Quais atendimentos deseja excluir?</br>Ao continuar, <b>serão excluídos os prontuários e os pagamentos</b> associados a eles!",
			single: "Somente este",
			future: "Este e os futuros",
			all: "Todos",
		},
	},

	filter: {
		dateStart: "Data inicial",
		dateEnd: "Data final",
	},

	view: {
		panel: "Painel",
		calendar: "Calendário",
		list: "Lista",
	},

	calendar: {
		previousMonth: "Mês anterior",
		nextMonth: "Próximo mês",
		today: "Hoje",
	},

	order: {
		dateDesc: "Data (mais recente)",
		dateAsc: "Data (mais antigo)",
	},

	status: {
		scheduled: "Agendado",
		confirmed: "Confirmado",
		attended: "Atendido",
		no_show: "Faltou",
		cancelled: "Cancelado",
	},

	serviceTypes: {
		clinical_psychology_tcc: "Psicologia Clínica – TCC",
		clinical_psychology_psychoanalysis: "Psicologia Clínica – Psicanálise",
		clinical_psychology_systemic: "Psicologia Clínica – Sistêmica",
		clinical_psychology_humanistic: "Psicologia Clínica – Humanista",
		psychological_emergency_care: "Plantão Psicológico",
		school_psychology: "Psicologia Escolar",
		forensic_psychology: "Psicologia Jurídica",
		community_psychology: "Psicologia Comunitária",
		emergency_and_disaster_psychology: "Psicologia de Emergências e Desastres",
		organizational_psychology_career_guidance:
			"Psicologia Organizacional – Orientação de Carreira",
		organizational_psychology_worker_health:
			"Psicologia Organizacional – Saúde do Trabalhador",
	},
} as const;

export default services;
