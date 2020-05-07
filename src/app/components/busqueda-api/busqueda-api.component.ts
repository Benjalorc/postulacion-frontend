import { Component, OnInit } from '@angular/core';
import { GetApiService } from '../../services/get-api/get-api.service';

@Component({
  selector: 'app-busqueda-api',
  templateUrl: './busqueda-api.component.html',
  styleUrls: ['./busqueda-api.component.scss']
})
export class BusquedaApiComponent implements OnInit {

	media: any;
	datos: {
		media: {
			subscripcion: any;
			param: string;
			data: any;
			err: {
				title: string;
				text: string;
			};
		}
	};

	hold: boolean;

	loading: boolean;

	constructor(public getApi: GetApiService) { }

	ngOnInit() {
		this.datos = {
			media: {
				subscripcion: null,
				param: "",
				data: null,
				err: null
			},
		};
		this.loading = false;
	}

	buscarPorNombre(nombre){
		this.loading = true;
		this.datos.media.data = [];

		let gone = true;
		let tiempo = setTimeout(()=>{
			if(gone) this.hold = true;
		},5000);

		this.datos.media.subscripcion = this.getApi.getMedia(nombre).subscribe(data=>{

			this.datos.media.subscripcion.unsubscribe();

			if(this.hold) this.hold = false;
			else clearTimeout(tiempo);

			this.asignarImagen(data);
			this.datos.media.data = data;
			this.datos.media.err = null;
			this.loading = gone = false;
		},
		err=>{

			this.datos.media.subscripcion.unsubscribe();

			if(this.hold) this.hold = false;
			else clearTimeout(tiempo);


			setTimeout(()=>{
				this.datos.media.data = [];
				this.loading = gone = false;
				this.datos.media.err = {
					title: "No se pudo conectar con el API.",
					text: "Verifique su conexión a internet y vuelva a intentar."
				};
			},1000);
		});

	}

	asignarImagen(arr){

		let images = [
			"assets/images/debian.png",
			"assets/images/lubuntu.png",
			"assets/images/mint.png"
		];

		let servicios = [];
		for(let i = 0, j = arr.length; i<j; i++){

			let origen = arr[i].origen;
			if(!servicios.find((el)=> el==origen)) servicios.push(origen);

			let index = servicios.findIndex((el)=> el == origen);
			arr[i].imagen = images[index];
		}
	}

	cancelarMedia(){
		this.loading = this.hold = false;
		this.datos.media.subscripcion.unsubscribe();
	}

	cerrarMediaErr(){
		this.datos.media.err = this.datos.media.data = null;
	}
}
