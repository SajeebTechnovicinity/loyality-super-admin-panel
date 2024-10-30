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
    backgroundColor: "#4CAF50",
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
                            Edit
                          </Link>
                          <span> </span>
                          <button
                            onClick={() => handleBlock(item._id)}
                            className="px-4 py-2 mx-1 bg-main text-white rounded action-btn"
                          >
                            {item.status ? "Block" : "Unblock"}
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
