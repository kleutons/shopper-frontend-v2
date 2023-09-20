import styled from "styled-components";

export const Header = styled.header`
    width: 100%;
    background-color: #1E2044;
    padding: 15px 0;
    color: white;

    >div.container{
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    nav ul{
        margin: 0;
        padding: 0;
        display: flex;
        list-style: none;
        gap: 25px;
        font-size: 19px;
    }

    nav a{
        color: white;
        text-decoration: none;
    }
    nav a:hover{
        text-decoration: underline;
    }


    @media screen and (max-width: 600px) {
        >div.container img{
            max-width: 120px;
            margin-right: 10px;
        } 
        nav ul{
            font-size: 14px;
            gap: 12px;
        }
    }
`