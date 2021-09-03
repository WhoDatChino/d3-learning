// If a coin is sold, the current value of that coin should no longer be reflected, nor should the original cpaital and asset amounts

export const state = {
  assetClasses: [
    {
      asset: "Bitcoin",
      ticker: "btc",
      currentPrice: 44812.6,
      assetAmount: 0.01409,
      originalCapital: 500,
      currentValue: 631.4271,
      soldPositions: [
        {
          date: " 22 Jan 2021",
          initialValue: 30,
          assetAmount: 0.00156,
          sellValue: 50,
        },
        {
          date: " 19 Dec 2020",
          initialValue: 90,
          assetAmount: 0.00375,
          sellValue: 90,
        },
      ],
      macros: [
        {
          asset: "Bitcoin",
          id: Math.floor(Math.random() * 1000000),
          originalCapital: 500,
          assetAmount: 0.01409,
          currentValue: 631.4271,
          date: "19 June 2021",
          sold: false,
          platform: "gemini",
        },
        {
          asset: "Bitcoin",
          id: Math.floor(Math.random() * 1000000),
          originalCapital: 30,
          assetAmount: 0.00156,
          currentValue: 60.372,
          date: "6 Dec 2020",
          sold: true,
          platform: "coinbase",
        },
        {
          asset: "Bitcoin",
          id: Math.floor(Math.random() * 1000000),
          originalCapital: 60,
          assetAmount: 0.00375,
          currentValue: 145.125,
          date: "16 Nov 2020",
          sold: true,
          platform: "coinbase",
        },
      ],
    },
    {
      asset: "Ethereum",
      ticker: "eth",
      currentPrice: 2517,
      assetAmount: 0.5,
      originalCapital: 1000,
      currentValue: 1258.5,
      soldPositions: [
        {
          date: " 11 Mar 2021",
          initialValue: 326.54,
          assetAmount: 0.18192,
          sellValue: 339.614,
        },
      ],
      macros: [
        {
          asset: "Ethereum",
          id: Math.floor(Math.random() * 1000000),
          originalCapital: 200,
          assetAmount: 0.16129,
          currentValue: 405.96693,
          date: "24 Jan 2021",
          sold: false,
          platform: "coinbase",
        },
        {
          asset: "Ethereum",
          id: Math.floor(Math.random() * 1000000),
          originalCapital: 800,
          assetAmount: 0.33871,
          currentValue: 852.53307,
          date: "24 Apr 2021",
          sold: false,
          platform: "gemini",
        },
        {
          asset: "Ethereum",
          id: Math.floor(Math.random() * 1000000),
          originalCapital: 300,
          assetAmount: 0.21246,
          currentValue: 534.77337,
          date: "1 Mar 2021",
          sold: true,
          platform: "coinbase",
        },
      ],
    },
    {
      asset: "Dogecoin",
      ticker: "doge",
      currentPrice: 0.1,
      assetAmount: 1136.36364,
      originalCapital: 250,
      currentValue: 113.63636,
      soldPositions: [],
      macros: [
        {
          asset: "Dogecoin",
          id: Math.floor(Math.random() * 1000000),
          originalCapital: 250,
          assetAmount: 1136.36364,
          currentValue: 113.63636,
          date: "9 Jul 2021",
          sold: false,
          platform: "gemini",
        },
      ],
    },
  ],
  marketStats: {},
  platforms: ["gemini", "coinbase"],
};

export const coins = state.assetClasses
  .flatMap((asset) => {
    return asset.macros;
  })
  .filter((coin) => !coin.sold)
  .map((coin) => {
    const value =
      ((coin.currentValue - coin.originalCapital) / coin.originalCapital) * 100;
    // console.log(change);
    return {
      value,
      ...coin,
    };
  });

export const byCoin = state.assetClasses.filter((asset) => !asset.macros.sold);

// The treemap needs an input of the data in the form of an object and not an array
export let formattedArr = {
  name: "Portfolio",
  //   value: 100,
  children: formatAssets(),
};

function formatAssets() {
  let children = [];
  byCoin.forEach((asset, i) => {
    // Making sure there is no assetClass sent to the root element if it has no unsold children investments
    if (formatIndivdCoins(i).length === 0) return;

    children.push({
      name: asset.asset,
      //   value: (asset.currentValue / calcFrac()) * 100,
      children: formatIndivdCoins(i),
    });
  });
  // console.log(`child1`, children);
  return children;
}

function formatIndivdCoins(i) {
  let children = [];
  //   console.log(`macs`, state.assetClasses.macros);
  const asset = state.assetClasses[i];

  asset.macros.forEach((macro) => {
    if (macro.sold) return;

    const value =
      ((macro.currentValue - macro.originalCapital) / macro.originalCapital) *
      100;

    children.push({
      id: macro.id,
      name: macro.asset,
      date: macro.date,
      value,
    });
  });

  return children;
}

function calcFrac() {
  return state.assetClasses.reduce(
    (acc, coin) => (acc += coin.currentValue),
    0
  );
}

export function platforms() {
  let coinPlatforms = [];
  state.platforms.forEach((platform) => {
    coinPlatforms.push(coins.filter((coin) => coin.platform === platform));
  });
  console.log(coinPlatforms);
}
