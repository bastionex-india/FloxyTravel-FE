import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../ContextApi/ContextApi";
import { environmentVariables } from "../../config/config";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";

export default function GraphCheck() {
  const [graphdata, setGraphData] = useState();
  const { authData, setAuthData } = useContext(AuthContext);
  const [alldata, setAlldata] = useState();
  const [yeardata, setYeardata] = useState();
  const [weekdata, setWeekdata] = useState();
  const [tab, setTab] = useState("Hotels");
  const TabButton = styled.div`
    background-color: ${(props) =>
      props.active === true ? "#000" : "#01575c"};
    height: 40px;
    font-size: 14px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    padding: 0px 20px;
    border-radius: 5px;
    // font-weight: 700;
    cursor: pointer;
  `;
  function planUpdate(e) {
    const value = e.target.value;
    console.log(value);
    if (value === "yeardata") setGraphData(yeardata);
    else if (value === "monthdata") setGraphData(alldata);
    else setGraphData(weekdata);
  }

  const getYearData = async () => {
    const allData = {
      query: "year",
      year: 2023,
    };

    await axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/admin/getgraphhotels`,
      data: allData,
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        const data = response.data.data;

        const mergedata = [
          { Name: 2018, Bookings: 0, Hotels: 0 },
          { Name: 2019, Bookings: 0, Hotels: 0 },
          { Name: 2020, Bookings: 0, Hotels: 0 },
          { Name: 2021, Bookings: 0, Hotels: 0 },
          { Name: 2022, Bookings: 0, Hotels: 0 },
          { Name: 2023, Bookings: 0, Hotels: 0 },
        ];

        for (let i = 0; i < mergedata.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (mergedata[i].Name === 2023) {
              mergedata[i].Bookings = data[j].bookingCount;
            }
          }
        }

        mergedata[5].Hotels = data[0].hotelCount;

        setYeardata(mergedata);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getMonthData = async () => {
    const allData = {
      query: "month",
      year: 2023,
    };

    await axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/admin/getgraphhotels`,
      data: allData,
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        const mergedata = [
          { Name: 1, Bookings: 0, Hotels: 0, Earnings: 0 },
          { Name: 2, Bookings: 0, Hotels: 0, Earnings: 0 },
          { Name: 3, Bookings: 0, Hotels: 0, Earnings: 0 },
          { Name: 4, Bookings: 0, Hotels: 0, Earnings: 0 },
          { Name: 5, Bookings: 0, Hotels: 0, Earnings: 0 },
          { Name: 6, Bookings: 0, Hotels: 0, Earnings: 0 },
          { Name: 7, Bookings: 0, Hotels: 0, Earnings: 0 },
          { Name: 8, Bookings: 0, Hotels: 0, Earnings: 0 },
          { Name: 9, Bookings: 0, Hotels: 0, Earnings: 0 },
          { Name: 10, Bookings: 0, Hotels: 0, Earnings: 0 },
          { Name: 11, Bookings: 0, Hotels: 0, Earnings: 0 },
          { Name: 12, Bookings: 0, Hotels: 0, Earnings: 0 },
        ];

        const bookingdata = response.data.data[0].bookingCount;
        const hoteldata = response.data.data[0].hotelCount;
        const earnings = response.data.data[0].earnings;
        for (let i = 0; i < mergedata.length; i++) {
          for (let j = 0; j < bookingdata.length; j++) {
            if (mergedata[i].Name === bookingdata[j].month) {
              mergedata[i].Bookings = bookingdata[j].count;
            }
          }
        }

        for (let i = 0; i < mergedata.length; i++) {
          for (let j = 0; j < hoteldata.length; j++) {
            if (mergedata[i].Name === hoteldata[j].month) {
              mergedata[i].Hotels = hoteldata[j].count;
            }
          }
        }
        for (let i = 0; i < mergedata.length; i++) {
          for (let j = 0; j < bookingdata.length; j++) {
            if (mergedata[i].Name === bookingdata[j].month) {
              mergedata[i].Earnings = earnings[j].totalAmount;
            }
          }
        }
        for (let i = 0; i < mergedata.length; i++) {
          if (mergedata[i].Name === 1) {
            mergedata[i].Name = "Jan";
          }
          if (mergedata[i].Name === 2) {
            mergedata[i].Name = "Feb";
          }
          if (mergedata[i].Name === 3) {
            mergedata[i].Name = "March";
          }
          if (mergedata[i].Name === 4) {
            mergedata[i].Name = "April";
          }
          if (mergedata[i].Name === 5) {
            mergedata[i].Name = "May";
          }
          if (mergedata[i].Name === 6) {
            mergedata[i].Name = "June";
          }
          if (mergedata[i].Name === 7) {
            mergedata[i].Name = "July";
          }
          if (mergedata[i].Name === 8) {
            mergedata[i].Name = "Aug";
          }
          if (mergedata[i].Name === 9) {
            mergedata[i].Name = "Sep";
          }
          if (mergedata[i].Name === 10) {
            mergedata[i].Name = "Oct";
          }
          if (mergedata[i].Name === 11) {
            mergedata[i].Name = "Nov";
          }
          if (mergedata[i].Name === 12) {
            mergedata[i].Name = "Dec";
          }
        }

        setAlldata(mergedata);
        console.log(alldata);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getWeekData = async () => {
    const allData = {
      query: "week",
      year: 2023,
    };

    await axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/admin/getgraphhotels`,
      data: allData,
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        const bookingdata = response.data.data[0].bookingCount;
        const hoteldata = response.data.data[0].hotelCount;
        const earnings = response.data.data[0].earnings;
        const mergedata = [
          { Name: 21, Bookings: 0, Hotels: 0 },
          { Name: 22, Bookings: 0, Hotels: 0 },
          { Name: 23, Bookings: 0, Hotels: 0 },
          { Name: 24, Bookings: 0, Hotels: 0 },
          { Name: 25, Bookings: 0, Hotels: 0 },
          { Name: 26, Bookings: 0, Hotels: 0 },
        ];

        for (let i = 0; i < mergedata.length; i++) {
          for (let j = 0; j < bookingdata.length; j++) {
            if (mergedata[i].Name === bookingdata[j].week) {
              mergedata[i].Bookings = bookingdata[j].count;
            }
          }
        }

        for (let i = 0; i < mergedata.length; i++) {
          for (let j = 0; j < hoteldata.length; j++) {
            if (mergedata[i].Name === hoteldata[j].week) {
              mergedata[i].Hotels = hoteldata[j].count;
            }
          }
        }
        for (let i = 0; i < mergedata.length; i++) {
          for (let j = 0; j < earnings.length; j++) {
            if (mergedata[i].Name === earnings[j].week) {
              mergedata[i].Earnings = earnings[j].totalAmount;
            }
          }
        }

        for (let i = 0; i < mergedata.length; i++) {
          if (mergedata[i].Name === 21) {
            mergedata[i].Name = "Week 21";
          }
          if (mergedata[i].Name === 22) {
            mergedata[i].Name = "Week 22";
          }
          if (mergedata[i].Name === 23) {
            mergedata[i].Name = "Week 23";
          }
          if (mergedata[i].Name === 24) {
            mergedata[i].Name = "Week 24";
          }
          if (mergedata[i].Name === 25) {
            mergedata[i].Name = "Week 25";
          }
          if (mergedata[i].Name === 26) {
            mergedata[i].Name = "Week 26";
          }
        }

        setWeekdata(mergedata);
        console.log(mergedata);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    getMonthData();
    getYearData();
    getWeekData();
  }, []);

  return (
    <>
      <MDBCard style={{ width: "70rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "20px",
          }}
        >
          <TabButton onClick={() => setTab("Hotels")} active={tab === "Hotels"}>
            Hotels
          </TabButton>
          <TabButton
            onClick={() => setTab("Bookings")}
            active={tab === "Bookings"}
          >
            Bookings
          </TabButton>
          <TabButton
            onClick={() => setTab("Earnings")}
            active={tab === "Earnings"}
          >
            Earnings
          </TabButton>
          <select
            style={{ width: "200px" }}
            class="form-select"
            id="inputGroupSelect01"
            onChange={(e) => planUpdate(e)}
          >
            <option selected>Sort...</option>
            <option value={`weekdata`}>Week</option>
            <option value={`monthdata`}>Month</option>
            <option value={`yeardata`}>Year</option>
          </select>
        </div>
        <MDBCardBody>
          <BarChart
            width={800}
            height={300}
            data={graphdata}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="Name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {/* <Bar dataKey="Bookings" fill="#8884d8" /> */}
            <Bar dataKey={tab} fill="#82ca9d" />
            {/* <Bar dataKey="Earnings" fill="red" /> */}
          </BarChart>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}
