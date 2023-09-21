import { useFetchGet } from "../../hooks/useFetch";
import { TypeProducts } from "../../types/typeProduct";
import { formatCurrency } from "../../utils/format";
import { DivContainerTable, StyledTable } from "../style/style";
import { toast } from "react-hot-toast";

export default function ProductsPage(){

    const { data: uniqueData, loading: loadUnique  } = useFetchGet<TypeProducts>('/product?unique');
    const { data: packData, loading: loadPack } = useFetchGet<TypeProducts>('/product?unique=false');
    

    if(uniqueData.error){
        toast.error(uniqueData.error, {
            id: 'return-toast'
        });
    }
    
    if(packData.error){
        toast.error(packData.error, {
            id: 'return-toast' 
        });
    }

    if(loadUnique || loadPack){
        toast.loading('Carregando...', {
            id: 'load'
        })
    }else{
        toast.remove('load');
    }

    let contentUnique;

    if(loadUnique){
        contentUnique = <div>Carregando...</div>;
    }else if(!uniqueData.return && !uniqueData.error){
        contentUnique = <div>Lista de Produtos Vazia, ou falha ao carregar...</div>;
    }else if(uniqueData.return){
        contentUnique = (<DivContainerTable>
                            <StyledTable>
                                <thead>
                                    <tr>
                                    <th>Cod.</th>
                                    <th>Nome</th>
                                    <th>Custo</th>
                                    <th>Preço de Venda</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {uniqueData.return.map((item) => (
                                            <tr key={item.code}>
                                                <td>{item.code}</td>
                                                <td>{item.name}</td>
                                                <td>{formatCurrency(item.cost_price)}</td>
                                                <td>{formatCurrency(item.sales_price)}</td>
                                            </tr>
                                            )
                                    )}
                                    
                                </tbody>
                            </StyledTable>
                        </DivContainerTable>);
    }


    let contentPack;
    if(loadPack){
        contentPack = <div>Carregando...</div>;
    }else if(!packData.return && !packData.error){
        contentPack = <div>Lista de Packs Vazia...</div>;
    }else if(packData.return){
        contentPack = (<DivContainerTable>
                            <StyledTable>
                                <thead>
                                    <tr>
                                    <th>Cod.</th>
                                    <th>Nome</th>
                                    <th>Custo</th>
                                    <th>Preço de Venda</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    
                                    {packData.return?.map((item) => (
                                            <tr key={item.code}>
                                                <td>{item.code}</td>
                                                <td>{item.name}</td>
                                                <td>{formatCurrency(item.cost_price)}</td>
                                                <td>{formatCurrency(item.sales_price)}</td>
                                            </tr>
                                            )
                                    )}
                                    
                                </tbody>
                            </StyledTable>
                        </DivContainerTable>);
    }

    return(
        <>
        <h1>Exibir Produtos - (Financeiro)</h1>

        <h2>Produtos Unitários</h2>
        {contentUnique}
        
        <br/>
        <hr/>
        <h2>Packs de Produtos</h2>
        {contentPack}

        </>
    )
}