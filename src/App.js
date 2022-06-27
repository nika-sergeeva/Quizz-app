import { nanoid } from "nanoid";
import React, {useState} from "react"
import './App.css';
import Intro from "./components/Intro";
import Questions from "./components/Questions";

function App() {

const [startGame, setStartGame] = useState(false)
const [allQuestions, setAllQuestions] = useState()
const [score, setScore] = useState(0)
const [gameOver, setGameOver] = useState(false)
const [newGame, setNewGame] = useState(0)

//start the game
function setTheGame() {
      setStartGame(true)

}
function playAgain(){
setNewGame(prev => prev +1)
setScore(0)
setGameOver(false)
}
//to change ''isHeld''
function hold(answerId, questionId){
setAllQuestions(prevQ => prevQ.map(question => {
   if(question.id === questionId){
  const listAnswers = question.answers.map(answer => {
     if(answer.id === answerId || answer.isHeld){
      return ({
          ...answer,
          isHeld: !answer.isHeld
      })
  }else { return answer}
})
return ({
  ...question,
  answers: listAnswers
})
 }else { return question }
  }))
}

//to 'check' 
function checkAnswers() {
  setAllQuestions(prevQ => prevQ.map(question => {
      const checkedAnswers = question.answers.map(answer => {
          if(answer.isHeld && !answer.correct) {
              return ({
                  ...answer,
                  heldIncorrect: true,
                  checked: true
              })
          } else if(answer.isHeld && answer.correct) {
              setScore(prevScore => prevScore + 1)
              return({
                  ...answer,
                  heldCorrect: true,
                  checked: true
              })
          } else {
              return({
                  ...answer,
                  checked: true
              })
          }
      })
      return ({
          ...question,
          answers: checkedAnswers
      })
  }))
  setGameOver(true)
}


//to set the answers
function settingAnswers(listAnswers, correctAnswer) {
  return listAnswers.map(answer => {
      return ({
          isHeld: false,
          answer: answer,
          correct: answer === correctAnswer ? true : false,
          id: nanoid(),
          heldIncorrect: false,
          checked: false,
      })
  })
 }


React.useEffect(() =>{ 
    async function getQuizz() {
    const res = await fetch("https://opentdb.com/api.php?amount=5&category=26&difficulty=easy&type=multiple")
    const data = await res.json()
    setAllQuestions(
      data.results.map(item =>{
      return  {
        "id": nanoid(),
        "question": item.question, 
        "correctAnswer":item.correct_answer,
        "answers": settingAnswers([item.correct_answer, ...item.incorrect_answers].sort(() => Math.random() - 0.5), item.correct_answer)
        }
      }
      ))
}
getQuizz() 
 
   }, [newGame] )


return (
  <div className="App">
    

{startGame  
?  
<main>
<div className="main">

    
{allQuestions.map( item => {
  return <Questions 
  question={item.question} 
  id={item.id} 
  key={item.id} 
  answers={item.answers}
  hold={hold}
  />

})}   
                 
<div className="nav-box">
  {gameOver ?
   <><p className="scored">You scored {score}/5 correct answers</p> <button className="quizz-new nav-btn" onClick={playAgain}>New Quizz</button> </>
   : 
   <button className="quizz-btn nav-btn" onClick={checkAnswers}> Check answers </button>}
</div>
          
</div> 
</main>
:
<Intro start={setTheGame}/> 
}

   
  </div>
);
}



export default App;
