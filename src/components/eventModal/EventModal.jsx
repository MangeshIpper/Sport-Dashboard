import { Search } from "@mui/icons-material";
import { React, useEffect, useState } from "react";
import { Button, Card, Table, Modal } from "react-bootstrap";
import "./eventModal.css";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function EventModal(props) {
  const [metaInfo, setMetaInfo] = useState(props.data["meta-tags"]);
  const [order, setOrder] = useState("ASC");
  const [colName, setColName] = useState();

  const handleFilter = (event) => {
      let filterWord = event.target.value;
      let newMetaInfo = metaInfo.filter((value) => {
            return value.name.toLowerCase().includes(filterWord.toLowerCase());
      });
      if(filterWord === ""){
          setMetaInfo(props.data["meta-tags"]);
      }else{
        setMetaInfo(newMetaInfo);
      }
  };

  const onSortChange = (col) => {
    setColName(col);
    if (order === "ASC") {
      const sorted = [...metaInfo].sort((a, b) => {
        if (typeof a[col] === "number") {
          return a[col] > b[col] ? 1 : -1;
        } else {
          return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
        }
      });
      setMetaInfo(sorted);
      setOrder("DESC");
    }

    if (order === "DESC") {
      const sorted = [...metaInfo].sort((a, b) => {
        if (typeof a[col] === "number") {
          return a[col] < b[col] ? 1 : -1;
        } else {
          return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
        }
      });
      setMetaInfo(sorted);
      setOrder("ASC");
    }
  };


  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title> Event Data</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="eventModalHeading">
          <div className="searchbar">
            <Search className="searchIcon" />
            <input
              placeholder="Filter by sport, country, competition"
              className="searchInput"
              onChange={handleFilter}
            />
          </div>
        </div>
        <Card className="w-100 cardBox">
          <Card.Body>
            <Table className="table table-bordered" hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th onClick={() => onSortChange("name")}>
                  Name{" "}
                  {order === "ASC" && colName === "name" ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )} </th>
                  <th>Type</th>
                  <th>URL Names</th>
                </tr>
              </thead>
              <tbody>
                {metaInfo ? (
                  metaInfo.map((item, index) => (
                    <tr key={index}>
                      <td>{index}</td>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td>{item["url-name"]}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">
                      No meta information found.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Modal.Body>
    </>
  );
}

export default EventModal;
