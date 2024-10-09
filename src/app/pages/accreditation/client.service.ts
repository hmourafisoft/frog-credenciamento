import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateClientDTO } from './model/CreateClientDTO'; // Certifique-se de ter esse DTO criado

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly BASE_CLIENT_URL = 'http://localhost:8080/api/v1/Client';

  constructor(private http: HttpClient) {}

  // Método para salvar um cliente
  saveClient(clientData: CreateClientDTO): Observable<any> {
    return this.http.post<any>(this.BASE_CLIENT_URL, clientData);
  }
}
