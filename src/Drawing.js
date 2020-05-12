import React from 'react';
import PropTypes from 'prop-types'
import pendu1 from './resources/pendu1.png'
import pendu2 from './resources/pendu2.png'
import pendu3 from './resources/pendu3.png'
import pendu4 from './resources/pendu4.png'
import pendu5 from './resources/pendu5.png'
import pendu6 from './resources/pendu6.png'
import pendu7 from './resources/pendu7.png'
import pendu8 from './resources/pendu8.png'
import pendu9 from './resources/pendu9.png'
import pendu10 from './resources/pendu10.png'
import pendu11 from './resources/pendu11.png'
import perdu from './resources/perdu.png'
import "./Drawing.css"

const images=[
    pendu1,
    pendu2,
    pendu3,
    pendu4,
    pendu5,
    pendu6,
    pendu7,
    pendu8,
    pendu9,
    pendu10,
    pendu11,
    perdu,
]

const Drawing = ({attemptsLeft, indexImg}) => (
    <div>
        <img className="drawing" src={images[indexImg]} alt="pendu"/>       
        {attemptsLeft > 0 && <i>{attemptsLeft} tentatives restantes</i>}
    </div>
)

Drawing.propTypes = {
    attemptsLeft: PropTypes.number.isRequired,
    indexImg: PropTypes.number.isRequired,
}

export default Drawing;
export const FAILURES_MAX = 10
export const FAILURES_MIN = 6