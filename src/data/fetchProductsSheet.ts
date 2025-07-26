import { ProductsSheetSchema } from './productsSchema';
import type { Product } from './productsSchema';

const SHEET_ID = import.meta.env.GOOGLE_SHEET_ID;
const SHEET_NAME = import.meta.env.GOOGLE_FOOD_SHEET || 'products';
const API_KEY = import.meta.env.GOOGLE_API_KEY;


const BASE_IMAGE_PATH = '/src/assets/product-pictures/';
const BASE_URL = import.meta.env.SITE || 'http://localhost:4321';

function getImageUrl(imageField: string | undefined) {
  if (!imageField) return '';
  if (imageField.startsWith('http://') || imageField.startsWith('https://')) {
    return imageField;
  }
  // Remove any accidental leading/trailing whitespace
  const clean = imageField.trim();
  // If already starts with /src/assets, just prepend BASE_URL
  if (clean.startsWith('/src/assets')) {
    return BASE_URL + clean;
  }
  return BASE_URL + BASE_IMAGE_PATH + clean;
}

export async function fetchProductsSheet(): Promise<Product[]> {
  if (!SHEET_ID || !API_KEY) throw new Error('Missing Google Sheet credentials');
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch Google Sheet');
  const data = await res.json();
  // Google Sheets API returns data.values as an array of arrays
  const [header, ...rows] = data.values;
  const products = rows.map((row: unknown[]) => {
    const obj: Record<string, unknown> = {};
    header.forEach((key: string, i: number) => {
      if (key === 'image') {
        obj[key] = getImageUrl(row[i] as string);
      } else {
        obj[key] = row[i] ?? '';
      }
    });
    return obj;
  });
  // Validate with Zod
  return ProductsSheetSchema.parse(products);
}
