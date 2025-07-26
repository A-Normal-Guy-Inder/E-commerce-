import { Category } from './Category';
export interface Product {
    _id?: string;
    name: string;
    shortDescription: string;
    description: string;
    Price: number;
    discount: number;
    images: string[];
    CategoryID: string | Category; 
    isFeatured: Boolean;
    New: Boolean;
}
