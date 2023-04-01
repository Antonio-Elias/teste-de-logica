// Modulos externos
const chalk = require('chalk');
const inquirer = require('inquirer');

const notasDisponiveis = [100, 50, 20, 10]
const dizeresNotasDisponiveis = 'R$: 100,00; R$50,00; R$20,00; R$10,00'

main();

function main(){
    inquirer.prompt([{
        type: 'list',
        name: 'acao',
        message: 'O que você deseja fazer? ',
        choices:[
            'Sacar',
            'Sair'
        ]
    }])
    .then((resposta)=>{
        const acao = resposta['acao'];
        if( acao === 'Sacar'){
            sacar();
        }else if(resposta === 'Sair'){
            console.log(chalk.bgBlue('Obrigado por usar nossos serviços'));
            process.exit();
        }
    })
    .catch(err => console.log(chalk.bgRed.black(err)));
}

// funções para retornar as notas 

function sacar(){
    console.log(chalk.bgBlue( `Notas disponiveis: ${dizeresNotasDisponiveis}`+'\n' ));
    inquirer.prompt([{
        name: 'valor',
        message: 'Qual valor deseja sacar?'
    }])
        .then((resposta)=>{

            const valor = Number(resposta['valor']);

            if(isNaN(valor)){
                console.log(chalk.bgRed(`Número invalido!`));
                sacar();
                return;
            }

            entregarCedulas(valor);
        })
        .catch(err => console.log(chalk.bgRed(`Ops parece que algo deu errado tente novamente mais tarde, se o erro persistir entre em contato com o nosso suporte!`)))
}

function entregarCedulas(valorSolicitado){

    let valor = valorSolicitado;
    let retornoDasCedulas = '';
    
    notasDisponiveis.forEach((nota)=>{

        
        let cedulas;
        if((nota === 100) && (valor >= 100) ){

            cedulas = retornaQtCedulas(valor, nota);
            valor -= retornaRestoValor(nota, cedulas); 
            retornoDasCedulas += exibeCedulas(cedulas, nota);

        }else if((nota === 50) && (valor >= 50)){

            cedulas = retornaQtCedulas(valor, nota);
            valor -= retornaRestoValor(nota, cedulas);  
            retornoDasCedulas += exibeCedulas(cedulas, nota); 

        }else if((nota === 20) && (valor >= 20)){

            cedulas = retornaQtCedulas(valor, nota);
            valor -= retornaRestoValor(nota, cedulas); 
            retornoDasCedulas += exibeCedulas(cedulas, nota);

        }else if((nota === 10) && (valor >= 10)){

            cedulas = retornaQtCedulas(valor, nota);
            valor -= retornaRestoValor(nota, cedulas);  
            retornoDasCedulas += exibeCedulas(cedulas, nota); 

        }
    })

        if( valor != 0){

            console.log(chalk.bgRed('\n ' + ` R$${valorSolicitado}: Saque invalido, Utilize apenas valores que correspondem as notas disponiveis! \n`));
            main();
            return;
        }

    console.log(chalk.bgGreen(retornoDasCedulas));
    console.log(); 
    main();      
}

function retornaQtCedulas(valor, nota){
    return Math.trunc(valor / nota);
}

function retornaRestoValor(nota, cedulas){
    return nota * cedulas;
}

function exibeCedulas( cedulas, nota ){
    return `\n ${cedulas} : Cedula(s) de R$${nota}` ;
}