import { Controller, Post, Body, Get, Param, Patch, Delete, Res, Req } from '@nestjs/common';
import { ProductsService } from './products.service';

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

    return {
      status: 201,
      message: `You 've successfully added ${prodTitle}`,
      data: {
        id: generatedId.id,
        title: generatedId.title,
        descritpion: generatedId.desc,
        price: generatedId.price
      }
    }
  }

  // Get all product
  @Get()
  async getAllProducts() {

    const products = await this.ProductsService.getProducts()
    return products;
  }

  // Get a single product

  @Get(':id')
  getProduct(@Param('id') prodId: string): any {
    return this.ProductsService.getSingleProduct(prodId)
  }

  // Update Product

  @Patch(':id')
  async updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number
  ): Promise<any> {
    await this.ProductsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)

    return {
      status: 200,
      message: `Product is updated successfully`
    }
  }

  // Delete Product

  @Delete(':id')
  async deleteProduct(@Param('id') prodId: string) {
    await this.ProductsService.deleteProduct(prodId)
    return {
      status: 200,
      message: `Products with ${prodId} deleted successfully`
    }
  }
}
