// Configuración Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCHfQwXlSVgbLw9iuC8iXYshTtBUJum2RU",
  authDomain: "mi-despenda.firebaseapp.com",
  databaseURL: "https://mi-despenda-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mi-despenda",
  storageBucket: "mi-despenda.firebasestorage.app",
  messagingSenderId: "371223706662",
  appId: "1:371223706662:web:f507e35bb15c676ec67ae7"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const itemsRef = db.ref('items');

const itemInput = document.getElementById('itemInput');
const addBtn    = document.getElementById('addBtn');
const itemList  = document.getElementById('itemList');

// Agregar producto
addBtn.addEventListener('click', agregarItem);
itemInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') agregarItem();
});

function agregarItem() {
  const texto = itemInput.value.trim();
  if (!texto) return;
  itemsRef.push({ nombre: texto, cantidad: 1, fecha: Date.now() });
  itemInput.value = '';
  itemInput.focus();
}

// Cambiar cantidad
function cambiarCantidad(key, delta) {
  itemsRef.child(key).once('value', snap => {
    const actual = snap.val().cantidad || 1;
    const nueva = Math.max(0, actual + delta);
    if (nueva === 0) {
      if (confirm('¿Borrar este producto?')) {
        itemsRef.child(key).remove();
      }
    } else {
      itemsRef.child(key).update({ cantidad: nueva });
    }
  });
}

// Borrar producto
function borrarItem(key) {
  itemsRef.child(key).remove();
}

// Escuchar cambios en tiempo real
itemsRef.on('value', snapshot => {
  itemList.innerHTML = '';
  snapshot.forEach(child => {
    const { nombre, cantidad } = child.val();
    const li = document.createElement('li');
    li.innerHTML = `
      <span class="item-nombre">${nombre}</span>
      <div class="item-controles">
        <button class="btn-qty" onclick="cambiarCantidad('${child.key}', -1)">−</button>
        <span class="item-cantidad">${cantidad || 1}</span>
        <button class="btn-qty" onclick="cambiarCantidad('${child.key}', 1)">+</button>
      </div>
    `;
    itemList.appendChild(li);
  });
});
// 1. Elementos del HTML
const botonAgregar = document.getElementById('btn-agregar');
const inputProducto = document.getElementById('nombre-producto');
const contenedorNotificaciones = document.getElementById('contenedor-notificaciones');

// Supongamos que tienes guardado el estado de tu botón jeringuilla en una variable
// o simplemente quieres validar una condición
let jeringuillaActivada = false; 

// 2. Función mágica para crear y mostrar la notificación en pantalla
function enviarNotificacion(mensaje) {
  const alerta = document.createElement('div');
  alerta.classList.add('notificacion');
  alerta.innerHTML = `<span>⚠️</span> <span>${mensaje}</span>`;
  
  contenedorNotificaciones.appendChild(alerta);
  
  // Desaparece sola a los 4 segundos
  setTimeout(() => {
    alerta.classList.add('ocultar');
    alerta.addEventListener('animationend', () => {
      alerta.remove();
    });
  }, 4000);
}

// 3. Escuchar el clic en el botón verde "Agregar"
botonAgregar.addEventListener('click', () => {
  const textoProducto = inputProducto.value.trim();

  if (textoProducto === "") return; // Si está vacío no hace nada

  // CONDICIÓN: Si la jeringuilla no está activa, envía tu alerta personalizada
  if (!jeringuillaActivada) {
    enviarNotificacion("Hola usuario, se te ha olvidado la jeringuilla 💉");
  }

  // Aquí continuaría tu código normal para meter el producto en la lista...
});
