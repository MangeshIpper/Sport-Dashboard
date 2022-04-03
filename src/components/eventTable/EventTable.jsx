import { React, useState, useEffect } from "react";
import "./eventTable.css";
import { compareAsc, format } from "date-fns";
import { Button, Card, Table, Modal, Form } from "react-bootstrap";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EventModal from "../eventModal/EventModal";
import axios from "axios";

function EventTable(props) {
  const [events, setEvents] = useState(props.data.events);
  const [order, setOrder] = useState("ASC");
  const [currency, setCurrency] = useState();
  const [colName, setColName] = useState();
  const [show, setShow] = useState(false);
  const [dataShow, setDataShow] = useState();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const getCurrency = async () => {
      try {
        const response = await axios.get(
          "/bpapi/rest/lookups/currencies"
        );
        if (response) {
          setCurrency(response.data.currencies);
        }
      } catch (error) {
        console.error(error.message);
      }
    };
    getCurrency();
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
    if (obj) {
      setDataShow(obj);
    }
  };

  return (
    <>
      <Card className="w-100 cardBox">
        <Card.Header as="h3">Event Data</Card.Header>
        <Card.Body>
          <div className="outer">
            <div className="inner">
              <Form.Select id="">
              <option>Select Currency</option>
                {
                  currency? currency.map((item, index) => (
                    <option value={item["short-name"]} key={index}>{item["short-name"]}</option>
                  )): "" 
                }
              </Form.Select>
            </div>
          </div>

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
                      <Button
                        onClick={(e) => {
                          showData(item);
                        }}
                      >
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
        size="xl"
      >
        <EventModal data={dataShow} />
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
