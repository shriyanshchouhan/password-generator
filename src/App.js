import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Pw_Genereator_App() {
  const [length, setlength] = useState(8);
  const [haschar, setHasChar] = useState(false);
  const [hasnum, setHasNum] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (hasnum) alphabets += "0123456789";
    if (haschar) alphabets += `!@#$%^&*()_+-=}{[]';:/.,<>?"~`;

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * alphabets.length + 1);
      pass += alphabets.charAt(char);
    }
    setPassword(pass);
  }, [length, haschar, hasnum, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, haschar, hasnum, passwordGenerator]);

  const copyPassword = useCallback(() => {
    let shc = document.querySelector(".inputBox button")
    shc.innerHTML = " Copied!! "
  	shc.style.backgroundColor = "#07BC0C";
    window.navigator.clipboard.writeText(password);
    toast.success('Password Coppied!', {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      });
      setTimeout(() => {
        passwordGenerator()
      }, 4000);
  }, [password]);

  const Input = () => {
    return (
      <>
        <div className="inputBox">
          <input type="text" value={password} readOnly useRef={password} />
          <button onClick={copyPassword}>Copy Password</button>
        </div>
      </>
    );
  };
  const LenRange = () => {
    return (
      <div className="lengthRange">
        <input
          className="range"
          type="range"
          name="Length"
          value={length}
          onChange={(e) => {
            setlength(e.target.value);
          }}
          min={6}
          max={16}
        />
        <label className="Length">Length : {length}</label>
      </div>
    );
  };
  const Checkbox = () => {
    return (
      <>
        <div className="checkboxs">
          <div className="hasNumber">
            <input
              className="dabba"
              type="checkbox"
              name="NumAllowed"
              defaultChecked={hasnum}
              onChange={() => {
                setHasNum((prev) => !prev);
              }}
            />
            <label htmlFor="Length">Include Number</label>
          </div>
          <div className="hasCharacter">
            <input
              className="dabba"
              type="checkbox"
              name="CharAllowed"
              defaultChecked={haschar}
              onChange={() => {
                setHasChar((prev) => !prev);
              }}
            />
            <label htmlFor="Length">Include Character</label>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="App">
      <div className="Main__container">
        <span className="Header">Password Generator</span>
        <Input />
        <LenRange />
        <Checkbox />
        <ToastContainer/>
      </div>
    </div>
  );
}

export default Pw_Genereator_App;
