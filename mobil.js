let cart = [];
let totalPrice = 0;
let selectedRamen = null; // 選択されたラーメン情報
let selectedToppings = []; // 選択されたトッピング情報

function selectRamen(name, price) {
  selectedRamen = { name, price };
  selectedToppings = []; // トッピングをリセット

  // トッピングのチェックボックスをすべてリセット
  const toppingCheckboxes = document.querySelectorAll('#toppings input[type="checkbox"]');
  toppingCheckboxes.forEach(checkbox => {
    checkbox.checked = false; // チェックを外す
  });

  // トッピングセクションを表示
  const toppingsSection = document.getElementById('toppings');
  toppingsSection.classList.remove('hidden');
}

function addToCart() {
  if (!selectedRamen) {
    alert('ラーメンを選択してください。');
    return;
  }

  // トッピング情報を収集
  const toppingElements = document.querySelectorAll('#toppings input[type="checkbox"]:checked');
  toppingElements.forEach(topping => {
    const name = topping.value;
    const price = parseInt(topping.getAttribute('data-price'));
    selectedToppings.push({ name, price });
  });

  // カートにラーメンとトッピングを追加
  cart.push(selectedRamen);
  selectedToppings.forEach(topping => cart.push(topping));

  // カートを更新
  updateCart();

  // トッピングセクションを非表示にする
  document.getElementById('toppings').classList.add('hidden');
  selectedRamen = null;
  selectedToppings = [];
}

function closeToppings() {
  document.getElementById('toppings').classList.add('hidden');
}

function updateCart() {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  totalPrice = 0;

  cart.forEach(item => {
    const listItem = document.createElement('li');
    if (item.name) {
      // ラーメン
      listItem.textContent = `${item.name} - ¥${item.price}`;
    } else {
      // トッピング
      listItem.textContent = `+ ${item.name} - ¥${item.price}`;
    }
    cartItems.appendChild(listItem);
    totalPrice += item.price;
  });

  document.getElementById('total-price').textContent = `合計金額: ¥${totalPrice}`;
}

function placeOrder() {
  if (cart.length === 0) {
    alert('カートが空です！');
    return;
  }

  const orderNumber = Math.floor(Math.random() * 900) + 100;
  const orderPopup = document.getElementById('confirmation-popup');
  orderPopup.querySelector('h3').textContent = `注文番号: ${orderNumber}`;
  orderPopup.style.display = 'block';

  const historyList = document.getElementById('history-list');
  const orderDetails = document.createElement('li');
  orderDetails.textContent = `注文番号: ${orderNumber}, 合計金額: ¥${totalPrice}`;
  historyList.appendChild(orderDetails);

  cart = [];
  updateCart();
}

function closePopup() {
  const orderPopup = document.getElementById('confirmation-popup');
  orderPopup.style.display = 'none'; // ポップアップを非表示にする
}
