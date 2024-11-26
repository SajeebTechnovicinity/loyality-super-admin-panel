"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import fetchWithAuth from "@/fetchWithAuth";
export default function Dashboard() {
  const [contactList, setContact] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from an API or other source
      const result = await fetchWithAuth("contact");
      setContact(result.data);
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
      <div className="dashboard-content__title-bar title-bar flex-ctr-spb">
        <h3 className="title">Contact List</h3>
      </div>
      <div className="dashboard-main-content-wrap">
        <div className="dashboard-main-content">
          <div className="dashboard-table-wrap flex-spb">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contactList &&
                  contactList.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.first_name} {item.last_name}
                      </td>
                      <td>{item.email}</td>

                      <td>
                        <Link
                          href={{
                            pathname: "/admin/contact/details",
                            query: { id: item._id }, // Add your parameters here
                          }}
                          className="px-4 py-2 mx-1 bg-main text-white rounded"
                        >
                         Details
                        </Link>
                        
                      </td>
                      {/* <td>
                                        <a href="#" className="edit-row">
                                           <svg width="24px" height="24px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" 
                        fill="none"
                        stroke-width="1.5px" stroke-miterlimit="10" stroke="#ffffff" stroke-opacity="1"
                        >
                        <path  class="cls-1" d="M7.23,20.59l-4.78,1,1-4.78L17.89,2.29A2.69,2.69,0,0,1,19.8,1.5h0a2.7,2.7,0,0,1,2.7,2.7h0a2.69,2.69,0,0,1-.79,1.91Z"/><line class="cls-1" x1="0.55" y1="22.5" x2="23.45" y2="22.5"/><line class="cls-1" x1="19.64" y1="8.18" x2="15.82" y2="4.36"/></svg>
                                        </a>
                                        <a href="#" className="delete-row">
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M14.74 8.99997L14.394 18M9.606 18L9.26 8.99997M19.228 5.78997C19.57 5.84197 19.91 5.89697 20.25 5.95597M19.228 5.78997L18.16 19.673C18.1164 20.2382 17.8611 20.7661 17.445 21.1512C17.029 21.5363 16.4829 21.7501 15.916 21.75H8.084C7.5171 21.7501 6.97102 21.5363 6.55498 21.1512C6.13894 20.7661 5.88359 20.2382 5.84 19.673L4.772 5.78997M19.228 5.78997C18.0739 5.61549 16.9138 5.48307 15.75 5.39297M4.772 5.78997C4.43 5.84097 4.09 5.89597 3.75 5.95497M4.772 5.78997C5.92613 5.61549 7.08623 5.48307 8.25 5.39297M15.75 5.39297V4.47697C15.75 3.29697 14.84 2.31297 13.66 2.27597C12.5536 2.24061 11.4464 2.24061 10.34 2.27597C9.16 2.31297 8.25 3.29797 8.25 4.47697V5.39297M15.75 5.39297C13.2537 5.20005 10.7463 5.20005 8.25 5.39297"
                                                    stroke="#545454"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </a>
                                    </td> */}
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
