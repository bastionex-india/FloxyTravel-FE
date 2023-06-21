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
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../ContextApi/ContextApi";
import { environmentVariables } from "../../config/config";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";

const monthdata1 = [
  { Name: "jan", Hotels: 0, Bookings: 0 },
  { Name: "feb", Hotels: 0, Bookings: 0 },
  { Name: "mar", Hotels: 0, Bookings: 0 },
  { Name: "apr", Hotels: 0, Bookings: 0 },
  { Name: "may", Hotels: 0, Bookings: 0 },
  { Name: "jun", Hotels: 0, Bookings: 0 },
  { Name: "jul", Hotels: 3, Bookings: 2 },
  { Name: "aug", Hotels: 0, Bookings: 0 },
  { Name: "sep", Hotels: 0, Bookings: 0 },
  { Name: "oct", Hotels: 0, Bookings: 0 },
  { Name: "nov", Hotels: 0, Bookings: 0 },
  { Name: "dec", Hotels: 0, Bookings: 0 },
];

export default function VendorGraphCheck() {
  const [graphdata, setGraphData] = useState(monthdata1);
  const { authData, setAuthData } = useContext(AuthContext);
  const [monthdata, setMonthdata] = useState();
  const [yeardata, setYeardata] = useState();
  const [weekdata, setWeekdata] = useState();

  const getYearData = async () => {
    const allData = {
      query: "year",
      year: 2023,
    };
    //https://uat-travel-api.floxypay.com/vendor/getgraphhotels/a8c99f2a-9622-417a-b72e-aef09da04ba6

    await axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/vendor/getgraphhotels/a8c99f2a-9622-417a-b72e-aef09da04ba6`,
      data: allData,
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        const data = response.data.data;

        const leftdata = [
          { Name: 2018, Bookings: 0, Hotels: 0 },
          { Name: 2019, Bookings: 0, Hotels: 0 },
          { Name: 2020, Bookings: 0, Hotels: 0 },
          { Name: 2021, Bookings: 0, Hotels: 0 },
          { Name: 2022, Bookings: 0, Hotels: 0 },
        ];

        const mergedata = [...leftdata, ...data];

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
    //https://uat-travel-api.floxypay.com/vendor/getgraphhotels/a8c99f2a-9622-417a-b72e-aef09da04ba6

    await axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/vendor/getgraphhotels/a8c99f2a-9622-417a-b72e-aef09da04ba6`,
      data: allData,
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        const data = response.data.data;
        setMonthdata(response.data.data);
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
    //https://uat-travel-api.floxypay.com/vendor/getgraphhotels/a8c99f2a-9622-417a-b72e-aef09da04ba6

    await axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/vendor/getgraphhotels/a8c99f2a-9622-417a-b72e-aef09da04ba6`,
      data: allData,
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        const data = response.data.data;
        console.log(data[21]);
        const mergedata = [
          { Name: "Week 1", Hotels: 0, Bookings: 0 },
          { Name: "Week 2", Hotels: 0, Bookings: 0 },
          { Name: "Week 3", Hotels: 0, Bookings: 0 },
          { Name: "Week 4", Hotels: 0, Bookings: 0 },
          { Name: "Week 5", Hotels: 0, Bookings: 0 },
          { Name: "Week 6", Hotels: 0, Bookings: 0 },
        ];

        for (let i = 0; i < 6; i++) {
          mergedata[i].Hotels = data[i].Hotels;
          mergedata[i].Bookings = data[i].Bookings;
        }

        console.log(mergedata);

        setWeekdata(mergedata);
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

  function planUpdate(e) {
    const value = e.target.value;
    console.log(value);
    if (value === "yeardata") setGraphData(yeardata);
    else if (value === "monthdata") setGraphData(monthdata);
    else setGraphData(weekdata);
  }

  return (
    <>
      <MDBCard style={{ width: "70rem" }}>
        <MDBCardBody>
          <div class="container text-center">
            <div class="row">
              <div
                class="col"
                style={{
                  textAlign: "left",
                  marginLeft: "1rem",
                  marginTop: "1rem",
                }}
              ></div>

              <div class="col">
                <div
                  class="input-group mb-3"
                  style={{
                    marginLeft: "15rem",
                    width: "8rem",
                    marginTop: "1rem",
                  }}
                >
                  {/* <label class="input-group-text" for="inputGroupSelect01">Select Plan</label> */}
                  <select
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
              </div>
            </div>
          </div>

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
            <Bar dataKey="Bookings" fill="#8884d8" />
            <Bar dataKey="Hotels" fill="#82ca9d" />
          </BarChart>
        </MDBCardBody>
      </MDBCard>
    </>
  );
}
