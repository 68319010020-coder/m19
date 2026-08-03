const weatherBox = document.getElementById("weather");
const loading = document.getElementById("loading");

async function getWeather(){

const lat=document.getElementById("lat").value;
const lon=document.getElementById("lon").value;

if(lat==="" || lon===""){

alert("กรุณากรอก Latitude และ Longitude");

return;

}

loading.innerHTML="⏳ กำลังโหลด...";

weatherBox.innerHTML="";

const url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,windspeed_10m,weather_code`;

try{

const response=await fetch(url);

const data=await response.json();

loading.innerHTML="";

const weather=data.current;

const icon=getIcon(weather.weather_code);

weatherBox.innerHTML=`

<div class="icon">${icon}</div>

<div class="temp">${weather.temperature_2m}°C</div>

<div>💧 ความชื้น ${weather.relative_humidity_2m}%</div>

<div>🌬 ลม ${weather.windspeed_10m} km/h</div>

<div>📍 Latitude ${lat}</div>

<div>📍 Longitude ${lon}</div>

`;

changeBackground(weather.weather_code);

}catch(error){

loading.innerHTML="";

weatherBox.innerHTML="เกิดข้อผิดพลาด";

}

}

function getIcon(code){

if(code===0)return "☀️";

if(code<=3)return "⛅";

if(code<=48)return "☁️";

if(code<=67)return "🌧";

if(code<=77)return "❄️";

if(code<=82)return "🌦";

if(code<=99)return "⛈";

return "🌍";

}

function changeBackground(code){

let image="";

if(code===0){

image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1500";

}

else if(code<=3){

image="https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=1500";

}

else if(code<=67){

image="https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=1500";

}

else{

image="https://images.unsplash.com/photo-1500375592092-40eb2168fd21?w=1500";

}

document.body.style.background=`url(${image}) center/cover`;

}