export function extraerDataSinRepetir(lista=[], llaveExtraer="") {    
    const dataSinRepetir = [...new Set(lista.map(item=>Array.isArray(item[llaveExtraer]) ?item[llaveExtraer][0].value: (typeof  item[llaveExtraer] === 'string' || typeof item[llaveExtraer] === 'number' ? item[llaveExtraer] : item[llaveExtraer].value)))]
    
    return dataSinRepetir
}