import React from "react";
import { useState } from "react";
import BaseForm from "../../BaseForm";
import { makeRequest } from '../../../../../core/utils/requests';

type FormState = {
    name: string;
    category: string;
    price: string;
    description?: string;
}

const Form = () => {
    // Fonte unica de verdade
    // O valor do input está sendo capturado e refletido
    const [formData, setFormData] = useState<FormState>({
        name: '',
        category: '1',
        price: '',
    })

    const onHandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const key = e.target.name;
        const value = e.target.value;

        // Retornar tudo o que já existia no formData acrescentado de uma prop dinâmica <key|value> 
        setFormData(data => ({...data, [key]: value}))
    }

    const onSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            ...formData,
            imgUrl: "https://tecnoblog.net/wp-content/uploads/2020/11/playstation_5_produto.png",
            categories: [{id: formData.category}]
        }

        makeRequest({url: "/products", met: "POST", data: payload})
        .then(() => setFormData({name: '', category: '', price: '', description: ''}))

        console.log(formData)
    }

    return (
        <form onSubmit={onSubmitHandle}>
            <BaseForm title="CADASTRAR UM PRODUTO">
                <div className="row">
                    <div className="col-6">
                        <input type="text" className="form-control mb-5" placeholder="Nome do Produto"
                            onChange={onHandleChange}
                            value={formData.name}
                            name="name"
                        />
                        <input type="text" className="form-control mb-5" placeholder="Preço"
                            onChange={onHandleChange}
                            value={formData.price}
                            name="price"
                        />
                        <select className="form-control mb-5" onChange={onHandleChange} 
                        value={formData.category}
                        name="category"
                        >
                            <option value="1">Livros</option>
                            <option value="2">Computadores</option>
                            <option value="3">Eletrônicos</option>
                        </select>
                    </div>
                    <div className="col-6">
                        <textarea name="description" cols={30} rows={10} onChange={onHandleChange} value={formData.description} className="form-control"></textarea>
                    </div>
                </div>
            </BaseForm>
        </form>
    );
};

export default Form