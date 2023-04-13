import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IClient } from 'src/app/interfaces/client';
import { ClientsService } from 'src/app/services/clients.service';

@Component({
  selector: 'app-register-update-clients',
  templateUrl: './register-update-clients.component.html',
  styleUrls: ['./register-update-clients.component.css']
})
export class RegisterUpdateClientsComponent {

  constructor(private clientsService: ClientsService) {}

  clientForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    rua: new FormControl('', Validators.required),
    numero: new FormControl(Validators.required),
    cep: new FormControl('', Validators.required),
    rendimentoMensal: new FormControl(1.00, Validators.required)
  })

  register() {
    const client: IClient = this.clientForm.value as IClient;
    this.clientsService.cadastrarCliente(client).subscribe(result => {
      console.log(result);
    }, error => {
      console.error(error);
    });
  }

}
