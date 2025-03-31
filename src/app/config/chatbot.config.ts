// Definir todas las interfaces necesarias
interface Entity {
  name: string;
  values: string[];
}

interface ResponseData {
  latest_releases?: Array<{
    game: string;
    platform: string;
    price: number;
  }>;
  msi_minimum?: number;
  msi_options?: number[];
  support_contact?: string;
  preorder_deposit?: string;
  delivery_time?: string;
  free_shipping_minimum?: number;
  tracking_available?: boolean;
  whatsapp?: string;
  email?: string;
  hours?: string;
  status?: string;
  quantity?: number;
  restock_date?: string;
  platforms?: string;
  price?: number;
  msi?: string;
  step1?: string;
  step2?: string;
}

interface Response {
  template: string;
  data?: ResponseData;
}

interface Intent {
  name: string;
  entities: Entity[];
  examples: string[];
  responses: Response[];
}

interface ChatbotConfig {
  intents: {
    product_inquiry: Intent;
    price_inquiry: Intent;
    customer_service: Intent;
    technical_support: Intent;
    stock_availability: Intent;
    order_shipping: Intent;
  };
  defaultResponse: {
    template: string;
    suggestion: string;
  };
}

export const CHATBOT_CONFIG: ChatbotConfig = {
  intents: {
    product_inquiry: {
      name: "Consulta de Productos",
      entities: [
        {
          name: "platform",
          values: [
            "PS5",
            "PS4",
            "Xbox Series X",
            "Xbox One",
            "Nintendo Switch",
            "PC",
          ],
        },
        {
          name: "game_title",
          values: [
            "Final Fantasy VII Rebirth",
            "Helldivers 2",
            "Tekken 8",
            "Marvel's Spider-Man 2",
            "Super Mario Bros. Wonder",
          ],
        },
        {
          name: "edition",
          values: ["standard", "deluxe", "collector", "ultimate"],
        },
        {
          name: "genre",
          values: [
            "acción",
            "aventura",
            "RPG",
            "deportes",
            "lucha",
            "estrategia",
          ],
        },
      ],
      examples: [
        "¿Qué juegos tienen disponibles?",
        "¿Tienen juegos para {platform}?",
        "¿Cuáles son los juegos más vendidos?",
        "¿Tienen juegos en oferta?",
        "¿Qué ediciones especiales tienen?",
        "¿Tienen juegos de {genre}?",
      ],
      responses: [
        {
          template:
            "Últimos lanzamientos:\n• {game1} ({platform1}) - ${price1}\n• {game2} ({platform2}) - ${price2}",
          data: {
            latest_releases: [
              { game: "FF7 Rebirth", platform: "PS5", price: 1299 },
              { game: "Helldivers 2", platform: "PS5/PC", price: 1199 },
            ],
          },
        },
      ],
    },

    price_inquiry: {
      name: "Consulta de Precios",
      entities: [
        {
          name: "payment_method",
          values: ["tarjeta", "PayPal", "transferencia", "meses sin intereses"],
        },
      ],
      examples: [
        "¿Cuánto cuesta {game_title}?",
        "¿Tienen descuentos en {game_title}?",
        "¿Cuáles son los métodos de pago?",
        "¿Aceptan pagos a meses sin intereses?",
      ],
      responses: [
        {
          template:
            "• {game_title}: ${price}\n• Plataformas: {platforms}\n• MSI disponible: {msi}",
          data: {
            msi_minimum: 999,
            msi_options: [3, 6, 12],
          } as ResponseData,
        },
      ] as Response[],
    },

    customer_service: {
      name: "Atención al Cliente",
      entities: [
        {
          name: "contact_method",
          values: ["WhatsApp", "email", "teléfono", "tienda física"],
        },
        {
          name: "store_location",
          values: ["Centro", "Plaza Norte"],
        },
      ],
      examples: [
        "¿Cómo puedo contactar con un asesor?",
        "¿Tienen tienda física?",
        "¿Cuáles son sus horarios de atención?",
        "¿Dónde están ubicados?",
      ],
      responses: [
        {
          template:
            "• WhatsApp: {whatsapp}\n• Email: {email}\n• Horario: {hours}",
          data: {
            whatsapp: "55-1234-5678",
            email: "ayuda@tiendavideojuegos.com",
            hours: "L-D 9:00-21:00",
          },
        },
      ],
    },

    technical_support: {
      name: "Soporte Técnico",
      entities: [
        {
          name: "issue_type",
          values: ["activation_code", "account_security", "installation"],
        },
      ],
      examples: [
        "El código de {game_title} no funciona",
        "Mi cuenta fue hackeada",
        "{game_title} no se instala correctamente",
      ],
      responses: [
        {
          template:
            "Para {issue_type}:\n• {step1}\n• {step2}\n• Contacto: {support_contact}",
          data: {
            support_contact: "55-1234-5678",
          },
        },
      ],
    },

    stock_availability: {
      name: "Disponibilidad de Productos",
      entities: [
        {
          name: "preorder_status",
          values: ["disponible", "agotado", "próximamente"],
        },
      ],
      examples: [
        "¿Tienen {game_title} en stock?",
        "¿Cuándo volverán a tener {game_title}?",
        "¿Puedo apartar {game_title} antes de que salga?",
      ],
      responses: [
        {
          template:
            "• Estado: {status}\n• Stock: {quantity}\n• Próxima entrega: {restock_date}",
          data: {
            preorder_deposit: "10%",
          },
        },
      ],
    },

    order_shipping: {
      name: "Pedidos y Envíos",
      entities: [
        {
          name: "order_status",
          values: ["pendiente", "enviado", "entregado", "cancelado"],
        },
        {
          name: "shipping_time",
          values: ["2-5 días hábiles"],
        },
      ],
      examples: [
        "¿Cómo hago un pedido?",
        "¿Cuánto tarda en llegar mi compra?",
        "¿Cómo puedo rastrear mi pedido?",
        "¿Puedo cancelar o cambiar mi compra?",
      ],
      responses: [
        {
          template:
            "• Tiempo de entrega: {delivery_time}\n• Envío gratis: +${free_shipping}\n• Seguimiento: {tracking}",
          data: {
            delivery_time: "2-5 días hábiles",
            free_shipping_minimum: 999,
            tracking_available: true,
          },
        },
      ],
    },
  },

  defaultResponse: {
    template: "No he entendido tu pregunta. ¿Podrías reformularla?",
    suggestion:
      "Puedes preguntar sobre:\n• Juegos disponibles\n• Precios\n• Envíos",
  },
};
