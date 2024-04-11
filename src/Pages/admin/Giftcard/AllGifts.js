import React, { useState } from 'react'
import TablePagination from "@mui/material/TablePagination";
import styled from "styled-components";
import { useEffect } from 'react';
import  axios  from 'axios';
import CircularLoader from '../../../Component/CircularLoader/CircularLoader';
import Typography from "@mui/material/Typography";


import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const boldTextCss = {
fontWeight: 700,
};
  
const CustomTablePagination = styled(TablePagination)`
  display: flex !important;
  justify-content: flex-end !important;
  align-items: baseline !important;
  p {
    margin: 0px !important;
  }

`;

const AllGifts = () => {
    const [allGiftsData, setAllGiftsData] = useState([])
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState();

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const getAllGiftsData = ()=>{

        let config = {
            method: 'get',
            url: `http://localhost:4000/admin/getallgiftsdata?page=${page+1}&size=${rowsPerPage}`,
            headers: { }
        };

        axios.request(config)
        .then((response) => {
            const { totalItems, totalPages, currentPage, data } = response.data;
            // setTotalPages(totalPages);
            setPage(currentPage - 1);
            setAllGiftsData(data)
            setTotalItems(totalItems);
            setIsLoading(false);

        })
        .catch((error) => {
            console.log(error);
            setIsLoading(false);

        });

    }
    useEffect(()=>{
        getAllGiftsData()
    },[page, rowsPerPage])
    console.log("allGiftsData",allGiftsData)
  return (
    <div>
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
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell style={boldTextCss}>Product Name</TableCell>
                    <TableCell style={boldTextCss} align="center">
                      Email
                    </TableCell>
                    <TableCell style={boldTextCss} align="center">
                      Receiver email
                    </TableCell>
                    <TableCell style={boldTextCss} align="center">
                      Sender Name
                    </TableCell>
                    <TableCell style={boldTextCss} align="center">
                      Status
                    </TableCell>
                    <TableCell style={boldTextCss} align="center">
                      Gift Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {allGiftsData && allGiftsData.length !== 0 ? (
                    allGiftsData.map((item, index) => {
                      const bookingDate = new Date(item.createdAt);
                      return (
                        <TableRow
                          key={index}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {item.productName} 
                          </TableCell>
                          {/* <TableCell align="center">{formatDate(item.checkIn)}</TableCell> */}
                          {/* <TableCell align="center">{formatDate(item.checkOut)}</TableCell> */}
                          <TableCell align="center">
                            {item?.email}
                          </TableCell>
                          <TableCell align="center">
                            {item.recieverEmail}
                          </TableCell>
                          <TableCell align="center">
                            {item.senderName}
                          </TableCell>
                          <TableCell align="center">
                            {item.status}
                          </TableCell>
                          <TableCell align="center">
                            {item.giftcardstatus}
                          </TableCell>
                          <TableCell align="center">
                            {/* <Button
                              size="small"
                              variant="contained"
                              type="button"
                              onClick={() => handleClick(item)}
                            >
                              View
                            </Button> */}
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <Typography variant="body1">Data not found</Typography>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
              <CustomTablePagination
                rowsPerPageOptions={[1, 3, 10]}
                component="div"
                count={totalItems}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                style={{  display:"flex", justifyContent:"flex-end",alignItems:"baseline"}}
            />
            </TableContainer>
          )}
     
    </div>
  )
}

export default AllGifts
