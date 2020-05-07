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
			param: string;
			data: any;
			err: {
				title: string,
				text: string
			};
		}
	};

	loading: boolean;

	constructor(public getApi: GetApiService) { }

	ngOnInit() {
		this.datos = {
			media: {
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
		this.getApi.getMedia(nombre).subscribe(data=>{

			this.asignarImagen(data);

			this.datos.media.data = data;
			this.datos.media.err = null;
			this.loading = false;
		},
		err=>{
			setTimeout(()=>{
				this.datos.media.data = [];
				this.loading = false;
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
}
