import React from "react";
import BaseForm from "../../BaseForm";
import { makePrivateRequest } from '../../../../../core/utils/requests';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { Category } from 'core/types/Product'

type FormState = {
    name: string;
    categories: Category[];
    price: string;
    description?: string;
    imgUrl?: string;
}

const Form = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormState>()
    const history = useHistory()

    const onSubmitHandle = (formState: FormState) => {
        let cat : Category = {id: 1, name: ''}

        const data = {
            ...formState,
            categories: [cat]
        }

        makePrivateRequest({url: "/products", met: "POST", data})
        .then(() => {
            toast.info('Produto cadastrado com sucesso')
            history.push('/admin/products')
        })
        .catch(() => {
            toast.error('Erro ao cadastrar produto')
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmitHandle)}>
            <BaseForm title="CADASTRAR UM PRODUTO">
                <div className="row">
                    <div className="col-6">
                        <div className="margin-bottom-30">
                            <input type="text" className="form-control input-base" placeholder="Nome do Produto"
                                {...register('name', { 
                                    required: "Campo obrigatório" , 
                                    minLength: {value: 5, message: 'Deve ter no mínimo 5 letras'},
                                    maxLength: {value: 60, message: 'No máximo 60 letras' }
                                })}
                            />
                            {errors.name && (
                                <div className="invalid-feedback d-block">
                                    {errors.name.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <input type="number" className="form-control input-base" placeholder="Preço"
                                {...register('price', { required: "Campo obrigatório" })}
                            />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <input type="text" className="form-control input-base" placeholder="Imagem do Produto"
                                {...register('imgUrl', { required: "Campo obrigatório" })}
                            />
                            {errors.imgUrl && (
                                <div className="invalid-feedback d-block">
                                    {errors.imgUrl.message}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="col-6">
                        <textarea cols={30} rows={10} className="form-control input-base"
                            {...register('description', { required: "Campo obrigatório" })}
                        />
                        {errors.description && (
                                <div className="invalid-feedback d-block">
                                    {errors.description.message}
                                </div>
                        )}
                    </div>
                </div>
            </BaseForm>
        </form>
    );
};

export default Form