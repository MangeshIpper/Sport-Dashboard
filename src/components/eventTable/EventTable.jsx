import { React, useState } from "react";
import "./eventTable.css";
import { Button, Card, Table } from "react-bootstrap";
import VisibilityIcon from "@mui/icons-material/Visibility";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { compareAsc, format } from "date-fns";

function EventTable(props) {
  const [events, setEvents] = useState(props.data.events);
  const [order, setOrder] = useState("ASC");
  const [colName, setColName] = useState();

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

  return (
    <>
      <Card className="w-100">
        <Card.Header as="h5">Event Data</Card.Header>
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
                      <Button variant="info">
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
    </>
  );
}

export default EventTable;
