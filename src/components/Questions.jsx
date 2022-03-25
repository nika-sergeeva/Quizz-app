import React from 'react'
import Answers from './Answers'

const Questions = (props) => {

  function hold(id) {
    props.hold(id, props.id)
}

const aElements = props.answers.map(answer => {
    
    return (
        <Answers
        answer={answer.answer}
        isHeld={answer.isHeld}
        hold={() => hold(answer.id)}
        questionId={props.id}
        key={answer.id}
        id={answer.id}
        correct={answer.correct}
        heldIncorrect={answer.heldIncorrect}
        checked={answer.checked}
        />
    )
})
  
  return (
    <div>
        <div className="questions-box">
          <p className="question"> {props.question} </p> 
          <div className="answers-box"> {aElements} </div>
        </div>  
    </div> 
  )
}

export default Questions
