const currencySymbols = {
    
  AED: "د.إ", // UAE Dirham
  AFN: "؋", // Afghani
  XCD: "$", // East Caribbean Dollar
  ALL: "L", // Lek
  AMD: "֏", // Armenian Dram
  ANG: "ƒ", // Netherlands Antillean Guilder
  AOA: "Kz", // Kwanza
  AQD: "$", // Antarctic Dollar (fictional, often treated as USD)
  ARS: "$", // Argentine Peso
  AUD: "$", // Australian Dollar
  AZN: "₼", // Azerbaijan Manat
  BAM: "KM", // Convertible Mark
  BBD: "$", // Barbados Dollar
  BDT: "৳", // Taka
  XOF: "CFA", // West African CFA Franc
  BGN: "лв", // Bulgarian Lev
  BHD: ".د.ب", // Bahraini Dinar
  BIF: "FBu", // Burundian Franc
  BMD: "$", // Bermudian Dollar
  BND: "$", // Brunei Dollar
  BOB: "Bs.", // Boliviano
  BRL: "R$", // Brazilian Real
  BSD: "$", // Bahamian Dollar
  NOK: "kr", // Norwegian Krone
  BWP: "P", // Pula
  BYR: "Br", // Belarusian Ruble (old)
  BZD: "$", // Belize Dollar
  CAD: "$", // Canadian Dollar
  CDF: "FC", // Congolese Franc
  XAF: "CFA", // Central African CFA Franc
  CHF: "CHF", // Swiss Franc
  CLP: "$", // Chilean Peso
  CNY: "¥", // Yuan
  COP: "$", // Colombian Peso
  CRC: "₡", // Costa Rican Colon
  CUP: "₱", // Cuban Peso
  CVE: "$", // Cape Verde Escudo
  CYP: "£", // Cypriot Pound (old, now EUR)
  CZK: "Kč", // Koruna
  DJF: "Fdj", // Djiboutian Franc
  DKK: "kr", // Danish Krone
  DOP: "RD$", // Dominican Peso
  DZD: "دج", // Algerian Dinar
  ECS: "S/.", // Ecuador Sucre (old, now USD)
  EEK: "kr", // Estonian Kroon (old, now EUR)
  EGP: "£", // Egyptian Pound
  ETB: "Br", // Ethiopian Birr
  EUR: "€", // Euro
  FJD: "$", // Fiji Dollar
  FKP: "£", // Falkland Islands Pound
  GBP: "£", // Pound Sterling
  GEL: "₾", // Georgian Lari
  GGP: "£", // Guernsey Pound
  GHS: "₵", // Ghanaian Cedi
  GIP: "£", // Gibraltar Pound
  GMD: "D", // Dalasi
  GNF: "FG", // Guinean Franc
  GTQ: "Q", // Quetzal
  GYD: "$", // Guyana Dollar
  HKD: "$", // Hong Kong Dollar
  HNL: "L", // Lempira
  HRK: "kn", // Croatian Kuna
  HTG: "G", // Gourde
  HUF: "Ft", // Forint
  IDR: "Rp", // Rupiah
  ILS: "₪", // Shekel
  INR: "₹", // Indian Rupee
  IQD: "ع.د", // Iraqi Dinar
  IRR: "﷼", // Iranian Rial
  ISK: "kr", // Icelandic Krona
  JMD: "$", // Jamaican Dollar
  JOD: "د.ا", // Jordanian Dinar
  JPY: "¥", // Yen
  KES: "Sh", // Kenyan Shilling
  KGS: "с", // Kyrgyzstani Som
  KHR: "៛", // Riel
  KMF: "CF", // Comorian Franc
  KPW: "₩", // North Korean Won
  KRW: "₩", // South Korean Won
  KWD: "د.ك", // Kuwaiti Dinar
  KYD: "$", // Cayman Islands Dollar
  KZT: "₸", // Tenge
  LAK: "₭", // Kip
  LBP: "ل.ل", // Lebanese Pound
  LKR: "Rs", // Sri Lankan Rupee
  LRD: "$", // Liberian Dollar
  LSL: "L", // Loti
  LTL: "Lt", // Lithuanian Litas (old, now EUR)
  LVL: "Ls", // Latvian Lats (old, now EUR)
  LYD: "ل.د", // Libyan Dinar
  MAD: "DH", // Moroccan Dirham
  MDL: "L", // Leu
  MGA: "Ar", // Malagasy Ariary
  MKD: "ден", // Macedonian Denar
  MMK: "K", // Kyat
  MNT: "₮", // Tugrik
  MOP: "P", // Pataca
  MRO: "UM", // Ouguiya
  MTL: "₤", // Maltese Lira (old, now EUR)
  MUR: "₨", // Mauritius Rupee
  MVR: "ރ.", // Rufiyaa
  MWK: "MK", // Kwacha
  MXN: "$", // Mexican Peso
  MYR: "RM", // Ringgit
  MZN: "MT", // Metical
  NAD: "$", // Namibian Dollar
  XPF: "₣", // CFP Franc
  NGN: "₦", // Naira
  NIO: "C$", // Córdoba
  NPR: "₨", // Nepalese Rupee
  NZD: "$", // New Zealand Dollar
  OMR: "﷼", // Omani Rial
  PAB: "B/.", // Balboa
  PEN: "S/.", // Sol
  PGK: "K", // Kina
  PHP: "₱", // Peso
  PKR: "₨", // Pakistani Rupee
  PLN: "zł", // Zloty
  PYG: "₲", // Guarani
  QAR: "﷼", // Qatari Riyal
  RON: "lei", // Romanian Leu
  RSD: "din", // Serbian Dinar
  RUB: "₽", // Russian Ruble
  RWF: "FRw", // Rwandan Franc
  SAR: "﷼", // Saudi Riyal
  SBD: "$", // Solomon Islands Dollar
  SCR: "₨", // Seychelles Rupee
  SDG: "ج.س.", // Sudanese Pound
  SEK: "kr", // Swedish Krona
  SGD: "$", // Singapore Dollar
  SKK: "Sk", // Slovak Koruna (old, now EUR)
  SLL: "Le", // Leone
  SOS: "Sh", // Somali Shilling
  SRD: "$", // Surinamese Dollar
  STD: "Db", // Dobra
  SVC: "₡", // El Salvador Colon (old, now USD)
  SYP: "£", // Syrian Pound
  SZL: "E", // Lilangeni
  THB: "฿", // Baht
  TJS: "ЅМ", // Somoni
  TMT: "m", // Turkmenistani Manat
  TND: "د.ت", // Tunisian Dinar
  TOP: "T$", // Paʻanga
  TRY: "₺", // Turkish Lira
  TTD: "$", // Trinidad and Tobago Dollar
  TWD: "NT$", // New Taiwan Dollar
  TZS: "Sh", // Tanzanian Shilling
  UAH: "₴", // Hryvnia
  UGX: "Sh", // Ugandan Shilling
  USD: "$", // US Dollar
  UYU: "$U", // Uruguayan Peso
  UZS: "лв", // Uzbekistani Som
  VEF: "Bs", // Venezuelan Bolívar
  VND: "₫", // Dong
  VUV: "VT", // Vatu
  YER: "﷼", // Yemeni Rial
  ZAR: "R", // Rand
  ZMK: "ZK", // Zambian Kwacha (old)
  ZWD: "Z$", // Zimbabwe Dollar
};
