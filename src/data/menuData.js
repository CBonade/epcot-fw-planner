// 2026 Epcot International Food & Wine Festival — marketplace + menu data.
//
// Marketplace list, official numbering, and walking order below are taken directly
// from Disney's own 2026 festival map/legend (33 numbered "Global Marketplaces"),
// with Norway and United Kingdom inserted in their real physical position even
// though they aren't numbered marketplaces this year (their festival items are
// served from the permanent pavilion instead of a dedicated marketplace booth).
//
// IMPORTANT: this array's order IS the real walking order around the World
// Showcase promenade loop (matching the festival map's numbering), starting and
// ending at the World Celebration/entrance side. MapView relies on this order —
// don't reorder this list without updating the map's layout accordingly.
//
// Dish-level menu data (items, prices, descriptions, tags) was compiled from public
// festival-menu roundups (Disney Food Blog, BlogMickey, AllEars, WDW Prep School,
// DVC Shop, WDWNT, Resortsgal) published Aug 2026. Several newer booths hadn't
// published itemized menus at compile time — included with an empty `items` array
// so they still show up for reference and can be filled in once known.

function slug(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Order matches the festival map's numbered walking order (see file header).
const rawMarketplaces = [
  {
    name: 'Gyozas of the Galaxy',
    type: 'kiosk',
    area: 'World Discovery, near Guardians of the Galaxy: Cosmic Rewind (Marketplace #1)',
    items: [
      { name: 'Basil Pesto Chicken Dumplings', price: '$5.99', description: 'Chicken dumplings, basil pesto, fonduta, tomato confit, balsamic', tags: ['new for 2026'] },
      { name: 'Edamame Dumplings', price: '$5.29', description: 'Butternut squash purée, caramelized onions, sage, walnut-toasted garlic aillade', tags: ['plant-based', 'new for 2026'] },
      { name: 'Street Corn-style Dumplings', price: '$5.99', description: 'Chicken dumplings, tomatillo salsa verde, street corn salad, cotija cheese, lime crema, cilantro', tags: ['returning item'] },
      { name: 'Willamette Valley Vineyards Pinot Gris', price: '$7.50', description: null, tags: [] },
    ],
  },
  {
    name: 'Coastal Eats',
    type: 'kiosk',
    area: 'World Discovery (Marketplace #2, opens October 2, 2026)',
    items: [],
  },
  {
    name: 'The Fry Basket',
    type: 'kiosk',
    area: 'World Discovery (Marketplace #3)',
    items: [],
  },
  {
    name: 'Flavors from Fire',
    type: 'kiosk',
    area: 'World Nature, campfire-themed booth (Marketplace #4)',
    items: [
      { name: 'Swine Brine', price: null, description: 'Mustard-and-bourbon novelty cocktail; signature drink since 2017', tags: [] },
      { name: 'Smoked Chocolate Bread Pudding', price: null, description: null, tags: ['new for 2026', 'vegetarian'] },
      { name: '1000 Stories Bourbon Barrel-Aged Zinfandel', price: null, description: null, tags: ['new for 2026'] },
    ],
  },
  {
    name: 'Refreshment Station',
    type: 'kiosk',
    area: 'World Discovery, hosted by Coca-Cola (Marketplace #5)',
    items: [],
  },
  {
    name: 'Brew-Wing Lab',
    type: 'kiosk',
    area: 'Near the Odyssey building (Marketplace #6)',
    items: [],
  },
  {
    name: 'Australia',
    type: 'kiosk',
    area: 'Near Disney Traders, World Discovery side of the promenade (Marketplace #7)',
    items: [
      { name: 'Grilled Bushberry-spiced Shrimp Skewer', price: '$6.99', description: 'Sweet-and-sour vegetables and coconut-chili sauce', tags: ['30th Anniversary Legacy Item'] },
      { name: 'Mixed Berry Pavlova', price: '$4.79', description: 'Crunchy meringue shell with macerated berries and whipped cream', tags: ['vegetarian'] },
    ],
  },
  {
    name: 'Mexico',
    type: 'pavilion',
    flag: '🇲🇽',
    area: 'World Showcase, Mexico pavilion (Marketplace #8)',
    items: [
      { name: 'Taco de Camarón', price: '$8.50', description: 'Flour tortilla with crispy tempura shrimp, shredded cabbage, and chipotle aïoli', tags: ['30th Anniversary Legacy Item'] },
      { name: 'Paleta de Moras (Berry Popsicle)', price: null, description: 'Mixed berry popsicle', tags: [] },
    ],
  },
  {
    name: 'Norway',
    type: 'pavilion',
    flag: '🇳🇴',
    area: 'Norway pavilion, World Showcase (snack cart — not a numbered Global Marketplace)',
    items: [
      { name: 'School Bread', price: '$5.49', description: 'Sweet roll filled with custard and dipped in coconut', tags: [] },
      { name: 'Caramel Cream & Gjetost Bolle', price: null, description: 'Sweet bread roll filled with caramel cream and Gjetost (Norwegian brown) cheese', tags: ['new for 2026'] },
    ],
  },
  {
    name: 'China',
    type: 'pavilion',
    flag: '🇨🇳',
    area: 'China pavilion, World Showcase (Marketplace #9)',
    items: [
      { name: 'Beijing Zhajiang Noodles', price: '$8.50', description: null, tags: ['new for 2026'] },
      { name: 'Chicken Dumplings', price: '$5.75', description: 'House-made sweet-and-spicy sauce', tags: [] },
      { name: 'Smoked Duck Bao Bun', price: '$8.25', description: 'Pickled cucumber, scallion, hoisin sauce', tags: [] },
      { name: 'Mango-Peach Bubble Tea', price: '$8.25', description: null, tags: ['non-alcoholic'] },
      { name: 'Brew Hub Lychee Foo Draft Beer', price: '$6.00 / $10.75', description: null, tags: [] },
      { name: 'Baijiu Punch', price: '$14.50', description: null, tags: [] },
      { name: 'Hainan Prosperity', price: '$14.50', description: null, tags: ['new for 2026'] },
      { name: 'Frozen Strawberry-Jasmine Cocktail', price: '$14.25', description: null, tags: ['new for 2026'] },
    ],
  },
  {
    name: 'India',
    type: 'kiosk',
    area: 'Near China, World Showcase (Marketplace #10, opens October 2, 2026)',
    items: [],
  },
  {
    name: 'Refreshment Outpost',
    type: 'kiosk',
    area: 'World Showcase, hosted by Coca-Cola (Marketplace #11)',
    items: [],
  },
  {
    name: 'The Alps',
    type: 'kiosk',
    area: 'Near Germany, World Showcase (Marketplace #12, opens October 2, 2026)',
    items: [],
  },
  {
    name: 'Germany',
    type: 'pavilion',
    flag: '🇩🇪',
    area: 'Germany pavilion, World Showcase (Marketplace #13, opens Oct 2, 2026)',
    items: [
      { name: 'Zwiebelkuchen (German Onion Cake)', price: '$9.79', description: 'Caramelized onions, bacon, herbs, savory custard', tags: [] },
      { name: 'Caramel-Apple Cheesecake Baumkuchen', price: null, description: null, tags: [] },
    ],
  },
  {
    name: 'Spain',
    type: 'kiosk',
    area: 'Near Germany and Italy, World Showcase (Marketplace #14)',
    items: [
      { name: 'Trio de Pintxos', price: '$7.25', description: 'Jamón croqueta, pan con tomate, tortilla Española', tags: ['new for 2026'] },
      { name: 'Paella Caldoso', price: '$8.00', description: 'Rock shrimp, bay scallops, smoked mussels', tags: ['gluten/wheat-friendly'] },
      { name: 'Basque Cheesecake', price: '$5.25', description: 'With orange sauce', tags: ['gluten/wheat-friendly', 'vegetarian'] },
      { name: 'Summer in Spain', price: '$12.50', description: 'Frozen Simply Lemonade with Yellow and Green Chartreuse liqueurs', tags: [] },
    ],
  },
  {
    name: 'Italy',
    type: 'pavilion',
    flag: '🇮🇹',
    area: 'Italy pavilion, World Showcase — walk-up window, no reservation (Marketplace #15)',
    items: [
      { name: 'Stromboli', price: '$8.00', description: 'Baked ham and provolone roll with Parmesan and tomato sauce', tags: [] },
      { name: 'Pollo al Marsala', price: '$9.00', description: 'Roasted chicken drumstick, creamy potato gnocchi, mushrooms, Marsala sauce', tags: ['30th Anniversary Legacy Item'] },
      { name: 'Almond Panna Cotta', price: '$6.00', description: null, tags: [] },
    ],
  },
  {
    name: 'American Adventure (Hops & Barley)',
    type: 'pavilion',
    flag: '🇺🇸',
    area: 'The American Adventure pavilion, World Showcase (Marketplace #16)',
    items: [
      { name: 'Gulf Coast-style Seafood Roll', price: '$8.99', description: 'Warm-water lobster, rock shrimp, lobster bisque, sherry-crème fraîche on toasted brioche', tags: ['DDP snack eligible', '30th Anniversary Legacy Item'] },
      { name: 'Smoked Brisket and Cheddar Melt', price: '$6.49', description: 'Chopped smoked brisket, caramelized onions, tangy barbecue, cheddar sauce on potato roll', tags: ['DDP snack eligible', 'new for 2026'] },
      { name: 'Chocolate Pudding Cake', price: '$4.99', description: 'Freshly baked, with Kentucky bourbon caramel', tags: ['DDP snack eligible'] },
    ],
  },
  {
    name: 'Funnel Cake',
    type: 'kiosk',
    area: 'Near American Adventure, World Showcase (Marketplace #17)',
    items: [],
  },
  {
    name: 'Japan',
    type: 'pavilion',
    flag: '🇯🇵',
    area: 'Japan pavilion, World Showcase (Marketplace #18)',
    items: [
      { name: 'Spicy Temaki Hand Roll', price: null, description: null, tags: ['new for 2026', 'spicy'] },
      { name: 'Beef Wagyu Temaki Hand Roll', price: null, description: null, tags: ['new for 2026'] },
      { name: 'Teriyaki Chicken Bun', price: null, description: null, tags: ['returning favorite'] },
      { name: 'Beef Wagyu Don', price: null, description: 'Rice bowl with American wagyu beef blend, steamed rice, pickles, tōgarashi, pickled ginger', tags: [] },
      { name: 'Osakana Karaage', price: null, description: 'Crispy-fried pollock with spicy mayonnaise and sweet-creamy yuzu sauce', tags: ['spicy'] },
    ],
  },
  {
    name: 'Greece',
    type: 'kiosk',
    area: 'Near Japan and Morocco, World Showcase (Marketplace #19, open Sept 18 – Nov 8)',
    items: [
      { name: 'Griddled Cheese with Pistachios and Honey', price: '$5.25', description: "Emile's Fromage Montage cheese-stroll item", tags: ['vegetarian'] },
      { name: 'Lamb Gyro', price: '$7.00', description: 'Shaved lettuce, tomato-cucumber relish, tzatziki on warm flatbread', tags: [] },
      { name: 'Spanakopita', price: '$5.19', description: null, tags: ['vegetarian'] },
      { name: 'Chicken Souvlaki Gyro', price: null, description: null, tags: ['30th Anniversary Legacy Item'] },
      { name: 'Greek Melon Limeade', price: '$12.00', description: 'Kleos Mastiha spirit, Artonic Melon apéritif, Pearl vodka, lime sour mix', tags: [] },
    ],
  },
  {
    name: 'Morocco (Tangierine Café)',
    type: 'pavilion',
    flag: '🇲🇦',
    area: 'Morocco pavilion, World Showcase — "Tangierine Café: Flavors of the Medina" (Marketplace #20)',
    items: [
      { name: 'Ras el Hanout Cauliflower Bowl', price: '$6.49', description: 'Chickpea salad, golden raisin relish, parsley, served with pita', tags: ['plant-based'] },
      { name: 'Moroccan Wrap with Plant-based Falafel', price: '$6.29', description: 'Tomato-cucumber relish and garlic sauce on warm Moroccan flatbread', tags: ['plant-based', 'vegan'] },
      { name: 'Chocolate-Pistachio Cookie', price: '$4.29', description: null, tags: [] },
    ],
  },
  {
    name: 'Belgium',
    type: 'kiosk',
    area: 'Between Morocco and France, World Showcase (Marketplace #21)',
    items: [
      { name: 'Belgian Beer Flight', price: '$12.75', description: 'Van Steenberge Piraat 7 Strong Ale, St. Bernardus Watou Blond Ale, Verhaeghe Duchesse Red Sweet & Tart Cherry Ale', tags: [] },
      { name: 'Individual Belgian Beer Pour', price: '$6.00 / $9.75', description: null, tags: [] },
      { name: 'Chilled Belgian Coffee', price: null, description: null, tags: [] },
    ],
  },
  {
    name: 'Brazil',
    type: 'kiosk',
    area: 'Between Morocco and France, World Showcase (Marketplace #22)',
    items: [
      { name: 'Feijoada', price: '$6.50', description: 'Black beans with pork belly and Brazil nut pesto', tags: [] },
      { name: 'Pão de Queijo', price: '$5.00', description: 'Brazilian cheese bread', tags: ['vegetarian'] },
      { name: 'Moqueca de Camarão', price: '$6.99', description: 'Plancha-seared shrimp, bell peppers, cilantro, tomatoes in coconut milk broth', tags: [] },
    ],
  },
  {
    name: 'France',
    type: 'pavilion',
    flag: '🇫🇷',
    area: 'France pavilion, World Showcase (Marketplace #23)',
    items: [
      { name: 'Boeuf Braisé au Vin Rouge et Échalotes', price: '$9.50', description: 'Red wine-braised short ribs with shallot confit and potato gâteau', tags: [] },
      { name: 'Brioche aux Épices avec Garniture Mornay de Trois Fromages', price: '$8.95', description: 'Spiced brioche with three-cheese mornay filling', tags: ['vegetarian'] },
      { name: "Trio d'Escargots", price: '$9.25', description: 'Trio of escargot bites in croissant dough with garlic-parsley dip', tags: ['30th Anniversary Legacy Item'] },
      { name: 'Crème Brûlée Pistache', price: '$7.95', description: 'Pistachio crème brûlée with berry compote', tags: ['vegetarian'] },
      { name: 'Chilled French Cosmo', price: '$15.50', description: 'Grey Goose Le Citron vodka, Grand Marnier liqueur, cranberry juice', tags: [] },
    ],
  },
  {
    name: 'United Kingdom',
    type: 'pavilion',
    flag: '🇬🇧',
    area: 'United Kingdom pavilion, World Showcase (snack cart — not a numbered Global Marketplace)',
    items: [
      { name: 'Scotch Egg', price: '$15.00', description: 'Golden-fried hard-boiled cage-free egg wrapped in sausage with mustard sauce', tags: [] },
      { name: 'Fish and Chips', price: null, description: 'Served at Yorkshire County Fish Shop in the UK pavilion', tags: [] },
    ],
  },
  {
    name: 'Canada',
    type: 'pavilion',
    flag: '🇨🇦',
    area: 'Canada pavilion, World Showcase (Marketplace #24)',
    items: [
      { name: 'Cheddar and Bacon Soup with Pretzel Roll', price: '$6.29', description: null, tags: ['DDP snack eligible', '30th Anniversary Legacy Item'] },
      { name: 'Filet Mignon with Mushrooms and Mashed Potatoes', price: '$10.49', description: null, tags: ['DDP snack eligible'] },
      { name: 'Collective Arts Brewing Festbier', price: '$6.00 / $9.75', description: 'From Hamilton, ON', tags: [] },
      { name: 'Chateau des Charmes Pétales Rouge', price: '$9.50', description: 'From Niagara-on-the-Lake, ON', tags: [] },
    ],
  },
  {
    name: 'Swirled Showcase',
    type: 'kiosk',
    area: 'Near the walkway to World Celebration (Marketplace #25)',
    items: [],
  },
  {
    name: 'Shimmering Sips',
    type: 'kiosk',
    area: 'Near the walkway to World Celebration (Marketplace #26)',
    items: [],
  },
  {
    name: "Hawai'i",
    type: 'kiosk',
    area: 'Near the front of World Showcase, near the walkway to World Celebration (Marketplace #27)',
    items: [
      { name: 'Slow-roasted Pork Slider', price: '$5.99', description: 'Sweet-and-sour chutney with DOLE pineapple, spicy mayonnaise', tags: ['30th Anniversary Legacy Item'] },
      { name: 'Hawaiian Rice Bowl', price: '$6.29', description: 'Spam, eggs, eel sauce, spicy mayonnaise, furikake', tags: [] },
      { name: 'Pineapple Cheesecake', price: '$5.25', description: 'Passion fruit curd and macadamia nuts', tags: ['DDP snack eligible', 'vegetarian'] },
      { name: 'Maui Brewing Co. Orange Mango Guava Hazy IPA', price: '$5.75 / $9.75', description: null, tags: [] },
      { name: "O'ahu Sunrise", price: '$14.50', description: 'Vodka, DOLE pineapple juice, grenadine', tags: [] },
      { name: "Florida Avenue Brewing Co Lei'd Back Double IPA", price: null, description: null, tags: ['new for 2026'] },
    ],
  },
  {
    name: 'Forest & Field',
    type: 'kiosk',
    area: 'Near the walkway to World Celebration, World Showcase (Marketplace #28)',
    items: [
      { name: 'Pumpkin-Mascarpone Ravioli', price: null, description: 'Returning favorite', tags: ['vegetarian', '30th Anniversary Legacy Item'] },
    ],
  },
  {
    name: 'Milled & Mulled',
    type: 'kiosk',
    area: 'Near Forest & Field, World Showcase (Marketplace #29)',
    items: [],
  },
  {
    name: 'Bramblewood Bites',
    type: 'kiosk',
    area: 'Near Forest & Field, World Showcase (Marketplace #30)',
    items: [],
  },
  {
    name: 'Earth Eats',
    type: 'kiosk',
    area: 'World Nature (Marketplace #31, opens October 2, 2026)',
    items: [
      { name: 'Lemon-Almond-Olive Oil Cake', price: null, description: 'New for 2026', tags: ['new for 2026', 'vegetarian'] },
    ],
  },
  {
    name: 'Festival Favorites',
    type: 'kiosk',
    area: 'World Celebration (Marketplace #32, opens September 9, 2026)',
    items: [],
  },
  {
    name: 'The Wedge (Dairy Does More)',
    type: 'kiosk',
    area: 'Inside CommuniCore Hall, World Celebration (Marketplace #33, open Sept 18 – Nov 8)',
    items: [
      { name: 'Selection of Cheeses with accompaniments', price: null, description: null, tags: ['vegetarian'] },
      { name: 'Cannoli Milkshake', price: null, description: null, tags: ['vegetarian'] },
      { name: 'Cheesesteak Macaroni and Cheese', price: null, description: null, tags: [] },
      { name: 'Crab and Corn Macaroni and Cheese', price: null, description: null, tags: [] },
      { name: 'Three-Cheese Macaroni and Cheese', price: null, description: null, tags: ['vegetarian'] },
      { name: 'Wine and Cheese Pairing', price: null, description: null, tags: [] },
      { name: 'Wine Flight', price: null, description: null, tags: [] },
    ],
  },
]

export const marketplaces = rawMarketplaces.map((m) => ({
  ...m,
  id: slug(m.name),
  items: m.items.map((it) => ({
    ...it,
    id: `${slug(m.name)}--${slug(it.name)}`,
  })),
}))

export const marketplaceById = Object.fromEntries(marketplaces.map((m) => [m.id, m]))

export function findItem(itemId) {
  const [marketplaceId] = itemId.split('--')
  const mp = marketplaceById[marketplaceId]
  if (!mp) return null
  const item = mp.items.find((it) => it.id === itemId)
  if (!item) return null
  return { item, marketplace: mp }
}

export const allItemsFlat = marketplaces.flatMap((m) =>
  m.items.map((it) => ({ ...it, marketplaceId: m.id, marketplaceName: m.name }))
)
