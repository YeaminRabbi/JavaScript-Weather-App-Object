const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const forecast = new Forecast();



//updating the UI with dynamic data using api
const updateUI = (data) =>{
    console.log(data);
    const cityDetails = data.cityDetails;
    const weather = data.weather;

    //update details template
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="diplay-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

    //update the night/day & icons images
    const iconSource = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSource);

    
    
    let timeSource = null;
    if(weather.IsDayTime){
        timeSource = 'img/day.svg';
    }
    else{
        timeSource = 'img/night.svg';
    }

    time.setAttribute('src', timeSource);
    //remove the d-none class if DATA present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }


};


const updateCity = async (city) =>{
    const cityDetails = await getCity(city);
    const weather = await getWeather(cityDetails.Key);
    return {
        cityDetails: cityDetails,
        weather: weather
    };
}

cityForm.addEventListener('submit', e =>{
    //prevent default action
    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();
    
    //update the UI with new city
    forecast.updateCity(city).then(data =>{
        updateUI(data);
    }).catch((err)=>{
        console.log(err.message);
    });


    // storing in the local storage
    localStorage.setItem('city', city);
});


if(localStorage.getItem('city')){
    forecast.updateCity(localStorage.getItem('city')).then(data => {
        updateUI(data);
    }).catch(err => {
        console.log(err.message);
    });
}
