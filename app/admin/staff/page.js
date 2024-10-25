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
                            <svg width={21} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="rgb(84, 84, 84)" d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z"/></svg>
                            </Link>
                            <button
                              onClick={() => handleBlock(item._id)}
                              className="px-4 py-2 mx-1 bg-main text-white rounded"
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
