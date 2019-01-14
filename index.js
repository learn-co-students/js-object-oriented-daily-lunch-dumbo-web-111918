// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 0
class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhoodId
    store.neighborhoods.push(this)
  }

  deliveries() {
    let s = store.deliveries.filter(e => e.neighborhoodId === this.id)
    return s.filter((e,i,a) => a.indexOf(e) === i)
  }

  customers() {
    return store.customers.filter(e => e.neighborhoodId === this.id)
  }

  meals() {
    return this.deliveries().map(e => e.meal()).filter((e,i,a) => a.indexOf(e) === i)
  }
}

let mealId = 0
class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  static byPrice() {
    return store.meals.sort((a, b) => b.price - a.price)
  }

  deliveries() {
    return store.deliveries.filter(e => e.mealId === this.id)
  }

  customers() {
    return this.deliveries().map(e => e.customer())
  }

}

let customerId = 0
class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.id = ++customerId
    this.neighborhoodId = neighborhoodId || null
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter(e => e.customerId === this.id)
  }

  meals() {
    return this.deliveries().map(e => e.meal())
  }

  totalSpent() {
    return this.meals().reduce((acc, e) => acc + e.price, 0)
  }
}

let deliveryId = 0
class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId || null
    this.neighborhoodId = neighborhoodId || null
    this.customerId = customerId || null
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  meal() {
    return store.meals.find(e => e.id === this.mealId)
  }

  customer() {
    return store.customers.find(e => e.id === this.customerId)
  }

  neighborhood() {
    return store.neighborhoods.find(e => e.id === this.neighborhoodId)
  }
}
