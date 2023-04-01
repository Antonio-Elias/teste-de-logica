const calculaIMC = document.querySelector('.btn_calcular');
const inputPeso = document.querySelector('#peso');
const inputAltura = document.querySelector('#altura');
const resultado = document.querySelector('.resultado');

// foi feito de forma simples, proferi captuar os eventos em vez de colocar a ação no click do botão(onclick)

calculaIMC.addEventListener('click', (event)=>{
    // pega valores dos inputs
    event.preventDefault(event);
    const peso = inputPeso.value;
    const altura = inputAltura.value;

    // validações de entrada
    if(!peso || peso == 0){
        alert('Campo peso é obrigatório, Digite apenas números maiores que 1!');
        inputPeso.focus();
        return;
    }
    if(!altura || altura == 0){
        alert('Campo altura é obrigatório, Digite apenas números maiores que 1!');
        inputAltura.focus();
        return;
    }
    // delega a responsabilidade de calcular o imc para a função.
    const imc = calcularIMC(peso, altura);
    // delega a responsabilidade de validar o imc e retona a msn para mandar par o usuario
    const resultadoIMC = informaIMC(imc);
    inserResultadoHTML(resultadoIMC);
    limparInput();
})


function calcularIMC(peso, altura){
    return Math.trunc( peso / Math.pow(altura, 2) );
}

function informaIMC( imc ){
    if(imc < 18 ){
        return `IMC: ${imc}, Abaixo do peso!`;
    }
    else if(imc < 25 ){
        return `IMC: ${imc}, Peso normal!`;
    }else{
        return `IMC: ${imc}, Acima do peso!`; 
    }
}

function inserResultadoHTML(resultadoIMC){
    resultado.innerHTML = resultadoIMC;
}

function limparInput(){
    inputPeso.value = '';
    inputAltura.value  = ''
}