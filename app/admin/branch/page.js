"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import fetchWithAuth from "@/fetchWithAuth";
import { getCookie } from "cookies-next";
export default function Dashboard() {
  const [branchList, setBranchList] = useState([]);

  const app_name = getCookie("app_name");
  const app_logo = getCookie("app_logo");

  useEffect(() => {
    const fetchData = async () => {
      // Fetch data from an API or other source
      const result = await fetchWithAuth("branch");
      setBranchList(result.data);
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
        <h3 className="title">Branch List</h3>

        <Link
          href={{
            pathname: "/admin/branch/store",
          }}
          className="px-4 py-2 mx-1 bg-main text-white rounded"
        >
          Add
        </Link>
      </div>
      <div className="dashboard-main-content-wrap">
        <div className="dashboard-main-content">
          <div className="dashboard-table-wrap flex-spb">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Brand Logo</th>
                  <th>Brand Name</th>
                  <th>Branch Name</th>
                  <th>Branch Info</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {branchList &&
                  branchList.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <img src={app_logo}></img>
                      </td>
                      <td>{app_name}</td>
                      <td>{item.name}</td>
                      <td>{item.info}</td>
                      <td className="status">
                        {item.status ? "Active" : "Inactive"}
                      </td>
                      <td>
                        <a href="#" className="edit-row">
                        <svg width="24px" height="24px" viewBox="0 0 24 24" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" 
                        fill="none"
                        stroke-width="1.5px" stroke-miterlimit="10" stroke="#ffffff" stroke-opacity="1"
                        >
                        <path  class="cls-1" d="M7.23,20.59l-4.78,1,1-4.78L17.89,2.29A2.69,2.69,0,0,1,19.8,1.5h0a2.7,2.7,0,0,1,2.7,2.7h0a2.69,2.69,0,0,1-.79,1.91Z"/><line class="cls-1" x1="0.55" y1="22.5" x2="23.45" y2="22.5"/><line class="cls-1" x1="19.64" y1="8.18" x2="15.82" y2="4.36"/></svg>
                        </a>
                        <span> </span>
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
                              stroke="#fff"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* <div className="dashboard-table-pagination flex-ctr-spb">
              <form action="#" className="flex-ctr show-rows">
                <label htmlFor="show-rows" className="label">
                  Show Rows
                </label>
                <div className="show-rows__field">
                  <select name="load-more" className="select" id="show-rows">
                    <option value="1">10</option>
                    <option value="2">20</option>
                    <option value="3">30</option>
                  </select>
                </div>
                <button className="show-rows__submit">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.875 18.6562L16.0938 14.875C16 14.8125 15.9062 14.75 15.8125 14.75H15.4062C16.375 13.625 17 12.125 17 10.5C17 6.9375 14.0625 4 10.5 4C6.90625 4 4 6.9375 4 10.5C4 14.0938 6.90625 17 10.5 17C12.125 17 13.5938 16.4062 14.75 15.4375V15.8438C14.75 15.9375 14.7812 16.0312 14.8438 16.125L18.625 19.9062C18.7812 20.0625 19.0312 20.0625 19.1562 19.9062L19.875 19.1875C20.0312 19.0625 20.0312 18.8125 19.875 18.6562ZM10.5 15.5C7.71875 15.5 5.5 13.2812 5.5 10.5C5.5 7.75 7.71875 5.5 10.5 5.5C13.25 5.5 15.5 7.75 15.5 10.5C15.5 13.2812 13.25 15.5 10.5 15.5Z"
                      fill="#324B4B"
                    />
                  </svg>
                </button>
              </form>
              <ul className="dashboard-table-pagination__list flex-ctr">
                <li>
                  <a href="#">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect width="32" height="32" rx="3" fill="white" />
                      <path
                        d="M19.2188 22.8125L19.8438 22.2188C19.9688 22.0625 19.9688 21.8125 19.8438 21.6875L14.1875 16L19.8438 10.3438C19.9688 10.2188 19.9688 9.96875 19.8438 9.8125L19.2188 9.21875C19.0625 9.0625 18.8438 9.0625 18.6875 9.21875L12.125 15.75C12 15.9062 12 16.125 12.125 16.2812L18.6875 22.8125C18.8438 22.9688 19.0625 22.9688 19.2188 22.8125Z"
                        fill="#CED4DA"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a href="#" className="active-link">
                    1
                  </a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>...</li>
                <li>
                  <a href="#">8</a>
                </li>
                <li className="active">
                  <a href="#">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 32 32"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect
                        x="32"
                        y="32"
                        width="32"
                        height="32"
                        rx="3"
                        transform="rotate(-180 32 32)"
                        fill="white"
                      />
                      <path
                        d="M12.7813 9.1875L12.1563 9.78125C12.0313 9.9375 12.0313 10.1875 12.1563 10.3125L17.8125 16L12.1563 21.6562C12.0313 21.7812 12.0313 22.0312 12.1563 22.1875L12.7813 22.7812C12.9375 22.9375 13.1562 22.9375 13.3125 22.7812L19.875 16.25C20 16.0938 20 15.875 19.875 15.7187L13.3125 9.1875C13.1563 9.03125 12.9375 9.03125 12.7813 9.1875Z"
                        fill="#CED4DA"
                      />
                    </svg>
                  </a>
                </li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
