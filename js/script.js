// ------------------ PRODUCTS & CART ------------------
    const products = [
      { id:'p1', title:'Dumbbell', price:999, img:'../Assets/Images/Dumbbell.jpg' },
      { id:'p2', title:'Boxing Bag', price:1999, img:'../Assets/Images/Boxing Bag.jpg' },
      { id:'p3', title:'Gym Gloves', price:499, img:'../Assets/Images/gloves.jpeg' },
      { id:'p4', title:'Exercise Ball', price:799, img:'../Assets/Images/Exercise Ball.jpg'},
      { id:'p5', title:'Treadmill', price:24999, img:'../Assets/Images/tredmill.jpeg' },
      { id:'p6', title:'Kettlebell', price:1299, img:'../Assets/Images/Kettlebell.jpg' },
    ];

    const shopGrid = document.getElementById('shopGrid');
    const cartDrawer = document.getElementById('cartDrawer');
    const cartToggle = document.getElementById('cartToggle');
    const cartCount = document.getElementById('cartCount');
    const cartItemsEl = document.getElementById('cartItems');
    const cartSubtotalEl = document.getElementById('cartSubtotal');
    const closeCart = document.getElementById('closeCart');
    const checkoutBtn = document.getElementById('checkoutBtn');

    let cart = JSON.parse(localStorage.getItem('befit_cart') || '{}');

    function renderShop(){
      shopGrid.innerHTML = '';
      products.forEach(p=>{
        const card = document.createElement('div');
        card.className = 'bg-[#0e1a2b] p-6 rounded-xl neon-border card-hover';
        card.innerHTML = `
          <img src="${p.img}" alt="${p.title}" class="h-44 w-full object-cover rounded-md mb-4">
          <h4 class="font-semibold">${p.title}</h4>
          <div class="mt-2 flex items-center justify-between">
            <div class="text-lime-400 font-bold">₹${p.price.toLocaleString('en-IN')}</div>
            <button data-id="${p.id}" class="addToCart px-3 py-1 rounded bg-[#0b2a1f] border border-lime-400 text-lime-400">Add To Cart</button>
          </div>
        `;
        shopGrid.appendChild(card);
      });
    }

    function saveCart(){
      localStorage.setItem('befit_cart', JSON.stringify(cart));
      renderCart();
    }

    function renderCart(){
      const entries = Object.values(cart);
      cartItemsEl.innerHTML = '';
      if(entries.length === 0){ cartItemsEl.innerHTML = '<div class="text-gray-400">Your cart is empty</div>'; }
      let subtotal = 0; let count = 0;
      entries.forEach(item=>{
        subtotal += item.price * item.qty; count += item.qty;
        const el = document.createElement('div');
        el.className = 'flex gap-3 items-center';
        el.innerHTML = `
          <img src="${item.img}" class="w-14 h-14 object-cover rounded-md">
          <div class="flex-1">
            <div class="font-semibold">${item.title}</div>
            <div class="text-sm text-gray-400">₹${item.price}</div>
            <div class="mt-2 flex gap-2 items-center">
              <button data-action="dec" data-id="${item.id}" class="px-2 py-1 rounded bg-[#091123]">-</button>
              <div class="px-3 py-1 rounded bg-[#071026]">${item.qty}</div>
              <button data-action="inc" data-id="${item.id}" class="px-2 py-1 rounded bg-[#091123]">+</button>
              <button data-action="remove" data-id="${item.id}" class="ml-3 text-sm text-gray-400">Remove</button>
            </div>
          </div>
        `;
        cartItemsEl.appendChild(el);
      });
      cartCount.textContent = count;
      cartSubtotalEl.textContent = '₹' + subtotal.toLocaleString('en-IN');
    }

    // add to cart handler
    document.body.addEventListener('click', (e)=>{
      const add = e.target.closest('.addToCart');
      if(add){ const id = add.dataset.id; addToCart(id,1); }
      const act = e.target.closest('button[data-action]');
      if(act){ const id = act.dataset.id; const a = act.dataset.action; if(a==='inc') changeQty(id,1); if(a==='dec') changeQty(id,-1); if(a==='remove') removeItem(id); }
    });

    function addToCart(id, qty=1){
      const p = products.find(x=>x.id===id); if(!p) return;
      if(cart[id]) cart[id].qty += qty; else cart[id] = {...p, qty};
      saveCart(); openCart();
    }
    function changeQty(id, delta){ if(!cart[id]) return; cart[id].qty += delta; if(cart[id].qty<=0) delete cart[id]; saveCart(); }
    function removeItem(id){ if(cart[id]) delete cart[id]; saveCart(); }

    cartToggle.addEventListener('click', ()=>{ openCart(); });
    closeCart.addEventListener('click', ()=>{ closeCartFn(); });

    function openCart(){ cartDrawer.style.transform = 'translateX(0)'; cartDrawer.style.right = '24px'; cartDrawer.style.opacity = '1'; }
    function closeCartFn(){ cartDrawer.style.transform = 'translateX(40px)'; cartDrawer.style.right = '-280px'; cartDrawer.style.opacity = '0.9'; }

    checkoutBtn.addEventListener('click', ()=>{ alert('Checkout is demo-only.'); });

    // INITIAL
    renderShop(); renderCart();

  


   

 

    // ------------------ CONTACT FORM ------------------
    const contactForm = document.getElementById('contactForm');
    const contactStatus = document.getElementById('contactStatus');
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault(); contactStatus.textContent = 'Sending...';
      setTimeout(()=>{ contactStatus.textContent = 'Message sent — we will contact you soon!'; contactForm.reset(); }, 900);
    });

 

     (function(){
      const dumb = document.getElementById('parallaxDumbbell');
      if(!dumb) return;

      let lastScroll = window.scrollY;
      let offset = 0;

      function onScroll() { lastScroll = window.scrollY; }
      window.addEventListener('scroll', onScroll, { passive: true });

      function tick(){
        // translate factor (smaller so it's subtle)
        const target = lastScroll * 0.12;
        offset += (target - offset) * 0.08; // ease
        // parallax vertical movement and slight rotate
        dumb.style.transform = `translateY(${ -offset }px) rotate(${ Math.sin(offset/40) * 4 }deg)`;
        requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    })();

    // Smooth scroll for internal links (improves UX)
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click', function(e){
        const href = this.getAttribute('href');
        if(href.length > 1){
          e.preventDefault();
          document.querySelector(href)?.scrollIntoView({behavior:'smooth', block:'start'});
        }
      });
    });
    