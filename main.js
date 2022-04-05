/* 
    G:
    •	10 quiz-frågor ska alltid hämtas.
    •	Frågorna som hämtas behöver endast vara sant/falskt påståenden.
    •	Användaren kan välja mellan minst tre olika kategorier.
    •	Användaren ska kunna besvara samtliga frågor och sedan klicka på en knapp för att se sitt resultat.
    •	Användaren ska kunna se vilka frågor hen besvarat rätt och/eller felaktigt.
    •	Använd färg och text för att meddela användarens resultat utefter följande kriterier:
        •	<50% - Underkänt (röd)
        •	>50% och <75% - Godkänt (gul/orange)
        •	 > 75% - Mycket väl godkänt (grönt)
    •	Användaren ska kunna göra om quizet och be om nya frågor (utan att behöva refresha/uppdatera hela sidan).

    VG:
    
    •	Alla G-krav
    •	Användaren ska kunna välja svårighetsgrad för frågorna: Lätt, medel eller svår.
    •	Användaren ska kunna välja hur många frågor hen önskar hämta från API:et.
    •	Hen ska kunna välja mellan sant/falskt-påståenden eller “multiple choice”-frågor.
    •	Användaren ska utöver att besvara frågor för quizet, även kunna byta utseende på sidan mellan dark-mode (dvs mörk bakgrundsfärg med ljus text ) och light-mode (ljus bakgrundsfärg med mörk text).
    •	Tekniskt krav: Koden följer “DRY”-tänk (Dont repeat yourself) och är optimerad dvs undviker större upprepningar av kod i logiken.
    •	Tekniskt krav: Använd minst ett externt bibliotek i din applikation.
*/

import { trivia_categories } from './utils.js'
import { game } from './game.js'

$('#checkbox').unbind().click( () => {
    let element = document.body;
    element.classList.toggle('dark'); 
});

$('#getFilters').unbind().click( () => {
    $('#myForm').slideToggle('hide'); 
});

const form = document.querySelector('#myForm');
let getQuestionsBtn = $('#getQuestions');
let gameActivity = $('#profileActivity');

trivia_categories.forEach( (type) => {
    let option = document.createElement('option');
    option.value = type.id;
    option.innerHTML = type.name;
    document.querySelector('#categoryId').append(option);
});

let getData = async (url) => {
    let response = await fetch(url);
    let json = await response.json();
    return json;
};

let rednerQuestionUrl = (array) => {
    let url = `https://opentdb.com/api.php?`;
    if(array.length > 3){
         url += `${array[0][0]}=${array[0][1]}&${array[1][0]}=${array[1][1]}&${array[2][0]}=${array[2][1]}&${array[3][0]}=${array[3][1]}`;
    } else if(array.length > 2){
        url += `${array[0][0]}=${array[0][1]}&${array[1][0]}=${array[1][1]}&${array[2][0]}=${array[2][1]}`;
    } else if (array.length > 1){
        url += `${array[0][0]}=${array[0][1]}&${array[1][0]}=${array[1][1]}`;
    } else {
        url += `${array[0][0]}=${array[0][1]}`;
    }
    return url;
}

let serializeForm =  form => {
	let obj = {};
	let formData = new FormData(form);
	for (let key of formData.keys()) {
		obj[key] = formData.get(key);
	}
	return Object.entries(obj);
};

getQuestionsBtn.on('click', async () => {

    let viewQuestionsUrl = rednerQuestionUrl(serializeForm(form));
    let data = await getData(viewQuestionsUrl);

    if(data.response_code == 0){
        game(data.results);
        gameActivity.show();
    }
    if(data.response_code == 1){
        alert('Not enough questions, Please try less number of questions for this category');
    }
});