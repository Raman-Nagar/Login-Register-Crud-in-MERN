import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

export default function Updatedt() {
    const [User, setUser] = useState();
    const [Password, setPassword] = useState();
    const [Email, setEmail] = useState();
    const [Mobile, setMobile] = useState();

    const [fetchDt, setfetchDt] = useState([]);
    const navigate = useNavigate();
    const { user_id } = useParams();

    const gotoReg = () => {
        navigate(-1)
    }

    useEffect(() => {
        axios.get('http://127.0.0.1:5000/studata')
            .then(resp => {
                setfetchDt(resp.data);
            })

    }, [])

    useEffect(() => {
        fetchDt.filter((data) => {
            if (data._id === user_id) {
                setUser(data.user)
                setPassword(data.password)
                setEmail(data.email)
                setMobile(data.mobile)
            }
        })
    }, [fetchDt])

    function handleSubmit(e) {

        let dataObj = {
            user: User,
            password: Password,
            email: Email,
            mobile: Mobile
        }
        axios.put(`http://127.0.0.1:5000/stu/${user_id}`, dataObj)
            .then(resp => {
                console.log(resp)
            })
            .catch(err => {
                console.log(err)
            })
        alert("User Updated Successfully...!!!")
        e.preventDefault();
        navigate(-1);
    }

    return (

        <div>
            <button className='btn btn-light' onClick={() => gotoReg()}> Go To Back</button><br /><br />

            <form onSubmit={handleSubmit} method="POST" action="http://127.0.0.1:5000/studata" >

                <input value={User} type="text" onChange={(e) => { setUser(e.target.value) }} name='userid' placeholder='Enter Userid' /><br /><br />
                <input value={Password} type="text" onChange={(e) => { setPassword(e.target.value) }} name='password' placeholder='Enter Password' /><br /><br />
                <input value={Email} type="email" onChange={(e) => { setEmail(e.target.value) }} name='email' placeholder='Enter Email' /><br /><br />
                <input value={Mobile} type="text" onChange={(e) => { setMobile(e.target.value) }} name='mobile' placeholder='Enter Mobile' /><br /><br />
                <button className='btn btn-success' type='submit'>Submit</button>

            </form>
        </div>
    )
}