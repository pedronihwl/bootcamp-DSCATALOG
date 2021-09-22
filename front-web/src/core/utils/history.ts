import { createBrowserHistory } from 'history'
// Criando histórico de navegação próprio para substituir BrowserRouter
// Com BrowserRouter não é possível tratar os redirecionamentos pois os Hooks (useHistory) só podem ser usados dentro de componentes
export default createBrowserHistory();