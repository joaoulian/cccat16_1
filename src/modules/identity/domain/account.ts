export interface Account {
  id: string;
  email: string;
  name: string;
  isDriver: boolean;
  isPassenger: boolean;
  carPlate: string | null;
  cpf: string;
}
