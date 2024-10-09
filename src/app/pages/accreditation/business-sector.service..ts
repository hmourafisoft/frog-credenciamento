import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface BusinessSector {
  id: number;
  name: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BusinessSectorService {

  private readonly BASE_BUSINESS_SECTOR_URL = 'http://localhost:8080/api/v1/BusinessSector';

  constructor(private http: HttpClient) {}

  getBusinessSectors(): Observable<BusinessSector[]> {
    return this.http.get<BusinessSector[]>(this.BASE_BUSINESS_SECTOR_URL);
  }

  getBusinessSectorById(id: number): Observable<BusinessSector> {
    return this.http.get<BusinessSector>(`${this.BASE_BUSINESS_SECTOR_URL}/${id}`);
  }

  getActiveBusinessSectors(): Observable<BusinessSector[]> {
    return this.getBusinessSectors().pipe(
      map((sectors: BusinessSector[]) => sectors.filter(sector => sector.isActive))
    );
  }
}
