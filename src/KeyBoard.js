import React, { Component } from 'react'
import InputKey from './InputKey'
import './KeyBoard.css'


export const KEYBOARD_SCND_LINE_FIRST_ID = 10
export const KEYBOARD_THIRD_LINE_FIRST_ID = 20
const KEYBOARD_LAST_ID = 26

class KeyBoard extends Component {

    render() {
        const {handleClick, handleKeyPress, keyBoardRef, letters} = this.props
        const lettersFirstLine = letters.slice(0, KEYBOARD_SCND_LINE_FIRST_ID)
        const lettersSecondLine = letters.slice(KEYBOARD_SCND_LINE_FIRST_ID, KEYBOARD_THIRD_LINE_FIRST_ID)
        const lettersThirdLine = letters.slice(KEYBOARD_THIRD_LINE_FIRST_ID, KEYBOARD_LAST_ID)
        return (
            <div className="keyBoard" onKeyPress={handleKeyPress} ref={keyBoardRef} tabIndex={0}>
                <span className="firstLine">
                    {lettersFirstLine.map( ({letter, clicked}, index) =>
                        <InputKey
                            clicked={clicked} 
                            key={letter}
                            letter={letter}
                            onClick={handleClick(index, 1)}/>
                    )}
                </span>
                <span className="secondLine">
                    {lettersSecondLine.map( ({letter, clicked}, index) =>
                        <InputKey
                            clicked={clicked} 
                            key={index}
                            letter={letter}
                            onClick={handleClick(index, 2)}/>
                    )}
                </span>
                <span className="thirdLine">
                    {lettersThirdLine.map( ({letter, clicked}, index) =>
                        <InputKey 
                            clicked={clicked}
                            key={index}
                            letter={letter}
                            onClick={handleClick(index, 3)}/>
                    )}
                </span>
            </div>
        ) 
    }
}

export default KeyBoard;