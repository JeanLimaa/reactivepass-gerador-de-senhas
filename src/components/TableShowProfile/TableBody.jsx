import ToastSucess from "../Toast/Toast";
import Loading from "../Loading";
import { useTableFunctions } from "@/hooks/useTableFunctions";
import TableBodyViewPass from "./TableBodyViewPass";

export default function TableBody() {
    const { loading, error, dataFromServer } = useTableFunctions();
    
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <h2>Erro: {error.message}</h2>
    }

    if (dataFromServer.length === 0) {
        return (
            <ToastSucess
                isToastOpen={true}
                fail="Nenhuma senha salva, no momento."
                text="Você deve salvar uma senha para que ela possa ser exibida aqui."
            />
        )
    }
    if (typeof dataFromServer !== 'undefined' && dataFromServer !== null) {
        return (
            <TableBodyViewPass />
        );
    }
}