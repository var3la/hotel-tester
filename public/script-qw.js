((f, h) => {
  if (!f || !h) return false;
  // Obtener referencias a los elementos del DOM
  const form = document.querySelector('form#formulario');
  const registrosDiv = document.querySelector('.sta-ideas-container-ht');

  // Datos del formulario
  const data = {
    title: document.getElementById('title'),
    definition: document.getElementById('definition'),
    name: document.getElementById('name'),
    surname: document.getElementById('surname'),
    email: document.getElementById('email'),
  };

  // Validación del formulario
  function validate() {
    let isValid = true;

    Object.values(data).forEach((element) => {
      if (!element.value.trim()) {
        element.classList.add('error');
        isValid = false;
      } else {
        element.classList.remove('error');
      }
    });

    return isValid;
  }

  // Función para mostrar los registros desde el servidor
  async function mostrarRegistros() {
    if (!registrosDiv) {
      console.error('El contenedor de registros no existe en el DOM.');
      return;
    }

    registrosDiv.innerHTML = ''; // Limpiar la lista de registros

    try {
      const response = await fetch('http://localhost:3000/api/registros');

      if (!response.ok) {
        const errorData = await response.json(); // Obtener detalles del error
        console.error('Error al enviar el formulario:', errorData.error);
        throw new Error(`Error al cargar los registros: ${response.status}`);
      }

      const registros = await response.json();
      console.log('Registros recuperados:', registros);

      if (Array.isArray(registros) && registros.length > 0) {
        registros.forEach((registro) => {

              const newIdea = document.createElement('div');
              newIdea.classList.add('sta-idea-ht');

              const ideaCont = document.createElement('div');
              ideaCont.classList.add('sta-ideain-ht');
              newIdea.appendChild(ideaCont);

              const ideaTitle = document.createElement('div');
              ideaTitle.classList.add('sta-ideatitle-ht');
              ideaTitle.innerHTML = registro.title;
              ideaCont.appendChild(ideaTitle);

              const ideaDescription = document.createElement('div');
              ideaDescription.classList.add('sta-ideatext-ht');
              ideaDescription.innerHTML = registro.definition;
              ideaCont.appendChild(ideaDescription);

              const ideaUserDate = document.createElement('div');
              ideaUserDate.classList.add('sta-userdate-th');
              ideaUserDate.innerHTML = `${registro.name} ${registro.surname} - ${registro.timestamp || 'Fecha desconocida'}`;
              newIdea.appendChild(ideaUserDate);

              const container = document.querySelector('.sta-ideas-container-ht');
              container.appendChild(newIdea);
  

          // const newIdea = document.createElement('div');
          // newIdea.classList.add('sta-idea-ht');

          // const ideaCont = document.createElement('div');
          // ideaCont.classList.add('sta-ideain-ht');

          // const ideaTitle = document.createElement('div');
          // ideaTitle.classList.add('sta-ideatitle-ht');
          // ideaTitle.textContent = registro.title || 'Sin título';
          // ideaCont.appendChild(ideaTitle);

          // const ideaDescription = document.createElement('div');
          // ideaDescription.classList.add('sta-ideatext-ht');
          // ideaDescription.textContent = registro.definition || 'Sin descripción';
          // ideaCont.appendChild(ideaDescription);

          // const ideaUserDate = document.createElement('div');
          // ideaUserDate.classList.add('sta-userdate-ht');
          // ideaUserDate.textContent = `${registro.name || 'Anónimo'} ${
          //   registro.surname || ''
          // } - ${registro.timestamp || 'Fecha desconocida'}`;
          // newIdea.appendChild(ideaUserDate);

          // registrosDiv.appendChild(newIdea);
        });
      } else {
        console.warn('No hay registros disponibles.');
      }
    } catch (error) {
      console.error('Error al cargar los registros:', error.message);
    }
  }

  // Función para enviar datos al servidor
  async function saveFormData(formData) {
    try {
      const response = await fetch('http://localhost:3000/api/registros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error al guardar el registro: ${response.status}`);
      }

      const registro = await response.json();
      console.log('Registro guardado:', registro);
      return registro;
    } catch (error) {
      console.error('Error al enviar el formulario:', error.message);
      return null;
    }
  }

  // Función para eliminar un registro
  async function eliminarRegistro(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/registros/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Error al eliminar el registro: ${response.status}`);
      }

      console.log('Registro eliminado:', id);
      mostrarRegistros(); // Actualizar la lista de registros
    } catch (error) {
      console.error('Error al eliminar el registro:', error.message);
    }
  }

  // Evento de envío del formulario
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!validate()) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    const formData = {
      title: data.title.value.trim(),
      definition: data.definition.value.trim(),
      name: data.name.value.trim(),
      surname: data.surname.value.trim(),
      email: data.email.value.trim(),
      timestamp: new Date().toISOString(),
    };

    const nuevoRegistro = await saveFormData(formData);

    if (nuevoRegistro) {
      mostrarRegistros(); // Actualizar la lista de registros
      form.reset(); // Limpiar el formulario
    }
  });

  // Cargar los registros al iniciar la página
  document.addEventListener('DOMContentLoaded', () => {
    mostrarRegistros();
  });
})(document.querySelector('.tpl-from-ht'), hotusa());