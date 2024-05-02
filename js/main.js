
(function ($) {
    "use strict";

    /*[ Load page ]
    ===========================================================*/
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'animsition-loading-1',
        loadingInner: '<div class="loader05"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'html',
        transition: function(url){ window.location.href = url; }
    });
    
    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height()/2;

    $(window).on('scroll',function(){
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css('display','flex');
        } else {
            $("#myBtn").css('display','none');
        }
    });

    $('#myBtn').on("click", function(){
        $('html, body').animate({scrollTop: 0}, 300);
    });


    /*==================================================================
    [ Fixed Header ]*/
    var headerDesktop = $('.container-menu-desktop');
    var wrapMenu = $('.wrap-menu-desktop');

    if($('.top-bar').length > 0) {
        var posWrapHeader = $('.top-bar').height();
    }
    else {
        var posWrapHeader = 0;
    }
    

    if($(window).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass('fix-menu-desktop');
        $(wrapMenu).css('top',0); 
    }  
    else {
        $(headerDesktop).removeClass('fix-menu-desktop');
        $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
    }

    $(window).on('scroll',function(){
        if($(this).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('fix-menu-desktop');
            $(wrapMenu).css('top',0); 
        }  
        else {
            $(headerDesktop).removeClass('fix-menu-desktop');
            $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
        } 
    });


    /*==================================================================
    [ Menu mobile ]*/
    $('.btn-show-menu-mobile').on('click', function(){
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu-m');

    for(var i=0; i<arrowMainMenu.length; i++){
        $(arrowMainMenu[i]).on('click', function(){
            $(this).parent().find('.sub-menu-m').slideToggle();
            $(this).toggleClass('turn-arrow-main-menu-m');
        })
    }

    $(window).resize(function(){
        if($(window).width() >= 992){
            if($('.menu-mobile').css('display') == 'block') {
                $('.menu-mobile').css('display','none');
                $('.btn-show-menu-mobile').toggleClass('is-active');
            }

            $('.sub-menu-m').each(function(){
                if($(this).css('display') == 'block') { console.log('hello');
                    $(this).css('display','none');
                    $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
                }
            });
                
        }
    });


    /*==================================================================
    [ Show / hide modal search ]*/
    $('.js-show-modal-search').on('click', function(){
        $('.modal-search-header').addClass('show-modal-search');
        $(this).css('opacity','0');
    });

    $('.js-hide-modal-search').on('click', function(){
        $('.modal-search-header').removeClass('show-modal-search');
        $('.js-show-modal-search').css('opacity','1');
    });

    $('.container-search-header').on('click', function(e){
        e.stopPropagation();
    });


    /*==================================================================
    [ Isotope ]*/
    var $topeContainer = $('.isotope-grid');
    var $filter = $('.filter-tope-group');

    // filter items on button click
    $filter.each(function () {
        $filter.on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({filter: filterValue});
        });
        
    });

    // init Isotope
    $(window).on('load', function () {
        var $grid = $topeContainer.each(function () {
            $(this).isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows',
                percentPosition: true,
                animationEngine : 'best-available',
                masonry: {
                    columnWidth: '.isotope-item'
                }
            });
        });
    });

    var isotopeButton = $('.filter-tope-group button');

    $(isotopeButton).each(function(){
        $(this).on('click', function(){
            for(var i=0; i<isotopeButton.length; i++) {
                $(isotopeButton[i]).removeClass('how-active1');
            }

            $(this).addClass('how-active1');
        });
    });

    /*==================================================================
    [ Filter / Search product ]*/
    $('.js-show-filter').on('click',function(){
        $(this).toggleClass('show-filter');
        $('.panel-filter').slideToggle(400);

        if($('.js-show-search').hasClass('show-search')) {
            $('.js-show-search').removeClass('show-search');
            $('.panel-search').slideUp(400);
        }    
    });

    $('.js-show-search').on('click',function(){
        $(this).toggleClass('show-search');
        $('.panel-search').slideToggle(400);

        if($('.js-show-filter').hasClass('show-filter')) {
            $('.js-show-filter').removeClass('show-filter');
            $('.panel-filter').slideUp(400);
        }    
    });




    /*==================================================================
    [ Cart ]*/
    $('.js-show-cart').on('click',function(){
        $('.js-panel-cart').addClass('show-header-cart');
    });

    $('.js-hide-cart').on('click',function(){
        $('.js-panel-cart').removeClass('show-header-cart');
    });

    /*==================================================================
    [ Cart ]*/
    $('.js-show-sidebar').on('click',function(){
        $('.js-sidebar').addClass('show-sidebar');
    });

    $('.js-hide-sidebar').on('click',function(){
        $('.js-sidebar').removeClass('show-sidebar');
    });

    /*==================================================================
    [ +/- num product ]*/
    $('.btn-num-product-down').on('click', function(){
        var numProduct = Number($(this).next().val());
        if(numProduct > 0) $(this).next().val(numProduct - 1);
    });

    $('.btn-num-product-up').on('click', function(){
        var numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
    });

    /*==================================================================
    [ Rating ]*/
    $('.wrap-rating').each(function(){
        var item = $(this).find('.item-rating');
        var rated = -1;
        var input = $(this).find('input');
        $(input).val(0);

        $(item).on('mouseenter', function(){
            var index = item.index(this);
            var i = 0;
            for(i=0; i<=index; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });

        $(item).on('click', function(){
            var index = item.index(this);
            rated = index;
            $(input).val(index+1);
        });

        $(this).on('mouseleave', function(){
            var i = 0;
            for(i=0; i<=rated; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });
    });
    
    /*==================================================================
    [ Show modal1 ]*/
    $('.js-show-modal1').on('click',function(e){
        e.preventDefault();
        $('.js-modal1').addClass('show-modal1');
    });

    $('.js-hide-modal1').on('click',function(){
        $('.js-modal1').removeClass('show-modal1');
    });



})(jQuery);



//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
// Функция для преобразования строки в число
function toNum(str) {
    const num = Number(str.replace(/ /g, ""));
    return isNaN(num) ? 0 : num; // Добавлено обработка случая, когда строка не может быть преобразована в число
  }
  
  // Функция для форматирования числа в валюту
  function toCurrency(num) {
    const format = new Intl.NumberFormat("ru-RU", {
      style: "currency",
      currency: "RUB",
      minimumFractionDigits: 0,
    }).format(num);
    return format;
  }
  
  // Класс для корзины
  class Cart {
    constructor() {
      this.products = [];
    }
  
    get count() {
      return this.products.length;
    }
  
    addProduct(product) {
      this.products.push(product);
      this.saveToLocalStorage();
    }
  
    removeProduct(index) {
      this.products.splice(index, 1);
      this.saveToLocalStorage();
    }
  
    get cost() {
      const prices = this.products.map(product => toNum(product.price));
      return prices.reduce((acc, num) => acc + num, 0);
    }
  
    get costDiscount() {
      const prices = this.products.map(product => toNum(product.priceDiscount));
      return prices.reduce((acc, num) => acc + num, 0);
    }
  
    get discount() {
      return this.cost - this.costDiscount;
    }
  
    // Сохранение корзины в localStorage
    saveToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.products));
    }
  
    // Загрузка корзины из localStorage
    loadFromLocalStorage() {
      const savedCart = JSON.parse(localStorage.getItem("cart"));
      if (savedCart && savedCart.products) {
        this.products = savedCart.products;
      } else {
        this.products = [];
      }
    }
  }
  
  // Класс для продукта
  class Product {
    constructor(card) {
      this.imageSrc = card.querySelector(".card__image").children[0].src;
      this.name = card.querySelector(".card__title").innerText;
      this.price = card.querySelector(".card__price--common").innerText;
      this.priceDiscount = card.querySelector(".card__price--discount").innerText;
    }
  }
  
  // Инициализация корзины
  const myCart = new Cart();
  myCart.loadFromLocalStorage();
  
  // Обновление счетчика корзины на странице
  const cartNum = document.querySelector("#cart_num");
  cartNum.textContent = myCart.count;
  
  // Объявление переменной cardAddArr
  const cardAddArr = Array.from(document.querySelectorAll(".card__add"));
  
  // Добавление обработчиков событий на кнопки "Добавить в корзину"
  cardAddArr.forEach(cardAdd => {
    cardAdd.addEventListener("click", (e) => {
      e.preventDefault();
      const card = e.target.closest(".card");
      const product = new Product(card);
      myCart.addProduct(product);
      cartNum.textContent = myCart.count;
      updateCartTotal();
    });
  });
  
  // Функция для обновления итоговой суммы в корзине
  function updateCartTotal() {
    const cartTotal = document.querySelector("#cart_total");
    if (cartTotal && myCart) { // Проверяем, существует ли cartTotal и myCart
      cartTotal.textContent = toCurrency(myCart.costDiscount); // Используем цену со скидкой
    }
  }
  
  // Добавление обработчика события для закрытия попапа
  const popupCloseBtn = document.querySelector("#popup_close");
  if (popupCloseBtn) { // Проверяем, существует ли элемент popup_close
    popupCloseBtn.addEventListener("click", (e) => {
      e.preventDefault();
      popup.classList.remove("popup--open");
      body.classList.remove("lock");
    });
  }
  
  // Попап
  
  const popup = document.querySelector(".popup");
  const popupClose = document.querySelector("#popup_close");
  const body = document.body;
  const popupContainer = document.querySelector("#popup_container");
  const popupProductList = document.querySelector("#popup_product_list");
  const popupCost = document.querySelector("#popup_cost");
  const popupDiscount = document.querySelector("#popup_discount");
  const popupCostDiscount = document.querySelector("#popup_cost_discount");
  
  const cart = document.querySelector("#cart"); // Добавлено определение переменной cart
  
  // Обработчик события открытия попапа при клике на кнопку "Корзина"
  cart.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.add("popup--open");
    body.classList.add("lock");
    popupContainerFill();
  });
  
  // Функция для заполнения контейнера товаров в попапе
  function popupContainerFill(price) {
    popupProductList.innerHTML = "";
  
    // Получение товаров из корзины и добавление их в попап
    myCart.products.forEach(product => {
      const productItem = document.createElement("div");
      productItem.classList.add("popup__product");
  
      const productWrap1 = document.createElement("div");
      productWrap1.classList.add("popup__product-wrap");
      const productWrap2 = document.createElement("div");
      productWrap2.classList.add("popup__product-wrap");
  
      const productImage = document.createElement("img");
      productImage.classList.add("popup__product-image");
      productImage.setAttribute("src", product.imageSrc);
  
      const productTitle = document.createElement("h2");
      productTitle.classList.add("popup__product-title");
      productTitle.innerText = product.name;
  
      const productPrice = document.createElement("div");
      productPrice.classList.add("popup__product-price");
      productPrice.innerText = product.priceDiscount; // Используем цену со скидкой
  
      const productDelete = document.createElement("button");
      productDelete.classList.add("popup__product-delete");
      productDelete.innerHTML = "&#10006;";
  
      productDelete.addEventListener("click", () => {
    if (myCart) { // Проверяем, существует ли myCart
      myCart.removeProduct(product);
      updateCartTotal(); // Обновляем итоговую сумму после удаления товара
      popupContainerFill(); // Заполняем контейнер товаров в попапе заново
    }
  });
  
      productWrap1.appendChild(productImage);
      productWrap1.appendChild(productTitle);
      productWrap2.appendChild(productPrice);
      productWrap2.appendChild(productDelete);
      productItem.appendChild(productWrap1);
      productItem.appendChild(productWrap2);
  
      popupProductList.appendChild(productItem);
    });
  
    // Обновляем итоговую сумму в попапе
    popupCostDiscount.textContent = toCurrency(myCart.costDiscount);
  }
  
  // Обработчик события нажатия на кнопку "купить"
  cardAddArr.forEach(cardAdd => {
    cardAdd.addEventListener("click", (e) => {
      e.preventDefault();
      const card = e.target.closest(".card");
      const priceElement = card.querySelector(".card__price");
      const price = priceElement ? priceElement.textContent : null; // Получаем текст цены или null, если элемент не найден
      popupContainerFill(price);
    });
  });
  
  
  