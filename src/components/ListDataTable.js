import React, { Component } from 'react'
import { Table } from 'reactstrap';
import { DataContext } from '../contexts/DataContext';

class ListDataTable extends Component {
    render() {
        return (
            <DataContext.Consumer>{(context) => {
                const { listdata, handleEditData, handleDelete } = context;
                return (
                    <Table bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Salary</th>
                                <th>Age</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {listdata.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.employee_name}</td>
                                    <td>{item.employee_salary}</td>
                                    <td>{item.employee_age}</td>
                                    <td style={{ textAlign: 'center' }}><img onClick={() => handleEditData(item)} src="/images/edit.png" width="30px" height="30px" /><img onClick={() => { handleDelete(item) }} src="/images/recycle.png" width="30px" height="30px" style={{ marginLeft: '20px' }} /></td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )
            }}
            </DataContext.Consumer>
        );
    }
}

export default ListDataTable;