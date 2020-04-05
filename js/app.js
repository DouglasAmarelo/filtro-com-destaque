(function () {
  'use strict';

  const $search = document.querySelector('.search');
  const $list = document.querySelector('.cidades');
  const $listItens = $list.querySelectorAll('li');

  $search.addEventListener('input', (e) => {
    const searchTerm = e.target.value.trim();
    const searchRegex = new RegExp(`(${searchTerm})`, 'gmi');

    $listItens.forEach((item) => {
      if (!searchTerm) return (item.innerHTML = item.textContent);

      item.innerHTML = item.textContent.replace(
        searchRegex,
        '<span class="selected">$1</span>'
      );
    });
  });
})();
