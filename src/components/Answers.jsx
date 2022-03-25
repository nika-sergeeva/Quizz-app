import React from "react";

function Answers(props) {

    let answerStyles = {}

    if (props.checked && props.correct) {
        answerStyles = {
            backgroundColor: "#94D7A2",
            border: "none",
            cursor: "auto"
        }
    } else if (props.checked && props.heldIncorrect) {
        answerStyles = {
            backgroundColor: "#F8BCBC",
            opacity: 0.5,
            border : "none",
            cursor: "auto"
        }
    }else if (props.checked && !props.correct && !props.heldIncorrect) {
        answerStyles = {
            backgroundColor : "transparent",
            border: "0.794239px solid #4D5B9E",
            color: "#293264",
            opacity: 0.5,
            cursor: "auto"
        }
    } else {
        answerStyles = {
            backgroundColor : props.isHeld ?  "#D6DBF5" : "transparent",
            border: props.isHeld ? "none" : "0.794239px solid #4D5B9E",
            cursor: "pointer"
        }
    }
    return (
        <button className="answer-btn" style={answerStyles} onClick={props.hold}>{props.answer}</button>
    )
}

export default Answers