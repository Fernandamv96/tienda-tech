import { useState } from 'react';
import './App.css';

// ============================================================
// COMPONENTE PRINCIPAL - Tienda Tech
// Gestión de productos con CRUD completo
// ============================================================

function App() {

  // ─── ESTADO: lista de productos registrados ───
  const [productos, setProductos] = useState([]);

  // ─── ESTADO: campos del formulario controlado ───
  const [nombre, setNombre]           = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio]           = useState('');
  const [categoria, setCategoria]     = useState('');
  const [stock, setStock]             = useState('');
  const [imagenPreview, setImagenPreview] = useState(null);  // URL base64 de la imagen
  const [imagenArchivo, setImagenArchivo] = useState(null);  // Objeto File original

  // ─── ESTADO: errores de validación ───
  const [errores, setErrores] = useState({});

  // ─── ESTADO: id del producto en edición (null = modo agregar) ───
  const [editarId, setEditarId] = useState(null);

  // ─── CATEGORÍAS disponibles ───
  const categorias = [
    'Laptops', 'Celulares', 'Tablets', 'Accesorios',
    'Monitores', 'Teclados', 'Auriculares', 'Almacenamiento',
  ];

  // ============================================================
  // VALIDACIONES
  // ============================================================

  /**
   * Valida todos los campos del formulario.
   * Retorna true si el formulario es válido, false si hay errores.
   */
  const validarFormulario = () => {
    const nuevosErrores = {};

    if (nombre.trim() === '')
      nuevosErrores.nombre = 'El nombre del producto es obligatorio.';

    if (descripcion.trim() === '')
      nuevosErrores.descripcion = 'La descripción es obligatoria.';

    if (precio === '' || isNaN(Number(precio)) || Number(precio) <= 0)
      nuevosErrores.precio = 'Ingresa un precio válido mayor a 0.';

    if (categoria === '')
      nuevosErrores.categoria = 'Selecciona una categoría.';

    if (stock === '' || isNaN(Number(stock)) || Number(stock) < 0)
      nuevosErrores.stock = 'El stock debe ser un número mayor o igual a 0.';

    setErrores(nuevosErrores);
    // Si el objeto de errores está vacío, el formulario es válido
    return Object.keys(nuevosErrores).length === 0;
  };

  // ============================================================
  // MANEJO DE IMAGEN
  // ============================================================

  /**
   * Procesa el archivo de imagen seleccionado.
   * Valida que no supere los 2 MB y genera una vista previa en base64.
   */
  const manejarImagen = (e) => {
    const archivo = e.target.files[0];
    if (!archivo) return;

    const LIMITE_MB = 2;
    const LIMITE_BYTES = LIMITE_MB * 1024 * 1024;

    // Validación: tamaño máximo 2 MB
    if (archivo.size > LIMITE_BYTES) {
      setErrores(prev => ({
        ...prev,
        imagen: `La imagen supera el tamaño permitido de ${LIMITE_MB}MB.`,
      }));
      // Resetear el input
      e.target.value = null;
      setImagenPreview(null);
      setImagenArchivo(null);
      return;
    }

    // Limpiar error de imagen si existía
    setErrores(prev => {
      const copia = { ...prev };
      delete copia.imagen;
      return copia;
    });

    // Generar vista previa usando FileReader
    const lector = new FileReader();
    lector.onload = (evento) => {
      setImagenPreview(evento.target.result);
    };
    lector.readAsDataURL(archivo);
    setImagenArchivo(archivo);
  };

  // ============================================================
  // CRUD: AGREGAR PRODUCTO
  // ============================================================

  const agregarProducto = () => {
    if (!validarFormulario()) return;

    const nuevoProducto = {
      id: Date.now(),
      nombre:      nombre.trim(),
      descripcion: descripcion.trim(),
      precio:      parseFloat(precio),
      categoria:   categoria,
      stock:       parseInt(stock, 10),
      imagen:      imagenPreview,   // Base64 o null
    };

    setProductos(prev => [...prev, nuevoProducto]);
    limpiarFormulario();
  };

  // ============================================================
  // CRUD: SELECCIONAR PRODUCTO PARA EDITAR
  // ============================================================

  const seleccionarEditar = (producto) => {
    setEditarId(producto.id);
    setNombre(producto.nombre);
    setDescripcion(producto.descripcion);
    setPrecio(String(producto.precio));
    setCategoria(producto.categoria);
    setStock(String(producto.stock));
    setImagenPreview(producto.imagen);
    setImagenArchivo(null);
    setErrores({});
    // Scroll suave hacia el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ============================================================
  // CRUD: ACTUALIZAR PRODUCTO
  // ============================================================

  const actualizarProducto = () => {
    if (!validarFormulario()) return;

    setProductos(prev =>
      prev.map(p =>
        p.id === editarId
          ? {
              ...p,
              nombre:      nombre.trim(),
              descripcion: descripcion.trim(),
              precio:      parseFloat(precio),
              categoria:   categoria,
              stock:       parseInt(stock, 10),
              imagen:      imagenPreview,
            }
          : p
      )
    );
    limpiarFormulario();
  };

  // ============================================================
  // CRUD: ELIMINAR PRODUCTO
  // ============================================================

  const eliminarProducto = (id, nombreProducto) => {
    // Confirmación antes de eliminar
    const confirmar = window.confirm(
      `¿Deseas eliminar "${nombreProducto}"?\n\nEsta acción no se puede deshacer.`
    );
    if (!confirmar) return;

    setProductos(prev => prev.filter(p => p.id !== id));
  };

  // ============================================================
  // UTILIDADES
  // ============================================================

  /** Limpia todos los campos del formulario y sale del modo edición. */
  const limpiarFormulario = () => {
    setNombre('');
    setDescripcion('');
    setPrecio('');
    setCategoria('');
    setStock('');
    setImagenPreview(null);
    setImagenArchivo(null);
    setEditarId(null);
    setErrores({});
  };

  /** Formatea un número como precio en pesos chilenos. */
  const formatearPrecio = (valor) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0,
    }).format(valor);

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="app">

      {/* ── ENCABEZADO ── */}
      <header className="encabezado">
        <div className="encabezado__contenido">
          <div className="encabezado__logo">
            <span className="logo-icono">⚡</span>
            <span className="logo-texto">TechStore</span>
          </div>
          {/* CONTADOR DINÁMICO DE PRODUCTOS */}
          <div className="encabezado__contador">
            <span className="contador-numero">{productos.length}</span>
            <span className="contador-etiqueta">
              {productos.length === 1 ? 'Producto Registrado' : 'Productos Registrados'}
            </span>
          </div>
        </div>
      </header>

      <main className="contenido-principal">

        {/* ══════════════════════════════════════════
            SECCIÓN: FORMULARIO
        ══════════════════════════════════════════ */}
        <section className="seccion-formulario">
          <div className="tarjeta-formulario">
            <h2 className="formulario__titulo">
              {editarId ? '✏️ Editar Producto' : '➕ Nuevo Producto'}
            </h2>

            {/* ── Nombre ── */}
            <div className="campo">
              <label className="campo__etiqueta" htmlFor="nombre">
                Nombre del Producto
              </label>
              <input
                id="nombre"
                className={`campo__input ${errores.nombre ? 'campo__input--error' : ''}`}
                type="text"
                placeholder="Ej: MacBook Pro 14&quot;"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              {errores.nombre && (
                <span className="campo__error">{errores.nombre}</span>
              )}
            </div>

            {/* ── Descripción ── */}
            <div className="campo">
              <label className="campo__etiqueta" htmlFor="descripcion">
                Descripción
              </label>
              <textarea
                id="descripcion"
                className={`campo__textarea ${errores.descripcion ? 'campo__input--error' : ''}`}
                placeholder="Describe las características del producto..."
                rows={3}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
              />
              {errores.descripcion && (
                <span className="campo__error">{errores.descripcion}</span>
              )}
            </div>

            {/* ── Precio y Categoría (fila doble) ── */}
            <div className="campo-fila">
              <div className="campo">
                <label className="campo__etiqueta" htmlFor="precio">
                  Precio (CLP)
                </label>
                <input
                  id="precio"
                  className={`campo__input ${errores.precio ? 'campo__input--error' : ''}`}
                  type="number"
                  placeholder="0"
                  min="0"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                />
                {errores.precio && (
                  <span className="campo__error">{errores.precio}</span>
                )}
              </div>

              <div className="campo">
                <label className="campo__etiqueta" htmlFor="categoria">
                  Categoría
                </label>
                <select
                  id="categoria"
                  className={`campo__select ${errores.categoria ? 'campo__input--error' : ''}`}
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                >
                  <option value="">— Seleccionar —</option>
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errores.categoria && (
                  <span className="campo__error">{errores.categoria}</span>
                )}
              </div>
            </div>

            {/* ── Stock ── */}
            <div className="campo">
              <label className="campo__etiqueta" htmlFor="stock">
                Stock disponible
              </label>
              <input
                id="stock"
                className={`campo__input ${errores.stock ? 'campo__input--error' : ''}`}
                type="number"
                placeholder="0"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
              {errores.stock && (
                <span className="campo__error">{errores.stock}</span>
              )}
            </div>

            {/* ── Imagen ── */}
            <div className="campo">
              <label className="campo__etiqueta" htmlFor="imagen">
                Imagen del Producto
                <span className="campo__sugerencia"> (máx. 2 MB)</span>
              </label>
              <input
                id="imagen"
                className="campo__file"
                type="file"
                accept="image/*"
                onChange={manejarImagen}
              />
              {errores.imagen && (
                <span className="campo__error">{errores.imagen}</span>
              )}
              {/* Vista previa de imagen */}
              {imagenPreview && (
                <div className="imagen-preview">
                  <img
                    src={imagenPreview}
                    alt="Vista previa"
                    className="imagen-preview__img"
                  />
                </div>
              )}
            </div>

            {/* ── Botones de acción ── */}
            <div className="formulario__botones">
              {editarId ? (
                <>
                  <button
                    className="btn btn--actualizar"
                    onClick={actualizarProducto}
                  >
                    💾 Guardar Cambios
                  </button>
                  <button
                    className="btn btn--cancelar"
                    onClick={limpiarFormulario}
                  >
                    ✕ Cancelar
                  </button>
                </>
              ) : (
                <button
                  className="btn btn--agregar"
                  onClick={agregarProducto}
                >
                  ➕ Agregar Producto
                </button>
              )}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════
            SECCIÓN: LISTADO DE PRODUCTOS
        ══════════════════════════════════════════ */}
        <section className="seccion-listado">

          {/* Sin productos: mensaje de bienvenida */}
          {productos.length === 0 ? (
            <div className="estado-vacio">
              <div className="estado-vacio__icono">📦</div>
              <h3 className="estado-vacio__titulo">Sin productos aún</h3>
              <p className="estado-vacio__texto">
                Agrega tu primer producto usando el formulario.
              </p>
            </div>
          ) : (
            <>
              <h2 className="listado__titulo">
                Catálogo de Productos
              </h2>
              <div className="grilla-productos">
                {productos.map((producto) => (
                  <TarjetaProducto
                    key={producto.id}
                    producto={producto}
                    onEditar={seleccionarEditar}
                    onEliminar={eliminarProducto}
                    formatearPrecio={formatearPrecio}
                    enEdicion={editarId === producto.id}
                  />
                ))}
              </div>
            </>
          )}
        </section>

      </main>

      {/* ── PIE DE PÁGINA ── */}
      <footer className="pie">
        <p>© 2025 TechStore — Gestión de Productos</p>
      </footer>
    </div>
  );
}


// ============================================================
// COMPONENTE: TARJETA DE PRODUCTO
// ============================================================

/**
 * Muestra la información de un producto en una tarjeta estilizada.
 * Incluye botones para editar y eliminar.
 */
function TarjetaProducto({ producto, onEditar, onEliminar, formatearPrecio, enEdicion }) {
  return (
    <article className={`tarjeta-producto ${enEdicion ? 'tarjeta-producto--activa' : ''}`}>

      {/* Imagen del producto */}
      <div className="tarjeta-producto__imagen-contenedor">
        {producto.imagen ? (
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="tarjeta-producto__imagen"
          />
        ) : (
          <div className="tarjeta-producto__sin-imagen">
            <span>📷</span>
          </div>
        )}
        {/* Badge de categoría */}
        <span className="tarjeta-producto__badge">{producto.categoria}</span>
      </div>

      {/* Información del producto */}
      <div className="tarjeta-producto__info">
        <h3 className="tarjeta-producto__nombre">{producto.nombre}</h3>
        <p className="tarjeta-producto__descripcion">{producto.descripcion}</p>

        <div className="tarjeta-producto__detalles">
          <div className="detalle">
            <span className="detalle__etiqueta">Precio</span>
            <span className="detalle__valor detalle__valor--precio">
              {formatearPrecio(producto.precio)}
            </span>
          </div>
          <div className="detalle">
            <span className="detalle__etiqueta">Stock</span>
            <span
              className={`detalle__valor ${
                producto.stock === 0
                  ? 'detalle__valor--agotado'
                  : producto.stock < 5
                  ? 'detalle__valor--bajo'
                  : 'detalle__valor--ok'
              }`}
            >
              {producto.stock === 0
                ? 'Agotado'
                : `${producto.stock} unidades`}
            </span>
          </div>
        </div>
      </div>

      {/* Botones de acción */}
      <div className="tarjeta-producto__acciones">
        <button
          className="btn btn--editar"
          onClick={() => onEditar(producto)}
          title="Editar producto"
        >
          ✏️ Editar
        </button>
        <button
          className="btn btn--eliminar"
          onClick={() => onEliminar(producto.id, producto.nombre)}
          title="Eliminar producto"
        >
          🗑 Eliminar
        </button>
      </div>
    </article>
  );
}

export default App;
