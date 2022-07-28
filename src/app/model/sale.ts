import { Person } from "./person";
import { SaleDetail } from "./SaleDetail";

export class Sale{
  idSale: number;
    person: Person;
    datetime: string;
    total: number;
    details: SaleDetail[];
}
