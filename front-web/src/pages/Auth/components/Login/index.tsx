import MainButton from 'core/components/MainButton'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import AuthCard from '../Card'
import './style.scss'


type FormData = {
    email: string;
    password: string;
}

const Login = () => {
    const {register, handleSubmit} = useForm<FormData>()

    const onSubmit = (data: FormData) => {
        console.log(data)

    }


    return (<AuthCard title="Login">
        <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <input 
            className="form-control input-base margin-bottom-30"
            type="email" 
            {...register('email')}
            placeholder="Email"
            />

            <input 
            className="form-control input-base"
            {...register('password')}
            type="password" 
            placeholder="Senha"
            />

            <Link to="/admin/auth/recover" className="login-link-recover">
                Esqueci a senha?
            </Link>
            <div className="login-submit">
                <MainButton texto="Logar" />
            </div>
            <div className="text-center">
                <span className="not-registered">Não tem Cadastro?</span>
                <Link to="/admin/auth/register" className="login-link-register">
                    CADASTRAR
                </Link>
            </div>

        
        </form>

    </AuthCard>)
}

export default Login