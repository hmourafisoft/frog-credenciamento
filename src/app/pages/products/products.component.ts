import { Component } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  selectedProduct: string = '';  // Certifique-se de que isso seja uma string ou um número, dependendo do tipo de ID
  
  products = [
    { id: '1', name: 'Maquininha', description: '', icon: 'assets/icons/machine-icon.png' },
    { id: '2', name: 'Link de Pagamento', description: '', icon: 'assets/icons/link-icon.png' },
    { id: '3', name: 'FrogBank', description: '', icon: 'assets/icons/frogbank-icon.png' },
    { id: '4', name: 'FrogDigital', description: '', icon: 'assets/icons/frogdigital-icon.png' },
    { id: '5', name: 'FrogPDV', description: '', icon: 'assets/icons/frogpdv-icon.png' },
    { id: '6', name: 'Split de Pagamentos', description: '', icon: 'assets/icons/split-icon.png' }
  ];
}

