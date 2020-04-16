/* Global Variables */

// Create a new date instance dynamically with JS
window.onload = function() {
    let zipcodeEle = document.getElementById('zip');
    let generate = document.getElementById('generate');
    let feelings = document.getElementById('feelings');
    let date = document.getElementById('date');
    let temp = document.getElementById('temp');
    let content = document.getElementById('content');

    const apiKey = '07a3fa302f822bfb770354e58211f15d'
    const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
    
    generate.onclick = async function getWeatherData(){
       let zipcode = zipcodeEle.value;
       const url = `${BASE_URL}?zip=${zipcode}&appid=${apiKey}`;
        try {
            let data = await fetch(url);
            await addApiData(data)
        }
        catch(e) {
            console.log(e);
        }
    }
    
    async function addApiData(data){
        data.json().then((i)=>{

            let data = {
                temperature: i.main.temp,
                date: i.dt,
                user_response: feelings.value
            }

            makeServerRequest(data);
        })

    }

    async function makeServerRequest(data) {
        await fetch('/addData', {
            method: 'post', 
            body: JSON.stringify(data)
        }).then(fetchData)
    }
  
    
    async function fetchData(){
        return fetch('/getData')
            .then(updateUI)
    }

    async function updateUI(res) {
        res.json().then(function(res){
            date.innerHTML = res.date;
            temp.innerHTML = res.temperature;
            content.innerHTML = res.user_response;
        })
     }
}