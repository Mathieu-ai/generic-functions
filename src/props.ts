/**
    Object with all the properties
*/
export const mlProp = {
    /**
        List of countries
        * * 🟢 generic, it is a Array
        @@return Object[]
        @example
            // [{...}, { ...}]
    */
    Countries: [
        {
            name: {
                common: "Saint Vincent and the Grenadines",
                official: "Saint Vincent and the Grenadines",
            },
            cca2: "VC",
            altNames: "VC",
            flag: "🇻🇨",
        },
        {
            name: { common: "French Guiana", official: "Guiana" },
            cca2: "GF",
            altNames: "GF,Guiana,Guyane",
            flag: "🇬🇫",
        },
        {
            name: { common: "Faroe Islands", official: "Faroe Islands" },
            cca2: "FO",
            altNames: "FO,Føroyar,Færøerne",
            flag: "🇫🇴",
        },
        {
            name: {
                common: "Pakistan",
                official: "Islamic Republic of Pakistan",
            },
            cca2: "PK",
            altNames:
                "PK,Pākistān,Islamic Republic of Pakistan,Islāmī Jumhūriya'eh Pākistān",
            flag: "🇵🇰",
        },
        {
            name: { common: "Fiji", official: "Republic of Fiji" },
            cca2: "FJ",
            altNames:
                "FJ,Viti,Republic of Fiji,Matanitu ko Viti,Fijī Gaṇarājya",
            flag: "🇫🇯",
        },
        {
            name: { common: "Mongolia", official: "Mongolia" },
            cca2: "MN",
            altNames: "MN",
            flag: "🇲🇳",
        },
        {
            name: {
                common: "Cocos (Keeling) Islands",
                official: "Territory of the Cocos (Keeling) Islands",
            },
            cca2: "CC",
            altNames: "CC,Keeling Islands,Cocos Islands",
            flag: "🇨🇨",
        },
        {
            name: {
                common: "Micronesia",
                official: "Federated States of Micronesia",
            },
            cca2: "FM",
            altNames:
                "FM,Federated States of Micronesia,Micronesia, Federated States of",
            flag: "🇫🇲",
        },
        {
            name: { common: "Norway", official: "Kingdom of Norway" },
            cca2: "NO",
            altNames:
                "NO,Norge,Noreg,Kingdom of Norway,Kongeriket Norge,Kongeriket Noreg",
            flag: "🇳🇴",
        },
        {
            name: {
                common: "Mauritania",
                official: "Islamic Republic of Mauritania",
            },
            cca2: "MR",
            altNames:
                "MR,Islamic Republic of Mauritania,al-Jumhūriyyah al-ʾIslāmiyyah al-Mūrītāniyyah",
            flag: "🇲🇷",
        },
        {
            name: { common: "Spain", official: "Kingdom of Spain" },
            cca2: "ES",
            altNames: "ES,Kingdom of Spain,Reino de España",
            flag: "🇪🇸",
        },
        {
            name: { common: "Turkey", official: "Republic of Turkey" },
            cca2: "TR",
            altNames: "TR,Turkiye,Republic of Turkey,Türkiye Cumhuriyeti",
            flag: "🇹🇷",
        },
        {
            name: {
                common: "United Arab Emirates",
                official: "United Arab Emirates",
            },
            cca2: "AE",
            altNames: "AE,UAE,Emirates",
            flag: "🇦🇪",
        },
        {
            name: {
                common: "DR Congo",
                official: "Democratic Republic of the Congo",
            },
            cca2: "CD",
            altNames:
                "CD,DR Congo,Congo-Kinshasa,Congo, the Democratic Republic of the,DRC",
            flag: "🇨🇩",
        },
        {
            name: { common: "New Caledonia", official: "New Caledonia" },
            cca2: "NC",
            altNames: "NC",
            flag: "🇳🇨",
        },
        {
            name: { common: "Rwanda", official: "Republic of Rwanda" },
            cca2: "RW",
            altNames:
                "RW,Republic of Rwanda,Repubulika y'u Rwanda,République du Rwanda",
            flag: "🇷🇼",
        },
        {
            name: {
                common: "Australia",
                official: "Commonwealth of Australia",
            },
            cca2: "AU",
            altNames: "AU",
            flag: "🇦🇺",
        },
        {
            name: { common: "Isle of Man", official: "Isle of Man" },
            cca2: "IM",
            altNames: "IM,Ellan Vannin,Mann,Mannin",
            flag: "🇮🇲",
        },
        {
            name: { common: "Indonesia", official: "Republic of Indonesia" },
            cca2: "cca2",
            altNames: "cca2,Republic of Indonesia,Republik Indonesia",
            flag: "🇮🇩",
        },
        {
            name: { common: "Zambia", official: "Republic of Zambia" },
            cca2: "ZM",
            altNames: "ZM,Republic of Zambia",
            flag: "🇿🇲",
        },
        {
            name: { common: "Jersey", official: "Bailiwick of Jersey" },
            cca2: "JE",
            altNames:
                "JE,Bailiwick of Jersey,Bailliage de Jersey,Bailliage dé Jèrri",
            flag: "🇯🇪",
        },
        {
            name: {
                common: "Uruguay",
                official: "Oriental Republic of Uruguay",
            },
            cca2: "UY",
            altNames:
                "UY,Oriental Republic of Uruguay,República Oriental del Uruguay",
            flag: "🇺🇾",
        },
        {
            name: { common: "Canada", official: "Canada" },
            cca2: "CA",
            altNames: "CA",
            flag: "🇨🇦",
        },
        {
            name: { common: "Peru", official: "Republic of Peru" },
            cca2: "PE",
            altNames: "PE,Republic of Peru,República del Perú",
            flag: "🇵🇪",
        },
        {
            name: { common: "Montserrat", official: "Montserrat" },
            cca2: "MS",
            altNames: "MS",
            flag: "🇲🇸",
        },
        {
            name: {
                common: "Antigua and Barbuda",
                official: "Antigua and Barbuda",
            },
            cca2: "AG",
            altNames: "AG",
            flag: "🇦🇬",
        },
        {
            name: { common: "Dominica", official: "Commonwealth of Dominica" },
            cca2: "DM",
            altNames: "DM,Dominique,Wai‘tu kubuli,Commonwealth of Dominica",
            flag: "🇩🇲",
        },
        {
            name: { common: "Cambodia", official: "Kingdom of Cambodia" },
            cca2: "KH",
            altNames: "KH,Kingdom of Cambodia",
            flag: "🇰🇭",
        },
        {
            name: { common: "Falkland Islands", official: "Falkland Islands" },
            cca2: "FK",
            altNames: "FK,Islas Malvinas,Falkland Islands (Malvinas)",
            flag: "🇫🇰",
        },
        {
            name: { common: "Guam", official: "Guam" },
            cca2: "GU",
            altNames: "GU,Guåhån",
            flag: "🇬🇺",
        },
        {
            name: {
                common: "Papua New Guinea",
                official: "Independent State of Papua New Guinea",
            },
            cca2: "PG",
            altNames:
                "PG,Independent State of Papua New Guinea,Independen Stet bilong Papua Niugini",
            flag: "🇵🇬",
        },
        {
            name: { common: "Seychelles", official: "Republic of Seychelles" },
            cca2: "SC",
            altNames:
                "SC,Republic of Seychelles,Repiblik Sesel,République des Seychelles",
            flag: "🇸🇨",
        },
        {
            name: { common: "Liberia", official: "Republic of Liberia" },
            cca2: "LR",
            altNames: "LR,Republic of Liberia",
            flag: "🇱🇷",
        },
        {
            name: { common: "Cape Verde", official: "Republic of Cabo Verde" },
            cca2: "CV",
            altNames: "CV,Republic of Cabo Verde,República de Cabo Verde",
            flag: "🇨🇻",
        },
        {
            name: { common: "Grenada", official: "Grenada" },
            cca2: "GD",
            altNames: "GD",
            flag: "🇬🇩",
        },
        {
            name: { common: "Cuba", official: "Republic of Cuba" },
            cca2: "CU",
            altNames: "CU,Republic of Cuba,República de Cuba",
            flag: "🇨🇺",
        },
        {
            name: { common: "Djibouti", official: "Republic of Djibouti" },
            cca2: "DJ",
            altNames:
                "DJ,Jabuuti,Gabuuti,Republic of Djibouti,République de Djibouti,Gabuutih Ummuuno,Jamhuuriyadda Jabuuti",
            flag: "🇩🇯",
        },
        {
            name: { common: "Lebanon", official: "Lebanese Republic" },
            cca2: "LB",
            altNames: "LB,Lebanese Republic,Al-Jumhūrīyah Al-Libnānīyah",
            flag: "🇱🇧",
        },
        {
            name: {
                common: "Myanmar",
                official: "Republic of the Union of Myanmar",
            },
            cca2: "MM",
            altNames:
                "MM,Burma,Republic of the Union of Myanmar,Pycca2aunzu Thanmăda Myăma Nainngandaw",
            flag: "🇲🇲",
        },
        {
            name: { common: "Cayman Islands", official: "Cayman Islands" },
            cca2: "KY",
            altNames: "KY",
            flag: "🇰🇾",
        },
        {
            name: { common: "Gabon", official: "Gabonese Republic" },
            cca2: "GA",
            altNames: "GA,Gabonese Republic,République Gabonaise",
            flag: "🇬🇦",
        },
        {
            name: { common: "French Polynesia", official: "French Polynesia" },
            cca2: "PF",
            altNames:
                "PF,Polynésie française,French Polynesia,Pōrīnetia Farāni",
            flag: "🇵🇫",
        },
        {
            name: {
                common: "South Africa",
                official: "Republic of South Africa",
            },
            cca2: "ZA",
            altNames: "ZA,RSA,Succa2-Afrika,Republic of South Africa",
            flag: "🇿🇦",
        },
        {
            name: { common: "Suriname", official: "Republic of Suriname" },
            cca2: "SR",
            altNames:
                "SR,Sarnam,Sranangron,Republic of Suriname,Republiek Suriname",
            flag: "🇸🇷",
        },
        {
            name: { common: "Costa Rica", official: "Republic of Costa Rica" },
            cca2: "CR",
            altNames: "CR,Republic of Costa Rica,República de Costa Rica",
            flag: "🇨🇷",
        },
        {
            name: {
                common: "Central African Republic",
                official: "Central African Republic",
            },
            cca2: "CF",
            altNames: "CF,Central African Republic,République centrafricaine",
            flag: "🇨🇫",
        },
        {
            name: {
                common: "Turks and Caicos Islands",
                official: "Turks and Caicos Islands",
            },
            cca2: "TC",
            altNames: "TC",
            flag: "🇹🇨",
        },
        {
            name: {
                common: "Liechtenstein",
                official: "Principality of Liechtenstein",
            },
            cca2: "LI",
            altNames:
                "LI,Principality of Liechtenstein,Fürstentum Liechtenstein",
            flag: "🇱🇮",
        },
        {
            name: { common: "Niue", official: "Niue" },
            cca2: "NU",
            altNames: "NU",
            flag: "🇳🇺",
        },
        {
            name: {
                common: "United States Minor Outlying Islands",
                official: "United States Minor Outlying Islands",
            },
            cca2: "UM",
            altNames: "UM",
            flag: "🇺🇲",
        },
        {
            name: {
                common: "North Korea",
                official: "Democratic People's Republic of Korea",
            },
            cca2: "KP",
            altNames:
                "KP,Democratic People's Republic of Korea,DPRK,조선민주주의인민공화국,Chosŏn Minjujuŭi Inmin Konghwaguk,Korea, Democratic People's Republic of,북한,북조선",
            flag: "🇰🇵",
        },
        {
            name: { common: "Ukraine", official: "Ukraine" },
            cca2: "UA",
            altNames: "UA,Ukrayina",
            flag: "🇺🇦",
        },
        {
            name: {
                common: "Guinea-Bissau",
                official: "Republic of Guinea-Bissau",
            },
            cca2: "GW",
            altNames: "GW,Republic of Guinea-Bissau,República da Guiné-Bissau",
            flag: "🇬🇼",
        },
        {
            name: { common: "Antarctica", official: "Antarctica" },
            cca2: "AQ",
            altNames: "AQ",
            flag: "🇦🇶",
        },
        {
            name: { common: "Mayotte", official: "Department of Mayotte" },
            cca2: "YT",
            altNames: "YT,Department of Mayotte,Département de Mayotte",
            flag: "🇾🇹",
        },
        {
            name: { common: "Tuvalu", official: "Tuvalu" },
            cca2: "TV",
            altNames: "TV",
            flag: "🇹🇻",
        },
        {
            name: { common: "Morocco", official: "Kingdom of Morocco" },
            cca2: "MA",
            altNames: "MA,Kingdom of Morocco,Al-Mamlakah al-Maġribiyah",
            flag: "🇲🇦",
        },
        {
            name: { common: "Moldova", official: "Republic of Moldova" },
            cca2: "MD",
            altNames:
                "MD,Moldova, Republic of,Republic of Moldova,Republica Moldova",
            flag: "🇲🇩",
        },
        {
            name: { common: "Oman", official: "Sultanate of Oman" },
            cca2: "OM",
            altNames: "OM,Sultanate of Oman,Salṭanat ʻUmān",
            flag: "🇴🇲",
        },
        {
            name: { common: "Italy", official: "Italian Republic" },
            cca2: "IT",
            altNames: "IT,Italian Republic,Repubblica italiana",
            flag: "🇮🇹",
        },
        {
            name: { common: "Yemen", official: "Republic of Yemen" },
            cca2: "YE",
            altNames: "YE,Yemeni Republic,al-Jumhūriyyah al-Yamaniyyah",
            flag: "🇾🇪",
        },
        {
            name: { common: "Kuwait", official: "State of Kuwait" },
            cca2: "KW",
            altNames: "KW,State of Kuwait,Dawlat al-Kuwait",
            flag: "🇰🇼",
        },
        {
            name: {
                common: "Puerto Rico",
                official: "Commonwealth of Puerto Rico",
            },
            cca2: "PR",
            altNames:
                "PR,Commonwealth of Puerto Rico,Estado Libre Asociado de Puerto Rico",
            flag: "🇵🇷",
        },
        {
            name: { common: "Palestine", official: "State of Palestine" },
            cca2: "PS",
            altNames:
                "PS,Palestine, State of,State of Palestine,Dawlat Filasṭin",
            flag: "🇵🇸",
        },
        {
            name: { common: "Colombia", official: "Republic of Colombia" },
            cca2: "CO",
            altNames: "CO,Republic of Colombia,República de Colombia",
            flag: "🇨🇴",
        },
        {
            name: {
                common: "North Macedonia",
                official: "Republic of North Macedonia",
            },
            cca2: "MK",
            altNames:
                "MK,The former Yugoslav Republic of Macedonia,Republic of North Macedonia,Macedonia, The Former Yugoslav Republic of,Република Северна Македонија",
            flag: "🇲🇰",
        },
        {
            name: { common: "Qatar", official: "State of Qatar" },
            cca2: "QA",
            altNames: "QA,State of Qatar,Dawlat Qaṭar",
            flag: "🇶🇦",
        },
        {
            name: { common: "Taiwan", official: "Republic of China (Taiwan)" },
            cca2: "TW",
            altNames:
                "TW,Táiwān,Republic of China,中華民國,Zhōnghuá Mínguó,Chinese Taipei",
            flag: "🇹🇼",
        },
        {
            name: { common: "Madagascar", official: "Republic of Madagascar" },
            cca2: "MG",
            altNames:
                "MG,Republic of Madagascar,Repoblikan'i Madagasikara,République de Madagascar",
            flag: "🇲🇬",
        },
        {
            name: {
                common: "Bahamas",
                official: "Commonwealth of the Bahamas",
            },
            cca2: "BS",
            altNames: "BS,Commonwealth of the Bahamas",
            flag: "🇧🇸",
        },
        {
            name: { common: "Curaçao", official: "Country of Curaçao" },
            cca2: "CW",
            altNames:
                "CW,Curacao,Kòrsou,Country of Curaçao,Land Curaçao,Pais Kòrsou",
            flag: "🇨🇼",
        },
        {
            name: { common: "Solomon Islands", official: "Solomon Islands" },
            cca2: "SB",
            altNames: "SB",
            flag: "🇸🇧",
        },
        {
            name: {
                common: "Saint Helena, Ascension and Tristan da Cunha",
                official: "Saint Helena, Ascension and Tristan da Cunha",
            },
            cca2: "SH",
            altNames: "Saint Helena,St. Helena, Ascension and Tristan da Cunha",
            flag: "🇸🇭",
        },
        {
            name: { common: "Honduras", official: "Republic of Honduras" },
            cca2: "HN",
            altNames: "HN,Republic of Honduras,República de Honduras",
            flag: "🇭🇳",
        },
        {
            name: { common: "Armenia", official: "Republic of Armenia" },
            cca2: "AM",
            altNames:
                "AM,Hayastan,Republic of Armenia,Հայաստանի Հանրապետություն",
            flag: "🇦🇲",
        },
        {
            name: { common: "Guatemala", official: "Republic of Guatemala" },
            cca2: "GT",
            altNames: "GT",
            flag: "🇬🇹",
        },
        {
            name: { common: "Togo", official: "Togolese Republic" },
            cca2: "TG",
            altNames: "TG,Togolese,Togolese Republic,République Togolaise",
            flag: "🇹🇬",
        },
        {
            name: { common: "Senegal", official: "Republic of Senegal" },
            cca2: "SN",
            altNames: "SN,Republic of Senegal,République du Sénégal",
            flag: "🇸🇳",
        },
        {
            name: { common: "Czechia", official: "Czech Republic" },
            cca2: "CZ",
            altNames: "CZ,Česká republika,Česko",
            flag: "🇨🇿",
        },
        {
            name: { common: "Kosovo", official: "Republic of Kosovo" },
            cca2: "XK",
            altNames: "XK,Република Косово",
            flag: "🇽🇰",
        },
        {
            name: {
                common: "Marshall Islands",
                official: "Republic of the Marshall Islands",
            },
            cca2: "MH",
            altNames:
                "MH,Republic of the Marshall Islands,Aolepān Aorōkin M̧ajeļ",
            flag: "🇲🇭",
        },
        {
            name: { common: "Mauritius", official: "Republic of Mauritius" },
            cca2: "MU",
            altNames: "MU,Republic of Mauritius,République de Maurice",
            flag: "🇲🇺",
        },
        {
            name: { common: "Georgia", official: "Georgia" },
            cca2: "GE",
            altNames: "GE,Sakartvelo",
            flag: "🇬🇪",
        },
        {
            name: {
                common: "Philippines",
                official: "Republic of the Philippines",
            },
            cca2: "PH",
            altNames: "PH,Republic of the Philippines,Repúblika ng Pilipinas",
            flag: "🇵🇭",
        },
        {
            name: { common: "Albania", official: "Republic of Albania" },
            cca2: "AL",
            altNames: "AL,Shqipëri,Shqipëria,Shqipnia",
            flag: "🇦🇱",
        },
        {
            name: { common: "Jamaica", official: "Jamaica" },
            cca2: "JM",
            altNames: "JM",
            flag: "🇯🇲",
        },
        {
            name: { common: "Serbia", official: "Republic of Serbia" },
            cca2: "RS",
            altNames:
                "RS,Srbija,Republic of Serbia,Република Србија,Republika Srbija",
            flag: "🇷🇸",
        },
        {
            name: { common: "Chile", official: "Republic of Chile" },
            cca2: "CL",
            altNames: "CL,Republic of Chile,República de Chile",
            flag: "🇨🇱",
        },
        {
            name: {
                common: "Guyana",
                official: "Co-operative Republic of Guyana",
            },
            cca2: "GY",
            altNames: "GY,Co-operative Republic of Guyana",
            flag: "🇬🇾",
        },
        {
            name: {
                common: "Tanzania",
                official: "United Republic of Tanzania",
            },
            cca2: "TZ",
            altNames:
                "TZ,Tanzania, United Republic of,United Republic of Tanzania,Jamhuri ya Muungano wa Tanzania",
            flag: "🇹🇿",
        },
        {
            name: {
                common: "Bangladesh",
                official: "People's Republic of Bangladesh",
            },
            cca2: "BD",
            altNames:
                "BD,People's Republic of Bangladesh,Gônôprôjatôntri Bangladesh",
            flag: "🇧🇩",
        },
        {
            name: { common: "Ecuador", official: "Republic of Ecuador" },
            cca2: "EC",
            altNames: "EC,Republic of Ecuador,República del Ecuador",
            flag: "🇪🇨",
        },
        {
            name: { common: "Cyprus", official: "Republic of Cyprus" },
            cca2: "CY",
            altNames:
                "CY,Kýpros,Kıbrıs,Republic of Cyprus,Κυπριακή Δημοκρατία,Kıbrıs Cumhuriyeti",
            flag: "🇨🇾",
        },
        {
            name: {
                common: "Dominican Republic",
                official: "Dominican Republic",
            },
            cca2: "DO",
            altNames: "DO",
            flag: "🇩🇴",
        },
        {
            name: {
                common: "South Georgia",
                official: "South Georgia and the South Sandwich Islands",
            },
            cca2: "GS",
            altNames: "GS,South Georgia and the South Sandwich Islands",
            flag: "🇬🇸",
        },
        {
            name: { common: "Åland Islands", official: "Åland Islands" },
            cca2: "AX",
            altNames: "AX,Aaland,Aland,Ahvenanmaa",
            flag: "🇦🇽",
        },
        {
            name: { common: "Finland", official: "Republic of Finland" },
            cca2: "FI",
            altNames:
                "FI,Suomi,Republic of Finland,Suomen tasavalta,Republiken Finland",
            flag: "🇫🇮",
        },
        {
            name: { common: "South Korea", official: "Republic of Korea" },
            cca2: "KR",
            altNames: "KR,Korea, Republic of,Republic of Korea,남한,남조선",
            flag: "🇰🇷",
        },
        {
            name: { common: "Burkina Faso", official: "Burkina Faso" },
            cca2: "BF",
            altNames: "BF",
            flag: "🇧🇫",
        },
        {
            name: {
                common: "Norfolk Island",
                official: "Territory of Norfolk Island",
            },
            cca2: "NF",
            altNames: "NF,Territory of Norfolk Island,Teratri of Norf'k Ailen",
            flag: "🇳🇫",
        },
        {
            name: { common: "Portugal", official: "Portuguese Republic" },
            cca2: "PT",
            altNames: "PT,Portuguesa,Portuguese Republic,República Portuguesa",
            flag: "🇵🇹",
        },
        {
            name: { common: "Barbados", official: "Barbados" },
            cca2: "BB",
            altNames: "BB",
            flag: "🇧🇧",
        },
        {
            name: { common: "Jordan", official: "Hashemite Kingdom of Jordan" },
            cca2: "JO",
            altNames:
                "JO,Hashemite Kingdom of Jordan,al-Mamlakah al-Urdunīyah al-Hāshimīyah",
            flag: "🇯🇴",
        },
        {
            name: {
                common: "Nigeria",
                official: "Federal Republic of Nigeria",
            },
            cca2: "NG",
            altNames: "NG,Nijeriya,Naíjíríà,Federal Republic of Nigeria",
            flag: "🇳🇬",
        },
        {
            name: { common: "Bahrain", official: "Kingdom of Bahrain" },
            cca2: "BH",
            altNames: "BH,Kingdom of Bahrain,Mamlakat al-Baḥrayn",
            flag: "🇧🇭",
        },
        {
            name: {
                common: "Kiribati",
                official: "Independent and Sovereign Republic of Kiribati",
            },
            cca2: "KI",
            altNames: "KI,Republic of Kiribati,Ribaberiki Kiribati",
            flag: "🇰🇮",
        },
        {
            name: {
                common: "São Tomé and Príncipe",
                official: "Democratic Republic of São Tomé and Príncipe",
            },
            cca2: "ST",
            altNames:
                "ST,Democratic Republic of São Tomé and Príncipe,Sao Tome and Principe,República Democrática de São Tomé e Príncipe",
            flag: "🇸🇹",
        },
        {
            name: { common: "China", official: "People's Republic of China" },
            cca2: "CN",
            altNames:
                "CN,Zhōngguó,Zhongguo,Zhonghua,People's Republic of China,中华人民共和国,Zhōnghuá Rénmín Gònghéguó",
            flag: "🇨🇳",
        },
        {
            name: { common: "Switzerland", official: "Swiss Confederation" },
            cca2: "CH",
            altNames: "CH,Swiss Confederation,Schweiz,Suisse,Svizzera,Svizra",
            flag: "🇨🇭",
        },
        {
            name: { common: "Kenya", official: "Republic of Kenya" },
            cca2: "KE",
            altNames: "KE,Republic of Kenya,Jamhuri ya Kenya",
            flag: "🇰🇪",
        },
        {
            name: { common: "Maldives", official: "Republic of the Maldives" },
            cca2: "MV",
            altNames:
                "MV,Maldive Islands,Republic of the Maldives,Dhivehi Raajjeyge Jumhooriyya",
            flag: "🇲🇻",
        },
        {
            name: {
                common: "El Salvador",
                official: "Republic of El Salvador",
            },
            cca2: "SV",
            altNames: "SV,Republic of El Salvador,República de El Salvador",
            flag: "🇸🇻",
        },
        {
            name: {
                common: "Saint Kitts and Nevis",
                official: "Federation of Saint Christopher and Nevis",
            },
            cca2: "KN",
            altNames: "KN,Federation of Saint Christopher and Nevis",
            flag: "🇰🇳",
        },
        {
            name: {
                common: "Brunei",
                official: "Nation of Brunei, Abode of Peace",
            },
            cca2: "BN",
            altNames:
                "BN,Brunei Darussalam,Nation of Brunei,the Abode of Peace",
            flag: "🇧🇳",
        },
        {
            name: { common: "Benin", official: "Republic of Benin" },
            cca2: "BJ",
            altNames: "BJ,Republic of Benin,République du Bénin",
            flag: "🇧🇯",
        },
        {
            name: { common: "Guinea", official: "Republic of Guinea" },
            cca2: "GN",
            altNames: "GN,Republic of Guinea,République de Guinée",
            flag: "🇬🇳",
        },
        {
            name: {
                common: "Macau",
                official:
                    "Macao Special Administrative Region of the People's Republic of China",
            },
            cca2: "MO",
            altNames:
                "MO,澳门,Macao,Macao Special Administrative Region of the People's Republic of China,中華人民共和國澳門特別行政區,Região Administrativa Especial de Macau da República Popular da China",
            flag: "🇲🇴",
        },
        {
            name: {
                common: "United States",
                official: "United States of America",
            },
            cca2: "US",
            altNames: "US,USA,United States of America",
            flag: "🇺🇸",
        },
        {
            name: { common: "Eritrea", official: "State of Eritrea" },
            cca2: "ER",
            altNames:
                "ER,State of Eritrea,ሃገረ ኤርትራ,Dawlat Iritriyá,ʾErtrā,Iritriyā",
            flag: "🇪🇷",
        },
        {
            name: { common: "Sweden", official: "Kingdom of Sweden" },
            cca2: "SE",
            altNames: "SE,Kingdom of Sweden,Konungariket Sverige",
            flag: "🇸🇪",
        },
        {
            name: {
                common: "French Southern and Antarctic Lands",
                official:
                    "Territory of the French Southern and Antarctic Lands",
            },
            cca2: "TF",
            altNames: "TF,French Southern Territories",
            flag: "🇹🇫",
        },
        {
            name: { common: "Ghana", official: "Republic of Ghana" },
            cca2: "GH",
            altNames: "GH",
            flag: "🇬🇭",
        },
        {
            name: { common: "Denmark", official: "Kingdom of Denmark" },
            cca2: "DK",
            altNames: "DK,Danmark,Kingdom of Denmark,Kongeriget Danmark",
            flag: "🇩🇰",
        },
        {
            name: { common: "Bulgaria", official: "Republic of Bulgaria" },
            cca2: "BG",
            altNames: "BG,Republic of Bulgaria,Република България",
            flag: "🇧🇬",
        },
        {
            name: { common: "Botswana", official: "Republic of Botswana" },
            cca2: "BW",
            altNames: "BW,Republic of Botswana,Lefatshe la Botswana",
            flag: "🇧🇼",
        },
        {
            name: { common: "Iran", official: "Islamic Republic of Iran" },
            cca2: "IR",
            altNames:
                "IR,Islamic Republic of Iran,Iran, Islamic Republic of,Jomhuri-ye Eslāmi-ye Irān",
            flag: "🇮🇷",
        },
        {
            name: { common: "Bouvet Island", official: "Bouvet Island" },
            cca2: "BV",
            altNames: "BV,Bouvetøya,Bouvet-øya",
            flag: "🇧🇻",
        },
        {
            name: {
                common: "Bolivia",
                official: "Plurinational State of Bolivia",
            },
            cca2: "BO",
            altNames:
                "BO,Buliwya,Wuliwya,Bolivia, Plurinational State of,Plurinational State of Bolivia,Estado Plurinacional de Bolivia,Buliwya Mamallaqta,Wuliwya Suyu,Tetã Volívia",
            flag: "🇧🇴",
        },
        {
            name: {
                common: "Pitcairn Islands",
                official: "Pitcairn Group of Islands",
            },
            cca2: "PN",
            altNames: "PN,Pitcairn,Pitcairn Henderson Ducie and Oeno Islands",
            flag: "🇵🇳",
        },
        {
            name: { common: "Belarus", official: "Republic of Belarus" },
            cca2: "BY",
            altNames:
                "BY,Bielaruś,Republic of Belarus,Белоруссия,Республика Белоруссия",
            flag: "🇧🇾",
        },
        {
            name: { common: "Bermuda", official: "Bermuda" },
            cca2: "BM",
            altNames: "BM,The Islands of Bermuda,The Bermudas,Somers Isles",
            flag: "🇧🇲",
        },
        {
            name: { common: "Kazakhstan", official: "Republic of Kazakhstan" },
            cca2: "KZ",
            altNames:
                "KZ,Qazaqstan,Казахстан,Republic of Kazakhstan,Қазақстан Республикасы,Qazaqstan Respublïkası,Республика Казахстан,Respublika Kazakhstan",
            flag: "🇰🇿",
        },
        {
            name: {
                common: "Laos",
                official: "Lao People's Democratic Republic",
            },
            cca2: "LA",
            altNames:
                "LA,Lao,Lao People's Democratic Republic,Sathalanalat Paxathipatai Paxaxon Lao",
            flag: "🇱🇦",
        },
        {
            name: { common: "Uzbekistan", official: "Republic of Uzbekistan" },
            cca2: "UZ",
            altNames:
                "UZ,Republic of Uzbekistan,O‘zbekiston Respublikasi,Ўзбекистон Республикаси",
            flag: "🇺🇿",
        },
        {
            name: { common: "Malaysia", official: "Malaysia" },
            cca2: "MY",
            altNames: "MY",
            flag: "🇲🇾",
        },
        {
            name: {
                common: "British Virgin Islands",
                official: "Virgin Islands",
            },
            cca2: "VG",
            altNames: "VG,Virgin Islands, British",
            flag: "🇻🇬",
        },
        {
            name: {
                common: "Saint Pierre and Miquelon",
                official: "Saint Pierre and Miquelon",
            },
            cca2: "PM",
            altNames:
                "PM,Collectivité territoriale de Saint-Pierre-et-Miquelon",
            flag: "🇵🇲",
        },
        {
            name: { common: "Iceland", official: "Iceland" },
            cca2: "IS",
            altNames: "IS,Island,Republic of Iceland,Lýðveldið Ísland",
            flag: "🇮🇸",
        },
        {
            name: { common: "Greece", official: "Hellenic Republic" },
            cca2: "GR",
            altNames: "GR,Elláda,Hellenic Republic,Ελληνική Δημοκρατία",
            flag: "🇬🇷",
        },
        {
            name: { common: "Paraguay", official: "Republic of Paraguay" },
            cca2: "PY",
            altNames:
                "PY,Republic of Paraguay,República del Paraguay,Tetã Paraguái",
            flag: "🇵🇾",
        },
        {
            name: { common: "Cameroon", official: "Republic of Cameroon" },
            cca2: "CM",
            altNames: "CM,Republic of Cameroon,République du Cameroun",
            flag: "🇨🇲",
        },
        {
            name: { common: "Palau", official: "Republic of Palau" },
            cca2: "PW",
            altNames: "PW,Republic of Palau,Beluu er a Belau",
            flag: "🇵🇼",
        },
        {
            name: {
                common: "Brazil",
                official: "Federative Republic of Brazil",
            },
            cca2: "BR",
            altNames:
                "BR,Brasil,Federative Republic of Brazil,República Federativa do Brasil",
            flag: "🇧🇷",
        },
        {
            name: {
                common: "Saint Barthélemy",
                official: "Collectivity of Saint Barthélemy",
            },
            cca2: "BL",
            altNames:
                "BL,St. Barthelemy,Collectivity of Saint Barthélemy,Collectivité de Saint-Barthélemy",
            flag: "🇧🇱",
        },
        {
            name: { common: "Anguilla", official: "Anguilla" },
            cca2: "AI",
            altNames: "AI",
            flag: "🇦🇮",
        },
        {
            name: {
                common: "Ethiopia",
                official: "Federal Democratic Republic of Ethiopia",
            },
            cca2: "ET",
            altNames:
                "ET,ʾĪtyōṗṗyā,Federal Democratic Republic of Ethiopia,የኢትዮጵያ ፌዴራላዊ ዲሞክራሲያዊ ሪፐብሊክ",
            flag: "🇪🇹",
        },
        {
            name: {
                common: "Germany",
                official: "Federal Republic of Germany",
            },
            cca2: "DE",
            altNames:
                "DE,Federal Republic of Germany,Bundesrepublik Deutschland",
            flag: "🇩🇪",
        },
        {
            name: { common: "Hungary", official: "Hungary" },
            cca2: "HU",
            altNames: "HU",
            flag: "🇭🇺",
        },
        {
            name: { common: "Sudan", official: "Republic of the Sudan" },
            cca2: "SD",
            altNames: "SD,Republic of the Sudan,Jumhūrīyat as-Sūdān",
            flag: "🇸🇩",
        },
        {
            name: {
                common: "Somalia",
                official: "Federal Republic of Somalia",
            },
            cca2: "SO",
            altNames:
                "SO,aṣ-Ṣūmāl,Federal Republic of Somalia,Jamhuuriyadda Federaalka Soomaaliya,Jumhūriyyat aṣ-Ṣūmāl al-Fcca2erāliyya",
            flag: "🇸🇴",
        },
        {
            name: { common: "Lithuania", official: "Republic of Lithuania" },
            cca2: "LT",
            altNames: "LT,Republic of Lithuania,Lietuvos Respublika",
            flag: "🇱🇹",
        },
        {
            name: { common: "Angola", official: "Republic of Angola" },
            cca2: "AO",
            altNames: "AO,República de Angola,ʁɛpublika de an'ɡɔla",
            flag: "🇦🇴",
        },
        {
            name: {
                common: "Equatorial Guinea",
                official: "Republic of Equatorial Guinea",
            },
            cca2: "GQ",
            altNames:
                "GQ,Republic of Equatorial Guinea,República de Guinea Ecuatorial,République de Guinée équatoriale,República da Guiné Equatorial",
            flag: "🇬🇶",
        },
        {
            name: {
                common: "Saudi Arabia",
                official: "Kingdom of Saudi Arabia",
            },
            cca2: "SA",
            altNames:
                "Saudi,SA,Kingdom of Saudi Arabia,Al-Mamlakah al-‘Arabiyyah as-Su‘ūdiyyah",
            flag: "🇸🇦",
        },
        {
            name: { common: "Estonia", official: "Republic of Estonia" },
            cca2: "EE",
            altNames: "EE,Eesti,Republic of Estonia,Eesti Vabariik",
            flag: "🇪🇪",
        },
        {
            name: {
                common: "Luxembourg",
                official: "Grand Duchy of Luxembourg",
            },
            cca2: "LU",
            altNames:
                "LU,Grand Duchy of Luxembourg,Grand-Duché de Luxembourg,Großherzogtum Luxemburg,Groussherzogtum Lëtzebuerg",
            flag: "🇱🇺",
        },
        {
            name: { common: "Zimbabwe", official: "Republic of Zimbabwe" },
            cca2: "ZW",
            altNames: "ZW,Republic of Zimbabwe",
            flag: "🇿🇼",
        },
        {
            name: { common: "New Zealand", official: "New Zealand" },
            cca2: "NZ",
            altNames: "NZ,Aotearoa",
            flag: "🇳🇿",
        },
        {
            name: {
                common: "Venezuela",
                official: "Bolivarian Republic of Venezuela",
            },
            cca2: "VE",
            altNames:
                "VE,Bolivarian Republic of Venezuela,Venezuela, Bolivarian Republic of,República Bolivariana de Venezuela",
            flag: "🇻🇪",
        },
        {
            name: { common: "Gambia", official: "Republic of the Gambia" },
            cca2: "GM",
            altNames: "GM,Republic of the Gambia",
            flag: "🇬🇲",
        },
        {
            name: {
                common: "Wallis and Futuna",
                official: "Territory of the Wallis and Futuna Islands",
            },
            cca2: "WF",
            altNames:
                "WF,Territory of the Wallis and Futuna Islands,Territoire des îles Wallis et Futuna",
            flag: "🇼🇫",
        },
        {
            name: { common: "Belgium", official: "Kingdom of Belgium" },
            cca2: "BE",
            altNames:
                "BE,België,Belgie,Belgien,Belgique,Kingdom of Belgium,Koninkrijk België,Royaume de Belgique,Königreich Belgien",
            flag: "🇧🇪",
        },
        {
            name: { common: "Belize", official: "Belize" },
            cca2: "BZ",
            altNames: "BZ",
            flag: "🇧🇿",
        },
        {
            name: {
                common: "Western Sahara",
                official: "Sahrawi Arab Democratic Republic",
            },
            cca2: "EH",
            altNames: "EH,Taneẓroft Tutrimt",
            flag: "🇪🇭",
        },
        {
            name: { common: "Slovenia", official: "Republic of Slovenia" },
            cca2: "SI",
            altNames: "SI,Republic of Slovenia,Republika Slovenija",
            flag: "🇸🇮",
        },
        {
            name: { common: "Syria", official: "Syrian Arab Republic" },
            cca2: "SY",
            altNames:
                "SY,Syrian Arab Republic,Al-Jumhūrīyah Al-ʻArabīyah As-Sūrīyah",
            flag: "🇸🇾",
        },
        {
            name: { common: "Japan", official: "Japan" },
            cca2: "JP",
            altNames: "JP,Nippon,Nihon",
            flag: "🇯🇵",
        },
        {
            name: { common: "Russia", official: "Russian Federation" },
            cca2: "RU",
            altNames: "RU,Russian Federation,Российская Федерация",
            flag: "🇷🇺",
        },
        {
            name: { common: "Lesotho", official: "Kingdom of Lesotho" },
            cca2: "LS",
            altNames: "LS,Kingdom of Lesotho,Muso oa Lesotho",
            flag: "🇱🇸",
        },
        {
            name: { common: "Ireland", official: "Republic of Ireland" },
            cca2: "IE",
            altNames: "IE,Éire,Republic of Ireland,Poblacht na hÉireann",
            flag: "🇮🇪",
        },
        {
            name: { common: "Montenegro", official: "Montenegro" },
            cca2: "ME",
            altNames: "ME,Crna Gora",
            flag: "🇲🇪",
        },
        {
            name: { common: "Andorra", official: "Principality of Andorra" },
            cca2: "AD",
            altNames: "AD,Principality of Andorra,Principat d'Andorra",
            flag: "🇦🇩",
        },
        {
            name: {
                common: "Netherlands",
                official: "Kingdom of the Netherlands",
            },
            cca2: "NL",
            altNames: "NL,Holland,Nederland,The Netherlands",
            flag: "🇳🇱",
        },
        {
            name: { common: "Latvia", official: "Republic of Latvia" },
            cca2: "LV",
            altNames: "LV,Republic of Latvia,Latvijas Republika",
            flag: "🇱🇻",
        },
        {
            name: { common: "Tunisia", official: "Tunisian Republic" },
            cca2: "TN",
            altNames: "TN,Republic of Tunisia,al-Jumhūriyyah at-Tūnisiyyah",
            flag: "🇹🇳",
        },
        {
            name: { common: "Aruba", official: "Aruba" },
            cca2: "AW",
            altNames: "AW",
            flag: "🇦🇼",
        },
        {
            name: { common: "Croatia", official: "Republic of Croatia" },
            cca2: "HR",
            altNames: "HR,Hrvatska,Republic of Croatia,Republika Hrvatska",
            flag: "🇭🇷",
        },
        {
            name: { common: "Mali", official: "Republic of Mali" },
            cca2: "ML",
            altNames: "ML,Republic of Mali,République du Mali",
            flag: "🇲🇱",
        },
        {
            name: {
                common: "Afghanistan",
                official: "Islamic Republic of Afghanistan",
            },
            cca2: "AF",
            altNames: "AF,Afġānistān",
            flag: "🇦🇫",
        },
        {
            name: {
                common: "Sierra Leone",
                official: "Republic of Sierra Leone",
            },
            cca2: "SL",
            altNames: "SL,Republic of Sierra Leone",
            flag: "🇸🇱",
        },
        {
            name: { common: "Iraq", official: "Republic of Iraq" },
            cca2: "IQ",
            altNames: "IQ,Republic of Iraq,Jumhūriyyat al-‘Irāq",
            flag: "🇮🇶",
        },
        {
            name: { common: "Comoros", official: "Union of the Comoros" },
            cca2: "KM",
            altNames:
                "KM,Union of the Comoros,Union des Comores,Udzima wa Komori,al-Ittiḥād al-Qumurī",
            flag: "🇰🇲",
        },
        {
            name: { common: "Egypt", official: "Arab Republic of Egypt" },
            cca2: "EG",
            altNames: "EG,Arab Republic of Egypt",
            flag: "🇪🇬",
        },
        {
            name: {
                common: "Vietnam",
                official: "Socialist Republic of Vietnam",
            },
            cca2: "VN",
            altNames:
                "VN,Socialist Republic of Vietnam,Cộng hòa Xã hội chủ nghĩa Việt Nam,Viet Nam",
            flag: "🇻🇳",
        },
        {
            name: { common: "Vatican City", official: "Vatican City State" },
            cca2: "VA",
            altNames:
                "VA,Holy See (Vatican City State),Vatican City State,Stato della Città del Vaticano",
            flag: "🇻🇦",
        },
        {
            name: { common: "Sint Maarten", official: "Sint Maarten" },
            cca2: "SX",
            altNames: "SX,Sint Maarten (Dutch part)",
            flag: "🇸🇽",
        },
        {
            name: { common: "Slovakia", official: "Slovak Republic" },
            cca2: "SK",
            altNames: "SK,Slovak Republic,Slovenská republika",
            flag: "🇸🇰",
        },
        {
            name: { common: "Singapore", official: "Republic of Singapore" },
            cca2: "SG",
            altNames: "SG,Singapura,Republik Singapura,新加坡共和国",
            flag: "🇸🇬",
        },
        {
            name: { common: "Cook Islands", official: "Cook Islands" },
            cca2: "CK",
            altNames: "CK,Kūki 'Āirani",
            flag: "🇨🇰",
        },
        {
            name: { common: "Eswatini", official: "Kingdom of Eswatini" },
            cca2: "SZ",
            altNames:
                "SZ,Swaziland,weSwatini,Swatini,Ngwane,Kingdom of Eswatini,Umbuso weSwatini",
            flag: "🇸🇿",
        },
        {
            name: { common: "Tonga", official: "Kingdom of Tonga" },
            cca2: "TO",
            altNames: "TO",
            flag: "🇹🇴",
        },
        {
            name: {
                common: "Republic of the Congo",
                official: "Republic of the Congo",
            },
            cca2: "CG",
            altNames: "CG,Congo,Congo-Brazzaville",
            flag: "🇨🇬",
        },
        {
            name: { common: "Guernsey", official: "Bailiwick of Guernsey" },
            cca2: "GG",
            altNames: "GG,Bailiwick of Guernsey,Bailliage de Guernesey",
            flag: "🇬🇬",
        },
        {
            name: { common: "Guadeloupe", official: "Guadeloupe" },
            cca2: "GP",
            altNames: "GP,Gwadloup",
            flag: "🇬🇵",
        },
        {
            name: { common: "Namibia", official: "Republic of Namibia" },
            cca2: "NA",
            altNames: "NA,Namibië,Republic of Namibia",
            flag: "🇳🇦",
        },
        {
            name: {
                common: "Trincca2ad and Tobago",
                official: "Republic of Trincca2ad and Tobago",
            },
            cca2: "TT",
            altNames: "TT,Republic of Trincca2ad and Tobago",
            flag: "🇹🇹",
        },
        {
            name: { common: "Bhutan", official: "Kingdom of Bhutan" },
            cca2: "BT",
            altNames: "BT,Kingdom of Bhutan",
            flag: "🇧🇹",
        },
        {
            name: {
                common: "Hong Kong",
                official:
                    "Hong Kong Special Administrative Region of the People's Republic of China",
            },
            cca2: "HK",
            altNames: "HK",
            flag: "🇭🇰",
        },
        {
            name: {
                common: "South Sudan",
                official: "Republic of South Sudan",
            },
            cca2: "SS",
            altNames: "SS",
            flag: "🇸🇸",
        },
        {
            name: { common: "San Marino", official: "Republic of San Marino" },
            cca2: "SM",
            altNames: "SM,Republic of San Marino,Repubblica di San Marino",
            flag: "🇸🇲",
        },
        {
            name: { common: "Tajikistan", official: "Republic of Tajikistan" },
            cca2: "TJ",
            altNames:
                "TJ,Toçikiston,Republic of Tajikistan,Ҷумҳурии Тоҷикистон,Çumhuriyi Toçikiston",
            flag: "🇹🇯",
        },
        {
            name: { common: "Uganda", official: "Republic of Uganda" },
            cca2: "UG",
            altNames: "UG,Republic of Uganda,Jamhuri ya Uganda",
            flag: "🇺🇬",
        },
        {
            name: { common: "Samoa", official: "Independent State of Samoa" },
            cca2: "WS",
            altNames:
                "WS,Independent State of Samoa,Malo Saʻoloto Tutoʻatasi o Sāmoa",
            flag: "🇼🇸",
        },
        {
            name: {
                common: "Algeria",
                official: "People's Democratic Republic of Algeria",
            },
            cca2: "DZ",
            altNames: "DZ,Dzayer,Algérie",
            flag: "🇩🇿",
        },
        {
            name: {
                common: "Ivory Coast",
                official: "Republic of Côte d'Ivoire",
            },
            cca2: "CI",
            altNames:
                "CI,Côte d'Ivoire,Ivory Coast,Republic of Côte d'Ivoire,République de Côte d'Ivoire",
            flag: "🇨🇮",
        },
        {
            name: {
                common: "United States Virgin Islands",
                official: "Virgin Islands of the United States",
            },
            cca2: "VI",
            altNames: "VI,Virgin Islands, U.S.",
            flag: "🇻🇮",
        },
        {
            name: { common: "Azerbaijan", official: "Republic of Azerbaijan" },
            cca2: "AZ",
            altNames: "AZ,Republic of Azerbaijan,Azərbaycan Respublikası",
            flag: "🇦🇿",
        },
        {
            name: {
                common: "Sri Lanka",
                official: "Democratic Socialist Republic of Sri Lanka",
            },
            cca2: "LK",
            altNames: "LK,ilaṅkai,Democratic Socialist Republic of Sri Lanka",
            flag: "🇱🇰",
        },
        {
            name: {
                common: "Christmas Island",
                official: "Territory of Christmas Island",
            },
            cca2: "CX",
            altNames: "CX,Territory of Christmas Island",
            flag: "🇨🇽",
        },
        {
            name: { common: "Chad", official: "Republic of Chad" },
            cca2: "TD",
            altNames: "TD,Tchad,Republic of Chad,République du Tchad",
            flag: "🇹🇩",
        },
        {
            name: { common: "Argentina", official: "Argentine Republic" },
            cca2: "AR",
            altNames: "AR,Argentine Republic,República Argentina",
            flag: "🇦🇷",
        },
        {
            name: { common: "India", official: "Republic of India" },
            cca2: "IN",
            altNames: "IN,Bhārat,Republic of India,Bharat Ganrajya,இந்தியா",
            flag: "🇮🇳",
        },
        {
            name: { common: "Saint Martin", official: "Saint Martin" },
            cca2: "MF",
            altNames:
                "MF,Collectivity of Saint Martin,Collectivité de Saint-Martin,Saint Martin (French part)",
            flag: "🇲🇫",
        },
        {
            name: { common: "Haiti", official: "Republic of Haiti" },
            cca2: "HT",
            altNames: "HT,Republic of Haiti,République d'Haïti,Repiblik Ayiti",
            flag: "🇭🇹",
        },
        {
            name: { common: "Saint Lucia", official: "Saint Lucia" },
            cca2: "LC",
            altNames: "LC",
            flag: "🇱🇨",
        },
        {
            name: {
                common: "Nepal",
                official: "Federal Democratic Republic of Nepal",
            },
            cca2: "NP",
            altNames:
                "NP,Federal Democratic Republic of Nepal,Loktāntrik Ganatantra Nepāl",
            flag: "🇳🇵",
        },
        {
            name: { common: "Tokelau", official: "Tokelau" },
            cca2: "TK",
            altNames: "TK",
            flag: "🇹🇰",
        },
        {
            name: { common: "Turkmenistan", official: "Turkmenistan" },
            cca2: "TM",
            altNames: "TM",
            flag: "🇹🇲",
        },
        {
            name: { common: "Israel", official: "State of Israel" },
            cca2: "IL",
            altNames: "IL,State of Israel,Medīnat Yisrā'el",
            flag: "🇮🇱",
        },
        {
            name: {
                common: "Caribbean Netherlands",
                official: "Bonaire, Sint Eustatius and Saba",
            },
            cca2: "BQ",
            altNames: "BES islands",
            flag: "🇧🇶",
        },
        {
            name: { common: "Malta", official: "Republic of Malta" },
            cca2: "MT",
            altNames: "MT,Republic of Malta,Repubblika ta' Malta",
            flag: "🇲🇹",
        },
        {
            name: {
                common: "Northern Mariana Islands",
                official: "Commonwealth of the Northern Mariana Islands",
            },
            cca2: "MP",
            altNames:
                "MP,Commonwealth of the Northern Mariana Islands,Sankattan Siha Na Islas Mariånas",
            flag: "🇲🇵",
        },
        {
            name: { common: "Malawi", official: "Republic of Malawi" },
            cca2: "MW",
            altNames: "MW,Republic of Malawi",
            flag: "🇲🇼",
        },
        {
            name: { common: "Gibraltar", official: "Gibraltar" },
            cca2: "GI",
            altNames: "GI",
            flag: "🇬🇮",
        },
        {
            name: { common: "Vanuatu", official: "Republic of Vanuatu" },
            cca2: "VU",
            altNames:
                "VU,Republic of Vanuatu,Ripablik blong Vanuatu,République de Vanuatu",
            flag: "🇻🇺",
        },
        {
            name: {
                common: "United Kingdom",
                official:
                    "United Kingdom of Great Britain and Northern Ireland",
            },
            cca2: "GB",
            altNames: "GB,UK,Great Britain",
            flag: "🇬🇧",
        },
        {
            name: { common: "Martinique", official: "Martinique" },
            cca2: "MQ",
            altNames: "MQ",
            flag: "🇲🇶",
        },
        {
            name: { common: "Mexico", official: "United Mexican States" },
            cca2: "MX",
            altNames:
                "MX,Mexicanos,United Mexican States,Estados Uncca2os Mexicanos",
            flag: "🇲🇽",
        },
        {
            name: {
                common: "Bosnia and Herzegovina",
                official: "Bosnia and Herzegovina",
            },
            cca2: "BA",
            altNames: "BA,Bosnia-Herzegovina,Босна и Херцеговина",
            flag: "🇧🇦",
        },
        {
            name: { common: "Romania", official: "Romania" },
            cca2: "RO",
            altNames: "RO,Rumania,Roumania,România",
            flag: "🇷🇴",
        },
        {
            name: {
                common: "Svalbard and Jan Mayen",
                official: "Svalbard og Jan Mayen",
            },
            cca2: "SJ",
            altNames: "SJ,Svalbard and Jan Mayen Islands",
            flag: "🇸🇯",
        },
        {
            name: {
                common: "Heard Island and McDonald Islands",
                official: "Heard Island and McDonald Islands",
            },
            cca2: "HM",
            altNames: "HM,Heard Island and McDonald Islands",
            flag: "🇭🇲",
        },
        {
            name: {
                common: "British Indian Ocean Territory",
                official: "British Indian Ocean Territory",
            },
            cca2: "IO",
            altNames: "IO",
            flag: "🇮🇴",
        },
        {
            name: { common: "Réunion", official: "Réunion Island" },
            cca2: "RE",
            altNames: "RE,Reunion",
            flag: "🇷🇪",
        },
        {
            name: { common: "Kyrgyzstan", official: "Kyrgyz Republic" },
            cca2: "KG",
            altNames:
                "KG,Киргизия,Kyrgyz Republic,Кыргыз Республикасы,Kyrgyz Respublikasy",
            flag: "🇰🇬",
        },
        {
            name: { common: "Thailand", official: "Kingdom of Thailand" },
            cca2: "TH",
            altNames:
                "TH,Prathet,Thai,Kingdom of Thailand,ราชอาณาจักรไทย,Ratcha Anachak Thai",
            flag: "🇹🇭",
        },
        {
            name: { common: "Burundi", official: "Republic of Burundi" },
            cca2: "BI",
            altNames:
                "BI,Republic of Burundi,Republika y'Uburundi,République du Burundi",
            flag: "🇧🇮",
        },
        {
            name: { common: "Greenland", official: "Greenland" },
            cca2: "GL",
            altNames: "GL,Grønland",
            flag: "🇬🇱",
        },
        {
            name: { common: "Austria", official: "Republic of Austria" },
            cca2: "AT",
            altNames: "AT,Osterreich,Oesterreich",
            flag: "🇦🇹",
        },
        {
            name: { common: "France", official: "French Republic" },
            cca2: "FR",
            altNames: "FR,French Republic,République française",
            flag: "🇫🇷",
        },
        {
            name: { common: "Monaco", official: "Principality of Monaco" },
            cca2: "MC",
            altNames: "MC,Principality of Monaco,Principauté de Monaco",
            flag: "🇲🇨",
        },
        {
            name: { common: "Nauru", official: "Republic of Nauru" },
            cca2: "NR",
            altNames:
                "NR,Naoero,Pleasant Island,Republic of Nauru,Ripublik Naoero",
            flag: "🇳🇷",
        },
        {
            name: { common: "Niger", official: "Republic of Niger" },
            cca2: "NE",
            altNames: "NE,Nijar",
            flag: "🇳🇪",
        },
        {
            name: { common: "American Samoa", official: "American Samoa" },
            cca2: "AS",
            altNames: "AS,Amerika Sāmoa,Amelika Sāmoa,Sāmoa Amelika",
            flag: "🇦🇸",
        },
        {
            name: { common: "Mozambique", official: "Republic of Mozambique" },
            cca2: "MZ",
            altNames: "MZ,Republic of Mozambique,República de Moçambique",
            flag: "🇲🇿",
        },
        {
            name: {
                common: "Timor-Leste",
                official: "Democratic Republic of Timor-Leste",
            },
            cca2: "TL",
            altNames:
                "TL,East Timor,Democratic Republic of Timor-Leste,República Democrática de Timor-Leste,Repúblika Demokrátika Timór-Leste,Timór Lorosa'e,Timor Lorosae",
            flag: "🇹🇱",
        },
        {
            name: { common: "Nicaragua", official: "Republic of Nicaragua" },
            cca2: "NI",
            altNames: "NI,Republic of Nicaragua,República de Nicaragua",
            flag: "🇳🇮",
        },
        {
            name: { common: "Panama", official: "Republic of Panama" },
            cca2: "PA",
            altNames: "PA,Republic of Panama,República de Panamá",
            flag: "🇵🇦",
        },
        {
            name: { common: "Poland", official: "Republic of Poland" },
            cca2: "PL",
            altNames: "PL,Republic of Poland,Rzeczpospolita Polska",
            flag: "🇵🇱",
        },
        {
            name: { common: "Libya", official: "State of Libya" },
            cca2: "LY",
            altNames: "LY,State of Libya,Dawlat Libya",
            flag: "🇱🇾",
        },
    ],

    /**
        Where all regexps are defined to identify different type of strings
        * * 🟢 generic, it is a Object
        @@return Object
        @example
            // { delHtmlTag : ..., ... }
    */
    Reg: {
        /**
            Identify string in html tag
            * * 🟢 generic, it is a regexp
            @@return Regexp
        */
        htmlTag: new RegExp(/.*?>([^<]*)/),
        /**
            Identify Brackets in html tag
            * * 🟢 generic, it is a regexp
            @@return Regexp
        */
        inBrackets: new RegExp(/\[[^\[\]]*\]/),
        /**
            Identify Strings in html tag
            * * 🟢 generic, it is a regexp
            @@return Regexp
        */
        inStrings: new RegExp(/.*?\"([^\"]*)/),
        /**
            Identify html tag or arrays (brackets)
            * * 🟢 generic, it is a regexp
         *   @return Regexp
        */
        TagRegex: new RegExp(
            /<([a-z][a-z0-9]*)[^>]*>([^<]*)<\/\1>|(\[(.*?)\])/i
        ),
        /**
            Identify the first open Parenthese
            * * 🟢 generic, it is a regexp
            @return Regexp
        */
        openParentheses: new RegExp(/^(.*?)\(/),
        /**
            Identify all spaces
            * * 🟢 generic, it is a regexp
            @return Regexp
        */
        allSpaces: new RegExp(/\S+/g),
        /**
            Identify any date
            * * 🟢 generic, it is a regexp
            @return Regexp
        */
        iso_datetime_regex: new RegExp(
            /\d{4}-\d{2}-\d{2}(?:T|\s)\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}(?::\d{2})?)/
        ),
    },

    /**
        Object with dates properties
        * * 🟢 generic, it is a Object
        @return Object
    */
    Dates: {
        /**
            Return Day, month and year
            * * 🟢 generic, it is a string
            @return String
            @example
                // "DD/MM/YYYY"
        */
        DATE: "DD/MM/YYYY",
        /**
            Return the hours with minutes
            * * 🟢 generic, it is a string
            @return String
            @example
                // "HH:mm:ss"
        */
        TIME: "HH:mm",
        /**
            Return the Date with Hours and minutes
            * * 🟢 generic, it is a string
            @return String
            @example
                // "DD/MM/YYYY,HH:mm:ss"
        */
        DATE_TIME: "DD/MM/YYYY,HH:mm:ss",
        /**
            Return all countries with date format
            * * 🟢 generic, it is a Object
            @return Object
            @example
                // { ..., 'FR': 'DD/MM/YYYY',... }
        */
        DATE_ISO: {
            AD: "DD/MM/YYYY",
            AT: "DD.MM.YYYY",
            BE: "DD/MM/YYYY",
            BG: "DD.MM.YYYY",
            CH: "DD.MM.YYYY",
            CY: "DD/MM/YYYY",
            CZ: "DD.MM.YYYY",
            DE: "DD.MM.YYYY",
            DK: "DD.MM.YYYY",
            EE: "DD.MM.YYYY",
            ES: "DD/MM/YYYY",
            FI: "DD.MM.YYYY",
            FR: "DD/MM/YYYY",
            GB: "DD/MM/YYYY",
            GR: "DD/MM/YYYY",
            HR: "DD.MM.YYYY",
            HU: "YYYY.MM.DD.",
            IE: "DD/MM/YYYY",
            IS: "DD.MM.YYYY",
            IT: "DD/MM/YYYY",
            LI: "DD.MM.YYYY",
            LT: "YYYY.MM.DD",
            LU: "DD/MM/YYYY",
            LV: "DD.MM.YYYY",
            MC: "DD/MM/YYYY",
            MT: "DD/MM/YYYY",
            NL: "DD-MM-YYYY",
            NO: "DD.MM.YYYY",
            PL: "DD.MM.YYYY",
            PT: "DD/MM/YYYY",
            RO: "DD.MM.YYYY",
            SE: "YYYY-MM-DD",
            SI: "DD.MM.YYYY",
            SK: "DD.MM.YYYY",
            SM: "DD/MM/YYYY",
            TR: "DD.MM.YYYY",
            US: "MM/DD/YYYY",
            CA: "MM/DD/YYYY",
            JP: "YYYY年MM月DD日",
            CN: "YYYY年MM月DD日",
            KR: "YYYY-MM-DD",
        },
    },

    /**
        Custom response codes
        * * 🟢 generic, it is a Object
        @return Object
    */
    ResCodes: {
        /**
            Custom Property
            * * 🟢 generic, it is a number
            @return Number
            @example
                // 0
        */
        NOT_INIT: 0,
        /**
            Custom Property
            * * 🟢 generic, it is a number
            @return Number
            @example
                // 1
        */
        IS_INIT: 1,
        /**
            Custom Property
            * * 🟢 generic, it is a number
            @return Number
            @example
                // 2
        */
        NOT_FOUND_INIT: 2,
        /**
            Custom Property
            * * 🟢 generic, it is a number
            @return Number
            @example
                // 9
        */
        NOT_FOUND: 9,
    },

    /**
        Custom Array
        * * 🟢 generic, it is a array
        @return Array
        @example
            // [{...}, { ...}]
    */
    typeOfData: [
        {
            type: "success",
            color: "teal-3",
            icon: "alpha-a-circle",
            state: "Active member",
        },
        {
            type: "warning",
            color: "blue-4",
            icon: "alpha-a-circle",
            state: "Affiliate member",
        },
        {
            type: "info",
            color: "cyan-11",
            icon: "alpha-a-circle",
            state: "Associate member",
        },
        {
            type: "error",
            color: "grey-4",
            icon: "alpha-s-circle",
            state: "Suspended",
        }, {
            type: "info",
            color: "blue-11",
            icon: "person_add",
            state: "recent",
        },
        {
            type: "warning",
            color: "light-blue-5",
            icon: "directions_boat",
            state: "Freight",
        },
        {
            type: "info",
            color: "cyan-5",
            icon: "person",
            state: "Passenger",
        },
        {
            type: "warning",
            color: "teal-4",
            icon: "business",
            state: "Infra- structure",
        },
        {
            type: "info",
            color: "teal-12",
            icon: "data_thresholding",
            state: "Holding",
        },
        {
            type: "info",
            color: "green-3",
            icon: "integration_instructions",
            state: "Integrated",
        },
        {
            type: "warning",
            color: "blue-grey-7",
            icon: "alt_route",
            state: "Other",
        }
    ],
};