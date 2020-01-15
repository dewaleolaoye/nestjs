import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  private products: Product[] = []

  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

  // Add Product
  async insertProduct(title: string, desc: string, price: number) {
    // const prodId = Math.random().toLocaleString()
    const newProduct = new this.productModel({
      title,
      desc,
      price
    });

    const result = await newProduct.save();
    console.log('The result', result)


    return { ...result }
  }

  // Get all Product
  getProducts() {
    return [...this.products]
  }

  // Get single Product
  getSingleProduct(productId: string) {
    const product = this.findProduct(productId)[0]

    return { ...product }

  }

  // Update Product
  updateProduct(productId: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(productId)
    const updatedProduct = { ...product }

    if (title) {
      updatedProduct.title = title;
    }

    if (desc) {
      updatedProduct.desc = desc;
    }

    if (price) {
      updatedProduct.price = price;
    }
    this.products[index] = updatedProduct;

  }

  // Delete Product

  deleteProduct(productId: string) {
    const index = this.findProduct(productId)[1]
    this.products.splice(index, 1)


  }

  // Find Product 

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id)

    const product = this.products[productIndex]

    if (!product) {
      throw new NotFoundException('Noooot found')
    }

    return [product, productIndex]
  }

}
