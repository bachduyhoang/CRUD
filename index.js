//Database
const bookDB = {
  book: [
    {
      id: 1,
      title: "Dude Perfect 101 Tricks, Tips, and Cool Stuff",
      Author: "Dude Perfect",
      Price: 18.39,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71Wdlcm9X7S._AC_UL200_SR200,200_.jpg",
    },
    {
      id: 2,
      title: "The Last Thing He Told Me: A Novel",
      Author: "Bessel van der Kolk M.D.",
      Price: 31,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/61NdJMwAThS._AC_UL200_SR200,200_.jpg",
    },
    {
      id: 3,
      title: "The Midnight Libraryyyyy: A Novel",
      Author: "Matt Haig",
      Price: 84,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81YzHKeWq7L._AC_UL200_SR200,200_.jpg",
    },
    {
      id: 4,
      title: "It Ends with Us: A Novel",
      Author: "Colleen Hoover",
      Price: 10.59,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/71tqt4VL%2BdS._AC_UL200_SR200,200_.jpg",
    },
    {
      id: 5,
      title: "American Marxism",
      Author: "Mark R. Levin",
      Price: 17.45,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81TgUz%2B7JBS._AC_UL200_SR200,200_.jpg",
    },
    {
      id: 6,
      title: "Project Hail Mary: A Novel",
      Author: "Andy Weir",
      Price: 16.99,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/91Bd7P8UwxL._AC_UL200_SR200,200_.jpg",
    },
    {
      id: 7,
      title: "The Unhoneymooners",
      Author: "Christina Lauren",
      Price: 7.22,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/711UaUepObS._AC_UL200_SR200,200_.jpg",
    },
    {
      id: 8,
      title: "I Love You to the Moon and Back",
      Author: "Amelia Hepworth",
      Price: 1.3,
      image:
        "https://images-na.ssl-images-amazon.com/images/I/81eB%2B7%2BCkUL._AC_UL200_SR200,200_.jpg",
    },
  ],
};
// Render Book
const renderListBook = () => {
  const bookHtml = document.querySelector("#list-book");
  html = bookDB.book.map((book, index) => {
    return `
                <div class="col-lg-4 mb-3" data-id="${book.id}">
                    <div class="card" style="margin-top: 16px;">
                        <img class="card-img-top" src="${book.image}" alt="${book.title}">
                        <div class="card-body">
                            <h5 class="card-title">${book.title}</h5>
                            <p class="card-text">Author : ${book.Author}</p>
                            <p class="card-text">Price ${book.Price}$</p>
                            <a href="#" class="btn btn-primary" id="${book.id}">Add to cart</a>
                        </div>
                    </div>
                </div>
        `;
  });
  bookHtml.innerHTML = html.join(" ");

  addEventAddToCartButton();
};
//Render Cart
const renderCart = () => {
  const cartHtml = document.querySelector(".cart");
  let _cart = CART.content;
  let html = _cart.map((item, index) => {
    return `
          <tr>
              <th scope="row">${index + 1}</th>
              <td>${item.id}</td>
              <td>${item.title}</td>
              <td><input class="update" type="number" data-update="${
                item.id
              }" name="quantity" value="${item.quantity}" min="1"/></td>
              <td>${item.Price}</td>
              <td>${item.quantity * item.Price}</td>
              <td><a href="" data-delete="${
                item.id
              }" class="delete">delete</a></td>
          </tr>
        `;
  });

  cartHtml.innerHTML =
    `
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Book ID</th>
                            <th scope="col">Book Name</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Price</th>
                            <th scope="col">Total</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
    ` +
    html.join(" ") +
    `
                    </tbody>
                </table>
    ` +
    `<h3>Total: ${CART.totalPrice()}</h3>` +
    `<a href="" class="remove-cart">Remove All</a>`;
  addEventRemoveCart();
  addEventUpdate();
  addEventDelete();
  CART.showCart();
};

//Cart
const CART = {
  content: [],
  async sync() {
    let _cart = JSON.stringify(CART.content);
    await localStorage.setItem("cart", _cart);
  },
  initCart() {
    let _content = localStorage.getItem("cart");
    if (_content) {
      CART.content = JSON.parse(_content);
    }
  },
  // findInCart return a object book if it exists
  findInCart(id) {
    if (CART.content) {
      return CART.content.find((b) => {
        if (b.id == id) {
          return b;
        }
      });
    } else {
      console.log("empty cart");
    }
  },
  // findInDB return a object book if it exists in DB
  findInDB(id) {
    return bookDB.book.find((b) => {
      if (b.id == id) {
        return true;
      }
    });
  },
  add(id) {
    const book = CART.findInDB(id);
    if (book) {
      let bookInCart = CART.findInCart(id);
      if (bookInCart) {
        CART.content.map((book) => {
          if (book.id == id) {
            book.quantity++;
            return book;
          }
        });
      } else {
        let obj = {
          ...book,
          quantity: 1,
        };
        CART.content.push(obj);
      }
      CART.sync();
      renderCart();
    }
  },
  removeItem(id) {
    if (CART.findInCart(id)) {
      CART.content = CART.content.filter((item) => {
        if (item.id !== Number(id)) {
          return true;
        }
      });
      CART.sync();
      renderCart();
    }
  },
  updateItem(id, quantity) {
    if (CART.findInCart(id)) {
      CART.content.map((item) => {
        if (item.id == id) {
          item.quantity = quantity;
          return item;
        }
      });
      CART.sync();
      renderCart();
    }
  },
  totalPrice() {
    return (total = CART.content.reduce(function (sum, item) {
      return (sum += item.Price * item.quantity);
    }, 0));
  },
  removeCart() {
    CART.content = [];
    CART.sync();
    renderCart();
  },
  showCart() {
    console.log(CART.content);
  },
};

// Add event to button
const addEventAddToCartButton = () => {
  const btnAddToCart = document.querySelectorAll(".btn");
  btnAddToCart.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      CART.add(e.target.id);
    });
  });
};

const addEventDelete = () => {
  const btnDelete = document.querySelectorAll(".delete");
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      CART.removeItem(e.target.dataset.delete);
    });
  });
};

const addEventRemoveCart = () => {
  const btnRemoveAll = document.querySelectorAll(".remove-cart");
  btnRemoveAll.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      CART.removeCart();
    });
  });
};

const addEventUpdate = () => {
  const btnUpdate = document.querySelectorAll(".update");
  btnUpdate.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = e.target.dataset.update;
      const value = Number(e.target.value);
      console.log(id, value);
      CART.updateItem(id, value);
    });
  });
};

const start = () => {
  CART.initCart();
  addEventAddToCartButton();
  renderCart();
  renderListBook();
};

start();
