((f, h) => {
  if (!f || !h) return false;
  const form = document.querySelector('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
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
    newIdea.appendChild(ideaCont);

    const ideaTitle = document.createElement('div');
    ideaTitle.classList.add('sta-ideatitle-ht');
    ideaTitle.innerHTML = data.title;
    ideaCont.appendChild(ideaTitle);

    const ideaDescription = document.createElement('div');
    ideaDescription.classList.add('sta-ideatext-ht');
    ideaDescription.innerHTML = data.definition;
    ideaCont.appendChild(ideaDescription);

    const ideaUserDate = document.createElement('div');
    ideaUserDate.classList.add('sta-userdate-th');
    ideaUserDate.innerHTML = `${data.name} ${data.surname} - ${data.timestamp}`;
    newIdea.appendChild(ideaUserDate);

    const container = document.querySelector('.sta-ideas-container-ht');
    container.appendChild(newIdea);
  };



      // Crear el objeto de datos
      const dataForm = {
        id: 'hotel_tester_form_test',
        edit: true,
        title: ['Nombre', 'Apellidos', 'Email','Titulo','Descripcion'],
        new: ['web.developer5@roomleader.com', 'Jorge', 'Varela'],
        nl: {
            nlH: 'asd@asd.com;asd2@asd.com',
            rutaH: '',
            nl: 'inscrito@gmail.com',
            ruta: '',
            from: 'no-responder@roomleader.com',
            subject: 'Asunto',
            tags: {
                'nombreTag': 'valor del tag'
            }
        }
      };
  
      // Convertir el objeto de datos a JSON
      const jsonData = JSON.stringify(dataForm);
  
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
      if (validate()) {
        const ideaData = {
          title: data.title.value,
          definition: data.definition.value,
          name: data.name.value,
          surname: data.surname.value,
          email: data.email.value,
          timestamp: format(now, 'es'),
        };
        insert(ideaData);
        save(ideaData);
        form.reset();
      }
      return false;
    });
    const format = (date,locale,options) =>
    new Intl.DateTimeFormat(locale,options).format(date);
    const now = new Date();
    // format(now, 'es')
    // format(now, 'es', {dateStyle: 'long'})
    // format(now, 'es', {weekday: 'short',day: 'numeric'})
    // format(now, 'en', {weekday: 'short',day: 'numeric'})



})(document.querySelector('.tpl-from-ht'), hotusa());


