import React, { useState } from "react";
import * as ReactDOM from "react-dom";

import './styles/styles.scss'

const mockResult = {
    happy: 0.53,
    sad: 0.17,
    angry: 0.3,
}

const Comment = (props) => {
    const { onResultChange } = props;
    const [comment, setComment] = useState('');

    const handleChange = (event) => {
        setComment(event.target.value)
    }

    const handleClick = () => {
        console.log(comment)
        // Connect to back end, get result.
        onResultChange(mockResult)
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
            {Object.entries(result).map((element) => {
                const key = element[0], value= element[1];
                return (
                    <div className="emotion-card">
                        {key}
                        <div className="emotion-rate">{value}</div>
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