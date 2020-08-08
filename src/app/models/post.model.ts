export class Post {
    constructor(
        public $key: string,
        public titulo: string = '',
        public imagem: string = '',
        public descricao: string = '',
        public localizacao: string = '',
        public urgente: string = '',
        public emailUsuario: string = ''
    ) {

    }
}