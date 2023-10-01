import User from "@/app/api/models/User";
import connect from '@/app/api/utils/db';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function DELETE(req) {
    try {
        //req do index desejado para o delete
        const { index } = await req.json();
        await connect();
        //Verificar se o usuario está logado e quem é
        const token = await getToken({ req });
        if (!token) {
            return NextResponse.json({ status: 500, message: "Não está logado" });
        }
        const email = token?.email
        
        //buscar usuario
        const user = await User.findOne({ email });
        
        //deletar senha
        const deletePasswordId = user.storePasswords[index].id
        await User.findOneAndUpdate({ email }, { $pull: { storePasswords: { _id: deletePasswordId } } });
        await user.save();
        return NextResponse.json({ message: `Senha excluida com sucesso. ${index}`, status: 201 })
    } catch (error) {
        return NextResponse.json({ message: `Erro ao excluir a senha: ${error}`, status: 500 })
    }
}