export type RouteItem = {
  from: string;
  to: string;
  basePrice: number; // minimal price in RUB
  distanceKm?: number;
  slugFrom: string;
  slugTo: string;
};

export const popularRoutes: RouteItem[] = [
  { from: "Сочи", to: "Анапа", basePrice: 2500, distanceKm: 330, slugFrom: "sochi", slugTo: "anapa" },
  { from: "Сочи", to: "Новороссийск", basePrice: 2800, distanceKm: 300, slugFrom: "sochi", slugTo: "novorossiysk" },
  { from: "Минеральные Воды", to: "Пятигорск", basePrice: 900, distanceKm: 25, slugFrom: "minvody", slugTo: "pyatigorsk" },
  { from: "Минеральные Воды", to: "Ставрополь", basePrice: 2000, distanceKm: 170, slugFrom: "minvody", slugTo: "stavropol" },
  { from: "Краснодар", to: "Сочи", basePrice: 3500, distanceKm: 300, slugFrom: "krasnodar", slugTo: "sochi" },
];

export function findRoute(slugFrom: string, slugTo: string): RouteItem | undefined {
  return popularRoutes.find(r => r.slugFrom === slugFrom && r.slugTo === slugTo);
}
