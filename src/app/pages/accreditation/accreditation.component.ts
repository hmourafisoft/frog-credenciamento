import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';

import { BusinessSectorService, BusinessSector } from './business-sector.service.';
import { RevenueProfileService } from './revenue-profile.service';
import { RevenueProfileDTO } from './model/RevenueProfileDTO';
import { BusinessSectorDTO } from './model/BusinessSectorDTO';
import { ClientService } from './client.service'; 
import { CreateClientDTO } from './model/CreateClientDTO';

@Component({
  selector: 'accreditation',
  templateUrl: './accreditation.component.html',
  styleUrls: ['./accreditation.component.scss']
})
export class AccreditationComponent implements OnInit {
  createAccountForm: FormGroup;
  businessSectors: BusinessSectorDTO[] = [];
  revenueProfiles: RevenueProfileDTO[] = [];

  constructor(
    private fb: FormBuilder,
    private businessSectorService: BusinessSectorService,
    private revenueProfileService: RevenueProfileService,
    private clientService: ClientService,
    private currencyPipe: CurrencyPipe
  ) {
    this.createAccountForm = this.fb.group({
      revenueProfile: [''], 
      accountPlan: [''], 
      autoCashFlow: [false],
      cnpj: [''],
      cpf: [''],
      monthlyRevenue: [0, [Validators.required]],
      averageTicket: [0, [Validators.required]], 
      businessSector: ['', Validators.required], 
    });
  }

  ngOnInit(): void {
    this.loadBusinessSectors();
    this.loadRevenueProfiles();

    this.createAccountForm.get('accountPlan')?.valueChanges.subscribe(value => {
      this.toggleFields(value);
    });
  }

  onCPFInput(event: any): void {
    const value = event.target.value;
    this.createAccountForm.get('cpf')?.setValue(this.formatCPF(value), { emitEvent: false });
  }

  onCNPJInput(event: any): void {
    const value = event.target.value;
    this.createAccountForm.get('cnpj')?.setValue(this.formatCNPJ(value), { emitEvent: false });
  }

  formatCPF(value: string): string {
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d)/, '$1.$2');
    value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    return value;
  }

  formatCNPJ(value: string): string {
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/, '$1.$2');
    value = value.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
    value = value.replace(/\.(\d{3})(\d)/, '.$1/$2');
    value = value.replace(/(\d{4})(\d)/, '$1-$2');
    return value;
  }
  
  toggleFields(accountPlan: number): void {

    if (accountPlan === 1) {
      this.createAccountForm.get('cpf')?.setValidators([Validators.required]);
      this.createAccountForm.get('cnpj')?.clearValidators();
    } else if (accountPlan === 2) {
      this.createAccountForm.get('cnpj')?.setValidators([Validators.required]);
      this.createAccountForm.get('cpf')?.clearValidators();
    }

    this.createAccountForm.get('cpf')?.updateValueAndValidity();
    this.createAccountForm.get('cnpj')?.updateValueAndValidity();
  }

  formatCurrency(controlName: string): void {
    
    let value = this.createAccountForm.get(controlName)?.value;
    value = value.toString().replace(/\D/g, '');
    const numericValue = parseFloat(value) / 100; 
    const formattedValue = this.currencyPipe.transform(numericValue, 'BRL', 'symbol', '1.2-2');
    this.createAccountForm.get(controlName)?.setValue(formattedValue, { emitEvent: false });

  }

  loadBusinessSectors(): void {
    this.businessSectorService.getActiveBusinessSectors().subscribe(
      (sectors: BusinessSectorDTO[]) => { 
        console.log('Fetched business sectors:', sectors);
        this.businessSectors = sectors; 
      },
      (error) => {
        console.error('Error fetching business sectors', error);
      }
    );
  }

  loadRevenueProfiles(): void {
    this.revenueProfileService.getActiveRevenueProfiles().subscribe(
      (profiles: RevenueProfileDTO[]) => { 
        console.log('Fetched revenue profiles:', profiles);
        this.revenueProfiles = profiles; 
        
        if (profiles.length > 0) {
          this.createAccountForm.get('revenueProfile')?.setValue(profiles[0].id);
        }
      },
      (error) => {
        console.error('Error fetching revenue profiles', error);
      }
    );
  }

  saveClient(): void {
    if (this.createAccountForm.valid) {
      const clientData: CreateClientDTO = {
        type: Number(this.createAccountForm.value.accountPlan), 
        name: this.createAccountForm.value.cpf, 
        email: '', 
        document: this.createAccountForm.value.cnpj, 
        phone: '', 
        imageUrl: '', 
        businessSector: Number(this.createAccountForm.value.businessSector), 
        revenueProfile: Number(this.createAccountForm.value.revenueProfile), 
        monthlyRevenue: Number(this.createAccountForm.value.monthlyRevenue.toString().replace(/[^\d.-]/g, '')), 
        averageTicket: Number(this.createAccountForm.value.averageTicket.toString().replace(/[^\d.-]/g, '')), 
        autoCashFlow: this.createAccountForm.value.autoCashFlow === true, 
        isActive: true 
      };

      this.clientService.saveClient(clientData).subscribe(
        response => {
          console.log('Client saved successfully:', response);
        },
        error => {
          console.error('Error saving client:', error);
        }
      );
    } else {
      console.log('Form is not valid');
    }
  }

  onSubmit(): void {
    if (this.createAccountForm.valid) {
      console.log('Form Submitted', this.createAccountForm.value);
      this.saveClient();
    } else {
      console.log('Form is not valid');
    }
  }
}
