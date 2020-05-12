import React from 'react'
import PropTypes from 'prop-types'
import './ReplayButton.css'

const ReplayButton = ({secretWord, replayFunction, won}) => (
    <div className="replayContainer">
        <p className={`endMessage ${won}`}>{won ? "Félicitations!" : "Désolé... Le mot était "+secretWord}</p>
        <input autoFocus className="replayButton" onClick={replayFunction} type="submit" value="⟲"/>
    </div>
)

ReplayButton.propTypes = {
    secretWord: PropTypes.string.isRequired,
    replayFunction: PropTypes.func.isRequired,
    won: PropTypes.bool.isRequired,
}

export default ReplayButton