import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function TotalList() {

    const [fetchDt, setfetchDt] = useState([]);
    const [loggin, setLoggin] = useState(true);

    const token = localStorage.getItem("token")

    const navigate = useNavigate();

    useEffect(() => {
        if (token === null) {
            setLoggin(false);
            console.log(token);
        }
        axios.get('http://127.0.0.1:5000/studata')
            .then(resp => {
                // console.log(resp.data)
                setfetchDt(resp.data);
            })
            
    }, [])

    if (loggin === false) {
        navigate("/login")
    }
    function deleteHandler(e) {
        
        if(window.confirm("Want to delete?")){
            axios.delete(`http://127.0.0.1:5000/stu/${e}`)
            .then(resp => resp)
            .catch(err => console.log(err))

            axios.get('http://127.0.0.1:5000/studata')
            .then(resp => {
                // console.log(resp.data)
                setfetchDt(resp.data);
            })
        }  
    }


    const updateHandler=(e)=>{
        navigate(`/updatedt/${e}`)
    }

    const gotoReg =()=>{
        navigate(-1)
    }

    const Fetch = fetchDt.map((data, i) => {
        return (
            <>
                <tr>
                    <th scope="row">{i + 1}</th>
                    <td>{data.user}</td>
                    <td>{data.password}</td>
                    <td>{data.email}</td>
                    <td>{data.mobile}</td>
                    <td><button className='btn btn-danger' onClick={() => {deleteHandler(data._id) }}> Delete </button></td>
                    <td><button className='btn btn-warning' onClick={() => {updateHandler(data._id)}}> Update </button></td>

                </tr>
            </>
        )
    })


    return (
        <>
            <button  className='btn btn-light' onClick={() => gotoReg()}> Go To Back</button><br/><br/>

            <div className='row text-center'>
                <div className='col-12'>
                    <table className="table table-dark table-hover">
                        <thead>
                            <tr>
                                <th scope="col"> S.No</th>
                                <th scope="col"> User</th>
                                <th scope="col"> Password </th>
                                <th scope="col"> Email</th>
                                <th scope="col"> Mobile</th>
                                <th scope="col"> Delete</th>
                                <th scope="col"> Update</th>
                            </tr>
                        </thead>
                        <tbody className='table-light'>
                            {Fetch}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}