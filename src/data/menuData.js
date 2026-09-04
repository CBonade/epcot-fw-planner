// 2026 Epcot International Food & Wine Festival — marketplace + menu data.
// Compiled from public festival-menu roundups (Disney Food Blog, BlogMickey, AllEars,
// WDW Prep School, DVC Shop, WDWNT, Resortsgal) published Aug 2026. Some booths had no
// itemized menu published yet at research time — those are included with an empty
// `items` array so they still show up for reference and can be filled in once known.
// Prices/positions are best-effort; `mapPos` is a schematic (not GPS-precise) position
// on the World Showcase promenade loop, used only for the in-app reference map.

function slug(s) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const rawMarketplaces = [
  {
    name: 'Mexico',
    type: 'pavilion',
    area: 'World Showcase, along the walkway leading to the Mexico pavilion',
    mapPos: { x: 72, y: 15 },
    items: [
      { name: 'Taco de Camarón', price: '$8.50', description: 'Flour tortilla with crispy tempura shrimp, shredded cabbage, and chipotle aïoli', tags: ['30th Anniversary Legacy Item'] },
      { name: 'Paleta de Moras (Berry Popsicle)', price: null, description: 'Mixed berry popsicle', tags: [] },
    ],
  },
  {
    name: 'Norway',
    type: 'pavilion',
    area: 'Norway pavilion, World Showcase (snack cart, not a Global Marketplace kiosk)',
    mapPos: { x: 85, y: 28 },
    items: [
      { name: 'School Bread', price: '$5.49', description: 'Sweet roll filled with custard and dipped in coconut', tags: [] },
      { name: 'Caramel Cream & Gjetost Bolle', price: null, description: 'Sweet bread roll filled with caramel cream and Gjetost (Norwegian brown) cheese', tags: ['new for 2026'] },
    ],
  },
  {
    name: 'China',
    type: 'pavilion',
    area: 'China pavilion, World Showcase',
    mapPos: { x: 93, y: 45 },
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
    name: 'Germany',
    type: 'pavilion',
    area: 'Germany pavilion, World Showcase (opens Oct 2, 2026)',
    mapPos: { x: 90, y: 60 },
    items: [
      { name: 'Zwiebelkuchen (German Onion Cake)', price: '$9.79', description: 'Caramelized onions, bacon, herbs, savory custard', tags: [] },
      { name: 'Caramel-Apple Cheesecake Baumkuchen', price: null, description: null, tags: [] },
    ],
  },
  {
    name: 'Italy',
    type: 'pavilion',
    area: 'Italy pavilion, World Showcase (walk-up window, no reservation)',
    mapPos: { x: 82, y: 72 },
    items: [
      { name: 'Stromboli', price: '$8.00', description: 'Baked ham and provolone roll with Parmesan and tomato sauce', tags: [] },
      { name: 'Pollo al Marsala', price: '$9.00', description: 'Roasted chicken drumstick, creamy potato gnocchi, mushrooms, Marsala sauce', tags: ['30th Anniversary Legacy Item'] },
      { name: 'Almond Panna Cotta', price: '$6.00', description: null, tags: [] },
    ],
  },
  {
    name: 'American Adventure (Hops & Barley)',
    type: 'pavilion',
    area: 'The American Adventure pavilion, World Showcase',
    mapPos: { x: 50, y: 82 },
    items: [
      { name: 'Gulf Coast-style Seafood Roll', price: '$8.99', description: 'Warm-water lobster, rock shrimp, lobster bisque, sherry-crème fraîche on toasted brioche', tags: ['DDP snack eligible', '30th Anniversary Legacy Item'] },
      { name: 'Smoked Brisket and Cheddar Melt', price: '$6.49', description: 'Chopped smoked brisket, caramelized onions, tangy barbecue, cheddar sauce on potato roll', tags: ['DDP snack eligible', 'new for 2026'] },
      { name: 'Chocolate Pudding Cake', price: '$4.99', description: 'Freshly baked, with Kentucky bourbon caramel', tags: ['DDP snack eligible'] },
    ],
  },
  {
    name: 'Japan',
    type: 'pavilion',
    area: 'Japan pavilion, World Showcase',
    mapPos: { x: 18, y: 72 },
    items: [
      { name: 'Spicy Temaki Hand Roll', price: null, description: null, tags: ['new for 2026', 'spicy'] },
      { name: 'Beef Wagyu Temaki Hand Roll', price: null, description: null, tags: ['new for 2026'] },
      { name: 'Teriyaki Chicken Bun', price: null, description: null, tags: ['returning favorite'] },
      { name: 'Beef Wagyu Don', price: null, description: 'Rice bowl with American wagyu beef blend, steamed rice, pickles, tōgarashi, pickled ginger', tags: [] },
      { name: 'Osakana Karaage', price: null, description: 'Crispy-fried pollock with spicy mayonnaise and sweet-creamy yuzu sauce', tags: ['spicy'] },
    ],
  },
  {
    name: 'Morocco (Tangierine Café)',
    type: 'pavilion',
    area: 'Morocco pavilion, World Showcase',
    mapPos: { x: 10, y: 60 },
    items: [
      { name: 'Ras el Hanout Cauliflower Bowl', price: '$6.49', description: 'Chickpea salad, golden raisin relish, parsley, served with pita', tags: ['plant-based'] },
      { name: 'Moroccan Wrap with Plant-based Falafel', price: '$6.29', description: 'Tomato-cucumber relish and garlic sauce on warm Moroccan flatbread', tags: ['plant-based', 'vegan'] },
      { name: 'Chocolate-Pistachio Cookie', price: '$4.29', description: null, tags: [] },
    ],
  },
  {
    name: 'France',
    type: 'pavilion',
    area: 'France pavilion, World Showcase',
    mapPos: { x: 7, y: 45 },
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
    area: 'United Kingdom pavilion, World Showcase',
    mapPos: { x: 15, y: 28 },
    items: [
      { name: 'Scotch Egg', price: '$15.00', description: 'Golden-fried hard-boiled cage-free egg wrapped in sausage with mustard sauce', tags: [] },
      { name: 'Fish and Chips', price: null, description: 'Served at Yorkshire County Fish Shop in the UK pavilion', tags: [] },
    ],
  },
  {
    name: 'Canada',
    type: 'pavilion',
    area: 'Canada pavilion, World Showcase',
    mapPos: { x: 28, y: 15 },
    items: [
      { name: 'Cheddar and Bacon Soup with Pretzel Roll', price: '$6.29', description: null, tags: ['DDP snack eligible', '30th Anniversary Legacy Item'] },
      { name: 'Filet Mignon with Mushrooms and Mashed Potatoes', price: '$10.49', description: null, tags: ['DDP snack eligible'] },
      { name: 'Collective Arts Brewing Festbier', price: '$6.00 / $9.75', description: 'From Hamilton, ON', tags: [] },
      { name: 'Chateau des Charmes Pétales Rouge', price: '$9.50', description: 'From Niagara-on-the-Lake, ON', tags: [] },
    ],
  },
  {
    name: 'Australia',
    type: 'kiosk',
    area: 'Near Disney Traders, World Discovery side of the promenade',
    mapPos: { x: 66, y: 12 },
    items: [
      { name: 'Grilled Bushberry-spiced Shrimp Skewer', price: '$6.99', description: 'Sweet-and-sour vegetables and coconut-chili sauce', tags: ['30th Anniversary Legacy Item'] },
      { name: 'Mixed Berry Pavlova', price: '$4.79', description: 'Crunchy meringue shell with macerated berries and whipped cream', tags: ['vegetarian'] },
    ],
  },
  {
    name: 'Belgium',
    type: 'kiosk',
    area: 'Between Morocco and France, World Showcase',
    mapPos: { x: 8, y: 52 },
    items: [
      { name: 'Belgian Beer Flight', price: '$12.75', description: 'Van Steenberge Piraat 7 Strong Ale, St. Bernardus Watou Blond Ale, Verhaeghe Duchesse Red Sweet & Tart Cherry Ale', tags: [] },
      { name: 'Individual Belgian Beer Pour', price: '$6.00 / $9.75', description: null, tags: [] },
      { name: 'Chilled Belgian Coffee', price: null, description: null, tags: [] },
    ],
  },
  {
    name: 'Greece',
    type: 'kiosk',
    area: 'Near the Morocco pavilion, World Showcase (open Sept 18 – Nov 8)',
    mapPos: { x: 14, y: 65 },
    items: [
      { name: 'Griddled Cheese with Pistachios and Honey', price: '$5.25', description: "Emile's Fromage Montage cheese-stroll item", tags: ['vegetarian'] },
      { name: 'Lamb Gyro', price: '$7.00', description: 'Shaved lettuce, tomato-cucumber relish, tzatziki on warm flatbread', tags: [] },
      { name: 'Spanakopita', price: '$5.19', description: null, tags: ['vegetarian'] },
      { name: 'Chicken Souvlaki Gyro', price: null, description: null, tags: ['30th Anniversary Legacy Item'] },
      { name: 'Greek Melon Limeade', price: '$12.00', description: 'Kleos Mastiha spirit, Artonic Melon apéritif, Pearl vodka, lime sour mix', tags: [] },
    ],
  },
  {
    name: 'Spain',
    type: 'kiosk',
    area: 'World Showcase (faux-stone booth; exact spot between pavilions unconfirmed)',
    mapPos: { x: 65, y: 78 },
    items: [
      { name: 'Trio de Pintxos', price: '$7.25', description: 'Jamón croqueta, pan con tomate, tortilla Española', tags: ['new for 2026'] },
      { name: 'Paella Caldoso', price: '$8.00', description: 'Rock shrimp, bay scallops, smoked mussels', tags: ['gluten/wheat-friendly'] },
      { name: 'Basque Cheesecake', price: '$5.25', description: 'With orange sauce', tags: ['gluten/wheat-friendly', 'vegetarian'] },
      { name: 'Summer in Spain', price: '$12.50', description: 'Frozen Simply Lemonade with Yellow and Green Chartreuse liqueurs', tags: [] },
    ],
  },
  {
    name: "Hawai'i",
    type: 'kiosk',
    area: 'Near the front of World Showcase, near the walkway to World Celebration',
    mapPos: { x: 58, y: 10 },
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
    name: 'Brazil',
    type: 'kiosk',
    area: 'Morocco/France area, grouped with Caribbean-region booths',
    mapPos: { x: 5, y: 58 },
    items: [
      { name: 'Feijoada', price: '$6.50', description: 'Black beans with pork belly and Brazil nut pesto', tags: [] },
      { name: 'Pão de Queijo', price: '$5.00', description: 'Brazilian cheese bread', tags: ['vegetarian'] },
      { name: 'Moqueca de Camarão', price: '$6.99', description: 'Plancha-seared shrimp, bell peppers, cilantro, tomatoes in coconut milk broth', tags: [] },
    ],
  },
  {
    name: 'Islands of the Caribbean',
    type: 'kiosk',
    area: 'Morocco/France area, grouped with Brazil/Caribbean-region booths (menu not yet published)',
    mapPos: { x: 6, y: 62 },
    items: [],
  },
  {
    name: 'Forest & Field',
    type: 'kiosk',
    area: 'Near the walkway to World Celebration, World Showcase',
    mapPos: { x: 45, y: 8 },
    items: [
      { name: 'Pumpkin-Mascarpone Ravioli', price: null, description: 'Returning favorite', tags: ['vegetarian', '30th Anniversary Legacy Item'] },
    ],
  },
  {
    name: 'Milled & Mulled',
    type: 'kiosk',
    area: 'Near Forest & Field / Bramblewood Bites (menu not yet published)',
    mapPos: { x: 42, y: 9 },
    items: [],
  },
  {
    name: 'Bramblewood Bites',
    type: 'kiosk',
    area: 'Near Forest & Field / Milled & Mulled (menu not yet published)',
    mapPos: { x: 48, y: 9 },
    items: [],
  },
  {
    name: 'Swirled Showcase',
    type: 'kiosk',
    area: 'Near the walkway to World Celebration (menu not yet published)',
    mapPos: { x: 52, y: 8 },
    items: [],
  },
  {
    name: 'Shimmering Sips',
    type: 'kiosk',
    area: 'Near the walkway to World Celebration (menu not yet published)',
    mapPos: { x: 55, y: 9 },
    items: [],
  },
  {
    name: 'Gyozas of the Galaxy',
    type: 'kiosk',
    area: 'World Discovery, near Guardians of the Galaxy: Cosmic Rewind',
    mapPos: { x: 68, y: 5 },
    items: [
      { name: 'Basil Pesto Chicken Dumplings', price: '$5.99', description: 'Chicken dumplings, basil pesto, fonduta, tomato confit, balsamic', tags: ['new for 2026'] },
      { name: 'Edamame Dumplings', price: '$5.29', description: 'Butternut squash purée, caramelized onions, sage, walnut-toasted garlic aillade', tags: ['plant-based', 'new for 2026'] },
      { name: 'Street Corn-style Dumplings', price: '$5.99', description: 'Chicken dumplings, tomatillo salsa verde, street corn salad, cotija cheese, lime crema, cilantro', tags: ['returning item'] },
      { name: 'Willamette Valley Vineyards Pinot Gris', price: '$7.50', description: null, tags: [] },
    ],
  },
  {
    name: 'Brew-Wing Lab',
    type: 'kiosk',
    area: 'Near the Odyssey building, close to World Discovery/Australia (menu not yet published)',
    mapPos: { x: 70, y: 8 },
    items: [],
  },
  {
    name: 'The Wedge (Dairy Does More)',
    type: 'kiosk',
    area: 'Inside CommuniCore Hall, World Celebration (new for 2026, open Sept 18 – Nov 8)',
    mapPos: { x: 50, y: 3 },
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
  {
    name: 'Flavors from Fire',
    type: 'kiosk',
    area: 'World Nature (campfire-themed booth)',
    mapPos: { x: 35, y: 5 },
    items: [
      { name: 'Swine Brine', price: null, description: 'Mustard-and-bourbon novelty cocktail; signature drink since 2017', tags: [] },
      { name: 'Smoked Chocolate Bread Pudding', price: null, description: null, tags: ['new for 2026', 'vegetarian'] },
      { name: '1000 Stories Bourbon Barrel-Aged Zinfandel', price: null, description: null, tags: ['new for 2026'] },
    ],
  },
  {
    name: 'Earth Eats',
    type: 'kiosk',
    area: 'World Nature (opens Oct 2, 2026)',
    mapPos: { x: 33, y: 5 },
    items: [
      { name: 'Lemon-Almond-Olive Oil Cake', price: null, description: 'New for 2026', tags: ['new for 2026', 'vegetarian'] },
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
