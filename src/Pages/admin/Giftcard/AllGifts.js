import React, { useState } from 'react'
import TablePagination from "@mui/material/TablePagination";
import styled from "styled-components";
import { useEffect } from 'react';
import  axios  from 'axios';
import CircularLoader from '../../../Component/CircularLoader/CircularLoader';
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useNavigate } from "react-router-dom";


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
import { environmentVariables } from '../../../config/config';

const boldTextCss = {
fontWeight: 700,
};
  
const TextMainWrapper = styled.div`
  /* display: grid; 
  grid-template-columns: 20% 80%;  */
  @media (max-width: 768px) {
    display: flex;
  }
`;
const TextRoot = styled.div`
  // background-color: #9f94942b;
  padding: 20px;
  /* width: 967px; */
  margin: 10px auto;
  @media (max-width: 768px) {
    width: 100vw;
  }
`;
const Root = styled.div`
  // margin: 0px 60px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    margin: 0px 20px;
  }
`;
const Heading = styled.div`
  font-size: 1.75rem;
  padding-left: 40px; 
  @media (max-width: 768px) {
    display: none;
  }
`;
const HeadingWrapper = styled.div`
  position: relative;
  display: -webkit-box;
`;
const CustomTablePagination = styled(TablePagination)`
  display: flex !important;
  justify-content: flex-end !important;
  align-items: baseline !important;
  p {
    margin: 0px !important;
  }

`;
const SearchContainerWrapper = styled.div``;
const SearchFilterContainer = styled.div`
  position: relative;
`;
const SearchFilterInput = styled.input`
  width: 50%;
  margin: 10px 0 20px 0;
  padding: 10px;
  border-radius: 5px;
  outline: none;
  border: none;
  // box-shadow: rgba(50,50,93,0.25) 0px 6px 12px -2px, rgba(0,0,0,0.3) 0px 3px 7px -3px;
`;

const Span = styled.span`
  position: absolute;
  bottom: 39%;
  left: 47%;
`;
const TextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  width: 100%;
  @media(max-width:1380px){
    isplay: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }

  @media (max-width: 768px) {
    justify-content: flex-end;
  }
`;
const TextSelectField = styled.div`
  // margin: 10px 0px 0px 10px;
  @media (max-width: 768px) {
    margin: 0;
  }
`;

const Select = styled.select`
  width: 15rem;
  height: 50px;
  padding: 0px 10px;
  border-radius: 5px;
  outline: none;
  border: none;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;

  ::-ms-expand {
    margin: "0 20px 0 10px";
    padding: "0 20px 0 10px";
  }
  @media(max-width:1380px){
    width: 500px;
  }
`;

const AllGifts = () => {
    const [allGiftsData, setAllGiftsData] = useState([])
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalItems, setTotalItems] = useState();
    const [search, setSearch] = useState("");
    const [select, setSelect] = useState("");
    const [selectGiftCard, setSelectGiftCard] = useState("");

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChange = (event) => {
      const data = event.target.value;
      // setSelect("");
      // setSelect1("");
      // setFromDate(null);
      // setToDate(null);
      // if (data.length >= 2) {
        setSearch(data);
      // } else {
        // setSearch("");
      // }
    };
    const getAllGiftsData = ()=>{

        let config = {
          method: 'get',
          url: `h${environmentVariables.apiUrl}/admin/getallgiftsdata?page=${page+1}&size=${rowsPerPage}&productName=${search}&status=${select}&giftcardstatus=${selectGiftCard}`,
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
    },[page, rowsPerPage, search, select, selectGiftCard])
    console.log("allGiftsData",allGiftsData)
  return (
    <TextMainWrapper>
      <TextRoot>
      <Root>
      <HeadingWrapper>
        <IconButton title="Back" onClick={() => navigate(-1)} size="small" sx={{ backgroundColor: "#e1e1e1", color: "#01575c", marginTop: "4px" }}>
            <ArrowBackIosNewOutlinedIcon />
            </IconButton>
        <Heading>Gift Card History</Heading>
      </HeadingWrapper>
      <SearchContainerWrapper>
        <SearchFilterContainer>
          <SearchFilterInput
            type='text'
            placeholder={"Search by Product Name"}
            value={search}
            onChange={handleChange}
          />
          <Span>
            {" "}
            <i class="fa-solid fa-magnifying-glass"></i>
          </Span>
        </SearchFilterContainer>
        <TextWrapper>
          {/* <TextSelectField>
            <Select
              onChange={(e) => {
                setSelect1(e.target.value);
                setSearch("");
              }}
              value={select1}
              required
            >
              <option value="" hidden>
                Select Vendor
              </option>
              <option value="">All</option>
              {allVendors.map((item, index) => {
                return (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
            </Select>
          </TextSelectField> */}
        
          <TextSelectField>
            <Select
              onChange={(e) => {
                setSelect(e.target.value);
              }}
              value={select}
              required
            >
              <option value="" hidden>
                Select Status
              </option>
              <option value="">All</option>
              <option value="pending">Pending</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </Select>
          </TextSelectField>
          <TextSelectField>
            <Select
              onChange={(e) => {
                setSelectGiftCard(e.target.value);
              }}
              value={selectGiftCard}
              required
            >
              <option value="" hidden>
                Select Giftcard Status
              </option>
              <option value="">All</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
            </Select>
          </TextSelectField>
        </TextWrapper>
      </SearchContainerWrapper>
      </Root>
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
    </TextRoot>
    </TextMainWrapper>
   
  )
}

export default AllGifts
