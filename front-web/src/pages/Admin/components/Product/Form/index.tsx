import React, { useEffect } from "react";
import BaseForm from "../../BaseForm";
import { makePrivateRequest, makeRequest } from '../../../../../core/utils/requests';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import { Category } from 'core/types/Product'

type FormState = {
    name: string;
    categories: Category[];
    price: string;
    description?: string;
    imgUrl?: string;
}

type ParamsType = {
    productId: string;
}

const Form = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormState>()
    const history = useHistory()
    const { productId } = useParams<ParamsType>()
    const isEditing = productId !== 'create'

    useEffect(() => {
       
        if(isEditing) {
            makeRequest({ url: `/products/${productId}`})
            .then(r => {
                setValue('name', r.data.name)
                setValue('price', r.data.price)
                setValue('description', r.data.description)
                setValue('imgUrl', r.data.imgUrl)
            })

        }
    }, [productId, isEditing, setValue])

    const onSubmitHandle = (formState: FormState) => {
        let cat : Category = {id: 1, name: ''}

        const data = {
            ...formState,
            categories: [cat]
        }

        makePrivateRequest({
            url: isEditing ? "/products/" + productId : "/products", 
            met: isEditing ? "PUT" : "POST", 
            data
        })
        .then(() => {
            toast.info('Produto salvo com sucesso')
            history.push('/admin/products')
        })
        .catch(() => {
            toast.error('Erro ao salvar produto')
        })
    }

    return (
        <form onSubmit={handleSubmit(onSubmitHandle)}>
            <BaseForm title={isEditing ? "EDITAR UM PRODUTO" : "CADASTRAR UM PRODUTO"}>
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