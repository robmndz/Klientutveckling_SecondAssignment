let currentQuestion = 0;
let correctAnswers = 0;
let answeredCorrect = [];
let answeredWorng = [];
let correctlyAnswered = $('.answeredCorrect');
let wrongAnswered = $('.answeredWrong');
let quizOver = false;

let displayCurrentQuestion = data => {

   let question = data[currentQuestion].question;
   let questionClass = $('.quizContainer > .question');
   let choiceList = $('.quizContainer > .choiceList');
   let incorroectAnswers = data[currentQuestion].incorrect_answers;
   let numChoices = data[currentQuestion].incorrect_answers.length + 1;
   let shuffled;
   let choice = [];
   //Set the questionClass text to the current question
   $(questionClass).html(question).text();

   //Remove all current class=radio elements (if any)
   $('.radio').remove();
   incorroectAnswers.forEach( answer => {
       choice.push(answer);
   });
   choice.push(data[currentQuestion].correct_answer);
   shuffled = choice.sort(() => Math.random() - 0.5)

   for(let i = 0; i < numChoices; i++){
    $(`<li class="radio">
    <input id="radio${i}" name="radioBtn" type="radio" value="${shuffled[i]}"> 
    <label class="radio" for="radio${i}">${shuffled[i]}</label>
    </li>`)
    .appendTo(choiceList);
    }
};