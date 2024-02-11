const entradaNuevaTarea = document.getElementById('entrada-nueva-tarea');
const listaTareas = document.getElementById('lista-tareas');
const totalTareasElement = document.getElementById('total-tareas');
const tareasCompletadasElement = document.getElementById('tareas-completadas');

let idCounter = 0;

document.getElementById('formulario-agregar-tarea').addEventListener('submit', function(event) {
    event.preventDefault();
    agregarNuevaTarea();
});

function agregarNuevaTarea() {
    if (entradaNuevaTarea.value.trim() === '') {
        alert('Ingrese una tarea.');
        return;
    }

    const nuevaTarea = document.createElement('li');
    const tareaID = idCounter++;
    nuevaTarea.innerHTML = `
        <div>${tareaID}</div>
        <div class="tarea-text">${entradaNuevaTarea.value}</div>
        <input type="checkbox" class="checkbox-tarea" data-id="${tareaID}">
        <button class="boton-borrar">Borrar</button>
    `;
    nuevaTarea.querySelector('.checkbox-tarea').addEventListener('change', function(event) {
        const checkbox = event.target;
        const tarea = checkbox.parentNode;
        if (checkbox.checked) {
            tarea.classList.add('completada');
            agregarTareaCompletada(tarea.querySelector('.tarea-text').textContent);
        } else {
            tarea.classList.remove('completada');
            removerTareaCompletada(tarea.querySelector('.tarea-text').textContent);
        }
        actualizarContadorTareas();
    });

    nuevaTarea.querySelector('.boton-borrar').addEventListener('click', function() {
        listaTareas.removeChild(nuevaTarea);
        actualizarContadorTareas();
    });

    listaTareas.appendChild(nuevaTarea);
    entradaNuevaTarea.value = '';
    actualizarContadorTareas();
}

function actualizarContadorTareas() {
    const total = listaTareas.children.length;
    const completadas = Array.from(listaTareas.children).filter(tarea => tarea.classList.contains('completada')).length;

    totalTareasElement.textContent = total;
    tareasCompletadasElement.textContent = completadas;
}

function agregarTareaCompletada(tareaText) {
    const tareasCompletadasList = document.getElementById('tareas-completadas-lista');
    const nuevaTareaCompletada = document.createElement('div');
    nuevaTareaCompletada.textContent = tareaText;
    tareasCompletadasList.appendChild(nuevaTareaCompletada);
}

function removerTareaCompletada(tareaText) {
    const tareasCompletadasList = document.getElementById('tareas-completadas-lista');
    const tareasCompletadas = tareasCompletadasList.querySelectorAll('div');
    tareasCompletadas.forEach(completada => {
        if (completada.textContent === tareaText) {
            tareasCompletadasList.removeChild(completada);
        }
    });
}
