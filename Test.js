import React, { useEffect, useState } from "react";
import "./CustomerDataInfor.css";
import { Link, useParams, useLocation } from "react-router-dom";
import * as MdIcon from "react-icons/md";
import * as AiIcon from "react-icons/ai";
import * as IoIcon from "react-icons/io";
import CsvLink from "react-csv-export";
import moment from "moment";

const CustomerDataInfor = () => {
  const { cutomer_id, customerName } = useParams();
  const [allRecords, setAllRecords] = useState();
  const [csvData, setCsvData] = useState();

  const GetRecordById = () => {
    var myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzNlYmI5MTJjNWY4YjJkMjhhNDUwMzMiLCJyb2xlIjoic3VwZXJBZG1pbiIsImlhdCI6MTY2NjA5NDYyNn0.0ejLci_jOGVTdUlvDIQzqGuZ_0aOxJyPdVXCEGvdiO0"
    );
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      customer_id: cutomer_id,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      "http://localhost:4000/customer/data/api/getRecordByCustomer/data",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.status === "success") {
          setAllRecords(result);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    GetRecordById();
  }, []);

  useEffect(() => {
    let finalData = [];
    if (allRecords) {
      const data = allRecords.records;
      for (const key in data) {
        finalData.push({
          DATE: moment(data[key].date).format("DD/MM/YY"),
          FILLED_BOTTLES: data[key].filledBottle,
          EMPTY_BOTTLES: data[key].emptyBottle,
          SUB_TOTAL: data[key].subTotal,
          AMOUNT_RECEIVED: data[key].amountRecieve,
        });
        setCsvData(finalData);
      }
    }
  }, [allRecords]);

  return (
    <div className="my-3">
      <div className="container">
        <div className="mainListContainer ">
          <h2 className="mainHeading">{`${customerName} ( ${allRecords?.count} Records Avaliable )`}</h2>

          <div className="row">
            <div className="createIconContainer mx-2 bg-success">
              <CsvLink data={csvData} fileName={customerName} withTimeStamp>
                <AiIcon.AiFillFileExcel
                  style={{ fontSize: 30, color: "white" }}
                />
              </CsvLink>
            </div>

            <div className="createIconContainer ">
              <Link to={`/createCustomerRecord/${cutomer_id}`}>
                <IoIcon.IoMdAddCircle
                  style={{ fontSize: 30, color: "white" }}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* LIST */}

      <div className="container">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Filled Bottle</th>
              <th scope="col">Empty Bottle</th>
              <th scope="col">Sub Total</th>
              <th scope="col">Amount Recieve</th>
            </tr>
          </thead>
          <tbody>
            {allRecords?.records?.map((i) => {
              return (
                <tr>
                  <th>{moment(i?.date).format("DD/MM/YYYY , hh:mm A")}</th>
                  <td>{i?.filledBottle}</td>
                  <td>{i?.emptyBottle}</td>
                  <td>{i?.subTotal}</td>
                  <td>{i?.amountRecieve}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerDataInfor;