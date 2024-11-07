import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { ModalConfig, ModalComponent } from '../../_metronic/partials';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CredenciamentoService } from './credenciamento.service';
import { Router } from '@angular/router';

// Dados para a primeira tabela (existente)
interface UserData {
  id: string;
  name: string;
  email: string;
}

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

@Component({
  selector: 'app-credenciamento',
  templateUrl: './credenciamento.component.html',
  styleUrls: ['./credenciamento.component.scss'],
})
export class CredenciamentoComponent implements AfterViewInit, OnInit {
  modalConfig: ModalConfig = {
    modalTitle: 'Modal title',
    dismissButtonLabel: 'Submit',
    closeButtonLabel: 'Cancel',
  };

  // Configurações para a tabela existente
  displayedColumns: string[] = ['id', 'name', 'email'];
  dataSource = new MatTableDataSource<UserData>([]);

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
  spendingDataSource = new MatTableDataSource<ProjectSpending>([]);

  // ViewChild para paginadores e ordenadores de ambas as tabelas
  @ViewChild('modal') modalComponent!: ModalComponent;
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('sort') sort!: MatSort;
  @ViewChild('spendingPaginator') spendingPaginator!: MatPaginator;
  @ViewChild('spendingSort') spendingSort!: MatSort;

  constructor(
    private credenciamentoService: CredenciamentoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Busca os dados da API ao inicializar o componente
    this.credenciamentoService.getClientes().subscribe(
      (data) => {
        // Mapeia os dados recebidos da API para o formato esperado pela tabela
        this.spendingDataSource.data = data.map(client => ({
          manager: client.name, // ou ajuste conforme o necessário
          date: new Date().toLocaleDateString(), // ou ajuste conforme a data real, se disponível
          amount: client.monthly_revenue,
          status: client.registration_status,
          code: client.id,
          cnpjCpf: client.document,
          company: client.name,
          franchise: 'Franquia', // ajuste conforme a necessidade
          tradeName: client.trade_name,
          corporateName: client.name
        }));
      },
      (error) => {
        console.error('Erro ao carregar os dados da API:', error);
      }
    );
  }

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

  navigateToAccount() {
    this.router.navigate(['/crafted/account']);
  }
}
