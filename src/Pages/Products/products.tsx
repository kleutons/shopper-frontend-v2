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

    return(
        <>
        <h1>Exibir Produtos - (Financeiro)</h1>

        <h2>Produtos Unitários</h2>
        {loadUnique && (
            <div>loading</div>
        )}

        {!uniqueData.return ? (
            <div>
                Lista de Produtos Vazia, ou falha ao carregar...
            </div>
        ) : (
            <DivContainerTable>
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
            </DivContainerTable>
        )}
        
        <br/>
        <hr/>
        <h2>Packs de Produtos</h2>

        {loadPack && (
            <div>loading</div>
        )}

        {!packData.return ? (
            <div>
                Lista de Packs Vazia...
            </div>
        ) : ( 
            <DivContainerTable>
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
            </DivContainerTable>
        )}

        </>
    )
}