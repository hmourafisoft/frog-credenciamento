import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private clientService: ClientService
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
  }

  loadBusinessSectors(): void {
    this.businessSectorService.getActiveBusinessSectors().subscribe(
      (sectors: BusinessSectorDTO[]) => { // Specify the type for sectors
        console.log('Fetched business sectors:', sectors);
        this.businessSectors = sectors; // Assign fetched sectors to the property
      },
      (error) => {
        console.error('Error fetching business sectors', error);
      }
    );
  }

  loadRevenueProfiles(): void {
    this.revenueProfileService.getActiveRevenueProfiles().subscribe(
      (profiles: RevenueProfileDTO[]) => { // Specify the type for profiles
        console.log('Fetched revenue profiles:', profiles);
        this.revenueProfiles = profiles; // Assign fetched profiles to the property
        // Optionally set the default value for revenueProfile if needed
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
        type: Number(this.createAccountForm.value.accountPlan), // Adjust as needed, ensure it's a number
        name: this.createAccountForm.value.cpf, // Adjust as needed
        email: '', // Add appropriate value
        document: this.createAccountForm.value.cnpj, // Adjust as needed
        phone: '', // Add appropriate value
        imageUrl: '', // Add appropriate value
        businessSector: Number(this.createAccountForm.value.businessSector), // Ensure this is an integer
        revenueProfile: Number(this.createAccountForm.value.revenueProfile), // Ensure this is an integer
        monthlyRevenue: Number(this.createAccountForm.value.monthlyRevenue), // Ensure this is an integer
        averageTicket: Number(this.createAccountForm.value.averageTicket), // Ensure this is an integer
        autoCashFlow: this.createAccountForm.value.autoCashFlow === true, // Ensure this is a boolean
        isActive: true // Adjust as needed
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

  // Handle the form submission
  onSubmit(): void {
    if (this.createAccountForm.valid) {
      console.log('Form Submitted', this.createAccountForm.value);
      this.saveClient();
    } else {
      console.log('Form is not valid');
    }
  }
}
