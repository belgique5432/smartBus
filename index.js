const checkboxes = document.querySelectorAll('.checkbox-exclusivo');

checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    if (this.checked) {
      checkboxes.forEach(otroCheckbox => {
        if (otroCheckbox !== this) {
          otroCheckbox.checked = false;
        }
      });
    }
  });
});

const baseDeDatosViajes = [
  {
    id: 1,
    destino: 'Mar del plata',
    imagen: './images/marDelPlata.jpg',
    estacionUrl: './mardel.html',
    fechaIda: '15/07/2026',
    fechaVuelta: '30/07/2026'
  },
  {
    id: 2,
    destino: 'Buenos Aires',
    imagen: './images/buenos_aires.jpg',
    estacionUrl: './buenos-aires.html',
    fechaIda: '20/07/2026',
    fechaVuelta: '25/07/2026'
  },
  {
    id: 3,
    destino: 'Bahía Blanca',
    imagen: './images/bahia_blanca.jpg',
    estacionUrl: './bahia-blanca.html',
    fechaIda: '10/08/2026',
    fechaVuelta: null
  }
];

function buscarDestino(destinoIngresado, tipoViajeSeleccionado) {
  const termino = destinoIngresado.trim().toLowerCase();

  if (!termino) {
    return [];
  }

  return baseDeDatosViajes.filter((viaje) => {
    const coincideDestino = viaje.destino.toLowerCase().includes(termino);

    if (tipoViajeSeleccionado === 'ida_y_vuelta') {
      return coincideDestino && viaje.fechaVuelta;
    }

    return coincideDestino;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const formulario = document.getElementById('formulario-busqueda');
  const contenedorResultados = document.getElementById('resultados-container');
  const botonDisminuir = document.getElementById('btn-disminuir-pasajeros');
  const botonAumentar = document.getElementById('btn-aumentar-pasajeros');
  const contadorPasajeros = document.getElementById('nro-pasaje');

  if (!formulario || !contenedorResultados) return;

  let cantidadPasajeros = 1;

  const actualizarContador = () => {
    contadorPasajeros.textContent = cantidadPasajeros;
  };

  if (botonDisminuir && botonAumentar && contadorPasajeros) {
    botonDisminuir.addEventListener('click', () => {
      if (cantidadPasajeros > 1) {
        cantidadPasajeros -= 1;
        actualizarContador();
      }
    });

    botonAumentar.addEventListener('click', () => {
      cantidadPasajeros += 1;
      actualizarContador();
    });
  }

  actualizarContador();

  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const destinoIngresado = document.getElementById('destino-input').value;
    const tipoViajeSeleccionado = document.querySelector('input[name="tipo_viaje"]:checked')?.value || 'ida';

    const viajesEncontrados = buscarDestino(destinoIngresado, tipoViajeSeleccionado);

    contenedorResultados.innerHTML = '';

    if (viajesEncontrados.length > 0) {
      viajesEncontrados.forEach((viaje) => {
        const tarjetaHTML = `
          <div class="tarjeta-resultado">
            <a href="${viaje.estacionUrl}" target="_blank" rel="noopener noreferrer" class="resultado-imagen-link">
              <img src="${viaje.imagen}" alt="${viaje.destino}">
            </a>
            <div>
              <h3>Destino: ${viaje.destino}</h3>
              <p><strong>Partida:</strong> ${viaje.fechaIda}</p>
              ${viaje.fechaVuelta ? `<p><strong>Regreso:</strong> ${viaje.fechaVuelta}</p>` : ''}
            </div>
          </div>
        `;
        contenedorResultados.innerHTML += tarjetaHTML;
      });
    } else {
      contenedorResultados.innerHTML = '<p>No encontramos pasajes para ese destino. Intenta con Mar del plata, Buenos Aires o Bahía Blanca.</p>';
    }
  });
});
