export interface RentalValues {
  abl: ABL;
  expensas: Expensas,
  alquiler: number;
}

interface Expensas {
  extraordinarias: number;
  totalExpensas: number;
}

interface ABL {
  impuestoInmobiliario: number,
  totalAbl: number,
}
