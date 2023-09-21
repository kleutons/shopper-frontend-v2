
import React, { useEffect, useState } from "react";
import { useFetchPostForm } from "../../hooks/useFetch";
import { TypeProductValidade, TypeRerturnValidade } from "../../types/typeProduct";
import { toast } from "react-hot-toast";
import { Btn, FormContainer, Input, Label, StyledTable, DivError, HomeH1, DivContainerTable, RulesDiv } from "../style/style";
import { formatCurrency } from "../../utils/format";
import RulesText from "../../Components/RulesText/rulestext";


export default function HomePage(){
    const [formData, setFormData] = useState(new FormData());
    const [btnValidate, setBntValidate] = useState(true);
    const { data, setData, sendRequest, loading } = useFetchPostForm<TypeRerturnValidade>('/product/update-csv', formData);
    const { data: dataBulk, sendRequest: sendBulk, loading: loadBulk } = useFetchPostForm<string>('/product/update-csv', formData, 'put');
    
    const fileInputRef = React.createRef<HTMLInputElement>();
    const formRef = React.createRef<HTMLFormElement>();
    const [btnDisabled, setBtnDisabled] = useState(true);
    const [showRules, setShowRules] = useState(false);


    if(loading || loadBulk){
        toast.loading('Carregando...', {
            id: 'load'
        })
    }else{
        toast.remove('load');
    }

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
        if(fileInputRef.current && fileInputRef.current.value !== ''){
            sendRequest(true);
            setBntValidate(false)
        }else{
            toast.error('Selecione um arquivo para enviar');
        }
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


    const renderValidity = (item: TypeProductValidade ) => {
        if (item.validadeError && item.validadeError.length === 0) {
          return '✅';
        } else if (item.validadeError) {
          return (
            <ul>
              {item.validadeError.map((error, index: number) => (
                <li key={index - item.code}>{'⛔ ' + error}</li>
              ))}
            </ul>
          );
        }
        return null;
    };

    return(
        <>
        <HomeH1>Atualizar Preço <span onClick={() => setShowRules(!showRules)}>*Ver Regras</span></HomeH1>

        {showRules && (
            <RulesDiv>
                <h4>Regras para envio do arquivo CSV:</h4>
                <RulesText/>
            </RulesDiv>
        )}
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
        
        {loading && (
            <div>
                <b>Carregando...</b> 
                <br/>
                * Por se tratar de um servidor backend gratuito e internacional, é possível que a primeira exibição da página leve mais tempo do que o habitual, o que não ocorre no ambiente localhost.
            </div>
        )}

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
                <DivContainerTable>
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
                            
                            
                            {data.return.productsValidade.map((item: TypeProductValidade) => (
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
                </DivContainerTable>

                <Btn disabled={!btnDisabled} onClick={handleSubmitAtualizar}>ATUALIZAR</Btn>
            </>
        )}        
        
        </>
    )
}