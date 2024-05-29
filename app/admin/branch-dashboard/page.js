import fetchWithAuth from "@/fetchWithAuth";
import "./style.css";

export default async function Dashboard() {
  const dashboard = await fetchWithAuth("/admin-dashboard");
  const today_report = await fetchWithAuth("/dashboard_today_report");
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
        <h3 className="title">Dashboard</h3>
      </div>
      <div className="dashboard-main-content-wrap">
        <div className="dashboard-main-content">
        <h1>Overall Report</h1>
          <div className="cards dashboard-main-content__cards flex-start-spb">

            <div className="card flex-ctr card-2">
              <div className="card__icon flex-ctr-ctr">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Iconly/Bulk/Notification">
                    <g id="Notification">
                      <path
                        id="Fill 1"
                        d="M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453"
                        fill="white"
                      />
                      <path
                        id="Fill 4"
                        opacity="0.4"
                        d="M14.0078 19.2284C13.5079 19.1216 10.4617 19.1216 9.96177 19.2284C9.53441 19.3271 9.07227 19.5567 9.07227 20.0603C9.09711 20.5407 9.37837 20.9647 9.76797 21.2336L9.76697 21.2346C10.2709 21.6274 10.8622 21.8771 11.4814 21.9668C11.8113 22.0121 12.1473 22.0101 12.4892 21.9668C13.1073 21.8771 13.6987 21.6274 14.2026 21.2346L14.2016 21.2336C14.5912 20.9647 14.8724 20.5407 14.8973 20.0603C14.8973 19.5567 14.4351 19.3271 14.0078 19.2284"
                        fill="white"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <div className="card__text">
                <p className="card__text-sub">Total Counter</p>
                <h3 className="card__text-main">
                  {dashboard && dashboard.data.counter}
                </h3>
              </div>
            </div>
            <div className="card flex-ctr card-3">
              <div className="card__icon flex-ctr-ctr">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Iconly/Bulk/Notification">
                    <g id="Notification">
                      <path
                        id="Fill 1"
                        d="M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453"
                        fill="white"
                      />
                      <path
                        id="Fill 4"
                        opacity="0.4"
                        d="M14.0078 19.2284C13.5079 19.1216 10.4617 19.1216 9.96177 19.2284C9.53441 19.3271 9.07227 19.5567 9.07227 20.0603C9.09711 20.5407 9.37837 20.9647 9.76797 21.2336L9.76697 21.2346C10.2709 21.6274 10.8622 21.8771 11.4814 21.9668C11.8113 22.0121 12.1473 22.0101 12.4892 21.9668C13.1073 21.8771 13.6987 21.6274 14.2026 21.2346L14.2016 21.2336C14.5912 20.9647 14.8724 20.5407 14.8973 20.0603C14.8973 19.5567 14.4351 19.3271 14.0078 19.2284"
                        fill="white"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <div className="card__text">
                <p className="card__text-sub">Total Staff </p>
                <h3 className="card__text-main">
                  {dashboard && dashboard.data.staff}
                </h3>
              </div>
            </div>
            <div className="card flex-ctr card-4">
              <div className="card__icon flex-ctr-ctr">
                <svg
                  width="27"
                  height="24"
                  viewBox="0 0 27 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Iconly/Bulk/Paper Plus">
                    <g id="Paper Plus">
                      <path
                        id="Fill 3"
                        d="M20.6141 9.021C20.1193 9.021 19.4638 9.011 18.6478 9.011C16.6575 9.011 15.021 7.508 15.021 5.675V2.459C15.021 2.206 14.7986 2 14.5251 2H8.72799C6.0226 2 3.83594 4.026 3.83594 6.509V17.284C3.83594 19.889 6.12678 22 8.95371 22H17.5853C20.2821 22 22.4676 19.987 22.4676 17.502V9.471C22.4676 9.217 22.2463 9.012 21.9706 9.013C21.5083 9.016 20.9516 9.021 20.6141 9.021Z"
                        fill="#FFFFFF"
                      />
                      <path
                        id="Fill 1"
                        d="M17.6283 2.56725C17.3006 2.25625 16.7285 2.47025 16.7285 2.90125V5.53825C16.7285 6.64425 17.727 7.55425 18.938 7.55425C19.703 7.56225 20.7639 7.56425 21.6648 7.56225C22.1262 7.56125 22.3608 7.05825 22.0407 6.75425C20.8845 5.65725 18.8142 3.69125 17.6283 2.56725Z"
                        fill="#FFFFFF"
                      />
                      <path
                        id="Fill 6"
                        d="M15.7457 12.2363H13.8518V10.5093C13.8518 10.0983 13.4868 9.76428 13.0364 9.76428C12.5859 9.76428 12.2199 10.0983 12.2199 10.5093V12.2363H10.3271C9.87668 12.2363 9.51172 12.5703 9.51172 12.9813C9.51172 13.3923 9.87668 13.7263 10.3271 13.7263H12.2199V15.4523C12.2199 15.8633 12.5859 16.1973 13.0364 16.1973C13.4868 16.1973 13.8518 15.8633 13.8518 15.4523V13.7263H15.7457C16.1961 13.7263 16.5622 13.3923 16.5622 12.9813C16.5622 12.5703 16.1961 12.2363 15.7457 12.2363Z"
                        fill="#FF0000"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <div className="card__text">
                <p className="card__text-sub">Total User </p>
                <h3 className="card__text-main">
                  {dashboard && dashboard.data.user}
                </h3>
              </div>
            </div>
          </div>

          <div className="cards dashboard-main-content__cards flex-start-spb">
            <div className="card flex-ctr card-1">
              <div className="card__icon flex-ctr-ctr">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Iconly/Bulk/Notification">
                    <g id="Notification">
                      <path
                        id="Fill 1"
                        d="M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453"
                        fill="white"
                      />
                      <path
                        id="Fill 4"
                        opacity="0.4"
                        d="M14.0078 19.2284C13.5079 19.1216 10.4617 19.1216 9.96177 19.2284C9.53441 19.3271 9.07227 19.5567 9.07227 20.0603C9.09711 20.5407 9.37837 20.9647 9.76797 21.2336L9.76697 21.2346C10.2709 21.6274 10.8622 21.8771 11.4814 21.9668C11.8113 22.0121 12.1473 22.0101 12.4892 21.9668C13.1073 21.8771 13.6987 21.6274 14.2026 21.2346L14.2016 21.2336C14.5912 20.9647 14.8724 20.5407 14.8973 20.0603C14.8973 19.5567 14.4351 19.3271 14.0078 19.2284"
                        fill="white"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <div className="card__text">
                <p className="card__text-sub">Total Order </p>
                <h3 className="card__text-main">
                  {dashboard && dashboard.data.order}
                </h3>
              </div>
            </div>
            <div className="card flex-ctr card-2">
              <div className="card__icon flex-ctr-ctr">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Iconly/Bulk/Notification">
                    <g id="Notification">
                      <path
                        id="Fill 1"
                        d="M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453"
                        fill="white"
                      />
                      <path
                        id="Fill 4"
                        opacity="0.4"
                        d="M14.0078 19.2284C13.5079 19.1216 10.4617 19.1216 9.96177 19.2284C9.53441 19.3271 9.07227 19.5567 9.07227 20.0603C9.09711 20.5407 9.37837 20.9647 9.76797 21.2336L9.76697 21.2346C10.2709 21.6274 10.8622 21.8771 11.4814 21.9668C11.8113 22.0121 12.1473 22.0101 12.4892 21.9668C13.1073 21.8771 13.6987 21.6274 14.2026 21.2346L14.2016 21.2336C14.5912 20.9647 14.8724 20.5407 14.8973 20.0603C14.8973 19.5567 14.4351 19.3271 14.0078 19.2284"
                        fill="white"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <div className="card__text">
                <p className="card__text-sub">Total Amount</p>
                <h3 className="card__text-main">
                  {dashboard && dashboard.data.totalPayment}
                </h3>
              </div>
            </div>
            <div className="card flex-ctr card-3">
              <div className="card__icon flex-ctr-ctr">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Iconly/Bulk/Notification">
                    <g id="Notification">
                      <path
                        id="Fill 1"
                        d="M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453"
                        fill="white"
                      />
                      <path
                        id="Fill 4"
                        opacity="0.4"
                        d="M14.0078 19.2284C13.5079 19.1216 10.4617 19.1216 9.96177 19.2284C9.53441 19.3271 9.07227 19.5567 9.07227 20.0603C9.09711 20.5407 9.37837 20.9647 9.76797 21.2336L9.76697 21.2346C10.2709 21.6274 10.8622 21.8771 11.4814 21.9668C11.8113 22.0121 12.1473 22.0101 12.4892 21.9668C13.1073 21.8771 13.6987 21.6274 14.2026 21.2346L14.2016 21.2336C14.5912 20.9647 14.8724 20.5407 14.8973 20.0603C14.8973 19.5567 14.4351 19.3271 14.0078 19.2284"
                        fill="white"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <div className="card__text">
                <p className="card__text-sub">Total Brand Amount</p>
                <h3 className="card__text-main">
                  {dashboard && dashboard.data.brandPayment}
                </h3>
              </div>
            </div>
            <div className="card flex-ctr card-4">
              <div className="card__icon flex-ctr-ctr">
                <svg
                  width="27"
                  height="24"
                  viewBox="0 0 27 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="Iconly/Bulk/Paper Plus">
                    <g id="Paper Plus">
                      <path
                        id="Fill 3"
                        d="M20.6141 9.021C20.1193 9.021 19.4638 9.011 18.6478 9.011C16.6575 9.011 15.021 7.508 15.021 5.675V2.459C15.021 2.206 14.7986 2 14.5251 2H8.72799C6.0226 2 3.83594 4.026 3.83594 6.509V17.284C3.83594 19.889 6.12678 22 8.95371 22H17.5853C20.2821 22 22.4676 19.987 22.4676 17.502V9.471C22.4676 9.217 22.2463 9.012 21.9706 9.013C21.5083 9.016 20.9516 9.021 20.6141 9.021Z"
                        fill="#FFFFFF"
                      />
                      <path
                        id="Fill 1"
                        d="M17.6283 2.56725C17.3006 2.25625 16.7285 2.47025 16.7285 2.90125V5.53825C16.7285 6.64425 17.727 7.55425 18.938 7.55425C19.703 7.56225 20.7639 7.56425 21.6648 7.56225C22.1262 7.56125 22.3608 7.05825 22.0407 6.75425C20.8845 5.65725 18.8142 3.69125 17.6283 2.56725Z"
                        fill="#FFFFFF"
                      />
                      <path
                        id="Fill 6"
                        d="M15.7457 12.2363H13.8518V10.5093C13.8518 10.0983 13.4868 9.76428 13.0364 9.76428C12.5859 9.76428 12.2199 10.0983 12.2199 10.5093V12.2363H10.3271C9.87668 12.2363 9.51172 12.5703 9.51172 12.9813C9.51172 13.3923 9.87668 13.7263 10.3271 13.7263H12.2199V15.4523C12.2199 15.8633 12.5859 16.1973 13.0364 16.1973C13.4868 16.1973 13.8518 15.8633 13.8518 15.4523V13.7263H15.7457C16.1961 13.7263 16.5622 13.3923 16.5622 12.9813C16.5622 12.5703 16.1961 12.2363 15.7457 12.2363Z"
                        fill="#FF0000"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <div className="card__text">
                <p className="card__text-sub">Total Admin  Percentage  </p>
                <h3 className="card__text-main">
                  {dashboard && dashboard.data.superAdminPayment}
                </h3>
              </div>
            </div>
          </div>

         <h1>Today Report</h1>

    <div className="cards dashboard-main-content__cards flex-start-spb">
        <div className="card flex-ctr card-1">
        <div className="card__icon flex-ctr-ctr">
        <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
        >
        <g id="Iconly/Bulk/Notification">
        <g id="Notification">
        <path
    id="Fill 1"
    d="M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453"
    fill="white"
        />
        <path
    id="Fill 4"
    opacity="0.4"
    d="M14.0078 19.2284C13.5079 19.1216 10.4617 19.1216 9.96177 19.2284C9.53441 19.3271 9.07227 19.5567 9.07227 20.0603C9.09711 20.5407 9.37837 20.9647 9.76797 21.2336L9.76697 21.2346C10.2709 21.6274 10.8622 21.8771 11.4814 21.9668C11.8113 22.0121 12.1473 22.0101 12.4892 21.9668C13.1073 21.8771 13.6987 21.6274 14.2026 21.2346L14.2016 21.2336C14.5912 20.9647 14.8724 20.5407 14.8973 20.0603C14.8973 19.5567 14.4351 19.3271 14.0078 19.2284"
    fill="white"
        />
        </g>
        </g>
        </svg>
        </div>
        <div className="card__text">
        <p className="card__text-sub">Total Order </p>
    <h3 className="card__text-main">
        {today_report && today_report.data.order}
</h3>
    </div>
    </div>
    <div className="card flex-ctr card-2">
        <div className="card__icon flex-ctr-ctr">
        <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
        >
        <g id="Iconly/Bulk/Notification">
        <g id="Notification">
        <path
    id="Fill 1"
    d="M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453"
    fill="white"
        />
        <path
    id="Fill 4"
    opacity="0.4"
    d="M14.0078 19.2284C13.5079 19.1216 10.4617 19.1216 9.96177 19.2284C9.53441 19.3271 9.07227 19.5567 9.07227 20.0603C9.09711 20.5407 9.37837 20.9647 9.76797 21.2336L9.76697 21.2346C10.2709 21.6274 10.8622 21.8771 11.4814 21.9668C11.8113 22.0121 12.1473 22.0101 12.4892 21.9668C13.1073 21.8771 13.6987 21.6274 14.2026 21.2346L14.2016 21.2336C14.5912 20.9647 14.8724 20.5407 14.8973 20.0603C14.8973 19.5567 14.4351 19.3271 14.0078 19.2284"
    fill="white"
        />
        </g>
        </g>
        </svg>
        </div>
        <div className="card__text">
        <p className="card__text-sub">Total Amount</p>
    <h3 className="card__text-main">
        {today_report && today_report.data.totalPayment}
</h3>
    </div>
    </div>
    <div className="card flex-ctr card-3">
        <div className="card__icon flex-ctr-ctr">
        <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
        >
        <g id="Iconly/Bulk/Notification">
        <g id="Notification">
        <path
    id="Fill 1"
    d="M19.7695 11.6453C19.039 10.7923 18.7071 10.0531 18.7071 8.79716V8.37013C18.7071 6.73354 18.3304 5.67907 17.5115 4.62459C16.2493 2.98699 14.1244 2 12.0442 2H11.9558C9.91935 2 7.86106 2.94167 6.577 4.5128C5.71333 5.58842 5.29293 6.68822 5.29293 8.37013V8.79716C5.29293 10.0531 4.98284 10.7923 4.23049 11.6453C3.67691 12.2738 3.5 13.0815 3.5 13.9557C3.5 14.8309 3.78723 15.6598 4.36367 16.3336C5.11602 17.1413 6.17846 17.6569 7.26375 17.7466C8.83505 17.9258 10.4063 17.9933 12.0005 17.9933C13.5937 17.9933 15.165 17.8805 16.7372 17.7466C17.8215 17.6569 18.884 17.1413 19.6363 16.3336C20.2118 15.6598 20.5 14.8309 20.5 13.9557C20.5 13.0815 20.3231 12.2738 19.7695 11.6453"
    fill="white"
        />
        <path
    id="Fill 4"
    opacity="0.4"
    d="M14.0078 19.2284C13.5079 19.1216 10.4617 19.1216 9.96177 19.2284C9.53441 19.3271 9.07227 19.5567 9.07227 20.0603C9.09711 20.5407 9.37837 20.9647 9.76797 21.2336L9.76697 21.2346C10.2709 21.6274 10.8622 21.8771 11.4814 21.9668C11.8113 22.0121 12.1473 22.0101 12.4892 21.9668C13.1073 21.8771 13.6987 21.6274 14.2026 21.2346L14.2016 21.2336C14.5912 20.9647 14.8724 20.5407 14.8973 20.0603C14.8973 19.5567 14.4351 19.3271 14.0078 19.2284"
    fill="white"
        />
        </g>
        </g>
        </svg>
        </div>
        <div className="card__text">
        <p className="card__text-sub">Total Brand Amount</p>
    <h3 className="card__text-main">
        {today_report && today_report.data.brandPayment}
</h3>
    </div>
    </div>
    <div className="card flex-ctr card-4">
        <div className="card__icon flex-ctr-ctr">
        <svg
    width="27"
    height="24"
    viewBox="0 0 27 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
        >
        <g id="Iconly/Bulk/Paper Plus">
        <g id="Paper Plus">
        <path
    id="Fill 3"
    d="M20.6141 9.021C20.1193 9.021 19.4638 9.011 18.6478 9.011C16.6575 9.011 15.021 7.508 15.021 5.675V2.459C15.021 2.206 14.7986 2 14.5251 2H8.72799C6.0226 2 3.83594 4.026 3.83594 6.509V17.284C3.83594 19.889 6.12678 22 8.95371 22H17.5853C20.2821 22 22.4676 19.987 22.4676 17.502V9.471C22.4676 9.217 22.2463 9.012 21.9706 9.013C21.5083 9.016 20.9516 9.021 20.6141 9.021Z"
    fill="#FFFFFF"
        />
        <path
    id="Fill 1"
    d="M17.6283 2.56725C17.3006 2.25625 16.7285 2.47025 16.7285 2.90125V5.53825C16.7285 6.64425 17.727 7.55425 18.938 7.55425C19.703 7.56225 20.7639 7.56425 21.6648 7.56225C22.1262 7.56125 22.3608 7.05825 22.0407 6.75425C20.8845 5.65725 18.8142 3.69125 17.6283 2.56725Z"
    fill="#FFFFFF"
        />
        <path
    id="Fill 6"
    d="M15.7457 12.2363H13.8518V10.5093C13.8518 10.0983 13.4868 9.76428 13.0364 9.76428C12.5859 9.76428 12.2199 10.0983 12.2199 10.5093V12.2363H10.3271C9.87668 12.2363 9.51172 12.5703 9.51172 12.9813C9.51172 13.3923 9.87668 13.7263 10.3271 13.7263H12.2199V15.4523C12.2199 15.8633 12.5859 16.1973 13.0364 16.1973C13.4868 16.1973 13.8518 15.8633 13.8518 15.4523V13.7263H15.7457C16.1961 13.7263 16.5622 13.3923 16.5622 12.9813C16.5622 12.5703 16.1961 12.2363 15.7457 12.2363Z"
    fill="#FF0000"
        />
        </g>
        </g>
        </svg>
        </div>
        <div className="card__text">
        <p className="card__text-sub">Total Admin  Percentage  </p>
    <h3 className="card__text-main">
        {today_report && today_report.data.superAdminPayment}
</h3>
    </div>
    </div>
    </div>
          {/* <div className="dashboard-main-content__box">
            <h3 className="dashboard-main-content__box-title">
              Client Statistic
            </h3>
            <div className="dashboard-main-content__box-body">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. At
                officiis, facilis sint consequuntur natus earum amet placeat
                nesciunt aut dolore necessitatibus nam, quod eligendi animi
                ipsum ratione! Eligendi reprehenderit corporis, at tempore atque
                dolorum quo vero magnam molestiae reiciendis saepe assumenda rem
                voluptatum fuga explicabo veniam. Reiciendis corrupti
                perspiciatis praesentium optio voluptate accusamus recusandae,
                earum, veniam ipsam iste officiis pariatur, nesciunt tempora
                eligendi deleniti saepe? Blanditiis impedit hic in optio!
                Repudiandae vel, repellendus quod molestias porro, qui
                recusandae, consectetur repellat debitis mollitia quam quas?
                Assumenda iste autem, dignissimos facere delectus eaque et
                repellendus in. Vitae saepe deserunt excepturi enim iure.
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
