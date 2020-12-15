jQuery(document).ready(function ($) {
  const request = axios.get('http://csc225.mockable.io/consoles');

  request.then(function (response) {

    const consoles = response.data;
    const consolesHtml = consoles.map(function (em) {

      const { id, name, image } = em;

      return `
            
            <div data-id="${id}" class="card">
                <img src="${image}" class="card-img-top" alt="${name}">
                <div class="card-body">
                <h5 class="card-title">${id}</h5>
                <p class="card-text">${name}</p>

              </div>
            </div>
            `;

    }).join('');

    $('#consoles').html(consolesHtml);

  });

  jQuery('#consoles').on('click', '.card', function () {
    const id = $(this).attr('data-id');
    const consoleUrl = `http://csc225.mockable.io/consoles/${id}`;

    $('#console').html('');
    $('#loading-anim').toggleClass('d-none');

    axios.get(consoleUrl).then(function (response) {
      $('#loading-anim').toggleClass('d-none');
      const { id, name, price, country, releaseYear, image } = response.data;
      $('#console').html(`
                
            <div class="card">
            <img src="${image}" class="card-img-top" alt="${name}">
            <div class="card-body">
              <h5 class="card-title">${name}</h5>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Price: $${price}</li>
              <li class="list-group-item">Country: ${country}</li>
              <li class="list-group-item">Release Year: ${releaseYear}</li>
            </ul>
          </div>


            `);
    }).catch(function (error) {
      alert('Oops! Something went wrong...');
    });



  });


});