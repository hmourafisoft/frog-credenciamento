import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RevenueProfileDTO } from './model/RevenueProfileDTO';

@Injectable({
  providedIn: 'root'
})
export class RevenueProfileService {
  private readonly BASE_URL = 'http://localhost:8080/api/v1/RevenueProfile';

  constructor(private http: HttpClient) {}

  getRevenueProfiles(): Observable<RevenueProfileDTO[]> {
    return this.http.get<RevenueProfileDTO[]>(this.BASE_URL);
  }

  getActiveRevenueProfiles(): Observable<RevenueProfileDTO[]> {
    return this.getRevenueProfiles().pipe(
      map(profiles => profiles.filter(profile => profile.isActive))
    );
  }
}
