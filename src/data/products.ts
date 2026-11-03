export type ProductImage = {
  thumbnail: string;
  mobile: string;
  tablet: string;
  desktop: string;
};

export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: ProductImage;
};


function imageSet(name: string): ProductImage {
  return {
    thumbnail: `/images/image-${name}-thumbnail.jpg`,
    mobile: `/images/image-${name}-mobile.jpg`,
    tablet: `/images/image-${name}-tablet.jpg`,
    desktop: `/images/image-${name}-desktop.jpg`,
  };
}

export const products: Product[] = [
  { id: 1, name: "Waffle with Berries", category: "Waffle", price: 6.5, image: imageSet("waffle") },
  { id: 2, name: "Vanilla Bean Crème Brûlée", category: "Crème Brûlée", price: 7, image: imageSet("creme-brulee") },
  { id: 3, name: "Macaron Mix of Five", category: "Macaron", price: 8, image: imageSet("macaron") },
  { id: 4, name: "Classic Tiramisu", category: "Tiramisu", price: 5.5, image: imageSet("tiramisu") },
  { id: 5, name: "Pistachio Baklava", category: "Baklava", price: 4, image: imageSet("baklava") },
  { id: 6, name: "Lemon Meringue Pie", category: "Pie", price: 5, image: imageSet("meringue") },
  { id: 7, name: "Red Velvet Cake", category: "Cake", price: 4.5, image: imageSet("cake") },
  { id: 8, name: "Salted Caramel Brownie", category: "Brownie", price: 5.5, image: imageSet("brownie") },
  { id: 9, name: "Vanilla Panna Cotta", category: "Panna Cotta", price: 6.5, image: imageSet("panna-cotta") },
];