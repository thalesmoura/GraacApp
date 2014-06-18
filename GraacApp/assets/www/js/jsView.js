/**
 * JAVASCRIPT VIEW 1.0
 */




// VARIÁVEL GLOBAL - ID DO PROJETO ATUAL
//
var projetoAtualID = '1';




//
//
document.addEventListener("deviceready", onDeviceReady, false);
//ON DEVICE READY
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
var atualizar;
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




function validarLogin() {
	logar();
}




//CARREGA AS TAREFAS DO PROJETO SELECIONADO NO CLICK, implementar corretamente
//=======================
function clickProjeto(id) {
	
	window.location.href = 'telaTarefa.html';
	
	projetoAtualID = id;
}




//CHECK DA TAREFA
//=======================
function checkTarefa(id) {
	
}




//***VALIDAR TAREFA
//=======================
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




//CARREGAR TABELA-TELA TAREFAS SUCESS
//=======================
function carregarTarefSuccess(tx, results) {
	var len = results.rows.length;
	if (len > 0) {
		for (var i = 0; i < len; i++) {
			$("#tabelaTarefas tbody").append("<tr><td><button type='button' class='btn btn-primary btn-xs' id='"
									+ results.rows.item(i).ID_TAREFA
									+ "' onclick='checkTarefa(this.id)'><span class='glyphicon glyphicon-ok'></span></button></td>"
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




//CONFIRMA EXCLUIR TAREFA
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




//PREENCHER ALTERAR TAREFA-MODAL
//=======================
var idTarAlt = '';
function preencheAlterarT(idAltT) {
	idTarAlt = idAltT;
	buscaTarefa();
}




//BUSCA TAREFA-MODAL SUCESS
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




//CARREGAR TABELA-TELA PROJETO SUCESS
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




//CONFIRMA EXCLUIR PROJETO
//=======================
var idProEx = '';
function confirmaExcluirProjeto(idP) {
	idProEx = idP;
	if (confirm('Tem certeza que deixa excluir?')) {
		excluirProjeto();
		
		atualizar = new String("excluirProjeto");
		atualizarPagina();
	}
}




//PREENCHER ALTERAR PROJETO-MODAL
//=======================
var idProAlt = '';
var idGruAlt = '';
function preencheAlterarP(idAltP) {
	idProAlt = idAltP;
	buscaProjeto();
	buscaGrupo();
}




//VALIDAR ALTERAR TAREFA
//=======================
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




//VALIDAR PROJETO
//=======================
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




//BUSCA PROJETO-MODAL SUCESS
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




//VALIDAR ALTERAR PROJETO
//=======================
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




//CONFIRMA EXCLUIR GRUPO
//=======================
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




//VALIDAR CONTATO
//=======================
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




//PREENCHER ALTERAR CONTATO-MODAL
//=======================
var idConAlt = '';
function preencheAlterarC(idAltC) {
	idConAlt = idAltC;
	buscaContato();
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




//VALIDAR ALTERAR CONTATO
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




function validarUsuario() {
	var nomeUsuario = new String(document.getElementById('inputNomeUsuario').value);
	var email = new String(document.getElementById('inputEmail').value);
	var login = new String(document.getElementById('inputLoginCadastro').value);
	var senha = new String(document.getElementById('inputSenhaCadastro').value);

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




//ZERAR CAMPOS FORMULÁRIOS
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




//ALERTAS
//=======================
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




/**
 * JAVASCRIPT VIEW END
 */