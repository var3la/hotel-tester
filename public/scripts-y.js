((f, h) => {
  if (!f || !h) return false;
  const form = document.querySelector('form');

  const data = {
    title: document.getElementById('title'),
    definition: document.getElementById('definition'),
    name: document.getElementById('name'),
    surname: document.getElementById('surname'),
    email: document.getElementById('email')
  };

  function validate() {
    let isValid = true;
    Object.values(data).forEach(element => {
      if (!element.value) {
        element.classList.add('error');
        isValid = false;
      } else {
        element.classList.remove('error');
      }
    });
    return isValid;
  }

  function save(data) {
    // save data to local storage or API here
    console.log('Data saved:', data);
  }


  // function insert(data) {
  //   const newIdea = document.createElement('div');
  //   newIdea.classList.add('sta-idea-ht');

  //   const ideaCont = document.createElement('div');
  //   ideaCont.classList.add('sta-ideain-ht');
  //   newIdea.appendChild(ideaCont);

  //   const ideaTitle = document.createElement('div');
  //   ideaTitle.classList.add('sta-ideatitle-ht');
  //   ideaTitle.innerHTML = data.title;
  //   ideaCont.appendChild(ideaTitle);

  //   const ideaDescription = document.createElement('div');
  //   ideaDescription.classList.add('sta-ideatext-ht');
  //   ideaDescription.innerHTML = data.definition;
  //   ideaCont.appendChild(ideaDescription);

  //   const ideaUserDate = document.createElement('div');
  //   ideaUserDate.classList.add('sta-userdate-th');
  //   ideaUserDate.innerHTML = `${data.name} ${data.surname} - ${data.timestamp}`;
  //   newIdea.appendChild(ideaUserDate);

  //   const container = document.querySelector('.sta-ideas-container-ht');
  //   container.appendChild(newIdea);
  // };



  document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault();
    mostrarRegistros();

    // Enviar datos al backend
    try {
      const response = await fetch('http://localhost:3000/api/registros', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const registro = await response.json();
        mostrarRegistros(); // Actualizar la lista de registros
        document.getElementById('formulario').reset(); // Limpiar el formulario
      } else {
        console.error('Error al enviar el formulario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });
  
  // Función para mostrar los registros
  async function mostrarRegistros() {
    const registrosDiv = document.querySelector('.sta-ideas-container-ht');
    registrosDiv.innerHTML = ''; // Limpiar la lista
  
    try {
      const response = await fetch('http://localhost:3000/api/registros');
      const registros = await response.json();
  
      registros.forEach(data => {
        const newIdea = document.createElement('div');
        newIdea.classList.add('sta-idea-ht');

        const ideaCont = document.createElement('div');
        ideaCont.classList.add('sta-ideain-ht');

        const ideaTitle = document.createElement('div');
        ideaTitle.classList.add('sta-ideatitle-ht');
        ideaTitle.innerHTML = data.title;
        ideaCont.appendChild(ideaTitle);

        const ideaDescription = document.createElement('div');
        ideaDescription.classList.add('sta-ideatext-ht');
        ideaDescription.innerHTML = data.definition;
        ideaCont.appendChild(ideaDescription);

        const ideaUserDate = document.createElement('div');
        ideaUserDate.classList.add('sta-userdate-ht');
        ideaUserDate.innerHTML = `${data.name} ${data.surname} - ${data.timestamp}`;
        newIdea.appendChild(ideaUserDate);

        const container = document.querySelector('.sta-ideas-container-ht');
        container.appendChild(newIdea);
      });
    } catch (error) {
      console.error('Error al cargar los registros:', error);
    }
  }
  
  // Función para eliminar un registro
  async function eliminarRegistro(id) {
    try {
      const response = await fetch(`http://localhost:3000/api/registros/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        mostrarRegistros(); // Actualizar la lista de registros
      } else {
        console.error('Error al eliminar el registro');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Cargar los registros al iniciar la página
  mostrarRegistros();
      // if (validate()) {
      //   const ideaData = {
      //     title: data.title.value,
      //     definition: data.definition.value,
      //     name: data.name.value,
      //     surname: data.surname.value,
      //     email: data.email.value,
      //     timestamp: new Date().toString(),
      //   };
      //   mostrarRegistros(ideaData);
      //   save(ideaData);
      //   form.reset();
      // }
      // return false;

  


})(document.querySelector('.tpl-from-ht'), hotusa());


