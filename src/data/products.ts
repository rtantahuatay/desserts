export type Product = {
  id: number;       
  name: string;     
  category: string; 
  price: number;    
  image: string;    
};


export const products: Product[] = [
  { id: 1, name: "Waffle with Berries", category: "Waffle", price: 6.5, image: "/images/waffle.svg" },
  { id: 2, name: "Vanilla Bean Crème Brûlée", category: "Crème Brûlée", price: 7, image: "/images/creme-brulee.svg" },
  { id: 3, name: "Macaron Mix of Five", category: "Macaron", price: 8, image: "/images/macaron.svg" },
  { id: 4, name: "Classic Tiramisu", category: "Tiramisu", price: 5.5, image: "/images/tiramisu.svg" },
  { id: 5, name: "Pistachio Baklava", category: "Baklava", price: 4, image: "/images/baklava.svg" },
  { id: 6, name: "Lemon Meringue Pie", category: "Pie", price: 5, image: "/images/meringue.svg" },
  { id: 7, name: "Red Velvet Cake", category: "Cake", price: 4.5, image: "/images/cake.svg" },
  { id: 8, name: "Salted Caramel Brownie", category: "Brownie", price: 5.5, image: "/images/brownie.svg" },
  { id: 9, name: "Vanilla Panna Cotta", category: "Panna Cotta", price: 6.5, image: "/images/panna-cotta.svg" },
];