const URL = "https://api.thecatapi.com/v1/images/search";
const URL_FAVORITES = "https://api.thecatapi.com/v1/favourites?api_key=live_ix5mihYCwVOyRnSy0dqZNwFqXJB7mRlmIjZYAaRfoQnL5uguVb8riHOPKxapVtZl";
const imgCat = document.querySelector(".catImg");
const btnCat = document.querySelector(".catBtn");
const containerFavoritos = document.querySelector(".favorites");
const guardarFav = document.querySelector("#guardarFav");

async function generar(){
    const response = await fetch(URL);
    const data = await response.json();
    imgCat.src = data[0].url;
    guardarFav.addEventListener('click',()=>{
        saveMichis(data[0].id);
        loadMichisFavoritos()
    })
}





async function saveMichis(id){
    const res = await fetch(URL_FAVORITES,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const data = await res.json()
    

    console.log('save');
    console.log(res);
    
}

async function loadMichisFavoritos(){
    const res = await fetch(URL_FAVORITES);
    const data = await res.json();
    console.log(data);
    let contadorMichi = 0;
    containerFavoritos.innerHTML = "";
    data.forEach(michi =>{

        containerFavoritos.innerHTML +=`
        <div class="favCard">
            <img src="${michi.image.url}">
            <i class="fa-solid fa-heart-crack" style="color: #ff0000;" onclick="eliminarMichi(${michi.id})"></i>
            <h2>Michi #${++contadorMichi}</h2>
        </div>
        `

    })

    
    
}

async function eliminarMichi(id){
    const URL_DELETE_FAVORITES = `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_ix5mihYCwVOyRnSy0dqZNwFqXJB7mRlmIjZYAaRfoQnL5uguVb8riHOPKxapVtZl`;
    const res = await fetch(URL_DELETE_FAVORITES,{
        method: 'DELETE'
    });
    const data = await res.json()

    if(res.status !== 200){
        console.log('Hubo un error: ' + res.status + data.message);
    }

    loadMichisFavoritos()
}

loadMichisFavoritos()
generar()