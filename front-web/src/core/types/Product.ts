// Tipos correspondentes à requisição de Products

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    imgUrl: string;
    date: string;
    categories: Category[];
}

export type ContentResponse = {
    content: Product[];
    totalPages: number;
}

export type Category = {
    id: number;
    name: string;
}