"use client";
import fetchWithAuth from "@/fetchWithAuth";
import { useEffect, useState } from "react";
import "./style.css";
export default function Dashboard() {
  const [orderList, setOrder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [branch, setBranch] = useState([]);
  const [count, setCounterList] = useState([]);

  const [branchId, setBranchId] = useState(null);
  const [countId, setCounterId] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  async function branchChange(e) {
    const { name, value } = e.target;
    setBranchId(value);
    const result = await fetchWithAuth(`/branch-counter/` + value);
    setCounterList(result);
  }

  function counterChange(e) {
    const { name, value } = e.target;
    setCounterId(value);
  }

  function convertDateFormat(dateString) {
    // Parse the input date string
    let parsedDate = new Date(dateString);

    // Format the date according to the new format
    let formattedDate = parsedDate.toLocaleDateString(undefined, {
      dateStyle: "medium",
    });

    return formattedDate;
  }

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

  // Pagination click handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const branchData = async () => {
    const result = await fetchWithAuth("/branch");
    console.log(result);
    const data = await result.data;
    setBranch(data);
  };
  const search = async () => {
    let data = {
      branchId: branchId,
      countId: countId,
      startDate: startDate,
      endDate: endDate,
    };

    const response = await fetchWithAuth("/search-report", {
      method: "POST",
      body: JSON.stringify(data), // Replace with your data
    });

    console.log(response);

    if (response.success == true) {
      setOrder(response.orderList);
    }

    //console.log(obj);
  };

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from an API or other source
      const data = await fetchWithAuth(`search-report?page=${currentPage}`, {
        method: "POST",
        body: JSON.stringify(""),
      });
      console.log("finf something");
      console.log(data.orderList);
      console.log("finf something");
      setOrder(data.orderList);
    };
    branchData();
    fetchData();
  }, [currentPage]);

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
        <h3 className="title">Transaction List</h3>
      </div>

      <div className="dashboard-main-content-wrap">
        <div className="dashboard-main-content">
          <div className="search-report form-card">
            <div className="card-body">
              <div className=" form-group row ">
                <label className="col-md-3 col-from-label">Branch</label>
                <div className="col-md-8">
                  <div className="select-wrap">
                    <select
                      name="branch"
                      id=""
                      value={branch ? branch.branch : ""}
                      onChange={branchChange}
                      className="select from-element from-element-text select-field form-control"
                    >
                      <option value="">Select</option>
                      {branch &&
                        branch.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className=" form-group row">
                <label className="col-md-3 col-from-label">Counter</label>
                <div className="col-md-8">
                  <div className="select-wrap">
                    <select
                      name="branch"
                      id=""
                      value={branch ? branch.branch : ""}
                      onChange={counterChange}
                      className="select from-element from-element-text select-field form-control"
                    >
                      <option value="">Select</option>
                      {count &&
                        count.map((item) => (
                          <option key={item._id} value={item._id}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3 col-from-label">Start Date</label>
                <div className="col-md-8">
                  <input
                    name="name"
                    className="from-element from-element-text form-control"
                    type="date"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-group row">
                <label className="col-md-3 col-from-label">End Date</label>
                <div className="col-md-8">
                  <input
                    name="name"
                    className="from-element from-element-text form-control"
                    type="date"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-submit">
                <button onClick={search}>Submit</button>
              </div>
            </div>
          </div>

          <div className="dashboard-table-wrap flex-spb">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Branch</th>
                  <th>Counter</th>
                  <th>Customer</th>
                  <th>Total Branch Amount</th>
                  <th>Total Admin Amount</th>
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              <tbody>
                {orderList &&
                  orderList.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{convertDateFormat(item.created_at)}</td>
                      <td>{item.branch && item.branch.name}</td>
                      <td>{item.counter && item.counter.name}</td>
                      <td>{item.user.name}</td>
                      <td>{(item.total_amount * item.branch_receive) / 100}</td>
                      <td>
                        {(item.total_amount * item.technovicinity_receive) /
                          100}
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

            {/* <div
                            className='pagination'
                            style={{ textAlign: "center" }}
                        >
                            <button
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }

                                disabled={currentPage === 1}
                                style={buttonStyle}
                            >
                                Previous
                            </button>

                            <button
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }

                                style={buttonStyle}
                            >
                                Next
                            </button>
                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
