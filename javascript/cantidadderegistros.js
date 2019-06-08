$(document).ready(function(){
	limpiar();
	$("#btnguardar").show();
	$("#btnmodificar").hide();
});

function llenartabla(){
	var cantidad = $("#idelemento").val();
	var i=1;
	var id=$("#dato tr").length +1;


	
	var divSalida=$("#dato");
	divSalida.html('');
	var cadena='';
	while(i<=cantidad){
			cadena= '<tr id="id_'+i+'">\
					  <th scope="row">'+i+'</th>\
	 				  <td>Mark</td>\
	 				  <td>Guayaquil</td>\
					  <td>Otto</td>\
					  <td>20</td>\
					  <td><button type="button" class="btn btn-primary">Modificar</button></td>\
					  <td><button type="button" class="btn btn-danger" onClick="eliminar('+i+')">Eliminar</button>\
					  </td>\
				</tr>';
				divSalida.append(cadena);
				i=i+1; 
	 	}
	 	i=0;
	}


	function guardardatos(){
		var clave = $("#idclave").val();
		var direccion = $("#iddireccion").val();
		var propietario = $("#idpropietario").val();
		var avaluo = $("#idavaluo").val();
		var id=$("#dato tr").length +1;

		
		var divSalida=$("#dato");


		var cadena='';
		
				cadena = '<tr id="id_'+id+'">\
						  <th scope="row">'+id+'</th>\
		 				  <td>'+clave+'</td>\
		 				  <td>'+direccion+'</td>\
						  <td>'+propietario+'</td>\
						  <td>'+avaluo+'</td>\
						  <td><button type="button" class="btn btn-success" onClick="modificar('+id+')">Modificar</button></td>\
						  <td><button type="button" class="btn btn-danger" onClick="eliminar('+id+')">Eliminar</button>\
						  </td>\
					</tr>';
					divSalida.append(cadena);
					limpiar();
				
	}

function guardarmodificacion(){

		var id = $('#idid').val();
		var clave = $("#idclave").val();
		var direccion = $("#iddireccion").val();
		var propietario = $("#idpropietario").val();
		var avaluo = $("#idavaluo").val();
		
		var cadena='';
	
			cadena = '<tr id="id_'+id+'">\
					  <th scope="row">'+id+'</th>\
	 				  <td>'+clave+'</td>\
	 				  <td>'+direccion+'</td>\
					  <td>'+propietario+'</td>\
					  <td>'+avaluo+'</td>\
					  <td><button type="button" class="btn btn-success" onClick="modificar('+id+')">Modificar</button></td>\
					  <td><button type="button" class="btn btn-danger" onClick="eliminar('+id+')">Eliminar</button>\
					  </td>\
				</tr>';
				$('#id_'+ id).replaceWith(cadena);
				limpiar();
				$("#btnguardar").show();
				$("#btnmodificar").hide();
}



function eliminar(registro){
	$('#id_' + registro).remove();
}

function modificar(idregistro){
	$('#idid').val(idregistro);
	llenarFormulario(idregistro);
	$("#btnguardar").hide();
	$("#btnmodificar").show();
}

function limpiar(){
	$("#idid").val('');
	$("#idclave").val('');
	$("#iddireccion").val('');
	$("#idpropietario").val('');
	$("#idavaluo").val('');
}

function llenarFormulario(idregistro){
	
	$('#dato tr').each(function(){
		if(idregistro==this.cells[0].innerHTML){
		var clave=this.cells[1].innerHTML;
		var direccion=this.cells[2].innerHTML;
		var propietario=this.cells[3].innerHTML;
		var avaluo =this.cells[4].innerHTML;
		$('#idclave').val(clave);
		$("#iddireccion").val(direccion);
		$("#idpropietario").val(propietario);
		$("#idavaluo").val(avaluo);
	}
	});

}


function buscar_parametro(){
	var criterio= $('#idbuscar').val();

		$('#dato tr').each(function(){
			var clave= this.cells[1].innerHTML;
			var id= this.cells[0].innerHTML;

			if (criterio.trim() != clave.trim()) {
				$('#id_' + id).hide();
			}
		});
		limpiarbuscar();
}


function mostrar_datos(){
		$('#dato tr').each(function(){
		var id= this.cells[0].innerHTML;
		$('#id_' + id).show();
	});
		limpiarbuscar();
}
function limpiarbuscar(){
	$("#idbuscar").val('');
}


function llenarArchivo(){
	var divSalida=$("#dato");
	divSalida.html('');
	var cadena="";
	$.ajax({
		type:"GET",
		url: "archivo/datos.json",
		success:function(result){
			for (var i in result) {
			cadena +="<tr id='id_"+ (parseInt(i)+1)+"'><th>" + (parseInt(i)+1)+
					  "</td><td>" + result[i].clave +
					  "</td><td>" + result[i].direccion +
					  "</td><td>" + result[i].propietario +
					  "</td><td>" + result[i].AVALUO +
	 				  "</td><td><button type='button' class='btn btn-success' onClick='modificar("+(parseInt(i)+1)+")'>Modificar</button>"+
					  "</td><td><button type='button' class='btn btn-danger' onClick='eliminar("+(parseInt(i)+1)+")'>Eliminar</button>"+
					  "</th></tr>";
				
			}
		divSalida.html(cadena);
		}
	});
}