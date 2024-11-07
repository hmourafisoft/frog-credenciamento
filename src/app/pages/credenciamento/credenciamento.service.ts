import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredenciamentoService {

  private apiUrl = 'https://cloud-sft.azurewebsites.net/frog-api/omboarding/client';
  private headers = new HttpHeaders({
    'Authorization': 'Basic ZmlzLXZubzAwMjp2QG4jNWU0czcmNCVzNA=='
  });

  constructor(private http: HttpClient) { }

  getClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.headers });
  }
}
