import ToastSucess from "../Toast/Toast";
import Loading from "../Loading";
import { useTableFunctions } from "@/hooks/useTableFunctions";
import TableBodyViewPass from "./TableBodyViewPass";

export default function TableBody({setToastSuccess}) {
    const { loading, error, passwordList } = useTableFunctions();
    
    if (error) return <h2>Erro: {error.message}</h2>

    if (loading) return <Loading />;

    if (typeof passwordList !== 'undefined' && passwordList !== null) {
        return <TableBodyViewPass setToastSuccess={setToastSuccess} />;
    }

    if (passwordList.length === 0) {
        return (
            <ToastSucess
                isToastOpen={true}
                fail="Nenhuma senha salva, no momento."
                text="Você deve salvar uma senha para que ela possa ser exibida aqui."
            />
        )
    }
}