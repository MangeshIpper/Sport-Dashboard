import React from "react";
import "./eventTable.css";
import { Button, Card, Table } from "react-bootstrap";
import VisibilityIcon from '@mui/icons-material/Visibility';

function EventTable(props) {
  return (
    <>
      <Card className="w-100">
        <Card.Header as="h5">Event Data</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Sport Id</th>
                <th>Name</th>
                <th>Start Date</th>
                <th>Status</th>
                <th>Volume</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
            {
                props.data.events ? props.data.events.map((item, index) => (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{item["sport-id"]}</td>
                        <td>{item.name}</td>
                        <td>{(new Date(item.start).getMonth()+1) + '-' + new Date(item.start).getFullYear()}</td>
                        <td>{item.status}</td>
                        <td>{item.volume}</td>
                        <td><Button variant="info"><VisibilityIcon /></Button></td>
                    </tr>
                )) : <tr><td colSpan="5" className="text-center">No events found.</td></tr>

            }
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
}

export default EventTable;
