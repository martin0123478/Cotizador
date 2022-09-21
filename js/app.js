//Constructores
function Seguro(marca,year,tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;
}

//Realizar la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function(){
    let cantidad;
    const base = 2000;
    switch (this.marca) {
        case '1':
            cantidad = base*1.15    
            break;
        case '2':
            cantidad = base*1.05
            break;
        
        case '3':
            cantidad = base*1.35
            break
    
        default:
            break;
    }
    //Leer el año
    const diferencia = new Date().getFullYear() - this.year;
    cantidad = ((diferencia*3)*cantidad) / 100;
    if(this.tipo === 'basico'){
        cantidad*= 1.30;
    }else{
        cantidad *= 1.50
    }
    return cantidad
}

function UI(){

}
//Llena las opciones de los años
UI.prototype.llenarOpciones = () =>{
    const max = new Date().getFullYear();
          min = max - 20;
    const selectYear = document.querySelector('#year');
    for(let i=max; i>min;i--){
        let option = document.createElement('option')
        option.value = i;
        option.textContent = i
        selectYear.appendChild(option)
        
    }
}

//Muestra alerta en pantalla
UI.prototype.mostrarMensaje = (mensaje,tipo) =>{
    const formulario = document.querySelector('#cotizar-seguro');
    const div = document.createElement('div');
    if(tipo === 'error'){
        div.classList.add('error')
      
    }else{
        div.classList.add('correcto')
    }

    div.classList.add('mensaje','mt-10');
    div.textContent = mensaje
    formulario.insertBefore(div,document.querySelector('#resultado'));
    setTimeout(() => {
        div.remove()
    }, 3000);
}

UI.prototype.mostrarResultado = (seguro,total) =>{
    const {marca,year,tipo} = seguro
    let textoMarca
    switch (marca) {
        case '1':
            textoMarca = 'Americano'
            break;
        case '2':
            textoMarca = 'Asiatico'
             break;
        case '3':
         textoMarca = 'Europeo'
        break;
    
        default:
            break;
    }
    const div = document.createElement('div');
    div.classList.add('mt-10');
    div.innerHTML =`
    <p class="header">Tu resumen</p>
    <p class="font-bold">Marca: <span class="font-normal">${textoMarca}</span></p>
    <p class="font-bold">Total: <span class="font-normal">${total}</span></p>
    
    `
    const resultadoDiv = document.querySelector('#resultado')
    resultadoDiv.appendChild(div)

    //cargando
    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';
    setTimeout(() => {
        spinner.style.display = 'none'
        resultadoDiv.appendChild(div)
    }, 3000);
}

//instanciar
const ui = new UI();


document.addEventListener('DOMContentLoaded',()=>{
    ui.llenarOpciones()
})

eventListeners()
function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit',cotizarSeguro)
}

function cotizarSeguro(e){
    e.preventDefault()
    //Leer la marca
    const marca = document.querySelector('#marca').value
    

    //Leer el años
    const year = document.querySelector('#year').value
   
    //Leer el tipo de covertura
    const tipo =    document.querySelector('input[name="tipo"]:checked').value;
   
    if(marca === '' || year === '' || tipo ===''){
       ui.mostrarMensaje('Todos los campos son obligatorios','error')
       return
    }

    ui.mostrarMensaje('Cotizando...','exito')
    //ocultar cotizaciones previas
    const resultados = document.querySelector('#resultado div');
    if(resultados != null){
        resultados.remove()
    }

    //Instanciar seguro
    const seguro = new Seguro(marca,year,tipo)
   const total = seguro.cotizarSeguro()
   ui.mostrarResultado(seguro,total)
}