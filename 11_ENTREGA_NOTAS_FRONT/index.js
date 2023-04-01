const btn_sacarSelecionar = document.querySelector('.btn_sacar');
const notasDisponiveis = [100, 50, 20, 10];

// Insere a mensagem de notas disponiveis ao carregar a pagina, assim ao meu ver fica dinamico.
document.addEventListener('DOMContentLoaded', () =>{
    msgNotasDisponiveis(notasDisponiveis);
})

/** evento ao clicar no botão Saca, nele previno o envio do formulario, 
 *  valido se valor digitado é um numero valido e capturo o valor passado
 *  este e o evento responsavel por iniciar o programa e cha a função exibir cedulas
 */
btn_sacarSelecionar.addEventListener('click',(event) =>{
    const valor = document.querySelector('#valor');
    event.preventDefault();
    const sacarValor = Number(valor.value);
    console.log(sacarValor)
    
    if(isNaN(sacarValor)){
        alert('Só é permitidos números!')
        valor.focus();
        return;
    }

    if(sacarValor === 0){
        valor.focus();
        return;
    }
    exibirCedulas(sacarValor);
})

/**
 * pensei em fazer um função que delega responsabilidades a outras funções, ela e a responsavel por exibir as cedulas
 * mas tem funções especificas para efetuar o calculo do valor restante, contar as cedulas para cada nota montar um array
 * com estes resultados e delega a função que monta a mensagem e imprime na tela para o usuario
 * usei o foreach pois pode ser adicionado mais notas, assim deixo o programa dinamico, poderia ter usado o operador mod mas
 * preferi diminuir o valor das cedulas do valor total, para no fim ser mais simples validar se o saque é valido ou não, se o valor for 0
 * e que os valores estão de acordo com as notas disponiveis
 */
function exibirCedulas( valorSolicitado ){

    let valorSaque = valorSolicitado; 
    const resultado = []; // armazena o resultaso para cada cedula e qtd delas;
    
    notasDisponiveis.forEach(( nota )=>{
        
        let cedulas; // recebe o numero de cedulas para cada nota
        if( valorSaque >= nota){
            cedulas = retornaQtCedulas(valorSaque, nota); // delega a função retorna a quanditade de cedulas para cada nota;
            valorSaque -= retornaRestoValor(nota, cedulas); // calcula o valor a ser retirado ou seja ja sacado
            resultado.push(criaResulatado(nota, cedulas)); // armazenas o resultado para manda a função responsavel por mostrar o mesmo ao usuario

        }
    })

    // valida se o valor passado pelo usuario é valido se for no final o valor sera 0 se não o mesmo terá algum valor e ira chamar a função
    // responsavel por mostra o aleta ao cliente
    if(valorSaque != 0){
        msgValorInvalido(valorSolicitado);
        return;
    }
    // se esta ok chama a função para mostrar os dados ao usuario;
    setResultado( resultado );
      
}

// retorna a quantidade de cedulas, usi o trunc pois retorn apenas a part inteira da divisão
function retornaQtCedulas(valor, nota){
    return Math.trunc(valor / nota);
}

//retorna o valor a ser retirado do montante passado 
function retornaRestoValor(nota, cedulas){
    return nota * cedulas;
}

// criei esta função para reutilização de componente unica responsabilidade dela é criar um paragrafo e devolver o mesmo.
function criaParagrafo(){
    //criar elemento com o js
    const p = document.createElement('p');
    return p;
}

// pensei em criar uma função que recebe um array com as cedulas e quantidade da mesma para exibir ao cliente o resultaso da operação
function setResultado( listResultado ){
    
    const resultado = document.querySelector('.exibe-notas');
    resultado.innerHTML = ''; // reset do display de informação
    msgNotasDisponiveis(notasDisponiveis);// monta a mensagem de notas disponiveis para o cliente novamente,

    // cria a mensagem com o resultado e mostra ao cliente, pensei em montar desta forma pois somente se o valor for valido e que chama esta função.
    listResultado.forEach((elemento)=>{
        let msg = `${elemento.cedulas} Nota de R$${elemento.nota},00`;
        let p = criaParagrafo();
        p.innerHTML = msg;
    resultado.appendChild(p);
    });

    limparInputValor() // limpa o inpu
}

function criaResulatado( nota, cedulas ){
    return {nota: nota, cedulas: cedulas};
}

function msgValorInvalido( valor ){
    const resultado = document.querySelector('.exibe-notas');
    resultado.innerHTML = '';

    const p = criaParagrafo();

    p.innerHTML = `Saque de R$${valor},00 invalido! <br> O valor precisa ser de acordo com as notas disponiveis!`;
    p.classList.add('erro'); // classe que altera o stylo do paragrafo quando o valor é invalido
    resultado.appendChild(p);

    limparInputValor();
}

// apenas limpar o valor digitado pelo cliente
function limparInputValor(){
    const inputValor = document.querySelector('#valor');
    inputValor.value = '';
}

// cria a mensagem de notas disponiveis pensei em fazer desta forma para ser dinamico pois se mais notas forem adiconada a msg vai ser alterada
// com a nova nota
function msgNotasDisponiveis(notas){
    const notasDisponiveis = document.querySelector('.informa-notas-disponiveis');
    notasDisponiveis.innerHTML = '';
    let mensagem = 'Notas disponiveis: ';
    const indiceUltimoValor = 
    notas.forEach(( valor )=>{
        mensagem += `R$${valor},00. `;
    })
    notasDisponiveis.innerHTML = `${mensagem}`;

    limparInputValor();
}

