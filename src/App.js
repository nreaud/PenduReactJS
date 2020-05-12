import React, { Component, createRef } from 'react';
import KeyBoard, {KEYBOARD_SCND_LINE_FIRST_ID, KEYBOARD_THIRD_LINE_FIRST_ID} from './KeyBoard'
import Drawing, {FAILURES_MAX, FAILURES_MIN}  from './Drawing'
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import RangeSlider from 'react-bootstrap-range-slider';
import ReplayButton from './ReplayButton'
import SecretWord from './SecretWord'
import words from './resources/commonWords.json'
import './App.css'; 

const TXT_TIP_GAME = "Trouvez le mot secret avant d'être pendu, pour cela saisissez des lettres, si la lettre est présente dans le mot"
 + "elle s'affiche (si elle est présente, plusieurs fois, s'affiche autant de fois), sinon le dessin du pendu s'avance, si vous trouvez"
 + "le mot secret avant d'être pendu c'est gagné, sinon c'est perdu."
const TXT_TIP_HANGEDMAN = "Une fois les dessins de la potence et du bonhomme complétés, c'est perdu"
const TXT_TIP_KEYBOARD = "Cliquer sur les lettres ou utilsez votre clavier afin de suggérer des lettres"
const TXT_TIP_SIZE_SUGGEST = "Choisissez le nombre de tentative maximum pour le mot que vous souhaitez faire deviner ci-dessus"
const TXT_TIP_SUGGESTION = "Faîtes devinez le mot de votre choix, la saisie peut se faire en minuscule, et avec accents, le mot"
 +"a deviné sera traduit en majuscule et sans accent"
const VISUAL_PAUSE_MSECS = 750

class App extends Component {

  LETTERS_RGX = /[A-Z]/g //g for global (replace all characters not only first one)

  constructor(props){
    super(props);
    const initSecretWord = this.getRandomWord()
    this.keyBoardRef = createRef()
    this.focusElement = "keyBoard"
    this.wasNextFailuresMaxSet = false
    const initFailuresMax = this.getNbFailures(initSecretWord.length)
    this.state = {
      drawingStartingImgIndex: FAILURES_MAX - initFailuresMax,
      failures: 0,
      failuresMax: initFailuresMax,
      inputSecretWord: "",
      letters: this.initLetters(),
      nextFailuresMax: FAILURES_MAX,
      secretWord: initSecretWord,
      secretWordMasked: this.mask(initSecretWord),
    }
  }

  componentDidMount(){
    this.focus(this.keyBoardRef)
  }

  componentDidUpdate(){
    if(this.focusElement==="keyBoard"){
      this.focus(this.keyBoardRef)
    }
  }

  focus(element) {
    if(element){
      element.focus()
    }
  }

  initLetters(){
    return [
      {letter: 'A', clicked: false},
      {letter: 'Z', clicked: false},
      {letter: 'E', clicked: false},
      {letter: 'R', clicked: false},
      {letter: 'T', clicked: false},
      {letter: 'Y', clicked: false},
      {letter: 'U', clicked: false},
      {letter: 'I', clicked: false},
      {letter: 'O', clicked: false},
      {letter: 'P', clicked: false},
      {letter: 'Q', clicked: false},
      {letter: 'S', clicked: false},
      {letter: 'D', clicked: false},
      {letter: 'F', clicked: false},
      {letter: 'G', clicked: false},
      {letter: 'H', clicked: false},
      {letter: 'J', clicked: false},
      {letter: 'K', clicked: false},
      {letter: 'L', clicked: false},
      {letter: 'M', clicked: false},
      {letter: 'W', clicked: false},
      {letter: 'X', clicked: false},
      {letter: 'C', clicked: false},
      {letter: 'V', clicked: false},
      {letter: 'B', clicked: false},
      {letter: 'N', clicked: false}
    ]
  }

  getNbFailures(sizeSecretWord){
    let nbFailures = FAILURES_MIN
    if(sizeSecretWord > FAILURES_MIN && sizeSecretWord<= FAILURES_MAX){
      nbFailures=sizeSecretWord
    }else if(sizeSecretWord>FAILURES_MAX){
      nbFailures = FAILURES_MAX
    }
    return nbFailures
  }

  getRandomWord(){
    const maxIndex = words.length-1
    const randomIndex = Math.floor(Math.random() * maxIndex);
    return words[randomIndex]
  }

  //Double Arrow to bind 'this'
  handleChangeInputSecretWord = (event) => {
   this.focusElement = "suggestNewWord"
   this.setState({inputSecretWord: event.target.value})
 }

 //Double Arrow to bind 'this'
 handleChangeSlider = (event) => {
   this.wasNextFailuresMaxSet = true
   //this.setValue(event.target.value)
   this.setState({nextFailuresMax: parseInt(event.target.value)})
 }

  //Double Arrow to bind 'this'
  handleClick = (index, lineKeyBoard) => any => {
    this.focusElement = "keyBoard"
    let realIndex = index
    switch(lineKeyBoard) {
        case 2:
            realIndex += KEYBOARD_SCND_LINE_FIRST_ID
            break;
        case 3:
            realIndex += KEYBOARD_THIRD_LINE_FIRST_ID
            break;
        default:
    }
    this.updateKeyPressed(realIndex)
  }

  //Double Arrow to bind 'this'
  handleKeyPress = (event) => {
    this.focusElement = "keyBoard"
    const letterPressed = event.key.toUpperCase()
    const index = this.state.letters.findIndex(letterObj => letterObj.letter === letterPressed)
    if(index !==-1){
     this.updateKeyPressed(index)
    }

  }

  mask(secretWord){
    let res = ""
    if(secretWord !== undefined){
      res = secretWord.replace(this.LETTERS_RGX, "_")
    }
    return res
  }

  //Double Arrow to bind 'this'
 handleSubmitNewSecretWord = (event) => {
   this.focusElement="keyBoard"
   this.setState(this.reInitStateWithNewSecretWord())
   event.preventDefault() // prevent refreshing page on submit
 }

 reInitState(){
   const initSecretWord = this.getRandomWord();
   this.wasNextFailuresMaxSet = false
   const initFailuresMax = this.getNbFailures(initSecretWord.length)
   return { //state
     drawingStartingImgIndex: FAILURES_MAX - initFailuresMax,
     failures: 0,
     failuresMax: initFailuresMax,
     letters: this.initLetters(),
     nextFailuresMax: FAILURES_MAX,
     secretWord: initSecretWord,
     secretWordMasked: this.mask(initSecretWord),
   }
 }

 reInitStateWithNewSecretWord(){
  const newSecretWord = this.unaccent(this.state.inputSecretWord).toUpperCase()
  let newFailuresMax
  if(this.wasNextFailuresMaxSet){
    newFailuresMax = this.state.nextFailuresMax
  }else {
    newFailuresMax = this.getNbFailures(newSecretWord.length)
  }
  this.wasNextFailuresMaxSet = false
  return { //state
    drawingStartingImgIndex: FAILURES_MAX - newFailuresMax,
    failures: 0,
    failuresMax: newFailuresMax,
    inputSecretWord: "",
    letters: this.initLetters(),
    nextFailuresMax: FAILURES_MAX,
    secretWord: newSecretWord,
    secretWordMasked: this.mask(newSecretWord),
  }
}

   //Double Arrow to bind 'this'
  replay = () => {
	  this.focusElement="keyBoard"
    this.setState(this.reInitState())
  }

  setValue(value){
    this.setState({nextFailuresMax: value})
  }

  unaccent(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  }

  updateKeyPressed(index) {
    const {failures, failuresMax, letters, secretWord} = this.state
    let alreadyClicked = false;
    
    alreadyClicked = letters[index].clicked
    if(!alreadyClicked){
      letters[index].clicked = true
      this.setState({letters : letters})

      let newLetter = letters[index].letter
      if(!secretWord.includes(newLetter)){
        const failuresInc = failures+1
        this.setState({failures: failuresInc})
        if(failuresInc===failuresMax){
          setTimeout(() => this.setState({failures: failuresInc+1}), VISUAL_PAUSE_MSECS) //to load lost image
        }
      }
      this.updateSecretWord(newLetter)
    }
  }

  updateSecretWord(newLetter){
    const {secretWord, secretWordMasked} = this.state
    if(secretWord.includes(newLetter) && !(secretWordMasked.includes(newLetter))){
      const newLetterIndices = secretWord
        .split('')
        .map((letter, index) => [letter, index])
        .filter(letterPos => letterPos[0] === newLetter )
        .map(letterPos => letterPos[1])
      let newSecretWordMasked = ""  
      secretWordMasked.split('').forEach(
        (letter, index) => newLetterIndices.includes(index) ? 
                              newSecretWordMasked = newSecretWordMasked + secretWord.charAt(index)
                              : newSecretWordMasked = newSecretWordMasked + letter
      )
      this.setState({secretWordMasked: newSecretWordMasked})
    }
  }

  render(){
    const {drawingStartingImgIndex, failures, failuresMax, letters, nextFailuresMax, secretWord, secretWordMasked} = this.state
    const won=!secretWordMasked.includes("_")
    const lost= (!won && failures>=failuresMax)
    const indexHangedMan = failures+drawingStartingImgIndex
    const attemptsLeft = FAILURES_MAX - indexHangedMan
    console.log("indexHangedMan: "+indexHangedMan)
    console.log("attempts left: "+attemptsLeft)
        return (
      <div className="theHangedMan">
        <div className="game">
          <Drawing attemptsLeft={attemptsLeft} indexImg={indexHangedMan}/>
          <SecretWord secretWordMasked={secretWordMasked}/>
          {(!won && !lost) ? (
            <KeyBoard
              handleClick={this.handleClick}
              handleKeyPress={this.handleKeyPress}
              keyBoardRef={element => this.keyBoardRef=element}
              letters={letters}
            />)
            : (<ReplayButton replayFunction={this.replay} secretWord={secretWord} won={won}/>)
          }
        </div>
        <ul className="menu">
          <h1 className="title">2 Joueurs</h1>
          <li className="option">Faites deviner un mot</li>
          <form onSubmit={this.handleSubmitNewSecretWord} className="suggestWord">
            <input onChange={this.handleChangeInputSecretWord} type="text" value={this.state.inputSecretWord} />
            <input type="submit" value="→" />
            <li className="option">Nombre d'erreurs maximum</li>
            <RangeSlider 
              max={FAILURES_MAX}
              min={FAILURES_MIN}
              onChange={this.handleChangeSlider}
              tooltip="on"
              value={nextFailuresMax} 
            />
          </form>
        </ul>
      </div>
    );
  }
}

export default App;
