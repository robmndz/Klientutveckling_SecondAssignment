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

let resetQuiz = () => {
    $('#nextButton').text('Next Question');
    $('.quizMessage').hide();
    hideCorrectAndWrongAnswers();
    $('.correct-wrong').remove();
    quizOver = false;
    currentQuestion = 0;
    correctAnswers = 0;
    $('#myBar').css('width', '0%');
    answeredCorrect = [];
    answeredWorng = [];
    hideScore();
}

let displayScore = (data) => {
    let score = (correctAnswers/data.length)*100;
    let result = $('.quizContainer > .result');
    if(score < 50){
        result.text(Hard luck, you failed! Your score is: ${score});
        result.css('background', '#FE703E');
    } else if (score <75){
        result.text(You passed! Your score is: ${score});
        result.css('background', '#FFA500');
    } else {
        result.text(Well Done, you passed! Your score is: ${score});
        result.css('background', '#27D90D');
    }
    result.show();
}

let hideScore = () => {
    $('.result').hide(); 
}

let hideCorrectAndWrongAnswers = () => {
    $('#correctlyAnswered').hide();
    $('#wronglyAnswered').hide();
}

let showCorrectAndWrongAnswers = () => {
    $('#correctlyAnswered').show();
    $('#wronglyAnswered').show();
}