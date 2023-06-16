////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// Fetch ///////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////

document.addEventListener('DOMContentLoaded', async function() {
  const lista = document.getElementById('animes');
  const maximoDigimon = 5;

  const url = `https://digimon-api.vercel.app/api/digimon`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    data.slice(0, maximoDigimon).forEach(digimonData => {
      const li = document.createElement('li');
      li.innerHTML = `
        <p>Los mejores digimones</p>
        <h2 class="aside__nombre--digimon">Nombre: ${digimonData.name}</h2>
        <img class="aside__img--digimon" src="${digimonData.img}" alt="${digimonData.name}">
      `;
      lista.append(li);
    });
  } catch (error) {
    console.log('Error:', error);
  }
});