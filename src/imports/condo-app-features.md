1. Tela de Entrada (Pública)
Login Múltiplo: Um formulário limpo pedindo CPF e Senha.

Dica de UI: O sistema precisa redirecionar o usuário para o Dashboard correto dependendo do JWT dele (se for Morador, vai pra um lado; se for Porteiro, vai pra outro). Tem que ter um alerta visual (Toast/Modal) caso ele erre a senha ou caso tome o bloqueio do Rate Limit.

2. Dashboard do Morador (App Mobile ou Web Simples)
Esse é o painel de quem mora no condomínio. Precisa ser fácil e intuitivo.

Meus Chamados (Service Request): * Um botão "Abrir Novo Chamado" (pede descrição e tipo do problema).

Uma lista/tabela mostrando os chamados dele com tags coloridas para o status: PENDENTE (Amarelo), EM PROGRESSO (Azul), CONCLUÍDO (Verde).

Reservas de Lazer (Scheduling):

Um calendário para escolher o dia e campos de hora inicial/final.

Precisa listar as áreas disponíveis (Salão de Festas, Quadra) e travar/avisar visualmente se o horário estiver fora de funcionamento ou se já tiver batido a capacidade máxima.

Meus Visitantes:

Tela para ele pré-cadastrar um visitante (Visitor) para agilizar na portaria.

3. Dashboard da Portaria (Gate Employee)
Essa tela tem que ser focada em velocidade, porque o porteiro atende gente o dia todo.

Controle de Acesso (Access Control):

Formulário rápido pedindo o CPF da pessoa que chegou.

Dois botões grandes de Entrada: "Entrada Visita" (GUEST) e "Entrada Serviço" (SERVICE_PROVIDER).

Painel de Ativos (Gente no Prédio):

Uma tabela mostrando todo mundo que está com o status OPEN no momento.

Um botão "Registrar Saída" do lado de cada nome (que muda o status pra CLOSED).

4. Dashboard da Manutenção/Zeladoria (Leisure/Maintenance Employee)
Fila de Serviços (Kanban de Service Request):

Uma tela estilo Trello. Três colunas: "Pendentes", "Fazendo", "Concluídos".

O funcionário puxa o card do chamado do morador para a coluna "Fazendo" (que bate na sua rota PUT /services/:id atualizando pra IN_PROGRESS) e depois para "Concluídos".

5. Dashboard da Administração (Management Employee / Síndico)
Essa é a tela mais complexa, estilo painel de controle (Admin Panel).

Gestão de Lotes e Moradores:

Tabela listando todos os lotes (ex: Apto 101, 102).

Botões de ação para: "Vincular Morador", "Remover Morador" e uma coroa/ícone para "Definir como Titular Responsável".

Auditoria de Lotes (Lot Historic):

Clicando em um lote, abre um histórico (Timeline) mostrando tudo que aconteceu ali (ex: "Dia 05: Caio (Gestão) adicionou Cris (Morador) ao Lote 101").

Painel de Funcionários e Áreas:

Telas de CRUD padrão para o síndico cadastrar novos porteiros, zeladores e novas áreas de lazer do condomínio.