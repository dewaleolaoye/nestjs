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
  async getProducts() {
    const products = await this.productModel.find().exec();

    return products.map(({ id, title, desc, price }) => ({
      id,
      title,
      desc,
      price
    }))
  }

  // Get single Product
  async getSingleProduct(productId: string) {
    const product = await this.findProduct(productId)
    return {
      id: product.id,
      title: product.title,
      desc: product.desc,
      price: product.price
    }
  }

  // Update Product
  async updateProduct(productId: string, title: string, desc: string, price: number) {
    const updatedProduct = await this.findProduct(productId)
    // const updatedProduct = { ...product }

    if (title) {
      updatedProduct.title = title;
    }

    if (desc) {
      updatedProduct.desc = desc;
    }

    if (price) {
      updatedProduct.price = price;
    }

    updatedProduct.save()

  }

  // Delete Product

  async deleteProduct(prodId: string) {
    // const index = this.findProduct(productId)[1]
    // this.products.splice(index, 1)

    const result = await this.productModel.deleteOne({ _id: prodId }).exec();

    if (result.n === 0) {
      throw new NotFoundException('Product not found')
    }

  }

  // Find Product 

  private async findProduct(id: string): Promise<Product> {
    let product;
    try {
      product = await this.productModel.findById(id).exec()
    } catch (error) {
      throw new NotFoundException('Could not found the product')
    }
    if (!product) {
      throw new NotFoundException('Could not found the product')
    }

    return product;
  }

}
