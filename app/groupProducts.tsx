export interface Product {
    id: string;
    name: string;
    store: string;
    price: number | string;
    category: string;
    image: string;
  }
  
  export interface Preferences {
    supermarket: string[];
    categories: string[];
  }
  
  export interface Variant {
    store: string;
    price: number;
    image: string;
  }
  
  export interface GroupedProduct {
    name: string;
    category: string;
    image: string;
    minPrice: number;
    store: string;
    variants: Variant[];
  }

  export const groupProductsByName = (
    products: Product[],
    preferences: Preferences,
    category: string | null = null
  ): GroupedProduct[] => {
    const filtered = products.filter((product) => {
      const matchStore = preferences.supermarket.includes(product.store);
      const matchCategory = preferences.categories.includes(product.category);
      const matchSelectedCategory = category ? product.category === category : true;
      return matchStore && matchCategory && matchSelectedCategory;
    });
  
    const grouped: { [key: string]: Omit<GroupedProduct, 'image' | 'minPrice' | 'store'> & { variants: Variant[] } } = {};
  
    for (const item of filtered) {
      const key = item.name;
      if (!grouped[key]) {
        grouped[key] = {
          name: item.name,
          category: item.category,
          variants: [],
        };
      }
      grouped[key].variants.push({
        store: item.store,
        price: parseFloat(item.price as string),
        image: item.image,
      });
    }
  
    return Object.values(grouped).map((group) => {
      const cheapest = group.variants.reduce((a, b) => (a.price < b.price ? a : b));
      return {
        name: group.name,
        category: group.category,
        image: cheapest.image,
        minPrice: cheapest.price,
        store: cheapest.store,
        variants: group.variants,
      };
    }).sort((a, b) => a.minPrice - b.minPrice);
  };