import { CompanyTypes } from './enum/CompanyTypes';

export class CreateClientDTO {
  id?: string;
  type!: CompanyTypes;
  name!: string;
  email!: string;
  document!: string;
  phone?: string;
  imageUrl?: string;
  businessSector!: number;
  revenueProfile!: number;
  monthlyRevenue!: number;
  averageTicket!: number;
  autoCashFlow!: boolean;
  isActive!: boolean;
}