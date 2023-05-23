import axios from 'axios';
import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
const insertData = () => { 
  
  let result = axios.post(`http://localhost:8080/InsertData`, { firstname:firstname, lastname:lastname, email: email, password: password });
  
  if(result) {
      alert("Thankyou for joining")
      navigate('/SignIn');
    } else {
      alert("User already registered");
      navigate('/SignUp');
    }
    
    }
      
    return (
          <>
            <form onSubmit={insertData} style={{width:"400px", margin:"auto", marginTop:"20px"}}>


            <br/>
            <br/>
            <h2 style={{textAlign:'center'}}>Sign UP</h2>
            <br/>

            <div className="form-outline mb-4">
              <label className="form-label" for="form2Example1">First Name</label>
              <input type="text" id="form2Example1" className="form-control" onChange={e => setFirstname(e.target.value)} value={firstname} name="firstname" />
              {/* <br/> */}
              <label className="form-label" for="form2Example1">Last Name</label>
              <input type="text" id="form2Example1" className="form-control" onChange={e => setLastname(e.target.value)} value={lastname} name="lastname" />
              {/* <br/> */}
              <label className="form-label" for="form2Example1">Email Address</label>
              <input type="email" id="form2Example1" className="form-control" onChange={e => setEmail(e.target.value)} value={email} name="email" />
              {/* <br/> */}
              <label className="form-label" for="form2Example2">Password</label>
              <input type="password" id="form2Example2" className="form-control" onChange={e => setPassword(e.target.value)} value={password} name="password"/>
            </div>

            <div className="row mb-4">
              <div className="col d-flex justify-content-center">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="form2Example31"/>
                  <label className="form-check-label" for="form2Example31">I want to receive inspiration, marketing promotions and updates via email. </label>
                </div>
              </div>

            </div>
            <button type="submit" name="signup" className="btn btn-primary btn-block mb-4">Sign up</button>
            <div className="text-center">
              <p>Have an account? <a href="SignIn">Sign In</a></p>
            </div>
        </form>
        </>
  )
}
export default SignUp;