import React from "react";
import { connect } from "dva";
import { Table, Pagination, Popconfirm, Button } from "antd";
// import { routerRedux } from "dva/router";
import "./Users.scss";
// import UserModal from "./actions/edit";

function Users({
  dispatch,
  list: dataSource,
  loading,
  total,
  page: current,
}: any) {
  function deleteHandler(id: number) {
    dispatch({
      type: "users/remove",
      payload: id,
    });
  }

  function pageChangeHandler(page: any) {
    // dispatch(
    //   routerRedux.push({
    //     pathname: "/users",
    //     search: `?page=${page}`,
    //   })
    // );
  }

  function editHandler(id: number, values: any) {
    dispatch({
      type: "users/patch",
      payload: { id, values },
    });
  }

  function createHandler(values: any) {
    dispatch({
      type: "users/create",
      payload: values,
    });
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <a href="">{text}</a>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
    },
    {
      title: "Operation",
      key: "operation",
      render: (text: string, record: any) => (
        <span className="operation">
          {/* <UserModal record={record} onOk={editHandler.bind(null, record.id)}>
            <a>Edit</a>
          </UserModal> */}
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={deleteHandler.bind(null, record.id)}
          >
            <a href="">Delete</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="normal">
      <div>
        <div className="create">
          {/* <UserModal record={{}} onOk={createHandler}>
            <Button type="primary">Create User</Button>
          </UserModal> */}
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={loading}
          rowKey={(record) => record.id}
          pagination={false}
        />
        <Pagination
          className="ant-table-pagination"
          total={total}
          current={current}
          pageSize={10}
          onChange={pageChangeHandler}
        />
      </div>
    </div>
  );
}

function mapStateToProps(state: any) {
  const { list, total, page } = state.users;
  return {
    loading: state.loading.models.users,
    list,
    total,
    page,
  };
}

export default connect(mapStateToProps)(Users);
