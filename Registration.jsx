import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Registration() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        user: '',
        pass: '',
        eml: '',
        mobile: ''
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

    function handleSubmit(e) {
        const {user, pass, eml, mobile} = data

        if(!user || !pass || !eml || !mobile){
            alert("please fill all detial")
        }
       else if(!eml.includes("@") || !eml.includes(".")){
            alert("please fill valid email")
        }
       else if(pass.length<6){
            alert("please fill valid password")
        }
       else if(mobile.length<10 || mobile.length>10 || isNaN(mobile)){
            alert("please fill valid mobile")
        }
       else {
            navigate("/login")
            e.preventDefault();
            let dataObj = {
                user: user,
                password: pass,
                email: eml,
                mobile: mobile
            }
            axios.post('http://127.0.0.1:5000/studata', dataObj)
                .then(resp => {
                    console.log(resp)
                })
                .catch(err => {
                    console.log(err)
                })
            alert("User Created Successfully...!!!")
            setData({
                user: '',
                pass: '',
                eml: '',
                mobile: ''
            });
        }
    }

    const gotoLogin = () => {
        navigate("/login")
    }

    return (
        <div>
            <div className='row text-center bg-primary'>
                <div className='col h2 p-1 text-light'>
                    <p> Register here </p>
                </div>
            </div>

            <label>Click here if you already registered</label>
            <button className='btn btn-warning m-2' onClick={() => gotoLogin()}> Click</button> <br /><br />

            <div className='row justify-content-center text-center'>
                <div className='col-4 bg-primary p-5 rounded'>
                {/* action="http://127.0.0.1:5000/studata" */}
                    <form onSubmit={handleSubmit}>

                        <input className="form-control" type="text" value={data.user} onChange={ HandleInp } name='user' placeholder='Enter Userid' /><br /><br />
                        <input className="form-control" type="password" value={data.pass} onChange= { HandleInp } name='pass' placeholder='Enter Password' /><br /><br />
                        <input className="form-control" type="email" value={data.eml} onChange={HandleInp } name='eml' placeholder='Enter Email' /><br /><br />
                        <input className="form-control" type="text" value={data.mobile} onChange={ HandleInp } name='mobile' placeholder='Enter Mobile' /><br /><br />
                        <button className='btn btn-success' type='submit'>Submit</button>

                    </form>
                </div>
            </div>

            <p>{data.user}{data.pass}{data.eml}{data.mobile} </p>
        </div>
    )
}
