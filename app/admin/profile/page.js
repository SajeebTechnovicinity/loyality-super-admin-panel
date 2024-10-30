"use client";
import fetchWithAuth from "@/fetchWithAuth";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Form() {
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
  });

  const [store, setStore] = useState(data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from an API or other source
        const result = await fetchWithAuth("profile");
        console.log(result);

        setData((prevData) => ({
          ...prevData,
          first_name: result.first_name,
          last_name: result.last_name,
          phone: result.phone,
          email: result.email,
          password: "", // Password usually not fetched for security reasons
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setStore(data);
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore((prevStore) => ({
      ...prevStore,
      [name]: value,
    }));
  };

  const storeData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWithAuth("/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(store),
      });
      console.log(response);

      if (response.success) {
        Swal.fire({
          title: "Success",
          text: "Profile updated successfully",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "Error",
          text: "Failed to update profile",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while updating the profile",
        icon: "error",
      });
    }
  };

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
        <h3 className="title">Profile Edit</h3>
      </div>
      <div className="dashboard-main-content-wrap">
        <div className="dashboard-main-content">
          <form onSubmit={storeData} className="form-card">
            <div className="card-body">
              <div className="form-group row">
                <label className="col-md-3 col-from-label">First Name</label>
                <div className="col-md-8">
                  <input
                    name="first_name"
                    className="from-element from-element-text form-control"
                    value={store.first_name}
                    onChange={handleChange}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3 col-from-label">Last Name</label>
                <div className="col-md-8">
                  <input
                    name="last_name"
                    className="from-element from-element-text form-control"
                    value={store.last_name}
                    onChange={handleChange}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3 col-from-label">Phone</label>
                <div className="col-md-8">
                  <input
                    name="phone"
                    className="from-element from-element-text form-control"
                    value={store.phone}
                    onChange={handleChange}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3 col-from-label">Email</label>
                <div className="col-md-8">
                  <input
                    name="email"
                    className="from-element from-element-text form-control"
                    value={store.email}
                    onChange={handleChange}
                    type="email"
                    required
                    readOnly
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3 col-from-label">
                  Password (Optional)
                </label>
                <div className="col-md-8">
                  <input
                    name="password"
                    className="from-element from-element-text form-control"
                    value={store.password}
                    onChange={handleChange}
                    type="password"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="form-submit">
                  <button type="submit">Submit</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
