// /* eslint-disable react/prop-types */
// import React, { useContext, useEffect, useState } from "react";
// import { search } from "../../../common/imagepath";
// import { Link } from "react-router-dom";
// import {
//   ApiServiceContext,
//   listcustomerApi,
//   invoice as invoice_api,
// } from "../../../core/core-index";
// import { useForm } from "react-hook-form";
// import { debounce } from "../../../common/helper";
// import DatePickerComponent from "../datePicker/DatePicker";
// import dayjs from "dayjs";

// const InvoiceFilter = ({
//   setShow,
//   show,
//   setInvoiceListData,
//   fromDate,
//   toDate,
//   setfromDate,
//   settoDate,
//   page,
//   pagesize,
//   setTotalCount,
//   setPage,
//   handlePagination,
// }) => {
//   const { resetField, register } = useForm({});
//   const [first, setfirst] = useState(true);
//   const [first1, setfirst1] = useState(false);
//   const [first2, setfirst2] = useState(false);
//   const [first3, setfirst3] = useState(false);
//   const [first4, setfirst4] = useState(false);
//   const [first5, setfirst5] = useState(false);
//   const [noFilters, setnoFilters] = useState(true);
//   const [key, setKey] = useState([]);
//   const [key2, setKey2] = useState([]);
//   const [key3, setKey3] = useState([]);
//   const [noData, setNoData] = useState(false);
//   const [noData2, setNoData2] = useState(false);
//   const [searchText, setSearchText] = useState({ value: "", asset: [] });
//   const [searchText2, setSearchText2] = useState({ value: "", asset: [] });
//   const { getData } = useContext(ApiServiceContext);
//   const [statussearchFilter, setstatussearchFilter] = useState([
//     { id: "PAID", value: "PAID" },
//     { id: "OVERDUE", value: "OVERDUE" },
//     { id: "PARTIALLY_PAID", value: "PARTIALLY PAID" },
//     { id: "DRAFTED", value: "DRAFTED" },
//   ]);

//   const [paymentOptions] = useState([
//     { id: "CASH", value: "Cash" },
//     { id: "UPI", value: "UPI" },
//     { id: "CARD", value: "Card" },
//     { id: "MEMBERSHIP", value: "Membership" },
//   ]);

//   useEffect(() => {
//     if (
//       key.length > 0 ||
//       key2.length > 0 ||
//       key3.length > 0 ||
//       fromDate ||
//       toDate ||
//       searchText.value ||
//       searchText2.value
//     ) {
//       setnoFilters(false);
//     } else {
//       setnoFilters(true);
//     }
//   }, [key, key2, key3, fromDate, toDate, searchText2.value, searchText.value]);

//   useEffect(() => {
//     setKey([]);
//     let data = searchText.asset;
//     if (data.length) {
//       data.forEach((data, idx) => {
//         resetField(`customer${idx}`);
//       });
//     }
//   }, [searchText]);

//   useEffect(() => {
//     setKey2([]);
//     let data = searchText2.asset;
//     if (data.length) {
//       data.forEach((data, idx) => {
//         resetField(`invoicenumber_${idx}`);
//       });
//     }
//   }, [searchText2]);

//   const onSearchChange = async (val, type) => {
//     if (type == "CUSTOMER") {
//       if (val !== "") {
//         try {
//           let searchUrl = listcustomerApi;
//           if (val !== "") searchUrl = `${searchUrl}?search_customer=${val}`;
//           const response = await getData(searchUrl, false);
//           if (response.code == 200) {
//             let data = response?.data;
//             if (data.length > 0) {
//               setNoData(false);
//               setSearchText({
//                 value: val,
//                 asset: response?.data,
//               });
//             } else {
//               setSearchText({
//                 value: val,
//                 asset: data,
//               });
//               setNoData(true);
//             }
//           }
//         } catch {
//           setNoData(true);
//         }
//       } else {
//         setKey([]);
//         setSearchText({
//           value: "",
//           asset: [],
//         });
//         setNoData(false);
//         resetList();
//       }
//     } else {
//       if (val !== "") {
//         try {
//           let searchUrl = invoice_api.Base;
//           if (val !== "")
//             searchUrl = `${searchUrl}?search_invoiceNumber=${val}`;
//           const response = await getData(searchUrl, false);
//           if (response.code == 200) {
//             let data = response?.data;
//             if (data.length > 0) {
//               setNoData2(false);
//               setSearchText2({
//                 value: val,
//                 asset: response?.data,
//               });
//             } else {
//               setSearchText2({
//                 value: val,
//                 asset: data,
//               });
//               setNoData2(true);
//             }
//           }
//         } catch {
//           setNoData2(true);
//         }
//       } else {
//         setKey2([]);
//         setSearchText2({
//           value: "",
//           asset: [],
//         });
//         setNoData2(false);
//         resetList();
//       }
//     }
//   };

//   const resetList = async () => {
//     let searchUrl = invoice_api.Base;
//     const response = await getData(searchUrl);
//     if (response.code == 200) {
//       setInvoiceListData(response?.data || []);
//       setTotalCount(response?.totalRecords);
//     }
//   };

//   const handleCheckboxChange = (event, name, type) => {
//     const { value, checked } = event.target;
//     if (type == "CUS") {
//       if (checked) {
//         setKey((prev) => [...prev, name]);
//       } else {
//         setKey((prev) => prev.filter((item) => item !== name));
//       }
//     } else if (type == "INV") {
//       if (checked) {
//         setKey2((prev) => [...prev, name]);
//       } else {
//         setKey2((prev) => prev.filter((item) => item !== name));
//       }
//     } else {
//       if (checked) {
//         setKey3((prev) => [...prev, name]);
//       } else {
//         setKey3((prev) => prev.filter((item) => item !== name));
//       }
//     }
//   };

//   const handleApplyFilter = async (e) => {
//     e.preventDefault();
//     try {
//       let searchUrl = invoice_api.Base;
//       const queryParams = [];
//       let skipSize;
//       if (page > 1) {
//         setPage(1);
//         skipSize = 0;
//       }
//       else {
//         skipSize = (page - 1) * pagesize;
//       }
//       queryParams.push(`limit=${pagesize}`);
//       queryParams.push(`skip=${skipSize}`);

//       if (fromDate) {
//         let fromIsodate = dayjs(fromDate).toISOString();
//         queryParams.push(`fromDate=${fromIsodate}`);
//       }

//       if (toDate) {
//         let toIsodate = dayjs(toDate).toISOString();
//         queryParams.push(`toDate=${toIsodate}`);
//       }

//       if (key.length > 0) queryParams.push(`customer=${key.join(",")}`);
//       if (key2.length > 0) queryParams.push(`invoiceNumber=${key2.join(",")}`);
//       if (key3.length > 0) queryParams.push(`status=${key3.join(",")}`);
//       if (queryParams.length > 0)
//         searchUrl = `${searchUrl}?${queryParams.join("&")}`;

//       const response = await getData(searchUrl);
//       if (response.code == 200) {
//         if (page > 1) {
//           setPage(1);
//         }
//         setInvoiceListData(response?.data || []);
//         setTotalCount(response?.totalRecords);
//         setShow(false);
//       }
//     } catch (err) {
     
//     }
//   };

//   const handleFilterclear = async () => {
//     resetList();
//     setSearchText({ value: "", asset: [] });
//     setSearchText2({ value: "", asset: [] });
//     setKey([]);
//     setKey2([]);
//     setKey3([]);
//     handlePagination(1, 10);
//   };

//   const onSearchprocessChange = debounce(onSearchChange, 500);

/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { search } from "../../../common/imagepath";
import { Link } from "react-router-dom";
import {
  ApiServiceContext,
  listcustomerApi,
  invoice as invoice_api,
} from "../../../core/core-index";
import { useForm } from "react-hook-form";
import { debounce } from "../../../common/helper";
import DatePickerComponent from "../datePicker/DatePicker";
import dayjs from "dayjs";
import { staffApi } from "../../../constans/apiname";

const InvoiceFilter = ({
  setShow,
  show,
  setInvoiceListData,
  fromDate,
  toDate,
  setfromDate,
  settoDate,
  page,
  pagesize,
  setTotalCount,
  setPage,
  handlePagination,
  // Additional props for FilterComponent
  setFilterListData,
}) => {
  const { resetField, register } = useForm({});
  const [first, setfirst] = useState(true);
  const [first1, setfirst1] = useState(false);
  const [first2, setfirst2] = useState(false);
  const [first3, setfirst3] = useState(false);
  const [first4, setfirst4] = useState(false);
  const [first5, setfirst5] = useState(false);
  const [noFilters, setnoFilters] = useState(true);
  const [key, setKey] = useState([]);
  const [key2, setKey2] = useState([]);
  const [key3, setKey3] = useState([]);
  const [noData, setNoData] = useState(false);
  const [noData2, setNoData2] = useState(false);
  const [searchText3, setSearchText3] = useState({ value: "", asset: [] });
  const [searchText, setSearchText] = useState({ value: "", asset: [] });
  const [searchText2, setSearchText2] = useState({ value: "", asset: [] });
  const { getData } = useContext(ApiServiceContext);
  const [statussearchFilter, setstatussearchFilter] = useState([
    { id: "PAID", value: "PAID" },
    { id: "OVERDUE", value: "OVERDUE" },
    { id: "PARTIALLY_PAID", value: "PARTIALLY PAID" },
    { id: "DRAFTED", value: "DRAFTED" },
  ]);
  
  const [paymentOptions] = useState([
    { id: "CASH", value: "Cash" },
    { id: "UPI", value: "UPI" },
    { id: "CARD", value: "Card" },
    { id: "MEMBERSHIP", value: "Membership" },
  ]);

  useEffect(() => {
    if (
      key.length > 0 ||
      key2.length > 0 ||
      key3.length > 0 ||
      fromDate ||
      toDate ||
      searchText.value ||
      searchText2.value
    ) {
      setnoFilters(false);
    } else {
      setnoFilters(true);
    }
  }, [key, key2, key3, fromDate, toDate, searchText2.value, searchText.value]);

  useEffect(() => {
    setKey([]);
    let data = searchText.asset;
    if (data.length) {
      data.forEach((data, idx) => {
        resetField(`customer${idx}`);
      });
    }
  }, [searchText]);

  useEffect(() => {
    setKey2([]);
    let data = searchText2.asset;
    if (data.length) {
      data.forEach((data, idx) => {
        resetField(`invoicenumber_${idx}`);
      });
    }
  }, [searchText2]);

  // Merged onSearchChange
  const onSearchChange = async (val, type = "CUSTOMER") => {
    if (type == "CUSTOMER") {
      if (val !== "") {
        try {
          let searchUrl = listcustomerApi;
          if (val !== "") searchUrl = `${searchUrl}?search_customer=${val}`;
          const response = await getData(searchUrl, false);
          if (response.code == 200) {
            let data = response?.data;
            if (data.length > 0) {
              setNoData(false);
              setSearchText({
                value: val,
                asset: response?.data,
              });
            } else {
              setSearchText({
                value: val,
                asset: data,
              });
              setNoData(true);
            }
          }
        } catch {
          setNoData(true);
        }
      } else {
        setKey([]);
        setSearchText({
          value: "",
          asset: [],
        });
        setNoData(false);
        resetList();
      }
    } else if (type == "INVOICE") {
      if (val !== "") {
        try {
          let searchUrl = invoice_api.Base;
          if (val !== "")
            searchUrl = `${searchUrl}?search_invoiceNumber=${val}`;
          const response = await getData(searchUrl, false);
          if (response.code == 200) {
            let data = response?.data;
            console.log(data)
            if (data.length > 0) {
              setNoData2(false);
              setSearchText2({
                value: val,
                asset: response?.data,
              });
            } else {
              setSearchText2({
                value: val,
                asset: data,
              });
              setNoData2(true);
            }
          }
        } catch {
          setNoData2(true);
        }
      } else {
        setKey2([]);
        setSearchText2({
          value: "",
          asset: [],
        });
        setNoData2(false);
        resetList();
      }
    } else if (type == "STAFF") {
      if (val !== "") {
        try {
          let searchUrl = staffApi;
          const response = await getData(searchUrl, false);
          if (response.code == 200) {
            let data = response?.data;
            if (data.length > 0) {
              setSearchText3({
                value: val,
                asset: response?.data,
              });
            } else {
              setSearchText({
                value: val,
                asset: data,
              });
            }
          }
        } catch {
          // Handle error
        }
      } else {
        setKey2([]);
        setSearchText({
          value: "",
          asset: [],
        });
        resetList();
      }
    }
  };

  const resetList = async () => {
    let searchUrl = invoice_api.Base;
    const response = await getData(searchUrl);
    if (response.code == 200) {
      setInvoiceListData(response?.data || []);
      setTotalCount(response?.totalRecords);
    }
  };

  // Merged handleCheckboxChange
  const handleCheckboxChange = (event, name, type) => {
    const { value, checked } = event.target;
    if (type == "CUS") {
      if (checked) {
        setKey((prev) => [...prev, name]);
      } else {
        setKey((prev) => prev.filter((item) => item !== name));
      }
    } else if (type == "STA") {
      if (checked) {
        setKey((prev) => [...prev, name]);
      } else {
        setKey((prev) => prev.filter((item) => item !== name));
      }
    } else if (type == "INV") {
      if (checked) {
        setKey2((prev) => [...prev, name]);
      } else {
        setKey2((prev) => prev.filter((item) => item !== name));
      }
    } else if (type == "PAY") {
      if (checked) {
        setKey3((prev) => [...prev, name]);
      } else {
        setKey3((prev) => prev.filter((item) => item !== name));
      }
    }
  };

  // Merged handleApplyFilter
  const handleApplyFilter = async (e) => {
    e.preventDefault();
    try {
      let searchUrl = invoice_api.Base;
      const queryParams = [];
      let skipSize;
      if (page > 1) {
        setPage(1);
        skipSize = 0;
      } else {
        skipSize = (page - 1) * pagesize;
      }
      queryParams.push(`limit=${pagesize}`);
      queryParams.push(`skip=${skipSize}`);

      if (fromDate) {
        let fromIsodate = dayjs(fromDate).toISOString();
        queryParams.push(`fromDate=${fromIsodate}`);
      }

      if (toDate) {
        let toIsodate = dayjs(toDate).toISOString();
        queryParams.push(`toDate=${toIsodate}`);
      }

      if (key.length > 0) queryParams.push(`customer=${key.join(",")}`);
      if (key2.length > 0) queryParams.push(`invoiceNumber=${key2.join(",")}`);
      if (key3.length > 0) queryParams.push(`paymentType=${key3.join(",")}`);

      searchUrl = `${searchUrl}?${queryParams.join("&")}`;
      const response = await getData(searchUrl);
      if (response.code == 200) {
        setInvoiceListData(response?.data || []);
        setTotalCount(response?.totalRecords);
      }
    } catch {
      // Handle error
    }
  };

  // Merged handleFilterclear
  const handleFilterclear = async () => {
    setfromDate(null);
    settoDate(null);
    setKey([]);
    setKey2([]);
    setKey3([]);
    setSearchText({
      value: "",
      asset: [],
    });
    setSearchText2({
      value: "",
      asset: [],
    });
    resetList();
  };

  const onSearchprocessChange = debounce(onSearchChange, 500);

  return (
    <div className={`toggle-sidebar ${show ? "open-filter" : ""}`}>
      <div className="sidebar-layout-filter">
        <div className="sidebar-header">
          <h5>Filter</h5>
          <Link
            to="#"
            className="sidebar-closes"
            onClick={() => {
              setShow(!show);
            }}
          >
            <i className="fa-regular fa-circle-xmark" />
          </Link>
        </div>
        <div className="sidebar-body">
          <form action="#" id="invoiceFilterform" autoComplete="off">
            {/* Customer */}
            <div className="accordion" id="accordionMain1">
              <div
                className="card-header-new"
                id="headingOne"
                onClick={() => setfirst(!first)}
              >
                <h6 className="filter-title">
                  <Link
                    to="#"
                    className={first ? "w-100" : "w-100 collapsed"}
                    aria-expanded={first}
                  >
                    Customer
                    <span className="float-end">
                      <i className="fa-solid fa-chevron-down" />
                    </span>
                  </Link>
                </h6>
              </div>
              <div
                id="collapseOne"
                className={first ? "collapse show" : "collapse"}
              >
                <div className="card-body-chat">
                  <div className="row">
                    <div className="col-md-12">
                      <div id="checkBoxes1">
                        <div className="form-custom">
                          <input
                            type="text"
                            className="form-control"
                            id="member_search1"
                            placeholder="Search Customer"
                            onChange={(e) => {
                              const val = e?.target?.value.toLowerCase();
                              setSearchText({
                                value: val,
                                asset: [],
                              });
                              onSearchprocessChange(val, "CUSTOMER");
                            }}
                          />
                          <span>
                            <img src={search} alt="img" />
                          </span>
                        </div>
                        <div className="selectBox-cont">
                          {searchText?.asset?.length > 0 &&
                            searchText?.asset?.map((item, index) => {
                              return (
                                <label
                                  className="custom_check w-100"
                                  key={index}
                                >
                                  <input
                                    type="checkbox"
                                    name="customer"
                                    {...register(`customer${index}`)}
                                    defaultChecked={false}
                                    onChange={(e) =>
                                      handleCheckboxChange(e, item?._id, "CUS")
                                    }
                                  />
                                  <span className="checkmark" /> {item.name}
                                </label>
                              );
                            })}
                          {noData && <span>Customer Not Found !</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* staff */}
            <div className="accordion" id="accordionMain1">
              <div
                className="card-header-new"
                id="headingOne"
                onClick={() => setfirst4(!first4)}
              >
                <h6 className="filter-title">
                  <Link
                    to="#"
                    className={first4 ? "w-100" : "w-100 collapsed"}
                    aria-expanded={first4}
                  >
                    Staff
                    <span className="float-end">
                      <i className="fa-solid fa-chevron-down" />
                    </span>
                  </Link>
                </h6>
              </div>
              <div
                id="collapseOne"
                className={first4 ? "collapse show" : "collapse"}
              >
                <div className="card-body-chat">
                  <div className="row">
                    <div className="col-md-12">
                      <div id="checkBoxes1">
                        <div className="form-custom">
                          <input
                            type="text"
                            className="form-control"
                            id="member_search1"
                            placeholder="Search Customer"
                            onChange={(e) => {
                              const val = e?.target?.value.toLowerCase();
                              setSearchText3({
                                value: val,
                                asset: [],
                              });
                              onSearchprocessChange(val, "STAFF");
                            }}
                          />
                          <span>
                            <img src={search} alt="img" />
                          </span>
                        </div>
                        <div className="selectBox-cont">
                          {searchText3?.asset?.length > 0 &&
                            searchText3?.asset?.map((item, index) => {
                              return (
                                <label
                                  className="custom_check w-100"
                                  key={index}
                                >
                                  <input
                                    type="checkbox"
                                    name="customer"
                                    {...register(`customer${index}`)}
                                    defaultChecked={false}
                                    onChange={(e) =>
                                      handleCheckboxChange(e, item?.staffName, "STA")
                                    }
                                  />
                                  <span className="checkmark" /> {item.staffName}
                                </label>
                              );
                            })}
                          {noData && <span>Staff Not Found !</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Payment Method */}
             {/* Payment */}
             <div className="accordion" id="accordionMain1">
              <div
                className="card-header-new"
                id="headingOne"
                onClick={() => setfirst5(!first5)}
              >
                <h6 className="filter-title">
                  <Link
                    to="#"
                    className={first5 ? "w-100" : "w-100 collapsed"}
                    aria-expanded={first5}
                  >
                    Payment
                    <span className="float-end">
                      <i className="fa-solid fa-chevron-down" />
                    </span>
                  </Link>
                </h6>
              </div>
              <div
                id="collapseOne"
                className={first5 ? "collapse show" : "collapse"}
              >
                <div className="card-body-chat">
                  <div className="row">
                    <div className="col-md-12">
                      <div id="checkBoxes1">
                        <div className="selectBox-cont">
                          {paymentOptions.map((option, index) => (
                            <label
                              className="custom_check w-100"
                              key={index}
                            >
                              <input
                                type="checkbox"
                                name="payment"
                                {...register(`payment${index}`)}
                                defaultChecked={false}
                                onChange={(e) =>
                                  handleCheckboxChange(e, option.id, "PAY")
                                }
                              />
                              <span className="checkmark" /> {option.value}
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Customer */}
            {/* Invoice Number */}
            <div className="accordion" id="accordionMain5">
              <div
                className="card-header-new"
                id="headingFive"
                onClick={() => setfirst1(!first1)}
              >
                <h6 className="filter-title">
                  <Link
                    to="#"
                    className={first1 ? "w-100" : "w-100 collapsed"}
                    aria-expanded={first1}
                  >
                    Invoice Number
                    <span className="float-end">
                      <i className="fa-solid fa-chevron-down" />
                    </span>
                  </Link>
                </h6>
              </div>

              <div
                id="collapseFive"
                className={first1 ? "collapse show" : "collapse"}
              >
                <div className="card-body-chat">
                  <div className="row">
                    <div className="col-md-12">
                      <div id="checkBoxes5">
                        <div className="form-custom">
                          <input
                            type="text"
                            className="form-control"
                            id="member_search1"
                            placeholder="Search Invoice"
                            onChange={(e) => {
                              const val = e?.target?.value.toLowerCase();
                              setSearchText2({
                                value: val,
                                asset: [],
                              });
                              onSearchprocessChange(val, "INVOICE");
                            }}
                          />
                          <span>
                            <img src={search} alt="img" />
                          </span>
                        </div>
                        <div className="selectBox-cont">
                          {searchText2?.asset?.length > 0 &&
                            searchText2?.asset?.map((item, index) => {
                              return (
                                <label
                                  className="custom_check w-100"
                                  key={index}
                                >
                                  <input
                                    type="checkbox"
                                    {...register(`invoicenumber_${index}`)}
                                    defaultChecked={false}
                                    onChange={(e) =>
                                      handleCheckboxChange(
                                        e,
                                        item?.invoiceNumber,
                                        "INV"
                                      )
                                    }
                                  />
                                  <span className="checkmark" />{" "}
                                  {item?.invoiceNumber}
                                </label>
                              );
                            })}
                          {noData2 && <span>Invoive Number Not Found !</span>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Invoice Number */}
            {/* Select Date */}
            <div className="accordion" id="accordionMain2">
              <div
                className="card-header-new"
                id="headingTwo"
                onClick={() => setfirst2(!first2)}
              >
                <h6 className="filter-title">
                  <Link
                    to="#"
                    className={first2 ? "w-100" : "w-100 collapsed"}
                    aria-expanded={first2}
                  >
                    Select Date
                    <span className="float-end">
                      <i className="fa-solid fa-chevron-down" />
                    </span>
                  </Link>
                </h6>
              </div>
              <div
                id="collapseTwo"
                className={first2 ? "collapse show" : "collapse"}
              >
                <div className="card-body-chat">
                  <div className="form-group">
                    <label className="form-control-label">From</label>
                    <br></br>
                    <DatePickerComponent
                      value={fromDate}
                      onChange={(date) => {
                        setfromDate(date ? dayjs(date) : null);
                      }}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label">To</label>
                    <br></br>
                    <DatePickerComponent
                      value={toDate}
                      onChange={(date) => {
                        settoDate(date ? dayjs(date) : null);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* /Select Date */}
            {/* By Status */}
            <div className="accordion" id="accordionMain3">
              <div
                className="card-header-new"
                id="headingThree"
                onClick={() => setfirst3(!first3)}
              >
                <h6 className="filter-title">
                  <Link
                    to="#"
                    className={first3 ? "w-100" : "w-100 collapsed"}
                    aria-expanded={first3}
                  >
                    By Status
                    <span className="float-end">
                      <i className="fa-solid fa-chevron-down" />
                    </span>
                  </Link>
                </h6>
              </div>
              <div
                id="collapseThree"
                className={first3 ? "collapse show" : "collapse"}
              >
                <div className="card-body-chat">
                  <div id="checkBoxes2">
                    <div className="selectBox-cont">
                      {statussearchFilter?.map(({ id, value }) => {
                        return (
                          <label className="custom_check w-100" key={id}>
                            <input
                              type="checkbox"
                              name="status"
                              onChange={(e) =>
                                handleCheckboxChange(e, id, "STATUS")
                              }
                            />
                            <span className="checkmark" /> {value}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /By Status */}
            <div className="filter-buttons">
              <button
                onClick={handleApplyFilter}
                disabled={noFilters == true ? true : false}
                className="d-inline-flex align-items-center justify-content-center btn w-100 btn-primary"
              >
                {noFilters == true ? "Select Filters" : "Apply"}
              </button>
              <button
                type="button"
                onClick={handleFilterclear}
                disabled={noFilters == true ? true : false}
                className="d-inline-flex align-items-center justify-content-center btn w-100 btn-secondary"
              >
                Reset
              </button>
            </div>
          
          </form>
        </div>
      </div>
    </div>
  );
};

export default InvoiceFilter;
