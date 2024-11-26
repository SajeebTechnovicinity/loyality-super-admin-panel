"use client";
import fetchWithAuth from "@/fetchWithAuth";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function Dashboard() {
  const [staffList, setStaffList] = useState(null);
  const branch = getCookie("branch");
  const usertype = getCookie("usertype");
  const [currentPage, setCurrentPage] = useState(1);
  console.log(branch);

  const buttonStyle = {
    padding: "8px 16px",
    margin: "0 5px",
    backgroundColor: "var(--primary-color)",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const infoStyle = {
    margin: "0 10px",
    fontSize: "16px",
  };

  //handle block unblock
  const handleBlock = async (id) => {
    let result;

    console.log(id);

    result = await fetchWithAuth(`user/block/${id}`);
    console.log(result);

    if (result.success) {
      const newStaffList = staffList.map((item) => {
        if (item._id === id) {
          item.status = !item.status;
        }

        return item;
      });
      setStaffList(newStaffList);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from an API or other source
      let result;
      // if (usertype != "brand-admin") {
      //   result = await fetchWithAuth(
      //     `branch-employee/${branch}?page=${currentPage}`
      //   );
      // } else {
      //   result = await fetchWithAuth(`employee-list?page=${currentPage}`);
      // }

      result = await fetchWithAuth(`user?page=${currentPage}`);
      console.log(result);

      setStaffList(result.result);
    };

    fetchData();
  }, [currentPage]);

  // Pagination click handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
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
      <div className="dashboard-content__title-bar title-bar flex-ctr-spb">
        <h3 className="title">User List</h3>
      </div>
      <div className="dashboard-main-content-wrap">
        <div className="dashboard-main-content">
          <div className="dashboard-table-wrap flex-spb">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>User Type</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {staffList &&
                  staffList.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td>{item.email}</td>
                        <td>{item.user_type}</td>
                        <td className="status">
                          {item.status ? "Active" : "Inactive"}
                        </td>
                        <td>
                          <Link
                            href={{
                              pathname: "/admin/staff/edit",
                              query: { id: item._id }, // Add your parameters here
                            }}
                            className="px-4 py-2 mx-1 bg-main text-white rounded"
                          >
                            {/* Edit */}
                            <svg width="24px" height="24px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" 
                        fill="none"
                        stroke-width="1.5px" stroke-miterlimit="10" stroke="#ffffff" stroke-opacity="1"
                        >
                        <path  class="cls-1" d="M7.23,20.59l-4.78,1,1-4.78L17.89,2.29A2.69,2.69,0,0,1,19.8,1.5h0a2.7,2.7,0,0,1,2.7,2.7h0a2.69,2.69,0,0,1-.79,1.91Z"/><line class="cls-1" x1="0.55" y1="22.5" x2="23.45" y2="22.5"/><line class="cls-1" x1="19.64" y1="8.18" x2="15.82" y2="4.36"/></svg>
                          </Link>
                          <span> </span>
                          <button
                            onClick={() => handleBlock(item._id)}
                            className="px-4 py-2 mx-1 bg-main text-white rounded action-btn"
                          >
                             {item.status ? (
                              <svg
                                height="20px"
                                version="1.1"
                                viewBox="0 0 20 20"
                                width="20px"
                                xmlns="http://www.w3.org/2000/svg"

                              >
                                <g
                                  fill="none"
                                  fillRule="evenodd"
                                  id="Page-1"
                                  stroke="none"
                                  strokeWidth="1"
                                >
                                  <g fill="#fff" id="Core" transform="translate(-170.000000, -44.000000)">
                                    <g id="block" transform="translate(170.000000, 44.000000)">
                                      <path
                                        d="M10,0 C4.5,0 0,4.5 0,10 C0,15.5 4.5,20 10,20 C15.5,20 20,15.5 20,10 C20,4.5 15.5,0 10,0 L10,0 Z M2,10 C2,5.6 5.6,2 10,2 C11.8,2 13.5,2.6 14.9,3.7 L3.7,14.9 C2.6,13.5 2,11.8 2,10 L2,10 Z M10,18 C8.2,18 6.5,17.4 5.1,16.3 L16.3,5.1 C17.4,6.5 18,8.2 18,10 C18,14.4 14.4,18 10,18 L10,18 Z"
                                        id="Shape"
                                      />
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            ) : (
                              <svg
                                fill="none"
                                height="20"
                                viewBox="0 0 24 24"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  clipRule="evenodd"
                                  d="M5.63604 18.364C9.15076 21.8787 14.8492 21.8787 18.364 18.364C21.8787 14.8492 21.8787 9.15076 18.364 5.63604C14.8492 2.12132 9.15076 2.12132 5.63604 5.63604C2.12132 9.15076 2.12132 14.8492 5.63604 18.364ZM7.80749 17.6067C10.5493 19.6623 14.4562 19.4433 16.9497 16.9497C19.4433 14.4562 19.6623 10.5493 17.6067 7.80749L14.8284 10.5858C14.4379 10.9763 13.8047 10.9763 13.4142 10.5858C13.0237 10.1953 13.0237 9.5621 13.4142 9.17157L16.1925 6.39327C13.4507 4.33767 9.54384 4.55666 7.05025 7.05025C4.55666 9.54384 4.33767 13.4507 6.39327 16.1925L9.17157 13.4142C9.5621 13.0237 10.1953 13.0237 10.5858 13.4142C10.9763 13.8047 10.9763 14.4379 10.5858 14.8284L7.80749 17.6067Z"
                                  fill="#fff"
                                  fillRule="evenodd"
                                />
                              </svg>
                            )}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>

            <div className="pagination" style={{ textAlign: "center" }}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                style={buttonStyle}
              >
                Previous
              </button>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                style={buttonStyle}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
