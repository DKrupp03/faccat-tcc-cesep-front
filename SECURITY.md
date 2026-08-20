# Segurança & LGPD — Front-end

Postura de segurança da SPA React do sistema de gestão do Centro de Serviços em Psicologia da FACCAT (CESEP). O front-end é apenas o cliente: a autenticação, a autorização e o tratamento dos **dados sensíveis de saúde** acontecem na API.

> A API que serve este front-end tem o seu próprio [SECURITY.md](https://github.com/DKrupp03/faccat-tcc-cesep-api), com os detalhes de autenticação, autorização e LGPD do lado do servidor.

## Autenticação no cliente
- O login estabelece uma sessão via **JWT em cookie `HttpOnly`**, gerenciado pela API. O cookie é enviado automaticamente pelo browser (axios com `withCredentials`); o front **não** manipula nem armazena o token.
- A sessão é reidratada no carregamento por `GET /me` (o front não guarda dados de auth localmente).
- O logout chama a API, que revoga o token e expira o cookie; o estado local é limpo.
- **Rotas protegidas:** sem sessão válida, o usuário é redirecionado para o login.

## Armazenamento do token (decisão arquitetural)
- O JWT fica em cookie **`HttpOnly` + `Secure` (produção) + `SameSite`**, portanto **inacessível ao JavaScript** — o vetor de roubo de token via XSS está mitigado. Nada de token ou PII de usuário é guardado em `localStorage`.
- **Proteção CSRF:** como o cookie é enviado automaticamente, requisições mutantes usam o padrão *double-submit* — o axios ecoa o cookie `XSRF-TOKEN` no header `X-XSRF-TOKEN`, que a API valida.
- **Defesa em profundidade contra XSS:** React escapa o output por padrão; não se usa injeção de HTML bruto; o conteúdo renderizado vem da API, com CORS restrito no servidor.

## Boas práticas adotadas
- **Sem segredos no bundle:** apenas variáveis não sensíveis (como a URL da API) são embutidas no build. O `.env` fica fora do git; apenas `.env.example` é versionado.
- **Validação no servidor:** as validações de formulário no cliente são apenas de UX; a API é a fonte de verdade e revalida todos os dados.
- **Controle de acesso é do servidor:** a interface se adapta ao papel do usuário (admin/terapeuta/paciente), mas a autorização real é aplicada pela API — esconder um botão não substitui a checagem no back-end.
- **Dependências:** manter os pacotes atualizados e rodar `npm audit` periodicamente para CVEs conhecidas.

## LGPD — dados sensíveis de saúde
- O front exibe **dados sensíveis** (prontuários, anamnese). Evite registrá-los em logs do navegador ou enviá-los a serviços de terceiros (analytics, monitoramento de erros) sem anonimização.
- Não persista dados de paciente fora do necessário para a sessão; o que precisa ser mantido é buscado da API.

## Reporte de vulnerabilidades
Por se tratar de um projeto acadêmico (TCC), não há um canal formal de divulgação. Vulnerabilidades podem ser comunicadas em particular ao autor pelo repositório. Por favor, **não** abra issues públicas com detalhes que exponham dados ou facilitem exploração.
