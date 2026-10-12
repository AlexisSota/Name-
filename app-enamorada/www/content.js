// ============================================================
//  EDITA SOLO ESTE ARCHIVO para personalizar la app.
//  Cambia los textos, las fechas y las fotos por los tuyos.
// ============================================================
window.CONTENT = {
  // Nombre de ella (aparece en la portada y en el mensaje final)
  nombreElla: "Mi amor",

  // Tu nombre (firma del mensaje final)
  tuNombre: "Yo",

  // Fecha en que empezaron (año, mes, día). Alimenta el contador de tiempo juntos.
  fechaInicio: { year: 2024, month: 1, day: 1 },

  // Texto de la portada
  portada: {
    titulo: "Un viaje para ti",
    subtitulo: "Hay un lugar escondido bajo la tierra donde guardé todo lo que siento por ti. ¿Bajamos juntos?",
    boton: "Descender"
  },

  // Zonas del recorrido. Agrega, quita o reordena las que quieras.
  // "foto" es opcional: pon una imagen en la carpeta www/fotos y escribe su nombre, ej: "fotos/nosotros.jpg"
  zonas: [
    {
      zona: "Sendero Olvidado",
      titulo: "Donde empezó todo",
      texto: "Escribe aquí cómo se conocieron o el primer recuerdo que tienes de ella.",
      foto: ""
    },
    {
      zona: "Jardín de Niebla",
      titulo: "Lo que me enamoró",
      texto: "Escribe aquí lo que más te gusta de ella: su risa, su forma de mirar, algo que solo ella hace.",
      foto: ""
    },
    {
      zona: "Cavernas de Cristal",
      titulo: "Nuestro mejor momento",
      texto: "Escribe aquí un recuerdo especial de ustedes dos, un lugar, una canción, un chiste que solo ustedes entienden.",
      foto: ""
    }
  ],

  // Mensaje de la banca final
  final: {
    zona: "La Banca",
    titulo: "Descansemos aquí",
    texto: "Escribe aquí tu mensaje más sincero. Que sea corto y que sea tuyo.",
    firma: "Siempre tuyo"
  }
};
