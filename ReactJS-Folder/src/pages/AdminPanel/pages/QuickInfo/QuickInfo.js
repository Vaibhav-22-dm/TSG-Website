import React from 'react'
import Search from './Subsections/Search'
import classes from './css/quickinfo.module.css'
import { Table, Select, Tooltip, Space, Popconfirm, message, Spin } from "antd";

function QuickInfo() {
    const baseUrl = process.env.REACT_APP_ASSETS_BASEURL

    const columns = [
        { title: "Name", dataIndex: "name", key: "name", width: 150 },
        { title: "POR", dataIndex: "por", key: "por", width: 150 },
        {
            title: "Action",
            key: "9",
            width: 150,
            fixed: "right",
            render: (actions) => {
                return (
                    <Space justify="space-between">
                        <Tooltip
                            color="#333333"
                            placement="bottom"
                            title="Update"
                        >
                            <img
                                style={{ cursor: "pointer" }}
                                // onClick={() => {
                                //     // setHideTable(true);
                                // }}
                                width="70%"
                                alt="update"
                                src={`${baseUrl}icons/update.png`}
                            ></img>
                        </Tooltip>

                        <Tooltip
                            color="#333333"
                            placement="bottom"
                            title="Delete e"
                        >
                            <Popconfirm
                                onConfirm={() => {
                                    // SpDeleteHandler(actions.id);
                                }}
                                title="Sure to delete?"
                            >
                                <img
                                    width="70%"
                                    style={{ cursor: "pointer" }}
                                    alt="delete"
                                    src={`${baseUrl}icons/delete.png`}
                                ></img>
                            </Popconfirm>
                        </Tooltip>
                    </Space>
                );
            },
        },
    ];
    const data = [
        {
            name: "John Doe",
            por: "1234",
        },
    ];
    return (
        // <div className={classes.wrapper}>
        //     <Search />
        //     <Table
        //         // loading={activityLoading}
        //         dataSource={data}
        //         columns={columns}
        //         pagination={false}
        //     // scroll={matches ? { x: "fit-content", } : {}}
        //     // pagination={{ onChange: getActivityData, total: activityCount, showSizeChanger: false }}
        //     />
        // </div>

        <div className="adminComingSoon">
            <img type="image/svg+xml" src="https://raw.githubusercontent.com/TSG-Website/media/master/AdminPanel/under_construction.svg" style={{ width: "25em" }} />
        </div>
    )
}

export default QuickInfo
