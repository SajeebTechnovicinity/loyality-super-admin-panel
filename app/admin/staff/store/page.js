"use client";
import { useEffect, useState } from "react";
import fetchWithAuth from "@/fetchWithAuth";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

export default function Counter() {
  const usertype = getCookie("usertype");
  const data = {
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    password: "",
    user_type: "employee",
    branch: "",
  };
  const $baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [store, setStore] = useState(data);
  const [branch, setBranch] = useState([]);

  function setData(e) {
    const { name, value } = e.target;
    setStore((old) => {
      return {
        ...old, // Spread the previous state
        [name]: value, // Update the state with the new key-value pair
      };
    });
  }

  const storeData = async () => {
    const response = await fetchWithAuth("/user-register", {
      method: "POST",
      body: JSON.stringify(store), // Replace with your data
    });
    if (response.success == true) {
      setStore(data);
      Swal.fire({
        title: "success",
        text: "Successfully Add Staff",
        icon: "success",
        // confirmButtonText: 'Cool'
      });
    } else {
      alert(response.msg);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from an API or other source
      const result = await fetch(`${$baseUrl}/api/branch`);
      const data = await result.json();
      setBranch(data.data);
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-content">
      <div className="dashboard-content__topbar topbar flex-ctr">
        <div className="drawer-open">
          <span className="slice-top"></span>
          <span className="slice-middle"></span>
          <span className="slice-bottom"></span>
        </div>
      </div>
      <div className="dashboard-content__title-bar title-bar">
        <h3 className="title">Staff Add</h3>
      </div>
      <div className="dashboard-main-content-wrap">
        <div className="dashboard-main-content">
          <div className="form-card">
            <div className="card-body">
              <div className="form-group row">
                <label className="col-md-3 col-from-label">First Name</label>
                <div className="col-md-8">
                  <input
                    name="first_name"
                    value={store.first_name}
                    className="from-element from-element-text form-control"
                    onInput={setData}
                    type="text"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3 col-from-label">Last Name</label>
                <div className="col-md-8">
                  <input
                    name="last_name"
                    value={store.last_name}
                    className="from-element from-element-text form-control"
                    onInput={setData}
                    type="text"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-md-3 col-from-label">Phone</label>
                <div className="col-md-8">
                  <input
                    name="phone"
                    value={store.phone}
                    className="from-element from-element-text form-control"
                    onInput={setData}
                    type="text"
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3 col-from-label">Email</label>
                <div className="col-md-8">
                  <input
                    name="email"
                    value={store.email}
                    className="from-element from-element-text form-control"
                    onInput={setData}
                    type="text"
                  />
                </div>
              </div>
              {usertype != "branch-admin" && (
                <div className="form-group row  from-field">
                  <label className="col-md-3 col-from-label">Branch</label>
                  <div className="col-md-8">
                    <div className="select-wrap">
                      <select
                        name="branch"
                        id=""
                        value={branch.branch}
                        onChange={setData}
                        className="select from-element from-element-text form-control"
                      >
                        <option value="">Select</option>
                        {branch &&
                          branch.map((item, index) => (
                            <option value={item._id} key={index}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <div className="form-group row from-field">
                <label className="col-md-3 col-from-label">User Type</label>
                <div className="col-md-8">
                  <div className="select-wrap">
                    <select
                      name="user_type"
                      id=""
                      value={store.user_type}
                      onChange={setData}
                      className="select from-element select-field  from-element-text form-control"
                    >
                      <option value="">Select</option>
                      <option value="employee">Employee</option>        
                        <option value="branch-admin">Branch Admin</option>            
                        <option value="brand-admin">Brand Admin</option>      
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3 col-from-label">Password</label>

                <div className="col-md-8">
                  <input
                    name="password"
                    type="password"
                    value={store.password}
                    className="from-element from-element-text form-control"
                    onInput={setData}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="form-submit col-md-8 col-md-offset-3 ">
                  <button onClick={(e) => storeData(e)}>Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
