

const weatherform = document.querySelector(".weatherform");
const cityinput = document.querySelector(".cityinput");
const card = document.querySelector(".card");
const apikey = "f40a53769446ee99e22ca3ff514a756c";


weatherform.addEventListener("submit", async event => {
        event.preventDefault();
        const city = cityinput.value;
        if (city) {
            try{
                const weatherdata = await gerweatherdata(city);
                displayweatherinfo(weatherdata);
            }
            catch(error){
                
                errordisplay(error);
            }
        }
        else {
            displayerror("اكتب اسم مدينه ياعم");
        }
    });
async function gerweatherdata(city) {
    const apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiurl);
    if(!response.ok){
        displayerror("دخل مدينه عدله ياسطا ");

    }
    return await response.json();
}
function displayweatherinfo(data){
const {name:city, main:{temp, humidity},weather:[{description,id}]} =data;
card.textContent = "";
card.style.display = "flex";
const citydisplay = document.createElement("h1");
const tempdisplay = document.createElement("p");
const humiditydisplay = document.createElement("p");
const descdisplay = document.createElement("p");
const weatheremoji = document.createElement("p");

 
citydisplay.textContent = city;
tempdisplay.textContent = `${temp}k`;
humiditydisplay.textContent = `humidity:${humidity}%`;
descdisplay.textContent = description;
weatheremoji.textContent = gerweatheremoji(id);
citydisplay.classList.add("citydisplay");
tempdisplay.classList.add("citydisplay");
humiditydisplay.classList.add("humiditydisplay");
descdisplay.classList.add("discdisplay");
weatheremoji.classList.add("wheatheremoji");
card.appendChild(citydisplay);
card.appendChild(tempdisplay);
card.appendChild(humiditydisplay);
card.appendChild(descdisplay);
card.appendChild(weatheremoji);










}
function gerweatheremoji(weatherId){
    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "☔";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌫️";
        case (weatherId === 800):
            return "☀️";
        case (weatherId >= 801 && weatherId < 810):
            return "🌤️";
        default:
            return "❓";
    }


}

function displayerror(message){
const errordisplay = document.createElement("p");
errordisplay.textContent = message;
errordisplay.classList.add("errordisplay");
card.textContent = "";
card.style.display = "flex";
card.appendChild(errordisplay);

}







