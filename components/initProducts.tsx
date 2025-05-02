import {
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



import milk from "../assets/images/milk.jpg"
import orangeJuice from '../assets/images/orange-juice.jpg'
import appleJuice from '../assets/images/apple-juice.jpg'
import bread from '../assets/images/bread.jpg'
import yogurt from '../assets/images/yogurt.jpg'
import delactyog from '../assets/images/delactYogurt.jpg'
import halloumi from '../assets/images/halloumi.png'
import delactMilk from '../assets/images/delactMilk.jpg'
import butter from '../assets/images/butter.jpg'
import edam from '../assets/images/edam.jpg'
import gouda from '../assets/images/gouda.jpg'

export const initialize = async () => {
  const existing = await AsyncStorage.getItem('products');
  
  if (existing && JSON.parse(existing).length > 0) return;

  const defaultProducts = [
    {
      id: `Apple-Juice-Lidl-${Date.now()}`,
      name: 'Apple Juice',
      store: 'Lidl',
      price: '2.99',
      category: 'Juices',
      image: Image.resolveAssetSource(appleJuice).uri,
    },
    {
                  id: `Orange-Juice-Lidl-${Date.now()}`,
                  name: 'Orange Juice',
                  store: 'Lidl',
                  price: '3.49',
                  category: 'Juices',
                  image: Image.resolveAssetSource(orangeJuice).uri,
                },
                {
                  id: `Whole-Milk-Alphamega-${Date.now()}`,
                  name: 'Whole Milk',
                  store: 'Alphamega',
                  price: '1.95',
                  category: 'Dairy',
                  image: Image.resolveAssetSource(milk).uri,
                },
                {
                  id: `Whole-Milk-Sklavenitis-${Date.now()}`,
                  name: 'Whole Milk',
                  store: 'Sklavenitis',
                  price: '1.99',
                  category: 'Dairy',
                  image: Image.resolveAssetSource(milk).uri,
                },
                {
                  id:`Whole-Milk-Poplife-${Date.now()}`,
                  name: 'Whole Milk',
                  store: 'Poplife',
                  price: '2.05',
                  category: 'Dairy',
                  image: Image.resolveAssetSource(milk).uri,
                },
                {
                  id: `Whole-Milk-Lidl-${Date.now()}`,
                  name: 'Whole Milk',
                  store: 'Lidl',
                  price: '1.79',
                  category: 'Dairy',
                  image: Image.resolveAssetSource(milk).uri,
                },
                {
                  id: `Greek-Yogurt-Alphamega-${Date.now()}`,
                  name: 'Greek Yogurt',
                  store: 'Alphamega',
                  price: '1.65',
                  category: 'Dairy',
                  image: Image.resolveAssetSource(yogurt).uri,
                },
                {
                  id: `Greek-Yogurt-Sklavenitis-${Date.now()}`,
                  name: 'Greek Yogurt',
                  store: 'Sklavenitis',
                  price: '1.70',
                  category: 'Dairy',
                  image: Image.resolveAssetSource(yogurt).uri,
                },
                {
                  id: `Greek-Yogurt-Poplife-${Date.now()}`,
                  name: 'Greek Yogurt',
                  store: 'Poplife',
                  price: '1.85',
                  category: 'Dairy',
                  image: Image.resolveAssetSource(yogurt).uri,
                },
                {
                  id: `Greek-Yogurt-Lidl-${Date.now()}`,
                  name: 'Greek Yogurt',
                  store: 'Lidl',
                  price: '1.49',
                  category: 'Dairy',
                  image: Image.resolveAssetSource(yogurt).uri,
                },
                {
                  id: `Greek-Delact-Yogurt-Lidl-${Date.now()}`,
                  name: 'Greek Delact Yogurt',
                  store: 'Lidl',
                  price: '1.49',
                  category: 'Dairy',
                  image: Image.resolveAssetSource(delactyog).uri,
                },
                {
                  id: `Halloumi-Cheese-Alphamega-${Date.now()}`,
                  name: 'Halloumi',
                  store: 'Alphamega',
                  price: '3.95',
                  category: 'Dairy',
                  image: Image.resolveAssetSource(halloumi).uri,
                },
                {
                  id: `Halloumi-Cheese-Sklavenitis-${Date.now()}`,
                  name: 'Halloumi',
                  store: 'Sklavenitis',
                  price: '4.15',
                  category: 'Dairy',
                  image: Image.resolveAssetSource(halloumi).uri,
                },
                {
                  id: `Halloumi-Cheese-Lidl-${Date.now()}`,
                  name: 'Halloumi',
                  store: 'Lidl',
                  price: '3.69',
                  category: 'Dairy',
                  image: Image.resolveAssetSource(halloumi).uri,
                },
                {
                  id: `Edam-Cheese-Alphamega-${Date.now()}`,
                  name: 'Edam Cheese',
                  store: 'Alphamega',
                  price: '2.50',
                  category: 'Dairy',
                  image: Image.resolveAssetSource(edam).uri,
                },
                {
                  id: `Gouda-Cheese-Alphamega-${Date.now()}`,
                  name: 'Gouda Cheese',
                  store: 'Alphamega',
                  price: '2.70',
                  category: 'Dairy',
                  image: Image.resolveAssetSource(gouda).uri,
                },
                {
                  id: `Delack-Milk-Sklavenitis-${Date.now()}`,
                  name: 'Delact Milk',
                  store: 'Sklavenitis',
                  price: '2.59',
                  category: 'Dairy',
                  image: Image.resolveAssetSource(delactMilk).uri,
                },
                {
                  id: `Butter-Alphamega-${Date.now()}`,
                  name: 'Butter',
                  store: 'Alphamega',
                  price: '2.25',
                  category: 'Dairy',
                  image: Image.resolveAssetSource(butter).uri,
                },
                {
                  id: `Butter-Lidl-${Date.now()}`,
                  name: 'Butter',
                  store: 'Lidl',
                  price: '2.05',
                  category: 'Dairy',
                  image: Image.resolveAssetSource(butter).uri,
                },
                {
                  id: `Bread-Alphamega-${Date.now()}`,
                  name: 'Bread',
                  store: 'Alphamega',
                  price: '1.49',
                  category: 'Bread',
                  image: Image.resolveAssetSource(bread).uri,
                },
  ];

  await AsyncStorage.setItem('products', JSON.stringify(defaultProducts));
};
export default initialize;