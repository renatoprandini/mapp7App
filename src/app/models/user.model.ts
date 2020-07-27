export class User {
    constructor(
        public id: string,
        public primeiroNome: string = '',
        public ultimoNome: string = '',
        public email: string = '',
        public foto: any = '',
        public tipo: string = '',
    ) {

    }
}