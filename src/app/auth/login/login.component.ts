import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from "primeng/password";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ReactiveFormsModule
  ],
  template: `
    <main class="home__main-container flex w-full min-h-screen md:flex-row-reverse">

      <section class="p-3 home__main-container__form flex flex-column w-6 min-h-screen md:px-5">
        
        <header class="w-full flex align-items-center ">
          <div class="w-15rem">
            <img src="assets/icontrol.png" alt="logo de icontrol" class="w-full">
          </div>
        </header>

        <section class="flex flex-column align-items-center justify-content-center w-full form-section py-4 px-0">
          <div class="my-4">
            <h2 class="m-0">Ingresa a su cuenta</h2>
          </div>

          <div class="py-3 w-full px-3">
            <form [formGroup]="loginForm" autocomplete="off" class="w-full block p-fluid">
              <div class="flex flex-column gap-2 mb-4">
                <label for="">Correo</label>
                <input type="text" pInputText placeholder="example@gmail.com" formControlName="email">
              </div>
              <div class="flex flex-column gap-2 ">
                <label for="">Contraseña</label>
                <p-password placeholder="Contraseña" [toggleMask]="true" formControlName="password" />
              </div>
              <div class="flex justify-content-end mb-4 mt-2">
                <p-button label="¿Olvido su contraseña?" [link]="true" />
              </div>
              <div class="p-fluid">
                <p-button 
                  label="Iniciar sesión"
                  severity="danger"  />
              </div>
            </form>
          </div>

          <footer class="w-full">
              <div class="w-full">
                <ul class="list-none flex justify-content-between align-items-center p-0">
                  <li class="flex align-items-center gap-2">
                    <a href="https://www.instagram.com/icontroltec" class="no-underline text-blue-400 hover:underline">
                      &#64;icontroltec
                    </a>
                  </li>
                  <li>
                    &copy; icontrol 2024
                  </li>
                </ul>
              </div>
          </footer>
        </section>

      </section>

      <section class="home__main-container__ad  flex flex-column align-content-center justify-content-center h-screen overflow-hidden w-6 fixed top-0 left-0 p-3 md:p-0 ">
        <div class="w-full h-full hidden justify-content-center md:flex">
          <img src="assets/ads/ad.jpg" alt="anuncio" class="w-full">
        </div>
        <div class="w-full bg-black round md:hidden">
            <ul class="list-none p-0 text-center text-white">
              <li class="">
                Toma el control del consumo <strong class="inline-block bg-red-500 text-white">de tus aires acondicionados</strong>
              </li>
            </ul>
        </div>
      </section>

    </main>
  
  
  
  `,
  styles: `
    .form-section{
      min-height: 55vh;
    }

    .round{
      border-radius: .5rem !important;
    }

    .bg-black{
      background-color: #000 !important;
    }

    @media only screen and (max-width: 750px) {
      .home__main-container {
        flex-flow: column wrap !important;
        min-height: 80vh !important;
      }
      
      .home__main-container__form  {
        overflow: hidden;
        width: 100% !important;
        min-height: 80vh !important;
      }

      .home__main-container__ad {
          position: inherit !important;
          width: 100% !important;
          max-height: 20vw ! important;
          
      }
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  /**
   * @description Form builder instance para crear formularios reactivos
  */
  private fb = inject(FormBuilder)

  /**
   * @description Formulario de login
  */
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  /**
   * @description Getter para obtener el control del email
  */
  get email (){
    return this.loginForm.get('email')
  }

  /**
   * @description Getter para obtener el control de la contraseña
  */
  get password () {
    return this.loginForm.get('password')
  }

  ngOnInit(): void { }

}
