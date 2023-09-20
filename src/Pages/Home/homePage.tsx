/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { useFetchPostForm } from "../../hooks/useFetch";
import { TypeProductValidade, TypeRerturnValidade } from "../../types/typeProduct";
import { toast } from "react-hot-toast";
import { Btn, FormContainer, Input, Label, StyledTable, DivError } from "../style/style";
import { formatCurrency } from "../../utils/format";
// import { clear } from "console";

export default function HomePage(){
    const [formData, setFormData] = useState(new FormData());
    const [btnValidate, setBntValidate] = useState(true);
    const { data, setData, sendRequest } = useFetchPostForm<TypeRerturnValidade>('/product/update-csv', formData);
    
    const { data: dataBulk, sendRequest: sendBulk } = useFetchPostForm<any>('/product/update-csv', formData, 'put');
    
    const fileInputRef = React.createRef<HTMLInputElement>();
    const formRef = React.createRef<HTMLFormElement>();
    const [btnDisabled, setBtnDisabled] = useState(true);

    useEffect( () => {
        
        const dataReturn = data.return;
        if(dataReturn){
            
            const dataHeader = dataReturn.errorHeader;
            const dataProducts = dataReturn.productsValidade;

            if(dataHeader){
                toast.error(dataHeader.join(', '));
            }

            if(dataProducts){
                const hasInvalidCSV = dataProducts.find((item:TypeProductValidade) => item.validadeError.length > 0);
                const isValidCSV = hasInvalidCSV ? false : true;
                setBtnDisabled(isValidCSV);
                if(!isValidCSV){
                    toast.error('CSV inválido, Veja Pendencias!');
                }
            }
        }    
        
        if(dataBulk){
            if(dataBulk.error){
                toast.error(dataBulk.error);
            }

            if(dataBulk.return){
                toast.success(dataBulk.return);
                setTimeout( () => {
                    location.reload();
                }, 4000)
            }

        }
    
    }, [data, dataBulk])


   
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const file = event.target.files[0];
            const newFormData = new FormData(); 
            newFormData.append('file', file);
            setFormData(newFormData); 
        }
    };

    const cleanFileForm = () => {
         // Limpar arquivo do formulario
         if (fileInputRef.current) {
            fileInputRef.current.value = '';
            setFormData(new FormData());
        }
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        sendRequest(true);
        setBntValidate(false)
    }
              

     const handleSubmitAtualizar = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        
        if (formRef.current) {
            event.preventDefault();            
            setData({return: undefined});
            sendBulk(true);
            // Limpar após o envio
            cleanFileForm();
        }
    }


    const renderValidity = (item: any) => {
        if (item.validadeError && item.validadeError.length === 0) {
          return '✅';
        } else if (item.validadeError) {
          return (
            <ul>
              {item.validadeError.map((error: string[], index: number) => (
                <li key={index}>{'⛔ ' + error}</li>
              ))}
            </ul>
          );
        }
        return null;
    };

    return(
        <>
        <h1>Atualizar Preço <span>*Ver Regras</span></h1>

        <FormContainer ref={formRef} onSubmit={handleSubmit}>
            <Label htmlFor="fileCsv">Escolha um arquivo CSV, e click em validar:</Label>
            
            
            {btnValidate ? ( 
                <>
                    <Input type="file" id="fileCsv" name="file" accept=".csv" onMouseDown={cleanFileForm} onChange={handleFileChange} ref={fileInputRef} />
                    <Btn type="submit">VALIDAR</Btn>
                </>
            ): (
                <Btn type="button" onClick={() => location.reload()}>ENVIAR UM NOVO ARQUIVO</Btn>
            )}
        </FormContainer>

        <h2>{data.return?.productsValidade ? 'Produtos Para Atualizar' : 'Envie um Arquivo CSV'}</h2>
        {
            data.return?.errorHeader &&
            (
                <DivError>
                    <b>Arquivo Inválido:</b>
                    {data.return.errorHeader.map(item => (
                        <div> 
                            - {item} 
                        </div> 
                    ))}
                </DivError>
            )
            
        }
        {data.return?.productsValidade && Array.isArray(data.return.productsValidade) && data.return.productsValidade.length > 0 && (
            <>
                
                <StyledTable>
                    <thead>
                        <tr>
                        <th>Cod.</th>
                        <th>Nome</th>
                        <th className="center">Preço Atual</th>
                        <th className="center">Novo Preço</th>
                        <th className="center">Tipo</th>
                        <th className="pendencia center">Pendência</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        
                        {data.return.productsValidade.map((item: any) => (
                            <tr key={item.code}>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td className="center">{formatCurrency(item.sales_price)}</td>
                                <td className="center">{formatCurrency(item.new_price)}</td>
                                <td className="center">{item.typeProduct}</td>
                                <td>{renderValidity(item)} </td>
                            </tr>
                            
                        ))}
                    </tbody>
                </StyledTable>
                
                <Btn disabled={!btnDisabled} onClick={handleSubmitAtualizar}>ATUALIZAR</Btn>
            </>
        )}        
        
        </>
    )
}