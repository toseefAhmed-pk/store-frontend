/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core'
import { Product } from 'src/app/models/products.model'
import { ProductsService } from 'src/app/services/products/products.service'
import { ActivatedRoute } from '@angular/router'
import { CartService } from 'src/app/services/cart/cart.service'
import { AnimationService } from 'src/app/services/animation/animation.service'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import { Location } from '@angular/common'

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  product: Product = {
    name: '',
    price: 0,
    details: '',
    avatar: '',
    rating: 0,
    quantity: 1,
  }
  quantity: number = 1
  faArrowLeft = faArrowLeft

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private cartService: CartService,
    private animation: AnimationService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productService
        .getProductByID(params['id'] as number)
        .subscribe((res) => {
          this.product = res
          console.log('this.product')
          console.log(this.product)
        })
    })
  }

  addToCart(): void {
    this.cartService.add(this.product, this.quantity)
    this.animation.loadAnimation('success', 'Item(s) added to cart.')
  }

  setQuantity(e: Event): void {
    this.quantity = parseInt((e.target as HTMLSelectElement).value)
  }

  ContinueShopping(): void {
    this.location.back()
  }
}
