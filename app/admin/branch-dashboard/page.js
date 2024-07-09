"use client";

import fetchWithAuth from "@/fetchWithAuth";
import "./style.css";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [todayReport, setTodayReport] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const dashboard = await fetchWithAuth(`/admin-dashboard`);
        const today_report = await fetchWithAuth("/dashboard_today_report");
        setDashboardData(dashboard.data);
        setTodayReport(today_report.data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }

    fetchData();
  }, []);

  if (!dashboardData || !todayReport) {
    return <div>Loading...</div>;
  }

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
            <Card
              icon={<NotificationIcon />}
              subText="Total Counter"
              mainText={dashboardData.counter}
            />
            <Card
              icon={<NotificationIcon />}
              subText="Total Staff"
              mainText={dashboardData.staff}
            />
            <Card
              icon={<PaperPlusIcon />}
              subText="Total User"
              mainText={dashboardData.user}
            />
          </div>
          <div className="cards dashboard-main-content__cards flex-start-spb">
            <Card
              icon={<NotificationIcon />}
              subText="Total Order"
              mainText={dashboardData.order}
            />
            <Card
              icon={<NotificationIcon />}
              subText="Total Amount"
              mainText={dashboardData.totalPayment}
            />
            {/* Add more cards as needed */}
          </div>
        </div>
      </div>
    </div>
  );
}

function Card({ icon, subText, mainText }) {
  return (
    <div className="card flex-ctr">
      <div className="card__icon flex-ctr-ctr">{icon}</div>
      <div className="card__text">
        <p className="card__text-sub">{subText}</p>
        <h3 className="card__text-main">{mainText}</h3>
      </div>
    </div>
  );
}

function NotificationIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* SVG content */}
    </svg>
  );
}

function PaperPlusIcon() {
  return (
    <svg
      width="27"
      height="24"
      viewBox="0 0 27 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* SVG content */}
    </svg>
  );
}
