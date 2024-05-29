"use client";
import {useEffect, useState} from "react";
import fetchWithAuth from "@/fetchWithAuth";
import { getCookie } from "cookies-next";
import Swal from 'sweetalert2';

export default function Counter() {
    const branchId = getCookie("branch");
    const data={
        "name":"",
        "branch":branchId,
        "info":""
    }
    const [store,setStore]=useState(data)
    const [branch,setBranch]=useState([])

    function  setData(e){
        const {name, value} = e.target;
        setStore(old => {
            return {
                ...old,  // Spread the previous state
                [name]: value  // Update the state with the new key-value pair
            };
        });
    }

    const storeData=async ()=>{

        const response = await fetchWithAuth('/counter', {
            method: 'POST',
            body: JSON.stringify(store), // Replace with your data
        });

        if(response.success==true){
            setStore(data)
            Swal.fire({
                title: 'success',
                text: 'Successfully Add Counter',
                icon: 'success',
                // confirmButtonText: 'Cool'
            })
        }
    }


    useEffect(() => {
        const fetchData = async () => {
            // Fetch data from an API or other source
            const result = await fetchWithAuth('/branch');
            console.log(result);
            const data = await result.data;
            setBranch(data)
        };

        fetchData();
    }, []);




    return (
        <div className='dashboard-content'>
            <div className='dashboard-content__topbar topbar flex-ctr'>
                <div className='drawer-open'>
                    <span className='slice-top'></span>
                    <span className='slice-middle'></span>
                    <span className='slice-bottom'></span>
                </div>
            </div>
            <div className='dashboard-content__title-bar title-bar'>
                <h3 className='title'>Counter Add</h3>

            </div>
            <div className='dashboard-main-content-wrap'>

                <div className='dashboard-main-content'>
                    <div className='form-row col-3'>
                        <div className='from-field'>
                            <label>Counter Name</label>
                            <input
                                name="name"
                                value={branch?branch.name:""}
                                className='from-element from-element-text'
                                onInput={setData}
                                type='text'
                            />
                        </div>
                        {/* <div className="dashboard-form__field select-field">
                            <label>Branch</label>
                            <select name="branch" id=""    value={branch?branch.branch:""} onChange={setData} className="select from-element from-element" >
                                <option value="" >Select</option>
                                {branch && branch.map(item=>( <option value={item._id} >{item.name}</option>))}
                            </select>
                        </div> */}
                        <div className='from-field'>
                            <label>Details</label>
                            <div className="select-wrap">
                                <textarea   name="info" value={branch ? branch.info: ""}  onInput={setData}></textarea>
                            </div>
                        </div>
                    </div>



                    <div className='form-submit'>
                        <button onClick={(e)=>storeData(e)}>Submit</button>
                    </div>
                </div>

            </div>
        </div>
    );
}
