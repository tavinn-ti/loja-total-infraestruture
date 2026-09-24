// assets/js/cart.js - Completo com regras de Câmeras (Finais de Semana) e Manutenção (R$ 150)
let state = {
    cart: [],
    serviceMode: 'delivery', // 'pickup', 'delivery', 'install'
    paymentMethod: 'pix',
    activeCategory: 'todos',
    modalItem: null,
    modalQty: 1
};

const creditRates = {
    1: 0.0309, 2: 0.0579, 3: 0.0609, 4: 0.0799,
    5: 0.0809, 6: 0.0819, 7: 0.0949, 8: 0.0968,
    9: 0.1037, 10: 0.1105, 11: 0.1227, 12: 0.1238
};

window.addEventListener('DOMContentLoaded', () => {
    if (typeof PRODUCTS_DB !== 'undefined') {
        renderProducts();
    }
    updateCartUI();
    loadCustomerData();

    const dateInput = document.getElementById('installDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
        dateInput.min = today;
        dateInput.addEventListener('change', validarDiaAgendamento);
    }
});

function formatCurrency(val) {
    return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function renderProducts() {
    const containers = {
        highlights: document.getElementById('highlightsContainer'),
        cameras: document.getElementById('camerasContainer'),
        hardware: document.getElementById('hardwareContainer'),
        acessorios: document.getElementById('acessoriosContainer'),
        perifericos: document.getElementById('perifericosContainer'),
        monitores: document.getElementById('monitoresContainer'),
        servicos: document.getElementById('servicosContainer')
    };

    Object.values(containers).forEach(c => { if(c) c.innerHTML = ''; });
    if (typeof PRODUCTS_DB === 'undefined') return;

    PRODUCTS_DB.forEach(product => {
        const cardHTML = createProductCardHTML(product);
        if (product.isHighlight && containers.highlights) containers.highlights.innerHTML += createHighlightCardHTML(product);
        if (containers[product.category]) containers[product.category].innerHTML += cardHTML;
    });
}

function createProductCardHTML(item) {
    const cartQty = getItemCartQuantity(item.id);
    return `
        <div class="product-card bg-tech-card border border-tech-border rounded-2xl p-3 sm:p-4 flex gap-3 sm:gap-4 hover:border-blue-500/50 transition-all cursor-pointer group shadow-md" onclick="openItemModal('${item.id}')">
            <div class="flex-1 flex flex-col justify-between">
                <div>
                    <h4 class="font-bold text-sm sm:text-base text-zinc-100 group-hover:text-blue-400 transition-colors leading-snug">${item.name}</h4>
                    <p class="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">${item.description}</p>
                </div>
                <div class="mt-3 flex items-center justify-between">
                    <span class="font-display font-bold text-base sm:text-lg text-white">${formatCurrency(item.price)}</span>
                    <button onclick="event.stopPropagation(); openItemModal('${item.id}')" class="bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-md shadow-blue-950/40">
                        <i class="fa-solid fa-plus text-[10px]"></i>
                        <span>${cartQty > 0 ? `Adicionado (${cartQty})` : 'Adicionar'}</span>
                    </button>
                </div>
            </div>
            <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-tech-bg flex-shrink-0 relative border border-tech-border flex items-center justify-center">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" onerror="this.onerror=null; this.src='${item.fallbackImage}';">
            </div>
        </div>
    `;
}

function createHighlightCardHTML(item) {
    return `
        <div class="bg-gradient-to-br from-tech-card to-tech-subtle border border-blue-600/30 rounded-2xl p-3.5 flex gap-3 hover:border-blue-600/60 transition-all cursor-pointer relative overflow-hidden group shadow-md" onclick="openItemModal('${item.id}')">
            <div class="absolute top-0 right-0 bg-blue-600 text-white text-[9px] font-extrabold px-2.5 py-0.5 rounded-bl-lg uppercase tracking-wider shadow-md">
                Destaque
            </div>
            <div class="w-20 h-20 sm:w-22 sm:h-22 rounded-xl overflow-hidden bg-tech-bg flex-shrink-0 border border-tech-border flex items-center justify-center">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" onerror="this.onerror=null; this.src='${item.fallbackImage}';">
            </div>
            <div class="flex-1 flex flex-col justify-between">
                <div>
                    <h4 class="font-bold text-xs sm:text-sm text-white group-hover:text-blue-400 transition-colors">${item.name}</h4>
                    <p class="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">${item.description}</p>
                </div>
                <div class="flex items-center justify-between mt-2">
                    <span class="font-display font-bold text-sm text-blue-400">${formatCurrency(item.price)}</span>
                    <span class="text-[11px] font-semibold text-zinc-300 bg-tech-subtle px-2.5 py-1 rounded-lg border border-tech-border">Ver mais</span>
                </div>
            </div>
        </div>
    `;
}

function openItemModal(productId) {
    if (typeof PRODUCTS_DB === 'undefined') return;
    const product = PRODUCTS_DB.find(p => p.id === productId);
    if (!product) return;

    state.modalItem = product;
    state.modalQty = 1;

    document.getElementById('modalItemTitle').textContent = product.name;
    document.getElementById('modalItemPrice').textContent = formatCurrency(product.price);
    document.getElementById('modalItemDesc').textContent = product.description;

    const imgEl = document.getElementById('modalItemImage');
    imgEl.src = product.image;
    imgEl.onerror = () => { imgEl.src = product.fallbackImage; };

    document.getElementById('modalItemObs').value = '';
    updateModalPriceDisplay();

    const modal = document.getElementById('itemModal');
    const content = document.getElementById('itemModalContent');
    if (modal && content) {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        content.classList.remove('translate-y-8');
    }
}

function closeItemModal() {
    const modal = document.getElementById('itemModal');
    const content = document.getElementById('itemModalContent');
    if (modal && content) {
        modal.classList.add('opacity-0', 'pointer-events-none');
        content.classList.add('translate-y-8');
    }
}

function changeModalQty(delta) {
    state.modalQty = Math.max(1, state.modalQty + delta);
    updateModalPriceDisplay();
}

function updateModalPriceDisplay() {
    document.getElementById('modalQtyDisplay').textContent = state.modalQty;
    const subtotal = (state.modalItem ? state.modalItem.price : 0) * state.modalQty;
    document.getElementById('modalSubtotalDisplay').textContent = formatCurrency(subtotal);
}

function confirmAddItemModal() {
    if (!state.modalItem) return;
    const obs = document.getElementById('modalItemObs').value.trim();
    addToCart(state.modalItem.id, state.modalQty, obs);
    closeItemModal();
    showToast(`Adicionado: ${state.modalItem.name}`);
}

function addToCart(productId, qty = 1, obs = '') {
    const product = PRODUCTS_DB.find(p => p.id === productId);
    if (!product) return;

    const existingIndex = state.cart.findIndex(i => i.id === productId && i.obs === obs);
    if (existingIndex > -1) {
        state.cart[existingIndex].quantity += qty;
    } else {
        state.cart.push({
            id: product.id,
            category: product.category,
            name: product.name,
            price: product.price,
            quantity: qty,
            obs: obs
        });
    }
    updateCartUI();
    renderProducts();
}

function changeCartQty(index, delta) {
    state.cart[index].quantity += delta;
    if (state.cart[index].quantity <= 0) state.cart.splice(index, 1);
    updateCartUI();
    renderProducts();
}

function removeFromCart(index) {
    state.cart.splice(index, 1);
    updateCartUI();
    renderProducts();
}

function clearCart() {
    state.cart = [];
    updateCartUI();
    renderProducts();
    showToast('Sacola esvaziada');
}

function getItemCartQuantity(productId) {
    return state.cart.filter(item => item.id === productId).reduce((sum, item) => sum + item.quantity, 0);
}

function hasNonCameraProducts() {
    return state.cart.some(item => item.category && item.category !== 'cameras');
}

function hasCameraProducts() {
    return state.cart.some(item => item.category === 'cameras');
}

function updateServiceModeUI() {
    const btnText = document.getElementById('installModeText');
    const btnIcon = document.getElementById('installModeIcon');
    const scheduleTitle = document.getElementById('scheduleTitleText');

    if (hasNonCameraProducts()) {
        if (btnText) btnText.textContent = 'Manutenção';
        if (btnIcon) btnIcon.className = 'fa-solid fa-screwdriver-wrench mb-1 text-sm text-blue-400';
        if (scheduleTitle) scheduleTitle.innerHTML = '<i class="fa-regular fa-calendar-days mr-1.5"></i>Agendar Manutenção e Limpeza (Seg a Dom)';
    } else {
        if (btnText) btnText.textContent = 'Instalação';
        if (btnIcon) btnIcon.className = 'fa-solid fa-tools mb-1 text-sm text-blue-400';
        if (scheduleTitle) scheduleTitle.innerHTML = '<i class="fa-regular fa-calendar-days mr-1.5"></i>Agendar Instalação de Câmeras (Apenas Sáb e Dom)';
    }
}

function validarDiaAgendamento() {
    const dateInput = document.getElementById('installDate');
    if (!dateInput || state.serviceMode !== 'install') return true;

    const selectedDate = new Date(dateInput.value + 'T00:00:00');
    const dayOfWeek = selectedDate.getDay();

    if (hasCameraProducts() && !hasNonCameraProducts()) {
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            showToast('Instalação de câmeras disponível exclusivamente aos Sábados e Domingos!', 'error');
            dateInput.value = '';
            return false;
        }
    }
    return true;
}

function calculateServiceFee() {
    if (state.serviceMode !== 'install') return 0;
    
    let totalFee = 0;
    let cameraCount = 0;
    let hasOtherProducts = false;

    state.cart.forEach(item => {
        if (item.category === 'cameras') {
            cameraCount += item.quantity;
        } else {
            hasOtherProducts = true;
        }
    });

    if (hasOtherProducts) {
        totalFee += 150.00;
    }

    if (cameraCount === 1) totalFee += 80.00;
    else if (cameraCount === 2) totalFee += 70.00 * 2;
    else if (cameraCount >= 3 && cameraCount <= 4) totalFee += 60.00 * cameraCount;
    else if (cameraCount >= 5) totalFee += 40.00 * cameraCount;

    return totalFee;
}

function updateCartUI() {
    updateServiceModeUI();

    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const serviceFee = calculateServiceFee();
    
    let baseTotal = subtotal + serviceFee;
    let taxAmount = 0;

    if (state.paymentMethod === 'debit') {
        taxAmount = baseTotal * 0.0089;
    } else if (state.paymentMethod === 'credit') {
        const installments = parseInt(document.getElementById('creditInstallmentsSelect')?.value || '1');
        const rate = creditRates[installments] || 0.0309;
        taxAmount = baseTotal * rate;
    }

    const finalTotal = baseTotal + taxAmount;

    document.getElementById('floatingCartCount').textContent = totalCount;
    document.getElementById('cartDrawerBadge').textContent = `${totalCount} itens`;

    const headerBadge = document.getElementById('headerCartBadge');
    if (totalCount > 0) {
        headerBadge.textContent = totalCount;
        headerBadge.classList.remove('hidden');
    } else {
        headerBadge.classList.add('hidden');
    }

    document.getElementById('floatingCartTotal').textContent = formatCurrency(totalCount > 0 ? finalTotal : 0);
    document.getElementById('summarySubtotal').textContent = formatCurrency(subtotal);

    const serviceRow = document.getElementById('summaryInstallFeeRow');
    const serviceLabel = document.getElementById('installFeeLabel');
    if (serviceFee > 0) {
        serviceRow.classList.remove('hidden');
        let cameraCount = state.cart.filter(i => i.category === 'cameras').reduce((s, i) => s + i.quantity, 0);
        
        if (hasNonCameraProducts() && cameraCount === 0) serviceLabel.textContent = 'Manutenção e Limpeza';
        else if (hasNonCameraProducts() && cameraCount > 0) serviceLabel.textContent = 'Manutenção + Instalação de Câmeras';
        else serviceLabel.textContent = 'Instalação de Câmeras';

        document.getElementById('summaryInstallFee').textContent = formatCurrency(serviceFee);
    } else {
        serviceRow.classList.add('hidden');
    }

    const taxRow = document.getElementById('summaryTaxRow');
    if (taxAmount > 0) {
        taxRow.classList.remove('hidden');
        document.getElementById('taxFeeLabel').textContent = state.paymentMethod === 'debit' ? 'Taxa Débito (0.89%)' : 'Taxa Cartão Crédito';
        document.getElementById('summaryTaxFee').textContent = formatCurrency(taxAmount);
    } else {
        taxRow.classList.add('hidden');
    }

    document.getElementById('summaryTotal').textContent = formatCurrency(finalTotal);

    const itemsList = document.getElementById('cartItemsList');
    const emptyState = document.getElementById('emptyCartState');
    const checkoutSection = document.getElementById('checkoutOptionsSection');

    if (state.cart.length === 0) {
        if (itemsList) itemsList.innerHTML = '';
        if (emptyState) emptyState.classList.remove('hidden');
        if (checkoutSection) checkoutSection.classList.add('opacity-40', 'pointer-events-none');
    } else {
        if (emptyState) emptyState.classList.add('hidden');
        if (checkoutSection) checkoutSection.classList.remove('opacity-40', 'pointer-events-none');

        if (itemsList) {
            itemsList.innerHTML = state.cart.map((item, idx) => `
                <div class="bg-tech-bg p-3 rounded-xl border border-tech-border flex items-center justify-between gap-3">
                    <div class="flex-1">
                        <h5 class="text-xs font-bold text-white leading-snug">${item.name}</h5>
                        <span class="text-xs font-display font-semibold text-blue-400 block mt-0.5">${formatCurrency(item.price * item.quantity)}</span>
                        ${item.obs ? `<p class="text-[10px] text-zinc-400 mt-1 italic"><i class="fa-regular fa-comment mr-1"></i>${item.obs}</p>` : ''}
                    </div>
                    <div class="flex items-center gap-1.5 bg-tech-card border border-tech-border p-1 rounded-lg">
                        <button onclick="changeCartQty(${idx}, -1)" class="w-6 h-6 rounded bg-tech-subtle text-zinc-200 hover:bg-zinc-700 flex items-center justify-center text-xs"><i class="fa-solid fa-minus text-[10px]"></i></button>
                        <span class="w-5 text-center font-bold text-xs text-white">${item.quantity}</span>
                        <button onclick="changeCartQty(${idx}, 1)" class="w-6 h-6 rounded bg-tech-subtle text-zinc-200 hover:bg-zinc-700 flex items-center justify-center text-xs"><i class="fa-solid fa-plus text-[10px]"></i></button>
                    </div>
                    <button onclick="removeFromCart(${idx})" class="text-zinc-500 hover:text-red-400 text-xs p-1"><i class="fa-solid fa-trash-can"></i></button>
                </div>
            `).join('');
        }
    }

    const sendBtn = document.getElementById('sendWhatsAppBtn');
    if (sendBtn) sendBtn.disabled = state.cart.length === 0;
}

function setServiceMode(mode) {
    state.serviceMode = mode;
    ['pickup', 'delivery', 'install'].forEach(m => {
        const btn = document.getElementById(`mode${m.charAt(0).toUpperCase() + m.slice(1)}`);
        if (btn) {
            if (m === mode) {
                btn.className = "service-mode-btn bg-tech-bg border-2 border-blue-600 text-white p-2.5 rounded-xl flex flex-col items-center justify-center text-center text-[11px] font-semibold transition-all";
            } else {
                btn.className = "service-mode-btn bg-tech-bg border border-tech-border text-zinc-400 p-2.5 rounded-xl flex flex-col items-center justify-center text-center text-[11px] font-semibold transition-all";
            }
        }
    });

    const scheduleBox = document.getElementById('installScheduleBox');
    if (scheduleBox) {
        if (mode === 'install') scheduleBox.classList.remove('hidden');
        else scheduleBox.classList.add('hidden');
    }

    updateCartUI();
}

function setPaymentMethod(method) {
    state.paymentMethod = method;
    ['pix', 'debit', 'credit', 'cash'].forEach(m => {
        const el = document.getElementById(`pay${m.charAt(0).toUpperCase() + m.slice(1)}`);
        if (el) {
            if (m === method) {
                el.className = "pay-option bg-tech-bg border-2 border-blue-600 text-white p-2.5 rounded-xl flex flex-col items-center justify-center text-[11px] font-semibold";
            } else {
                el.className = "pay-option bg-tech-bg border border-tech-border text-zinc-400 p-2.5 rounded-xl flex flex-col items-center justify-center text-[11px] font-semibold";
            }
        }
    });

    const creditBox = document.getElementById('creditInstallmentsBox');
    if (creditBox) {
        if (method === 'credit') creditBox.classList.remove('hidden');
        else creditBox.classList.add('hidden');
    }

    updateCartUI();
}

function toggleCartDrawer() {
    const drawer = document.getElementById('cartDrawer');
    const content = document.getElementById('cartDrawerContent');
    if (!drawer || !content) return;

    if (drawer.classList.contains('opacity-0')) {
        drawer.classList.remove('opacity-0', 'pointer-events-none');
        content.classList.remove('translate-x-full');
    } else {
        drawer.classList.add('opacity-0', 'pointer-events-none');
        content.classList.add('translate-x-full');
    }
}

function saveCustomerData() {
    const customer = {
        name: document.getElementById('custName')?.value.trim() || '',
        phone: document.getElementById('custPhone')?.value.trim() || ''
    };
    localStorage.setItem('tavinnti_customer', JSON.stringify(customer));
    const badge = document.getElementById('savedBadge');
    if (badge && customer.name) badge.classList.remove('hidden');
}

function loadCustomerData() {
    const saved = localStorage.getItem('tavinnti_customer');
    if (!saved) return;
    try {
        const customer = JSON.parse(saved);
        if (customer.name && document.getElementById('custName')) document.getElementById('custName').value = customer.name;
        if (customer.phone && document.getElementById('custPhone')) document.getElementById('custPhone').value = customer.phone;
        if (customer.name && document.getElementById('savedBadge')) document.getElementById('savedBadge').classList.remove('hidden');
    } catch(e) {}
}

function submitOrderToWhatsApp() {
    if (state.cart.length === 0) return;
    const custName = document.getElementById('custName')?.value.trim() || '';
    const custPhone = document.getElementById('custPhone')?.value.trim() || '';

    if (!custName || !custPhone) {
        showToast('Preencha seu Nome e WhatsApp.', 'error');
        return;
    }

    if (!validarDiaAgendamento()) return;

    saveCustomerData();
    const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const serviceFee = calculateServiceFee();
    let baseTotal = subtotal + serviceFee;
    let taxAmount = 0;
    let paymentDesc = '';

    if (state.paymentMethod === 'pix') {
        paymentDesc = 'PIX (Taxa 0%)';
    } else if (state.paymentMethod === 'debit') {
        taxAmount = baseTotal * 0.0089;
        paymentDesc = 'Cartão de Débito (Taxa 0.89%)';
    } else if (state.paymentMethod === 'credit') {
        const inst = document.getElementById('creditInstallmentsSelect')?.value || '1';
        taxAmount = baseTotal * (creditRates[inst] || 0.0309);
        paymentDesc = `Cartão de Crédito em ${inst}x`;
    } else {
        paymentDesc = 'Dinheiro';
    }

    const finalTotal = baseTotal + taxAmount;
    let modeText = state.serviceMode === 'pickup' ? 'Retirada na Loja' : (state.serviceMode === 'delivery' ? 'Apenas Entrega' : (hasNonCameraProducts() ? 'Entrega + Manutenção e Limpeza' : 'Entrega + Instalação de Câmeras'));

    let msg = `💻 *NOVO PEDIDO - TAVINN TI*\n\n`;
    msg += `👤 *Cliente:* ${custName}\n`;
    msg += `📱 *WhatsApp:* ${custPhone}\n`;
    msg += `🚚 *Modalidade:* ${modeText}\n`;

    if (state.serviceMode === 'install') {
        const date = document.getElementById('installDate')?.value || 'A combinar';
        const time = document.getElementById('installTime')?.value || 'A combinar';
        msg += `📅 *Agendamento:* ${date} (${time})\n`;
    }

    msg += `\n📋 *Itens:*\n`;
    state.cart.forEach((item, i) => {
        msg += `${i + 1}. *${item.quantity}x* ${item.name} - ${formatCurrency(item.price * item.quantity)}\n`;
        if (item.obs) msg += `   └ _Obs: ${item.obs}_\n`;
    });

    if (serviceFee > 0) {
        msg += `\n🛠️ *Taxa de Serviço:* ${formatCurrency(serviceFee)}\n`;
    }
    if (taxAmount > 0) {
        msg += `💳 *Taxa de Operadora:* ${formatCurrency(taxAmount)}\n`;
    }

    msg += `\n*Total Final:* ${formatCurrency(finalTotal)}\n`;
    msg += `💳 *Forma de Pagamento:* ${paymentDesc}`;

    window.open(`https://wa.me/5567999584289?text=${encodeURIComponent(msg)}`, '_blank');
}

function filterCategory(cat) {
    state.activeCategory = cat;
    document.querySelectorAll('.category-btn').forEach(btn => {
        if (btn.getAttribute('data-cat') === cat) {
            btn.className = "category-btn active bg-blue-600 text-white font-medium text-xs sm:text-sm px-4 py-2 rounded-xl whitespace-nowrap transition-all shadow-lg shadow-blue-950/50";
        } else {
            btn.className = "category-btn bg-tech-card hover:bg-zinc-800 text-zinc-300 border border-tech-border font-medium text-xs sm:text-sm px-4 py-2 rounded-xl whitespace-nowrap transition-all";
        }
    });

    const sections = document.querySelectorAll('.menu-section');
    const noResults = document.getElementById('noResultsState');
    if (noResults) noResults.classList.add('hidden');

    if (cat === 'todos') {
        sections.forEach(s => s.classList.remove('hidden'));
    } else {
        sections.forEach(s => {
            if (s.id === `section-${cat}`) s.classList.remove('hidden');
            else s.classList.add('hidden');
        });
    }
}

function handleSearch() {
    const query = document.getElementById('searchInput')?.value.toLowerCase().trim() || '';
    const clearBtn = document.getElementById('clearSearchBtn');
    const noResults = document.getElementById('noResultsState');

    if (clearBtn) {
        if (query.length > 0) clearBtn.classList.remove('hidden');
        else clearBtn.classList.add('hidden');
    }

    let matchesCount = 0;
    document.querySelectorAll('.product-card').forEach(card => {
        const title = card.querySelector('h4')?.textContent.toLowerCase() || '';
        const desc = card.querySelector('p')?.textContent.toLowerCase() || '';

        if (title.includes(query) || desc.includes(query)) {
            card.classList.remove('hidden');
            matchesCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    if (noResults) {
        if (matchesCount === 0 && query.length > 0) noResults.classList.remove('hidden');
        else noResults.classList.add('hidden');
    }
}

function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    handleSearch();
    filterCategory(state.activeCategory);
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    const bgColor = type === 'error' ? 'bg-red-600' : 'bg-tech-card border border-tech-border';

    toast.className = `${bgColor} text-white text-xs font-semibold px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2 transform translate-x-10 opacity-0 transition-all duration-200 pointer-events-auto`;
    toast.innerHTML = `<i class="fa-solid ${type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check text-emerald-400'}"></i> <span>${message}</span>`;

    container.appendChild(toast);
    setTimeout(() => toast.classList.remove('translate-x-10', 'opacity-0'), 10);
    setTimeout(() => {
        toast.classList.add('translate-x-10', 'opacity-0');
        setTimeout(() => toast.remove(), 200);
    }, 3000);
}

function toggleSimuladorModal() {
    const modal = document.getElementById('simuladorModal');
    const content = document.getElementById('simuladorModalContent');
    if (!modal || !content) return;

    if (modal.classList.contains('opacity-0')) {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        content.classList.remove('scale-95');
        calcularSimulador();
    } else {
        modal.classList.add('opacity-0', 'pointer-events-none');
        content.classList.add('scale-95');
    }
}

function atualizarAmbienteEfetivo() {
    const ambiente = document.getElementById('simAmbiente').value;
    const selectCabo = document.getElementById('simTipoCabo');
    if (!selectCabo) return;

    if (ambiente === 'residencial') selectCabo.value = 'cat5';
    else if (ambiente === 'comercial') selectCabo.value = 'cat6';
    else if (ambiente === 'rural') selectCabo.value = 'optico';

    calcularSimulador();
}

function calcularSimulador() {
    const modeloCam = document.getElementById('simModeloCamera')?.value || 'ip';
    const cams = parseInt(document.getElementById('simCameras')?.value) || 0;
    const tipoCabo = document.getElementById('simTipoCabo')?.value || 'cat5';
    const metros = parseInt(document.getElementById('simCaboMetros')?.value) || 0;
    const resultEl = document.getElementById('simResultTotal');

    if (!resultEl) return;

    let precoCamUnidade = 80.00;
    if (modeloCam === 'wifi') precoCamUnidade = 160.00;
    if (modeloCam === 'cftv') precoCamUnidade = 100.00;

    let precoMetroCabo = 5.50;
    if (tipoCabo === 'cat6') precoMetroCabo = 6.50;
    if (tipoC_cabo === 'optico') precoMetroCabo = 3.50;

    let custoTotal = (cams * precoCamUnidade) + (metros * precoMetroCabo);
    resultEl.textContent = formatCurrency(custoTotal);
}

function enviarSimuladorWhatsApp() {
    const ambiente = document.getElementById('simAmbiente')?.options[document.getElementById('simAmbiente').selectedIndex].text || '';
    const modeloCam = document.getElementById('simModeloCamera')?.options[document.getElementById('simModeloCamera').selectedIndex].text || '';
    const cams = document.getElementById('simCameras')?.value || 0;
    const tipoCabo = document.getElementById('simTipoCabo')?.options[document.getElementById('simTipoCabo').selectedIndex].text || '';
    const metros = document.getElementById('simCaboMetros')?.value || 0;
    const totalEst = document.getElementById('simResultTotal')?.textContent || 'R$ 0,00';

    const texto = `Olá! Gostaria de solicitar um orçamento baseado no simulador do site:\n\n- Ambiente: ${ambiente}\n- Câmera: ${modeloCam} (${cams} un.)\n- Cabeçamento: ${tipoCabo} (${metros} metros)\n- Estimativa: ${totalEst}`;
    window.open(`https://wa.me/5567999584289?text=${encodeURIComponent(texto)}`, '_blank');
}