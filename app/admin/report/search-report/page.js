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
            const data = await fetchWithAuth(`search-report?page=${currentPage}`,
                {
                    method: "POST",
                    body: JSON.stringify(""), 
                }
            );
            console.log("finf something");
            console.log(data.orderList);
            console.log("finf something");
            setOrder(data.orderList);
        };
        branchData();
        fetchData();
    }, [currentPage]);

    return (
        <div className='dashboard-content'>
            <div className='dashboard-content__topbar topbar flex-ctr'>
                <div className='drawer-open'>
                    <span className='slice-top'></span>
                    <span className='slice-middle'></span>
                    <span className='slice-bottom'></span>
                </div>
            </div>
            <div className='dashboard-content__title-bar title-bar flex-ctr-spb'>
                <h3 className='title'>Transaction List</h3>
            </div>

            <div className='dashboard-main-content-wrap'>
                <div className='dashboard-main-content'>
                    <div className='search-report'>
                        <div className='dashboard-form__field select-field from-field col-3'>
                            <label>Branch</label>
                            <select
                                name='branch'
                                id=''
                                value={branch ? branch.branch : ""}
                                onChange={branchChange}
                                className='select from-element from-element'
                            >
                                <option value=''>Select</option>
                                {branch &&
                                    branch.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className='dashboard-form__field select-field from-field col-3'>
                            <label>Counter</label>
                            <select
                                name='branch'
                                id=''
                                value={branch ? branch.branch : ""}
                                onChange={counterChange}
                                className='select from-element from-element'
                            >
                                <option value=''>Select</option>
                                {count &&
                                    count.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                            </select>
                        </div>
                        <div className='from-field col-3'>
                            <label>Start Date</label>
                            <input
                                name='name'
                                className='from-element from-element-text'
                                type='date'
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <div className='from-field col-3'>
                            <label>End Date</label>
                            <input
                                name='name'
                                className='from-element from-element-text'
                                type='date'
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        <div className='form-submit'>
                            <button onClick={search}>Submit</button>
                        </div>
                    </div>

                    <div className='dashboard-table-wrap flex-spb'>
                        <table className='dashboard-table'>
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
                                            <td>
                                              
                                                {
                                                     convertDateFormat(
                                                         item.created_at
                                                     )
     
                                                }
                                            </td>
                                            <td>
                                                {item.branch &&
                                                    item.branch.name}
                                            </td>
                                            <td>
                                                {item.counter &&
                                                    item.counter.name}
                                            </td>
                                            <td>{item.user.name}</td>
                                            <td>
                                                {(item.total_amount *
                                                    item.branch_receive) /
                                                    100}
                                            </td>
                                            <td>
                                                {(item.total_amount *
                                                    item.technovicinity_receive) /
                                                    100}
                                            </td>
                                            {/* <td>
                        <a href="#" className="edit-row">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M16.862 4.487L18.549 2.799C18.9007 2.44733 19.3777 2.24976 19.875 2.24976C20.3723 2.24976 20.8493 2.44733 21.201 2.799C21.5527 3.15068 21.7502 3.62766 21.7502 4.125C21.7502 4.62235 21.5527 5.09933 21.201 5.451L10.582 16.07C10.0533 16.5984 9.40137 16.9867 8.685 17.2L6 18L6.8 15.315C7.01328 14.5986 7.40163 13.9467 7.93 13.418L16.862 4.487ZM16.862 4.487L19.5 7.125M18 14V18.75C18 19.3467 17.7629 19.919 17.341 20.341C16.919 20.763 16.3467 21 15.75 21H5.25C4.65326 21 4.08097 20.763 3.65901 20.341C3.23705 19.919 3 19.3467 3 18.75V8.25C3 7.65327 3.23705 7.08097 3.65901 6.65901C4.08097 6.23706 4.65326 6 5.25 6H10"
                              stroke="#545454"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
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
