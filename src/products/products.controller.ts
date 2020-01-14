import { Controller, Post, Body, Get, Param, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly ProductsService: ProductsService) { }

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number,

    // @Res() response: any

  ) {
    // console.log(response.body)
    const generatedId = this.ProductsService.insertProduct(
      prodTitle,
      prodDesc,
      prodPrice
    );

    return { id: generatedId }
  }

  @Get()
  getAllProducts(): any {

    return this.ProductsService.getProducts()
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string): any {
    return this.ProductsService.getSingleProduct(prodId)
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('desc') prodDesc: string,
    @Body('price') prodPrice: number
  ) {
    this.ProductsService.updateProduct(prodId, prodTitle, prodDesc, prodPrice)


  }
}
