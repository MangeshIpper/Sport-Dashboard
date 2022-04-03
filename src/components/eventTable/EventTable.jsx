import { React, useState, useEffect } from "react";
import "./eventTable.css";
import { compareAsc, format } from "date-fns";
import { Button, Card, Table, Modal } from "react-bootstrap";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EventModal from "../eventModal/EventModal";

function EventTable(props) {
  const [events, setEvents] = useState(props.data.events);
  const [order, setOrder] = useState("ASC");
  const [meta, setMeta] = useState();
  const [colName, setColName] = useState();
  const [show, setShow] = useState(false);
  const [dataShow, setDataShow] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    props.data.events.forEach((val) => {
      setMeta(val["meta-tags"]);
    });
  }, []);

  const onSortChange = (col) => {
    setColName(col);
    if (order === "ASC") {
      const sorted = [...events].sort((a, b) => {
        if (typeof a[col] === "number") {
          return a[col] > b[col] ? 1 : -1;
        } else {
          return a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1;
        }
      });
      setEvents(sorted);
      setOrder("DESC");
    }

    if (order === "DESC") {
      const sorted = [...events].sort((a, b) => {
        if (typeof a[col] === "number") {
          return a[col] < b[col] ? 1 : -1;
        } else {
          return a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1;
        }
      });
      setEvents(sorted);
      setOrder("ASC");
    }
  };

  const showData = (obj) => {
    handleShow();
    if(obj){
      setDataShow(obj);
    }
  }


  return (
    <>
      <Card className="w-100 cardBox">
        <Card.Header as="h3">Event Data</Card.Header>
        <Card.Body>
          <Table className="table table-bordered" hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Sport Id</th>
                <th onClick={() => onSortChange("name")}>
                  Name{" "}
                  {order === "ASC" && colName === "name" ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </th>
                <th onClick={() => onSortChange("start")}>
                  Start Date{" "}
                  {order === "ASC" && colName === "start" ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </th>
                <th>Status</th>
                <th onClick={() => onSortChange("volume")}>
                  Volume{" "}
                  {order === "ASC" && colName === "volume" ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events ? (
                events.map((item, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    <td>{item["sport-id"]}</td>
                    <td>{item.name}</td>
                    <td>{format(new Date(item.start), "dd/MM/yyyy")}</td>
                    <td>{item.status}</td>
                    <td>{item.volume}</td>
                    <td>
                      <Button onClick={(e)=>{showData(item)}}>
                        <VisibilityIcon />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No events found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <EventModal data={dataShow}/>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EventTable;
