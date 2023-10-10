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
import { BsCalendarDay } from "react-icons/bs";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import CircularLoader from "../../Component/CircularLoader/CircularLoader";
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
export default function GraphCheck() {
  const [graphdata, setGraphData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { authData, setAuthData } = useContext(AuthContext);
  const [alldata, setAlldata] = useState();
  const [yeardata, setYeardata] = useState();
  const [tab, setTab] = useState("Hotels");
  const [fromDate, setFromDate] = useState(null);
  const [isCustom, setIsCustom] = useState(false);
  const [toDate, setToDate] = useState(null);
  const [xLabel, setXLabel] = useState("Year");
  const [customData, setCustomData] = useState(null);
  const [type, setType] = useState('hotel');
  const ButtonGroup = styled.div`
    display: flex;
  `;
  const FilterWrapper = styled.div`
    display: flex;
    position: absolute;
    justify-content: flex-start;
    align-items: center;
    top: 110px;
    left: 30px;
    padding: 20px 50px;
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

  function planUpdate(e) {
    const value = e.target.value;
    if (value === "yeardata") {
      setGraphData(yeardata);
      setXLabel("Year");
      setIsCustom(false);
    } else if (value === "monthdata") {
      setGraphData(alldata);
      setXLabel("Month");
      setIsCustom(false);
    } else if (value === "custom") {
      setIsCustom(true);
      setXLabel("Date");
    } else setIsCustom(false);
  }
  const getCustomData = async () => {
    const allData = {
      query: "custom",
      year: 2023,
      fromDate: fromDate,
      toDate: toDate,
      type:type
    };
    //https://uat-travel-api.floxypay.com/vendor/getgraphhotels/a8c99f2a-9622-417a-b72e-aef09da04ba6

    await axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/admin/getgraphhotels`,
      data: allData,
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        setCustomData(response.data.data[0]);
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
        }else if (tab === "Activities") {
          const activityData = response.data.data[0]?.activityCount;
          activityData.forEach((val) => {
            let mergedata = {};
            mergedata.Name = val._id;
            mergedata.Activities = val.count;
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
  const getYearData = async () => {
    const allData = {
      query: "year",
      year: 2023,
      type:type
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
          { Name: 2018, Bookings: 0, Hotels: 0, Earnings: 0, Activities:0 },
          { Name: 2019, Bookings: 0, Hotels: 0, Earnings: 0, Activities:0 },
          { Name: 2020, Bookings: 0, Hotels: 0, Earnings: 0, Activities:0 },
          { Name: 2021, Bookings: 0, Hotels: 0, Earnings: 0, Activities:0 },
          { Name: 2022, Bookings: 0, Hotels: 0, Earnings: 0, Activities:0 },
          { Name: 2023, Bookings: 0, Hotels: 0, Earnings: 0, Activities:0 },
        ];

        // for (let i = 0; i < mergedata.length; i++) {
        //   for (let j = 0; j < data.length; j++) {
        //     if (mergedata[i].Name === 2023) {
        //       mergedata[i].Bookings = data[j].bookingCount;
        //     }
        //   }
        // }
        mergedata[5].Bookings = data[2].bookingCount;
        mergedata[5].Hotels = data[0].hotelCount;
        mergedata[5].Activities = data[1].activityCount;
        for (let i = 0; i < mergedata.length; i++) {
          for (let j = 0; j < data.length; j++) {
            if (mergedata[i].Name === 2023) {
              mergedata[i].Earnings = data[j].earnings;
            }
          }
        }
        setGraphData(mergedata);
        setYeardata(mergedata);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const getMonthData = async () => {
    const allData = {
      query: "month",
      year: 2023,
      type:type
    };

    await axios({
      method: "post",
      url: `${environmentVariables.apiUrl}/admin/getgraphhotels`,
      data: allData,
      headers: { _token: authData.data.token },
    })
      .then((response) => {
        const mergedata = [
          { Name: 1, Bookings: 0, Hotels: 0, Earnings: 0, Activities:0  },
          { Name: 2, Bookings: 0, Hotels: 0, Earnings: 0, Activities:0  },
          { Name: 3, Bookings: 0, Hotels: 0, Earnings: 0, Activities:0  },
          { Name: 4, Bookings: 0, Hotels: 0, Earnings: 0, Activities:0  },
          { Name: 5, Bookings: 0, Hotels: 0, Earnings: 0, Activities:0  },
          { Name: 6, Bookings: 0, Hotels: 0, Earnings: 0, Activities:0  },
          { Name: 7, Bookings: 0, Hotels: 0, Earnings: 0, Activities:0  },
          { Name: 8, Bookings: 0, Hotels: 0, Earnings: 0, Activities:0  },
          { Name: 9, Bookings: 0, Hotels: 0, Earnings: 0, Activities:0  },
          { Name: 10, Bookings: 0, Hotels: 0, Earnings: 0, Activities:0  },
          { Name: 11, Bookings: 0, Hotels: 0, Earnings: 0, Activities:0  },
          { Name: 12, Bookings: 0, Hotels: 0, Earnings: 0, Activities:0  },
        ];

        const bookingdata = response.data.data[0].bookingCount;
        const hoteldata = response.data.data[0].hotelCount;
        const activitydata = response.data.data[0].activityCount;
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
          for (let j = 0; j < activitydata.length; j++) {
            if (mergedata[i].Name === activitydata[j].month) {
              mergedata[i].Activities = activitydata[j].count;
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
    setIsLoading(true);
    getMonthData();
    getYearData();
  }, []);

  return (
    <>
      <MDBCard style={{ width: "63rem", position: "relative" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            margin: "65px 0  65px 0",
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
              onClick={() => {setTab("Hotels");setType('hotel')}}
              active={tab === "Hotels"}
            >
              Hotels
            </TabButton>
            <TabButton
              onClick={() => {setTab("Activities");setType('activity')}}
              active={tab === "Activities"}
              style={{
                borderRight: "1px dashed black",
              }}
            >
              Activities
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

        {isLoading === true ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <CircularLoader></CircularLoader>
          </div>
        ) : (
          <BarChart
            width={800}
            height={300}
            data={graphdata}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="Name"
              label={{ value: xLabel, position: "outsideBottom", dy: 10 }}
            />
            <YAxis
              label={{
                value: `Number of ${tab}`,
                angle: -90,
                dy: 50,
                position: "insideLeft",
              }}
            />
            <Tooltip />
            {/* <Legend /> */}
            {/* <Bar dataKey="Bookings" fill="#8884d8" /> */}
            <Bar dataKey={tab} shape={<CustomBar />} />
            {/* <Bar dataKey="Earnings" fill="red" /> */}
          </BarChart>
        )}
      </MDBCard>
    </>
  );
}
