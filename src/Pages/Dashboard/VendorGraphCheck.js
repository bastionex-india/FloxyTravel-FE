import React from "react";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import CircularLoader from "../../Component/CircularLoader/CircularLoader";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../ContextApi/ContextApi";
import { environmentVariables } from "../../config/config";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import { BsCalendarDay } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
const CustomBar = (props) => {
  const { x, y, width, height, value } = props;

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill="#8884d8" />
      <text
        x={x + width / 2}
        y={y + height / 2}
        fill="#fff"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {value}
      </text>
    </g>
  );
};
export default function VendorGraphCheck() {
  const [graphdata, setGraphData] = useState();

  const { authData, setAuthData } = useContext(AuthContext);
  const [monthdata, setMonthdata] = useState();
  const [yeardata, setYeardata] = useState();
  const [fromDate, setFromDate] = useState(null);
  const [isCustom, setIsCustom] = useState(false);
  const [toDate, setToDate] = useState(null);
  const [tab, setTab] = useState("Bookings");
  const [xLabel, setXLabel] = useState();
  const [vendorId, setVendorId] = useState(null);
  const [isLoadingGraph, setIsLoadingGraph] = useState(false);
  const ButtonGroup = styled.div`
    display: flex;
  `;
  const FilterWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 20px 50px;
    position: absolute;
    top: 60px;
    left: 30px;
  `;
  const FilterComponent = styled.div`
    margin-left: 10px;
    position: relative;
  `;
  const DateIcon = styled.div`
    position: absolute;
    right: 5%;
    z-index: 1;
  `;
  const TabButton = styled.div`
    background-color: ${(props) =>
      props.active === true ? "#01575c" : "#fff"};
    height: 40px;
    font-size: 14px;
    color: ${(props) => (props.active === true ? "#fff" : "#000")};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    padding: 0px 20px;
    /* border-radius: 5px; */
    // font-weight: 700;
    cursor: pointer;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
  `;
  const getYearData = async () => {
    const allData = {
      query: "year",
      year: 2023,
    };
    
    await axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/vendor/getgraphhotels/${vendorId}`,
      data: allData,
      headers: { _token: authData !== null && authData.data.token },
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
        setGraphData(mergedata);
        setYeardata(mergedata);
        setXLabel("Year");
        setIsLoadingGraph(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoadingGraph(false);
      });
  };

  const getMonthData = async () => {
    const allData = {
      query: "month",
      year: 2023,
    };
    
    await axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/vendor/getgraphhotels/${vendorId}`,
      data: allData,
      headers: { _token: authData !== null && authData.data.token },
    })
      .then((response) => {
        const data = response.data.data;
        setMonthdata(response.data.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const getCustomData = async () => {
    const allData = {
      query: "custom",
      year: 2023,
      fromdate: fromDate,
      todate: toDate,
    };
    
    await axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/vendor/getgraphhotels/${vendorId}`,
      data: allData,
      headers: { _token: authData !== null && authData.data.token },
    })
      .then((response) => {
        const responseData = response.data.data[0];
        let mergedatas = [];
        if (tab === "Hotels") {
          const hotelData = response.data.data[0]?.hotelCount;
          hotelData.forEach((val) => {
            let mergedata = {};
            mergedata.Name = val._id;
            mergedata.Hotels = val.count;
            mergedatas.push(mergedata);
          });
          setGraphData(mergedatas);
        } else if (tab === "Bookings") {
          const bookingData = response.data.data[0]?.bookingCount;
          bookingData.forEach((val) => {
            let mergedata = {};
            mergedata.Name = val._id;
            mergedata.Bookings = val.count;
            mergedatas.push(mergedata);
          });
          setGraphData(mergedatas);
        } else if (tab === "Earnings") {
          const earningData = response.data.data[0]?.earnings;
          earningData.forEach((val) => {
            let mergedata = {};
            mergedata.Name = val._id;
            mergedata.Earnings = val.totalPayAmount;
            mergedatas.push(mergedata);
          });
          setGraphData(mergedatas);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    if (fromDate !== null && toDate !== null && isCustom === true) {
      getCustomData();
    }
  }, [fromDate, toDate, tab]);
  useEffect(() => {
    setIsLoadingGraph(true);
    if (window !== undefined) {
      const param = window.location.href.split("/").pop();
      const vendorid =
        authData !== null &&
        (authData.data.vendorId ? authData.data.vendorId : param);
      setVendorId(vendorid);
    }

    getMonthData();
    getYearData();
  }, [vendorId]);

  function planUpdate(e) {
    setToDate(null);
    setFromDate(null);
    const value = e.target.value;
    if (value === "yeardata") {
      setGraphData(yeardata);
      setIsCustom(false);
      setXLabel("Year");
    } else if (value === "monthdata") {
      setGraphData(monthdata);
      setIsCustom(false);
      setXLabel("Month");
    } else if (value === "custom") {
      setIsCustom(true);
      setXLabel("Date");
    } else setIsCustom(false);
  }

  return (
    <>
      {isLoadingGraph === true ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <CircularLoader></CircularLoader>
        </div>
      ) : (
        <MDBCard style={{ width: "100%", position: "relative", marginTop:"10px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "65px 0 65px 0",
            }}
          >
            <ButtonGroup>
              <TabButton
                style={{
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                  borderRight: "1px dashed black",
                  borderLeft: "1px solid black",
                }}
                onClick={() => setTab("Bookings")}
                active={tab === "Bookings"}
              >
                Bookings
              </TabButton>

              <TabButton
                onClick={() => setTab("Earnings")}
                active={tab === "Earnings"}
                style={{
                  borderTopRightRadius: "10px",
                  borderBottomRightRadius: "10px",
                  borderLeft: "1px dashed black",
                  borderRight: "1px solid black",
                }}
              >
                Earnings
              </TabButton>
            </ButtonGroup>

            <select
              style={{ width: "200px" }}
              class="form-select"
              id="inputGroupSelect01"
              onChange={(e) => planUpdate(e)}
            >
              <option selected>Sort...</option>
              <option value={`monthdata`}>Month</option>
              <option value={`yeardata`}>Year</option>
              <option value={`custom`}>Custom</option>
            </select>
          </div>
          {isCustom === true ? (
            <FilterWrapper>
              <FilterComponent>
                {/* <FilterLabel>From</FilterLabel> */}
                <DateIcon>
                  <BsCalendarDay size="1.5rem" />
                </DateIcon>
                <DatePicker
                  placeholderText="Start Date"
                  selected={fromDate}
                  disabled={isCustom === false}
                  onChange={(date) => {
                    setFromDate(date);
                    // setPageNo(1);
                  }}
                  selectsStart
                  startDate={fromDate}
                  endDate={toDate}
                />
              </FilterComponent>
              <FilterComponent>
                {/* <FilterLabel>To</FilterLabel> */}
                <DateIcon>
                  <BsCalendarDay size="1.5rem" />
                </DateIcon>

                <DatePicker
                  placeholderText="End Date"
                  selected={toDate}
                  onChange={(date) => setToDate(date)}
                  selectsStart
                  startDate={fromDate}
                  endDate={toDate}
                  disabled={fromDate ? false : true}
                  minDate={fromDate}
                  style={{ padding: "10px" }}
                />
              </FilterComponent>
            </FilterWrapper>
          ) : (
            <></>
          )}
          <BarChart
            width={700}
            height={300}
            data={graphdata}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 50,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" style={{width:"700px"}}/>
            <XAxis
              dataKey="Name"
              label={{ value: xLabel, dy: 20, position: "insideBottom" }}
            />
            <YAxis
              label={{
                value: `Number of ${tab}`,
                angle: -90,
                position: "insideLeft",
                dy: 60,
              }}
            />
            <Tooltip  style={{width:"700px"}}/>
            {/* <Legend /> */}
            <Bar dataKey={tab} shape={<CustomBar />} style={{width:"700px"}}/>
          </BarChart>
        </MDBCard>
      )}
    </>
  );
}
