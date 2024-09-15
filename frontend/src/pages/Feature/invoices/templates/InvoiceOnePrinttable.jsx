/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { InvoiceLogo1 } from "../../../../common/imagepath";
import { amountFormat, toTitleCase } from "../../../../common/helper";
import AmountToWords from "../../../../common/AmountToWords";
import moment from "moment";

const InvoiceOneprint = ({ data, invoiceLogo, currencyData, companyData }) => {
  const dataSource = data.items;

  const columns = [
    {
      title: "#",
      dataIndex: "Id",
      render: (value, item, index) => index + 1,
    },
    {
      title: "Product / Service",
      dataIndex: "name",
    },
    {
      title: "Unit",
      dataIndex: "units",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
    },
    {
      title: "Price",
      dataIndex: "rate",
      render: (text, record) => (
        <>
          {currencyData ? currencyData : "$"}
          {Number(record?.rate).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </>
      ),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      render: (text, record) => (
        <>
          {currencyData ? currencyData : "$"}
          {amountFormat(record?.discount)}
        </>
      ),
    },
    {
      title: "Total",
      dataIndex: "amount",
      render: (text, record) => (
        <>
          {currencyData ? currencyData : "$"}
          {Number((record?.amount || 0) - (record?.tax || 0)).toLocaleString("en-IN", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </>
      ),
    },
  ];

  return (
    <>
      <div className="main-wrapper" id="element-to-download-as-pdf">
        <div className="container">
          <div className="invoice-wrapper download_section">
            <div className="inv-content">
              <div className="invoice-header">
                <div className="inv-header-left">
                  <Link to="#">
                    <img
                      src={invoiceLogo}
                      onError={(event) => {
                        event.target.src = InvoiceLogo1;
                      }}
                      alt="Logo"
                    />
                  </Link>
                  <span>original for recipient</span>
                </div>
                <div className="inv-header-right">
                  <div className="invoice-title">TAX INVOICE</div>
                  <div className="inv-details">
                    <div className="inv-date">
                      Date:{" "}
                      <span>
                        {moment(data?.invoiceDate).format("DD-MM-YYYY")}
                      </span>
                    </div>
                    <div className="inv-date">
                      Invoice No: <span>{data?.invoiceNumber}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="invoice-address">
                <div className="invoice-to">
                  <span>Invoice To:</span>
                  <div className="inv-to-address">
                    {data?.customerId?.name ? data?.customerId?.name : ""}
                    <br />
                    {data?.customerId?.billingAddress?.addressLine1
                      ? data?.customerId?.billingAddress?.addressLine1 + ","
                      : ""}
                    {data?.customerId?.billingAddress?.city
                      ? data?.customerId?.billingAddress?.city + ","
                      : ""}
                    {data?.customerId?.billingAddress?.addressLine1 ||
                    data?.customerId?.billingAddress?.city ? (
                      <br />
                    ) : (
                      <></>
                    )}
                    {data?.customerId?.billingAddress?.state
                      ? data?.customerId?.billingAddress?.state + ","
                      : ""}
                    {data?.customerId?.billingAddress?.pincode
                      ? data?.customerId?.billingAddress?.pincode + ","
                      : ""}
                    {data?.customerId?.billingAddress?.country
                      ? data?.customerId?.billingAddress?.country + "."
                      : ""}
                    {data?.customerId?.billingAddress?.state ||
                    data?.customerId?.billingAddress?.pincode ||
                    data?.customerId?.billingAddress?.country ? (
                      <br />
                    ) : (
                      <></>
                    )}
                    {data?.customerId?.email ? data?.customerId?.email : ""}
                    <br />
                    {data?.customerId?.phone ? data?.customerId?.phone : ""}
                  </div>
                </div>
                <div className="invoice-to">
                  <span>Pay To:</span>
                  <div className="inv-to-address">
                    {companyData?.companyName ? companyData?.companyName : ""}
                    <br />
                    {companyData?.companyAddress
                      ? companyData?.companyAddress
                      : "" || companyData?.addressLine1
                      ? companyData?.addressLine1
                      : ""}
                    {","}
                    {companyData?.city ? companyData?.city : ""}
                    <br />
                    {companyData?.country ? companyData?.country : ""}
                    <br />
                    {companyData?.email ? companyData?.email : ""}
                    <br />
                    {companyData?.phone ? companyData?.phone : ""}
                  </div>
                </div>
                <div className="company-details">
                  <span className="company-name">
                    {toTitleCase(companyData?.companyName)}
                  </span>
                 
                  <div className="gst-details">
                    Address:{" "}
                    <span>
                      {companyData?.companyAddress
                        ? companyData?.companyAddress
                        : "" || companyData?.addressLine1
                        ? companyData?.addressLine1
                        : ""}
                    </span>
                  </div>
                  <div className="gst-details mb-0">
                    Mobile: <span>{data?.customerId?.phone}</span>
                  </div>
                </div>
              </div>
              <div className="invoice-table">
                <div className="table-responsive">
                  <Table
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{
                      position: ["none", "none"],
                    }}
                    rowKey={(record) => record?.productId}
                  />
                </div>
              </div>
              <div className="invoice-table-footer">
                <div className="table-footer-left" />
                <div className="text-end table-footer-right">
                  <table>
                    <tbody>
                      <tr>
                        <td>Amount</td>
                        <td>
                          {currencyData ? currencyData : "$"}
                          {Number((data?.TotalAmount || 0) - (data?.vat || 0)).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td>Tax </td>
                        <td>
                          {" "}
                          {currencyData ? currencyData : "$"}
                          {Number(data?.vat).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="invoice-table-footer">
                <div className="table-footer-left">
                  <p className="total-info">
                    Total Items / Qty : {dataSource?.length} /{" "}
                    {Number(data?.TotalAmount).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </p>
                </div>
                <div className="table-footer-right">
                  <table className="totalamt-table">
                    <tbody>
                      <tr>
                        <td>Total</td>
                        <td>
                          {" "}
                          {currencyData ? currencyData : "$"}
                          {Number(data?.TotalAmount).toLocaleString("en-IN", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="total-amountdetails">
                <p>
                  Total amount ( in words):{" "}
                  <AmountToWords amount={amountFormat(data?.TotalAmount)} />
                </p>
              </div>
              <div className="bank-details">
                <div className="account-info">
                  <span className="bank-title">Bank Details</span>
                  <div className="account-details">
                    Bank : <span>{data?.bank?.bankName}</span>
                  </div>
                  <div className="account-details">
                    Account # :<span> {data?.bank?.accountNumber} </span>
                  </div>
                  <div className="account-details">
                    IFSC : <span>{data?.bank?.IFSCCode}</span>
                  </div>
                  <div className="account-details">
                    BRANCH : <span>{data?.bank?.branch}</span>
                  </div>
                </div>
                <div className="company-sign">
                  <span>For {toTitleCase(companyData?.companyName)}</span>
                  {data?.sign_type == "manualSignature" ? (
                    <img
                      className="img-fluid d-inline-block uploaded-imgs"
                      style={{
                        display: "flex",
                        maxWidth: "150px",
                        maxHeight: "100px",
                        minHeight: "100px",
                      }}
                      src={data?.signatureId?.signatureImage}
                      alt=""
                    />
                  ) : (
                    <img
                      className="img-fluid d-inline-block uploaded-img-view"
                      style={{
                        display: "flex",
                        maxWidth: "150px",
                        maxHeight: "100px",
                        minHeight: "100px",
                      }}
                      src={data?.signatureImage}
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div className="terms-condition">
                <span>Terms and Conditions:</span>
                <p>{toTitleCase(data?.termsAndCondition)}</p>
              </div>
              <div className="thanks-msg text-center">
                Thanks for your Business
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceOneprint;
