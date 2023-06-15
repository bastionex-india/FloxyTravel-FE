import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../ContextApi/ContextApi";
import { environmentVariables } from "../../config/config";
import { MDBCard,
    MDBCardBody
  } from 'mdb-react-ui-kit';

const monthdata = [
  {
    name: "Jan",
    Bookings: 4000,
    Hotels: 2400
  },
  {
    name: "Feb",
    Bookings: 3000,
    Hotels: 1398
  },
  {
    name: "March",
    Bookings: 2000,
    Hotels: 9800
  },
  {
    name: "April",
    Bookings: 2780,
    Hotels: 3908
  },
  {
    name: "May",
    Bookings: 1890,
    Hotels: 4800
  },
  {
    name: "June",
    Bookings: 2390,
    Hotels: 3800
  },
  {
    name: "July",
    Bookings: 3490,
    Hotels: 4300
  },
  {
    name: "Aug",
    Bookings: 8490,
    Hotels: 4300
  },
  {
    name: "Sep",
    Bookings: 6490,
    Hotels: 7300
  },
  {
    name: "Oct",
    Bookings: 5490,
    Hotels: 4300
  },
  {
    name: "Nov",
    Bookings: 8490,
    Hotels: 2300
  },
  {
    name: "Dec",
    Bookings: 7490,
    Hotels: 5300
  }
];

const weekdata = [
    {
      name: "1st Week",
      Bookings: 3000,
      Hotels: 5400
    },
    {
      name: "2nd Week",
      Bookings: 6000,
      Hotels: 1398
    },
    {
      name: "3rd Week",
      Bookings: 7000,
      Hotels: 3800
    },
    {
      name: "4th Week",
      Bookings: 6780,
      Hotels: 5908
    }
  ];

  const yeardata = [
    {
      name: "2012",
      Bookings: 9000,
      Hotels: 4400
    },
    {
      name: "2013",
      Bookings: 4000,
      Hotels: 1398
    },
    {
      name: "2014",
      Bookings: 8000,
      Hotels: 2800
    },
    {
      name: "2015",
      Bookings: 2780,
      Hotels: 8908
    },
    {
      name: "2016",
      Bookings: 5890,
      Hotels: 6800
    },
    {
      name: "2017",
      Bookings: 2390,
      Hotels: 3800
    }
  ];

export default function GraphCheck() {

    const [graphdata,setGraphData] = useState(monthdata);
    const { authData, setAuthData } = useContext(AuthContext);

    function planUpdate(e)
    {
        const value = e.target.value;
        console.log(value);
        if(value === "yeardata")
        setGraphData(yeardata);
        else if(value === "monthdata")
        setGraphData(monthdata);
        else
        setGraphData(weekdata);
    }

    const getBookingsData = async () => {
        const allData = { 
            "query":"month",
            "year":2023 
        };
       
        await axios({
          method: "post",
          url: `${environmentVariables.apiUrl}/admin/getgraphhotels`,
          data: allData,
          headers: { _token: authData.data.token },
        })
          .then((response) => {
            console.log(response.data.data);
            
            const mergedata = [
              { month: "Jan", bookingCount: "", hotelCount: ""  },
              { month: "March", bookingCount: "", hotelCount: ""  },
              { month: "April", bookingCount: "", hotelCount: ""  },
              { month: "May", bookingCount: "", hotelCount: ""  },
              { month: "June", bookingCount: "", hotelCount: ""  },
              { month: "", bookingCount: "", hotelCount: ""  },
              { month: "", bookingCount: "", hotelCount: ""  },
              { month: "", bookingCount: "", hotelCount: ""  },
              { month: "", bookingCount: "", hotelCount: ""  },
              { month: "", bookingCount: "", hotelCount: ""  },
              { month: "", bookingCount: "", hotelCount: ""  },
              { month: "", bookingCount: "", hotelCount: ""  }
            ]   
            const bookingdata = response.data.data[0].bookingCount;
            const hoteldata = response.data.data[0].hotelCount;

            // for(let i=0;i<mergedata.length;i++)
            // {
            //   if()
            // }

            if(hoteldata.length>bookingdata.length)
            {
              for(let i=0;i<hoteldata.length;i++)
              {
                mergedata[i].month = hoteldata[i].month;
                mergedata[i].hotelCount = hoteldata[i].count;
              }

              for(let i=0;i<bookingdata.length;i++)
              {
                for(let j=0;j<mergedata.length;j++)
                {
                  if(bookingdata[i].month === mergedata[j].month)
                  {
                    mergedata[j].bookingCount = bookingdata[i].count;
                  }
                }
              }

              console.log(mergedata);
            }
          
          })
          .catch((err) => {
            console.log(err.message);
          });
      };

      useEffect(() => {
        getBookingsData();
      }, []);


  return (
    <>

    <MDBCard style={{width: '70rem'}}>

<MDBCardBody>

<div class="container text-center">
<div class="row">

<div class="col" style={{textAlign: 'left', marginLeft: '1rem', marginTop: '1rem'}}>
<h4>Manage bookings with graph plan.</h4>
</div>

<div class="col">

<div class="input-group mb-3" style={{marginLeft: '15rem', width: '15rem', marginTop: '1rem'}}>
<label class="input-group-text" for="inputGroupSelect01">Select Plan</label>
<select class="form-select" id="inputGroupSelect01" onChange={(e) => planUpdate(e)}>
<option selected>Choose...</option>
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
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
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