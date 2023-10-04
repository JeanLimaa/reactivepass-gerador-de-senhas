import User from "@/models/User";
import connect from '@/utils/db';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function DELETE(req) {
    try {
        //req do index desejado para o delete
        const { index } = await req.json();

        if (isNaN(index) || index < 0) {
            return NextResponse.json({ message: 'Índice inválido', status: 400 });
        }
        
        await connect();
        //Verificar se o usuario está logado e quem é
        const token = await getToken({ req });
        if (!token) {
            return NextResponse.json({ status: 500, message: "Não está logado" });
        }
        const email = token?.email
        
        //buscar usuario
        const user = await User.findOne({ email });
    
        //pegar senha por id e deletar senha
        const deletePasswordId = user.storePasswords[index].id
        await User.findOneAndUpdate({ email }, { $pull: { storePasswords: { _id: deletePasswordId } } });
        
        return NextResponse.json({ message: `Senha excluida com sucesso. ${index}`, status: 201 })
    } catch (error) {
        return NextResponse.json({ message: `Erro ao excluir a senha: ${error}`, status: 500 })
    }
}