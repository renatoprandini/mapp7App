export class User {
    constructor(
        public id: string,
        public email: string,
        public emailVerified: boolean,
        public photoURL: string,
        public displayName: string,
        public primeiroNome: string,
        public ultimoNome: string,
        public tipo: string = '',
        public avaliacao: number = 0
    ) {

    }
}