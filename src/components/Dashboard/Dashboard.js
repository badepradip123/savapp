import React, { useEffect, useState, useCallback, useRef } from "react";
import {
  InputGroup,
  Pagination,
  Table,
  Button,
  Form,
  Placeholder,
  Alert,
} from "react-bootstrap";
import "./style.css";
import TablePlaceholder from "../TablePlaceholder";

function Dashboard() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentpage] = useState(1);
  const [userPerPage, setUserPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [serachTerm, setSerachTerm] = useState("");
  const [loader, setLoader] = useState(false);

  const dragUser = useRef();
  const draggedOverUser = useRef();

  const pages = [...Array(totalPages + 1).keys()].slice(1);

  const fetchUserData = useCallback(async () => {
    setLoader(true);
    const res = await fetch(
      `https://dummyjson.com/users/search?limit=300&delay=1000&q=${serachTerm}`
    );
    const data = await res.json();

    if (data && data.users) {
      const tempList = data.users;
      const numberOfTotalPages = Math.ceil(tempList.length / userPerPage);
      setTotalPages(numberOfTotalPages);
      const indexOfLastProduct = currentPage * userPerPage;
      const indexOfFirstProduct = indexOfLastProduct - userPerPage;
      const visibleUsers = tempList.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      );

      setUsers(visibleUsers);
      setLoader(false);
    }
  }, [serachTerm, currentPage]);

  useEffect(() => {
    let timout;
    if (serachTerm.length) {
      timout = setTimeout(() => {
        fetchUserData();
      }, 1000);
    } else {
      fetchUserData();
    }

    return () => clearTimeout(timout);
  }, [fetchUserData]);

  const prevPageHandler = () => {
    if (currentPage !== 1) setCurrentpage(currentPage - 1);
  };

  const nextPageHandler = () => {
    if (currentPage !== totalPages) setCurrentpage(currentPage + 1);
  };

  const handleSort = () => {
    const userClone = [...users];
    const dragItemContent = userClone[dragUser.current];
    userClone.splice(dragUser.current, 1);
    userClone.splice(draggedOverUser.current, 0, dragItemContent);
    dragUser.current = null;
    draggedOverUser.current = null;
    setUsers(userClone);
  };

  return (
    <div className="dashboardContainer">
      <div className="row">
        <div className="col-md-3">
          <Form.Control
            placeholder="Serach employee name"
            aria-label="Search employee name with two button search and reset"
            onChange={(e) => {
              setSerachTerm(e.target.value);
              setCurrentpage(1);
            }}
            value={serachTerm}
          />
        </div>
        <div className="col-md-3">
          <Button
            variant="info"
            onClick={() => {
              setSerachTerm("");
            }}
          >
            Reset
          </Button>
        </div>
        <div className="col-md-6" />
      </div>
      <Table className="mt-3" striped bordered hover responsive>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone.</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(users) && users.length && !loader
            ? users.map((item, index) => {
                return (
                  <tr
                    draggable
                    key={item.id}
                    onDragStart={() => {
                      dragUser.current = index;
                    }}
                    onDragEnter={() => {
                      draggedOverUser.current = index;
                    }}
                    onDragEnd={handleSort}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.address.address}</td>
                  </tr>
                );
              })
            : loader
            ? [...new Array(10)].map(() => {
                return (
                  <tr>
                    {[...new Array(5)].map(() => (
                      <td>
                        <TablePlaceholder />
                      </td>
                    ))}
                  </tr>
                );
              })
            : null}
        </tbody>
      </Table>
      {!loader && users && users.length === 0 ? (
        <Alert className="text-center" variant="light">
          Data not avilable!
        </Alert>
      ) : null}
      {Array.isArray(pages) && pages.length ? (
        <Pagination color="red">
          <Pagination.First onClick={() => setCurrentpage(1)} />
          <Pagination.Prev onClick={prevPageHandler} />

          {pages.map((page) => {
            return (
              <Pagination.Item
                key={page}
                onClick={() => setCurrentpage(page)}
                active={currentPage === page}
              >
                {page}
              </Pagination.Item>
            );
          })}

          <Pagination.Next onClick={nextPageHandler} />
          <Pagination.Last onClick={() => setCurrentpage(totalPages)} />
        </Pagination>
      ) : null}
    </div>
  );
}

export default Dashboard;
