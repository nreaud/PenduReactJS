import React from 'react';
import PropTypes from 'prop-types'
import ToolTip from './ToolTip'
import "./SecretWord.css"

const TXT_TIP_SECRETWORD = "Le mot secret a deviné pour gagner. Les lettres non trouvées apparaissent avec le caractère '_'. Toutes les lettres"
 + " sont en majuscule et sans accent"

const SecretWord = ({secretWordMasked}) => (
    <span className="secretWordContainer">
        <i className="secretWord">{secretWordMasked}</i>
        <i className="CountLettersFound">({secretWordMasked.length} Lettres)</i>        
        <ToolTip text={TXT_TIP_SECRETWORD}/>
    </span>
    
)

SecretWord.propTypes = {
    secretWordMasked: PropTypes.string.isRequired,
}

export default SecretWord;