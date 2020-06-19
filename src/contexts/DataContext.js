import React, { createContext, Component } from 'react';
import Axios from 'axios';
import { InputGroup } from 'reactstrap';
import { store } from 'react-notifications-component';


export const DataContext = createContext();


class DataContextProvider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listdata: [],
            isUpdate: false,
            name: '',
            salary: '',
            age: '',
            id: ''
        };
    }
    //get data
    componentWillMount() {
        const url = 'http://dummy.restapiexample.com/api/v1/employees';
        Axios.get(url).then(response => {
            var datajson = response.data;
            this.setState({ ...this.state, listdata: datajson.data })
        })
    }

    // add or update item in list
    AddOrUpdateDataItem = () => {
        const urlpost = 'http://dummy.restapiexample.com/api/v1/create';
        let data = { "name": this.state.name, "salary": this.state.salary, "age": this.state.age }
        if (!this.state.isUpdate) {
            // add
            Axios.post(urlpost, { data }).then(res => {
                if (res.data.status === 'success') {
                    store.addNotification({
                        title: "Wonderful!",
                        message: "Add item successful. congratucation",
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 2000,
                            onScreen: true,
                            showIcon: true
                        },
                        width: 600
                    });

                    this.setState({
                        ...this.state,
                        name: '',
                        salary: '',
                        age: '',
                        id: ''
                    })
                }
            })
        } else {
            // update
            let urlput = 'http://dummy.restapiexample.com/api/v1/update/';
            urlput += this.state.id
            Axios.put(urlput, { data }).then(res => {
                if (res.data.status === 'success') {
                    store.addNotification({
                        title: "Wonderful!",
                        message: "Update item successful. congratucation",
                        type: "success",
                        insert: "top",
                        container: "top-right",
                        animationIn: ["animated", "fadeIn"],
                        animationOut: ["animated", "fadeOut"],
                        dismiss: {
                            duration: 2000,
                            onScreen: true,
                            showIcon: true
                        },
                        width: 600
                    });

                    this.setState({
                        ...this.state,
                        isUpdate: !this.state.isUpdate,
                        id: '',
                        name: '',
                        salary: '',
                        age: ''
                    })
                }

            })
        }
    }

    //get data for edit 
    HandleEditData = (item) => {
        if (!this.state.isUpdate) {
            this.setState({
                ...this.state,
                isUpdate: !this.state.isUpdate,
                name: item.employee_name,
                salary: item.employee_salary,
                age: item.employee_age,
                id: item.id
            })
        } else {
            this.setState({
                ...this.state,
                name: item.employee_name,
                salary: item.employee_salary,
                age: item.employee_age,
                id: item.id
            })
        }
    }
    // input change
    HandleInputChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.name]: e.target.value
        })
    }

    //delete
    HandleDelete = (item) => {
        let url = 'http://dummy.restapiexample.com/api/v1/delete/' + item.id;
        Axios.delete(url).then(res => {
            if (res.data.status === 'success') {
                store.addNotification({
                    title: "Success",
                    message: "Delete success",
                    type: 'success',
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animationIn", "fadeIn"],
                    animationOut: ["animationOut", "fadeOut"],
                    dismiss: {
                        onScreen: true,
                        showIcon: true,
                        duration: 2000
                    },
                    width: 600
                })

                this.setState({
                    ...this.state,
                    name: '',
                    salary: '',
                    age: '',
                    id: ''
                })
            } else {
                store.addNotification({
                    title: "failed",
                    message: "Error! Not able to delete record",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animationIn", "fadeIn"],
                    animationOut: ["animationOut", "fadeOut"],
                    dismiss: {
                        duration: 2000,
                        showIcon: true,
                        onScreen: true
                    },
                    width: 600
                })
            }
        })

    }

    render() {
        return (
            <DataContext.Provider value={{ ...this.state, handleInputChange: this.HandleInputChange, addDataItem: this.AddOrUpdateDataItem, handleEditData: this.HandleEditData, handleDelete: this.HandleDelete }}>
                {this.props.children}
            </DataContext.Provider>
        );
    }
}

export default DataContextProvider;
