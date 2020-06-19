import React from 'react';
import { Container, Row } from 'reactstrap';
import ListDataTable from './components/ListDataTable';
import FormData from './components/FormData';
import './App.css';
import DataContextProvider, { DataContext } from './contexts/DataContext';
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'



function App() {
  return (
    <>
      <ReactNotification />
      <Container className="themed-container">
        <Row xs="2">
          <DataContextProvider>
            <FormData />
            <ListDataTable />
          </DataContextProvider>
        </Row>
      </Container>
    </>

  );
}

export default App;
