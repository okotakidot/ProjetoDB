import { Component } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',

  standalone: true,

  imports: [ReactiveFormsModule, RouterLink],

  templateUrl: './cadastro.html',
  styleUrl: './cadastro.css',
})
export class Cadastro {
  cadastroForm;

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],

      email: ['', [Validators.required, Validators.email]],

      senha: ['', [Validators.required, Validators.minLength(6)]],

      confirmarSenha: ['', Validators.required],
    });
  }

  cadastrar(): void {
    if (this.cadastroForm.invalid) {
      this.cadastroForm.markAllAsTouched();

      window.dispatchEvent(
        new CustomEvent('notificacao', {
          detail: 'Preencha todos os campos corretamente.',
        }),
      );

      return;
    }

    const dados = this.cadastroForm.value;

    if (dados.senha !== dados.confirmarSenha) {
      window.dispatchEvent(
        new CustomEvent('notificacao', {
          detail: 'As senhas não coincidem.',
        }),
      );

      return;
    }

    const usuario = {
      nome: dados.nome ?? '',

      email: dados.email ?? '',

      senha: dados.senha ?? '',
    };

    localStorage.setItem('usuario', JSON.stringify(usuario));

    window.dispatchEvent(
      new CustomEvent('notificacao', {
        detail: 'Cadastro realizado com sucesso! 🐾',
      }),
    );

    this.cadastroForm.reset();
  }
}
