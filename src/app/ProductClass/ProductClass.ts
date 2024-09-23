export class Product {
    constructor(
        public prodId: any = null,
        public Name: string = '',
        public Description: string = '',
        public Brand: string = '',
        public Rating: number = 0,
        public Price: number = 0,
        public Stock: number = 0,
        public Discount: any = 0,
        public Image: any | null = null,
    ) { }
}
