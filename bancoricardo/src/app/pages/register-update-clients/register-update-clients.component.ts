import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IClient } from 'src/app/interfaces/client';
import { ClientsService } from 'src/app/services/clients.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-update-clients',
  templateUrl: './register-update-clients.component.html',
  styleUrls: ['./register-update-clients.component.css']
})
export class RegisterUpdateClientsComponent {

  clientForm = new FormGroup({
    nome: new FormControl('', Validators.required),
    cpf: new FormControl('', Validators.required),
    telefone: new FormControl('', Validators.required),
    rua: new FormControl('', Validators.required),
    numero: new FormControl(0, Validators.required),
    cep: new FormControl('', Validators.required),
    rendimentoMensal: new FormControl(1.00, Validators.required)
  })


  constructor(private clientsService: ClientsService, private route: ActivatedRoute, private router: Router) {}
  typeCrud = 'register';

  ngOnInit() {
    const cpf = this.route.snapshot.paramMap.get('cpf');
    if (cpf) {
      this.typeCrud = 'edit'
      this.clientsService.buscarClientePorCpf(cpf).subscribe((client: IClient) => {
        this.clientForm.setValue({
          nome: client.nome || '',
          cpf: client.cpf || '',
          telefone: client.telefone || '',
          rua: client.rua || '',
          numero: client.numero || 0,
          cep: client.cep || '',
          rendimentoMensal: client.rendimentoMensal || 1.00
        });
      }, error => {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Cadastro não encontrado!',
          footer: (error.error.errors ? error.error.errors[0].defaultMessage : error.error.message)
        })
      });
    }
  }

  registerOrUpdate() {
    const cpf = this.route.snapshot.paramMap.get('cpf');
    if (cpf) {
      this.update(cpf);
     }
    else {
      this.register();
    }
  }

  register() {
    const client: IClient = this.clientForm.value as IClient;
    this.clientsService.cadastrarCliente(client).subscribe(result => {
      Swal.fire(
        'Cadastrado!',
        'Cadastro realizado com sucesso!',
        'success'
      );
      this.router.navigate(['/clients']);

    }, error => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Cadastro não realizado!',
        footer: (error.error.errors ? error.error.errors[0].defaultMessage : error.error.message)
      })
    });

  }

  update(cpf: string) {
    const client: IClient = this.clientForm.value as IClient;
    this.clientsService.atualizarClientePeloCpf(cpf, client).subscribe(result => {
      Swal.fire(
        'Atualizado!',
        'Cadastro atualizado com sucesso!',
        'success'
      );
      this.router.navigate(['/clients']);

    }, error => {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Cadastro não atualizado!',
        footer: (error.error.errors ? error.error.errors[0].defaultMessage : error.error.message)
      })
    });
  }

}
