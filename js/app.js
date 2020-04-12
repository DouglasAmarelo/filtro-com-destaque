(function () {
  'use strict';

  // List of cities
  const cities = [
    'Acre (AC)',
    'Alagoas (AL)',
    'Amapá (AP)',
    'Amazonas (AM)',
    'Bahia (BA)',
    'Ceará (CE)',
    'Distrito Federal (DF)',
    'Espírito Santo (ES)',
    'Goiás (GO)',
    'Maranhão (MA)',
    'Mato Grosso (MT)',
    'Mato Grosso do Sul (MS)',
    'Minas Gerais (MG)',
    'Pará (PA)',
    'Paraíba (PB)',
    'Paraná (PR)',
    'Pernambuco (PE)',
    'Piauí (PI)',
    'Rio de Janeiro (RJ)',
    'Rio Grande do Norte (RN)',
    'Rio Grande do Sul (RS)',
    'Rondônia (RO)',
    'Roraima (RR)',
    'Santa Catarina (SC)',
    'São Paulo (SP)',
    'Sergipe (SE)',
    'Tocantins (TO',
  ];

  // Selected DOM elements
  const $search = document.querySelector('.search');
  const $list = document.querySelector('.list');
  const $listFilteredItems = document.querySelector('.filtered');
  const $listToralItems = document.querySelector('.total');

  // Update DOM with the cities
  const inertCitiesIntoDOM = cities => {
    $list.innerHTML = cities.map(city => `<li>${city}</li>`).join('');
  };

  // Show the total size of the array of cities
  const updateTotalItems = list => ($listToralItems.innerHTML = list.length);

  const updateFilteredItems = list =>
    ($listFilteredItems.innerHTML = list.length);

  // Get a text, clean and return a regex
  const transformTextToRegex = text => {
    const result = text.trim().replace(/\(|\)/gim, '');

    return new RegExp(`(${result})`, 'gmi');
  };

  // Return an Array filtered
  const filterByRegex = (list, regex) => list.filter(item => item.match(regex));

  // Select the text that matchs with the searchterm
  const highlightTextByRegex = (searchTerm, regex) => {
    $list.querySelectorAll('li').forEach(item => {
      if (!searchTerm) return (item.innerHTML = item.textContent);

      item.innerHTML = item.textContent.replace(
        regex,
        '<span class="selected">$1</span>'
      );
    });
  };

  // Listen to user text input
  $search.addEventListener('input', e => {
    const searchTerm = e.target.value;
    const searchRegex = transformTextToRegex(searchTerm);
    const filteredCities = filterByRegex(cities, searchRegex);

    inertCitiesIntoDOM(searchTerm ? filteredCities : cities);
    updateFilteredItems(searchTerm ? filteredCities : []);
    highlightTextByRegex(searchTerm, searchRegex);
  });

  // Start app
  inertCitiesIntoDOM(cities);
  updateTotalItems(cities);
})();
