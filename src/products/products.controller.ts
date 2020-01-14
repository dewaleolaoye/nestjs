import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) { }

  // Add Product

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number

  ) {

    const generatedId = this.ProductsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice
    );

    return { id: generatedId }
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
  }

  // Delete Product

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    this.ProductsService.deleteProduct(prodId)
    return {
      message: `Products with ${prodId} deleted successfully`
    }
  }
}
