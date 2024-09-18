var inputs = document.getElementsByClassName('formulario__input');
for (var i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener('keyup', function(){
    if(this.value.length>=1) {
      this.nextElementSibling.classList.add('fijar');
    } else {
      this.nextElementSibling.classList.remove('fijar');
    }
  });
}
// Agrega la clase 'scrolled' al navbar cuando se hace scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) { // Si el scroll supera los 50px
      navbar.classList.add('scrolled');
  } else {
      navbar.classList.remove('scrolled');
  }
});


const defaultEntries = [
  { nombre: 'Juan Pérez', edad: 30, ciudad: 'Ciudad de Guatemala' },
  { nombre: 'María López', edad: 25, ciudad: 'Antigua Guatemala' },
  { nombre: 'Pedro Gómez', edad: 35, ciudad: 'Quetzaltenango' }
  ];

  // Función para guardar el array en LocalStorage
  function saveToLocalStorage() {
  localStorage.setItem('entries', JSON.stringify(entries)); // Convertir el array a JSON y guardarlo
  }

  // Función para cargar los datos del LocalStorage cuando la página se recarga
  function loadFromLocalStorage() {
  const storedEntries = localStorage.getItem('entries'); // Obtener los datos del LocalStorage
  if (storedEntries) {
      entries = JSON.parse(storedEntries); // Convertir los datos de vuelta a un array
  } else {
      entries = defaultEntries; // Usar datos predeterminados si no hay datos en LocalStorage
  }
  updateTable(); // Actualizar la tabla con los datos cargados
  }

  // Array de objetos para almacenar los registros (inicialmente vacío)
  let entries = [];

  // Cargar los datos guardados en LocalStorage al cargar la página
  document.addEventListener('DOMContentLoaded', function() {
  loadFromLocalStorage(); // Llama a la función para cargar los datos
  });

  document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita que la página se recargue al enviar el formulario

  // Obteniendo los valores del formulario
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const city = document.getElementById('city').value;

  // Crear un objeto con los datos
  const newEntry = {
      nombre: name,
      edad: age,
      ciudad: city
  };

  // Agregar el objeto al array
  entries.push(newEntry);

  // Guardar el array actualizado en LocalStorage
  saveToLocalStorage();

  // Actualizar la tabla
  updateTable();

  // Opcional: Limpiar el formulario después de agregar el registro
  document.getElementById('contactForm').reset();
  });

  // Función para actualizar la tabla con los datos del array
  function updateTable() {
  const tableBody = document.getElementById('tableBody');
  tableBody.innerHTML = ''; // Limpiar el contenido de la tabla antes de actualizarla

  // Recorrer el array de objetos y agregar cada uno a la tabla
  entries.forEach((data, index) => {
      const row = document.createElement('tr');

      const indexCell = document.createElement('td');
      const nameCell = document.createElement('td');
      const ageCell = document.createElement('td');
      const cityCell = document.createElement('td');

      indexCell.textContent = index + 1; // Mostrar el número de fila
      nameCell.textContent = data.nombre;
      ageCell.textContent = data.edad;
      cityCell.textContent = data.ciudad;

      row.appendChild(indexCell);
      row.appendChild(nameCell);
      row.appendChild(ageCell);
      row.appendChild(cityCell);

      tableBody.appendChild(row);
  });
  }