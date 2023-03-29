# DinDin - Front End
A aplicação possui três páginas onde os componentes são dispostos para interação do usuário.

- Login
- Signup
- Main

### Login
 ---
Na página de login o usuário é requisitado a inserir seu e-mail e senha cadastrados, caso ocorra algum erro na validação uma mensagem de erro é mostrada. Caso o login seja bem sucedido o usuário será redirecionado pra página principal (Main). Caso o usuário ainda não seja cadastrado o mesmo poderá acessar um link que o direcionará para página de cadastro (Signup).
### Signup
---
Nessa página o usuário deve inserir suas informações de cadastro, nome, email, senha e confirmação de senha. Caso aconteça algum erro na validação será mostrada uma mensagem com o erro. Se a validação for bem sucedida o usuário será redirecionado para a tela de login.
### Main
---
Na página principal existem diversos componentes.

O primeiro deles é a tabela principal que lista as transações registradas pelo usuário, essa tabela pode ser filtrada de acordo com categorias e reordenada de acordo com a data dos registros.

Cada um dos registros da tabela mostra a data, o dia da semana, uma breve descrição, a categoria e o valor. Também mostra dois ícones um para abrir o modal em modo de edição e um para deletar o registro.

O resumo mostra o quadro geral do balanço das transações do usuário, mostrando o total de entradas e o total de saídas e o saldo resultante.

O botão de adicionar registro abre o modal em modo de novo registro.

O modal, de registros possui dois botões no topo que indicam o tipo de transação, sáida ou entrada de valor. Abaixo o primeiro `input` é referente ao valor da transação, em seguida existe uma lista de categorias para ser definida para a transação, em seguida o campo para inserção da data, no último campo fica definida uma breve descrição da transação, e por fim um botão para confirmar a inserção ou edição do registro.

O modal de registros pode ser aberto em dois modos, no modo de edição ele recebe as informações do registro escolhido e preenche automaticamente todos os campos, no modo de adição o modal é aberto vazio com apenas o botão de saída selecionado.

Acima da tabela temos o botão para abrir a caixa de filtros, mais de um filtro pode ser selecionado, após selecionados o usuário pode aplicar os filtros e a tabela filtra as informações. Existe um botão para limpar os filtros que remove todos os filtros selecionados e voltar a mostrar as informações não filtradas na tabela principal.

No canto superior direito encontram-se o ícone do usuário que abre um modal para edição de informações de cadastro, o nome do usuário e por fim um botão de sair que limpa o local storage do bearer token e finaliza a sessão logada do usuário.