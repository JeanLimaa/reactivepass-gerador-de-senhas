import User from '@/models/User';
import connect from '@/utils/db';
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function POST(req) {
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

        const deletePasswordId = user.storePasswords[index].id
        const deletePassword = user.storePasswords[0]

        await User.findOneAndUpdate({ email }, { $pull: { storePasswords: { _id: deletePasswordId } } });

        //await User.findOneAndDelete( {deletePassword} )
        return NextResponse.json({ message: `Sucesso. ${index}`, status: 201 })
    } catch (error) {
        return NextResponse.json({ message: error, status: 500 })
    }
}