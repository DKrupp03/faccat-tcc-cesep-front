# Segurança & LGPD — Front-end

Postura de segurança da SPA React do sistema de gestão do Centro de Serviços em Psicologia da FACCAT (CESEP). O front-end é apenas o cliente: a autenticação, a autorização e o tratamento dos **dados sensíveis de saúde** acontecem na API.

> A API que serve este front-end tem o seu próprio [SECURITY.md](https://github.com/DKrupp03/faccat-tcc-cesep-api), com os detalhes de autenticação, autorização e LGPD do lado do servidor.

## Autenticação no cliente
- O login devolve um **JWT**, enviado em todas as requisições no header `Authorization: Bearer`.
- O logout descarta o token localmente; a invalidação efetiva é feita pela API.
- **Rotas protegidas:** sem token válido, o usuário é redirecionado para o login.

## Armazenamento do token (decisão arquitetural)
- Hoje o JWT é guardado em `localStorage`. É simples e funciona com o fluxo `Authorization: Bearer`, mas fica **exposto a XSS**.
- **Mitigações atuais:**
  - React escapa o output por padrão;
  - não se usa injeção de HTML bruto;
  - o conteúdo renderizado vem da API, com CORS restrito no servidor.
- **Evolução recomendada (fase 2):** migrar para cookie `httpOnly` + `Secure` + `SameSite`, com proteção CSRF. É uma mudança maior (afeta o fluxo de login e o envio do token) e está fora do escopo atual.

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
