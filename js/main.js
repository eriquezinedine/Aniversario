
const grid = new Muuri('.grid',{
    layout: {
      rounding: false,
    },
}); //esto puede ser un {} en ves []

window.addEventListener('load', ()=>{
    grid.refreshItems().layout();
    document.getElementById('grid').classList.add('imagenes-cargadas')

    const enlaces = document.querySelectorAll('#categorias a');
    enlaces.forEach((elemento)=>{
      elemento.addEventListener('click',(evento)=>{
        evento.preventDefault();
        console.log()
        enlaces.forEach((enlace)=>{enlace.classList.remove('activo');})//acedo a todos los enlace del gurpo de enlaces y remuebo el activo
        evento.target.classList.add('activo');
        const categoria = evento.target.innerHTML.toLowerCase();//CONVIERTE TODO EN MINUSCULA: toloLowerCase
        categoria === 'todos'? grid.filter(`[data-categoria]`):grid.filter(`[data-categoria="${categoria}"]`);
        console.log(categoria);
      });
    });

    //Agregamos el listener para la barra de busqueda

    document.getElementById('barra-busqueda').addEventListener('input',(evento)=>{
      const busqueda = evento.target.value;
      grid.filter((item)=>item.getElement().dataset.etiquetas.includes(busqueda));
      console.log(busqueda);
    });

    //Agregamos el listener para las imagenes
    const overlay = document.getElementById('overlay');
    const imagenes =document.querySelectorAll('.grid .item img')
    imagenes.forEach((imagen)=>{
      imagen.addEventListener('click',()=>{
        const ruta = imagen.getAttribute('src');
        const descripcion= imagen.parentNode.parentNode.dataset.descripcion;
        // console.log(ruta,descripcion);
        overlay.classList.add('activo')
        document.querySelector('#overlay img').src = ruta;
        document.querySelector('#overlay .descripcion').innerText = descripcion;

      })
    })

    //Agregamos el boton de cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click',()=>{
      overlay.classList.remove('activo');
    })

    overlay.addEventListener('click',(evento)=>{
      // overlay.classList.remove('activo')
      //con la ayuda de target y el ID podemos selecionar el overlay
      console.log(evento.target.id)
      switch(evento.target.id){
        case "contenedor-img":
          overlay.classList.remove('activo');
          break;
        case "overlay":
          overlay.classList.remove('activo');
          break;
      }
    })
});






