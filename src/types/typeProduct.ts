export type TypeProduct = {
    code: number;
    name: string;
    cost_price: number;
    sales_price: number;
}

export type TypeProducts = TypeProduct[];

export interface TypeProductValidade extends TypeProduct {
    new_price: number;    
    typeProduct: string;
    composePack: {code: number, qty?:number}[] | null;
    validadeError: string[];
}

export type TypeRerturnValidade = {
    errorHeader: string[] | null;
    productsValidade: TypeProductValidade[]
} 