// ============================
// MongoDB - Observatorio Espacial
// ============================

// 1️⃣ Seleccionar o crear la base de datos
use observatorio_espacial

// 2️⃣ Crear la colección
db.createCollection("observaciones")

// 3️⃣ Insertar documentos de prueba
db.observaciones.insertMany([
  {
    objeto: "Marte",
    tipo_objeto: "Planeta",
    fecha_observacion: "2025-10-25",
    ubicacion: "Nueva York, EE.UU.",
    instrumento: "Telescopio Celestron NexStar 8SE",
    magnitud_aparente: -2.1,
    condiciones_climaticas: "Cielo despejado",
    observador: "Jhon Sebastián Zuluaga",
    comentarios: "Marte se observó con claridad y brillo notable."
  },
  {
    objeto: "Andrómeda",
    tipo_objeto: "Galaxia",
    fecha_observacion: "2025-10-26",
    ubicacion: "Bogotá, Colombia",
    instrumento: "Telescopio Meade LX200",
    magnitud_aparente: 3.4,
    condiciones_climaticas: "Cielo parcialmente nublado",
    observador: "Laura Gómez",
    comentarios: "Se distingue el núcleo de la galaxia con claridad media."
  },
  {
    objeto: "Betelgeuse",
    tipo_objeto: "Estrella",
    fecha_observacion: "2025-10-24",
    ubicacion: "Madrid, España",
    instrumento: "Telescopio Sky-Watcher 130P",
    magnitud_aparente: 0.42,
    condiciones_climaticas: "Cielo despejado",
    observador: "Carlos Ruiz",
    comentarios: "Se notó el característico color rojizo intenso."
  },
  {
    objeto: "Halley",
    tipo_objeto: "Cometa",
    fecha_observacion: "2025-10-23",
    ubicacion: "Buenos Aires, Argentina",
    instrumento: "Binoculares 20x80",
    magnitud_aparente: 2.9,
    condiciones_climaticas: "Cielo parcialmente nublado",
    observador: "Sofía Martínez",
    comentarios: "La cola era visible con dirección noreste."
  },
  {
    objeto: "Orión",
    tipo_objeto: "Nebulosa",
    fecha_observacion: "2025-10-22",
    ubicacion: "Ciudad de México, México",
    instrumento: "Telescopio Dobson 200mm",
    magnitud_aparente: 4.0,
    condiciones_climaticas: "Cielo despejado",
    observador: "Luis Fernández",
    comentarios: "Detalles claros en el gas interestelar."
  },
  {
    objeto: "Júpiter",
    tipo_objeto: "Planeta",
    fecha_observacion: "2025-10-25",
    ubicacion: "Nueva York, EE.UU.",
    instrumento: "Telescopio Celestron NexStar 8SE",
    magnitud_aparente: -2.7,
    condiciones_climaticas: "Cielo despejado",
    observador: "Jhon Sebastián Zuluaga",
    comentarios: "Se observan claramente las cuatro lunas galileanas."
  }
])

// 4️⃣ Consultas básicas
// Mostrar todos los documentos
db.observaciones.find().pretty()

// Buscar observaciones de Marte
db.observaciones.find({ objeto: "Marte" }).pretty()

// Buscar observaciones realizadas por Jhon Sebastián Zuluaga
db.observaciones.find({ observador: "Jhon Sebastián Zuluaga" }).pretty()

// Actualizar comentario de Marte
db.observaciones.updateOne(
  { objeto: "Marte" },
  { $set: { comentarios: "Marte se observó con gran nitidez, con detalles visibles en la superficie." } }
)

// Eliminar observación de Orión
db.observaciones.deleteOne({ objeto: "Orión" })

// 5️⃣ Consultas de agregación
// Contar observaciones por tipo de objeto
db.observaciones.aggregate([
  { $group: { _id: "$tipo_objeto", total: { $sum: 1 } } }
])

// Promedio de magnitud aparente por tipo de objeto
db.observaciones.aggregate([
  { $group: { _id: "$tipo_objeto", promedio_magnitud: { $avg: "$magnitud_aparente" } } }
])

// Contar observaciones por cada observador
db.observaciones.aggregate([
  { $group: { _id: "$observador", total_observaciones: { $sum: 1 } } }
])
