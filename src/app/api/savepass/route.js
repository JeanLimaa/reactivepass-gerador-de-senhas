import User from "@/models/User";
import crypto from 'crypto';
import connect from '@/utils/db';
import { NextResponse } from "next/server";

const secret = process.env.PASS_SECRET
//Parametros para criptografia da senha
const DATE_CYPHER = {
  algoritmo: 'aes256',
  codificacao: 'utf8',
  secret: secret,
  type: 'hex',
}

export async function POST(req) {
  //conexão com o BD
  await connect()

  //requisições do corpo da pag
  const { email, passwordGenerated, labelPassword } = await req.json();

  // Criptografia
  const cipher = crypto.createCipher(DATE_CYPHER.algoritmo, DATE_CYPHER.secret);
  let passEncrypted = cipher.update(passwordGenerated, DATE_CYPHER.codificacao, DATE_CYPHER.type);
  passEncrypted += cipher.final(DATE_CYPHER.type);

  //senha e label que será armazenada no user
  const newPassword = {
    labelPassword: labelPassword || 'Generic',
    password: passEncrypted,
  };

  try {
    //buscar user
    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ status: 500, message: 'Usuario não encontrado' });
    }
    //verificar se a senha salva já existe
    const passwordExists = user.storePasswords.some(pass => pass.password === newPassword.password && pass.labelPassword === newPassword.labelPassword);
    if (passwordExists) {
      return NextResponse.json({ status: 500, message: 'Uma senha com o mesmo label já existe no seu usuario.' });
    }
    //caso não exista, adicionar a senha
    await User.findOneAndUpdate({ email }, {
      $push: { storePasswords: newPassword },
    }, { new: true })
    return NextResponse.json({ message: 'Senha salva com sucesso!', status: 200 });
    //tratar erros
  } catch (error) {
    console.log(error)
    return NextResponse.json({ status: 500, message: `Erro ao salvar a senha: ${error}` });
  }
};