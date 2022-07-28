import { Product } from "./product";
import { Sale } from "./sale";

export class SaleDetail {
  idSaleDetail:number;
  sale: Sale;
  product: Product;
  quantity: number;
}
