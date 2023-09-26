require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const User = require("../../../models/User");
const crypto = require('crypto');
const connect = require('../../../utils/db')
//const { getToken } = require('next-auth/jwt');

app.use(express.json());
app.use(cors());
const secret = process.env.PASS_SECRET
//Parametros para criptografia da senha
const DATE_CYPHER = {
  algoritmo: 'aes256',
  codificacao: 'utf8',
  secret: secret,
  type: 'hex',
}

app.post('/savepass', async (req, res) => {

  //conexão com o BD
  await connect()

/*   const token = await getToken({ req })
  //const email2 = token?.email; 
  console.log(token + " token") */

  //requisições do corpo da pag
  const email = req.body.userEmail;
  const passwordGenerated = req.body.passwordGenerated;
  const labelPassword = req.body.labelPassword;
  
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
      res.status(500).json({ message: 'Usuario não encontrado' });
    }
    //verificar se a senha salva já existe
    const passwordExists = user.storePasswords.some(pass => pass.password === newPassword.password && pass.labelPassword === newPassword.labelPassword);
    console.log(passwordExists)
    if (passwordExists) {
      res.status(500).json({ message: 'Uma senha com o mesmo label já existe no seu usuario.' });
      return;
    }
    //caso não exista, adicionar a senha
    await User.findOneAndUpdate({ email }, {
      $push: { storePasswords: newPassword },
    }, { new: true })
    res.status(200).json({ message: 'Senha salva com sucesso!' });
    console.log(`Senha ${newPassword.password}, com o label: ${newPassword.labelPassword}, salva no email ${email}`)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro ao salvar a senha.' });
  }
});

app.listen(3001, () => {
  console.log("Rodando na porta 3001");
});