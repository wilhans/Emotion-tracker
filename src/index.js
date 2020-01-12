import React, { useState } from "react";
import * as ReactDOM from "react-dom";

import './styles/styles.scss'

const Comment = (props) => {
    const { onResultChange } = props;
    const [comment, setComment] = useState('');

    const handleChange = (event) => {
        setComment(event.target.value)
    }

    const handleClick = () => {
        fetch('/emote_rate', {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                comment: comment
            })
        }).then((res) => res.json())
            .then((retval) => {
                onResultChange(retval)
            });
    }

    return (
        <div className="comment-wrapper">
            <div>Enter some comments:</div>
            <textarea className="comment-input" onChange={handleChange}/><br />
            <button className="analyze" onClick={handleClick}>Analyze</button>
        </div>
    )
};

const Suggestion = (props) => {
    const { result } = props;
    return (
        <div className="result-wrapper">
            Emotion rate
            {result.map((element, index) => {
                const label = element.label, score= element.score;
                return (
                    <div className="emotion-list" key={`emotion-${index}`}>
                        <div className="emotion-label">{label}</div>
                        <div className="emotion-rate">{score}</div>
                    </div>
                )
            })}
        </div>
    )
};

const App = () => {
    const [result, setResult] = useState(null);

    const onResultChange = (result) => {
        setResult(result)
    }

    return <div className="app-container">
        <Comment onResultChange={onResultChange}/>
        {result && <Suggestion result={result}/>}
    </div>;
};
  
ReactDOM.render(
    <App />,
    document.getElementById('root')
);