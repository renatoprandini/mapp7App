export class User {
    constructor(
        public id: string,
        public primeiroNome: string = '',
        public ultimoNome: string = '',
        public email: string = '',
        public emailVerified: boolean,
        public foto: string = '',
        public tipo: string = '',
        public avaliacao: number = 0
    ) {

    }
}