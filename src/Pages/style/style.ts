import styled from "styled-components";

export const HomeH1 = styled.h1`
  >span{
    font-size: 14px;
    font-weight: 400;
    color: #303596;
    cursor: pointer;    
  }
`;
export const DivError = styled.div`
 color: red;
`
export const DivContainerTable = styled.div`
  width: 100%;
  overflow-x: auto;
  

  @media screen and (max-width: 790px) {
    white-space: nowrap;
  }

`;
export const StyledTable  = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    th, td {
        padding: 10px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #f2f2f2;

        &.pendencia {
          width: 25%; 
        }
    }

    tr:hover {
        background-color: #f5f5f5;
    }

    td{
      ul{
        margin: 0;
        padding: 0;
        list-style: none;
        color: #b50404;
      }
    }

    .center{
      text-align:center;
    }
`


export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

export const Label = styled.label`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
`;

export const Btn = styled.button`
  background-color: #303596;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #006be0;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;  

export const RulesDiv = styled.div`
  border: 1px solid #ccc;
  padding: 5px;
  margin-bottom: 20px;
  >h4{
    margin: 0;
    text-transform: uppercase;
    text-align: center;
  }
`