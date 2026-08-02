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

// Agregar con botón
addBtn.addEventListener('click', agregarItem);

// Agregar con Enter
itemInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') agregarItem();
});

function agregarItem() {
  const texto = itemInput.value.trim();
  if (!texto) return;
  itemsRef.push({ nombre: texto, fecha: Date.now() });
  itemInput.value = '';
  itemInput.focus();
}

// Escuchar cambios en tiempo real (para todos los usuarios)
itemsRef.on('value', snapshot => {
  itemList.innerHTML = '';
  snapshot.forEach(child => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${child.val().nombre}</span>
      <button onclick="borrarItem('${child.key}')">✕</button>
    `;
    itemList.appendChild(li);
  });
});

function borrarItem(key) {
  itemsRef.child(key).remove();
}
