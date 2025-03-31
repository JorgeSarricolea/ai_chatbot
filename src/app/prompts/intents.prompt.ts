export const INTENTS = {
  products_info: {
    description:
      "Proporciona información detallada sobre los videojuegos disponibles en la tienda, incluyendo el título del juego, la plataforma en la que está disponible, la edición del juego y la categoría de venta (nuevos lanzamientos, más vendidos o en oferta).",
    entities: {
      game_title: [
        "Final Fantasy XVI",
        "Call of Duty: Modern Warfare II",
        "The Legend of Zelda: Tears of the Kingdom",
        "Resident Evil 4",
      ],
      platform: ["PS5", "Xbox Series X", "Nintendo Switch", "PC"],
      edition: ["Standard", "Deluxe", "Collector’s"],
      category: ["Nuevos lanzamientos", "Más vendidos", "En oferta"],
    },
  },
  price_inquiry: {
    description:
      "Ofrece información específica sobre el precio de un videojuego seleccionado, incluyendo si el precio es el normal, está en oferta o disponible para compra a meses sin intereses (MSI). También informa sobre los métodos de pago aceptados.",
    entities: {
      game_title: [
        "Final Fantasy XVI",
        "Call of Duty: Modern Warfare II",
        "The Legend of Zelda: Tears of the Kingdom",
      ],
      price_type: ["Precio normal", "Precio de oferta", "MSI"],
      payment_method: [
        "Tarjeta de crédito",
        "PayPal",
        "Transferencia bancaria",
      ],
    },
  },
  customer_service: {
    description:
      "Brinda información sobre cómo contactar al servicio de atención al cliente, especificando los tipos de contacto disponibles, ubicaciones de atención y los horarios en los que se puede contactar.",
    entities: {
      contact_type: ["WhatsApp", "Email", "Teléfono"],
      location: ["Centro comercial Galerías", "Plaza Satélite"],
      schedule: [
        "Lunes a Viernes de 9:00 a 21:00",
        "Sábados y Domingos de 11:00 a 18:00",
      ],
    },
  },
  technical_support: {
    description:
      "Asiste en la resolución de problemas técnicos relacionados con los productos vendidos, como problemas con códigos de juegos, acceso a cuentas de usuario o errores durante la instalación de un juego en diferentes plataformas.",
    entities: {
      issue_type: [
        "Problema con código de juego",
        "Problema de acceso a cuenta",
        "Fallas durante la instalación",
      ],
      game_title: [
        "Final Fantasy XVI",
        "Call of Duty: Modern Warfare II",
        "Minecraft",
      ],
      platform: ["PS5", "PC", "Xbox Series X"],
    },
  },
  stock_info: {
    description:
      "Informa sobre la disponibilidad actual de un juego específico en la tienda, indicando si el juego está en stock, agotado o cuándo estará disponible nuevamente.",
    entities: {
      game_title: [
        "Final Fantasy XVI",
        "Call of Duty: Modern Warfare II",
        "The Legend of Zelda: Tears of the Kingdom",
      ],
      availability: ["En stock", "Agotado", "Próximamente disponible"],
      restock_date: ["15 de abril de 2025", "1 de mayo de 2025"],
    },
  },
  shipping_info: {
    description:
      "Proporciona detalles sobre el proceso de envío para los pedidos, incluyendo el tiempo estimado de entrega, el costo de envío y el estado actual del pedido.",
    entities: {
      delivery_time: ["2-5 días hábiles", "Entrega inmediata en 24 horas"],
      shipping_cost: [
        "Gratis en compras mayores a $999",
        "$50 en compras menores a $999",
      ],
      order_status: ["Pedido pendiente", "Pedido enviado", "Pedido entregado"],
    },
  },
};
