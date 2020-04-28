/**
 * more positive proverbs
 * use for 0-3 errors in excersise
 */

const betterProverbs: string[] = [
	"Allt er það vænt sem vel er grænt",
	"Fátt er betra en fara vel",
	"Hver er sinnar gæfu smiður",
	"Sjaldan er ein báran stök",
	"Þegar ein báran rís er önnur vís",
	"Penninn vinnur meira en sverðið",
	"Hæfilegt starf sigrar alla hluti",
	"Alls staðar er vitur velkominn",
	"Aldrei er góð vísa of oft kveðin",
	"Svo bjargast bý sem birnir",
	"Oft verður góður hestur úr göldum fola",
	"Allir hanar hafa kambinn",
	"Að sínu er best að búa",
	"Best er að smíða meðan járnið er heitt",
	"Betri er einn fugl í hendi en tveir í skógi",
	"Blindur er bóklaus maður",
	"Bók er best vina",
	"Býður enginn betur en sjálfur hefur",
	"Hamra skal járn meðan heitt er",
];

/**
 * more encouraging proverbs
 * use for 4+ errors in excersise
 */

const goodProverbs: string[] = [
	"Betra er hálft brauð en allt misst",
	"Fyrr lægir ljós en lokið er degi",
	"Lifir eik þótt laufið fjúki",
	"Kulnar eldur nema kyntur sé",
	"Hamra skal járn meðan heitt er",
	"Það munar ekki um einn kepp í sláturtíðinni",
	"Hirða má við hálfum skaða",
	"Betra er hálfur skaði en allur",
	"Eftir storminn lifir aldan",
	"Margur drukknar nærri landi",
	"Betra er lítill fiskur en tómur diskur",
	"Flýtur meðan ekki sekkur",
	"Æfingin skapar meistarann",
	"Vinna gerir væran svefn",
	"Sá er sæll sem sínu ann",
	"Enginn er of gamall gott að læra",
	"Enginn er óbarinn biskup",
	"Drjúgt er það sem drýpur",
	"Aldrei skal gráta gegna stund",
	"Ekkert er fullreynt í fyrsta sinn",
	"Ei fellur tré við hið fyrsta högg",
	"Dagur kemur eftir þennan dag",
	"Flest er hey í harðindum",
	"Hvetja verður hníf ef bitlaus",
	"Sjaldan koma öll kurl til grafar",
	"Betra er hálfur skaði en allur",
];

export const getRandomProverb = (numberOfErrors: number) => {
	if (numberOfErrors < 4) return betterProverbs[Math.floor(betterProverbs.length * Math.random())];
	else return goodProverbs[Math.floor(goodProverbs.length * Math.random())];
};