// Frontend interaction: conversion + saving history + viewing history
// This file assumes `currencies.js`, `names.js`, and `signs.js` are loaded.

// --- DOM references ---
const fromList = document.getElementById('fromList');
const toList = document.getElementById('toList');
const fromInput = document.getElementById('from');
const toInput = document.getElementById('to');
const fromFlag = document.getElementById('from-flag');
const toFlag = document.getElementById('to-flag');
const cashSign = document.getElementById('cash-sign');
const fromName = document.getElementById('from-name');
const toName = document.getElementById('to-name');
const amountInput = document.getElementById('amount-type');
const convertBtn = document.getElementById('button');
const oneRate = document.getElementById('one-rate');
const totalEl = document.getElementById('total');

// Populate datalists from countryList (provided by currencies.js)
for (let currency in countryList) {
	const o1 = document.createElement('option');
	o1.value = currency;
	fromList.appendChild(o1);
	const o2 = document.createElement('option');
	o2.value = currency;
	toList.appendChild(o2);
}

// Update flags and labels when user picks currencies
fromInput.addEventListener('input', () => {
	const code = fromInput.value.toUpperCase();
	if (countryList[code]) {
		fromFlag.src = `https://flagsapi.com/${countryList[code]}/flat/64.png`;
		cashSign.innerText = currencySymbols[code] || code;
		fromName.innerText = currencyNames[code] || code;
	}
});

toInput.addEventListener('input', () => {
	const code = toInput.value.toUpperCase();
	if (countryList[code]) {
		toFlag.src = `https://flagsapi.com/${countryList[code]}/flat/64.png`;
		toName.innerText = currencyNames[code] || code;
	}
});

// --- Conversion and save to backend ---
convertBtn.addEventListener('click', async () => {
	const from = (fromInput.value || '').toLowerCase();
	const to = (toInput.value || '').toLowerCase();
	const amount = parseFloat(amountInput.value) || 1;

	if (!from || !to) {
		oneRate.textContent = 'Please enter both currencies.';
		return;
	}

	oneRate.textContent = 'Fetching rate...';
	totalEl.textContent = '';

	try {
		// Example public API used in this project (no API key)
		const res = await fetch(`https://latest.currency-api.pages.dev/v1/currencies/${from}.json`);
		const data = await res.json();
		if (data[from] && data[from][to]) {
			const rate = parseFloat(data[from][to]);
			const total = parseFloat((amount * rate).toFixed(2));
			oneRate.textContent = `1 ${from.toUpperCase()} = ${rate.toFixed(2)} ${to.toUpperCase()}`;
			totalEl.textContent = `${total} ${to.toUpperCase()}`;

			// Save to backend
			saveHistory({
				from_currency: from.toUpperCase(),
				to_currency: to.toUpperCase(),
				amount: amount,
				rate: rate,
				total: total
			}).catch(err => console.warn('Save history failed', err));
		} else {
			oneRate.textContent = 'Invalid currency or API error.';
			totalEl.textContent = '—';
		}
	} catch (err) {
		console.error(err);
		oneRate.textContent = 'Error fetching rate.';
		totalEl.textContent = '—';
	}
});

// POST to backend /save-history
async function saveHistory(record) {
	const res = await fetch('http://localhost:3000/save-history', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(record)
	});
	if (!res.ok) {
		const text = await res.text();
		throw new Error(`Save failed: ${res.status} ${text}`);
	}
	return res.json();
}

// --- History UI ---
// Create modal overlay (we will open it when the user clicks your existing History div)
const modal = document.createElement('div');
modal.id = 'history-modal';
modal.className = 'fixed inset-0 hidden items-center justify-center bg-black/50 p-4 z-50';
modal.innerHTML = `
	<div class="bg-white rounded-lg w-full max-w-3xl max-h-[70vh] overflow-auto p-4 relative">
		<button id="history-close" class="absolute right-3 top-3 text-xl">&times;</button>
		<h2 class="text-lg font-bold mb-2">Conversion History</h2>
		<div id="history-list" class="space-y-2 text-sm"></div>
	</div>
`;
document.body.appendChild(modal);

// Close button inside modal
document.getElementById('history-close').addEventListener('click', () => {
	closeModal();
});

// Close when clicking backdrop
modal.addEventListener('click', (e) => {
	if (e.target === modal) closeModal();
});

function openModal() {
	modal.classList.remove('hidden');
	modal.classList.add('flex');
}

function closeModal() {
	modal.classList.add('hidden');
	modal.classList.remove('flex');
}

// Attach click handler to the existing History div in your HTML
function findExistingHistoryDiv() {
	// Find div elements whose trimmed textContent equals 'History'
	const divs = Array.from(document.querySelectorAll('div'));
	return divs.find(d => d.textContent && d.textContent.trim() === 'History');
}

const existingHistoryDiv = findExistingHistoryDiv();
if (!existingHistoryDiv) {
	console.warn('History div not found in DOM. Ensure a div with text "History" exists.');
} else {
	console.log('Found existing History div, attaching click handler.');
	existingHistoryDiv.style.cursor = 'pointer';
	existingHistoryDiv.addEventListener('click', async (e) => {
		e.preventDefault();
		console.log('History clicked — loading history from /history');
		openModal();
		await loadHistory();
	});
}

// Fetch history from backend and render
async function loadHistory() {
	const list = document.getElementById('history-list');
	list.innerHTML = 'Loading...';
	try {
		const res = await fetch('http://localhost:3000/history');
		if (!res.ok) throw new Error('Network error');
		const data = await res.json();
		if (!Array.isArray(data) || data.length === 0) {
			list.innerHTML = '<div class="text-gray-600">No history available.</div>';
			return;
		}
		list.innerHTML = '';
		data.forEach(item => {
			const row = document.createElement('div');
			row.className = 'p-2 border rounded';
			row.innerHTML = `
				<div class="font-semibold">${item.from_currency} → ${item.to_currency} = ${parseFloat(item.rate).toFixed(2)}</div>
				<div class="text-xs text-gray-600">Amount: ${parseFloat(item.amount)} — Total: ${parseFloat(item.total)} — ${new Date(item.created_at).toLocaleString()}</div>
			`;
			list.appendChild(row);
		});
	} catch (err) {
		console.error(err);
		list.innerHTML = '<div class="text-red-600">Could not load history.</div>';
	}
}
