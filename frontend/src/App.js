import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form";
import Grid from "./components/Grid";
import {useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";


const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

  const Title = styled.h2``;

  function App() {
    const [users, setUsers] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
  
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8800");
        setUsers(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
      } catch (error) {
        toast.error(error);
      }
    };
  
    useEffect(() => {
      getUsers();
    }, [setUsers]);

  return (
      <>
        <Container>
          <Title>Formulário de Cadastro</Title>
          <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
          <Grid setOnEdit={setOnEdit} users={users} setUsers={setUsers} />
        </Container>
        <ToastContainer
          position={toast.POSITION.BOTTOM_LEFT}
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={"dark"}
          />
        <GlobalStyle />
      </>      
  );
}

export default App;
