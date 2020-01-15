import { Controller, Post, Body, Get, Param, Patch, Delete, Res, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { response } from 'express';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) { }

  // Add Product
  @Post()
  async addProduct(
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number
  ) {

    const generatedId = await this.ProductsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice
    );

    // const {prodPrice, prodDesc, prodPrice} = generatedId
    console.log('generated', generatedId._doc)
    return {
      status: 201,
      message: `You 've successfully added ${prodTitle}`,
      data: generatedId._doc
    }
  }

  // Get all product

  @Get()
  getAllProducts(): any {

    return this.ProductsService.getProducts()
  }

  // Get a single product

  @Get(':id')
  getProduct(@Param('id') prodId: string): any {
    return this.ProductsService.getSingleProduct(prodId)
  }

  // Update Product

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number
  ) {
    this.ProductsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)

    return {
      status: 200,
      message: `Product with id: ${prodId} is updated successfully`
    }
  }

  // Delete Product

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    this.ProductsService.deleteProduct(prodId)
    return {
      status: 200,
      message: `Products with ${prodId} deleted successfully`
    }
  }
}
