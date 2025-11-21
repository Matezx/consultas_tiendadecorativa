// Seleccionar o crear la base de datos
use tienda_decorativa

// Crear colecciones (opcional, MongoDB las crea al insertar, pero así queda más claro)
db.createCollection("categorias")
db.createCollection("productos")

// Insertar categorías y guardar los ObjectId en variables
const alfombrasId = db.categorias.insertOne({
  nombre: "Alfombras",
  descripcion: "Alfombras de interior y exterior",
  slug: "alfombras",
  activo: true,
  creadoEn: new Date()
}).insertedId;

const cortinasId = db.categorias.insertOne({
  nombre: "Cortinas y persianas",
  descripcion: "Cortinas, persianas y blackouts a medida",
  slug: "cortinas-persianas",
  activo: true,
  creadoEn: new Date()
}).insertedId;

const mueblesExteriorId = db.categorias.insertOne({
  nombre: "Muebles de exterior",
  descripcion: "Salas, comedores y asoleadoras para exterior",
  slug: "muebles-exterior",
  activo: true,
  creadoEn: new Date()
}).insertedId;

const papelId = db.categorias.insertOne({
  nombre: "Papel de colgadura",
  descripcion: "Papeles decorativos para paredes",
  slug: "papel-colgadura",
  activo: true,
  creadoEn: new Date()
}).insertedId;

const pisosId = db.categorias.insertOne({
  nombre: "Pisos SPC",
  descripcion: "Pisos SPC resistentes al agua",
  slug: "pisos-spc",
  activo: true,
  creadoEn: new Date()
}).insertedId;

const decoracionId = db.categorias.insertOne({
  nombre: "Decoración",
  descripcion: "Cuadros, jarrones y accesorios decorativos",
  slug: "decoracion",
  activo: true,
  creadoEn: new Date()
}).insertedId;


// Insertar algunos productos
db.productos.insertMany([
  {
    nombre: "Alfombra de yute natural 2x3",
    descripcion: "Alfombra de yute tono beige para sala o comedor.",
    sku: "ALF-001",
    precio: 520000,
    stock: 8,
    categoriaId: alfombrasId,
    colores: ["beige"],
    materiales: ["yute"],
    medidas: { ancho: 2.0, largo: 3.0, unidad: "m" },
    ambientesRecomendados: ["sala", "comedor"],
    activo: true,
    creadoEn: new Date()
  },
  {
    nombre: "Cortina blackout gris",
    descripcion: "Cortina blackout a medida en tono gris.",
    sku: "COR-010",
    precio: 380000,
    stock: 15,
    categoriaId: cortinasId,
    colores: ["gris"],
    materiales: ["poliéster"],
    medidas: { ancho: 1.5, largo: 2.4, unidad: "m" },
    ambientesRecomendados: ["habitación"],
    activo: true,
    creadoEn: new Date()
  },
  {
    nombre: "Sala de exterior 3 puestos Sunfiber",
    descripcion: "Sala de exterior resistente al sol y la lluvia.",
    sku: "MUE-030",
    precio: 2850000,
    stock: 3,
    categoriaId: mueblesExteriorId,
    colores: ["beige", "madera"],
    materiales: ["aluminio", "sunfiber"],
    medidas: { ancho: 2.2, largo: 1.6, unidad: "m" },
    ambientesRecomendados: ["terraza", "balcón", "jardín"],
    activo: true,
    creadoEn: new Date()
  },
  {
    nombre: "Papel de colgadura efecto cemento",
    descripcion: "Papel decorativo con textura tipo cemento.",
    sku: "PAP-020",
    precio: 260000,
    stock: 20,
    categoriaId: papelId,
    colores: ["gris"],
    materiales: ["vinilo"],
    medidas: { ancho: 0.53, largo: 10.0, unidad: "m" },
    ambientesRecomendados: ["sala", "oficina"],
    activo: true,
    creadoEn: new Date()
  }
]);


// Insertar 96 productos de prueba adicionales (total > 100)
for (let i = 1; i <= 96; i++) {
  db.productos.insertOne({
    nombre: "Alfombra tejido plano modelo " + i,
    descripcion: "Alfombra de prueba para el catálogo, modelo " + i,
    sku: "ALF-" + (100 + i),
    precio: 300000 + (i * 2000),
    stock: 5 + (i % 10),
    categoriaId: alfombrasId,
    colores: ["beige", "gris"],
    materiales: ["polipropileno"],
    medidas: { ancho: 1.6, largo: 2.3, unidad: "m" },
    ambientesRecomendados: ["sala"],
    activo: true,
    creadoEn: new Date()
  });
}

//Inserción de un nuevo producto
db.productos.insertOne({
  nombre: "Cojín decorativo lino beige",
  descripcion: "Cojín decorativo 45x45 cm en lino beige.",
  sku: "DEC-050",
  precio: 85000,
  stock: 25,
  categoriaId: decoracionId,
  colores: ["beige"],
  materiales: ["lino"],
  medidas: { ancho: 0.45, largo: 0.45, unidad: "m" },
  ambientesRecomendados: ["sala", "habitación"],
  activo: true,
  creadoEn: new Date()
});


// Selección (búsqueda) de todos los productos
db.productos.find();

//Selección de algunos campos
db.productos.find(
  {},
  { nombre: 1, precio: 1, categoriaId: 1 }
);


// Actualización de un producto
db.productos.updateOne(
  { sku: "ALF-001" },            
  { $set: { precio: 550000 } }   
);


// Eliminar un producto
db.productos.deleteOne({ sku: "DEC-050" });


// Consultas productos con precio mayor o igual a 500.000 COP
db.productos.find({
  precio: { $gte: 500000 }
})

  
//Productos activos con rango de precio
  db.productos.find({
  activo: true,
  precio: { $gte: 300000, $lte: 800000 }
});

  
// Búsqueda por nombre con expresión regular
db.productos.find({
  nombre: { $regex: "alfombra", $options: "i" }
});


//Consultas de agregación - Número de productos por categoría
db.productos.aggregate([
  {
    $group: {
      _id: "$categoriaId",
      totalProductos: { $sum: 1 }
    }
  },
  { $sort: { totalProductos: -1 } }
]);

//Precio promedio por categoría
db.productos.aggregate([
  {
    $group: {
      _id: "$categoriaId",
      precioPromedio: { $avg: "$precio" },
      precioMinimo: { $min: "$precio" },
      precioMaximo: { $max: "$precio" }
    }
  }
]);

//Stock total por categoría
db.productos.aggregate([
  {
    $group: {
      _id: "$categoriaId",
      stockTotal: { $sum: "$stock" }
    }
  },
  { $sort: { stockTotal: -1 } }
]);
