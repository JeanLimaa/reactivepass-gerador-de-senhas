import User from "@/app/api/models/User";
import { NextResponse } from 'next/server';
import connect from '@/app/api/utils/db';
import { getToken } from 'next-auth/jwt';
import crypto from 'crypto';

//Parametros para criptografia da senha
const secret = process.env.PASS_SECRET
const DATE_CYPHER = {
    algoritmo: 'aes256',
    codificacao: 'utf8',
    secret: secret,
    type: 'hex',
}

export async function GET(req) {
    await connect()
    const token = await getToken({ req });
    try {
        if (!token) {
            return NextResponse.json({ message: 'Usuario não está logado.' });
        }
        const email = token?.email;
        //buscar user
        const user = await User.findOne({ email })
        const listPassword = await user.storePasswords;
        
        //Descriptografia
        const decryptPasswordArray = await listPassword.map((data) => {
            const decipher = crypto.createDecipher(DATE_CYPHER.algoritmo, DATE_CYPHER.secret);
            let DesyncrptPass = decipher.update(data.password, DATE_CYPHER.type, DATE_CYPHER.codificacao);
            DesyncrptPass += decipher.final(DATE_CYPHER.codificacao);
            return {
                labelPassword: data.labelPassword,
                password: DesyncrptPass,
            }
        })
        return NextResponse.json(decryptPasswordArray)
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Erro ao buscar.' });
    }
}