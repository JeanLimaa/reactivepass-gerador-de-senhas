/* const crypto = require('crypto');
 */
import crypto from 'crypto';

export default function generatePass(length, setUpperCase, setLowerCase, setNumber, setSymbols, maxAttemps = 10) {

  const characters = [
    setUpperCase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '',
    setLowerCase ? 'abcdefghijklmnopqrstuvwxyz' : '',
    setNumber ? '0123456789' : '',
    setSymbols ? '!@#$%&?(){}[]|' : ''
  ].join('');

  let password = '';
  let lastChar = '';

while(true){
  password = '';
  const passwordBuffer = crypto.randomBytes(length);

    for (let i = 0; i < length; i++) {
      let randomChar = '';

      do {
        const randomIndex = passwordBuffer.readUInt8(i) % characters.length;
        randomChar += characters[randomIndex];
      } while (randomChar === lastChar);

      lastChar = randomChar;
      password += randomChar;
    }
    
    const testPassSymbols = /[!@#$%&?(){}[]|]/.test(password);
    const testPassUpperCase = /[A-Z]/.test(password);
    const testPassLowerCase = /[a-z]/.test(password);
    const testPassNumber = /[0-9]/.test(password);
    const testRepeatValue = /(.)\1+/.test(password);
  
    if (
      (!testPassSymbols && setSymbols) ||
      (!testPassUpperCase && setUpperCase) ||
      (!testPassLowerCase && setLowerCase) ||
      (!testPassNumber && setNumber) ||
      testRepeatValue
    ) {
      return generatePass(length, setUpperCase, setLowerCase, setNumber, setSymbols, maxAttemps - 1);
    } else {
      return password;
    }
  }
}

/* module.exports = generatePass; */