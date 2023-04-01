
// entendendo que os dados ja estão tratados, pois a função tem a responsabilidade de entregar a media e não validar os dados de entrada.
function mediaSimples(num1, num2, num3){
    return (num1 + num2 + num3) / 3
}
console.log(mediaSimples(1,3,5));




function mediaSimplesMultiplosValores(...numeros){

    if(numeros.length == 0) return;
    const divisor = numeros.length;
    const dividendo = numeros.reduce(( acumulador, valorAtual ) => acumulador + valorAtual);
    return dividendo/divisor;
}

console.log(mediaSimplesMultiplosValores());
console.log(mediaSimplesMultiplosValores(1,2,3,4,5,6,7,8,9));