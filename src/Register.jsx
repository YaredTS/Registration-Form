import React, {useState,useEffect,useRef} from 'react';
import {faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

function Register() {
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])
// if we don't need the result to log to console you could right it like  setValidName(USER_REGEX.test(user));

    useEffect(() => {
        const result = PWD_REGEX.test(pwd); 
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatch(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

  return (
    <section>
     <p ref={errRef} 
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live='assertive'>
    </p>
    <h1>Register</h1>
    <form>
        <label htmlFor="username">
            Username:
            <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}/>
            </span>
            <span className={validName || !user ? "hide" : "invalid"}>
{/* if validName is true or !user means no username has been entered the hide class is applied */}
                <FontAwesomeIcon icon={faTimes}/>
            </span>
        </label>
        <input 
            type="text"
            id='username'
// for accessibility or direct DOM manipulation
            ref={userRef} 
//ref input when component is mounted
            autoComplete='off'
            onChange={(e) => setUser(e.target.value)}
// update user when ever input value change
            required
            aria-invalid={validName ? "false" : "true"}
// validName is true aria-invalid will be false
            aria-describedby='uidnote'
// link input to descriptive element with id
            onFocus={() => setUserFocus(true)}
// trigger when input gain on focus
            onBlur={() => setUserFocus(false)}
        />
        <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen" }>
            <FontAwesomeIcon icon={faInfoCircle}/>
            4 to 24 characters. <br/>
            Must begin with a letter. <br/>
            Letters, numbers, underscores, hyphens allowed.
        </p>

        <lab el htmlFor="password">
            Password:
            <span className={validPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}/>
            </span>
            <span className={validPwd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes}/>
            </span>
        </lab>
        <input 
        type="password"
        id='password'
        onChange={(e) => setPwd(e.target.value)}
        required
        aria-invalid={validPwd ? "false" : "true"}
        aria-disabled= "pwdnote"
        onFocus={() => setPwdFocus(true)}
        onBlur={() => setPwdFocus(false)}
         />
         <p id='pwdnote' className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle}/>
            8 to 24 characters. <br />
            Must include uppercase and lowercase letters, a number and special character. <br />
            Allowed special character: 
            <span aria-label='exclamation mark'>
                !
            </span>
            <span aria-label='at symbol'>
                @
            </span>
            <span aria-label='hashtag'>
                #
            </span>
            <span aria-label='dollar sign'>
                $
            </span>
            <span aria-label='percent'>
                %
            </span>
         </p>

         <label htmlFor="confirm_pwd">
            Confirm Password:
            <span className={validMatch && matchPwd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck}/>
            </span>
            <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
            </span>
         </label>
         <input 
         type="password" 
         id='confirm_pwd'
         onChange={(e) => setMatchPwd(e.target.value)}
         required
         aria-invalid={validMatch ? 'false' : 'true'}
         aria-describedby='confirmnote'
         onFocus={() => setMatchFocus(true)}
         onBlur={() => setMatchFocus(false)}
         />
        <p id='confirmnote' className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
            <FontAwesomeIcon icon={faInfoCircle}/>
            Must match the first password input field.
        </p>  

        <button disabled={!validName || !validPwd || !validMatch ? true : false}> Sign Up</button>      
    </form>
    <p>
        Already registered? <br />
        <span className='line'>
            {/* put router link here */}
            <a href="#">Sign In</a>
        </span>
    </p>
    </section>
  )
}

export default Register
