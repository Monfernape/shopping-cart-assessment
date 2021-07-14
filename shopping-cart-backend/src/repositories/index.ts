import { UserRepository } from "./user.repository"
import { ProductRepository } from "./product.repository"
import { CartRepository } from "./cart.repository"

export class Database {
    public static userRepository: UserRepository
    public static productRepository: ProductRepository
    public static cartRepository: CartRepository

    public static initializeRepositories(){
        this.userRepository = new UserRepository()
        this.productRepository = new ProductRepository()
        this.cartRepository = new CartRepository()
    }
}