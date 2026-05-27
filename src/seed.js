import { fileURLToPath } from "url";
import mongoose from "mongoose";
import config from "./config/config.js";
import productModel from "./dao/models/product.model.js";

const products = [
  {
    title: 'MacBook Pro 14" M3 Pro',
    description: "Laptop Apple con chip M3 Pro de 11 nucleos, 18GB RAM unificada, SSD 512GB, pantalla Liquid Retina XDR 14.2\", bateria hasta 17 horas. Ideal para desarrollo y diseno profesional.",
    price: 1999,
    thumbnail: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp14-spaceblack-select-202310",
    code: "NB-001",
    category: "notebooks",
    status: true,
    stock: 15
  },
  {
    title: "Dell XPS 15",
    description: "Ultrabook Dell con Intel Core i7-13700H, 16GB RAM, SSD 512GB, pantalla OLED 15.6\" 3.5K tactil, GPU NVIDIA RTX 4060. Perfecta para creadores de contenido.",
    price: 1699,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1731353033/Microsoft_Surface_Laptop_4_qcty9z.jpg",
    code: "NB-002",
    category: "notebooks",
    status: true,
    stock: 10
  },
  {
    title: "Lenovo ThinkPad X1 Carbon Gen 11",
    description: "Notebook empresarial ultraligera con Intel Core i7-1365U, 16GB RAM, SSD 512GB, pantalla 14\" WUXGA IPS, certificacion militar MIL-STD-810H.",
    price: 1549,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1728680807/DellXPS13_smcbht.jpg",
    code: "NB-003",
    category: "notebooks",
    status: true,
    stock: 8
  },
  {
    title: "ASUS ROG Zephyrus G14",
    description: "Laptop gamer compacta con AMD Ryzen 9 7940HS, 16GB RAM, RTX 4060, SSD 1TB, pantalla 14\" QHD 165Hz, teclado RGB. Potencia en tamano pequeno.",
    price: 1399,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1728680723/AsusROGZephyrusG14_kztach.jpg",
    code: "NB-004",
    category: "notebooks",
    status: true,
    stock: 12
  },
  {
    title: "HP Spectre x360 16",
    description: "Convertible premium 2-en-1 con Intel Core i7-13700H, 16GB RAM, SSD 1TB, pantalla tactil 16\" 3K+ OLED, lapiz activo incluido. Versatilidad total.",
    price: 1249,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1731353033/HP_Spectre_x360_13_stjqb2.jpg",
    code: "NB-005",
    category: "notebooks",
    status: true,
    stock: 6
  },
  {
    title: "Logitech MX Mechanical Mini",
    description: "Teclado mecanico inalambrico retroiluminado con switches tactiles silenciosos, conexion Bluetooth multipunto y USB-C. Compacto, profesional y preciso.",
    price: 149,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1731353033/HyperX_Alloy_Origins_Core_bulyun.webp",
    code: "KB-001",
    category: "teclados",
    status: true,
    stock: 25
  },
  {
    title: "Keychron Q1 Pro",
    description: "Teclado mecanico premium 75% con carcasa de aluminio CNC, switches Gateron Jupiter, conexion inalambrica QMK/VIA. Construccion artesanal de alta gama.",
    price: 199,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1728680842/RazerBlackWidowElite_zt9bqq.png",
    code: "KB-002",
    category: "teclados",
    status: true,
    stock: 18
  },
  {
    title: "Razer Huntsman V2 TKL",
    description: "Teclado optico para gaming con switches Razer de 2da generacion, reposamunecas ergonomico, retroiluminacion RGB Chroma. Respuesta ultra rapida.",
    price: 179,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1731353033/SteelSeries_Apex_Pro_f0g8c8.webp",
    code: "KB-003",
    category: "teclados",
    status: true,
    stock: 20
  },
  {
    title: "Apple Magic Keyboard con Touch ID",
    description: "Teclado inalambrico oficial de Apple con sensor Touch ID integrado, bateria recargable, diseno ultradelgado. Ideal para Mac y iPad.",
    price: 99,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1728680723/CorsairK95RGBPlatinum_gvm7v3.jpg",
    code: "KB-004",
    category: "teclados",
    status: true,
    stock: 30
  },
  {
    title: "Corsair K70 RGB Pro",
    description: "Teclado mecanico gaming con switches Cherry MX Speed, marco de aluminio anodizado, retroiluminacion RGB dinamica, tecla de perfil dedicada.",
    price: 159,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1731353033/HyperX_Alloy_Origins_Core_bulyun.webp",
    code: "KB-005",
    category: "teclados",
    status: true,
    stock: 22
  },
  {
    title: 'Dell UltraSharp U2723QE 27"',
    description: "Monitor profesional 4K UHD con panel IPS Black, 99% DCI-P3, USB-C hub con entrega de 90W, certificacion TUV para cuidado ocular.",
    price: 549,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1731353034/lenovolegion-5pro_ot1zjq.jpg",
    code: "MN-001",
    category: "monitores",
    status: true,
    stock: 7
  },
  {
    title: 'Samsung Odyssey G7 32"',
    description: "Monitor gaming curvo 1000R con resolucion QHD 2560x1440, tasa de refresco 240Hz, 1ms, soporte G-Sync y FreeSync Premium Pro.",
    price: 699,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1731354028/Samsung_QLED_Q60T_65_dhewbi.jpg",
    code: "MN-002",
    category: "monitores",
    status: true,
    stock: 5
  },
  {
    title: 'LG UltraFine 27" 5K',
    description: "Monitor LG con resolucion 5120x2880, panel IPS, puerto Thunderbolt 3 con entrega de 94W, altavoces integrados. Calidad de imagen de referencia.",
    price: 1299,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1731353033/Philips_55PUS850512_55_tmp85y.webp",
    code: "MN-003",
    category: "monitores",
    status: true,
    stock: 4
  },
  {
    title: "ASUS ProArt PA278CV",
    description: "Monitor profesional 27\" QHD con calibracion de fabrica Delta E < 2, 100% sRGB/Rec.709, USB-C con entrega de 65W. Precision cromatica absoluta.",
    price: 429,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1731353034/Sony_Bravia_XR_A90J_55_cocbbh.jpg",
    code: "MN-004",
    category: "monitores",
    status: true,
    stock: 9
  },
  {
    title: "Sony WH-1000XM5",
    description: "Auriculares inalambricos con cancelacion de ruido activa lider del mercado, 30 horas de bateria, drivers de 30mm, multipunto Bluetooth. Sonido envolvente.",
    price: 349,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1770560689/wireless-phones_npfper.jpg",
    code: "AH-001",
    category: "auriculares",
    status: true,
    stock: 20
  },
  {
    title: "Apple AirPods Max",
    description: "Auriculares over-ear de Apple con cancelacion de ruido activa, audio espacial con seguimiento dinamico, chip H1, diseno de lujo con almohadillas de malla.",
    price: 549,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1731353033/Apple_AirPods_Max_fpncet.jpg",
    code: "AH-002",
    category: "auriculares",
    status: true,
    stock: 14
  },
  {
    title: "Sennheiser HD 560S",
    description: "Auriculares abiertos de referencia para audiofilos, drivers de 120 ohmios, respuesta de frecuencia 6Hz-38kHz, diseno ultraligero. Sonido neutro y detallado.",
    price: 199,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1731353034/Sennheiser_HD_560S_ixrjgv.jpg",
    code: "AH-003",
    category: "auriculares",
    status: true,
    stock: 16
  },
  {
    title: "Bose QuietComfort Ultra",
    description: "Auriculares inalambricos con cancelacion de ruido adaptativa, audio inmersivo con seguimiento de cabeza, 24 horas de bateria, modos Quiet y Aware.",
    price: 429,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1731353033/Bose_QC_Ultra_k2vwx3.jpg",
    code: "AH-004",
    category: "auriculares",
    status: true,
    stock: 11
  },
  {
    title: "Logitech MX Master 3S",
    description: "Mouse inalambrico ergonomico con sensor 8000 DPI, scroll electromagnetico MagSpeed, botones programables, conexion Bluetooth y USB-C. Precision total.",
    price: 99,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1728680723/LogitechMXMaster3_pg1nmr.jpg",
    code: "MS-001",
    category: "mouses",
    status: true,
    stock: 35
  },
  {
    title: "Razer DeathAdder V3",
    description: "Mouse gaming ergonomico ultraligero de 59g, sensor Focus Pro 30K, switches opticos de 3ra generacion, 90 millones de clics. Rendimiento profesional.",
    price: 69,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1731353033/Razer_DeathAdder_V3_vhkbti.jpg",
    code: "MS-002",
    category: "mouses",
    status: true,
    stock: 28
  },
  {
    title: "Apple Magic Mouse",
    description: "Mouse inalambrico minimalista de Apple con superficie Multi-Touch, bateria recargable, seguimiento por laser. Diseno iconico para el ecosistema Apple.",
    price: 79,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1731353033/Apple_Magic_Mouse_ewep3c.jpg",
    code: "MS-003",
    category: "mouses",
    status: true,
    stock: 40
  },
  {
    title: "Sonos Era 100",
    description: "Altavoz inteligente con sonido estereo envolvente, tweeter doble, woofer de rango medio, compatibilidad con AirPlay 2, WiFi y Bluetooth. Audio multiroom.",
    price: 249,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1731353034/Sonos_Era_100_bjx5wk.jpg",
    code: "SP-001",
    category: "parlantes",
    status: true,
    stock: 12
  },
  {
    title: "JBL Charge 5",
    description: "Parlante Bluetooth portatil con graves potentes, resistencia IP67 al agua y polvo, bateria de 20 horas, funcion power bank. Lleva tu musica a todas partes.",
    price: 179,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1731353033/JBL_Charge_5_g7mhxg.jpg",
    code: "SP-002",
    category: "parlantes",
    status: true,
    stock: 25
  },
  {
    title: "Marshall Stanmore III",
    description: "Altavoz domestico iconico con diseno vintage, sonido estereo potente, ecualizador personalizable, conectividad HDMI y Bluetooth 5.3. Estilo y calidad.",
    price: 379,
    thumbnail: "https://res.cloudinary.com/dl73hi4ir/image/upload/v1731353034/Marshall_Stanmore_III_uq7d2l.jpg",
    code: "SP-003",
    category: "parlantes",
    status: true,
    stock: 10
  }
];

async function seed() {
  await mongoose.connect(config.MONGO_URL);
  const count = await productModel.countDocuments();
  if (count > 0) {
    console.log(`Seed skipped: ${count} products already exist`);
    await mongoose.disconnect();
    return;
  }
  const result = await productModel.insertMany(products);
  console.log(`${result.length} products seeded successfully`);
  await mongoose.disconnect();
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  seed().catch((err) => {
    console.error("Seed error:", err);
    process.exit(1);
  });
}

export default seed;
