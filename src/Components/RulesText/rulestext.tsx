export default function RulesText(){
    return(
        <ol>
            <li>
                <strong>Cabeçalho Obrigatório:</strong> O arquivo CSV deve começar com uma linha inicial que contenha os títulos dos campos. Os campos necessários são "product_code" (código do produto) e "new_price" (novo preço).
            </li>
            <li>
                <strong>Estrutura de Colunas:</strong> O arquivo deve ter exatamente duas colunas separadas por vírgula.
            </li>
            <li>
                <strong>Código do Produto:</strong> Cada linha do arquivo precisa conter um código de produto válido.
            </li>
            <li>
                <strong>Preços Válidos:</strong> Os valores na coluna "new_price" devem ser preenchidos corretamente com valores decimais, utilizando o ponto como separador decimal.
            </li>
            <li>
                <strong>Preço de Venda Mínimo:</strong> O preço de venda dos produtos não pode ser menor do que o preço de custo.
            </li>
            <li>
                <strong>Reajuste Limitado:</strong> O novo preço não pode ser ajustado em uma variação maior ou menor do que 10% em relação ao preço atual.
            </li>
            <li>
                <strong>Reajuste de Pacotes:</strong> Se houver reajuste no preço de um pacote, o mesmo arquivo deve conter os reajustes dos preços de seus componentes pertencentes ao pacote.
            </li>
            <li>
                <strong>Coerência nos Pacotes:</strong> A soma dos preços dos componentes deve ser igual ao preço final do pacote.
            </li>
        </ol>
    )
}