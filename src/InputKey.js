import React from 'react'
import PropTypes from 'prop-types'
import './InputKey.css'

const InputKey = ({clicked, letter, onClick}) => (
    <button className={`inputKey ${clicked}`} onClick={onClick}>{letter}</button>
)

InputKey.propTypes = {
    clicked: PropTypes.bool.isRequired,
    letter : PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
}

export default InputKey