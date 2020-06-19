import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button } from 'reactstrap'
import { DataContext } from '../contexts/DataContext';


class FormData extends Component {
    render() {
        return (
            <DataContext.Consumer>{(context) => {
                const { addDataItem, isUpdate, name, salary, age, handleInputChange } = context;


                return (
                    <div className="formdata">
                        <Form className="formContainer">
                            <FormGroup>
                                <Label for="txtName">Name</Label>
                                <Input value={name} onChange={handleInputChange} type="text" name="name" id="txtName" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="txtSalary">Salary</Label>
                                <Input value={salary} onChange={handleInputChange} type="number" name="salary" id="txtSalary" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="txtAge">Age</Label>
                                <Input value={age} onChange={handleInputChange} type="number" name="age" id="txtAge" />
                            </FormGroup>
                        </Form>
                        <Button style={{ display: 'block', margin: 'auto' }} onClick={addDataItem} color="primary">Add or Update</Button>
                    </div>
                )
            }}
            </DataContext.Consumer>
        );
    }
}

export default FormData;