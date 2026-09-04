// 2026 Epcot International Food & Wine Festival — marketplace + menu data.
//
// Marketplace list and official numbering are taken directly from Disney's own
// 2026 festival map/legend (33 numbered "Global Marketplaces"), with Norway and
// United Kingdom inserted even though they aren't numbered marketplaces this
// year (their festival items are served from the permanent pavilion instead of
// a dedicated marketplace booth). Each entry's `mapPos` is a pixel coordinate
// hand-read off that same festival map photo — MapView draws its own original
// lagoon/park artwork (not a copy of that photo) but positions every marker at
// these real coordinates, so array order no longer drives the map layout.
//
// Dish-level menu data (items, prices, descriptions, tags) was compiled from
// public festival-menu roundups (Disney Parks Blog, Disney Food Blog, BlogMickey,
// AllEars, WDW Prep School, DVC Shop, WDWNT, Resortsgal) published Aug 2026.
// Coverage is thorough but not guaranteed complete/current — a handful of prices
// and a couple of newer booths' full offerings were still unconfirmed as of
// compile time; double-check against Disney's official festival page before your
// trip, as menus and prices can change.

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
    mapPos: { x: 296, y: 840 },
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
    mapPos: { x: 318, y: 840 },
    items: [
      { name: 'Crab Cake', price: '$7.49', description: 'With tropical fruit chutney, mustard sauce, and micro celery', tags: [] },
      { name: 'Seafood Pot Pie', price: '$7.49', description: 'Shrimp, scallops, and lobster bisque topped with puff pastry', tags: [] },
      { name: "Riley's Lookout Sauvignon Blanc", price: '$6.50', description: 'Marlborough, New Zealand', tags: [] },
      { name: 'Boyd & Blair Pomegranate Codder', price: '$12.50', description: 'Cocktail, Glenshaw, PA', tags: [] },
    ],
  },
  {
    name: 'The Fry Basket',
    type: 'kiosk',
    area: 'World Discovery (Marketplace #3)',
    mapPos: { x: 270, y: 815 },
    items: [
      { name: 'Adobo Yuca Fries', price: '$5.75', description: 'With plant-based garlic-cilantro aïoli', tags: ['plant-based', 'DDP snack eligible'] },
      { name: 'Fry Flight', price: '$8.00', description: 'Sea Salt-Malt Vinegar Fries (plant-based); Truffle-Parmesan Fries with black garlic-truffle aïoli; Sweet Potato Casserole Fries with cinnamon-sugar, candied pecans, and marshmallow cream', tags: ['DDP snack eligible'] },
      { name: '3 Daughters Brewing Mojito Blonde Ale', price: '$5.75 / $9.75', description: null, tags: ['new for 2026'] },
      { name: 'Boyd & Blair Grapefruit Mule', price: '$12.50', description: null, tags: [] },
    ],
  },
  {
    name: 'Flavors from Fire',
    type: 'kiosk',
    area: 'World Nature, campfire-themed booth (Marketplace #4)',
    mapPos: { x: 313, y: 803 },
    items: [
      { name: 'Rodizio-style Grilled Beef Skewer', price: '$6.99', description: 'With marble potatoes, charred shallots, roasted baby peppers, and chimichurri', tags: [] },
      { name: 'Smoked Corned Beef', price: '$6.49', description: 'With house-made potato chips, cheese curds, pickled onions, and beer cheese fondue', tags: [] },
      { name: 'Smoked Chocolate Bread Pudding', price: '$4.49', description: 'Chocolate ganache, vanilla bean-bourbon sauce, smoked sea salt', tags: ['new for 2026', 'vegetarian'] },
      { name: 'Left Hand Brewing Co. Sawtooth Amber Ale', price: '$6.00 / $9.75', description: null, tags: [] },
      { name: '1000 Stories Bourbon Barrel-Aged Zinfandel', price: '$6.50', description: null, tags: ['new for 2026'] },
      { name: 'Swine Brine', price: '$13.00', description: 'Jim Beam Kentucky Straight Bourbon Whiskey, apple-cinnamon cider, lemon juice, and Dijon mustard', tags: ['signature returning cocktail'] },
    ],
  },
  {
    name: 'Refreshment Station',
    type: 'kiosk',
    area: 'World Discovery, hosted by Coca-Cola (Marketplace #5)',
    mapPos: { x: 296, y: 803 },
    items: [
      { name: 'Frozen Coca-Cola Slushy', price: '$6.25', description: 'Assorted flavors rotate seasonally (frozen Coke, frozen Fanta, etc.)', tags: [] },
      { name: 'Slushy Toppings', price: null, description: 'Pop Rocks, rock candy, gummy worms, and other add-ons for any slushy', tags: [] },
    ],
  },
  {
    name: 'Brew-Wing Lab',
    type: 'kiosk',
    area: 'Near the Odyssey building (Marketplace #6)',
    mapPos: { x: 95, y: 400 },
    items: [
      { name: 'Garlic-Parmesan Wings', price: '$7.79', description: null, tags: [] },
      { name: 'Buffalo-Dill Pickle Wings', price: '$7.79', description: null, tags: [] },
      { name: 'Korean Barbecue Wings', price: '$7.79', description: null, tags: [] },
      { name: 'Carolina Reaper Wings', price: '$7.79', description: 'Carolina Reaper pepper-curry wings with creamy cucumber raita', tags: ['spicy'] },
      { name: 'Sweet Chile-Lime Plant-based Chicken Strips', price: '$7.79', description: null, tags: ['plant-based'] },
      { name: 'Fried Pickle Spears', price: '$5.79', description: null, tags: [] },
      { name: 'Frozen Pomegranate & Raspberry Tea', price: '$5.19', description: 'Twinings Pomegranate & Raspberry Herbal Tea with orange ice cream molecules', tags: ['non-alcoholic', 'DDP snack eligible'] },
      { name: 'Pickle Milk Shake', price: '$6.49', description: null, tags: ['30th Anniversary Legacy Item'] },
      { name: "Civil Society Brewing Everyday I'm Waffle'n IPA", price: '$6.00 / $9.75', description: null, tags: [] },
      { name: '3 Daughters Brewing Peanut Butter Blondie Blonde Ale', price: '$6.00 / $9.75', description: null, tags: [] },
      { name: 'Playalinda Brewing Co. Pumpkin Cheesecake Blonde Stout', price: '$6.00 / $9.75', description: null, tags: [] },
    ],
  },
  {
    name: 'Australia',
    type: 'kiosk',
    area: 'Near Disney Traders, World Discovery side of the promenade (Marketplace #7)',
    mapPos: { x: 322, y: 650 },
    items: [
      { name: 'Grilled Bushberry-spiced Shrimp Skewer', price: '$6.99', description: 'Sweet-and-sour vegetables and coconut-chili sauce', tags: ['30th Anniversary Legacy Item'] },
      { name: 'Roasted Lamb Chop', price: '$8.79', description: 'With mint pesto and crushed salt and vinegar potato chips', tags: ['30th Anniversary Legacy Item', 'DDP snack eligible'] },
      { name: 'Mixed Berry Pavlova', price: '$4.79', description: 'Crunchy meringue shell with macerated berries and whipped cream', tags: ['vegetarian'] },
      { name: 'Bulletin Place Sauvignon Blanc', price: '$6.50', description: null, tags: [] },
      { name: 'Fowles Farm to Table Shiraz', price: '$6.50', description: null, tags: [] },
      { name: "Yalumba 'The Y Series' Viognier", price: '$6.50', description: null, tags: [] },
      { name: 'Wine Flight', price: '$7.50', description: null, tags: [] },
    ],
  },
  {
    name: 'Mexico',
    type: 'pavilion',
    flag: '🇲🇽',
    area: 'World Showcase, Mexico pavilion (Marketplace #8)',
    mapPos: { x: 190, y: 700 },
    items: [
      { name: 'Taco de Camarón', price: '$8.50', description: 'Flour tortilla with crispy tempura shrimp, shredded cabbage, and chipotle aïoli', tags: ['30th Anniversary Legacy Item'] },
      { name: 'Tostada de Osso Buco', price: '$8.25', description: 'Pork osso buco atop a fried corn tortilla with chipotle black beans, salsa verde, queso fresco, and chives', tags: [] },
      { name: 'Paleta de Moras (Berry Popsicle)', price: '$7.00', description: 'Berry ice pop filled with sweetened condensed milk, topped with chili-lime seasoning', tags: [] },
      { name: 'Cherry Nostalgia', price: '$13.50', description: 'Blanco tequila, botanical liqueur, cherry, and lime with a hibiscus salt rim', tags: [] },
      { name: 'Fruta de la Pasión', price: '$13.75', description: 'Blanco tequila, mezcal, tangy passion fruit purée, and citrus juice with a salty chili rim', tags: [] },
      { name: 'Mexican Craft Beer', price: '$8.50 / $11.00', description: null, tags: [] },
    ],
  },
  {
    name: 'Norway',
    type: 'pavilion',
    flag: '🇳🇴',
    area: 'Norway pavilion, World Showcase (snack cart — not a numbered Global Marketplace)',
    mapPos: { x: 110, y: 560 },
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
    mapPos: { x: 152, y: 483 },
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
    mapPos: { x: 140, y: 408 },
    items: [
      { name: 'Potato and Pea Samosas', price: '$5.49', description: 'With plant-based coriander-lime cream', tags: ['plant-based', '30th Anniversary Legacy Item'] },
      { name: 'Chicken Tikka Masala', price: '$6.49', description: 'With fennel-spiced yogurt and naan bread', tags: ['30th Anniversary Legacy Item'] },
      { name: 'Curry-Spiced Crispy Cheese (Paneer)', price: '$5.25', description: 'With mango-curry ketchup', tags: ['vegetarian'] },
      { name: 'Mango Lassi', price: '$5.29', description: null, tags: ['non-alcoholic'] },
      { name: 'United Breweries Taj Mahal Premium Lager', price: '$6.00 / $9.75', description: null, tags: [] },
      { name: 'Sula Tropicale Brut Sparkling Wine', price: '$7.75', description: null, tags: [] },
      { name: 'Mango Lassi with Camikara 8-Year-Old Cask Aged Rum', price: '$12.50', description: null, tags: [] },
    ],
  },
  {
    name: 'Refreshment Outpost',
    type: 'kiosk',
    area: 'World Showcase, hosted by Coca-Cola (Marketplace #11)',
    mapPos: { x: 60, y: 380 },
    items: [
      { name: 'African Rum Purée Slush', price: '$16.50', description: 'Mango purée and STARR African Rum', tags: [] },
      { name: 'Frozen Coca-Cola with Amarula Cream Liqueur', price: '$16.50', description: null, tags: [] },
      { name: 'Outpost Lemonade', price: '$16.50', description: 'Frozen Minute Maid Lemonade and Absolut Vodka', tags: [] },
      { name: 'Pineapple and Cherry Slush', price: '$6.29', description: null, tags: ['non-alcoholic'] },
    ],
  },
  {
    name: 'The Alps',
    type: 'kiosk',
    area: 'Near Germany, World Showcase (Marketplace #12, opens October 2, 2026)',
    mapPos: { x: 48, y: 350 },
    items: [
      { name: 'Warm Raclette Swiss Cheese on a Baguette', price: '$6.79', description: 'With jambon and apple-mustard relish', tags: ['30th Anniversary Legacy Item — reimagined for 2026'] },
      { name: 'Tartiflette', price: '$5.49', description: 'Potatoes gratin, caramelized onions, bacon, thyme, crème fraîche, and brie', tags: [] },
      { name: 'Kirschwasser Torte', price: '$5.49', description: 'Cherry-brandy buttercream, fondant, sugared almonds, and cherry compote', tags: [] },
    ],
  },
  {
    name: 'Germany',
    type: 'pavilion',
    flag: '🇩🇪',
    area: 'Germany pavilion, World Showcase (Marketplace #13, opens Oct 2, 2026)',
    mapPos: { x: 60, y: 328 },
    items: [
      { name: 'Zwiebelkuchen (German Onion Cake)', price: '$9.79', description: 'Caramelized onions, bacon, herbs, savory custard', tags: ['DDP snack eligible'] },
      { name: 'Apple Strudel', price: '$5.00', description: 'With vanilla sauce', tags: ['DDP snack eligible'] },
      { name: 'Schinkennudeln', price: '$5.25', description: 'Pasta gratin with ham, onions, and cheese', tags: ['DDP snack eligible'] },
      { name: 'Caramel-Apple Cheesecake Baumkuchen', price: '$6.49', description: null, tags: [] },
      { name: 'Frozen Waffle Old Fashioned', price: '$17.50', description: "Maker's Mark Kentucky Straight Bourbon Whisky, maple syrup, butterscotch syrup, and angostura bitters, topped with a liege waffle and cherry", tags: [] },
      { name: 'Schöfferhofer Grapefruit Hefeweizen', price: '$6.00 / $9.75', description: 'From Mainz, Germany', tags: [] },
    ],
  },
  {
    name: 'Spain',
    type: 'kiosk',
    area: 'Near Germany and Italy, World Showcase (Marketplace #14)',
    mapPos: { x: 150, y: 290 },
    items: [
      { name: 'Trio de Pintxos', price: '$7.25', description: 'Jamón croqueta, pan con tomate, tortilla Española', tags: ['new for 2026'] },
      { name: 'Paella Caldoso', price: '$8.00', description: 'Rock shrimp, bay scallops, smoked mussels', tags: ['gluten/wheat-friendly', 'new for 2026'] },
      { name: 'Croquetas de Jamón', price: '$6.99', description: 'With saffron aïoli and shaved jamón serrano', tags: [] },
      { name: 'Basque Cheesecake', price: '$5.25', description: 'With orange sauce', tags: ['gluten/wheat-friendly', 'vegetarian', 'new for 2026'] },
      { name: 'Summer in Spain', price: '$12.50', description: 'Frozen Simply Lemonade with Yellow and Green Chartreuse liqueurs', tags: ['new for 2026'] },
    ],
  },
  {
    name: 'Italy',
    type: 'pavilion',
    flag: '🇮🇹',
    area: 'Italy pavilion, World Showcase — walk-up window, no reservation (Marketplace #15)',
    mapPos: { x: 238, y: 300 },
    items: [
      { name: 'Stromboli', price: '$8.00', description: 'Baked ham and provolone roll with Parmesan and tomato sauce', tags: [] },
      { name: 'Arancini', price: '$7.75', description: 'Risotto with beef ragoût, peas, parmesan, and tomato sauce', tags: [] },
      { name: 'Pollo al Marsala', price: '$9.00', description: 'Roasted chicken drumstick, creamy potato gnocchi, mushrooms, Marsala sauce', tags: ['30th Anniversary Legacy Item'] },
      { name: 'Insalata di Pasta', price: '$7.50', description: 'Penne, apple, raisins, scallions, almonds, honey, and lemon dressing, served chilled', tags: [] },
      { name: 'Almond Panna Cotta', price: '$6.00', description: 'With orange marmalade, whipped cream, and candied almonds', tags: [] },
      { name: 'Elderflower Sparkling Cocktail', price: '$16.00', description: 'Mint-infused elderflower liqueur, prosecco, and blood orange soda', tags: ['new for 2026'] },
      { name: 'Italian-inspired Margarita', price: '$13.00', description: null, tags: [] },
    ],
  },
  {
    name: 'American Adventure (Hops & Barley)',
    type: 'pavilion',
    flag: '🇺🇸',
    area: 'The American Adventure pavilion, World Showcase (Marketplace #16)',
    mapPos: { x: 400, y: 235 },
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
    mapPos: { x: 452, y: 213 },
    items: [
      { name: 'Pumpkin Pie Funnel Cake', price: '$12.50', description: 'Pumpkin pie ice cream, whipped cream, dark chocolate sauce, cinnamon streusel, and powdered sugar', tags: [] },
      { name: 'Huckleberry Funnel Cake', price: '$12.00', description: 'Huckleberry ice cream, whipped cream, chocolate sauce, blackberry brandy glaze, and powdered sugar', tags: [] },
    ],
  },
  {
    name: 'Japan',
    type: 'pavilion',
    flag: '🇯🇵',
    area: 'Japan pavilion, World Showcase (Marketplace #18)',
    mapPos: { x: 543, y: 263 },
    items: [
      { name: 'Spicy Temaki Hand Roll', price: '$9.00', description: 'Spicy tuna, cucumber, rice cracker, and spicy mayonnaise sauce', tags: ['30th Anniversary Legacy Item'] },
      { name: 'Beef Wagyu Temaki Hand Roll', price: '$10.25', description: 'Savory American wagyu beef, pickled ginger, and spicy mayonnaise sauce', tags: [] },
      { name: 'Teriyaki Chicken Bun', price: '$7.95', description: 'Steamed bun filled with minced chicken, vegetables, and teriyaki sauce', tags: ['returning favorite'] },
      { name: 'Beef Wagyu Don', price: '$9.50', description: 'Rice bowl with American wagyu beef blend, steamed rice, pickles, tōgarashi, pickled ginger', tags: ['new for 2026'] },
      { name: 'Osakana Karaage', price: null, description: 'Crispy-fried pollock with spicy mayonnaise and sweet-creamy yuzu sauce', tags: ['spicy'] },
    ],
  },
  {
    name: 'Greece',
    type: 'kiosk',
    area: 'Near Japan and Morocco, World Showcase (Marketplace #19, open Sept 18 – Nov 8)',
    mapPos: { x: 573, y: 250 },
    items: [
      { name: 'Griddled Cheese with Pistachios and Honey', price: '$5.25', description: "Emile's Fromage Montage cheese-stroll item", tags: ['vegetarian'] },
      { name: 'Lamb Gyro', price: '$7.00', description: 'Shaved lettuce, tomato-cucumber relish, tzatziki on warm flatbread', tags: ['30th Anniversary Legacy Item'] },
      { name: 'Spanakopita', price: '$5.19', description: null, tags: ['vegetarian'] },
      { name: 'Wine Flight', price: '$7.50', description: 'Mylonas Winery Assyrtiko Dry White (Attiki), Zoe Rosé (Peloponnese), Kir-Yianni Naoussa Xinomavro Dry Red (Naoussa)', tags: [] },
      { name: 'Greek Melon Limeade', price: '$12.00', description: 'Kleos Mastiha spirit, Artonic Melon apéritif, Pearl vodka, lime sour mix', tags: [] },
    ],
  },
  {
    name: 'Morocco (Tangierine Café)',
    type: 'pavilion',
    flag: '🇲🇦',
    area: 'Morocco pavilion, World Showcase — "Tangierine Café: Flavors of the Medina" (Marketplace #20)',
    mapPos: { x: 637, y: 258 },
    items: [
      { name: 'Ras el Hanout Cauliflower Bowl', price: '$6.49', description: 'Chickpea salad, golden raisin relish, parsley, served with pita', tags: ['plant-based'] },
      { name: 'Moroccan Wrap', price: '$6.29', description: 'Tomato-cucumber relish and garlic sauce on warm Moroccan flatbread; choice of chermoula chicken, Moroccan-spiced lamb, or plant-based falafel', tags: ['plant-based option available'] },
      { name: 'Stone-Baked Moroccan Bread with Assorted Dips', price: '$5.29', description: null, tags: [] },
      { name: 'Chermoula Chicken Kebab', price: '$6.25', description: null, tags: [] },
      { name: 'Moroccan-Spiced Lamb Kebab', price: '$6.25', description: null, tags: [] },
      { name: 'Pistachio Cake', price: '$4.75', description: null, tags: [] },
      { name: 'Chocolate-Pistachio Cookie', price: '$4.29', description: null, tags: [] },
    ],
  },
  {
    name: 'Belgium',
    type: 'kiosk',
    area: 'Between Morocco and France, World Showcase (Marketplace #21)',
    mapPos: { x: 693, y: 293 },
    items: [
      { name: 'Beer-braised Beef', price: '$6.79', description: 'With smoked Gouda mashed potatoes', tags: [] },
      { name: 'Belgian Waffle', price: '$5.49', description: 'With cookie butter and whipped cream, topped with speculoos cookie pieces', tags: [] },
      { name: 'Chilled Belgian Coffee', price: '$5.29', description: null, tags: ['non-alcoholic'] },
      { name: 'Belgian Beer Flight', price: '$12.75', description: 'Van Steenberge Piraat 7 Strong Ale, St. Bernardus Watou Blond Ale, Verhaeghe Duchesse Red Sweet & Tart Cherry Ale', tags: [] },
      { name: 'Individual Belgian Beer Pour', price: '$6.00 / $9.75', description: null, tags: [] },
    ],
  },
  {
    name: 'Brazil',
    type: 'kiosk',
    area: 'Between Morocco and France, World Showcase (Marketplace #22)',
    mapPos: { x: 700, y: 322 },
    items: [
      { name: 'Feijoada', price: '$6.50', description: 'Black beans with pork belly and Brazil nut pesto', tags: [] },
      { name: 'Pão de Queijo', price: '$5.19', description: 'Brazilian cheese bread', tags: ['vegetarian'] },
      { name: 'Moqueca de Camarão', price: '$6.99', description: 'Plancha-seared shrimp, bell peppers, cilantro, tomatoes in coconut milk broth', tags: [] },
      { name: '81Bay Brewing Co. Bossa Nova Lager', price: '$5.75 / $9.75', description: null, tags: [] },
      { name: 'Frozen Caipirinha', price: '$12.50', description: null, tags: [] },
    ],
  },
  {
    name: 'France',
    type: 'pavilion',
    flag: '🇫🇷',
    area: 'France pavilion, World Showcase (Marketplace #23)',
    mapPos: { x: 740, y: 360 },
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
    mapPos: { x: 700, y: 560 },
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
    mapPos: { x: 594, y: 648 },
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
    mapPos: { x: 497, y: 693 },
    items: [
      { name: 'Liquid Nitrogen Frozen Pumpkin Cheesecake Mousse', price: '$5.50', description: 'Philadelphia Cream Cheese with candied pecans and maple-caramel sauce', tags: ['new for 2026', 'DDP snack eligible'] },
      { name: 'Soft-serve in a Cone', price: '$6.50', description: 'Vanilla, apple-cinnamon, or salted caramel', tags: ['DDP snack eligible'] },
      { name: 'Floats', price: '$6.75', description: "Coca-Cola, Barq's Crème Soda, or Fanta Grape with choice of soft-serve", tags: ['non-alcoholic', 'DDP snack eligible'] },
      { name: 'Frozen Apple Pie', price: '$6.75', description: 'Apple pie filling, apple-cinnamon soft-serve, and apple-cinnamon cider, topped with streusel', tags: ['non-alcoholic', 'DDP snack eligible'] },
      { name: 'Früli Strawberry Belgian White Beer', price: '$12.00', description: null, tags: ['new for 2026'] },
      { name: 'Strawberry Beer Float', price: '$13.25', description: 'Früli Strawberry Belgian White Beer and vanilla soft-serve', tags: ['new for 2026'] },
    ],
  },
  {
    name: 'Shimmering Sips',
    type: 'kiosk',
    area: 'Near the walkway to World Celebration (Marketplace #26) — also the redemption point for Emile\'s Fromage Montage passport stamps',
    mapPos: { x: 555, y: 658 },
    items: [
      { name: 'Mimosa Flight', price: null, description: 'Berry, Blood Orange, and Tropical mimosas', tags: [] },
      { name: 'Strawberry Champagne Trifle', price: null, description: null, tags: [] },
    ],
  },
  {
    name: "Hawai'i",
    type: 'kiosk',
    area: 'Near the front of World Showcase, near the walkway to World Celebration (Marketplace #27)',
    mapPos: { x: 413, y: 680 },
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
    mapPos: { x: 475, y: 695 },
    items: [
      { name: 'Autumn Chili', price: '$6.50', description: 'IMPOSSIBLE Beef with root vegetables, plant-based cheddar, and plant-based sour cream in a bread bowl', tags: ['plant-based'] },
      { name: 'Pumpkin-Mascarpone Ravioli', price: '$5.50', description: 'Brown butter vinaigrette, pecorino cheese, pomegranate seeds, and hazelnut praline', tags: ['returning favorite', 'vegetarian'] },
      { name: 'Schiacciata Sandwich', price: '$6.25', description: 'Mortadella, prosciutto ham, sun-dried peppers, arugula, stracciatella cheese, fall squash mostarda, and pistachio pesto on warm focaccia', tags: [] },
    ],
  },
  {
    name: 'Milled & Mulled',
    type: 'kiosk',
    area: 'Near Forest & Field, World Showcase (Marketplace #29)',
    mapPos: { x: 485, y: 720 },
    items: [
      { name: 'Butternut Squash and Ginger Bisque', price: '$5.49', description: null, tags: [] },
      { name: 'Freshly Baked Carrot Cake', price: '$4.99', description: 'With walnuts and cream cheese icing', tags: ['30th Anniversary Legacy Item'] },
      { name: 'Apple-Cinnamon and Caramel Mini Churros Sundae', price: '$5.29', description: null, tags: [] },
      { name: 'Fall Fruit Cheesecake', price: '$5.50', description: 'Featuring Boursin Fig & Balsamic Cheese', tags: [] },
      { name: 'Southern Tier Brewing Co. Sweater Weather Vanilla Toffee Amber Ale', price: '$8.50 / $9.75', description: null, tags: ['new for 2026'] },
      { name: '3 Daughters Brewing Apple Strudel Hard Cider', price: '$5.75 / $11.00', description: null, tags: [] },
    ],
  },
  {
    name: 'Bramblewood Bites',
    type: 'kiosk',
    area: 'Near Forest & Field, World Showcase (Marketplace #30)',
    mapPos: { x: 497, y: 747 },
    items: [
      { name: 'Grilled Cider-brined Pork Tenderloin', price: '$7.00', description: 'Chili-apple butter, celeriac-apple slaw, and apple cider gastrique', tags: ['DDP snack eligible'] },
      { name: 'Cast Iron-seared River Trout', price: '$7.25', description: 'Vanilla-butternut squash purée, brussels sprouts salad, candied pecans, spiced pumpkin seeds, dried cranberries, and maple dressing', tags: ['DDP snack eligible'] },
      { name: 'Cast Iron-roasted Brussels Sprouts and Root Vegetables', price: '$5.00', description: 'Dried cranberries, spiced pumpkin seeds, and pumpkin seed vinaigrette', tags: ['plant-based option', 'DDP snack eligible'] },
    ],
  },
  {
    name: 'Earth Eats',
    type: 'kiosk',
    area: 'World Nature (Marketplace #31, opens October 2, 2026)',
    mapPos: { x: 588, y: 858 },
    items: [
      { name: 'Red Wine-braised Beef Short Rib', price: null, description: 'Goat cheese polenta, tomato ragù, shaved pecorino cheese, and petit herbs', tags: [] },
      { name: 'Lemon-Almond-Olive Oil Cake', price: null, description: 'With whipped Greek yogurt panna cotta', tags: ['new for 2026', 'vegetarian'] },
    ],
  },
  {
    name: 'Festival Favorites',
    type: 'kiosk',
    area: 'World Celebration (Marketplace #32, opens September 9, 2026)',
    mapPos: { x: 472, y: 862 },
    items: [
      { name: 'Potato Pierogi', price: '$5.99', description: 'With kielbasa, caramelized onions, and sour cream', tags: ['30th Anniversary Legacy Item'] },
      { name: 'Bo Ssam Pork Belly Lettuce Wraps', price: '$6.19', description: 'Bo Ssam pork belly, kimchi slaw, and spicy aïoli', tags: ['30th Anniversary Legacy Item'] },
      { name: 'Pumpkin Cheesecake Mousse Trifle', price: '$5.29', description: 'Philadelphia Cream Cheese with citrus sauce and spice cake, topped with cranberry streusel', tags: ['30th Anniversary Legacy Item'] },
    ],
  },
  {
    name: 'The Wedge (Dairy Does More)',
    type: 'kiosk',
    area: 'Inside CommuniCore Hall, World Celebration (Marketplace #33, open Sept 18 – Nov 8)',
    mapPos: { x: 487, y: 890 },
    items: [
      { name: 'Selection of Cheeses with accompaniments', price: null, description: null, tags: ['vegetarian', '30th Anniversary Legacy Item'] },
      { name: 'Cannoli Milkshake', price: '$5.49', description: 'Topped with chocolate shavings, cannoli shell, and a maraschino cherry', tags: ['vegetarian'] },
      { name: 'Cheesesteak Macaroni and Cheese', price: null, description: 'Shaved beef, peppers, onions, and bread crumbs', tags: [] },
      { name: 'Crab and Corn Macaroni and Cheese', price: '$7.19', description: 'Smoked cheddar sauce, bacon, crab seasoning, roasted corn, herbed panko, and jalapeños', tags: [] },
      { name: 'Three-Cheese Macaroni and Cheese', price: null, description: 'Smoked cheddar sauce and herbed panko', tags: ['vegetarian'] },
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
