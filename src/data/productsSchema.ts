import { z } from 'zod';

// Adjust fields as needed based on your sheet structure
export const ProductSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  unitNumber: z.string().optional(),
  ingredients: z.string().optional(),
  allergy: z.string().optional(),
  price: z.preprocess((val) => {
    if (typeof val === 'string') return parseFloat(val.replace(',', '.'));
    if (typeof val === 'number') return val;
    return undefined;
  }, z.number()),
  image: z.string().url().optional(),
  category: z.string().optional(),
  vegan: z.string().optional(),
});

export const ProductsSheetSchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;
export type ProductsSheet = z.infer<typeof ProductsSheetSchema>;
