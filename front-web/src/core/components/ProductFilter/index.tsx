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
    onSearch: (filter: FilterForm) => void;
}

const ProductFilter = ({ onSearch }: Props) => {
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoadingCat, setIsLoadingCat] = useState(false)
    const [name, setName] = useState('')
    const [category, setCategory] = useState<Category>()


    useEffect(() => {
        setIsLoadingCat(true)
        makeRequest({ url: '/categories' })
            .then(r => setCategories(r.data.content))
            .finally(() => setIsLoadingCat(false))

    }, [])

    const clearFields = () => {
        setCategory(undefined)
        setName('')
        onSearch({ name: '', categoryId: undefined})
    }

    return <div className="card-base product-filter-container">
        <div className="product-filter-search">
            <input className="form-control"  value={name} type="text" placeholder="Pesquisar produto" onChange={event => {
                const n = event.target.value
                setName(n)
                onSearch({ name: n , categoryId: category?.id})
            }} />
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
            onChange={event => {
                const cat : Category = event as Category
                setCategory(cat)
                onSearch({ name , categoryId: cat?.id})
            }}
            isClearable
        />
        <button className="btn btn-outline-secondary border-radius-10" onClick={clearFields}>LIMPAR FILTROS</button>
    </div>
}

export default ProductFilter;