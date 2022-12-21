import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Login() {

    const navigate = useNavigate();
    const [data, setData] = useState({
        eml: '',
        pass: ''
    });

    const HandleInp =(e)=>{
        const name = e.target.name;
        const value = e.target.value
        setData((predata)=>{
            return{
                ...predata,
                [name]:value
            }
        });
    }

    const gotoLogin = () => {
        navigate("/registration")
    }

    function handleLogin(e) {
        e.preventDefault();
        const { eml, pass } = data

        if( !eml || !pass ){
            alert("please fill all detial")
        }
       else if(!eml.includes("@") || !eml.includes(".")){
            alert("please fill valid email")
        }
       else if(pass.length<6){
            alert("please fill valid password")
        }
       else {
        let dataObj = {
            userID: eml,
            password: pass
        }
        axios.post('http://127.0.0.1:5000/loginCheck', dataObj)
            .then(resp => {
                localStorage.setItem("token", `${dataObj.userID}`)
                navigate("/LgRegistration")

                console.log(resp)
                alert("Login Successfully....")
            })
            .catch(err => {
                console.log(err)
                alert(err.response.data)
                console.log(err.response.data)
            })
        }
    }

    return (

        <div className='container-fluid'>

            <div className='row text-center bg-primary'>
                <div className='col h2 p-1 text-light'>
                    <p> Log-in</p>
                </div>
            </div>

            <div className='row'>

                <div className='col-md-4'>
                    <label>Click here if you have't registered ?</label>
                    <button className='btn btn-warning m-2' onClick={() => gotoLogin()}>Click</button><br /><br />

                </div>

            </div>

            <div className='row justify-content-center text-center'>

                <div className='col-4 bg-primary p-5 rounded'>
                {/* method="POST" action='http://127.0.0.1:5000/loginCheck' */}
                    <form onSubmit={handleLogin} >
                        <input className="form-control" type="email" value={data.eml} onChange={HandleInp } name='eml' placeholder='Enter Email' /><br /><br />
                    <input className="form-control" type="password" value={data.pass} onChange= { HandleInp } name='pass' placeholder='Enter Password' /><br /><br />
                        <button  type='submit' className='btn btn-light col-3'>Login</button>
                    </form>
                </div>
            </div>

            Userid : {data.eml} <br /> Password:  {data.pass} <br />
        </div>
    )
}