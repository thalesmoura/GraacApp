/**
 * JAVASCRIPT DAO 1.0
 */




// CRIA AS TABELAS
//=======================
function criarRelacionarTabelasDB(tx) {
	tx.executeSql('CREATE TABLE IF NOT EXISTS CADASTRA_USUARIO(ID_CONTATO INTEGER PRIMARY KEY AUTOINCREMENT, NOME VARCHAR(50) NOT NULL, EMAIL VARCHAR(30), LOGIN VARCHAR(15) NOT NULL, SENHA VARCHAR(10) NOT NULL)');
	tx.executeSql('CREATE TABLE IF NOT EXISTS GRUPOS(ID_GRUPO INTEGER PRIMARY KEY AUTOINCREMENT, DESCRICAO VARCHAR(100) NOT NULL )');
	tx.executeSql('CREATE TABLE IF NOT EXISTS CONTATOS(ID_CONTATO INTEGER PRIMARY KEY AUTOINCREMENT, NOME VARCHAR(50) NOT NULL, EMAIL VARCHAR(30), LOGIN VARCHAR(15) NOT NULL, SENHA VARCHAR(10) NOT NULL, NUMERO_TEL VARCHAR(15) NOT NULL )');
	tx.executeSql('CREATE TABLE IF NOT EXISTS PROJETOS(ID_PROJETO INTEGER PRIMARY KEY AUTOINCREMENT, DESCRICAO VARCHAR(100) NOT NULL, IDGRUPO INTEGER NOT NULL, FOREIGN KEY (IDGRUPO) REFERENCES GRUPOS (ID_GRUPO) )');
	tx.executeSql('CREATE TABLE IF NOT EXISTS TAREFAS(ID_TAREFA INTEGER PRIMARY KEY AUTOINCREMENT, DESCRICAO VARCHAR(100) NOT NULL, OBSERVACAO VARCHAR(200), PRAZO_FINAL TEXT NOT NULL, IDPROJETO INTEGER NOT NULL, FOREIGN KEY (IDPROJETO) REFERENCES PROJETOS (ID_PROJETO) )');
	tx.executeSql('CREATE TABLE IF NOT EXISTS GRUPO_CONTATO(IDGRUPO INTEGER NOT NULL, IDCONTATO INTEGER NOT NULL, PRIMARY KEY (IDGRUPO, IDCONTATO), FOREIGN KEY (IDGRUPO) REFERENCES GRUPO (ID_GRUPO), FOREIGN KEY (IDCONTATO) REFERENCES PROJETOS (ID_CONTATO) )');
	tx.executeSql('CREATE TABLE IF NOT EXISTS SUBTAREFAS(ID_SUBTAREFA INTEGER PRIMARY KEY AUTOINCREMENT, DESCRICAO VARCHAR(100), IDTAREFA NOT NULL, FOREIGN KEY (IDTAREFA) REFERENCES TAREFAS (ID_TAREFA) )');
}




//INSERIR TAREFA DB
//=======================
function inserirTarefaDB(tx) {
	var descricao = new String(document.getElementById('inputDescricao').value);
	var observacao = new String(document.getElementById('inputObservacao').value);
	var prazo = new String(document.getElementById('inputPrazo').value);

	tx.executeSql('INSERT INTO TAREFAS (DESCRICAO, OBSERVACAO, PRAZO_FINAL, IDPROJETO) VALUES ("' + descricao + '", "' + observacao + '", "' + prazo + '", "' + projetoAtualID + '")');
}




//CARREGAR TABELA-TELA TAREFAS DB
//=======================
function carregarTarefDB(tx) {
	tx.executeSql('SELECT ID_TAREFA, DESCRICAO, OBSERVACAO, PRAZO_FINAL, IDPROJETO FROM TAREFAS WHERE IDPROJETO = "' + projetoAtualID + '"', [], carregarTarefSuccess);
}




//EXCLUIR TAREFA DB
//=======================
function excluirTarefaDB(tx) {
	tx.executeSql('DELETE FROM TAREFAS WHERE ID_TAREFA = "' + idTarEx + '"');
}




//BUSCA TAREFA-MODAL DB
//=======================
function buscaTarefaDB(tx) {
	tx.executeSql('SELECT DESCRICAO, OBSERVACAO, PRAZO_FINAL FROM TAREFAS WHERE ID_TAREFA = "' + idTarAlt + '"', [], buscaTarefaSuccess);
}




//ALTERAR TAREFA DB
//=======================
function alterarTarefaDB(tx) {
	var tarefaAltDescricao = new String(document.getElementById('inputAlterarDescricao').value);
	var tarefaAltObservacao = new String(document.getElementById('inputAlterarObservacao').value);
	var tarefaAltPrazo = new String(document.getElementById('inputAlterarPrazo').value);
	
	tx.executeSql('UPDATE TAREFAS SET DESCRICAO = "' + tarefaAltDescricao + '", OBSERVACAO = "' + tarefaAltObservacao + '", PRAZO_FINAL = "' + tarefaAltPrazo + '" WHERE ID_TAREFA = "' + idTarAlt + '";');
	
	atualizar = new String("alterarTarefa");
	atualizarPagina();
}




//INSERIR PROJETO DB
//=======================
function inserirProjetoDB(tx) {
	var descricaoProjeto = new String(document.getElementById('inputProjeto').value);
	tx.executeSql('INSERT INTO PROJETOS (DESCRICAO, IDGRUPO) VALUES ("' + descricaoProjeto + '", "' + id_grupo + '")');
	
	atualizar = new String("adicionarProjeto");
	atualizarPagina();
}




//CARREGAR TABELA-TELA PROJETO DB
//=======================
function carregarPrjDB(tx) {
	tx.executeSql('SELECT PROJETOS.ID_PROJETO AS IDP, PROJETOS.DESCRICAO DESP, PROJETOS.IDGRUPO, GRUPOS.DESCRICAO DESG FROM PROJETOS INNER JOIN GRUPOS ON PROJETOS.IDGRUPO = GRUPOS.ID_GRUPO', [], carregarPrjSuccess);
}




//EXCLUIR PROJETO DB
//=======================
function excluirProjetoDB(tx) {
	tx.executeSql('DELETE FROM PROJETOS WHERE ID_PROJETO="' + idProEx + '"');
	tx.executeSql('DELETE FROM TAREFAS WHERE IDPROJETO="' + idProEx + '"');
}




//BUSCA PROJETO-MODAL DB
//=======================
function buscaProjetoDB(tx) {
	tx.executeSql('SELECT DESCRICAO, IDGRUPO FROM PROJETOS WHERE ID_PROJETO = "'+idProAlt+'"', [], buscaProjetoSuccess);
}




//BUSCA GRUPO-MODAL DB
//=======================
function buscaGrupoDB(tx) {
	tx.executeSql('SELECT DESCRICAO FROM GRUPOS WHERE ID_GRUPO = "' + idGruAlt + '"', [], buscaGrupoSuccess);
}




//ALTERAR PROJETO DB
//=======================
function alterarProjetoDB(tx) {
	var protejoDescricao = new String(document.getElementById('inputAlterarProjeto').value);
	var grupoDescricao = new String(document.getElementById('inputAlterarGrupo').value);
	tx.executeSql('UPDATE PROJETOS SET DESCRICAO = "'+protejoDescricao+'" WHERE ID_PROJETO = "'+idProAlt+'";');
	tx.executeSql('UPDATE GRUPOS SET DESCRICAO = "'+grupoDescricao+'" WHERE ID_GRUPO = "'+idGruAlt+'";');
	atualizar = new String("alterarProjeto");
	atualizarPagina();
}




//INSERIR GRUPO DB
//=======================
function inserirGrupoDB(tx) {
	var descricaoGrupo = new String(document.getElementById('inputGrupo').value);
	tx.executeSql('INSERT INTO GRUPOS (DESCRICAO) VALUES ("'+descricaoGrupo+'")');
	// Retorna o ultimo ID do grupo
	tx.executeSql('select max(id_grupo) as MAX from GRUPOS', [], carregarfSuccess);
}




//EXCLUIR GRUPO DB
//=======================
function excluirGrupoDB(tx) {
	tx.executeSql('DELETE FROM GRUPOS WHERE ID_GRUPO="' + idGruEx + '"');
}




//EXCLUIR GRUPO_CONTATO DB
//=======================
function excluirGrupoContatoDB(tx) {
	tx.executeSql('DELETE FROM GRUPO_CONTATO WHERE IDGRUPO="' + idGruEx + '"');
}




//CARREGAR TABELA-TELA GRUPO DB
//=======================
function carregarGrpDB(tx) {
	tx.executeSql('SELECT GRUPOS.ID_GRUPO AS IDG, GRUPOS.DESCRICAO DESC FROM GRUPOS', [], carregarGrpSuccess);
	//tx.executeSql('SELECT GRUPOS.ID_GRUPO AS IDG, GRUPOS.DESCRICAO DESC, GRUPO_CONTATO.IDCONTATO AS IDGC FROM GRUPOS INNER JOIN GRUPO_CONTATO ON GRUPOS.ID_GRUPO = GRUPO_CONTATO.IDGRUPO group by GRUPOS.ID_GRUPO', [], carregarGrpSuccess);
}




//INSERIR GRUPO_CONTATO DB
//=======================
function inserirGrupo_ContatoDB(tx) {
	var listaMarcados = document.getElementsByTagName("INPUT");
	for (i = 0; i < listaMarcados.length; i++) {
		if (listaMarcados[i].type == "checkbox" && listaMarcados[i].checked) {
			tx.executeSql('INSERT INTO GRUPO_CONTATO (IDGRUPO, IDCONTATO) VALUES ("'+id_grupo+'", "'+listaMarcados[i].value+'")');
		}
	}
}




//SALVAR CONTATO
//=======================
function salvarContato() {
	var myContact = navigator.contacts.create();
	myContact.displayName = document.getElementById('inputContato').value;
	myContact.nickname = document.getElementById('inputContato').value;

	var phoneNumbers = [];
	phoneNumbers[0] = new ContactField('Celular', document.getElementById('inputNumContato').value, true);
	myContact.phoneNumbers = phoneNumbers;

	myContact.save(onSuccess(myContact), onError);
	atualizar = new String("adicionarContato");
	atualizarPagina();
}


//CARREGAR CONTATO
//=======================
function carregarContato() {
	var options = new ContactFindOptions();
	options.filter = "";
	options.multiple = true;
	filter = [ "displayName", "phoneNumbers" ];
	navigator.contacts.find(filter, buscaSuccess, buscaError, options);
}




//EXCLUIR CONTATO
//=======================
function excluirContato() {
	var options = new ContactFindOptions();
	options.filter = "";
	options.multiple = true;
	filter = [ "*" ];
	navigator.contacts.find(filter, excluirSuccess, buscaError, options);
}

//EXCLUIR CONTATO SUCCESS
//=======================
function excluirSuccess(contacts) {
	for (var i = 0; i < contacts.length; i++) {
		if (idConEx == contacts[i].id) {
			contacts[i].remove();
			alert(contacts[i].id);
		}
	}
	atualizar = new String("excluirContato");
	atualizarPagina();
}


//BUSCA CONTATO
//=======================
function buscaContato() {
	var options = new ContactFindOptions();
	options.filter = "";
	options.multiple = true;
	filter = [ "id", "displayName", "phoneNumbers" ];
	navigator.contacts.find(filter, buscaContatoSuccess, buscaError, options);
}


//ALTERAR CONTATO
//=======================
function alterarContato(){ 
	var myContact = navigator.contacts.create();
	myContact.id = idConAlt;
	myContact.remove();
	
	novoContato();
}
//NOVO CONTATO
//=======================
function novoContato() {
	var myContact = navigator.contacts.create();
	myContact.displayName = document.getElementById('inputAlterarContato').value;
	myContact.nickname = document.getElementById('inputAlterarContato').value;

	var phoneNumbers = [];
	phoneNumbers[0] = new ContactField('Celular', document.getElementById('inputAlterarNumContato').value, true);
	myContact.phoneNumbers = phoneNumbers;

	myContact.save(onSuccess(myContact), onError);
	atualizar = new String("adicionarContato");
	atualizarPagina();
}




//CADASTRAR USUARIO DB
//=======================
function cadastrarUsuarioDB(tx) {
	var nomeUsuario = new String(document.getElementById('inputNomeUsuario').value);
	var email = new String(document.getElementById('inputEmail').value);
	var login = new String(document.getElementById('inputLoginCadastro').value);
	var senha = new String(document.getElementById('inputSenhaCadastro').value);
	
	tx.executeSql('INSERT INTO CADASTRA_USUARIO (NOME, EMAIL, LOGIN, SENHA) VALUES ("'+nomeUsuario+'", "'+email+'", "'+login+'", "'+senha+'")');
}




/**
 * JAVASCRIPT DAO END
 */