import { Component, OnInit } from '@angular/core';
import { Socio } from './Socio';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  contactform: FormGroup;
  socios: Socio[] = [];
  newSocio : Socio | null = null;

  constructor() {

    this.contactform = new FormGroup({
      nombre: new FormControl ('', [Validators.required, Validators.minLength(3)]),
      apellidos: new FormControl ('', [Validators.required, Validators.minLength(3)]),
      dni: new FormControl ('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
      telefono: new FormControl ('', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]),
    });

  }

  ngOnInit(): void {}


  registro(): void
  {

		let socio = new Socio();

		socio.nombre = this.contactform.value.nombre;
		socio.apellidos = this.contactform.value.apellidos;
		socio.dni = this.contactform.value.dni;
		socio.telefono = this.contactform.value.telefono;
		socio.sexo = this.contactform.value.sexo;
    	socio.socio = Math.round(Math.random()*10000);

		this.socios.push(socio);
		this.contactform.reset();
  }


  delete(event : MouseEvent, socio : Socio) : void
	{
		for (let i = 0; i<= this.socios.length-1; i++)
		{
			if (this.socios[i] == socio)
			{
				this.socios.splice(i, 1);
			}
		}

		if (this.newSocio != null && this.newSocio == socio)
		{
			this.contactform.reset();
			this.newSocio = null;
		}
  }

  modificar(event : MouseEvent, socio : Socio) : void
	{
		this.contactform.controls["nombre"].setValue(socio.nombre);
		this.contactform.controls["apellidos"].setValue(socio.apellidos);
		this.contactform.controls["dni"].setValue(socio.dni);
		this.contactform.controls["telefono"].setValue(socio.telefono);
		this.contactform.controls["sexo"].setValue(socio.sexo);
		this.newSocio = socio;
	}


}
