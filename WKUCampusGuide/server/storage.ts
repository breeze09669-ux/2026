import { type Restaurant, type InsertRestaurant, type Menu, type InsertMenu, type Facility, type InsertFacility, type Guide, type InsertGuide, type Inquiry, type InsertInquiry, type Reply, type InsertReply } from "@shared/schema";
import { randomUUID } from "crypto";

// Image paths as strings (served from attached_assets via Vite)
const campusHeroImage = '/attached_assets/다운로드-136_1764127294179.jpeg';
const cafeteriaInterior = '/attached_assets/KakaoTalk_20251119_130333696_01_1763525269353.jpg';
const cafeteriaKiosk = '/attached_assets/1763524223727_1764640651674.jpg';
const cafeteriaStorefront = '/attached_assets/1763524225230_1764640667405.jpg';
const phoenixShopStorefront = '/attached_assets/image_1764651679600.png';
const wmFoodmallInterior = '/attached_assets/KakaoTalk_20251117_130339604_13_1764654204950.jpg';
const bookstoreInterior = '/attached_assets/KakaoTalk_20251117_130339604_20_1764658282766.jpg';
const healthCenterInterior = '/attached_assets/20251027_161905_1764128110984.jpg';

// Student Cafeteria Menu Images (Real Menu)
const porkKimchiStewImage = '/attached_assets/generated_images/Pork_kimchi_stew_eca814c4.png';
const beefDoenjangStewImage = '/attached_assets/generated_images/Beef_brisket_doenjang_stew_78c4ec52.png';
const spicyBeefNoodleImage = '/attached_assets/generated_images/Spicy_beef_noodle_soup_53582179.png';
const armyStewImage = '/attached_assets/generated_images/Army_stew_budae-jigae_0d2686a6.png';
const softTofuStewImage = '/attached_assets/generated_images/Soft_tofu_stew_9a9556b2.png';
const chickenMayoImage = '/attached_assets/generated_images/Chicken_mayo_rice_bowl_6ffde34d.png';
const bulgogiBibimbapImage = '/attached_assets/generated_images/Bulgogi_bibimbap_2e689924.png';
const spamKimchiFriedRiceImage = '/attached_assets/generated_images/Spam_kimchi_fried_rice_2a7c424e.png';
const chickenCurryImage = '/attached_assets/generated_images/Chicken_cutlet_curry_rice_0811e4ec.png';
const cheeseSpicyPorkImage = '/attached_assets/generated_images/Cheese_spicy_pork_bowl_5c44e4fd.png';
const sausageOmuriceImage = '/attached_assets/generated_images/sausage_omurice_egg_dish.png';
const katsudonImage = '/attached_assets/generated_images/katsudon_pork_cutlet_rice.png';
const tangsuyukImage = '/attached_assets/generated_images/tangsuyuk_sweet_sour_pork.png';
const shrimpRiceImage = '/attached_assets/generated_images/fried_shrimp_rice_caviar_bowl.png';
const dakGangjungOmuriceImage = '/attached_assets/generated_images/dak_gangjeong_omurice.png';
const tteokbokkiSetImage = '/attached_assets/generated_images/tteokbokki_spicy_rice_cakes.png';
const seolleongtangImage = '/attached_assets/generated_images/seolleongtang_beef_bone_soup.png';
const porkBellySproutsImage = '/attached_assets/generated_images/pork_belly_bean_sprouts_rice.png';

// Legacy images for other restaurants
const bibimbapImage = '/attached_assets/generated_images/Korean_cafeteria_bibimbap_569edb65.png';
const friedChickenImage = '/attached_assets/generated_images/Korean_fried_chicken_e0b8a419.png';
const kimchiStewImage = '/attached_assets/generated_images/Kimchi_stew_jjigae_7b215cbf.png';
const bulgogiImage = '/attached_assets/generated_images/Bulgogi_beef_dish_1d5e1c0e.png';
const ramenImage = '/attached_assets/generated_images/Korean_ramen_noodles_d2622531.png';
const tteokbokkiImage = '/attached_assets/generated_images/Tteokbokki_street_food_7f962387.png';

// Sub-restaurant images (generated for cafeteria kiosk system)
const manwonRiceBowlKimchiStewSet = '/attached_assets/generated_images/rice_bowl_and_kimchi_stew_set_meal.png';
const manwonClamSoftTofuRiceSet = '/attached_assets/generated_images/clam_soft_tofu_stew_with_rice_set.png';
const manwonPorkKimchiStew = '/attached_assets/generated_images/pork_kimchi_stew_jjigae.png';
const manwonPorkKimchiSteam = '/attached_assets/generated_images/steamed_pork_with_red_kimchi.png';
const manwonClamSoftTofuStew = '/attached_assets/generated_images/clam_soft_tofu_stew.png';

// Sub-restaurant 2 images: 최고당돈까스 (new menus)
const chickenLegSoupImage = '/attached_assets/generated_images/chicken_leg_soup.png';
const choigodangArmyStewImage = '/attached_assets/generated_images/army_stew_budae_jjigae.png';
const porkJowlBowlImage = '/attached_assets/generated_images/spicy_pork_bulgogi_rice_bowl.png';
const porkJowlSoftTofuSetImage = '/attached_assets/generated_images/pork_jowl_with_soft_tofu_set.png';
const grilledBeefBowlImage = '/attached_assets/generated_images/grilled_beef_rice_bowl.png';
const grilledBeefSoftTofuSetImage = '/attached_assets/generated_images/grilled_beef_with_soft_tofu_set.png';
const grilledBeefKimchiSetImage = '/attached_assets/generated_images/grilled_beef_with_kimchi_stew_set.png';
const spicyChickenGalbiBowlImage = '/attached_assets/generated_images/spicy_chicken_galbi_rice_bowl.png';
const spicyChickenSoftTofuSetImage = '/attached_assets/generated_images/spicy_chicken_with_soft_tofu_set.png';
const spicyChickenKimchiSetImage = '/attached_assets/generated_images/spicy_chicken_with_kimchi_stew_set.png';
const soyChickenBowlImage = '/attached_assets/generated_images/soy_sauce_chicken_rice_bowl.png';
const soyChickenSoftTofuSetImage = '/attached_assets/generated_images/soy_sauce_chicken_with_soft_tofu_set.png';
const soyChickenKimchiSetImage = '/attached_assets/generated_images/soy_sauce_chicken_with_kimchi_stew_set.png';
const roeRiceBowlImage = '/attached_assets/generated_images/korean_dolsot_roe_rice_bowl.png';

// Sub-restaurant 2: 최고당돈까스 (Choigodang Tonkatsu - New menus)
const tonkotsuRamenImage = '/attached_assets/generated_images/tonkotsu_ramen_with_pork_cutlet.png';
const curryUdonImage = '/attached_assets/generated_images/curry_udon_noodles.png';
const orangeRoseCreamUdonImage = '/attached_assets/generated_images/orange_rose_cream_udon.png';
const doubleTonkatsuSetImage = '/attached_assets/generated_images/double_pork_tonkatsu_set.png';
const sweetPotatoMousseKatsuImage = '/attached_assets/generated_images/sweet_potato_mousse_topped_tonkatsu.png';
const garlicPorkKatsuImage = '/attached_assets/generated_images/garlic_pork_tonkatsu.png';
const spicyPorkKatsuImage = '/attached_assets/generated_images/spicy_pork_tonkatsu.png';
const roseCreamTonkatsuImage = '/attached_assets/generated_images/appetizing_rose_cream_tonkatsu.png';
const chickenBreastKatsuImage = '/attached_assets/generated_images/chicken_breast_tonkatsu.png';
const tripleCreamKatsuImage = '/attached_assets/generated_images/triple_cream_pork_tonkatsu_set.png';
const curryRamenImage = '/attached_assets/generated_images/curry_ramen.png';

// Set meal combination images
const garlicTonkatsuCurryUdonSetImage = '/attached_assets/generated_images/garlic_tonkatsu_and_curry_udon_set.png';
const garlicTonkatsuRoseUdonSetImage = '/attached_assets/generated_images/garlic_tonkatsu_and_rose_udon_set.png';
const garlicTonkatsuCreamyRamenSetImage = '/attached_assets/generated_images/garlic_tonkatsu_and_creamy_ramen_set.png';
const garlicTonkatsuTsukumenSetImage = '/attached_assets/generated_images/garlic_tonkatsu_and_tsukumen_set.png';
const roseTonkatsuCurryUdonSetImage = '/attached_assets/generated_images/rose_tonkatsu_and_curry_udon_set.png';
const roseTonkatsuCreamyRamenSetImage = '/attached_assets/generated_images/rose_tonkatsu_and_creamy_ramen_set.png';
const roseTonkatsuTsukumenSetImage = '/attached_assets/generated_images/rose_tonkatsu_and_tsukumen_set.png';

// New tonkatsu images
const sweetPotatoStuffedKatsuImage = '/attached_assets/generated_images/sweet_potato_mousse_stuffed_tonkatsu.png';
const cheddarCheeseKatsuImage = '/attached_assets/generated_images/cheddar_cheese_tonkatsu.png';
const rawBeefTonkatsuSetImage = '/attached_assets/generated_images/raw_beef_and_tonkatsu_set.png';
const rawBeefCurryRamenSetImage = '/attached_assets/generated_images/raw_beef_and_curry_ramen_set.png';

// Beverage and rice images
const colaCanImage = '/attached_assets/generated_images/coca_cola_can.png';
const cokeZeroCanImage = '/attached_assets/generated_images/coke_zero_can.png';
const spriteCanImage = '/attached_assets/generated_images/sprite_can.png';
const fantaPineappleCanImage = '/attached_assets/generated_images/fanta_pineapple_can.png';
const welchsCanImage = '/attached_assets/generated_images/welchs_grape_juice_can.png';
const plainRiceBowlImage = '/attached_assets/generated_images/plain_white_rice_bowl.png';

// Phoaini menu images
const phoBowlImage = '/attached_assets/generated_images/pho_bowl_vietnamese_noodle_soup.png';
const phoSetImage = '/attached_assets/generated_images/pho_rice_noodles_with_karaage_set.png';
const spicyPhoBowlImage = '/attached_assets/generated_images/spicy_beef_pho_vietnamese_soup.png';
const beefBrisketPhoImage = '/attached_assets/generated_images/beef_brisket_pho_authentic.png';
const shrimpWontonPhoImage = '/attached_assets/generated_images/shrimp_wonton_pho_authentic.png';
const chickenPhoImage = '/attached_assets/generated_images/chicken_pho_authentic.png';
const sweetPotatoSpringRollsImage = '/attached_assets/generated_images/sweet_potato_spring_rolls_homemade.png';
const karaafeImage = '/attached_assets/generated_images/karaage_fried_chicken_authentic.png';
const shrimpRollsImage = '/attached_assets/generated_images/shrimp_spring_rolls_authentic.png';
const springRollsImage = '/attached_assets/generated_images/spring_rolls_authentic_cha_gio.png';

// K-Ang (크앙분식) menu images
const chickenMayoBowlImage = '/attached_assets/generated_images/chicken_mayo_rice_bowl.png';
const tunaMayoBowlImage = '/attached_assets/generated_images/tuna_mayo_rice_bowl.png';
const spamMayoBowlImage = '/attached_assets/generated_images/spam_mayo_rice_bowl.png';
const tteokTtuiSundaeSetImage = '/attached_assets/generated_images/tteokbokki_fried_sundae_set.png';
const samgyeopsalJjolmyeonImage = '/attached_assets/generated_images/samgyeopsal_jjolmyeon_noodles.png';
const spicyRedTteokbokkiImage = '/attached_assets/generated_images/spicy_red_tteokbokki.png';
const roseTteokbokkiSausageImage = '/attached_assets/generated_images/rose_tteokbokki_orange-pink_sauce.png';

// Phoenix Shop menu images
const burgerClassicImage = '/attached_assets/generated_images/classic_burger_beef_patty.png';
const burgerCheeseImage = '/attached_assets/generated_images/cheeseburger_bacon.png';
const burgerSpecialImage = '/attached_assets/generated_images/special_burger_deluxe.png';
const burgerComboImage = '/attached_assets/generated_images/burger_combo_meal.png';
const pastaCarbonareImage = '/attached_assets/generated_images/pasta_carbonara_creamy.png';
const pastaBoloImage = '/attached_assets/generated_images/pasta_bolognese_meat.png';
const pastaMarinaraImage = '/attached_assets/generated_images/pasta_marinara_tomato.png';
const pastaPrimeImage = '/attached_assets/generated_images/pasta_cream_sauce_deluxe.png';
const kimbapTraditionalImage = '/attached_assets/generated_images/kimbap_traditional_vegetable.png';
const kimbapTunaImage = '/attached_assets/generated_images/tuna_kimbap_rolls.png';
const kimbapSpicyImage = '/attached_assets/generated_images/kimbap_spicy_korean.png';
const kimbapComboImage = '/attached_assets/generated_images/kimbap_combo_platter.png';
const yeolmuNaengmyeonImage = '/attached_assets/generated_images/yeolmoo_cold_noodles_bowl.png';
const yeolmuNaengkuksuImage = '/attached_assets/generated_images/yeolmoo_cold_noodle_soup.png';
const ramenImage2 = '/attached_assets/generated_images/korean_ramen_noodle_soup.png';
const tteokBokkeuyImage = '/attached_assets/generated_images/spicy_rice_cakes_tteok_bokeui.png';
const tteokManduGukImage = '/attached_assets/generated_images/rice_cake_dumpling_soup.png';
const tunaCannedBibimbapImage = '/attached_assets/generated_images/tuna_canned_bibimbap_bowl.png';
const kimchiKimchiBobssamImage = '/attached_assets/generated_images/kimchi_fried_rice.png';
const tradionalBibimbapImage = '/attached_assets/generated_images/traditional_bibimbap_bowl.png';
const shrimpFriedRiceImage = '/attached_assets/generated_images/shrimp_fried_rice.png';
const mulNaengmyeonImage = '/attached_assets/generated_images/cold_noodle_soup_mul_naengmyeon.png';
const bibimNaengmyeonImage = '/attached_assets/generated_images/spicy_bibim_cold_noodles.png';
const yukkejangImage = '/attached_assets/generated_images/spicy_beef_yukkejang_soup.png';

// Carbone menu images
const carbonaraPastaImage = '/attached_assets/generated_images/carbonara_pasta_with_cream_sauce.png';
const creamChickenPastaImage = '/attached_assets/generated_images/cream_sauce_chicken_pasta.png';
const garlicCarbonmyImage = '/attached_assets/generated_images/garlic_carbonara_spaghetti.png';
const rosePastaImage = '/attached_assets/generated_images/rose_cream_tomato_pasta.png';
const tomatoPastaImage = '/attached_assets/generated_images/tomato_sauce_spaghetti.png';
const tomatoChickenPastaImage = '/attached_assets/generated_images/tomato_sauce_chicken_pasta.png';
const alioOlioPastaImage = '/attached_assets/generated_images/aglio_e_olio_spaghetti.png';
const meatSaucePastaImage = '/attached_assets/generated_images/meat_sauce_spaghetti_bolognese.png';
const spicyCarbonaPastaImage = '/attached_assets/generated_images/spicy_carbonara_pasta.png';
const carbonaPizzaImage = '/attached_assets/generated_images/carbonara_pizza.png';
const seafoodPizzaImage = '/attached_assets/generated_images/seafood_pizza.png';
const pepperoniPizzaImage = '/attached_assets/generated_images/pepperoni_pizza.png';

// New York Burger menu images
const classicBeefBurgerImage = '/attached_assets/generated_images/classic_beef_burger.png';
const friedPorkCutletBurgerImage = '/attached_assets/generated_images/fried_pork_cutlet_burger.png';
const crispyChickenBurgerImage = '/attached_assets/generated_images/crispy_chicken_burger.png';
const grilledSquidBurgerImage = '/attached_assets/generated_images/grilled_squid_burger.png';
const beefBulgogiBurgerImage = '/attached_assets/generated_images/beef_bulgogi_burger.png';
const eggPattyBurgerImage = '/attached_assets/generated_images/egg_patty_burger.png';
const texasSteakBurgerImage = '/attached_assets/generated_images/texas_steak_burger.png';
const crispyChickenSandwichImage = '/attached_assets/generated_images/crispy_chicken_sandwich.png';
const doubleCheeseSandwichImage = '/attached_assets/generated_images/double_cheese_sandwich.png';
const crispyKoreanHotDogImage = '/attached_assets/generated_images/crispy_korean_hot_dog.png';
const charcoalGrilledChickenImage = '/attached_assets/generated_images/charcoal_grilled_chicken.png';
const crispyFriedChickenImage = '/attached_assets/generated_images/crispy_fried_chicken.png';
const butterFriesImage = '/attached_assets/generated_images/butter_fries.png';
const sweetPotatoFriesImage = '/attached_assets/generated_images/sweet_potato_fries.png';
const garlicFriesImage = '/attached_assets/generated_images/garlic_fries.png';
const garlicChickenBurgerImage = '/attached_assets/generated_images/garlic_chicken_burger.png';
const chiliChickenBurgerImage = '/attached_assets/generated_images/chili_chicken_burger.png';

// WM FOODMALL menu images
const wmDonkkastuImage = '/attached_assets/generated_images/crispy_pork_tonkatsu_cutlet.png';
const wmWangDonkkastuImage = '/attached_assets/generated_images/extra_large_pork_cutlet.png';
const wmCheeseDonkkastuImage = '/attached_assets/generated_images/cheese_topped_pork_cutlet.png';
const wmRoseDonkkastuImage = '/attached_assets/generated_images/rose_cream_pork_cutlet.png';
const wmCurryRiceImage = '/attached_assets/generated_images/curry_rice_with_chicken.png';
const wmTonkkastuCurryImage = '/attached_assets/generated_images/tonkatsu_curry_rice_set.png';
const wmJjajangmyeonImage = '/attached_assets/generated_images/black_bean_noodle_soup.png';
const wmJjajangmyeonSquidImage = '/attached_assets/generated_images/black_bean_noodles_with_squid.png';
const wmJjajangbapImage = '/attached_assets/generated_images/black_bean_rice.png';
const wmCornPotatoBapImage = '/attached_assets/generated_images/corn_potato_rice_bowl.png';
const wmJeyukDonbapImage = '/attached_assets/generated_images/pork_bulgogi_rice_bowl.png';
const wmKimchiJjigaeImage = '/attached_assets/generated_images/kimchi_tofu_stew.png';
const wmSundubuJjigaeImage = '/attached_assets/generated_images/silken_tofu_stew.png';
const wmJjamppongImage = '/attached_assets/generated_images/spicy_seafood_noodle_soup.png';
const wmKongnamulGukbapImage = '/attached_assets/generated_images/bean_sprout_soup_rice_bowl.png';
const ingCafeImage = '/attached_assets/KakaoTalk_20251118_143407098_08_1764658391334.jpg';
const bluepotCafeImage = '/attached_assets/KakaoTalk_20251117_130431284_06_1764658461357.jpg';

const tonkatsuImage = '/attached_assets/generated_images/Japanese_tonkatsu_crispy_cutlet_7a5d3f1b.png';
const phoImage = '/attached_assets/generated_images/Vietnamese_pho_noodle_soup_c9e2f6a4.png';
const ramenBowlImage = '/attached_assets/generated_images/Korean_ramen_broth_noodle_3d4c7b2e.png';
const vietnameseSaladImage = '/attached_assets/generated_images/Vietnamese_spring_roll_fresh_salad_9f1e3c5d.png';
const tteokbokkiToppingImage = '/attached_assets/generated_images/tteokbokki_with_ham_cheese_2b6d8f1a.png';
const friedItemImage = '/attached_assets/generated_images/Korean_fried_tofu_tempura_5e7a2c9b.png';
const spamRiceImage = '/attached_assets/generated_images/spam_mayo_rice_bowl_7c3e9a1f.png';

// Health Center Guide Images
const healthInsuranceFormImage = '/attached_assets/20251030_100231_1764128645441.jpg';
const requiredDocumentsImage = '/attached_assets/1763524227697_1764128661456.jpg';

export interface IStorage {
  // Restaurants
  getAllRestaurants(): Promise<Restaurant[]>;
  getRestaurant(id: string): Promise<Restaurant | undefined>;
  
  // Menus
  getMenusByRestaurant(restaurantId: string): Promise<Menu[]>;
  getAllMenus(): Promise<Menu[]>;
  
  // Facilities
  getAllFacilities(): Promise<Facility[]>;
  getFacility(id: string): Promise<Facility | undefined>;
  
  // Guides
  getGuidesByFacility(facilityId: string): Promise<Guide[]>;
  
  // Inquiries
  getAllInquiries(): Promise<Inquiry[]>;
  getInquiry(id: string): Promise<Inquiry | undefined>;
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  
  // Replies
  getRepliesByInquiry(inquiryId: string): Promise<Reply[]>;
  createReply(reply: InsertReply): Promise<Reply>;
  
  // Likes
  likeMenu(menuId: string): Promise<Menu | undefined>;
  unlikeMenu(menuId: string): Promise<Menu | undefined>;
}

export class MemStorage implements IStorage {
  private restaurants: Map<string, Restaurant>;
  private menus: Map<string, Menu>;
  private facilities: Map<string, Facility>;
  private guides: Map<string, Guide>;
  private inquiries: Map<string, Inquiry>;
  private replies: Map<string, Reply>;

  constructor() {
    this.restaurants = new Map();
    this.menus = new Map();
    this.facilities = new Map();
    this.guides = new Map();
    this.inquiries = new Map();
    this.replies = new Map();
    
    this.seedData();
  }

  private seedData() {
    // Seed Restaurants
    const restaurant1: Restaurant = {
      id: 'r1',
      name: '학생식당',
      nameEn: 'Student Cafeteria',
      category: 'restaurant',
      location: '학생회관 지하 1층 (건물 24)',
      locationEn: 'Student Union Building B1F (Building N.24)',
      hours: '11:00 - 14:00',
      mapLat: '35.96944',
      mapLng: '126.95735',
      imageUrl: cafeteriaInterior,
      status: 'open',
      crowdingLevel: 3,
    };
    
    const restaurant2: Restaurant = {
      id: 'r2',
      name: '카페테리아',
      nameEn: 'Cafeteria',
      category: 'restaurant',
      location: '학생회관 지하 1층 (건물 24)',
      locationEn: 'Student Union Building B1F (Building N.24)',
      hours: '10:00 - 17:00',
      mapLat: '35.96942',
      mapLng: '126.95740',
      imageUrl: cafeteriaKiosk,
      status: 'open',
      crowdingLevel: 2,
    };
    
    const restaurant3: Restaurant = {
      id: 'r3',
      name: '피닉스샵',
      nameEn: 'Phoenix Shop',
      category: 'restaurant',
      location: '학생회관 반층 (건물 24)',
      locationEn: 'Student Union Building Half Floor (Building N.24)',
      hours: '08:00 - 20:00',
      mapLat: '35.96946',
      mapLng: '126.95730',
      imageUrl: phoenixShopStorefront,
      status: 'open',
      crowdingLevel: 2,
    };
    
    const restaurant4: Restaurant = {
      id: 'r4',
      name: 'WM 카페테리아',
      nameEn: 'WM Cafeteria',
      category: 'restaurant',
      location: 'WM관 (원광보건대학교 WM테크노마켓)',
      locationEn: 'WM Building - Wonkwang Health University WM Techno Market',
      hours: '11:00 - 13:00',
      mapLat: '35.9708',
      mapLng: '126.9595',
      imageUrl: wmFoodmallInterior,
      status: 'open',
      crowdingLevel: 2,
    };

    this.restaurants.set(restaurant1.id, restaurant1);
    this.restaurants.set(restaurant2.id, restaurant2);
    this.restaurants.set(restaurant3.id, restaurant3);
    this.restaurants.set(restaurant4.id, restaurant4);

    // Seed Menus for Student Cafeteria (Real menu from image)
    // All menus are available daily (no dayOfWeek restriction)
    const studentMenus: InsertMenu[] = [
      // Main dishes 6,000 won
      { restaurantId: 'r1', name: '돼지고기김치찌개', nameEn: 'Pork Kimchi Stew', price: 6000, imageUrl: porkKimchiStewImage, hasPork: true, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r1', name: '차돌박이된장찌개', nameEn: 'Beef Brisket Doenjang Stew', price: 6000, imageUrl: beefDoenjangStewImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r1', name: '육개장칼국수', nameEn: 'Spicy Beef Noodle Soup', price: 6000, imageUrl: spicyBeefNoodleImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r1', name: '부대찌개', nameEn: 'Army Stew', price: 6000, imageUrl: armyStewImage, hasPork: true, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r1', name: '설렁탕', nameEn: 'Seolleongtang (Ox Bone Soup)', price: 6000, imageUrl: seolleongtangImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r1', name: '순두부찌개', nameEn: 'Soft Tofu Stew', price: 6000, imageUrl: softTofuStewImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r1', name: '소세지 오므라이스', nameEn: 'Sausage Omurice', price: 6000, imageUrl: sausageOmuriceImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r1', name: '가츠동', nameEn: 'Katsudon', price: 6000, imageUrl: katsudonImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r1', name: '치킨가스카레라이스', nameEn: 'Chicken Cutlet Curry Rice', price: 6000, imageUrl: chickenCurryImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r1', name: '탕짜밥(탕수육/짜장밥)', nameEn: 'Tangsuyuk & Jjajangbap Rice', price: 6000, imageUrl: tangsuyukImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r1', name: '새우튀김 알밥', nameEn: 'Fried Shrimp with Fish Roe Rice', price: 6000, imageUrl: shrimpRiceImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      
      // Premium dishes 6,500 won
      { restaurantId: 'r1', name: '대패삼겹숙주덮밥', nameEn: 'Thinly Sliced Pork Belly & Bean Sprouts Rice Bowl', price: 6500, imageUrl: porkBellySproutsImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r1', name: '닭강정 오므라이스', nameEn: 'Sweet & Spicy Chicken Omurice', price: 6500, imageUrl: dakGangjungOmuriceImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r1', name: '치즈제육덮밥', nameEn: 'Cheese Spicy Pork Rice Bowl', price: 6500, imageUrl: cheeseSpicyPorkImage, hasPork: true, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      
      // Budget dishes 5,500 won
      { restaurantId: 'r1', name: '치킨마요', nameEn: 'Chicken Mayo', price: 5500, imageUrl: chickenMayoImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r1', name: '떡볶이세트', nameEn: 'Tteokbokki Set', price: 5500, imageUrl: tteokbokkiSetImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r1', name: '불고기비빔밥', nameEn: 'Bulgogi Bibimbap', price: 5500, imageUrl: bulgogiBibimbapImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
    ];

    studentMenus.forEach(menu => {
      const id = randomUUID();
      this.menus.set(id, { ...menu, id, likeCount: 0 });
    });

    // Seed Menus for Cafeteria Kiosk (Sub-restaurant menus)
    const cafeteriaMenus: InsertMenu[] = [
      // Sub-restaurant 1: 만권화밥 (Mankwon Hwabap - Rice Bowls & Stews)
      { restaurantId: 'r2', name: '만권화밥 - 덮밥+김치찌개', nameEn: 'Mankwon - Rice Bowl + Kimchi Stew', price: 10000, imageUrl: manwonRiceBowlKimchiStewSet, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '만권화밥 - 바지락순두부찌개+덮밥', nameEn: 'Mankwon - Clam Soft Tofu Stew + Rice', price: 9800, imageUrl: manwonClamSoftTofuRiceSet, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '만권화밥 - 돼지김치찌개', nameEn: 'Mankwon - Pork Kimchi Stew', price: 6500, imageUrl: manwonPorkKimchiStew, hasPork: true, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '만권화밥 - 돼지김치찜', nameEn: 'Mankwon - Pork Kimchi Steamed', price: 7000, imageUrl: manwonPorkKimchiSteam, hasPork: true, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '만권화밥 - 바지락순두부찌개', nameEn: 'Mankwon - Clam Soft Tofu Stew', price: 7000, imageUrl: manwonClamSoftTofuStew, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      
      // Sub-restaurant 1 continued: 만권화밥 (More menus)
      { restaurantId: 'r2', name: '만권화밥 - 닭다리곰탕', nameEn: 'Mankwon - Chicken Leg Soup', price: 8000, imageUrl: chickenLegSoupImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '만권화밥 - 부대찌개', nameEn: 'Mankwon - Army Stew', price: 7000, imageUrl: choigodangArmyStewImage, hasPork: true, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '만권화밥 - 돼지불백덮밥', nameEn: 'Mankwon - Spicy Pork Bulgogi Rice Bowl', price: 6500, imageUrl: porkJowlBowlImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '만권화밥 - 바지락순두부+돼지볼베', nameEn: 'Mankwon - Clam Soft Tofu + Pork Jowl', price: 9000, imageUrl: porkJowlSoftTofuSetImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '만권화밥 - 직화소고기덮밥', nameEn: 'Mankwon - Grilled Beef Rice Bowl', price: 7000, imageUrl: grilledBeefBowlImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '만권화밥 - 바지락순두부+직화소고기', nameEn: 'Mankwon - Clam Soft Tofu + Grilled Beef', price: 9800, imageUrl: grilledBeefSoftTofuSetImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '만권화밥 - 직화소고기+김치찌개', nameEn: 'Mankwon - Grilled Beef + Kimchi Stew', price: 9800, imageUrl: grilledBeefKimchiSetImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '만권화밥 - 매운닭갈비덮밥', nameEn: 'Mankwon - Spicy Chicken Galbi Rice Bowl', price: 6500, imageUrl: spicyChickenGalbiBowlImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '만권화밥 - 바지락순두부+매운닭', nameEn: 'Mankwon - Clam Soft Tofu + Spicy Chicken', price: 9500, imageUrl: spicyChickenSoftTofuSetImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '만권화밥 - 매닭+김치찌개', nameEn: 'Mankwon - Spicy Chicken + Kimchi Stew', price: 9500, imageUrl: spicyChickenKimchiSetImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '만권화밥 - 간장닭김비덮밥', nameEn: 'Mankwon - Soy Sauce Chicken Rice Bowl', price: 6500, imageUrl: soyChickenBowlImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '만권화밥 - 바지락순두부+간장닭', nameEn: 'Mankwon - Clam Soft Tofu + Soy Sauce Chicken', price: 9500, imageUrl: soyChickenSoftTofuSetImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '만권화밥 - 간닭+김치찌개', nameEn: 'Mankwon - Soy Sauce Chicken + Kimchi Stew', price: 9500, imageUrl: soyChickenKimchiSetImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '만권화밥 - 알밥', nameEn: 'Mankwon - Roe Rice Bowl', price: 7000, imageUrl: roeRiceBowlImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      
      // Sub-restaurant 2: 최고당돈까스 (Choigodang Tonkatsu)
      { restaurantId: 'r2', name: '최고당돈까스 - 돈코츠라멘', nameEn: 'Choigodang - Tonkotsu Ramen', price: 7400, imageUrl: tonkotsuRamenImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 카레우동', nameEn: 'Choigodang - Curry Udon', price: 6000, imageUrl: curryUdonImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 로제우동', nameEn: 'Choigodang - Rose Cream Udon', price: 6000, imageUrl: orangeRoseCreamUdonImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 키라이라멘', nameEn: 'Choigodang - Curry Ramen', price: 7900, imageUrl: curryRamenImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 생등심+돈코츠라멘', nameEn: 'Choigodang - Raw Beef Tonkatsu + Tonkotsu Ramen', price: 13800, imageUrl: rawBeefTonkatsuSetImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 생등심+카레이라멘', nameEn: 'Choigodang - Raw Beef Tonkatsu + Curry Ramen', price: 14300, imageUrl: rawBeefCurryRamenSetImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 고구마치즈돈까스', nameEn: 'Choigodang - Sweet Potato Cheese Tonkatsu', price: 9500, imageUrl: sweetPotatoStuffedKatsuImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 체다치즈돈까스', nameEn: 'Choigodang - Cheddar Cheese Tonkatsu', price: 8900, imageUrl: cheddarCheeseKatsuImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 마늘돈까스', nameEn: 'Choigodang - Garlic Tonkatsu', price: 8900, imageUrl: garlicPorkKatsuImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 마늘돈까스+냠모임', nameEn: 'Choigodang - Garlic Tonkatsu + Side', price: 13400, imageUrl: garlicTonkatsuCurryUdonSetImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 마늘돈까스+우동', nameEn: 'Choigodang - Garlic Tonkatsu + Udon', price: 13400, imageUrl: garlicTonkatsuRoseUdonSetImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 마늘돈까스+크레이미우콘멘', nameEn: 'Choigodang - Garlic Tonkatsu + Creamy Ramen', price: 14400, imageUrl: garlicTonkatsuCreamyRamenSetImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 마늘돈까스+쭉멘', nameEn: 'Choigodang - Garlic Tonkatsu + Tsukumen', price: 13400, imageUrl: garlicTonkatsuTsukumenSetImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 로제돈까스+우동', nameEn: 'Choigodang - Rose Tonkatsu + Udon', price: 13400, imageUrl: roseTonkatsuCurryUdonSetImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 로제돈까스+크레이미우콘멘', nameEn: 'Choigodang - Rose Tonkatsu + Creamy Ramen', price: 14400, imageUrl: roseTonkatsuCreamyRamenSetImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 로제돈까스+쭉멘', nameEn: 'Choigodang - Rose Tonkatsu + Tsukumen', price: 13400, imageUrl: roseTonkatsuTsukumenSetImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 매운돈까스', nameEn: 'Choigodang - Spicy Tonkatsu', price: 8900, imageUrl: spicyPorkKatsuImage, hasPork: true, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 트리플크림돈까스', nameEn: 'Choigodang - Triple Cream Tonkatsu', price: 9500, imageUrl: tripleCreamKatsuImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 치킨안심돈까스', nameEn: 'Choigodang - Chicken Breast Tonkatsu', price: 7900, imageUrl: chickenBreastKatsuImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 콜라', nameEn: 'Choigodang - Coca Cola', price: 2000, imageUrl: colaCanImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 제로콜라', nameEn: 'Choigodang - Coke Zero', price: 2000, imageUrl: cokeZeroCanImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 사이다', nameEn: 'Choigodang - Sprite', price: 2000, imageUrl: spriteCanImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 환타-파인애플', nameEn: 'Choigodang - Fanta Pineapple', price: 2000, imageUrl: fantaPineappleCanImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 웰치스', nameEn: 'Choigodang - Welchs', price: 2000, imageUrl: welchsCanImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '최고당돈까스 - 공기밥', nameEn: 'Choigodang - Plain Rice', price: 1000, imageUrl: plainRiceBowlImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      
      // Sub-restaurant 3: 포아이니
      { restaurantId: 'r2', name: '포아이니 - 차종농', nameEn: 'Phoaini - Cha Chung Nong', price: 6900, imageUrl: phoBowlImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '포아이니 - Pho 정식세트(1인)', nameEn: 'Phoaini - Pho Jeungsik Set (1 person)', price: 11400, imageUrl: phoSetImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '포아이니 - 메운 차돌양지쌀국수', nameEn: 'Phoaini - Spicy Beef Brisket Pho', price: 7700, imageUrl: spicyPhoBowlImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '포아이니 - 차돌양지쌀국수', nameEn: 'Phoaini - Beef Brisket Pho', price: 7400, imageUrl: beefBrisketPhoImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '포아이니 - 새우완탕쌀국수', nameEn: 'Phoaini - Shrimp Wonton Pho', price: 8400, imageUrl: shrimpWontonPhoImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '포아이니 - 치킨쌀국수', nameEn: 'Phoaini - Chicken Pho', price: 8400, imageUrl: chickenPhoImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '포아이니 - 고구마스프링롤', nameEn: 'Phoaini - Sweet Potato Spring Rolls', price: 3000, imageUrl: sweetPotatoSpringRollsImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '포아이니 - 가라아게 5P', nameEn: 'Phoaini - Fried Chicken Karaage 5pc', price: 4500, imageUrl: karaafeImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '포아이니 - 새우롱 5P', nameEn: 'Phoaini - Shrimp Rolls 5pc', price: 5000, imageUrl: shrimpRollsImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '포아이니 - 짜조 2P', nameEn: 'Phoaini - Spring Rolls 2pc', price: 4500, imageUrl: springRollsImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      
      // Sub-restaurant 4: 크앙분식
      { restaurantId: 'r2', name: '크앙분식 - 치킨마요덮밥', nameEn: 'K-Ang - Chicken Mayo Rice Bowl', price: 6500, imageUrl: chickenMayoBowlImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '크앙분식 - 참치마요덮밥', nameEn: 'K-Ang - Tuna Mayo Rice Bowl', price: 6500, imageUrl: tunaMayoBowlImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '크앙분식 - 스팸마요덮밥', nameEn: 'K-Ang - Spam Mayo Rice Bowl', price: 7000, imageUrl: spamMayoBowlImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '크앙분식 - 떡튀순세트', nameEn: 'K-Ang - Tteokbokki Fried Sundae Set', price: 12400, imageUrl: tteokTtuiSundaeSetImage, hasPork: true, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '크앙분식 - 삼겹살쫄면', nameEn: 'K-Ang - Samgyeopsal Jjolmyeon', price: 9900, imageUrl: samgyeopsalJjolmyeonImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '크앙분식 - 크앙떡볶이', nameEn: 'K-Ang - K-Ang Tteokbokki', price: 4900, imageUrl: spicyRedTteokbokkiImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r2', name: '크앙분식 - 크앙로제떡볶이', nameEn: 'K-Ang - K-Ang Rose Tteokbokki', price: 9500, imageUrl: roseTteokbokkiSausageImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
    ];
    cafeteriaMenus.forEach(menu => {
      const id = randomUUID();
      this.menus.set(id, { ...menu, id, likeCount: 0 });
    });

    // Seed Menus for Phoenix Shop (3 sub-restaurants)
    const phoenixShopMenus: InsertMenu[] = [
      // Sub-restaurant 1: 뉴욕버거
      { restaurantId: 'r3', name: '뉴욕버거 - 뉴욕버거 (단품/세트)', nameEn: 'New York Burger - Classic Burger', price: 5400, imageUrl: classicBeefBurgerImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '뉴욕버거 - 통세우버거 (단품/세트)', nameEn: 'New York Burger - Fried Shrimp Burger', price: 5400, imageUrl: friedPorkCutletBurgerImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '뉴욕버거 - 갈릭치킹버거 (단품/세트)', nameEn: 'New York Burger - Garlic Chicken Burger', price: 5300, imageUrl: garlicChickenBurgerImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '뉴욕버거 - 칠리치킹버거 (단품/세트)', nameEn: 'New York Burger - Chili Chicken Burger', price: 5300, imageUrl: chiliChickenBurgerImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '뉴욕버거 - 오징어버거 (단품/세트)', nameEn: 'New York Burger - Squid Burger', price: 4900, imageUrl: grilledSquidBurgerImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '뉴욕버거 - 비프풀고기버거 (단품/세트)', nameEn: 'New York Burger - Beef Bulgogi Burger', price: 3900, imageUrl: beefBulgogiBurgerImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '뉴욕버거 - 에그프레쉬버거 (단품/세트)', nameEn: 'New York Burger - Egg Patty Burger', price: 3300, imageUrl: eggPattyBurgerImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '뉴욕버거 - 콜드테이더버거 (단품/세트)', nameEn: 'New York Burger - Cold Tater Burger', price: 7900, imageUrl: texasSteakBurgerImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '뉴욕버거 - 노우런드치즈 (단품/세트)', nameEn: 'New York Burger - Double Cheese Sandwich', price: 6200, imageUrl: doubleCheeseSandwichImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '뉴욕버거 - 텍사스스테이크 (단품/세트)', nameEn: 'New York Burger - Texas Steak Burger', price: 5600, imageUrl: texasSteakBurgerImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '뉴욕버거 - 싱금치킨다더치즈 (단품/세트)', nameEn: 'New York Burger - Spicy Chicken Sandwich', price: 5600, imageUrl: crispyChickenSandwichImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '뉴욕버거 - 스위트 핫도그 (단품/세트)', nameEn: 'New York Burger - Sweet Hot Dog', price: 5100, imageUrl: crispyKoreanHotDogImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '뉴욕버거 - 숯불치킨', nameEn: 'New York Burger - Charcoal Grilled Chicken', price: 5200, imageUrl: charcoalGrilledChickenImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '뉴욕버거 - 크리스피 치킹', nameEn: 'New York Burger - Crispy Fried Chicken', price: 5600, imageUrl: crispyFriedChickenImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '뉴욕버거 - 버터프라이즈', nameEn: 'New York Burger - Butter Fries', price: 2900, imageUrl: butterFriesImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '뉴욕버거 - 고구마튀김', nameEn: 'New York Burger - Sweet Potato Fries', price: 3000, imageUrl: sweetPotatoFriesImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '뉴욕버거 - 갈릭프라이즈', nameEn: 'New York Burger - Garlic Fries', price: 4500, imageUrl: garlicFriesImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      
      // Sub-restaurant 2: 까르보네
      { restaurantId: 'r3', name: '까르보네 - 카르보나라', nameEn: 'Carbone - Carbonara Pasta', price: 4800, imageUrl: carbonaraPastaImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '까르보네 - 크림 치킨', nameEn: 'Carbone - Cream Chicken Pasta', price: 5300, imageUrl: creamChickenPastaImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '까르보네 - 마늘 까르보나라', nameEn: 'Carbone - Garlic Carbonara', price: 5300, imageUrl: garlicCarbonmyImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '까르보네 - 로제', nameEn: 'Carbone - Rose Sauce', price: 5300, imageUrl: rosePastaImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '까르보네 - 토마로', nameEn: 'Carbone - Tomato Sauce', price: 4800, imageUrl: tomatoPastaImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '까르보네 - 토마로 치킨', nameEn: 'Carbone - Tomato Chicken', price: 5300, imageUrl: tomatoChickenPastaImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '까르보네 - 아이올리', nameEn: 'Carbone - Aglio e Olio', price: 5300, imageUrl: alioOlioPastaImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '까르보네 - 미트', nameEn: 'Carbone - Meat Sauce', price: 4800, imageUrl: meatSaucePastaImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '까르보네 - 웅글래', nameEn: 'Carbone - Spicy Carbonara', price: 5300, imageUrl: spicyCarbonaPastaImage, hasPork: true, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '까르보네 - 까르보나라 피자', nameEn: 'Carbone - Carbonara Pizza', price: 9800, imageUrl: carbonaPizzaImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '까르보네 - 씨푸드 피자', nameEn: 'Carbone - Seafood Pizza', price: 11000, imageUrl: seafoodPizzaImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '까르보네 - 페페로니 피자', nameEn: 'Carbone - Pepperoni Pizza', price: 9900, imageUrl: pepperoniPizzaImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      
      // Sub-restaurant 3: 김밥천국
      { restaurantId: 'r3', name: '김밥천국 - 참치 김밥', nameEn: 'Kimbap Cheonkook - Tuna Kimbap', price: 5000, imageUrl: kimbapTunaImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '김밥천국 - 열무냉면', nameEn: 'Kimbap Cheonkook - Yeolmoo Cold Noodles', price: 5000, imageUrl: yeolmuNaengmyeonImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '김밥천국 - 열무국수', nameEn: 'Kimbap Cheonkook - Yeolmoo Noodles', price: 5000, imageUrl: yeolmuNaengkuksuImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '김밥천국 - 라면', nameEn: 'Kimbap Cheonkook - Ramen', price: 3500, imageUrl: ramenImage2, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '김밥천국 - 참치김밥+라면', nameEn: 'Kimbap Cheonkook - Tuna Kimbap + Ramen Set', price: 5500, imageUrl: kimbapTunaImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '김밥천국 - 떡볶이', nameEn: 'Kimbap Cheonkook - Tteok Bokkeui', price: 4500, imageUrl: tteokBokkeuyImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '김밥천국 - 떡만두국', nameEn: 'Kimbap Cheonkook - Tteok Mandu Guk', price: 4500, imageUrl: tteokManduGukImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '김밥천국 - 참치비빔밥', nameEn: 'Kimbap Cheonkook - Tuna Bibimbap', price: 5000, imageUrl: tunaCannedBibimbapImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '김밥천국 - 비빔밥', nameEn: 'Kimbap Cheonkook - Bibimbap', price: 4500, imageUrl: tradionalBibimbapImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '김밥천국 - 육개장', nameEn: 'Kimbap Cheonkook - Yukkejang', price: 5500, imageUrl: yukkejangImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '김밥천국 - 김치볶음밥', nameEn: 'Kimbap Cheonkook - Kimchi Fried Rice', price: 5000, imageUrl: kimchiKimchiBobssamImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '김밥천국 - 새우볶음밥', nameEn: 'Kimbap Cheonkook - Shrimp Fried Rice', price: 5000, imageUrl: shrimpFriedRiceImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '김밥천국 - 물냉면', nameEn: 'Kimbap Cheonkook - Mul Naengmyeon', price: 5000, imageUrl: mulNaengmyeonImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '김밥천국 - 비빔냉면', nameEn: 'Kimbap Cheonkook - Bibim Naengmyeon', price: 5000, imageUrl: bibimNaengmyeonImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r3', name: '김밥천국 - 비빔국수', nameEn: 'Kimbap Cheonkook - Bibim Noodles', price: 5000, imageUrl: bibimNaengmyeonImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
    ];

    phoenixShopMenus.forEach(menu => {
      const id = randomUUID();
      this.menus.set(id, { ...menu, id, likeCount: 0 });
    });

    // Seed Menus for WM FOODMALL (양식, 중식, 한식)
    const wmFoodmallMenus: InsertMenu[] = [
      // 양식 (Western)
      { restaurantId: 'r4', name: '돈까스', nameEn: 'Pork Tonkatsu', price: 5800, imageUrl: wmDonkkastuImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r4', name: '왕돈까스', nameEn: 'Extra Large Pork Tonkatsu', price: 6800, imageUrl: wmWangDonkkastuImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r4', name: '치즈돈까스', nameEn: 'Cheese Tonkatsu', price: 6500, imageUrl: wmCheeseDonkkastuImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r4', name: '로제돈까스', nameEn: 'Rose Cream Tonkatsu', price: 6500, imageUrl: wmRoseDonkkastuImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r4', name: '커리라이스', nameEn: 'Curry Rice', price: 5300, imageUrl: wmCurryRiceImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r4', name: '돈까스+커리라이스', nameEn: 'Tonkatsu & Curry Rice Set', price: 6500, imageUrl: wmTonkkastuCurryImage, hasPork: true, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      
      // 중식 (Chinese)
      { restaurantId: 'r4', name: '짜장면', nameEn: 'Jjajangmyeon', price: 5000, imageUrl: wmJjajangmyeonImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r4', name: '짜장면(곱빼기)', nameEn: 'Jjajangmyeon (Extra Portion)', price: 6000, imageUrl: wmJjajangmyeonSquidImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r4', name: '짬뽕', nameEn: 'Jjamppong', price: 6200, imageUrl: wmJjamppongImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r4', name: '짜장밥', nameEn: 'Black Bean Rice', price: 5000, imageUrl: wmJjajangbapImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r4', name: '콩나물국밥', nameEn: 'Bean Sprout Soup Rice Bowl', price: 4000, imageUrl: wmKongnamulGukbapImage, hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      
      // 한식 (Korean)
      { restaurantId: 'r4', name: '제육덮밥', nameEn: 'Pork Bulgogi Rice Bowl', price: 6500, imageUrl: wmJeyukDonbapImage, hasPork: true, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r4', name: '김치찌개', nameEn: 'Kimchi Stew with Tofu', price: 6200, imageUrl: wmKimchiJjigaeImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'r4', name: '순두부찌개', nameEn: 'Silken Tofu Stew', price: 5500, imageUrl: wmSundubuJjigaeImage, hasPork: false, isSpicy: true, isVegetarian: false, dayOfWeek: null },
    ];

    wmFoodmallMenus.forEach(menu => {
      const id = randomUUID();
      this.menus.set(id, { ...menu, id, likeCount: 0 });
    });

    // Seed Facilities
    const facility1: Facility = {
      id: 'f1',
      name: '대학서점',
      nameEn: 'University Bookstore',
      type: 'bookstore',
      location: '학생회관 피닉스샵 안',
      locationEn: 'Inside Phoenix Shop, Student Union Building (Building N.24)',
      hours: '08:30 - 18:00 (Mon - Fri)',
      mapLat: '35.96945',
      mapLng: '126.95750',
      imageUrl: bookstoreInterior,
      description: '교재, 문구류, 생활용품을 판매합니다. 온라인 주문도 가능합니다.',
      descriptionEn: 'Textbooks, stationery, and daily necessities available. Online ordering supported.',
    };

    const facility2: Facility = {
      id: 'f2',
      name: '보건소',
      nameEn: 'Health Clinic Center',
      type: 'health_center',
      location: '학생회관 2층',
      locationEn: 'Student Union Building 2F (Building N.24)',
      hours: '09:00 - 17:00 (Mon - Fri)',
      mapLat: '35.96950',
      mapLng: '126.95750',
      imageUrl: healthCenterInterior,
      description: '학생 건강 검진 및 의료 서비스를 제공합니다.\n\n혜택:\n• 공제급여: 병원 진료비의 70% 환급\n• 매주 목요일: 무료 진료\n• 무료 약 처방\n• InBody 검사: 체지방 정밀 측정',
      descriptionEn: 'Health check-ups and medical services for students.\n\nBenefits:\n• Health Reimbursement: 70% of hospital bills covered\n• Free Consultation: Every Thursday\n• Free Medicine: Available upon consultation\n• InBody Analysis: Body composition measurement',
    };

    this.facilities.set(facility1.id, facility1);
    this.facilities.set(facility2.id, facility2);

    // Seed Cafes
    const cafe1: Restaurant = {
      id: 'c1',
      name: 'ING',
      nameEn: 'ING',
      category: 'cafe',
      location: '학생회관 1층 (건물 24)',
      locationEn: 'Student Union Building 1F (Building N.24)',
      hours: '08:00 - 20:00',
      mapLat: '35.96950',
      mapLng: '126.95745',
      imageUrl: ingCafeImage,
      status: 'open',
      crowdingLevel: 2,
    };

    const cafe2a: Restaurant = {
      id: 'c2_sanbup',
      name: 'BLUE POT',
      nameEn: 'BLUE POT',
      category: 'cafe',
      location: '사범대학 (건물 72)',
      locationEn: 'College of Education (Building N.72)',
      hours: '07:00 - 22:00',
      mapLat: '35.9708',
      mapLng: '126.9605',
      imageUrl: bluepotCafeImage,
      status: 'open',
      crowdingLevel: 1,
    };

    const cafe2b: Restaurant = {
      id: 'c2_sanbup2',
      name: 'BLUE POT',
      nameEn: 'BLUE POT',
      category: 'cafe',
      location: '새천년관 (건물 57 경영대)',
      locationEn: 'Millennium Hall - Building 57 Business School',
      hours: '07:00 - 22:00',
      mapLat: '35.9705335',
      mapLng: '126.9586536',
      imageUrl: bluepotCafeImage,
      status: 'open',
      crowdingLevel: 1,
    };

    const cafe2c: Restaurant = {
      id: 'c2_sanbup3',
      name: 'BLUE POT',
      nameEn: 'BLUE POT',
      category: 'cafe',
      location: '개벽관 (건물 31)',
      locationEn: 'Gaebyek Hall (Building N.31)',
      hours: '07:00 - 22:00',
      mapLat: '35.9713',
      mapLng: '126.9603',
      imageUrl: bluepotCafeImage,
      status: 'open',
      crowdingLevel: 1,
    };

    this.restaurants.set(cafe1.id, cafe1);
    this.restaurants.set(cafe2a.id, cafe2a);
    this.restaurants.set(cafe2b.id, cafe2b);
    this.restaurants.set(cafe2c.id, cafe2c);

    // Seed Menus for ING Cafe
    const ingMenus: InsertMenu[] = [
      // Signature
      { restaurantId: 'c1', name: '아메리카노', nameEn: 'Americano', price: 4500, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c1', name: '라떼', nameEn: 'Latte', price: 4500, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c1', name: '바닐라라떼', nameEn: 'Vanilla Latte', price: 4500, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c1', name: '카라멜마끼아또', nameEn: 'Caramel Macchiato', price: 4900, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c1', name: '카푸치노', nameEn: 'Cappuccino', price: 4500, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c1', name: '카카오', nameEn: 'Hot Chocolate', price: 4500, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      
      // Coffee
      { restaurantId: 'c1', name: '에스프레소', nameEn: 'Espresso', price: 3700, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c1', name: '더블샷', nameEn: 'Double Shot', price: 3700, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c1', name: '핫초콜릿', nameEn: 'Hot Chocolate', price: 4500, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      
      // Smoothie & Juice
      { restaurantId: 'c1', name: '딸기스무디', nameEn: 'Strawberry Smoothie', price: 4300, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c1', name: '바나나스무디', nameEn: 'Banana Smoothie', price: 4500, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      
      // Ade & Frappe
      { restaurantId: 'c1', name: '초콜칩프라페', nameEn: 'Chocolate Chip Frappe', price: 5500, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c1', name: '민트초콜릿프라페', nameEn: 'Mint Chocolate Frappe', price: 5800, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      
      // Tea
      { restaurantId: 'c1', name: '얼그레이티', nameEn: 'Earl Grey Tea', price: 3800, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c1', name: '녹차', nameEn: 'Green Tea', price: 3500, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      
      // Waffle
      { restaurantId: 'c1', name: '버터와플', nameEn: 'Butter Waffle', price: 3800, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c1', name: '초콜릿와플', nameEn: 'Chocolate Waffle', price: 4000, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
    ];

    ingMenus.forEach(menu => {
      const id = randomUUID();
      this.menus.set(id, { ...menu, id, likeCount: 0 });
    });

    // Seed Menus for BLUEPOT Cafe (All 3 locations - same menu)
    const bluepotMenus: InsertMenu[] = [
      // COFFEE
      { restaurantId: 'c2_sanbup', name: '스페셜 아메리카노', nameEn: 'Special Americano', price: 2800, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '아메리카노', nameEn: 'Americano', price: 1800, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '에스프레소', nameEn: 'Espresso', price: 1800, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '헤이즐넛', nameEn: 'Hazelnut', price: 2300, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '카페라떼/카푸치노', nameEn: 'Cafe Latte/Cappuccino', price: 2900, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '카페라떼 바닐라/카라멜/헤이즐넛', nameEn: 'Cafe Latte Vanilla/Caramel/Hazelnut', price: 3300, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '카페모카 다크/카라멜', nameEn: 'Cafe Mocha Dark/Caramel', price: 3600, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '카라멜마끼아또', nameEn: 'Caramel Macchiato', price: 3600, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      
      // LATTE
      { restaurantId: 'c2_sanbup', name: '달콤 밀크크림/타이유자', nameEn: 'Sweet Milk Cream/Thai Yuzu', price: 4100, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '초콜롱라떼', nameEn: 'Chokollong Latte', price: 4100, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '뉴딸기라떼', nameEn: 'New Strawberry Latte', price: 3700, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '초콜릿 다크', nameEn: 'Chocolate Dark Latte', price: 2900, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '고구마라떼/녹물라떼', nameEn: 'Sweet Potato Latte/Greens Latte', price: 3200, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '제주 쌀 바지시떼/카라멜라떼', nameEn: 'Jeju Rice Barley Tea/Caramel Latte', price: 3200, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '민트초콜라떼', nameEn: 'Mint Chocolate Latte', price: 3400, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '아인슈페너 초콜', nameEn: 'Einspaenner Choco', price: 3700, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '엘리자베스 스페셜 티', nameEn: 'Elisabeth Special Tea', price: 3000, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '엘리자베스 딸기/레몬', nameEn: 'Elisabeth Strawberry/Lemon', price: 3800, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      
      // TEA
      { restaurantId: 'c2_sanbup', name: '피치 아이스티', nameEn: 'Peach Ice Tea', price: 2200, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '허브티', nameEn: 'Herbal Tea', price: 2000, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '녹차', nameEn: 'Green Tea', price: 2000, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '히비스쿠스', nameEn: 'Hibiscus', price: 2200, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '히비스쿠스 유자/캐몬', nameEn: 'Hibiscus Yuzu/Lemon', price: 2900, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '레몬/유자/유자차', nameEn: 'Lemon/Yuzu/Yuzu Tea', price: 2400, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '대추차/진저티', nameEn: 'Jujube/Ginger Tea', price: 3200, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '애플롱블랙티/곡자블랙티', nameEn: 'Apple Green Tea/Grapefruit Black Tea', price: 3500, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      
      // JUICE
      { restaurantId: 'c2_sanbup', name: '주스 딸기/바나나/키위/망고', nameEn: 'Juice Strawberry/Banana/Kiwi/Mango', price: 4000, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '주스 딸기바나나/초콜바나나/키위바나나', nameEn: 'Juice Strawberry Banana/Choco Banana/Kiwi Banana', price: 4200, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '아보카도바나나주스', nameEn: 'Avocado Banana Juice', price: 4700, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      
      // FRAPPE & BUBBLE
      { restaurantId: 'c2_sanbup', name: '프라페 모카/카라멜/자몽/민트초콜', nameEn: 'Frappe Mocha/Caramel/Grapefruit/Mint Choco', price: 4200, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '프라페 쿠키/바닐라/유자/주차 말차', nameEn: 'Frappe Cookie/Vanilla/Yuzu/Green Tea Matcha', price: 4200, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '미드나잇 초콜프라페', nameEn: 'Midnight Choco Frappe', price: 4500, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
      { restaurantId: 'c2_sanbup', name: '타로버블티', nameEn: 'Taro Bubbletea', price: 4100, imageUrl: '', hasPork: false, isSpicy: false, isVegetarian: false, dayOfWeek: null },
    ];

    // Add same menus for all 3 BLUEPOT locations
    const bluepotLocationIds = ['c2_sanbup', 'c2_sanbup2', 'c2_sanbup3'];
    bluepotLocationIds.forEach(locationId => {
      bluepotMenus.forEach(menu => {
        const id = randomUUID();
        this.menus.set(id, { ...menu, restaurantId: locationId, id, likeCount: 0 });
      });
    });

    // Seed Guides
    const guide1: Guide = {
      id: 'g1',
      facilityId: 'f1',
      title: '교재 주문 방법',
      titleEn: 'How to Order Textbooks',
      content: JSON.stringify([
        '서점 카운터에서 주문서를 받습니다.',
        '학과, 교재명, 수량을 적습니다.',
        '학생증을 제시하고 결제합니다.',
        '3-5일 후 문자로 도착 알림을 받습니다.',
        '학생증을 가지고 서점에서 교재를 수령합니다.',
      ]),
      contentEn: JSON.stringify([
        'Get an order form at the bookstore counter.',
        'Fill in department, book title, and quantity.',
        'Present your student ID and make payment.',
        'Receive SMS notification in 3-5 days.',
        'Pick up textbooks at bookstore with student ID.',
      ]),
    };

    // Add language properties for other languages (fallback to English)
    (guide1 as any).titleUz = guide1.titleEn;
    (guide1 as any).contentUz = guide1.contentEn;
    (guide1 as any).titleVi = guide1.titleEn;
    (guide1 as any).contentVi = guide1.contentEn;
    (guide1 as any).titleZh = guide1.titleEn;
    (guide1 as any).contentZh = guide1.contentEn;

    const guide2: Guide = {
      id: 'g2',
      facilityId: 'f2',
      title: '건강공제 신청 방법',
      titleEn: 'How to Apply for Health Insurance',
      content: JSON.stringify([
        { type: 'text', text: '1단계: 병원 방문' },
        { type: 'text', text: '병원에서 진료를 받고 영수증을 받습니다.' },
        { type: 'text', text: '2단계: 센터 방문' },
        { type: 'text', text: '건강공제센터(학생회관 2층)에 방문합니다.' },
        { type: 'text', text: '3단계: 신청서 작성' },
        { type: 'text', text: '신청서에 다음 사항을 정확하게 기입합니다:' },
        { type: 'text', text: '- 이름, 학번, 연락처' },
        { type: 'text', text: '- 진료 병원명, 진료 날짜' },
        { type: 'text', text: '- 진료 내용(진료과 및 증상)' },
        { type: 'image', url: healthInsuranceFormImage, alt: '건강공제 신청서 양식' },
        { type: 'text', text: '4단계: 필요서류 준비' },
        { type: 'text', text: '다음 서류를 준비합니다:' },
        { type: 'text', text: '- 병원 영수증(원본)' },
        { type: 'text', text: '- 진료비 영수증' },
        { type: 'text', text: '- 통장 사본(앞면)' },
        { type: 'text', text: '- 학생증 사본' },
        { type: 'image', url: requiredDocumentsImage, alt: '필요서류 목록' },
        { type: 'text', text: '5단계: 서류 제출' },
        { type: 'text', text: '작성한 신청서와 필요서류를 함께 제출합니다.' },
        { type: 'text', text: '6단계: 검토' },
        { type: 'text', text: '센터에서 내용을 검토합니다 (약 3-5일 소요).' },
        { type: 'text', text: '7단계: 환급' },
        { type: 'text', text: '승인 후 등록한 통장으로 환급금이 입금됩니다 (2-3주 소요).' },
      ]),
      contentEn: JSON.stringify([
        { type: 'text', text: 'Step 1: Hospital Visit' },
        { type: 'text', text: 'Receive medical treatment and get a receipt from the hospital.' },
        { type: 'text', text: 'Step 2: Visit the Center' },
        { type: 'text', text: 'Visit the Health Insurance Center (Student Union Building 2F).' },
        { type: 'text', text: 'Step 3: Fill Application Form' },
        { type: 'text', text: 'Fill out the application form with the following information:' },
        { type: 'text', text: '- Name, Student ID, Contact number' },
        { type: 'text', text: '- Hospital name, Treatment date' },
        { type: 'text', text: '- Details of treatment (department and symptoms)' },
        { type: 'image', url: healthInsuranceFormImage, alt: 'Health Insurance Application Form' },
        { type: 'text', text: 'Step 4: Prepare Required Documents' },
        { type: 'text', text: 'Prepare the following documents:' },
        { type: 'text', text: '- Hospital receipt (original)' },
        { type: 'text', text: '- Medical expense receipt' },
        { type: 'text', text: '- Bank account copy (front)' },
        { type: 'text', text: '- Student ID copy' },
        { type: 'image', url: requiredDocumentsImage, alt: 'Required Documents Checklist' },
        { type: 'text', text: 'Step 5: Submit Documents' },
        { type: 'text', text: 'Submit the completed application form with all required documents.' },
        { type: 'text', text: 'Step 6: Review' },
        { type: 'text', text: 'The center will review your submission (approximately 3-5 days).' },
        { type: 'text', text: 'Step 7: Reimbursement' },
        { type: 'text', text: 'Upon approval, reimbursement will be deposited to your registered account (takes 2-3 weeks).' },
      ]),
    };

    // Add language properties for other languages (fallback to English)
    (guide2 as any).titleUz = guide2.titleEn;
    (guide2 as any).contentUz = guide2.contentEn;
    (guide2 as any).titleVi = guide2.titleEn;
    (guide2 as any).contentVi = guide2.contentEn;
    (guide2 as any).titleZh = guide2.titleEn;
    (guide2 as any).contentZh = guide2.contentEn;

    this.guides.set(guide1.id, guide1);
    this.guides.set(guide2.id, guide2);
  }

  // Restaurants
  async getAllRestaurants(): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values());
  }

  async getRestaurant(id: string): Promise<Restaurant | undefined> {
    return this.restaurants.get(id);
  }

  // Menus
  async getMenusByRestaurant(restaurantId: string): Promise<Menu[]> {
    return Array.from(this.menus.values()).filter(
      menu => menu.restaurantId === restaurantId
    );
  }

  async getAllMenus(): Promise<Menu[]> {
    return Array.from(this.menus.values());
  }

  // Facilities
  async getAllFacilities(): Promise<Facility[]> {
    return Array.from(this.facilities.values());
  }

  async getFacility(id: string): Promise<Facility | undefined> {
    return this.facilities.get(id);
  }

  // Guides
  async getGuidesByFacility(facilityId: string): Promise<Guide[]> {
    return Array.from(this.guides.values()).filter(
      guide => guide.facilityId === facilityId
    );
  }

  // Inquiries
  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values()).sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const id = randomUUID();
    const newInquiry: Inquiry = {
      id,
      ...inquiry,
      titleKo: inquiry.titleKo ?? null,
      titleEn: inquiry.titleEn ?? null,
      titleUz: inquiry.titleUz ?? null,
      titleVi: inquiry.titleVi ?? null,
      titleZh: inquiry.titleZh ?? null,
      contentKo: inquiry.contentKo ?? null,
      contentEn: inquiry.contentEn ?? null,
      contentUz: inquiry.contentUz ?? null,
      contentVi: inquiry.contentVi ?? null,
      contentZh: inquiry.contentZh ?? null,
    };
    this.inquiries.set(id, newInquiry);
    return newInquiry;
  }

  async getInquiry(id: string): Promise<Inquiry | undefined> {
    return this.inquiries.get(id);
  }

  // Replies
  async getRepliesByInquiry(inquiryId: string): Promise<Reply[]> {
    return Array.from(this.replies.values())
      .filter(reply => reply.inquiryId === inquiryId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async createReply(reply: InsertReply): Promise<Reply> {
    const id = randomUUID();
    const newReply: Reply = {
      id,
      ...reply,
      isAdmin: reply.isAdmin ?? false,
      contentKo: reply.contentKo ?? null,
      contentEn: reply.contentEn ?? null,
      contentUz: reply.contentUz ?? null,
      contentVi: reply.contentVi ?? null,
      contentZh: reply.contentZh ?? null,
    };
    this.replies.set(id, newReply);
    return newReply;
  }

  // Likes
  async likeMenu(menuId: string): Promise<Menu | undefined> {
    const menu = this.menus.get(menuId);
    if (menu) {
      const updatedMenu = { ...menu, likeCount: menu.likeCount + 1 };
      this.menus.set(menuId, updatedMenu);
      return updatedMenu;
    }
    return undefined;
  }

  async unlikeMenu(menuId: string): Promise<Menu | undefined> {
    const menu = this.menus.get(menuId);
    if (menu && menu.likeCount > 0) {
      const updatedMenu = { ...menu, likeCount: menu.likeCount - 1 };
      this.menus.set(menuId, updatedMenu);
      return updatedMenu;
    }
    return menu;
  }
}

export const storage = new MemStorage();
