export const INTENTS = {
  products_info: {
    description:
      "Provides detailed information about video games available in the store, including game title, platform availability, game edition, and sales category (new releases, best sellers, or on sale).",
    entities: {
      game_title: [
        "Final Fantasy XVI",
        "Call of Duty: Modern Warfare II",
        "The Legend of Zelda: Tears of the Kingdom",
        "Resident Evil 4",
      ],
      platform: ["PS5", "Xbox Series X", "Nintendo Switch", "PC"],
      edition: ["Standard", "Deluxe", "Collector's"],
      category: ["New Releases", "Best Sellers", "On Sale"],
    },
  },
  price_inquiry: {
    description:
      "Offers specific information about the price of a selected video game, including whether the price is regular, on sale, or available for installment payments (ISP). Also informs about accepted payment methods.",
    entities: {
      game_title: [
        "Final Fantasy XVI",
        "Call of Duty: Modern Warfare II",
        "The Legend of Zelda: Tears of the Kingdom",
      ],
      price_type: ["Regular Price", "Sale Price", "ISP"],
      payment_method: ["Credit Card", "PayPal", "Bank Transfer"],
    },
  },
  customer_service: {
    description:
      "Provides information about how to contact customer service, specifying available contact types, service locations, and hours of operation.",
    entities: {
      contact_type: ["WhatsApp", "Email", "Phone"],
      location: ["Galerias Mall", "Plaza Satelite"],
      schedule: [
        "Monday to Friday 9:00 AM to 9:00 PM",
        "Saturday and Sunday 11:00 AM to 6:00 PM",
      ],
    },
  },
  technical_support: {
    description:
      "Assists in resolving technical issues related to sold products, such as problems with game codes, user account access, or errors during game installation on different platforms.",
    entities: {
      issue_type: [
        "Game code issue",
        "Account access problem",
        "Installation failures",
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
      "Reports on the current availability of a specific game in the store, indicating whether the game is in stock, out of stock, or when it will be available again.",
    entities: {
      game_title: [
        "Final Fantasy XVI",
        "Call of Duty: Modern Warfare II",
        "The Legend of Zelda: Tears of the Kingdom",
      ],
      availability: ["In Stock", "Out of Stock", "Coming Soon"],
      restock_date: ["April 15, 2025", "May 1, 2025"],
    },
  },
  shipping_info: {
    description:
      "Provides details about the shipping process for orders, including estimated delivery time, shipping cost, and current order status.",
    entities: {
      delivery_time: ["2-5 business days", "24-hour immediate delivery"],
      shipping_cost: [
        "Free for purchases over $999",
        "$50 for purchases under $999",
      ],
      order_status: ["Order Pending", "Order Shipped", "Order Delivered"],
    },
  },
};
