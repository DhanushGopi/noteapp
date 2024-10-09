import './App.css';
import { useEffect, useRef, useState } from 'react';
import Footer from './Footer';

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => { getnote() }, []); // to trigger the getnote func

  const getnote = async () => {
    let res = await fetch("http://localhost:3001/getnote");
    let resdata = await res.json();
    setNotes(resdata);
  }

  let todonote = useRef();
  let now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let currenttime = `${hours}:${minutes}:${seconds}`;
  const addnote = async () => {
    if (todonote.current.value == '' || todonote.current.value == ' ') {
      alert("No Notes");
    } else {
      var note = {
        "time": currenttime,
        "todonote": todonote.current.value,
      }
      await fetch('http://localhost:3001/addnote',
        {
          method: "POST",
          body: JSON.stringify(note),
          headers: { "content-type": "application/json" }
        });
      getnote();
      document.querySelector(".addinput").value = "";
    }


  }

  const removenote = async (id) => {
    let res = await fetch('http://localhost:3001/removenote?id=' + id,
      { method: "DELETE" });
    getnote();
  }

  const darktheme = () => {
    document.querySelector(".App").classList.add('darkmode');
    document.querySelector(".darkbtn").classList.add('hidebtn');
    document.querySelector(".lightbtn").classList.remove('hidebtn');

  }
  const lighttheme = () => {
    document.querySelector(".App").classList.remove('darkmode');
    document.querySelector(".lightbtn").classList.add('hidebtn');
    document.querySelector(".darkbtn").classList.remove('hidebtn');
  }

  return (
    <div className="App">
      <div className='notesadd'>
        <h1 className='todo'>TODO</h1>
        <input type='text' className='addinput' ref={todonote} placeholder='Enter the text' />
        <input type='button' className='addbtn btn' value="Add" onClick={addnote} />
        <span class="material-symbols-outlined darkbtn themebtn" onClick={darktheme}>dark_mode</span>
        <span class="material-symbols-outlined lightbtn hidebtn themebtn" onClick={lighttheme}>light_mode</span>
      </div>
      <div className='shownotes'>
        {
          notes.map((note, index) => {
            return (
              <div className='shownote'>
                <div className='showmsg'>
                  <p key={index}>{note.todonote}</p>
                  <button className='dltbtn btn' onClick={() => removenote(note._id)}>Remove</button>
                </div>
                <p className='notetime'> {note.time}</p>
              </div>
            )
          })
        }
      </div>
      <Footer />
    </div>
  );
}

export default App;
