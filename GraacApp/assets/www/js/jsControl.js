/**
 * JAVASCRIPT CONTROL 1.0
 */










//RELACIONAR AS TABELAS
//=======================
function criarRelacionarTabelas() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(criarRelacionarTabelasDB);
}




//LOGAR
//=======================
function logar() {
	window.location.href = 'telaProjeto.html';
}




//***INSERT TAREFA
//=======================
function inserirTarefa() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(inserirTarefaDB, errorCB, successCB());
}




//CARREGA TABELA-TELA TAREFAS
//=======================
function carregarTarefas() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(carregarTarefDB);
}




//EXCLUIR TAREFA
//=======================
function excluirTarefa() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(excluirTarefaDB, errorCB, deleteCB);
}




//BUSCA TAREFA-MODAL
//=======================
function buscaTarefa() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(buscaTarefaDB);
}




//ALTERAR TAREFA
//=======================
function alterarTarefa() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(alterarTarefaDB, errorCB, updateCB);
}




//INSERIR PROJETO
//=======================
function inserirProjeto() {
	inserirGrupo();
	
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);	
	db.transaction(inserirProjetoDB, errorCB, successPrjCB);
}




//CARREGAR TABELA-TELA PROJETO
//=======================
function carregarProjetos() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(carregarPrjDB);
}




//EXCLUIR PROJETO
//=======================
function excluirProjeto() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(excluirProjetoDB, errorCB, deleteCB);
}




//BUSCA PROJETO-MODAL
//=======================
function buscaProjeto() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(buscaProjetoDB);
}




//BUSCA GRUPO-MODAL
//=======================
function buscaGrupo() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(buscaGrupoDB);
}




//ALTERAR PROJETO
//=======================
function alterarProjeto() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(alterarProjetoDB, errorCB, updateCB);
}




//INSERIR GRUPO
//=======================
var id_grupo;
function inserirGrupo() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(inserirGrupoDB, errorCB, successGrpCB);
	inserirGrupo_Contato();
}




//CARREGAR GRUPO MAX ID
//=======================
function carregarfSuccess(tx, result) {
	id_grupo = result.rows.item(0).MAX;
}




//INSERIR GRUPO_CONTATO
//=======================
function inserirGrupo_Contato() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(inserirGrupo_ContatoDB, errorCB, successGrpContCB);
}




//EXCLUIR GRUPO
//=======================
function excluirGrupo() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(excluirGrupoDB, errorCB, deleteCB);
}




//EXCLUIR GRUPO_CONTATO
//=======================
function excluirGrupoContato() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(excluirGrupoContatoDB, errorCB, deleteCB);
}




//CARREGAR TABELA-TELA GRUPO
//=======================
function carregarGrupos() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(carregarGrpDB);
}




//CADASTRAR USUARIO
//=======================
function cadastrarUsuario() {
	var db = window.openDatabase("Teste", "1.0", "Phonegap DB", 1000000);
	db.transaction(cadastrarUsuarioDB, errorCB, successCadastroUsuarioCB());
}




/**
 * JAVASCRIPT CONTROL END
 */