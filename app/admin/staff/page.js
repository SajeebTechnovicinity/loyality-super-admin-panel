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

      result = await fetchWithAuth(`employee-list?page=${currentPage}`);
      console.log(result);

      setStaffList(result.data);
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
        <h3 className="title">Staff List</h3>

        <Link
          href={{
            pathname: "/admin/staff/store",
          }}
          className="px-4 py-2 mx-1 bg-main text-white rounded"
        >
          Add Staff
        </Link>
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
                    if (item.user_type !== "user") {
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
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.862 4.487L18.549 2.799C18.9007 2.44733 19.3777 2.24976 19.875 2.24976C20.3723 2.24976 20.8493 2.44733 21.201 2.799C21.5527 3.15068 21.7502 3.62766 21.7502 4.125C21.7502 4.62235 21.5527 5.09933 21.201 5.451L10.582 16.07C10.0533 16.5984 9.40137 16.9867 8.685 17.2L6 18L6.8 15.315C7.01328 14.5986 7.40163 13.9467 7.93 13.418L16.862 4.487ZM16.862 4.487L19.5 7.125M18 14V18.75C18 19.3467 17.7629 19.919 17.341 20.341C16.919 20.763 16.3467 21 15.75 21H5.25C4.65326 21 4.08097 20.763 3.65901 20.341C3.23705 19.919 3 19.3467 3 18.75V8.25C3 7.65327 3.23705 7.08097 3.65901 6.65901C4.08097 6.23706 4.65326 6 5.25 6H10" stroke="#fff" strokewidth="1.5" strokelinecap="round" strokelinejoin="round"></path>
                          </svg>
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
                    }

                    return null;
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
