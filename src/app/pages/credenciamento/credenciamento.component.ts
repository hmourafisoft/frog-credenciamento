import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ModalConfig, ModalComponent } from '../../_metronic/partials';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

// Dados para a primeira tabela (existente)
interface UserData {
  id: string;
  name: string;
  email: string;
}

const ELEMENT_DATA: UserData[] = [
  { id: '1', name: 'Alice', email: 'alice@example.com' },
  { id: '2', name: 'Bob', email: 'bob@example.com' },
  // Adicione mais dados para teste
];

// Dados para a nova tabela "Project Spendings"
interface ProjectSpending {
  manager: string;
  date: string;
  amount: string;
  status: string;
  code: string;
  cnpjCpf: string;
  company: string;
  franchise: string;
  tradeName: string;
  corporateName: string;
}

const SPENDING_DATA: ProjectSpending[] = [
  { manager: 'Emma Smith2', date: 'Feb 21, 2024', amount: '$487.00', status: 'Rejected', code: '001', cnpjCpf: '123456789', company: 'Company A', franchise: 'Franchise A', tradeName: 'Trade A', corporateName: 'Corp A' },
  { manager: 'Melody Macy', date: 'Oct 25, 2024', amount: '$816.00', status: 'Rejected', code: '002', cnpjCpf: '987654321', company: 'Company B', franchise: 'Franchise B', tradeName: 'Trade B', corporateName: 'Corp B' },
  { manager: 'Max Smith', date: 'Apr 15, 2024', amount: '$707.00', status: 'Approved', code: '003', cnpjCpf: '456123789', company: 'Company C', franchise: 'Franchise C', tradeName: 'Trade C', corporateName: 'Corp C' },
  // Adicione mais dados conforme necessário
];

@Component({
  selector: 'app-credenciamento',
  templateUrl: './credenciamento.component.html',
  styleUrls: ['./credenciamento.component.scss'],
})
export class CredenciamentoComponent implements AfterViewInit {
  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel',
  };

  // Configurações para a tabela existente
  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource = new MatTableDataSource<UserData>(ELEMENT_DATA);

  // Configurações para a nova tabela "Project Spendings"
  spendingColumns: string[] = [
    'manager', 
    'code', 
    'cnpjCpf', 
    'date', 
    'status', 
    'company', 
    'franchise', 
    'tradeName', 
    'corporateName', 
    'details'
  ];
  spendingDataSource = new MatTableDataSource<ProjectSpending>(SPENDING_DATA);

  // ViewChild para paginadores e ordenadores de ambas as tabelas
  @ViewChild('modal') modalComponent!: ModalComponent;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  @ViewChild('spendingPaginator') spendingPaginator!: MatPaginator;
  @ViewChild('spendingSort') spendingSort!: MatSort;

  constructor() {}

  ngAfterViewInit(): void {
    // Configura paginação e ordenação para ambas as tabelas
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.spendingDataSource.paginator = this.spendingPaginator;
    this.spendingDataSource.sort = this.spendingSort;

    if (!this.modalComponent) {
      console.error('ModalComponent não foi inicializado corretamente');
    }
  }

  // Filtro para a tabela existente
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // Filtro para a nova tabela "Project Spendings"
  applySpendingFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.spendingDataSource.filter = filterValue.trim().toLowerCase();
  }

  async openModal() {
    if (this.modalComponent) {
      await this.modalComponent.open();
    } else {
      console.error('ModalComponent não está disponível');
      return;
    }
  }
}
