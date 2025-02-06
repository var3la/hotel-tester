((f, h) => {
  if (!f || !h) return false;

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

  function insert(data) {
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
  }
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validate()) {
      const ideaData = {
        title: data.title.value,
        definition: data.definition.value,
        name: data.name.value,
        surname: data.surname.value,
        email: data.email.value,
        timestamp: new Date().toISOString()
      };
      insert(ideaData);
      save(ideaData);
      form.reset();
    }
    return false;
  });

})(document.querySelector('.tpl-from-ht'), hotusa());

// Crear el objeto de datos
const data = {
    id: 'bbdd_name',
    edit: true,
    title: ['Nombre', 'Apellidos', 'Apellido'],
    new: ['asd@asd.com', 'Óscar', 'Domínguez'],
    nl: {
        nlH: 'asd@asd.com;asd2@asd.com',
        rutaH: '/images/.../index.html',
        nl: 'inscrito@gmail.com',
        ruta: '/images/.../index.html',
        from: 'no-responder@roomleader.com',
        subject: 'Asunto',
        tags: {
            'nombreTag': 'valor del tag'
        }
    }
};

// Convertir el objeto de datos a JSON
const jsonData = JSON.stringify(data);

// Realizar la petición con fetch
fetch('https://nl.booking-channel.com/CLIENTES/nl/php/inscripcion2.0.php', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: jsonData
})
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
})
.then(data => {
    console.log('Success:', data);
})
.catch(error => {
    console.error('Error:', error);
});
