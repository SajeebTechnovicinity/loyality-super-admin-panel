"use client";
import fetchWithAuth from "@/fetchWithAuth";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function Form() {
  const [data, setData] = useState({
    branch_receive: "",
    money_to_points: "",
    points_to_money: "",
  });

  const [store, setStore] = useState(data);

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from an API or other source
        const result = await fetchWithAuth("configuration");
        console.log(result.data);

        setData((prevData) => ({
          ...prevData,
          branch_receive: result.data.branch_receive,
          money_to_points: result.data.money_to_points,
          points_to_money: result.data.points_to_money,
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
      }));
    }
  };

  const storeData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWithAuth("/configuration", {
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
          text: "Configuration updated successfully",
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
        <h3 className="title">Configuration Edit</h3>
      </div>
      <div className="dashboard-main-content-wrap">
        <div className="dashboard-main-content">
          <form onSubmit={storeData} className="form-card">
            <div className="card-body">
              <div className="form-group row">
                <label className="col-md-3 col-from-label">
                  Branch Receive (Percentage)
                </label>
                <div className="col-md-8">
                  <input
                    name="branch_receive"
                    className="from-element from-element-text form-control"
                    value={store.branch_receive}
                    onChange={handleChange}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3 col-from-label">
                  Money to Points (Percentage)
                </label>
                <div className="col-md-8">
                  <input
                    name="money_to_points"
                    className="from-element from-element-text form-control"
                    value={store.money_to_points}
                    onChange={handleChange}
                    type="text"
                    required
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3 col-from-label">
                  Points to Money (Percentage)
                </label>
                <div className="col-md-8">
                  <input
                    name="points_to_money"
                    className="from-element from-element-text form-control"
                    value={store.points_to_money}
                    onChange={handleChange}
                    type="text"
                    required
                  />
                </div>
              </div>

              <div className="col-md-8">
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
