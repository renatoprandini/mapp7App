export class Post {
    constructor(
        public $key: string,
        public titulo: string = '',
        public endereco: string = '',
        public descricao: string = '',
        public urgente: string = '',
        public emailUsuario: string,
        public displayName: string,
        public fotoUsuario: string,
        public dataPost: any = null,
        public timePost: any = null,
		public options: boolean = false,
		public avaliado: boolean = false
    ) {

    }
}