/**
 * ---- JAVASCRIPT VERSAO 1.2.8
 * CARREGAR OS NOMES DOS INTEGRANTES DOS GRUPOS NO MODAL DE INCLUIR PROJETO
 * Validar campos - (contatos selecionados no alterar projeto)
 * VALIDAÇÃO DE PROJETO/GRUPO - REVER
 * Abrir as tarefas do projeto
 * Cadastrar Usuário 
 * Validação Tela de login 
 * ALTERAÇÃO DE DADOS DO Usuário
 * NOTIFICAÇÕES
 * 
 * --Parte WEB-- 
 * ConexÃ£o 
 * Upload de arquivo 
 * Armazenamento em nÃºvem 
 * SicronizaÃ§Ã£o em nÃºvem
 */



document.addEventListener("deviceready", onDeviceReady, false);

var projetoAtualID = '1';
var atualizar;

//Id para manipular o excluir, editar e etc.



// ON DEVICE READY
//=======================
function onDeviceReady() {
	criarRelacionarTabelas();
	carregarTarefas();
	carregarProjetos();
	carregarContato();
	carregarGrupos();
}



// ATUALIZAR PAGINA
//=======================
function atualizarPagina() {
	$(document).ready(
			function() {

				if (atualizar == "cadastrarUsuario") {
					var url = "index.html";
					$(window.document.location).attr('href', url);
				} else if (atualizar == "adicionarContato"
						|| atualizar == "alterarContato"
						|| atualizar == "excluirContato") {
					var url = "telaContato.html";
					$(window.document.location).attr('href', url);
				} else if (atualizar == "adicionarProjeto"
						|| atualizar == "alterarProjeto"
						|| atualizar == "excluirProjeto"
						|| atualizar == "excluirGrupo") {
					var url = "telaProjeto.html";
					$(window.document.location).attr('href', url);
				} else if (atualizar == "inserirTarefa"
						|| atualizar == "alterarTarefa"
						|| atualizar == "excluirTarefa") {
					var url = "telaTarefa.html";
					$(window.document.location).attr('href', url);
				}

				/*
				 * $("#salvarContato").click(function(){
				 * alert('AAsalvarContato'); var url = "telaContato.html";
				 * $(window.document.location).attr('href',url); });
				 */
			});
}

//RELACIONAR AS TABELAS
//=======================
function criarRelacionarTabelas() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(criarRelacionarTabelasDB);
}
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



// LOGAR
// =======================
function logar() {
	window.location.href = 'telaTarefa.html';
}



// CARREGA AS TAREFAS DO PROJETO SELECIONADO NO CLICK, implementar corretamente
//=======================
function clickProjeto(id) {
	
	window.location.href = 'telaTarefa.html';
	
	projetoAtualID = id;
}



// ***VALIDAR TAREFA
// =======================
function validarTarefa() {
	var descricao = new String(document.getElementById('inputDescricao').value);
	//var observacao = new String(document.getElementById('inputObservacao').value);
	var prazo = new String(document.getElementById('inputPrazo').value);
	
	if (descricao == "" || prazo == "") {
		if (descricao == "") {
			document.getElementById("inputDescricao").focus();
		}
		else if (prazo == "") {
			document.getElementById("inputPrazo").focus();
		}
		campoObrigatorio();
	} else {
		inserirTarefa();
		
		atualizar = new String("inserirTarefa");
		atualizarPagina();
	}
}
// ***INSERT TAREFA
// =======================
function inserirTarefa() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(inserirTarefaDB, errorCB, successCB());
}
//INSERIR TAREFA DB
function inserirTarefaDB(tx) {
	var descricao = new String(document.getElementById('inputDescricao').value);
	var observacao = new String(document.getElementById('inputObservacao').value);
	var prazo = new String(document.getElementById('inputPrazo').value);

	tx.executeSql('INSERT INTO TAREFAS (DESCRICAO, OBSERVACAO, PRAZO_FINAL, IDPROJETO) VALUES ("' + descricao + '", "' + observacao + '", "' + prazo + '", "' + projetoAtualID + '")');
}
// CARREGA TABELA-TELA TAREFAS
// =======================
function carregarTarefas() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(carregarTarefDB);
}
// CARREGAR TABELA-TELA TAREFAS DB
//=======================
function carregarTarefDB(tx) {
	tx.executeSql('SELECT ID_TAREFA, DESCRICAO, OBSERVACAO, PRAZO_FINAL, IDPROJETO FROM TAREFAS WHERE IDPROJETO = "' + projetoAtualID + '"', [], carregarTarefSuccess);
}
// CARREGAR TABELA-TELA TAREFAS SUCESS
//=======================
function carregarTarefSuccess(tx, results) {
	var len = results.rows.length;
	if (len > 0) {
		for (var i = 0; i < len; i++) {
			$("#tabelaTarefas tbody").append("<tr><td><button type='button' class='btn btn-primary btn-xs' onclick='checkTarefa'><span class='glyphicon glyphicon-ok'></span></button></td>"
									+ "<td>" + results.rows.item(i).DESCRICAO + "</td>"
									+ "<td>" + results.rows.item(i).PRAZO_FINAL + "</td>"
									+ "<td>" + results.rows.item(i).ID_TAREFA + "</td>"
									+ "<td>" + results.rows.item(i).IDPROJETO + "</td>"
									+ "<td><div class='btn-group'>"
									+ "<button type='button' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#modalAlterarTarefa' id='"
									+ results.rows.item(i).ID_TAREFA
									+ "' onclick='preencheAlterarT(this.id)'><span class='glyphicon glyphicon-edit'></span></button>"
									+ "<button type='button' class='btn btn-danger btn-xs' id='"
									+ results.rows.item(i).ID_TAREFA
									+ "' onclick='confirmaExcluirTarefa(this.id)'><span class='glyphicon glyphicon-trash'></span></button></div></td></tr>");
		}
	}
}



// CONFIRMA EXCLUIR TAREFA
//=======================
var idTarEx = '';
function confirmaExcluirTarefa(idT) {
	idTarEx = idT;
	if (confirm('Tem certeza que deixa excluir?')) {
		excluirTarefa();
		atualizar = new String("excluirTarefa");
		atualizarPagina();
	}
}
// EXCLUIR TAREFA
//=======================
function excluirTarefa() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(excluirTarefaDB, errorCB, deleteCB);
}
// EXCLUIR TAREFA DB
//=======================
function excluirTarefaDB(tx) {
	tx.executeSql('DELETE FROM TAREFAS WHERE ID_TAREFA = "' + idTarEx + '"');
}



// PREENCHER ALTERAR TAREFA-MODAL
//=======================
var idTarAlt = '';
function preencheAlterarT(idAltT) {
	idTarAlt = idAltT;
	buscaTarefa();
}
// BUSCA TAREFA-MODAL
//=======================
function buscaTarefa() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(buscaTarefaDB);
}
// BUSCA TAREFA-MODAL DB
//=======================
function buscaTarefaDB(tx) {
	tx.executeSql('SELECT DESCRICAO, OBSERVACAO, PRAZO_FINAL FROM TAREFAS WHERE ID_TAREFA = "' + idTarAlt + '"', [], buscaTarefaSuccess);
}
// BUSCA TAREFA-MODAL SUCESS
//=======================
function buscaTarefaSuccess(tx, results) {
	var len = results.rows.length;
	if (len > 0) {
		for (var i = 0; i < len; i++) {
			document.getElementById("inputAlterarDescricao").value = results.rows.item(i).DESCRICAO;
			document.getElementById("inputAlterarObservacao").value = results.rows.item(i).OBSERVACAO;
			document.getElementById("inputAlterarPrazo").value = results.rows.item(i).PRAZO_FINAL;
		}
	}
}



// VALIDAR ALTERAR TAREFA
// =======================
function validarAlterarTarefa() {
	var altDescricao = new String(document.getElementById('inputAlterarDescricao').value);
	var altPrazo = new String(document.getElementById('inputAlterarPrazo').value);
	atualizar = new String("alterarTarefa");

	if (altDescricao == "" || altPrazo == "") {
		if (altDescricao == "") {
			document.getElementById("inputAlterarDescricao").focus();
		}
		else if (altPrazo == "") {
			document.getElementById("inputAlterarPrazo").focus();
		}
		campoObrigatorio();
	} else {
		alterarTarefa();
	}
}
// ALTERAR TAREFA
// =======================
function alterarTarefa() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(alterarTarefaDB, errorCB, updateCB);
}
// ALTERAR TAREFA DB
//=======================
function alterarTarefaDB(tx) {
	var tarefaAltDescricao = new String(document.getElementById('inputAlterarDescricao').value);
	var tarefaAltObservacao = new String(document.getElementById('inputAlterarObservacao').value);
	var tarefaAltPrazo = new String(document.getElementById('inputAlterarPrazo').value);
	
	tx.executeSql('UPDATE TAREFAS SET DESCRICAO = "' + tarefaAltDescricao + '", OBSERVACAO = "' + tarefaAltObservacao + '", PRAZO_FINAL = "' + tarefaAltPrazo + '" WHERE ID_TAREFA = "' + idTarAlt + '";');
	
	atualizar = new String("alterarTarefa");
	atualizarPagina();
}




// VALIDAR PROJETO
// =======================
function validarProjeto() {
	var descricaoProjeto = new String(document.getElementById('inputProjeto').value);
	var grupoNome = new String(document.getElementById('inputGrupo').value);

	if (descricaoProjeto == "" || grupoNome == "") {
		if (descricaoProjeto == "") {
			document.getElementById("inputProjeto").focus();
		}
		else if (grupoNome == "") {
			document.getElementById("inputGrupo").focus();
		}
		campoObrigatorio();
	} else {
		inserirProjeto();
	}
}
// INSERIR PROJETO
// =======================
function inserirProjeto() {
	inserirGrupo();
	
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);	
	db.transaction(inserirProjetoDB, errorCB, successPrjCB);
}
// INSERIR PROJETO DB
//=======================
function inserirProjetoDB(tx) {
	var descricaoProjeto = new String(document.getElementById('inputProjeto').value);
	tx.executeSql('INSERT INTO PROJETOS (DESCRICAO, IDGRUPO) VALUES ("' + descricaoProjeto + '", "' + id_grupo + '")');
	
	atualizar = new String("adicionarProjeto");
	atualizarPagina();
}
// CARREGAR TABELA-TELA PROJETO
// =======================
function carregarProjetos() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(carregarPrjDB);
}
// CARREGAR TABELA-TELA PROJETO DB
//=======================
function carregarPrjDB(tx) {
	tx.executeSql('SELECT PROJETOS.ID_PROJETO AS IDP, PROJETOS.DESCRICAO DESP, PROJETOS.IDGRUPO, GRUPOS.DESCRICAO DESG FROM PROJETOS INNER JOIN GRUPOS ON PROJETOS.IDGRUPO = GRUPOS.ID_GRUPO', [], carregarPrjSuccess);
}
// CARREGAR TABELA-TELA PROJETO SUCESS
//=======================
function carregarPrjSuccess(tx, results) {
	var len = results.rows.length;
	if (len > 0) {
		for (var i = 0; i < len; i++) {
			$("#tabelaProjetos tbody").append("<tr>"
									+ "<td><button type='button' class='btn btn-primary btn-xs' id='"
									+results.rows.item(i).IDP+"' onclick='clickProjeto(this.id)'><span class='glyphicon glyphicon-pencil'></span></button></td>"
									+ "<td>" + results.rows.item(i).DESP + "</td>"
									+ "<td>" + results.rows.item(i).DESG + "</td>"
									+ "<td><div class='btn-group'><button type='button' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#modalAlterarProjeto' id='"
									+ results.rows.item(i).IDP
									+ "' onclick='preencheAlterarP(this.id)'><span class='glyphicon glyphicon-edit'>"
									+ "<button type='button' class='btn btn-danger btn-xs' id='"
									+ results.rows.item(i).IDP
									+ "' onclick='confirmaExcluirProjeto(this.id)'><span class='glyphicon glyphicon-trash'></span></button></div></td></tr>");
		}
	}
}



// CONFIRMA EXCLUIR PROJETO
// =======================
var idProEx = '';
function confirmaExcluirProjeto(idP) {
	idProEx = idP;
	if (confirm('Tem certeza que deixa excluir?')) {
		excluirProjeto();
		
		atualizar = new String("excluirProjeto");
		atualizarPagina();
	}
}
// EXCLUIR PROJETO
//=======================
function excluirProjeto() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(excluirProjetoDB, errorCB, deleteCB);
}
// EXCLUIR PROJETO DB
//=======================
function excluirProjetoDB(tx) {
	tx.executeSql('DELETE FROM PROJETOS WHERE ID_PROJETO="' + idProEx + '"');
	tx.executeSql('DELETE FROM TAREFAS WHERE IDPROJETO="' + idProEx + '"');
}



// PREENCHER ALTERAR PROJETO-MODAL
//=======================
var idProAlt = '';
var idGruAlt = '';
function preencheAlterarP(idAltP) {
	idProAlt = idAltP;
	buscaProjeto();
	buscaGrupo();
}
// BUSCA PROJETO-MODAL
//=======================
function buscaProjeto() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(buscaProjetoDB);
}
// BUSCA PROJETO-MODAL DB
//=======================
function buscaProjetoDB(tx) {
	tx.executeSql('SELECT DESCRICAO, IDGRUPO FROM PROJETOS WHERE ID_PROJETO = "'+idProAlt+'"', [], buscaProjetoSuccess);
}
// BUSCA PROJETO-MODAL SUCESS
//=======================
function buscaProjetoSuccess(tx, results) {
	var len = results.rows.length;
	if (len > 0) {
		for (var i = 0; i < len; i++) {
			document.getElementById("inputAlterarProjeto").value = results.rows.item(i).DESCRICAO;
			idGruAlt = results.rows.item(i).IDGRUPO;
		}
	}
}
// BUSCA GRUPO-MODAL
//=======================
function buscaGrupo() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(buscaGrupoDB);
}
// BUSCA GRUPO-MODAL DB
//=======================
function buscaGrupoDB(tx) {
	tx.executeSql('SELECT DESCRICAO FROM GRUPOS WHERE ID_GRUPO = "' + idGruAlt + '"', [], buscaGrupoSuccess);
}
//BUSCA GRUPO-MODAL SUCESS
//=======================
function buscaGrupoSuccess(tx, results) {
	var len = results.rows.length;
	if (len > 0) {
		for (var i = 0; i < len; i++) {
			document.getElementById("inputAlterarGrupo").value = results.rows.item(i).DESCRICAO;
		}
	}
}



// VALIDAR ALTERAR PROJETO
// =======================
function validarAlterarProjeto() {
	var altProjeto = new String(document.getElementById('inputAlterarProjeto').value);
	var altGrupo = new String(document.getElementById('inputAlterarGrupo').value);
	atualizar = new String("alterarProjeto");
	if (altProjeto == "" || altGrupo == "") {
		if (altProjeto == "") {
			document.getElementById("inputAlterarProjeto").focus();
		}
		else if (altGrupo == "") {
			document.getElementById("inputAlterarGrupo").focus();
		}
		campoObrigatorio();
	} else {
		alterarProjeto();
	}
}
// ALTERAR PROJETO
// =======================
function alterarProjeto() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(alterarProjetoDB, errorCB, updateCB);
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



// INSERIR GRUPO
// =======================
var id_grupo;
function inserirGrupo() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(inserirGrupoDB, errorCB, successGrpCB);
	inserirGrupo_Contato();
}
//INSERIR GRUPO DB
//=======================
function inserirGrupoDB(tx) {
	var descricaoGrupo = new String(document.getElementById('inputGrupo').value);
	tx.executeSql('INSERT INTO GRUPOS (DESCRICAO) VALUES ("'+descricaoGrupo+'")');
	// Retorna o ultimo ID do grupo
	tx.executeSql('select max(id_grupo) as MAX from GRUPOS', [], carregarfSuccess);
}
// CARREGAR GRUPO MAX ID
//=======================
function carregarfSuccess(tx, result) {
	id_grupo = result.rows.item(0).MAX;
}



// CONFIRMA EXCLUIR GRUPO
// =======================
var idGruEx = '';
function confirmaExcluirGrupo(idG) {
	idGruEx = idG;
	if (confirm('Tem certeza que deixa excluir?')) {
		excluirGrupo();
		excluirGrupoContato();
		atualizar = new String("excluirGrupo");
		atualizarPagina();
	}
}
// EXCLUIR GRUPO
//=======================
function excluirGrupo() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(excluirGrupoDB, errorCB, deleteCB);
}
//EXCLUIR GRUPO DB
//=======================
function excluirGrupoDB(tx) {
	tx.executeSql('DELETE FROM GRUPOS WHERE ID_GRUPO="' + idGruEx + '"');
}
//EXCLUIR GRUPO_CONTATO
//=======================
function excluirGrupoContato() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(excluirGrupoContatoDB, errorCB, deleteCB);
}
//EXCLUIR GRUPO_CONTATO DB
//=======================
function excluirGrupoContatoDB(tx) {
	tx.executeSql('DELETE FROM GRUPO_CONTATO WHERE IDGRUPO="' + idGruEx + '"');
}



// CARREGAR TABELA-TELA GRUPO
// =======================
function carregarGrupos() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(carregarGrpDB);
}
//CARREGAR TABELA-TELA GRUPO DB
//=======================
function carregarGrpDB(tx) {
	tx.executeSql('SELECT GRUPOS.ID_GRUPO AS IDG, GRUPOS.DESCRICAO DESC FROM GRUPOS', [], carregarGrpSuccess);
	//tx.executeSql('SELECT GRUPOS.ID_GRUPO AS IDG, GRUPOS.DESCRICAO DESC, GRUPO_CONTATO.IDCONTATO AS IDGC FROM GRUPOS INNER JOIN GRUPO_CONTATO ON GRUPOS.ID_GRUPO = GRUPO_CONTATO.IDGRUPO group by GRUPOS.ID_GRUPO', [], carregarGrpSuccess);
}
//CARREGAR TABELA-TELA GRUPO SUCESS
//=======================
function carregarGrpSuccess(tx, results) {
	var len = results.rows.length;		
	if (len > 0) {
		for (var i = 0; i < len; i++) {
			$("#tabelaGrupos tbody").append("<tr><td><input type='checkbox' value='"+results.rows.item(i).IDG+"'></td>"
									+ "<td>"+results.rows.item(i).DESC+"</td>"
									+ "<td></td>"
									+ "<td>G-ID " +results.rows.item(i).IDG+"</td>"
									+ "<td><button type='button' class='btn btn-danger btn-xs' id='"+results.rows.item(i).IDG+"'onclick='confirmaExcluirGrupo(this.id)'>"
									+ "<span class='glyphicon glyphicon-trash'></span></button></td></tr>");
		}
	}
}



// INSERIR GRUPO_CONTATO
// =======================
function inserirGrupo_Contato() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(inserirGrupo_ContatoDB, errorCB, successGrpContCB);
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



// VALIDAR CONTATO
// =======================
function validarContato() {
	nomeContato = document.getElementById('inputContato').value;
	numeroContato = document.getElementById('inputNumContato').value;

	if (nomeContato == "" || numeroContato == "") {
		if (nomeContato == "") {
			document.getElementById("inputContato").focus();
		}
		else if (numeroContato == "") {
			document.getElementById("inputNumContato").focus();
		}
		campoObrigatorio();
	} else {
		salvarContato();
	}
}
// SALVAR CONTATO
// =======================
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



// BUSCAR CONTATO
// =======================
function carregarContato() {
	var options = new ContactFindOptions();
	options.filter = "";
	options.multiple = true;
	filter = [ "displayName", "phoneNumbers" ];
	navigator.contacts.find(filter, buscaSuccess, buscaError, options);
}
//BUSCAR CONTATO SUCESS
//=======================
function buscaSuccess(contacts) {
	for (var i = 0; i < contacts.length; i++) {
		var contactNumber = '';
		if (contacts[i].phoneNumbers != null)
			{
				contactNumber = contacts[i].phoneNumbers[0].value;
	
				$("#tabelaContatos tbody").append("<tr><td>"+contacts[i].displayName+"</td>"
										+ "<td>"+contactNumber+"</td>"
										+ "<td><div class='btn-group'>" 
										+ "<button type='button' class='btn btn-primary btn-xs' data-toggle='modal' data-target='#modalAlterarContato' id='"+contacts[i].id+"' onclick='preencheAlterarC(this.id)'><span class='glyphicon glyphicon-edit'>"
										+ "<button type='button' class='btn btn-danger btn-xs' id='"+contacts[i].id+"' onclick='confirmaExcluirContato(this.id)'><span class='glyphicon glyphicon-trash'></span></button></div></td></tr>");
				$("#tabelaContatos2 tbody").append("<tr><td><input type='checkbox' value="+contacts[i].id+"></td>" 
						+ "<td>"+contacts[i].displayName+"</td><td>"+contactNumber+"</td><td>");
				$("#tabelaContatos3 tbody").append("<tr><td><input type='checkbox' value="+contacts[i].id+"></td>" 
						+ "<td>"+contacts[i].displayName+"</td><td>"+contactNumber+"</td><td>");
			}
	}
}



//CONFIRMA EXCLUIR GRUPO
//=======================
var idConEx = '';
function confirmaExcluirContato(idC) {
	idConEx = idC;
	if (confirm('Tem certeza que deixa excluir?')) {
		excluirContato();
	}
}
// EXCLUIR CONTATO
// =======================
function excluirContato() {
	var options = new ContactFindOptions();
	options.filter = "";
	options.multiple = true;
	filter = [ "*" ];
	navigator.contacts.find(filter, excluirSuccess, buscaError, options);
}
//EXCLUIR CONTATO SUCCESS
//=======================
var idConAlt = '';
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



// PREENCHER ALTERAR CONTATO-MODAL
//=======================
function preencheAlterarC(idAltC) {
	idConAlt = idAltC;
	buscaContato();
}
// BUSCA CONTATO
//=======================
function buscaContato() {
	var options = new ContactFindOptions();
	options.filter = "";
	options.multiple = true;
	filter = [ "id", "displayName", "phoneNumbers" ];
	navigator.contacts.find(filter, buscaContatoSuccess, buscaError, options);
}
//BUSCA CONTATO SUCCESS
//=======================
function buscaContatoSuccess(contacts) {
	for (var i = 0; i < contacts.length; i++) {
		if (idConAlt == contacts[i].id) {
			var contactNumber = '';
			if (contacts[i].phoneNumbers != null)
				contactNumber = contacts[i].phoneNumbers[0].value;
			
			document.getElementById("inputAlterarContato").value = contacts[i].displayName;
			document.getElementById("inputAlterarNumContato").value = contactNumber;
		}
	}
}



// VALIDAR ALTERAR CONTATO
//=======================
function validarAlterarContato() {
	nomeAltContato = document.getElementById('inputAlterarContato').value;
	numeroAltContato = document.getElementById('inputAlterarNumContato').value;

	if (nomeAltContato == "" || numeroAltContato == "") {
		if (nomeAltContato == "") {
			document.getElementById("inputAlterarContato").focus();
		}
		else if (numeroAltContato == "") {
			document.getElementById("inputAlterarNumContato").focus();
		}
		campoObrigatorio();
	} else {
		alterarContato();
	}
}
// ALTERAR CONTATO
//=======================
function alterarContato(){ 
	var myContact = navigator.contacts.create();
	myContact.id = idConAlt;
	myContact.remove();
	
	novoContato();
}
// NOVO CONTATO
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



// ZERAR CAMPOS FORMULÁRIOS
//=======================
function zerarCamposForm() {
	if (atualizar == "cadastrarUsuario") {
		document.getElementById('inputNomeUsuario').value = '';
		document.getElementById('inputEmail').value = '';
		document.getElementById('inputLoginCadastro').value = '';
		document.getElementById('inputSenhaCadastro').value = '';
	}
	if (atualizar == "inserirTarefa") {
		document.getElementById('inputDescricao').value = '';
		document.getElementById('inputPrazo').value = '';
	}
	if (atualizar == "adicionarProjeto") {
		document.getElementById('inputProjeto').value = '';
	}
	if (atualizar == "adicionarContato") {
		document.getElementById('inputContato').value = '';
		document.getElementById('inputNumContato').value = '';
	}
}




// ALERTAS
// =======================
function errorCB(tx, err) {
	navigator.notification.alert("error: " + err);
}
function successCB() {
	navigator.notification.alert('Salvo com sucesso');
}
function updateCB() {
	navigator.notification.alert('Alterado com sucesso');
}
function deleteCB() {
	navigator.notification.alert('ExcluÃ­do com sucesso');
}
function successPrjCB() {
	navigator.notification.alert('Projeto salvo com sucesso');
}
function successGrpCB() {
	navigator.notification.alert('Grupo salvo com sucesso');
}
function successGrpContCB() {
	navigator.notification.alert('Grupo e Contatos relacionados');
}
function successExcluirCB() {
	navigator.notification.alert('ExcluÃ­do com sucesso');
}
function campoObrigatorio() {
	navigator.notification.alert('Favor preencher todos os campos obrigatï¿½rios');
}
function successCadastroUsuarioCB() {
	navigator.notification.alert('Usuario cadastrado com sucesso');
}
function onRemoveSuccess() {
	alert("Removal Success");
}
function onSuccess(contact) {
	alert("Salvo com Sucesso");
};
function onAltSuccess(contact) {
	alert("Alterado com Sucesso");
};
function onError(contactError) {
	alert("Error = " + contactError.code);
};
function buscaError() {
	alert("Error");
}




// ##########################################################################################



function validarUsuario() {
	var nomeUsuario = new String(document.getElementById('inputNomeUsuario').value);
	var email = new String(document.getElementById('inputEmail').value);
	var login = new String(document.getElementById('inputLoginCadastro').value);
	var senha = new String(document.getElementById('inputSenhaCadastro').value);

	// Validaï¿½ï¿½o dos campos
	if (nomeUsuario == "" || email == "" || login == "" || senha == "") {
		if (nomeUsuario == "") {
			document.getElementById("inputNomeUsuario").focus();
		}
		if (email == "") {
			document.getElementById("inputEmail").focus();
		}
		if (login == "") {
			document.getElementById("inputLoginCadastro").focus();
		}
		if (senha == "") {
			document.getElementById("inputSenhaCadastro").focus();
		}
		campoObrigatorio();
	} else {		
		cadastrarUsuario();
		
		atualizar = new String("cadastrarUsuario");
		atualizarPagina();
	}
}



// CADASTRAR USUARIO
// =======================
function cadastrarUsuario() {
	// window.openDatabase(nome, versÃ£o, nome de exibiÃ§Ã£o, tamanho);
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(cadastrarUsuarioDB, errorCB, successCadastroUsuarioCB());
}
// FunÃ§Ã£o de login TELA INDEX
// =======================
function cadastrarUsuarioDB(tx) {
	var nomeUsuario = new String(document.getElementById('inputNomeUsuario').value);
	var email = new String(document.getElementById('inputEmail').value);
	var login = new String(document.getElementById('inputLoginCadastro').value);
	var senha = new String(document.getElementById('inputSenhaCadastro').value);
	
	tx.executeSql('INSERT INTO CADASTRA_USUARIO (NOME, EMAIL, LOGIN, SENHA) VALUES ("'+nomeUsuario+'", "'+email+'", "'+login+'", "'+senha+'")');
}



// ***SELECT TELA INDEX
// =======================
function selectIndexDB() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(queryIndexDB);
}
// TELA INDEX
// =======================
function queryIndexDB(tx) {
	tx.executeSql('SELECT * FROM CADASTRO_USUARIO', [], querySuccessIndex,
			errorCB);
}
// TELA INDEX
// =======================
function querySuccessIndex(tx, results) {
	var len = results.rows.length;
	navigator.notification.alert('Quantidade de Rows inseridas: ' + len);
	if (len > 0) {
		for (var i = 0; i < len; i++) {
			navigator.notification.alert(' id: ' + results.rows.item(i).id
					+ ' email: ' + results.rows.item(i).email + ' login: '
					+ results.rows.item(i).login + ' senha: '
					+ results.rows.item(i).senha);
		}
	}
}

// ***ConfiguraÃ§Ã£o do CONFIRM
// =======================
/*
 * $.confirm.options = { text: "Tem certeza que deixa excluir?", title:
 * "NOTIFICAO", confirmButton: "Ok", cancelButton: "Cancelar", post: false }
 */