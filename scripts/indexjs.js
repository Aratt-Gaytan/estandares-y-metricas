function busca_dato(){
  document.getElementById('boton').className = "boton"
  document.getElementById('boton').className += " animacion"
  axios.get("https://uselessfacts.jsph.pl/random.json?language=en").then((res)=>{
    document.getElementById('dato').innerHTML= '';
    document.getElementById('dato').innerHTML= `
      <span class="subtitulo" id="dato">${res.data.text}</span> 
      `;
  }) 
}

function busca_pais(){
  var pais = document.getElementById('pais').value
  axios.get(`https://restcountries.com/v3.1/name/${pais}`).then((res)=>{
    console.log(res)
    // http://api.weatherstack.com/current?access_key=1b0df2bad382246e03a04bfb6ead9ec1&query=
    // anim_paises
    var len = JSON.stringify(res.data[0]['languages'])
    // len = len.replace("}", " ")
    // len = len.substr(8)
    len = len.replace('":"', " ")
    len = len.replace('{', "")
    len = len.replace('}', "")
    len = len.replace(':', "")
    len = len.replace('""', " ")
    len = len.replace('","', " , ")
    len = len.replace('"', "")
    len = len.replace('"', "")
    len = len.split(" ")
    for(let i = 0; i<len.length; i++){
      if(len[i].toString().length==3){
        len[i] = ''
      }
      
    }
    len = len.join(" ")
    // len = len.substr()
    console.log(len)
    document.getElementById('info_pais').innerHTML=`
      <div class="col-6 ">
        <h2>${res.data[0].name.common}</h2>
        <span class="txt"> Continente: ${res.data[0].continents[0]}</span>
        <span class="txt"> Latitud: ${res.data[0].latlng[0]} Longitud: ${res.data[0].latlng[1]}</span>
        <p class="txt">Capital: ${res.data[0].capital}</p>
        <p class="txt">Lenguaje: ${len}</p>
      </div>
      <div class="col-6 p-3">
        <h2>Bandera:</h2>
        <img src="${res.data[0].flags.png}" alt="---">
        
      </div>
      
    `;
    busca_clima(res.data[0].capital);
  }) 
}

function busca_clima(p){
  url = `http://api.weatherstack.com/current?access_key=1b0df2bad382246e03a04bfb6ead9ec1&query=${p}`;
  axios
    .get(url)
    .then((response) => {
      

      document.getElementById('info_pais').innerHTML += `
        <div class="card mb-1 "  >
          <div class="row g-0">
            <div class="col-md-2">
              <img src="${response.data.current.weather_icons[0]}" class="rounded "  alt="...">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">The time in ${response.data.location.name} is ${response.data.current.weather_descriptions[0]}</h5>
                <p class="card-text" >Temperature ${response.data.current.temperature}°C </p>
                
              </div>
            </div>
          </div>
        </div>

        `;
    })
    .catch((err) => {
      console.log(err);
    });
}

function busca_pelicula(){
  // a
  var pelicula = document.getElementById('pelicula').value
  var npelicula = pelicula.toString().replace(" ", "+");
  axios.get(`https://www.omdbapi.com/?t=${npelicula}&y=2022&apikey=df9de972`)
      .then((res) => {
        console.log(res)
        document.getElementById('pelicula-contenido').innerHTML=`
          <span class="text-center">${res.data.Title} <strong>(${res.data.Year})</strong></span>
          <p class="sinopsis justify-content-start">${res.data.Plot}</p>
          <img src="${res.data.Poster}" width="30%" alt="">
          `
      })

}
