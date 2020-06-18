import { default as Landmark } from './landmark.js';  
import { default as General } from './general.js';   
import { default as Music } from './music.js';  
import { default as Science } from './science.js'; 


const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const gameStatusNotice = document.getElementById('game-status');
const questionTypeSelection = document.getElementById('questions-topic');

let shuffledQuestions, currentQuestionIndex;

if(startButton.innerText == 'Start') {
  gameStatusNotice.classList.add('hide');
}

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex ++;
  setNextQuestion()
});

function startGame() {
  const quest = document.getElementById('questions-topic').value;
  let questionss; // Questions Pool Variable 
  
  switch(quest) {
    case 'general':
      questionss = General;
      break;
    case 'science':
      questionss = Science;
      break;
    case 'music':
      questionss = Music;
      break;
    default:
      questionss = Landmark;
  }
  
  gameStatusNotice.classList.add('hide');
  startButton.classList.add('hide');
  questionTypeSelection.classList.add('hide');
  shuffledQuestions = questionss.sort(() => Math.random() - .5);
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
};

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
};

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  })
};

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
};

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    startButton.innerText = 'Restart';
    startButton.style.backgroundColor = '#527543';
    gameStatusNotice.classList.remove('hide');
    startButton.style.color = 'white';
    startButton.style.width = '60%';
    questionTypeSelection.classList.remove('hide')
    questionContainerElement.classList.add('hide');
    startButton.classList.remove('hide');
    setInterval(displayGameOver, 4000);
  }
};

function displayGameOver() {
  gameStatusNotice.classList.add('hide');
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
};

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
};

