import React from "react"

export default function Intro(props){
    return(
        <div className="intro-box">

        <h1 className="intro-heading">Quizzical</h1>
        <h3 className="intro-text">Celebrities quizz!</h3>
        <button className="intro-btn" onClick={props.start}>Start quiz</button>

        </div>
    )
}