"use client";
import fetchWithAuth from "@/fetchWithAuth";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Form() {
  const [data, setData] = useState({
    name: "",
    logo: "",
  });

  const [store, setStore] = useState(data);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from an API or other source
        const result = await fetchWithAuth("brand");
        console.log(result.data);

        setData((prevData) => ({
          ...prevData,
          name: result.data.name,
          logo: result.data.logo,
          previous_logo: result.data.logo,
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

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (name === "logo" && files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setStore((prevStore) => ({
          ...prevStore,
          logo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setStore((prevStore) => ({
        ...prevStore,
        [name]: value,
        logo: null,
      }));
    }
  };

  const storeData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWithAuth("/brand", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(store),
      });
      console.log(response);

      if (response.success) {
        Swal.fire({
          title: "Success",
          text: "Brand updated successfully",
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
        <h3 className="title">Brand Edit</h3>
      </div>
      <div className="dashboard-main-content-wrap">
        <div className="dashboard-main-content">
          {/* <form onSubmit={storeData}>
            <div className="form-row col-3">
              <div className="from-field">
                <label>Previous Logo</label>
                <img src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${store.previous_logo}`} width="100" alt="Previous Logo" />
              </div>
              <div className="from-field">
                <label>Name</label>
                <input
                  name="name"
                  className="from-element from-element-text"
                  value={store.name}
                  onChange={handleChange}
                  type="text"
                  required
                />
              </div>

              <div className="from-field">
                <label>New Logo</label>
                <input
                  name="logo"
                  className="from-element from-element-text"
                  onChange={handleChange}
                  type="file"
                />
              </div>
            </div>
            <div className="form-submit">
              <button type="submit">Submit</button>
            </div>
           </form>
           */}

          <form onSubmit={storeData} className="form-card">
            {/* form-row col-3 */}
            <div className="card-body">
              {/* from-field */}
              <div className="form-group row">
                <label className="col-md-3 col-from-label">Previous Logo</label>
                <div className="col-md-8">
                  <img
                    src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${store.previous_logo}`}
                    width="100"
                    alt="Previous Logo"
                  />
                </div>
              </div>
              {/* from-field */}
              <div className=" form-group row">
                <label className="col-md-3 col-from-label">Name</label>
                <div className="col-md-8">
                  <input
                    name="name"
                    //add=> form-control
                    className="from-element from-element-text form-control"
                    value={store.name}
                    onChange={handleChange}
                    type="text"
                    required
                  />
                </div>
              </div>
              {/* from-field   */}
              <div className="form-group row">
                <label className="col-md-3 col-from-label">New Logo</label>
                <div className="col-md-8">
                  <input
                    name="logo"
                    //add=> form-control
                    className="from-element from-element-text form-control"
                    onChange={handleChange}
                    type="file"
                  />
                </div>
              </div>
              <div className="form-group row">
                {/* add=> col-md-8 col-md-offset-3  */}
                <div className="form-submit col-md-8 col-md-offset-3 ">
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
