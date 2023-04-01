
const valores = ['a', 'A', 'a', 1, 2, 3, 1, 3];

function varificaDuplicado( elemento ){
    const duplicado = new Set(elemento).size !== elemento.length;
    if(duplicado){
        console.log('Possui valores duplicados');
    }else{
        console.log('Não possui valores duplicados');
    }
}

varificaDuplicado(valores);
