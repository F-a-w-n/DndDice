import React, {useEffect, useState} from 'react';
import Button from './Button';

function App() {
  const [hist, setHistory] = useState({list : []});
  const [roll, setRoll] = useState('Click a die to roll!');
  const [many, setMany] = useState(1);
  
  const random = (dice) => {
    const roll = Math.floor(Math.random() * dice + 1);
    let h = hist.list;
    if (h.length >= 10) {
      h.pop();
    } 
    h.unshift('d'+dice+": "+roll);
    setHistory({list: h});
    return {dice, roll};
  }

  const clickHandler = (die) => {
    let rolls = '';
      for (let i = 0; i < many; i++) {
        let roll = random(die);
        if (i==0) {
          rolls+= 'd'+roll.dice+': ';
        }
        rolls += roll.roll + ', ';
      }
    setRoll(rolls.substring(0,rolls.length-2));
  }


  useEffect(() => {
    console.log(hist.list)
  }, [hist]);

  const clear = () => {
    setHistory({list: []});
    setRoll('Click a die to roll!');
  }

  const keyHandler = (e) => {
    if (e.key === "c" || e.key === "C") {
      clear();
    }
  }

  const sliderHandler = () => {
    setMany(document.getElementById('slider').value);
  }

  useEffect(() => {
    window.addEventListener('keydown', keyHandler, false);
    return () => window.removeEventListener('keydown', keyHandler, false);
    }, []);

  return (
    <div className="App">
      <div className = 'titlebar'>
        <span id='title'>DND Dice</span><br></br>
        <span id='roll'>{roll}</span>
      </div>
      <div className='btncontainer'>
        <Button image="dice_4.png" clickEvent={() => clickHandler(4)} />
        <Button image="dice_6.png" clickEvent={() => clickHandler(6)} />
        <Button image="dice_8.png" clickEvent={() => clickHandler(8)} />
        <Button image="dice_10.png" clickEvent={() => clickHandler(10)} />
        <Button image="dice_12.png" clickEvent={() => clickHandler(12)} />
        <Button image="dice_20.png" clickEvent={() => clickHandler(20)} />
      </div>
      <div className='history' title='press C or double click to clear history' onDoubleClick={clear}>
        <p>{(hist.list.length != 0)? 'Roll History:' : ''}</p>
        <ul id='histlist'>
          {hist.list.map((roll, ind) => (
            <li key={ind}>{ roll }</li>//
          ))}
        </ul>
      </div>
      <div className='slidercontainer'>
            <p>Repeat Rolls: {many}</p>
            <input type='range' min='1' max='10' onChange={sliderHandler} id='slider'></input> 
      </div>
    </div>
  );
}

export default App;
