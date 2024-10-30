"use client";
import { useEffect, useState } from "react";
import fetchWithAuth from "@/fetchWithAuth";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";

export default function Counter() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const initialData = {
    id: id || "",
    name: "",
    email: "",
    message: "",
  };

  const [store, setStore] = useState(initialData);

  async function setContact() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact/${id}`
      );
      if (response && response.ok) {
        const data = await response.json();
        setStore((old) => ({
          ...old,
          name: data.first_name + " " + data.last_name,
          email: data.email,
          message: data.message,
        }));
      } else {
        console.error("Failed to fetch contact details");
      }
    } catch (error) {
      console.error("Error fetching contact:", error);
    }
  }

  useEffect(() => {
    if (id) setContact();
  }, [id]);

  const setData = (e) => {
    const { name, value } = e.target;
    setStore((prev) => ({ ...prev, [name]: value }));
  };

  const storeData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWithAuth(`/contact/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(store),
      });

      if (response.ok) {
        Swal.fire("Success", "Contact details updated successfully", "success");
      } else {
        Swal.fire("Error", "Failed to update contact details", "error");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
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
        <h3 className="title">Contact Details</h3>
      </div>
      <div className="dashboard-main-content-wrap">
        <div className="dashboard-main-content">
          <form onSubmit={storeData} className="form-card">
            <div className="card-body">
              <div className="form-group row">
                <label className="col-md-3 col-from-label">Name</label>
                <div className="col-md-8">
                  <input
                    name="name"
                    value={store.name}
                    className="from-element from-element-text form-control"
                    onChange={setData}
                    type="text"
                    readOnly
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
                    onChange={setData}
                    type="text"
                  />
                </div>
              </div>

              <div className="form-group row">
                <label className="col-md-3 col-from-label">Message</label>
                <div className="col-md-8">
                  <textarea
                    name="message"
                    value={store.message}
                    className="from-element from-element-text form-control"
                    onChange={setData}
                  />
                </div>
              </div>
              {/*  <div className="form-group row">
                <div className="form-submit col-md-8 col-md-offset-3">
                  <button type="submit">Submit</button>
                </div>
              </div> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
