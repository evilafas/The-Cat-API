const URL = "https://api.thecatapi.com/v1/images/search";
const imgCat = document.querySelector(".catImg");
const btnCat = document.querySelector(".catBtn");
async function generar(){
    const response = await fetch(URL);
    const data = await response.json();
    imgCat.src = data[0].url;
}


