import './style.scss'
import { ReactComponent as SearchIcon } from 'core/assets/images/union.svg'
import Select from 'react-select'
import { useEffect, useState } from 'react'
import { Category } from 'core/types/Product'
import { makeRequest } from 'core/utils/requests'

export type FilterForm = {
    name?: string;
    categoryId?: number;
}

type Props = {
    name?: string;
    category?: Category;
    handleChangeName: (name: string) => void;
    handleChangeCat: (category: Category) => void;
    clearFields: () => void;
}

const ProductFilter = ({ name, category, handleChangeCat, handleChangeName, clearFields }: Props) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoadingCat, setIsLoadingCat] = useState(false)

    useEffect(() => {
        setIsLoadingCat(true)
        makeRequest({ url: '/categories' })
            .then(r => setCategories(r.data.content))
            .finally(() => setIsLoadingCat(false))

    }, [])

    return <div className="card-base product-filter-container">
        <div className="product-filter-search">
            <input className="form-control"  value={name} type="text" placeholder="Pesquisar produto" onChange={event => handleChangeName(event.target.value)} />
            <SearchIcon />
        </div>

        <Select 
            isLoading={isLoadingCat}
            options={categories}
            key={`select-${category?.id}`}
            value={category}
            getOptionLabel={(option: Category) => option.name}
            getOptionValue={(option: Category) => String(option.id)}
            className="category-product-select"
            classNamePrefix="cat-product-select"
            placeholder="Categorias"
            onChange={value => handleChangeCat(value as Category)}
            isClearable
        />
        <button className="btn btn-outline-secondary border-radius-10" onClick={clearFields}>LIMPAR FILTROS</button>
    </div>
}

export default ProductFilter;