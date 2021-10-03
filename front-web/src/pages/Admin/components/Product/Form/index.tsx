import React, { useEffect, useState } from "react";
import BaseForm from "../../BaseForm";
import { makePrivateRequest, makeRequest } from '../../../../../core/utils/requests';
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";
import { Category } from 'core/types/Product'
import Select from 'react-select'
import './style.scss'
import CurrencyInput from "react-currency-input-field";
import ImageUpload from "../ImageUpload";

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
    const { register, handleSubmit, formState: { errors }, setValue, control} = useForm<FormState>()
    const history = useHistory()
    const { productId } = useParams<ParamsType>()
    const isEditing = productId !== 'create'
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoadingCat, setIsLoadingCat] = useState(false)
    const [uploadedImage, setUploadedImage] = useState('')
    const [productImg, setProductImg] = useState('')


    useEffect(() => {
        setIsLoadingCat(true)
        makeRequest({ url: '/categories'})
        .then(r => setCategories(r.data.content))
        .finally(() => setIsLoadingCat(false))
    },[])


    useEffect(() => {
        if(isEditing) {
            makeRequest({ url: `/products/${productId}`})
            .then(r => {

                console.log(r.data)
                setValue('name', r.data.name)
                setValue('price', r.data.price)
                setValue('description', r.data.description)
                setValue('categories', r.data.categories)
                setProductImg(r.data.imgUrl)
            })

        }
    }, [productId, isEditing, setValue])

    const onSubmitHandle = (data: FormState) => {
        
        if(!isEditing){
            data.price = data.price.replace(',','.')
        }

        const payload = {
            ...data,
            imgUrl: uploadedImage || productImg
        }

        makePrivateRequest({
            url: isEditing ? "/products/" + productId : "/products", 
            method: isEditing ? "PUT" : "POST", 
            data: payload
        })
        .then(() => {
            toast.info('Produto salvo com sucesso')
            history.push('/admin/products')
        })
        .catch(error => {
            toast.error('Erro ao salvar produto')
            console.log(error.response.data)
        })
    }

    const onUploadSuccess = (imgUri: string) => { setUploadedImage(imgUri) }

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
                            <Controller 
                            name="categories"
                            rules={{ required: true}}
                            control={control}
                            render={({ field }) => (
                                <Select {...field}
                                    isLoading={isLoadingCat}
                                    options={categories} 
                                    getOptionLabel={(option: Category) => option.name}
                                    getOptionValue={(option: Category) => String(option.id)}
                                    isMulti
                                    classNamePrefix="cat-select"
                                    placeholder="Categorias"
                                />)} 
                            />

                            {errors.categories && (
                                <div className="invalid-feedback d-block">
                                    Campo obrigatório
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">

                            <Controller
                            name="price"
                            control={control}
                            rules={{ required: "Campo obrigatório"}}
                            render={({ field: { value, onChange } }) => (
                                <CurrencyInput
                                placeholder="Preço"
                                className="form-control input-base"
                                value={value}
                                intlConfig={{locale: 'pt-BR', currency: 'BRL' }}
                                onValueChange={onChange}
                                />
                            )}
                            />
                            {errors.price && (
                                <div className="invalid-feedback d-block">
                                    {errors.price.message}
                                </div>
                            )}
                        </div>
                        <div className="margin-bottom-30">
                            <ImageUpload onUploadSuccess={onUploadSuccess} productImage={productImg}/>
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