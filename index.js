// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

// set up ids
neighborhoodId = 0
customerId = 0
mealId = 0
deliveryId = 0


class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = neighborhoodId++
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter(e => e.neighborhoodId === this.id)
  }

  customers() {
    return store.customers.filter(e => e.neighborhoodId === this.id)
  }

  meals() {
      let allMeals = this.customers().map(customer => customer.meals());
      let merged = [].concat.apply([], allMeals);
      return [...new Set(merged)];
    }

}

class Customer {
  constructor(name, neighborhoodId) {
    this.name = name
    this.neighborhoodId = neighborhoodId
    this.id = customerId++
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter( e => e.customerId === this.id)
  }

  meals () {
    let allMeals = []
    let ids = this.deliveries().map(e => e.mealId)
    ids.forEach(mealIden => {
      allMeals.push(store.meals.find(meal=> meal.id === mealIden))
    })
    return allMeals
  }

  totalSpent() {
    return this.meals().reduce((a,b) => a += b.price, 0)
  }


}

class Meal {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = mealId++
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter( e => e.mealId === this.id)
  }

  customers () {
    let allCustomers = []
    let ids = this.deliveries().map(e => e.customerId)
    ids.forEach(cusId => {
      allCustomers.push(store.customers.find(cus=> cus.id === cusId))
    })
    return allCustomers
  }

  static byPrice() {
    return store.meals.sort((a, b) => b['price'] - a['price']);
  }

}

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = deliveryId++
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
