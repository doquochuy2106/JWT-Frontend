import { useEffect, useState } from "react";
import "./Users.scss";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { getAllUsers, deleteUser } from "../../services/userService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import ModalDelete from "./ModalDelete";
import ModalUser from "./ModalUser";

const Users = (props) => {
  let history = useHistory();

  const [listUsers, setListUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [totalPage, setTotalpage] = useState(1);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [dataModalDelete, setDataModalDelete] = useState();

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    let response = await getAllUsers(+page, +limit);

    if (response && response.data && response.data.EC === 0) {
      setTotalpage(response.data.DT.totalPage);
      setListUsers(response.data.DT.users);
    }
  };

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  const handleDelete = async (dataUser) => {
    setShowModalDelete(true);
    setDataModalDelete(dataUser);
  };

  const handleClose = () => {
    setShowModalDelete(false);
  };

  const handleCreatNewUser = () => {};

  const handleConfirmDeleteUser = async () => {
    let response = await deleteUser(dataModalDelete);
    console.log("check respone: ", response);
    if (response && response.data.EC === 0) {
      toast.success(response.data.EM);
      fetchUsers();
      setShowModalDelete(false);
    } else {
      toast.error(response.data.EM);
    }
  };

  return (
    <div className="container">
      <div className="manage-users-container">
        <div className="user-header my-3 ">
          <div className="title">
            <h3>Table Users</h3>
          </div>
          <div className="actions">
            <button className="btn btn-success">Refresh</button>
            <button
              className="btn btn-primary"
              onClick={() => handleCreatNewUser()}
            >
              Add New User
            </button>
          </div>
        </div>

        <div className="user-body">
          <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Id</th>
                <th scope="col">Email</th>
                <th scope="col">Username</th>
                <th scope="col">Group</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {listUsers && listUsers.length > 0 ? (
                <>
                  {listUsers.map((item, index) => {
                    return (
                      <tr key={`row-${index}`}>
                        <td>{index + 1}</td>
                        <td>{item.id}</td>
                        <td>{item.email}</td>
                        <td>{item.username}</td>
                        <td>{item.Group ? item.Group.name : ""}</td>
                        <td>
                          <button className="btn btn-warning mx-3">Edit</button>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(item)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </>
              ) : (
                <>
                  <tr>
                    <td>Not found User</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
        <div className="user-footer">
          {totalPage > 0 && (
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={totalPage}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          )}
        </div>
      </div>
      <ModalDelete
        showModalDelete={showModalDelete}
        handleClose={handleClose}
        dataModalDelete={dataModalDelete}
        handleConfirmDeleteUser={handleConfirmDeleteUser}
      />

      <ModalUser title={"Create New User"} />
    </div>
  );
};

export default Users;
